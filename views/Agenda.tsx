
import React, { useEffect, useRef, useState } from 'react';
import ConfiguracionAgenda from './ConfiguracionAgenda';
import { Cita, EstadoCita, TratamientoCategoria } from '../types';
import {
    Calendar,
    Clock,
    Activity,
    X,
    Search,
    AlertTriangle,
    Filter,
    Stethoscope,
    CircleDot,
    MoreVertical,
    ChevronLeft,
    ChevronRight as ChevronRightIcon,
    ChevronDown,
    Lock,
    Unlock,
    Settings,
    User,
    Check
} from 'lucide-react';
import { Badge } from '../components/UI';
import {
    getCitasByFecha, updateCita, updateEstadoCita, createCita, deleteCita,
    isDbConfigured as isDbCfg, dateToISO
} from '../services/citas.service';

interface AgendaProps {
    activeSubArea?: string;
}

// Paleta pastel suave — referencia: cyan, yellow, pink, green
const PALETTE: { bg: string; iconBg: string; iconColor: string; text: string; border: string }[] = [
    { bg: 'background:#e0f7fa', iconBg: 'bg-cyan-400', iconColor: 'text-white', text: 'color:#006064', border: 'border-left:4px solid #00acc1' },      // cyan
    { bg: 'background:#fffde7', iconBg: 'bg-amber-400', iconColor: 'text-white', text: 'color:#e65100', border: 'border-left:4px solid #ffa726' },      // yellow
    { bg: 'background:#fce4ec', iconBg: 'bg-rose-400', iconColor: 'text-white', text: 'color:#880e4f', border: 'border-left:4px solid #ec407a' },       // pink
    { bg: 'background:#e8f5e9', iconBg: 'bg-emerald-400', iconColor: 'text-white', text: 'color:#1b5e20', border: 'border-left:4px solid #66bb6a' },    // green
    { bg: 'background:#ede7f6', iconBg: 'bg-violet-400', iconColor: 'text-white', text: 'color:#4527a0', border: 'border-left:4px solid #7e57c2' },     // violet
];

const MIN_PX_PER_HOUR = 80; // must be divisible by 4 for clean 15-min grid

const Agenda: React.FC<AgendaProps> = ({ activeSubArea }) => {
    const timelineRef = useRef<HTMLDivElement>(null);
    const timeline2Ref = useRef<HTMLDivElement>(null);
    const slotsG1Ref = useRef<HTMLDivElement>(null);
    const slotsG2Ref = useRef<HTMLDivElement>(null);
    const scrollContainerRef = useRef<HTMLDivElement>(null);

    const [pxPerHour, setPxPerHour] = useState(MIN_PX_PER_HOUR);

    const [contextMenu, setContextMenu] = useState<{ x: number; y: number; cita: Cita } | null>(null);
    const [clipboard, setClipboard] = useState<{ cita: Cita; action: 'copy' | 'cut' } | null>(null);
    const [altaCargaQuirurgica, setAltaCargaQuirurgica] = useState(false);
    const [citas, setCitas] = useState<Cita[]>([]);
    const [loadingCitas, setLoadingCitas] = useState(true);
    const [citasError, setCitasError] = useState<string | null>(null);
    const [selectedDate, setSelectedDate] = useState<Date>(() => {
        const d = new Date(); d.setHours(0, 0, 0, 0); return d;
    });
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedDoctors, setSelectedDoctors] = useState<string[]>([]);
    const [showDoctorsMenu, setShowDoctorsMenu] = useState(false);
    const [vistaTemporal, setVistaTemporal] = useState<'dia' | 'semana'>('dia');
    const [editingCita, setEditingCita] = useState<Cita | null>(null);

    const [vistaGabinete, setVistaGabinete] = useState<'ALL' | 'G1' | 'G2'>('ALL');
    const [showBlockModal, setShowBlockModal] = useState(false);
    const [showConfiguracion, setShowConfiguracion] = useState(false);
    const [showSettingsMenu, setShowSettingsMenu] = useState(false);
    const [blockForm, setBlockForm] = useState({ gabinete: 'G1', hora: '10:00', duracion: 30, motivo: 'Bioseguridad' });

    const toggleDoctor = (doc: string) => {
        setSelectedDoctors(prev => prev.includes(doc) ? prev.filter(d => d !== doc) : [...prev, doc]);
    };

    const goDay = (delta: number) => setSelectedDate(prev => {
        const d = new Date(prev); d.setDate(d.getDate() + delta); return d;
    });
    const goToday = () => { const d = new Date(); d.setHours(0, 0, 0, 0); setSelectedDate(d); };
    const isToday = selectedDate.toDateString() === new Date().toDateString();
    const DIAS_ES = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];
    const MESES_ES = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];
    const dateLabel = `${DIAS_ES[selectedDate.getDay()]} ${selectedDate.getDate()} ${MESES_ES[selectedDate.getMonth()]} ${selectedDate.getFullYear()}`;

    const toggleVista = () => setVistaGabinete(prev => prev === 'ALL' ? 'G1' : (prev === 'G1' ? 'G2' : 'ALL'));
    const blockSlots = () => {
        setBlockForm(prev => ({ ...prev, gabinete: vistaGabinete === 'G2' ? 'G2' : 'G1' }));
        setShowBlockModal(true);
    };
    const confirmBlockSlots = () => {
        const newBio: Cita = {
            id: String(Math.random()),
            pacienteNumPac: 'bio',
            nombrePaciente: blockForm.motivo || 'Bioseguridad',
            doctor: 'Sistema',
            tratamiento: 'Bloqueo Agenda',
            categoria: 'Diagnostico',
            horaInicio: blockForm.hora,
            duracionMinutos: blockForm.duracion,
            estado: 'bloqueo_bio',
            gabinete: blockForm.gabinete as 'G1' | 'G2',
            alertasMedicas: [],
            alertasLegales: [],
            alertasFinancieras: false
        };
        createCita(newBio, selectedDate).then(saved => {
            if (saved) setCitas(prev => [...prev, saved]);
            setShowBlockModal(false);
        });
    };
    const unblockSlots = () => {
        const bios = citas.filter(c => c.estado === 'bloqueo_bio');
        bios.forEach(b => deleteCita(b.id));
        setCitas(prev => prev.filter(c => c.estado !== 'bloqueo_bio'));
    };

    // ── Working hours ─────────────────────────────────────────────────────────
    // Mostrar mañana y tarde
    const workingSegments: [number, number][] = [[10, 14], [16, 20]];

    const totalHours = workingSegments.reduce((acc, [s, e]) => acc + (e - s), 0);
    const totalHeight = totalHours * pxPerHour; // px dinámico

    // Medir el contenedor y calcular pxPerHour
    useEffect(() => {
        const container = scrollContainerRef.current;
        if (!container) return;
        const measure = () => {
            const h = container.clientHeight;
            if (h > 0) {
                const raw = Math.max(MIN_PX_PER_HOUR, Math.floor(h / totalHours));
                // Round to multiple of 4 so that /4 (15-min) and /2 (30-min) are exact integers
                const computed = Math.floor(raw / 4) * 4;
                setPxPerHour(computed || MIN_PX_PER_HOUR);
            }
        };
        measure();
        const ro = new ResizeObserver(measure);
        ro.observe(container);
        return () => ro.disconnect();
    }, [totalHours]);

    // Helper: minutes → px offset
    const minutesToPx = (horaInicio: string): number => {
        const [h, m] = horaInicio.split(':').map(Number);
        let offsetHours = 0;
        for (const [start, end] of workingSegments) {
            if (h >= start && h < end) {
                offsetHours += (h - start);
                break;
            } else if (h >= end) {
                offsetHours += (end - start);
            }
        }
        return offsetHours * pxPerHour + m * (pxPerHour / 60);
    };

    // ── Initial data + reload por fecha ──────────────────────────────────────
    useEffect(() => {
        const INITIAL_CITAS: Cita[] = [
            { id: '101', gabinete: 'G1', pacienteNumPac: 'XP-2024-001', nombrePaciente: 'Bárbara Ruiz', horaInicio: '10:15', duracionMinutos: 90, tratamiento: 'Implantes 2.6, 2.7', categoria: 'Implante', estado: 'gabinete', doctor: 'Dr. García', alertasMedicas: ['Látex'], alertasLegales: [], alertasFinancieras: false, presupuestoPendiente: false, pruebasPendientes: true },
            { id: 'bio_101', gabinete: 'G1', pacienteNumPac: '', nombrePaciente: 'BIOSEGURIDAD', horaInicio: '11:45', duracionMinutos: 15, tratamiento: 'Desinfección Quirúrgica', categoria: 'Cirugía', estado: 'bloqueo_bio', doctor: '', alertasMedicas: [], alertasLegales: [], alertasFinancieras: false },
            { id: '102', gabinete: 'G2', pacienteNumPac: 'XP-2023-089', nombrePaciente: 'Javier Abad', horaInicio: '10:30', duracionMinutos: 45, tratamiento: 'Revisión Anual', categoria: 'Diagnostico', estado: 'espera', doctor: 'Dra. Rubio', alertasMedicas: [], alertasLegales: ['Consentimiento'], alertasFinancieras: false },
            { id: '103', gabinete: 'G2', pacienteNumPac: 'XP-2021-452', nombrePaciente: 'Maria Carmen', horaInicio: '11:30', duracionMinutos: 30, tratamiento: 'Curetaje Cuad. 2', categoria: 'Periodoncia', estado: 'confirmada', doctor: 'Hig. Sonia', alertasMedicas: [], alertasLegales: [], alertasFinancieras: true, presupuestoPendiente: true },
            { id: '104', gabinete: 'G1', pacienteNumPac: 'XP-2022-112', nombrePaciente: 'Pedro Martinez', horaInicio: '12:30', duracionMinutos: 60, tratamiento: 'Endodoncia Multirradicular', categoria: 'Endodoncia', estado: 'planificada', doctor: 'Dr. García', alertasMedicas: ['Cardiopatía'], alertasLegales: [], alertasFinancieras: false, trabajoLaboratorio: true },
        ];

        if (isDbCfg()) {
            getCitasByFecha(selectedDate).then(dbCitas => {
                setCitas(dbCitas.length > 0 ? dbCitas : INITIAL_CITAS);
                const minCir = dbCitas.filter(c => c.categoria === 'Cirugía' && c.estado !== 'bloqueo_bio').reduce((a, c) => a + c.duracionMinutos, 0);
                setAltaCargaQuirurgica((minCir / 300) > 0.4);
            }).finally(() => setLoadingCitas(false));
        } else {
            setCitas(INITIAL_CITAS);
            const minCir = INITIAL_CITAS.filter(c => c.categoria === 'Cirugía' && c.estado !== 'bloqueo_bio').reduce((a, c) => a + c.duracionMinutos, 0);
            setAltaCargaQuirurgica((minCir / 300) > 0.4);
            setLoadingCitas(false);
        }
    }, [selectedDate]);

    // ── State actions ─────────────────────────────────────────────────────────
    const updateCitaEstado = async (estado: EstadoCita, citaId?: string) => {
        const id = citaId ?? contextMenu?.cita.id;
        if (!id) return;
        setCitas(prev => prev.map(c => c.id === id ? { ...c, estado } : c));
        setContextMenu(null);
        await updateEstadoCita(id, estado);
    };

    const handleAction = (action: string) => {
        if (!contextMenu) return;
        const cita = contextMenu.cita;
        switch (action) {
            case 'copy': setClipboard({ cita, action: 'copy' }); break;
            case 'cut': setClipboard({ cita, action: 'cut' }); break;
            case 'paste':
                if (clipboard) {
                    const newCita: Cita = { ...clipboard.cita, id: String(Math.random()), horaInicio: cita.horaInicio, gabinete: cita.gabinete };
                    setCitas(prev => {
                        const next = [...prev, newCita];
                        return clipboard.action === 'cut' ? next.filter(c => c.id !== clipboard.cita.id) : next;
                    });
                    // Persistir en BD
                    createCita(newCita, selectedDate).then(saved => {
                        if (saved) setCitas(prev => prev.map(c => c.id === newCita.id ? saved : c));
                    });
                    if (clipboard.action === 'cut') deleteCita(clipboard.cita.id);
                    setClipboard(null);
                }
                break;
            case 'cancel': updateCitaEstado('fallada'); return;
            case 'print': window.print(); break;
            case 'justificante': alert(`Justificante de asistencia: ${cita.nombrePaciente}`); break;
        }
        setContextMenu(null);
    };

    // Close context menu and settings menu on outside click
    useEffect(() => {
        const close = () => {
            setContextMenu(null);
            setShowSettingsMenu(false);
            setShowDoctorsMenu(false);
        };
        window.addEventListener('click', close);
        return () => window.removeEventListener('click', close);
    }, []);

    // ── Render timeline + slots imperatively ──────────────────────────────────
    useEffect(() => {
        if (activeSubArea === 'Gestión de Citas' || showConfiguracion) return;
        const timeline = timelineRef.current;
        const timeline2 = timeline2Ref.current;
        const slotsG1 = slotsG1Ref.current;
        const slotsG2 = slotsG2Ref.current;
        if (!timeline || !slotsG1 || !slotsG2) return;

        // --- Set explicit pixel height on slot containers ---
        slotsG1.style.height = `${totalHeight}px`;
        slotsG2.style.height = `${totalHeight}px`;

        // --- Build timeline columns ---
        timeline.innerHTML = '';
        timeline.style.height = `${totalHeight}px`;
        if (timeline2) {
            timeline2.innerHTML = '';
            timeline2.style.height = `${totalHeight}px`;
        }

        workingSegments.forEach(([start, end], idx) => {
            if (idx > 0) {
                const pause = document.createElement('div');
                pause.className = 'flex items-center justify-center';
                pause.style.height = '0px';
                timeline.appendChild(pause);
            }
            for (let hour = start; hour < end; hour++) {
                const hDiv = document.createElement('div');
                hDiv.className = 'relative shrink-0 w-full';
                hDiv.style.height = `${pxPerHour}px`;
                hDiv.innerHTML = `
                    <div class="absolute top-0 left-0 right-0 border-t border-slate-200"></div>
                    <div class="absolute top-0 -translate-y-1/2 w-full text-left pl-3 z-10">
                        <span class="text-[15px] font-bold text-slate-700 leading-none">${String(hour).padStart(2, '0')}:00</span>
                    </div>

                    <div class="absolute top-1/4 left-0 right-0 border-t border-slate-100"></div>
                    <div class="absolute top-1/4 -translate-y-1/2 w-full text-left pl-3">
                        <span class="text-[13px] font-medium text-slate-400 leading-none">${String(hour).padStart(2, '0')}:15</span>
                    </div>

                    <div class="absolute top-2/4 left-0 right-0 border-t border-slate-200"></div>
                    <div class="absolute top-2/4 -translate-y-1/2 w-full text-left pl-3">
                        <span class="text-[14px] font-semibold text-slate-500 leading-none">${String(hour).padStart(2, '0')}:30</span>
                    </div>

                    <div class="absolute top-3/4 left-0 right-0 border-t border-slate-100"></div>
                    <div class="absolute top-3/4 -translate-y-1/2 w-full text-left pl-3">
                        <span class="text-[13px] font-medium text-slate-400 leading-none">${String(hour).padStart(2, '0')}:45</span>
                    </div>
                `;
                timeline.appendChild(hDiv);

                // Clone for second timeline
                if (timeline2) {
                    timeline2.appendChild(hDiv.cloneNode(true));
                }
            }
        });

        // --- Render all citas ---
        slotsG1.innerHTML = '';
        slotsG2.innerHTML = '';

        const term = searchTerm.trim().toLowerCase();
        const filteredCitas = citas.filter(c =>
            (!term ||
                c.nombrePaciente.toLowerCase().includes(term) ||
                c.tratamiento.toLowerCase().includes(term) ||
                c.doctor.toLowerCase().includes(term))
            && (selectedDoctors.length === 0 || selectedDoctors.includes(c.doctor) || c.estado === 'bloqueo_bio')
        );

        let idxG1 = 0;
        let idxG2 = 0;

        filteredCitas.forEach(cita => {
            const container = cita.gabinete === 'G1' ? slotsG1 : slotsG2;
            const top = minutesToPx(cita.horaInicio);
            const height = cita.duracionMinutos * (pxPerHour / 60);

            const div = document.createElement('div');
            // KEY: absolute + inset-x-0 + explicit top + height = exact slot fit
            div.style.cssText = `position:absolute; top:${top}px; left:0; right:0; height:${height}px;`;

            if (cita.estado === 'bloqueo_bio') {
                div.className = 'flex items-center justify-center bg-slate-100/70 border border-dashed border-slate-300 z-0';
                div.innerHTML = `<span class="text-[9px] font-black text-slate-400 uppercase tracking-widest">bioseguridad</span>`;
            } else {
                const colIdx = cita.gabinete === 'G1' ? idxG1++ : idxG2++;
                const cfg = PALETTE[colIdx % PALETTE.length];
                let ring = '';
                if (cita.estado === 'confirmada') ring = 'ring-2 ring-emerald-400/40';
                else if (cita.estado === 'espera') ring = 'ring-2 ring-amber-400/40';
                else if (cita.estado === 'gabinete') ring = 'ring-2 ring-blue-500/40';
                else if (cita.estado === 'finalizada') ring = 'opacity-50 grayscale';

                div.className = `${ring} rounded-xl shadow-sm hover:shadow-md hover:-translate-y-[1px] hover:z-[40] transition-all duration-200 cursor-grab active:cursor-grabbing flex items-center z-20 mx-1 overflow-hidden group/cita`;
                div.style.cssText += `${cfg.bg}; ${cfg.border};`;

                // Estado icon mapping
                const iconSvg = cita.estado === 'gabinete'
                    ? '<svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>'
                    : cita.estado === 'confirmada'
                        ? '<svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M5 13l4 4L19 7"/></svg>'
                        : cita.estado === 'espera'
                            ? '<svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>'
                            : '<svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>';

                div.innerHTML = `
                    <div class="flex items-center w-full px-3 py-2 gap-3 pointer-events-none">
                        <!-- Icon circular -->
                        <div class="w-9 h-9 rounded-full ${cfg.iconBg} ${cfg.iconColor} flex items-center justify-center shrink-0 shadow-sm">
                            ${iconSvg}
                        </div>
                        <!-- Patient + Treatment -->
                        <div class="flex flex-col flex-1 min-w-0">
                            <span class="text-[15px] font-bold text-slate-800 leading-tight truncate">${cita.nombrePaciente || 'Sin datos'}</span>
                            ${cita.tratamiento ? `<span class="text-[13px] font-medium leading-tight truncate" style="${cfg.text}">${cita.tratamiento}</span>` : ''}
                        </div>
                        <!-- Right: Doctor + Gabinete -->
                        <div class="flex flex-col items-end shrink-0 text-right">
                            <span class="text-[12px] font-bold text-slate-600 bg-white/60 px-2 py-0.5 rounded-md">${cita.doctor ? cita.doctor.split(' ').slice(-1)[0] : ''}</span>
                            <span class="text-[11px] font-medium text-slate-400 mt-0.5">${cita.gabinete === 'G1' ? 'Gabinete 1' : 'Gabinete 2'}${cita.duracionMinutos >= 60 ? ' · ' + cita.duracionMinutos + ' min' : ''}</span>
                        </div>
                        ${cita.estado === 'gabinete' ? '<span class="w-2.5 h-2.5 rounded-full bg-emerald-500 shadow-[0_0_6px_rgba(16,185,129,0.6)] animate-pulse shrink-0 ml-1"></span>' : ''}
                    </div>
                `;

                div.draggable = true;
                div.addEventListener('click', e => {
                    e.stopPropagation();
                    setEditingCita(cita);
                });
                div.addEventListener('contextmenu', e => {
                    e.preventDefault(); e.stopPropagation();
                    setContextMenu({ x: e.pageX, y: e.pageY, cita });
                });
                div.addEventListener('dragstart', e => {
                    e.dataTransfer?.setData('text/plain', cita.id);
                    div.style.opacity = '0.5';
                });
                div.addEventListener('dragend', () => div.style.opacity = '1');
            }

            container.appendChild(div);
        });

        // Drag-and-drop drop zones
        [slotsG1, slotsG2].forEach((container, i) => {
            const gabId = i === 0 ? 'G1' : 'G2';
            container.ondragover = e => e.preventDefault();
            container.ondrop = e => {
                e.preventDefault();
                const citaId = e.dataTransfer?.getData('text/plain');
                if (!citaId) return;
                const y = e.clientY - container.getBoundingClientRect().top;
                const rawMin = Math.floor(y / (pxPerHour / 60));
                const snapMin = Math.floor(rawMin / 15) * 15;
                // Reverse calculation from px to time
                let remainingOffset = snapMin / 60;
                let newH = workingSegments[0][0];
                for (const [start, end] of workingSegments) {
                    const segmentHours = end - start;
                    if (remainingOffset <= segmentHours) {
                        newH = start + remainingOffset;
                        break;
                    } else {
                        remainingOffset -= segmentHours;
                    }
                }
                const hr = Math.floor(newH);
                const mn = Math.round((newH - hr) * 60);
                const newTime = `${String(hr).padStart(2, '0')}:${String(mn).padStart(2, '0')}`;

                setCitas(prev => prev.map(c => c.id === citaId ? { ...c, horaInicio: newTime, gabinete: gabId as 'G1' | 'G2' } : c));
                // Persistir drag en BD
                updateCita(citaId, { horaInicio: newTime, gabinete: gabId }, selectedDate);
            };
        });
    }, [citas, activeSubArea, showConfiguracion, pxPerHour, searchTerm, selectedDoctors]);

    if (activeSubArea === 'Gestión de Citas' || showConfiguracion) {
        return (
            <div className="flex flex-col h-full bg-gradient-to-br from-[#0c2a80] to-[#051650] relative">
                {showConfiguracion && (
                    <div className="px-4 pt-4 pb-0 flex justify-start">
                        <button
                            onClick={() => setShowConfiguracion(false)}
                            className="flex items-center gap-2 px-3 py-1.5 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors text-[11px] font-bold uppercase"
                        >
                            <ChevronLeft className="w-4 h-4" /> Volver a Agenda
                        </button>
                    </div>
                )}
                <div className="flex-1 overflow-hidden relative">
                    <ConfiguracionAgenda />
                </div>
            </div>
        );
    }

    return (
        <div className="flex flex-1 flex-col gap-3 p-4 relative overflow-hidden bg-[#f8fafc]">

            {/* Floating Context Menu */}
            {contextMenu && (
                <div
                    className="fixed z-[200] bg-white border border-slate-200 shadow-2xl rounded-xl py-1.5 w-52 select-none"
                    style={{ top: contextMenu.y, left: contextMenu.x }}
                    onClick={e => e.stopPropagation()}
                >
                    <div className="px-3 py-1.5 border-b border-slate-100 mb-1">
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Acciones</p>
                        <p className="text-[12px] font-bold text-slate-800 truncate">{contextMenu.cita.nombrePaciente}</p>
                    </div>
                    <div className="px-1">
                        {[
                            { label: 'Copiar', key: 'copy', hint: '⌘C' },
                            { label: 'Cortar', key: 'cut', hint: '⌘X' },
                        ].map(({ label, key, hint }) => (
                            <button key={key} onClick={() => handleAction(key)} className="w-full flex items-center justify-between px-2 py-1.5 rounded-lg hover:bg-slate-50 text-[12px] font-medium text-slate-700">
                                {label}<span className="text-[10px] text-slate-400 font-mono">{hint}</span>
                            </button>
                        ))}
                        <button onClick={() => handleAction('paste')} disabled={!clipboard} className={`w-full flex items-center justify-between px-2 py-1.5 rounded-lg text-[12px] font-medium text-slate-700 ${clipboard ? 'hover:bg-slate-50' : 'opacity-30 cursor-not-allowed'}`}>
                            Pegar<span className="text-[10px] text-slate-400 font-mono">⌘V</span>
                        </button>

                        <div className="my-1 border-t border-slate-100" />

                        {/* Estado submenu */}
                        <div className="group/sub relative">
                            <button className="w-full flex items-center justify-between px-2 py-1.5 rounded-lg hover:bg-slate-50 text-[12px] font-medium text-slate-700">
                                Cambiar Estado <MoreVertical className="w-3 h-3 text-slate-400" />
                            </button>
                            <div className="absolute left-full top-0 ml-1 hidden group-hover/sub:flex flex-col bg-white border border-slate-200 shadow-xl rounded-xl py-1 w-36 z-10">
                                {(['confirmada', 'espera', 'gabinete', 'finalizada'] as EstadoCita[]).map(e => (
                                    <button key={e} onClick={() => updateCitaEstado(e)} className="text-left px-3 py-1.5 hover:bg-slate-50 text-[11px] font-bold uppercase text-slate-600 capitalize">{e}</button>
                                ))}
                            </div>
                        </div>

                        <div className="my-1 border-t border-slate-100" />
                        <button onClick={() => handleAction('print')} className="w-full text-left px-2 py-1.5 rounded-lg hover:bg-slate-50 text-[12px] font-medium text-slate-700">Imprimir Cita</button>
                        <button onClick={() => handleAction('justificante')} className="w-full text-left px-2 py-1.5 rounded-lg hover:bg-slate-50 text-[12px] font-medium text-slate-700">Justificante</button>

                        <div className="my-1 border-t border-slate-100" />
                        <button onClick={() => handleAction('cancel')} className="w-full text-left px-2 py-1.5 rounded-lg hover:bg-rose-50 text-[12px] font-bold text-rose-600">Anular Cita</button>
                    </div>
                </div>
            )}

            {/* Single Unified Toolbar Row */}
            <header className="flex items-center justify-between rounded-xl p-2.5 shadow-sm flex-shrink-0 bg-white border border-slate-200">

                {/* Left: Date Nav & Search */}
                <div className="flex items-center gap-3">
                    {/* DATE NAV */}
                    <div className="flex items-center gap-1 rounded-lg overflow-hidden bg-slate-50 border border-slate-200">
                        <button
                            onClick={() => goDay(-1)}
                            className="w-8 h-8 flex items-center justify-center text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-all"
                        >
                            <ChevronLeft className="w-4 h-4" />
                        </button>
                        <div className="flex items-center justify-center bg-transparent h-8 px-2 transition-all">
                            <input
                                type="date"
                                value={selectedDate.toISOString().split('T')[0]}
                                onChange={e => {
                                    if (e.target.value) {
                                        const d = new Date(e.target.value + 'T00:00:00');
                                        setSelectedDate(d);
                                    }
                                }}
                                className="bg-transparent text-[13px] font-bold text-slate-800 tracking-wide focus:outline-none cursor-pointer"
                                title="Haz clic para seleccionar un día concreto del calendario"
                            />
                        </div>
                        <button
                            onClick={() => goDay(1)}
                            className="w-8 h-8 flex items-center justify-center text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-all"
                        >
                            <ChevronRightIcon className="w-4 h-4" />
                        </button>
                    </div>
                    {isToday && (
                        <span className="text-[10px] font-bold uppercase tracking-wider text-cyan-600 bg-cyan-50 px-2 py-1 rounded-md border border-cyan-200">HOY</span>
                    )}
                    {!isToday && (
                        <button
                            onClick={goToday}
                            className="text-[10px] font-bold uppercase tracking-wider text-slate-600 px-2.5 py-1.5 rounded-lg bg-slate-50 border border-slate-200 hover:bg-slate-100 transition-all"
                        >
                            Hoy
                        </button>
                    )}

                    <div className="h-5 w-px bg-slate-200 mx-1" />

                    {/* SEARCH */}
                    <div className="relative">
                        <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                        <input
                            type="text"
                            placeholder="Buscar paciente o cita..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="pl-9 pr-4 py-1.5 text-[11px] font-medium text-slate-700 placeholder-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-200 w-56 bg-slate-50 border border-slate-200"
                        />
                    </div>
                </div>

                {/* Right: Actions, Filters & Alert */}
                <div className="flex items-center gap-3">
                    {/* ALARM */}
                    {altaCargaQuirurgica && (
                        <div className="flex items-center gap-2 bg-rose-50 text-rose-600 px-3 py-1.5 rounded-lg border border-rose-100 animate-in fade-in zoom-in duration-300 shadow-sm mr-2">
                            <Activity className="w-3.5 h-3.5 animate-pulse shrink-0" />
                            <span className="text-[10px] font-black uppercase tracking-wider hidden xl:inline">Carga Quirúrgica &gt;40%</span>
                            <button onClick={() => setAltaCargaQuirurgica(false)} className="ml-1 hover:bg-rose-200/50 rounded-full p-0.5"><X className="w-3.5 h-3.5" /></button>
                        </div>
                    )}

                    {/* VIEW TABS - Day/Week */}
                    <div className="flex items-center p-0.5 rounded-lg bg-slate-100 border border-slate-200">
                        <button
                            onClick={() => setVistaTemporal('dia')}
                            className={`text-[11px] font-bold px-3 py-1.5 rounded-md transition-all ${vistaTemporal === 'dia' ? 'bg-cyan-500 text-white shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}
                        >
                            Día
                        </button>
                        <button
                            onClick={() => setVistaTemporal('semana')}
                            className={`text-[11px] font-bold px-3 py-1.5 rounded-md transition-all ${vistaTemporal === 'semana' ? 'bg-cyan-500 text-white shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}
                        >
                            Semana
                        </button>
                    </div>

                    <div className="relative isolate z-[100]">
                        <button
                            onClick={(e) => { e.stopPropagation(); setShowDoctorsMenu(prev => !prev); }}
                            className="flex items-center gap-1.5 text-[11px] font-bold uppercase px-3 py-1.5 rounded-lg text-slate-600 transition-all bg-slate-50 border border-slate-200 hover:bg-slate-100"
                        >
                            <User className="w-3.5 h-3.5" /> Doctores <ChevronDown className="w-3.5 h-3.5" />
                        </button>

                        {showDoctorsMenu && (
                            <div className="absolute top-full right-0 mt-2 w-48 bg-white rounded-xl shadow-[0_10px_40px_rgba(0,0,0,0.1)] border border-slate-200 py-2 animate-in fade-in zoom-in-95" onClick={e => e.stopPropagation()}>
                                <div className="px-3 pb-2 mb-1 border-b border-slate-100">
                                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Filtrar por Especialista</p>
                                </div>
                                {(Array.from(new Set(citas.filter(c => c.doctor).map(c => c.doctor))) as string[])
                                    .sort((a, b) => a.localeCompare(b))
                                    .map(doc => {
                                        const isSelected = selectedDoctors.includes(doc);
                                        return (
                                            <button
                                                key={doc}
                                                onClick={() => toggleDoctor(doc)}
                                                className="w-full flex items-center justify-between px-3 py-2 hover:bg-slate-50 transition-colors text-left"
                                            >
                                                <span className={`text-[12px] font-bold ${isSelected ? 'text-[#051650]' : 'text-slate-600'}`}>{doc}</span>
                                                {isSelected && <Check className="w-3.5 h-3.5 text-blue-600" />}
                                            </button>
                                        );
                                    })}
                                {selectedDoctors.length > 0 && (
                                    <div className="px-3 pt-2 mt-1 border-t border-slate-100">
                                        <button onClick={() => setSelectedDoctors([])} className="text-[10px] font-bold text-rose-500 hover:text-rose-600 uppercase w-full text-center">Limpiar Filtros</button>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>

                    <div className="h-5 w-px bg-slate-200" />

                    {/* TOOLS - CONFIGURACIÓN CENTRALIZADA */}
                    <div className="relative">
                        <button
                            onClick={(e) => { e.stopPropagation(); setShowSettingsMenu(prev => !prev); }}
                            className={`flex items-center justify-center w-8 h-8 rounded-lg transition-all ${showSettingsMenu ? 'bg-[#051650] text-white' : 'text-slate-400 hover:bg-slate-100 hover:text-slate-700'}`}
                            title="Opciones de Agenda"
                        >
                            <Settings className="w-4 h-4" />
                        </button>

                        {/* Settings Dropdown */}
                        {showSettingsMenu && (
                            <div
                                className="absolute right-0 top-full mt-2 w-56 bg-white rounded-xl shadow-xl border border-slate-200 z-[100] overflow-hidden py-1 animate-in fade-in zoom-in-95 duration-200"
                                onClick={(e) => e.stopPropagation()}
                            >
                                <div className="px-3 py-2 border-b border-slate-100 flex items-center gap-2">
                                    <Settings className="w-4 h-4 text-slate-400" />
                                    <span className="text-[11px] font-black text-[#051650] uppercase tracking-wide">Opciones Agenda</span>
                                </div>

                                <button
                                    onClick={() => { setShowConfiguracion(true); setShowSettingsMenu(false); }}
                                    className="w-full flex items-center gap-2.5 px-3 py-2.5 hover:bg-slate-50 text-left transition-colors group"
                                >
                                    <div className="w-6 h-6 rounded-md bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 group-hover:bg-blue-100 transition-colors"><Settings className="w-3.5 h-3.5" /></div>
                                    <div className="flex flex-col">
                                        <span className="text-[12px] font-bold text-slate-700 leading-none">Gestión de Citas</span>
                                        <span className="text-[10px] text-slate-400 font-medium">Configurar horarios y reglas</span>
                                    </div>
                                </button>

                                <div className="h-px bg-slate-100 my-1 mx-2" />

                                <button
                                    onClick={() => { toggleVista(); setShowSettingsMenu(false); }}
                                    className="w-full flex items-center gap-2.5 px-3 py-2.5 hover:bg-slate-50 text-left transition-colors group"
                                >
                                    <div className="w-6 h-6 rounded-md bg-violet-50 text-violet-600 flex items-center justify-center shrink-0 group-hover:bg-violet-100 transition-colors"><Filter className="w-3.5 h-3.5" /></div>
                                    <div className="flex flex-col">
                                        <span className="text-[12px] font-bold text-slate-700 leading-none">Vistas: {vistaGabinete === 'ALL' ? 'Todos Doctores' : (vistaGabinete === 'G1' ? 'Dr. Rubio' : 'Dra. García')}</span>
                                        <span className="text-[10px] text-slate-400 font-medium">Alternar agendas visibles</span>
                                    </div>
                                </button>

                                <div className="h-px bg-slate-100 my-1 mx-2" />

                                <button
                                    onClick={() => { blockSlots(); setShowSettingsMenu(false); }}
                                    className="w-full flex items-center gap-2.5 px-3 py-2.5 hover:bg-slate-50 text-left transition-colors group"
                                >
                                    <div className="w-6 h-6 rounded-md bg-rose-50 text-rose-600 flex items-center justify-center shrink-0 group-hover:bg-rose-100 transition-colors"><Lock className="w-3.5 h-3.5" /></div>
                                    <div className="flex flex-col">
                                        <span className="text-[12px] font-bold text-slate-700 leading-none">Bloquear Tramos</span>
                                        <span className="text-[10px] text-slate-400 font-medium">Insertar bloqueo selectivo</span>
                                    </div>
                                </button>

                                <button
                                    onClick={() => { unblockSlots(); setShowSettingsMenu(false); }}
                                    className="w-full flex items-center gap-2.5 px-3 py-2.5 hover:bg-slate-50 text-left transition-colors group"
                                >
                                    <div className="w-6 h-6 rounded-md bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 group-hover:bg-emerald-100 transition-colors"><Unlock className="w-3.5 h-3.5" /></div>
                                    <div className="flex flex-col">
                                        <span className="text-[12px] font-bold text-slate-700 leading-none">Desbloquear Tramos</span>
                                        <span className="text-[10px] text-slate-400 font-medium">Liberar bloqueos (bio)</span>
                                    </div>
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </header >

            {/* Main grid */}
            < main className="flex-1 flex flex-col bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden" >

                {/* Column headers */}
                < div className="flex border-b border-slate-200 sticky top-0 z-30 h-12 shrink-0 bg-slate-50" >
                    <div className="w-[90px] shrink-0 border-r border-slate-200 flex items-center justify-center">
                        <span className="text-[13px] font-bold text-slate-400 uppercase tracking-wider">Hora</span>
                    </div>
                    <div className={`flex-1 grid ${vistaGabinete === 'ALL' ? 'grid-cols-2' : 'grid-cols-1'} divide-x divide-slate-200`}>
                        {(vistaGabinete === 'ALL' || vistaGabinete === 'G1') && (
                            <div className="flex items-center justify-center gap-2.5 group hover:bg-white/80 transition-colors cursor-pointer">
                                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                                <span className="text-[14px] font-bold text-slate-700 uppercase tracking-wide">Dr. Mario Rubio</span>
                            </div>
                        )}
                        {vistaGabinete === 'ALL' && (
                            <div className="flex items-center gap-1">
                                <div className="w-[90px] shrink-0 border-x border-slate-200 flex items-center justify-center">
                                    <span className="text-[13px] font-bold text-slate-400 uppercase tracking-wider">Hora</span>
                                </div>
                                <div className="flex-1 flex items-center justify-center gap-2.5">
                                    <span className="w-2.5 h-2.5 rounded-full bg-blue-500" />
                                    <span className="text-[14px] font-bold text-slate-700 uppercase tracking-wide">Dra. Irene García</span>
                                </div>
                            </div>
                        )}
                        {vistaGabinete === 'G2' && (
                            <div className="flex items-center justify-center gap-2.5 group hover:bg-white/80 transition-colors cursor-pointer">
                                <span className="w-2.5 h-2.5 rounded-full bg-blue-500" />
                                <span className="text-[14px] font-bold text-slate-700 uppercase tracking-wide">Dra. Irene García</span>
                            </div>
                        )}
                    </div>
                </div >

                {/* Scrollable grid body */}
                < div ref={scrollContainerRef} className="flex-1 overflow-y-auto bg-white relative" >

                    {/* Loading overlay */}
                    {
                        loadingCitas && (
                            <div className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-white/80 backdrop-blur-sm gap-3">
                                <div className="w-8 h-8 border-4 border-[#002855]/20 border-t-[#002855] rounded-full animate-spin" />
                                <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">Cargando agenda...</p>
                            </div>
                        )
                    }

                    {/* Error banner */}
                    {
                        citasError && !loadingCitas && (
                            <div className="absolute top-4 left-4 right-4 z-50 flex items-center gap-3 bg-rose-50 border border-rose-200 rounded-xl px-4 py-3 shadow">
                                <span className="text-rose-500 text-lg">⚠️</span>
                                <p className="text-[12px] font-semibold text-rose-700 flex-1">{citasError}</p>
                                <button onClick={() => setCitasError(null)} className="text-rose-400 hover:text-rose-600 text-xs font-bold">✕</button>
                            </div>
                        )
                    }

                    {/* Empty day state */}
                    {
                        !loadingCitas && !citasError && citas.length === 0 && (
                            <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-4 pointer-events-none">
                                <div className="w-16 h-16 rounded-2xl bg-slate-100 flex items-center justify-center text-3xl">📅</div>
                                <div className="text-center">
                                    <p className="text-[13px] font-black text-slate-500 uppercase tracking-wider">Sin citas para hoy</p>
                                    <p className="text-[11px] text-slate-400 mt-1">Haz clic derecho en un slot para crear una cita</p>
                                </div>
                            </div>
                        )
                    }

                    <div className="flex relative">
                        {/* Timeline column */}
                        <div
                            ref={timelineRef}
                            className="w-[90px] shrink-0 border-r border-slate-200 bg-white relative z-20"
                            style={{ height: totalHeight, overflow: 'visible' }}
                        />

                        {/* Gabinete 1 */}
                        <div
                            className={`flex-1 relative ${vistaGabinete === 'G2' ? 'hidden' : 'block'}`}
                            style={{
                                height: totalHeight,
                                backgroundColor: '#ffffff',
                                backgroundImage: [
                                    `repeating-linear-gradient(to bottom, transparent, transparent ${pxPerHour - 1}px, #cbd5e1 ${pxPerHour - 1}px, #cbd5e1 ${pxPerHour}px)`,
                                    `repeating-linear-gradient(to bottom, transparent, transparent ${pxPerHour / 2 - 1}px, #e2e8f0 ${pxPerHour / 2 - 1}px, #e2e8f0 ${pxPerHour / 2}px)`,
                                    `repeating-linear-gradient(to bottom, transparent, transparent ${pxPerHour / 4 - 1}px, #f1f5f9 ${pxPerHour / 4 - 1}px, #f1f5f9 ${pxPerHour / 4}px)`,
                                ].join(','),
                                backgroundSize: `100% ${pxPerHour}px, 100% ${pxPerHour / 2}px, 100% ${pxPerHour / 4}px`,
                            }}
                        >
                            <div ref={slotsG1Ref} className="relative w-full" style={{ height: totalHeight }} />
                        </div>

                        {/* Second timeline (only when both gabinetes visible) */}
                        {vistaGabinete === 'ALL' && (
                            <div
                                ref={timeline2Ref}
                                className="w-[90px] shrink-0 border-x border-slate-200 bg-white relative z-20"
                                style={{ height: totalHeight, overflow: 'visible' }}
                            />
                        )}

                        {/* Gabinete 2 */}
                        <div
                            className={`flex-1 relative ${vistaGabinete === 'G1' ? 'hidden' : 'block'}`}
                            style={{
                                height: totalHeight,
                                backgroundColor: '#ffffff',
                                backgroundImage: [
                                    `repeating-linear-gradient(to bottom, transparent, transparent ${pxPerHour - 1}px, #cbd5e1 ${pxPerHour - 1}px, #cbd5e1 ${pxPerHour}px)`,
                                    `repeating-linear-gradient(to bottom, transparent, transparent ${pxPerHour / 2 - 1}px, #e2e8f0 ${pxPerHour / 2 - 1}px, #e2e8f0 ${pxPerHour / 2}px)`,
                                    `repeating-linear-gradient(to bottom, transparent, transparent ${pxPerHour / 4 - 1}px, #f1f5f9 ${pxPerHour / 4 - 1}px, #f1f5f9 ${pxPerHour / 4}px)`,
                                ].join(','),
                                backgroundSize: `100% ${pxPerHour}px, 100% ${pxPerHour / 2}px, 100% ${pxPerHour / 4}px`,
                            }}
                        >
                            <div ref={slotsG2Ref} className="relative w-full" style={{ height: totalHeight }} />
                        </div>
                    </div>
                </div >
            </main >

            {/* Block Modal */}
            {
                showBlockModal && (
                    <div className="fixed inset-0 z-[300] bg-slate-900/40 backdrop-blur-sm flex items-center justify-center animate-in fade-in duration-200">
                        <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm overflow-hidden animate-in zoom-in-95 duration-200">
                            <div className="bg-[#051650] px-5 py-4 flex items-center justify-between pointer-events-none">
                                <h3 className="text-white font-bold text-[14px] flex items-center gap-2">
                                    <Lock className="w-4 h-4 text-rose-400" />
                                    Bloquear Tramo
                                </h3>
                                <button onClick={() => setShowBlockModal(false)} className="text-slate-300 hover:text-white transition-colors pointer-events-auto">
                                    <X className="w-4 h-4" />
                                </button>
                            </div>
                            <div className="p-5 flex flex-col gap-4">
                                <div>
                                    <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-widest mb-1.5">Doctor / Agenda</label>
                                    <select
                                        className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-[13px] font-bold text-[#051650] focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                        value={blockForm.gabinete}
                                        onChange={e => setBlockForm({ ...blockForm, gabinete: e.target.value })}
                                    >
                                        <option value="G1">Dr. Mario Rubio</option>
                                        <option value="G2">Dra. Irene García</option>
                                    </select>
                                </div>
                                <div className="grid grid-cols-2 gap-3">
                                    <div>
                                        <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-widest mb-1.5">Hora Inicio</label>
                                        <input
                                            type="time"
                                            className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-[13px] font-bold text-[#051650] focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                            value={blockForm.hora}
                                            onChange={e => setBlockForm({ ...blockForm, hora: e.target.value })}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-widest mb-1.5">Duración</label>
                                        <select
                                            className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-[13px] font-bold text-[#051650] focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                            value={blockForm.duracion}
                                            onChange={e => setBlockForm({ ...blockForm, duracion: Number(e.target.value) })}
                                        >
                                            <option value={15}>15 minutos</option>
                                            <option value={30}>30 minutos</option>
                                            <option value={45}>45 minutos</option>
                                            <option value={60}>1 hora</option>
                                            <option value={120}>2 horas</option>
                                        </select>
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-widest mb-1.5">Motivo / Etiqueta</label>
                                    <input
                                        type="text"
                                        className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-[13px] font-bold text-[#051650] focus:ring-2 focus:ring-blue-500 focus:outline-none placeholder:text-slate-400 font-medium"
                                        placeholder="Ej: Bioseguridad, Mantenimiento..."
                                        value={blockForm.motivo}
                                        onChange={e => setBlockForm({ ...blockForm, motivo: e.target.value })}
                                    />
                                </div>
                            </div>
                            <div className="bg-slate-50 border-t border-slate-100 px-5 py-3 flex gap-2 justify-end mt-2">
                                <button
                                    onClick={() => setShowBlockModal(false)}
                                    className="px-4 py-2 rounded-lg text-[12px] font-bold text-slate-500 hover:bg-slate-200 transition-colors"
                                >
                                    Cancelar
                                </button>
                                <button
                                    onClick={confirmBlockSlots}
                                    className="px-5 py-2 rounded-lg text-[12px] font-bold text-white bg-rose-500 hover:bg-rose-600 shadow-lg shadow-rose-500/30 transition-all flex items-center gap-2"
                                >
                                    <Lock className="w-3.5 h-3.5" />
                                    Insertar Bloqueo
                                </button>
                            </div>
                        </div>
                    </div>
                )
            }
            {/* Quick Edit Modal Placeholder */}
            {
                editingCita && (
                    <div className="fixed inset-0 z-[300] bg-slate-900/40 backdrop-blur-sm flex items-center justify-center animate-in fade-in duration-200">
                        <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm overflow-hidden animate-in zoom-in-95 duration-200">
                            <div className="bg-[#051650] px-5 py-4 flex items-center justify-between pointer-events-none">
                                <h3 className="text-white font-bold text-[14px]">Detalle de Cita</h3>
                                <button onClick={() => setEditingCita(null)} className="text-slate-300 hover:text-white transition-colors pointer-events-auto">
                                    <X className="w-4 h-4" />
                                </button>
                            </div>
                            <div className="p-5">
                                <div className="mb-4">
                                    <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-widest mb-1.5">Paciente</label>
                                    <input
                                        type="text"
                                        className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-[13px] font-bold text-[#051650] focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                        value={editingCita.nombrePaciente}
                                        onChange={e => setEditingCita({ ...editingCita, nombrePaciente: e.target.value })}
                                    />
                                </div>

                                <div className="grid grid-cols-2 gap-3 mb-4">
                                    <div>
                                        <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-widest mb-1.5">Tratamiento</label>
                                        <input
                                            type="text"
                                            className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-[13px] font-bold text-[#051650] focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                            value={editingCita.tratamiento}
                                            onChange={e => setEditingCita({ ...editingCita, tratamiento: e.target.value })}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-widest mb-1.5">Doctor</label>
                                        <select
                                            className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-[13px] font-bold text-[#051650] focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                            value={editingCita.doctor}
                                            onChange={e => setEditingCita({ ...editingCita, doctor: e.target.value })}
                                        >
                                            <option value="Dra. Rubio">Dra. Rubio</option>
                                            <option value="Dr. García">Dr. García</option>
                                            <option value="Hig. Sonia">Hig. Sonia</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-3 mb-4">
                                    <div>
                                        <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-widest mb-1.5">Hora Inicio</label>
                                        <input
                                            type="time"
                                            className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-[13px] font-bold text-[#051650] focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                            value={editingCita.horaInicio}
                                            onChange={e => setEditingCita({ ...editingCita, horaInicio: e.target.value })}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-widest mb-1.5">Duración</label>
                                        <select
                                            className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-[13px] font-bold text-[#051650] focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                            value={editingCita.duracionMinutos}
                                            onChange={e => setEditingCita({ ...editingCita, duracionMinutos: Number(e.target.value) })}
                                        >
                                            {[15, 30, 45, 60, 75, 90, 105, 120, 135, 150, 165, 180].map(m => (
                                                <option key={m} value={m}>{m} minutos</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>

                                <div className="flex justify-end gap-2 mt-6 border-t border-slate-100 pt-4">
                                    <button onClick={() => setEditingCita(null)} className="px-5 py-2 rounded-lg text-sm font-bold text-slate-500 hover:bg-slate-100 transition-colors">Cancelar</button>
                                    <button onClick={() => {
                                        // Save changes
                                        setCitas(prev => prev.map(c => c.id === editingCita.id ? editingCita : c));
                                        updateCita(editingCita.id, editingCita, selectedDate);
                                        setEditingCita(null);
                                    }} className="px-5 py-2 rounded-lg text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 shadow-md transition-all flex items-center gap-2">
                                        Guardar Cambios
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            }
        </div >
    );
};

export default Agenda;
