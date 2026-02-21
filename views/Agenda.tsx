
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
    ChevronRight as ChevronRightIcon
} from 'lucide-react';
import { Badge } from '../components/UI';
import {
    getCitasByFecha, updateCita, updateEstadoCita, createCita, deleteCita,
    isDbConfigured as isDbCfg, dateToISO
} from '../services/citas.service';

interface AgendaProps {
    activeSubArea?: string;
}

const CATEGORIA_CONFIG: Record<TratamientoCategoria, { bg: string, text: string, border: string }> = {
    'Cirugía': { bg: 'bg-rose-50', text: 'text-rose-700', border: 'border-l-4 border-rose-400' },
    'Higiene': { bg: 'bg-emerald-50', text: 'text-emerald-700', border: 'border-l-4 border-emerald-400' },
    'Ortodoncia': { bg: 'bg-blue-50', text: 'text-blue-700', border: 'border-l-4 border-blue-400' },
    'Diagnostico': { bg: 'bg-slate-50', text: 'text-slate-700', border: 'border-l-4 border-slate-400' },
    'Urgencia': { bg: 'bg-amber-50', text: 'text-amber-700', border: 'border-l-4 border-amber-400' },
    'Protesis': { bg: 'bg-purple-50', text: 'text-purple-700', border: 'border-l-4 border-purple-400' },
};

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
    const [selectedDate, setSelectedDate] = useState<Date>(() => {
        const d = new Date(); d.setHours(0, 0, 0, 0); return d;
    });

    const goDay = (delta: number) => setSelectedDate(prev => {
        const d = new Date(prev); d.setDate(d.getDate() + delta); return d;
    });
    const goToday = () => { const d = new Date(); d.setHours(0, 0, 0, 0); setSelectedDate(d); };
    const isToday = selectedDate.toDateString() === new Date().toDateString();
    const DIAS_ES = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];
    const MESES_ES = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];
    const dateLabel = `${DIAS_ES[selectedDate.getDay()]} ${selectedDate.getDate()} ${MESES_ES[selectedDate.getMonth()]} ${selectedDate.getFullYear()}`;

    // ── Working hours ─────────────────────────────────────────────────────────
    const dayOfWeek = selectedDate.getDay(); // 0=Sun,5=Fri,6=Sat
    const isFriday = dayOfWeek === 5;
    const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
    // Each segment: [startHour, endHour]
    const workingSegments: [number, number][] = isFriday || isWeekend
        ? [[10, 14]]
        : [[10, 14], [16, 20]];

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
        const firstHour = workingSegments[0][0];
        return (h - firstHour) * pxPerHour + m * (pxPerHour / 60);
    };

    // ── Initial data + reload por fecha ──────────────────────────────────────
    useEffect(() => {
        const INITIAL_CITAS: Cita[] = [
            { id: '101', gabinete: 'G1', pacienteId: 'p1', nombrePaciente: 'Bárbara Ruiz', horaInicio: '10:15', duracionMinutos: 90, tratamiento: 'Implantes 2.6, 2.7', categoria: 'Cirugía', estado: 'gabinete', doctor: 'Dr. García', alertasMedicas: ['Látex'], alertasLegales: [], alertasFinancieras: false, presupuestoPendiente: false, pruebasPendientes: true },
            { id: 'bio_101', gabinete: 'G1', pacienteId: '', nombrePaciente: 'BIOSEGURIDAD', horaInicio: '11:45', duracionMinutos: 15, tratamiento: 'Desinfección Quirúrgica', categoria: 'Cirugía', estado: 'bloqueo_bio', doctor: '', alertasMedicas: [], alertasLegales: [], alertasFinancieras: false },
            { id: '102', gabinete: 'G2', pacienteId: 'p2', nombrePaciente: 'Javier Abad', horaInicio: '10:30', duracionMinutos: 45, tratamiento: 'Revisión Anual', categoria: 'Diagnostico', estado: 'espera', doctor: 'Dra. Rubio', alertasMedicas: [], alertasLegales: ['Consentimiento'], alertasFinancieras: false },
            { id: '103', gabinete: 'G2', pacienteId: 'p3', nombrePaciente: 'Maria Carmen', horaInicio: '11:30', duracionMinutos: 30, tratamiento: 'Curetaje Cuad. 2', categoria: 'Higiene', estado: 'confirmada', doctor: 'Hig. Sonia', alertasMedicas: [], alertasLegales: [], alertasFinancieras: true, presupuestoPendiente: true },
            { id: '104', gabinete: 'G1', pacienteId: 'p4', nombrePaciente: 'Pedro Martinez', horaInicio: '12:30', duracionMinutos: 60, tratamiento: 'Endodoncia Multirradicular', categoria: 'Cirugía', estado: 'planificada', doctor: 'Dr. García', alertasMedicas: ['Cardiopatía'], alertasLegales: [], alertasFinancieras: false, trabajoLaboratorio: true },
        ];

        if (isDbCfg()) {
            // Cargar citas reales desde BD
            getCitasByFecha(selectedDate).then(dbCitas => {
                setCitas(dbCitas.length > 0 ? dbCitas : INITIAL_CITAS);
                const minCir = dbCitas.filter(c => c.categoria === 'Cirugía' && c.estado !== 'bloqueo_bio').reduce((a, c) => a + c.duracionMinutos, 0);
                setAltaCargaQuirurgica((minCir / 300) > 0.4);
            });
        } else {
            setCitas(INITIAL_CITAS);
            const minCir = INITIAL_CITAS.filter(c => c.categoria === 'Cirugía' && c.estado !== 'bloqueo_bio').reduce((a, c) => a + c.duracionMinutos, 0);
            setAltaCargaQuirurgica((minCir / 300) > 0.4);
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

    // Close context menu on outside click
    useEffect(() => {
        const close = () => setContextMenu(null);
        window.addEventListener('click', close);
        return () => window.removeEventListener('click', close);
    }, []);

    // ── Render timeline + slots imperatively ──────────────────────────────────
    useEffect(() => {
        if (activeSubArea === 'Gestión de Citas') return;
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
                hDiv.className = 'relative flex flex-col items-center pt-1 shrink-0';
                hDiv.style.height = `${pxPerHour}px`;
                hDiv.innerHTML = `
                    <span class="text-[10px] font-black text-slate-500 leading-none">${hour}:00</span>
                    <div class="absolute top-[30px]  left-0 right-0 border-b border-dashed border-slate-100"></div>
                    <div class="absolute top-[60px]  left-0 right-0 border-b border-solid border-slate-200 opacity-70"></div>
                    <div class="absolute top-[90px]  left-0 right-0 border-b border-dashed border-slate-100"></div>
                `;
                timeline.appendChild(hDiv);
            }
        });

        // --- Render all citas ---
        slotsG1.innerHTML = '';
        slotsG2.innerHTML = '';

        citas.forEach(cita => {
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
                const cfg = CATEGORIA_CONFIG[cita.categoria];
                let ring = '';
                if (cita.estado === 'confirmada') ring = 'ring-2 ring-emerald-400/40';
                else if (cita.estado === 'espera') ring = 'ring-2 ring-amber-400/40';
                else if (cita.estado === 'gabinete') ring = 'ring-2 ring-blue-500/40 shadow-blue-200';
                else if (cita.estado === 'finalizada') ring = 'opacity-50 grayscale';

                div.className = `${cfg.bg} ${cfg.border} ${ring} shadow hover:shadow-md transition-shadow cursor-grab active:cursor-grabbing overflow-hidden flex flex-col justify-start z-10 hover:z-20`;

                const showFooter = height >= 50;
                div.innerHTML = `
                    <div class="flex items-start gap-1 px-2 pt-1.5 min-h-0">
                        <div class="flex-1 min-w-0">
                            <div class="flex items-center gap-1.5 mb-0.5">
                                <span class="text-[9px] font-black ${cfg.text} shrink-0">${cita.horaInicio}</span>
                                ${cita.estado === 'gabinete' ? '<span class="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping shrink-0"></span>' : ''}
                                ${cita.alertasMedicas.length > 0 ? '<span class="w-1.5 h-1.5 rounded-full bg-rose-500 shrink-0" title="Alerta médica"></span>' : ''}
                            </div>
                            <p class="text-[11px] font-bold text-slate-800 truncate leading-tight">${cita.nombrePaciente}</p>
                            ${height >= 42 ? `<p class="text-[9px] text-slate-500 truncate mt-0.5 leading-tight">${cita.tratamiento}</p>` : ''}
                        </div>
                    </div>
                    ${showFooter ? `
                    <div class="px-2 pb-1 mt-auto border-t border-black/5 flex items-center gap-1.5 pt-0.5">
                        <span class="text-[8px] font-black text-slate-400 uppercase truncate">${cita.doctor.split(' ').slice(-1)[0]}</span>
                        ${cita.presupuestoPendiente ? '<span class="text-amber-500 text-[9px] font-black">$</span>' : ''}
                        ${cita.pruebasPendientes ? '<span class="w-1 h-1 rounded-full bg-blue-400"></span>' : ''}
                    </div>` : ''}
                `;

                div.draggable = true;
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
                const firstHour = workingSegments[0][0];
                const newH = firstHour + Math.floor(snapMin / 60);
                const newM = snapMin % 60;
                const newTime = `${String(newH).padStart(2, '0')}:${String(newM).padStart(2, '0')}`;
                setCitas(prev => prev.map(c => c.id === citaId ? { ...c, horaInicio: newTime, gabinete: gabId as 'G1' | 'G2' } : c));
                // Persistir drag en BD
                updateCita(citaId, { horaInicio: newTime, gabinete: gabId }, selectedDate);
            };
        });
    }, [citas, activeSubArea, pxPerHour]);

    if (activeSubArea === 'Gestión de Citas') return <ConfiguracionAgenda />;

    return (
        <div className="flex flex-1 flex-col gap-4 p-4 relative overflow-hidden">

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

            {/* Operative alert */}
            {altaCargaQuirurgica && (
                <div className="bg-rose-600 text-white px-4 py-3 rounded-xl shadow-lg flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <Activity className="w-4 h-4 animate-pulse shrink-0" />
                        <span className="text-[12px] font-bold">Alta carga quirúrgica (&gt;40%) — asignar auxiliar flotante a Gab. 1</span>
                    </div>
                    <button onClick={() => setAltaCargaQuirurgica(false)} className="p-1 hover:bg-white/10 rounded-full">
                        <X className="w-4 h-4" />
                    </button>
                </div>
            )}

            {/* Header */}
            <header className="flex justify-between items-center px-1 flex-shrink-0">
                <div className="flex items-center gap-3">
                    <Badge variant="blue">Gesden One Sync</Badge>
                    <div className="w-2 h-2 rounded-full bg-emerald-500" />
                    <h1 className="text-xl font-bold text-slate-800 dark:text-white uppercase tracking-tight">Control de Gabinetes</h1>
                </div>
                <div className="flex items-center gap-3">
                    {/* DATE NAV */}
                    <div className="flex items-center gap-1 bg-white border border-slate-200 rounded-lg shadow-sm overflow-hidden">
                        <button
                            onClick={() => goDay(-1)}
                            className="w-8 h-8 flex items-center justify-center text-slate-400 hover:bg-slate-50 hover:text-slate-700 transition-all"
                        >
                            <ChevronLeft className="w-4 h-4" />
                        </button>
                        <label className="flex items-center gap-1.5 px-3 min-w-[180px] justify-center cursor-pointer hover:bg-slate-50 transition-all h-8 relative">
                            <Calendar className="w-3.5 h-3.5 text-[#051650]" />
                            <span className="text-[11px] font-black text-[#051650] uppercase tracking-wide">{dateLabel}</span>
                            <input
                                type="date"
                                value={selectedDate.toISOString().split('T')[0]}
                                onChange={e => {
                                    if (e.target.value) {
                                        const d = new Date(e.target.value + 'T00:00:00');
                                        setSelectedDate(d);
                                    }
                                }}
                                className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                            />
                        </label>
                        <button
                            onClick={() => goDay(1)}
                            className="w-8 h-8 flex items-center justify-center text-slate-400 hover:bg-slate-50 hover:text-slate-700 transition-all"
                        >
                            <ChevronRightIcon className="w-4 h-4" />
                        </button>
                    </div>
                    {!isToday && (
                        <button
                            onClick={goToday}
                            className="text-[10px] font-black uppercase tracking-wider text-white bg-[#051650] px-3 py-1.5 rounded-lg hover:bg-blue-800 transition-all"
                        >
                            Hoy
                        </button>
                    )}
                    {/* DOCTOR FILTER */}
                    <div className="flex items-center bg-white border border-slate-200 rounded-lg p-1 shadow-sm">
                        <Filter className="w-3.5 h-3.5 text-slate-400 mx-2" />
                        <button className="text-[10px] font-bold uppercase text-slate-500 px-3 py-1 hover:bg-slate-50 rounded transition-all">Dra. Rubio</button>
                        <button className="text-[10px] font-bold uppercase text-white bg-blue-600 px-3 py-1 rounded shadow-sm transition-all">Dr. García</button>
                    </div>
                </div>
            </header>

            {/* Main grid */}
            <main className="flex-1 flex flex-col bg-white dark:bg-slate-900 rounded-xl shadow border border-slate-200 overflow-hidden">

                {/* Column headers */}
                <div className="flex bg-slate-50 border-b border-slate-200 sticky top-0 z-30 h-10">
                    <div className="w-[60px] shrink-0 border-r border-slate-200 flex items-center justify-center">
                        <Clock className="w-3.5 h-3.5 text-slate-400" />
                    </div>
                    <div className="flex-1 grid grid-cols-2 divide-x divide-slate-200">
                        <div className="flex items-center justify-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_6px_rgba(16,185,129,0.5)]" />
                            <span className="text-[11px] font-black text-slate-700 uppercase tracking-wider">Gab. 1 — Cirugía</span>
                        </div>
                        <div className="flex items-center justify-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-blue-600 shadow-[0_0_6px_rgba(37,99,235,0.4)]" />
                            <span className="text-[11px] font-black text-slate-700 uppercase tracking-wider">Gab. 2 — General</span>
                        </div>
                    </div>
                </div>

                {/* Scrollable grid body */}
                <div ref={scrollContainerRef} className="flex-1 overflow-y-auto">
                    <div className="flex" style={{ height: totalHeight }}>

                        {/* Timeline column — same px height as slots */}
                        <div
                            ref={timelineRef}
                            className="w-[60px] shrink-0 border-r border-slate-200 bg-slate-50/50 relative"
                            style={{ height: totalHeight }}
                        />

                        {/* Gabinetes grid */}
                        <div
                            className="flex-1 grid grid-cols-2 divide-x divide-slate-200 relative"
                            style={{
                                height: totalHeight,
                                backgroundImage: [
                                    'linear-gradient(to bottom, #e2e8f0 1px, transparent 1px)',   // hour lines
                                    'linear-gradient(to bottom, #f1f5f9 1px, transparent 1px)',   // 30-min
                                ].join(','),
                                backgroundSize: `100% ${pxPerHour}px, 100% ${pxPerHour / 2}px`,
                                backgroundPosition: '0 0, 0 0',
                            }}
                        >
                            <div ref={slotsG1Ref} className="relative" style={{ height: totalHeight }} />
                            <div ref={slotsG2Ref} className="relative" style={{ height: totalHeight }} />
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Agenda;
