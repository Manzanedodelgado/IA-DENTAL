
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

// Paleta rotatoria — los 2 COLORES DE LA COLUMNA DERECHA de la agenda, alternando
const PALETTE: { theme: string; text: string; border: string }[] = [
    { theme: 'bg-indigo-100 border-indigo-300', text: 'text-indigo-900', border: 'border-l-[5px] border-l-indigo-400' },  // azul/lavanda
    { theme: 'bg-rose-100 border-rose-300', text: 'text-rose-900', border: 'border-l-[5px] border-l-rose-400' },    // salmón claro
];

const MIN_PX_PER_HOUR = 80; // mínimo para que las citas sean legibles

const Agenda: React.FC<AgendaProps> = ({ activeSubArea }) => {
    const timelineRef = useRef<HTMLDivElement>(null);
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
                const computed = Math.max(MIN_PX_PER_HOUR, Math.floor(h / totalHours));
                setPxPerHour(computed);
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
        const slotsG1 = slotsG1Ref.current;
        const slotsG2 = slotsG2Ref.current;
        if (!timeline || !slotsG1 || !slotsG2) return;

        // --- Set explicit pixel height on slot containers ---
        slotsG1.style.height = `${totalHeight}px`;
        slotsG2.style.height = `${totalHeight}px`;

        // --- Build timeline column ---
        timeline.innerHTML = '';
        timeline.style.height = `${totalHeight}px`;

        workingSegments.forEach(([start, end], idx) => {
            if (idx > 0) {
                // Pause divider
                const pause = document.createElement('div');
                pause.className = 'flex items-center justify-center bg-slate-100/60 border-y border-dashed border-slate-300';
                pause.style.height = '0px'; // no visual height — slots don't have break gap either
                timeline.appendChild(pause);
            }
            for (let hour = start; hour < end; hour++) {
                const hDiv = document.createElement('div');
                hDiv.className = 'relative shrink-0 w-full bg-white';
                hDiv.style.height = `${pxPerHour}px`;
                hDiv.innerHTML = `
                    <!-- :00 tick (long) -->
                    <div class="absolute top-0 right-0 w-4 border-t-2 border-slate-400"></div>
                    <!-- :15 tick (short) -->
                    <div class="absolute top-1/4 right-0 w-2 border-t border-slate-300"></div>
                    <!-- :30 tick (medium) -->
                    <div class="absolute top-2/4 right-0 w-3 border-t border-slate-400"></div>
                    <!-- :45 tick (short) -->
                    <div class="absolute top-3/4 right-0 w-2 border-t border-slate-300"></div>

                    <!-- Label: HH:00 — bold dark, highlighted -->
                    <div class="absolute top-0 -translate-y-1/2 w-full text-right pr-3 z-10">
                        <span class="text-[13px] font-black text-[#051650] leading-none tracking-tight">${String(hour).padStart(2, '0')}:00</span>
                    </div>

                    <!-- Label: HH:15 — small grey -->
                    <div class="absolute top-1/4 -translate-y-1/2 w-full text-right pr-3">
                        <span class="text-[10px] font-normal text-slate-400 leading-none">${String(hour).padStart(2, '0')}:15</span>
                    </div>

                    <!-- Label: HH:30 — slightly bolder grey -->
                    <div class="absolute top-2/4 -translate-y-1/2 w-full text-right pr-3">
                        <span class="text-[11px] font-medium text-slate-500 leading-none">${String(hour).padStart(2, '0')}:30</span>
                    </div>

                    <!-- Label: HH:45 — small grey -->
                    <div class="absolute top-3/4 -translate-y-1/2 w-full text-right pr-3">
                        <span class="text-[10px] font-normal text-slate-400 leading-none">${String(hour).padStart(2, '0')}:45</span>
                    </div>
                `;

                timeline.appendChild(hDiv);
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
                else if (cita.estado === 'gabinete') ring = 'ring-2 ring-blue-500/40 shadow-blue-200';
                else if (cita.estado === 'finalizada') ring = 'opacity-50 grayscale';

                div.className = `${cfg.theme} ${cfg.border} border-y border-r ${ring} rounded-r-xl shadow-[0_2px_10px_rgba(0,0,0,0.06)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.12)] hover:-translate-y-[2px] hover:z-[40] transition-all duration-300 cursor-grab active:cursor-grabbing flex flex-col justify-start z-20 mx-0.5 mt-0.5 overflow-hidden group/cita`;

                div.innerHTML = `
                    <div class="flex flex-col px-2 py-1.5 relative w-full pointer-events-none h-full overflow-hidden gap-0.5">

                        <!-- Línea 1: Hora + Nombre del paciente -->
                        <div class="flex items-center gap-1.5 w-full overflow-hidden shrink-0">
                            <span class="text-[10px] font-black ${cfg.text} shrink-0 tabular-nums leading-none whitespace-nowrap">${cita.horaInicio}</span>
                            <span class="text-[11px] font-extrabold text-[#051650] leading-tight tracking-tight truncate flex-1 min-w-0">${cita.nombrePaciente || 'Sin datos'}</span>
                            ${cita.estado === 'gabinete' ? '<span class="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_6px_rgba(16,185,129,0.6)] animate-pulse shrink-0"></span>' : ''}
                            ${cita.alertasMedicas?.length > 0 ? '<span class="w-1.5 h-1.5 rounded-full bg-rose-500 shrink-0" title="Alerta médica"></span>' : ''}
                        </div>

                        <!-- Línea 2: Doctor + Estado -->
                        <div class="flex items-center justify-between gap-1 w-full min-w-0 overflow-hidden shrink-0">
                            <span class="text-[9px] font-semibold ${cfg.text} opacity-75 truncate flex-1">${cita.doctor ? cita.doctor.split(' ').slice(-1)[0] : 'Dr.'}</span>
                            <span class="text-[8px] font-black uppercase tracking-wider ${cfg.text} bg-white/50 px-1.5 py-0.5 rounded shrink-0 whitespace-nowrap">${cita.estado === 'planificada' ? 'PLAN.' : cita.estado === 'confirmada' ? 'CONF.' : cita.estado === 'finalizada' ? 'FIN.' : cita.estado === 'espera' ? 'ESPERA' : cita.estado === 'gabinete' ? 'EN SAL.' : cita.estado?.toUpperCase() ?? ''}</span>
                        </div>

                        <!-- Línea 3: Tratamiento (solo si hay altura suficiente) -->
                        ${cita.tratamiento && cita.duracionMinutos >= 30 ? `<p class="text-[9px] font-medium ${cfg.text}/70 leading-tight truncate w-full mt-auto">${cita.tratamiento}</p>` : ''}
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
        <div className="flex flex-1 flex-col gap-4 p-4 relative overflow-hidden bg-gradient-to-br from-[#0c2a80] to-[#051650]">

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
            <header className="flex items-center justify-between rounded-xl p-2 shadow-sm flex-shrink-0" style={{ background: '#ffffff', border: '1px solid #0056b3' }}>

                {/* Left: Date Nav & Search */}
                <div className="flex items-center gap-3">
                    {/* DATE NAV */}
                    <div className="flex items-center gap-1 rounded-lg overflow-hidden shadow-sm" style={{ background: '#ffe4e6', border: '1px solid #fecdd3' }}>
                        <button
                            onClick={() => goDay(-1)}
                            className="w-8 h-8 flex items-center justify-center text-rose-400 hover:text-rose-700 hover:bg-rose-100 transition-all"
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
                                className="bg-transparent text-[12px] font-black text-rose-900 uppercase tracking-wide focus:outline-none cursor-pointer"
                                title="Haz clic para seleccionar un día concreto del calendario"
                            />
                        </div>
                        <button
                            onClick={() => goDay(1)}
                            className="w-8 h-8 flex items-center justify-center text-rose-400 hover:text-rose-700 hover:bg-rose-100 transition-all"
                        >
                            <ChevronRightIcon className="w-4 h-4" />
                        </button>
                    </div>
                    {!isToday && (
                        <button
                            onClick={goToday}
                            className="text-[10px] font-black uppercase tracking-wider text-rose-900 px-3 py-1.5 rounded-lg transition-all" style={{ background: '#ffe4e6', border: '1px solid #fecdd3' }}
                        >
                            Hoy
                        </button>
                    )}

                    <div className="h-5 w-px bg-rose-200 mx-1" />

                    {/* SEARCH */}
                    <div className="relative">
                        <Search className="w-4 h-4 text-rose-400 absolute left-3 top-1/2 -translate-y-1/2" />
                        <input
                            type="text"
                            placeholder="Buscar paciente o cita..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="pl-9 pr-4 py-1.5 text-[11px] font-medium text-rose-900 placeholder-rose-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-200 w-56 placeholder:tracking-wide" style={{ background: '#ffe4e6', border: '1px solid #fecdd3' }}
                        />
                    </div>
                </div>

                {/* Right: Actions, Filters & Alert */}
                <div className="flex items-center gap-3">
                    {/* ALARM */}
                    {altaCargaQuirurgica && (
                        <div className="flex items-center gap-2 bg-rose-50 text-rose-600 px-3 py-1.5 rounded-lg border border-rose-100 animate-in fade-in zoom-in duration-300 shadow-sm mr-2">
                            <Activity className="w-3.5 h-3.5 animate-pulse shrink-0" />
                            <span className="text-[10px] font-black uppercase tracking-wider hidden xl:inline">Carga Quirúrgica &gt;40% — Refuerzo necesario</span>
                            <button onClick={() => setAltaCargaQuirurgica(false)} className="ml-1 hover:bg-rose-200/50 rounded-full p-0.5"><X className="w-3.5 h-3.5" /></button>
                        </div>
                    )}

                    {/* TABS & FILTERS */}
                    <div className="flex items-center p-1 rounded-lg mr-2 shadow-sm" style={{ background: '#ffe4e6', border: '1px solid #fecdd3' }}>
                        <button
                            onClick={() => setVistaTemporal('semana')}
                            className={`text-[11px] font-bold uppercase px-3 py-1.5 rounded-md transition-all ${vistaTemporal === 'semana' ? 'bg-white text-rose-700 shadow-sm' : 'text-rose-400 hover:text-rose-700'}`}
                        >
                            Semana
                        </button>
                        <button
                            onClick={() => setVistaTemporal('dia')}
                            className={`text-[11px] font-bold uppercase px-3 py-1.5 rounded-md transition-all ${vistaTemporal === 'dia' ? 'bg-white text-rose-700 shadow-sm' : 'text-rose-400 hover:text-rose-700'}`}
                        >
                            Día
                        </button>
                    </div>

                    <div className="relative isolate z-[100]">
                        <button
                            onClick={(e) => { e.stopPropagation(); setShowDoctorsMenu(prev => !prev); }}
                            className="flex items-center gap-1.5 text-[11px] font-bold uppercase px-3 py-1.5 rounded-lg text-rose-900 transition-all shadow-sm" style={{ background: '#ffe4e6', border: '1px solid #fecdd3' }}
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
            < main className="flex-1 flex flex-col bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-200/60 overflow-hidden ring-1 ring-black/5" >

                {/* Column headers */}
                < div className="flex bg-gradient-to-b from-white to-slate-50/80 border-b border-slate-200 sticky top-0 z-30 h-10 shadow-sm shrink-0" >
                    <div className="w-[70px] shrink-0 border-r border-slate-200 flex items-center justify-center bg-slate-50/50">
                        <Clock className="w-4 h-4 text-slate-400" />
                    </div>
                    <div className={`flex-1 grid ${vistaGabinete === 'ALL' ? 'grid-cols-2' : 'grid-cols-1'} divide-x divide-slate-200`}>
                        {(vistaGabinete === 'ALL' || vistaGabinete === 'G1') && (
                            <div className="flex items-center justify-center gap-2.5 group hover:bg-slate-50/50 transition-colors cursor-pointer">
                                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)] ring-2 ring-emerald-100" />
                                <span className="text-[11px] font-black text-[#051650] uppercase tracking-widest transition-colors">Dr. Mario Rubio</span>
                            </div>
                        )}
                        {(vistaGabinete === 'ALL' || vistaGabinete === 'G2') && (
                            <div className="flex items-center justify-center gap-2.5 group hover:bg-slate-50/50 transition-colors cursor-pointer">
                                <span className="w-2.5 h-2.5 rounded-full bg-blue-600 shadow-[0_0_8px_rgba(37,99,235,0.4)] ring-2 ring-blue-100" />
                                <span className="text-[11px] font-black text-[#051650] uppercase tracking-widest transition-colors">Dra. Irene García</span>
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
                            className="w-[70px] shrink-0 border-r border-slate-400 bg-white relative z-20"
                            style={{ height: totalHeight }}
                        />

                        {/* Gabinetes grid */}
                        <div
                            className={`flex-1 grid ${vistaGabinete === 'ALL' ? 'grid-cols-2' : 'grid-cols-1'} divide-x-2 divide-slate-400 relative`}
                            style={{
                                height: totalHeight,
                                backgroundColor: '#ffffff',
                                backgroundImage: [
                                    `repeating-linear-gradient(to bottom, transparent, transparent ${pxPerHour - 1}px, #cbd5e1 ${pxPerHour - 1}px, #cbd5e1 ${pxPerHour}px)`, // hour lines
                                    `repeating-linear-gradient(to bottom, transparent, transparent ${pxPerHour / 4 - 1}px, #e2e8f0 ${pxPerHour / 4 - 1}px, #e2e8f0 ${pxPerHour / 4}px)`, // 15-min lines
                                    `repeating-linear-gradient(to bottom, #ffffff, #ffffff ${pxPerHour}px, #f8fafc ${pxPerHour}px, #f8fafc ${pxPerHour * 2}px)` // Alternating rows
                                ].join(','),
                                backgroundSize: `100% ${pxPerHour}px, 100% ${pxPerHour / 4}px, 100% ${pxPerHour * 2}px`,
                                backgroundPosition: '0 0, 0 0, 0 0',
                            }}
                        >
                            <div ref={slotsG1Ref} className={`relative w-full ${vistaGabinete === 'G2' ? 'hidden' : 'block'}`} style={{ height: totalHeight }} />
                            <div ref={slotsG2Ref} className={`relative w-full ${vistaGabinete === 'G1' ? 'hidden' : 'block'}`} style={{ height: totalHeight }} />
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
