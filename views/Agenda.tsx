
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
import { searchPacientes } from '../services/pacientes.service';
import { Paciente } from '../types';

interface AgendaProps {
    activeSubArea?: string;
}

// Paleta pastel suave — referencia: cyan, yellow, pink, green
/** Colores por tipo de tratamiento */
const getTreatmentColor = (tto: string, estado: string): { main: string; light: string; text: string } => {
    if (estado === 'finalizada') return { main: '#9ca3af', light: '#d1d5db', text: '#4b5563' }; // gray
    if (tto === 'Primera Visita') return { main: '#FF4B68', light: '#FF7A90', text: '#fff' };
    return { main: '#1d4ed8', light: '#2563eb', text: '#fff' }; // blue-700
};

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

    // Patient search state for edit modal
    const [patientQuery, setPatientQuery] = useState('');
    const [patientResults, setPatientResults] = useState<Paciente[]>([]);
    const [showPatientDropdown, setShowPatientDropdown] = useState(false);
    const patientSearchTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

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

    // ── Cargar citas reales por fecha ────────────────────────────────────────
    useEffect(() => {
        if (isDbCfg()) {
            setLoadingCitas(true);
            getCitasByFecha(selectedDate).then(dbCitas => {
                setCitas(dbCitas);
                const minCir = dbCitas.filter(c => c.categoria === 'Cirugía' && c.estado !== 'bloqueo_bio').reduce((a, c) => a + c.duracionMinutos, 0);
                setAltaCargaQuirurgica((minCir / 300) > 0.4);
            }).catch(err => {
                console.error('Error cargando citas:', err);
                setCitasError('Error al cargar citas desde la base de datos');
            }).finally(() => setLoadingCitas(false));
        } else {
            setCitas([]);
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
                const showHourLabel = (hour !== 10);
                hDiv.innerHTML = `
                    <div class="absolute top-0 left-0 right-0 border-t border-slate-200"></div>
                    ${showHourLabel ? `<div class="absolute top-0 -translate-y-1/2 w-full text-right pr-3 z-10">
                        <span class="text-[12px] font-bold text-slate-700 leading-none">${String(hour).padStart(2, '0')}:00</span>
                    </div>` : ''}

                    <div class="absolute top-1/4 left-0 right-0 border-t border-slate-100"></div>
                    <div class="absolute top-1/4 -translate-y-1/2 w-full text-right pr-3">
                        <span class="text-[10px] font-medium text-slate-400 leading-none">${String(hour).padStart(2, '0')}:15</span>
                    </div>

                    <div class="absolute top-2/4 left-0 right-0 border-t border-slate-200"></div>
                    <div class="absolute top-2/4 -translate-y-1/2 w-full text-right pr-3">
                        <span class="text-[11px] font-semibold text-slate-500 leading-none">${String(hour).padStart(2, '0')}:30</span>
                    </div>

                    <div class="absolute top-3/4 left-0 right-0 border-t border-slate-100"></div>
                    <div class="absolute top-3/4 -translate-y-1/2 w-full text-right pr-3">
                        <span class="text-[10px] font-medium text-slate-400 leading-none">${String(hour).padStart(2, '0')}:45</span>
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

        // ── Detectar solapamientos por gabinete ──────────────────────
        const getTimeRange = (c: typeof citas[0]) => {
            const [hh, mm] = c.horaInicio.split(':').map(Number);
            const startMin = hh * 60 + mm;
            return { start: startMin, end: startMin + c.duracionMinutos };
        };
        const overlaps = (a: { start: number; end: number }, b: { start: number; end: number }) =>
            a.start < b.end && b.start < a.end;

        // Para cada gabinete, asignar columnas a citas solapadas
        const colAssignment = new Map<string, { col: number; totalCols: number }>();
        ['G1', 'G2'].forEach(gab => {
            const gabCitas = filteredCitas.filter(c => c.gabinete === gab && c.estado !== 'bloqueo_bio');
            const ranges = gabCitas.map(c => ({ id: c.id, ...getTimeRange(c) }));
            const cols: { id: string; start: number; end: number }[][] = [];

            ranges.forEach(r => {
                // Buscar primera columna libre donde no solape
                let placed = false;
                for (let ci = 0; ci < cols.length; ci++) {
                    if (!cols[ci].some(existing => overlaps(existing, r))) {
                        cols[ci].push(r);
                        colAssignment.set(r.id, { col: ci, totalCols: 0 });
                        placed = true;
                        break;
                    }
                }
                if (!placed) {
                    cols.push([r]);
                    colAssignment.set(r.id, { col: cols.length - 1, totalCols: 0 });
                }
            });

            const totalCols = cols.length;
            // Solo dividir las citas que REALMENTE solapan con otras
            ranges.forEach(r => {
                const assignment = colAssignment.get(r.id)!;
                let maxCols = 0;
                for (let ci = 0; ci < cols.length; ci++) {
                    if (cols[ci].some(existing => overlaps(existing, r))) maxCols++;
                }
                assignment.totalCols = maxCols;
            });
        });

        filteredCitas.forEach(cita => {
            const container = cita.gabinete === 'G1' ? slotsG1 : slotsG2;
            const top = minutesToPx(cita.horaInicio);
            const height = cita.duracionMinutos * (pxPerHour / 60);

            const div = document.createElement('div');
            const overlap = colAssignment.get(cita.id);
            if (overlap && overlap.totalCols > 1) {
                const widthPct = 100 / overlap.totalCols;
                const leftPct = overlap.col * widthPct;
                div.style.cssText = `position:absolute; top:${top}px; left:${leftPct}%; width:${widthPct}%; height:${height}px; min-height:0; overflow:hidden; box-sizing:border-box; padding:0 2px;`;
            } else {
                div.style.cssText = `position:absolute; top:${top}px; left:0; right:0; height:${height}px;`;
            }

            if (cita.estado === 'bloqueo_bio') {
                div.className = 'flex items-center justify-center bg-slate-100/70 border border-dashed border-slate-300 z-0';
                div.innerHTML = `<span class="text-[9px] font-black text-slate-400 uppercase tracking-widest">bioseguridad</span>`;
            } else {
                const colIdx = cita.gabinete === 'G1' ? idxG1++ : idxG2++;
                const tc = getTreatmentColor(cita.tratamiento, cita.estado);
                // Fondo basado en tratamiento
                const baseColor = tc.main;
                const darkColor = tc.light; // degradado sutil
                const textColor = (['#FBFFA3', '#A9E6E6', '#d1d5db'].includes(tc.main)) ? '#0a3d91' : '#ffffff';
                // Cejilla y marco siempre rojo
                const cejillaColor = '#FF4B68';
                let ring = '';
                if (cita.estado === 'confirmada') ring = 'ring-2 ring-emerald-400/40';
                else if (cita.estado === 'espera') ring = 'ring-2 ring-amber-400/40';
                else if (cita.estado === 'gabinete') ring = 'ring-2 ring-blue-500/40';
                else if (cita.estado === 'finalizada') ring = 'opacity-60';

                const isOverlapping = overlap && overlap.totalCols > 1;
                div.className = `${ring} rounded-xl shadow-sm hover:shadow-md hover:-translate-y-[1px] hover:z-[40] transition-all duration-200 cursor-grab active:cursor-grabbing flex items-center z-20 ${isOverlapping ? '' : 'mx-1'} overflow-hidden group/cita`;
                div.style.cssText += `background:linear-gradient(135deg, ${baseColor}, ${darkColor}); border-left:${isOverlapping ? '4' : '8'}px solid ${cejillaColor}; border-top:1px solid ${cejillaColor}; border-right:1px solid ${cejillaColor}; border-bottom:1px solid ${cejillaColor};`;

                div.innerHTML = `
                    <div class="flex flex-col w-full px-2 py-0.5 pointer-events-none overflow-hidden" style="height:100%;-webkit-font-smoothing:antialiased;text-shadow:${textColor === '#ffffff' ? '-0.5px -0.5px 0 rgba(0,0,0,0.4), 0.5px -0.5px 0 rgba(0,0,0,0.4), -0.5px 0.5px 0 rgba(0,0,0,0.4), 0.5px 0.5px 0 rgba(0,0,0,0.4)' : '-0.5px -0.5px 0 rgba(0,0,50,0.25), 0.5px -0.5px 0 rgba(0,0,50,0.25), -0.5px 0.5px 0 rgba(0,0,50,0.25), 0.5px 0.5px 0 rgba(0,0,50,0.25)'}">
                        <div class="flex items-center gap-1.5 shrink-0" style="min-height:18px">
                            ${cita.pacienteNumPac ? `<span class="text-[10px] font-bold shrink-0 px-1 py-0 rounded" style="color:#1e3a5f;background:white">${cita.pacienteNumPac}</span>` : ''}
                            <span class="text-[12px] font-extrabold truncate leading-tight" style="color:${textColor}">${cita.nombrePaciente || 'Sin datos'}</span>
                        </div>
                        <div class="flex items-center gap-1.5 shrink-0" style="min-height:16px">
                            <span class="text-[10px] font-bold truncate leading-tight" style="color:${textColor}">${cita.tratamiento || ''}</span>
                            <span class="text-[9px] font-bold shrink-0 opacity-70" style="color:${textColor}">${cita.duracionMinutos}'</span>
                            <span class="ml-auto text-[9px] font-normal shrink-0 px-1 py-0 rounded" style="background:white;color:#1e3a5f">${cita.estado ? cita.estado.charAt(0).toUpperCase() + cita.estado.slice(1) : ''}</span>
                        </div>
                        ${cita.notas ? `<div class="text-[9px] font-medium truncate shrink-0 opacity-75 leading-tight" style="color:${textColor}">📝 ${cita.notas}</div>` : ''}
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
                                value={dateToISO(selectedDate)}
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
                            className={`text-[11px] font-bold px-3 py-1.5 rounded-md transition-all ${vistaTemporal === 'dia' ? 'text-white shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}
                            style={vistaTemporal === 'dia' ? { background: 'linear-gradient(135deg, #1d4ed8, #2563eb)' } : {}}
                        >
                            Día
                        </button>
                        <button
                            onClick={() => setVistaTemporal('semana')}
                            className={`text-[11px] font-bold px-3 py-1.5 rounded-md transition-all ${vistaTemporal === 'semana' ? 'text-white shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}
                            style={vistaTemporal === 'semana' ? { background: 'linear-gradient(135deg, #1d4ed8, #2563eb)' } : {}}
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

                {/* Column headers — must match body: 90px | flex-1 | 90px | flex-1 */}
                <div className="flex border-b border-slate-200 sticky top-0 z-30 h-12 shrink-0 bg-slate-50">
                    <div className="w-[90px] shrink-0 border-r border-slate-200 flex items-center justify-center">
                        <span className="text-[13px] font-bold text-slate-400 uppercase tracking-wider">Hora</span>
                    </div>
                    {(vistaGabinete === 'ALL' || vistaGabinete === 'G1') && (
                        <div className={`flex-1 flex items-center justify-center gap-2.5 ${vistaGabinete === 'ALL' ? 'border-r border-slate-200' : ''}`}>
                            <span className="w-2.5 h-2.5 rounded-full" style={{ background: 'linear-gradient(135deg, #1d4ed8, #2563eb)' }} />
                            <span className="text-[14px] font-bold text-slate-700 uppercase tracking-wide">{(() => { const docs = [...new Set(citas.filter(c => c.gabinete === 'G1').map(c => c.doctor))]; return docs.length > 0 ? docs.join(', ') : 'Doctores'; })()}</span>
                        </div>
                    )}
                    {vistaGabinete === 'ALL' && (
                        <div className="w-[90px] shrink-0 border-r border-slate-200 flex items-center justify-center">
                            <span className="text-[13px] font-bold text-slate-400 uppercase tracking-wider">Hora</span>
                        </div>
                    )}
                    {(vistaGabinete === 'ALL' || vistaGabinete === 'G2') && (
                        <div className="flex-1 flex items-center justify-center gap-2.5">
                            <span className="w-2.5 h-2.5 rounded-full" style={{ background: 'linear-gradient(135deg, #1d4ed8, #2563eb)' }} />
                            <span className="text-[14px] font-bold text-slate-700 uppercase tracking-wide">{(() => { const docs = [...new Set(citas.filter(c => c.gabinete === 'G2').map(c => c.doctor))]; return docs.length > 0 ? docs.join(', ') : 'Sanitarios'; })()}</span>
                        </div>
                    )}
                </div>

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

                    {/* Empty day state — removed, shown per-column instead */}

                    <div className="flex relative">
                        {/* Timeline column */}
                        <div
                            ref={timelineRef}
                            className="w-[90px] shrink-0 border-r border-slate-200 bg-white relative z-30"
                            style={{ height: totalHeight, overflow: 'visible' }}
                        />

                        <div
                            className={`flex-1 relative ${vistaGabinete === 'G2' ? 'hidden' : 'block'} cursor-pointer`}
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
                            onClick={(e) => {
                                const rect = e.currentTarget.getBoundingClientRect();
                                const y = e.clientY - rect.top;
                                const totalMin = y / (pxPerHour / 60);
                                const snapMin = Math.floor(totalMin / 15) * 15;
                                let accumulated = 0;
                                let newH = workingSegments[0][0];
                                let newM = 0;
                                for (const [start, end] of workingSegments) {
                                    const segMin = (end - start) * 60;
                                    if (snapMin - accumulated < segMin) {
                                        const rem = snapMin - accumulated;
                                        newH = start + Math.floor(rem / 60);
                                        newM = rem % 60;
                                        break;
                                    }
                                    accumulated += segMin;
                                }
                                const horaStr = `${String(newH).padStart(2, '0')}:${String(newM).padStart(2, '0')}`;
                                setEditingCita({
                                    id: crypto.randomUUID(),
                                    gabinete: 'G1',
                                    pacienteNumPac: '',
                                    nombrePaciente: '',
                                    horaInicio: horaStr,
                                    duracionMinutos: 30,
                                    tratamiento: 'Control',
                                    categoria: 'Diagnostico',
                                    estado: 'planificada',
                                    doctor: 'Dr. Mario Rubio',
                                    alertasMedicas: [],
                                    alertasLegales: [],
                                    alertasFinancieras: false,
                                    notas: '',
                                });
                            }}
                        >
                            <div ref={slotsG1Ref} className="relative w-full" style={{ height: totalHeight }} />
                            {!loadingCitas && !citasError && citas.filter(c => c.gabinete === 'G1').length === 0 && (
                                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-10">
                                    <p className="text-[12px] font-bold text-slate-400 uppercase tracking-wider">Sin citas</p>
                                </div>
                            )}
                        </div>

                        {/* Second timeline (only when both gabinetes visible) */}
                        {vistaGabinete === 'ALL' && (
                            <div
                                ref={timeline2Ref}
                                className="w-[90px] shrink-0 border-x border-slate-200 bg-white relative z-30"
                                style={{ height: totalHeight, overflow: 'visible' }}
                            />
                        )}

                        <div
                            className={`flex-1 relative ${vistaGabinete === 'G1' ? 'hidden' : 'block'} cursor-pointer`}
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
                            onClick={(e) => {
                                const rect = e.currentTarget.getBoundingClientRect();
                                const y = e.clientY - rect.top;
                                const totalMin = y / (pxPerHour / 60);
                                const snapMin = Math.floor(totalMin / 15) * 15;
                                let accumulated = 0;
                                let newH = workingSegments[0][0];
                                let newM = 0;
                                for (const [start, end] of workingSegments) {
                                    const segMin = (end - start) * 60;
                                    if (snapMin - accumulated < segMin) {
                                        const rem = snapMin - accumulated;
                                        newH = start + Math.floor(rem / 60);
                                        newM = rem % 60;
                                        break;
                                    }
                                    accumulated += segMin;
                                }
                                const horaStr = `${String(newH).padStart(2, '0')}:${String(newM).padStart(2, '0')}`;
                                setEditingCita({
                                    id: crypto.randomUUID(),
                                    gabinete: 'G2',
                                    pacienteNumPac: '',
                                    nombrePaciente: '',
                                    horaInicio: horaStr,
                                    duracionMinutos: 30,
                                    tratamiento: 'Control',
                                    categoria: 'Diagnostico',
                                    estado: 'planificada',
                                    doctor: 'Dra. Irene Garcia',
                                    alertasMedicas: [],
                                    alertasLegales: [],
                                    alertasFinancieras: false,
                                    notas: '',
                                });
                            }}
                        >
                            <div ref={slotsG2Ref} className="relative w-full" style={{ height: totalHeight }} />
                            {!loadingCitas && !citasError && citas.filter(c => c.gabinete === 'G2').length === 0 && (
                                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-10">
                                    <p className="text-[12px] font-bold text-slate-400 uppercase tracking-wider">Sin citas</p>
                                </div>
                            )}
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
                                <div className="mb-4 relative">
                                    <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-widest mb-1.5">Paciente</label>
                                    <div className="flex gap-2 mb-1">
                                        <div className="flex-1 relative">
                                            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                                            <input
                                                type="text"
                                                className="w-full bg-slate-50 border border-slate-200 rounded-lg pl-9 pr-3 py-2 text-[13px] font-bold text-[#051650] focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                                placeholder="Buscar por nombre, ID, teléfono..."
                                                value={patientQuery || editingCita.nombrePaciente}
                                                onChange={e => {
                                                    const val = e.target.value;
                                                    setPatientQuery(val);
                                                    setEditingCita({ ...editingCita, nombrePaciente: val });
                                                    if (patientSearchTimer.current) clearTimeout(patientSearchTimer.current);
                                                    patientSearchTimer.current = setTimeout(async () => {
                                                        if (val.trim().length >= 2) {
                                                            const results = await searchPacientes(val.trim());
                                                            setPatientResults(results);
                                                            setShowPatientDropdown(true);
                                                        } else {
                                                            setPatientResults([]);
                                                            setShowPatientDropdown(false);
                                                        }
                                                    }, 300);
                                                }}
                                                onFocus={async () => {
                                                    if (patientQuery.trim().length >= 2) {
                                                        setShowPatientDropdown(true);
                                                    }
                                                }}
                                            />
                                        </div>
                                        <div className="w-20">
                                            <input
                                                type="text"
                                                className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-[13px] font-bold text-[#051650] text-center focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                                placeholder="ID"
                                                value={editingCita.pacienteNumPac}
                                                onChange={e => setEditingCita({ ...editingCita, pacienteNumPac: e.target.value })}
                                                title="NumPac / ID del paciente"
                                            />
                                        </div>
                                    </div>
                                    {/* Dropdown de resultados */}
                                    {showPatientDropdown && patientResults.length > 0 && (
                                        <div className="absolute left-0 right-0 top-full z-50 bg-white border border-slate-200 rounded-xl shadow-xl max-h-48 overflow-y-auto mt-1">
                                            {patientResults.map(p => (
                                                <button
                                                    key={p.numPac}
                                                    className="w-full flex items-center gap-3 px-3 py-2 hover:bg-slate-50 text-left transition-colors border-b border-slate-50 last:border-0"
                                                    onClick={() => {
                                                        setEditingCita({
                                                            ...editingCita,
                                                            nombrePaciente: `${p.apellidos}, ${p.nombre}`.trim(),
                                                            pacienteNumPac: p.numPac,
                                                        });
                                                        setPatientQuery('');
                                                        setShowPatientDropdown(false);
                                                    }}
                                                >
                                                    <span className="text-[10px] font-bold text-white px-1.5 py-0.5 rounded" style={{ background: 'linear-gradient(135deg, #1d4ed8, #2563eb)' }}>{p.numPac}</span>
                                                    <span className="text-[12px] font-bold text-slate-800 truncate">{p.apellidos}, {p.nombre}</span>
                                                    {p.telefono && <span className="text-[10px] text-slate-400 ml-auto shrink-0">📞 {p.telefono}</span>}
                                                </button>
                                            ))}
                                        </div>
                                    )}
                                    {showPatientDropdown && patientResults.length === 0 && patientQuery.trim().length >= 2 && (
                                        <div className="absolute left-0 right-0 top-full z-50 bg-white border border-slate-200 rounded-xl shadow-xl mt-1 p-3 text-center">
                                            <p className="text-[11px] text-slate-400">Sin resultados</p>
                                            <button
                                                className="text-[11px] font-bold text-blue-600 mt-1 hover:underline"
                                                onClick={() => {
                                                    setEditingCita({ ...editingCita, nombrePaciente: patientQuery, pacienteNumPac: '' });
                                                    setShowPatientDropdown(false);
                                                }}
                                            >
                                                + Paciente nuevo
                                            </button>
                                        </div>
                                    )}
                                </div>

                                <div className="grid grid-cols-2 gap-3 mb-4">
                                    <div>
                                        <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-widest mb-1.5">Tratamiento</label>
                                        <select
                                            className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-[13px] font-bold text-[#051650] focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                            value={editingCita.tratamiento}
                                            onChange={e => setEditingCita({ ...editingCita, tratamiento: e.target.value })}
                                        >
                                            {['Ajuste Prot/tto', 'Cirugia de Implante', 'Cirugia/Injerto',
                                                'Colocacion Ortodoncia', 'Control', 'Endodoncia',
                                                'Estudio Ortodoncia', 'Exodoncia', 'Higiene Dental',
                                                'Mensualidad Ortodoncia', 'Periodoncia', 'Primera Visita',
                                                'Protesis Fija', 'Protesis Removible', 'Reconstruccion',
                                                'Retirar Ortodoncia', 'Rx/escaner', 'Urgencia'
                                            ].map(t => <option key={t} value={t}>{t}</option>)}
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-widest mb-1.5">Doctor</label>
                                        <select
                                            className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-[13px] font-bold text-[#051650] focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                            value={editingCita.doctor}
                                            onChange={e => setEditingCita({ ...editingCita, doctor: e.target.value })}
                                        >
                                            <option value="Dr. Mario Rubio">Dr. Mario Rubio</option>
                                            <option value="Dra. Irene Garcia">Dra. Irene Garcia</option>
                                            <option value="Dra. Virginia Tresgallo">Dra. Virginia Tresgallo</option>
                                            <option value="Dr. Ignacio Ferrero">Dr. Ignacio Ferrero</option>
                                            <option value="Dra. Miriam Carrasco">Dra. Miriam Carrasco</option>
                                            <option value="Tc. Juan Antonio Manzanedo">Tc. Juan Antonio Manzanedo</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-3 mb-4">
                                    <div>
                                        <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-widest mb-1.5">Hora Inicio</label>
                                        <select
                                            className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-[13px] font-bold text-[#051650] focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                            value={editingCita.horaInicio}
                                            onChange={e => setEditingCita({ ...editingCita, horaInicio: e.target.value })}
                                        >
                                            {Array.from({ length: 14 * 4 }, (_, i) => {
                                                const h = Math.floor(i / 4) + 8;
                                                const m = (i % 4) * 15;
                                                const val = `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`;
                                                return <option key={val} value={val}>{val}</option>;
                                            })}
                                        </select>
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

                                <div className="mb-4">
                                    <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-widest mb-1.5">Situación Cita</label>
                                    <select
                                        className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-[13px] font-bold text-[#051650] focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                        value={editingCita.estado}
                                        onChange={e => setEditingCita({ ...editingCita, estado: e.target.value as any })}
                                    >
                                        <option value="planificada">Planificada</option>
                                        <option value="confirmada">Confirmada</option>
                                        <option value="espera">En Sala de Espera</option>
                                        <option value="gabinete">En Gabinete</option>
                                        <option value="finalizada">Finalizada</option>
                                        <option value="fallada">No Show / Fallada</option>
                                        <option value="anulada">Anulada</option>
                                        <option value="cancelada">Cancelada</option>
                                    </select>
                                </div>

                                <div className="mb-4">
                                    <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-widest mb-1.5">Notas / Observaciones</label>
                                    <textarea
                                        className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-[13px] text-[#051650] focus:ring-2 focus:ring-blue-500 focus:outline-none resize-none"
                                        rows={3}
                                        placeholder="Notas libres sobre la cita..."
                                        value={editingCita.notas || ''}
                                        onChange={e => setEditingCita({ ...editingCita, notas: e.target.value })}
                                    />
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
