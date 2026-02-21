
import React, { useState, useEffect } from 'react';
import SOAPEditor from '../components/pacientes/SOAPEditor';
import PatientSearchModal from '../components/pacientes/PatientSearchModal';
import AlertasPanel from '../components/pacientes/AlertasPanel';
import Odontograma from '../components/pacientes/Odontograma';
import Periodontograma from '../components/pacientes/Periodontograma';
import Economica from '../components/pacientes/Economica';
import Documentos from '../components/pacientes/Documentos';
import { SOAPNote, Paciente } from '../types';
import {
    Activity, CheckCircle, Clock, Brain, Camera,
    FileText, CircleDollarSign, ChevronDown, ChevronUp,
    Stethoscope, ShieldCheck, ShieldAlert, Pencil,
    Phone, Calendar, MessageSquare, ArrowLeftRight,
    Gavel, UserPlus, TrendingUp, AlertTriangle, X, Plus, Save, Pill
} from 'lucide-react';
import {
    getPatientPanoramicas, isRomexisConfigured, type RomexisPanoramica
} from '../services/romexis.service';
import {
    getPatientPhotos, isGDriveConfigured, type PatientPhoto
} from '../services/gdrive.service';
import {
    getMedications, getAllergies, upsertMedication, deleteMedication,
    upsertAllergy, deleteAllergy, isSupabaseConfigured,
    type PatientMedication, type PatientAllergy
} from '../services/supabase.service';
import {
    getSoapNotes, createSoapNote, updateSoapNote,
} from '../services/soap.service';
import { searchVademecum, type Medicamento } from '../data/vademecum';
import { Badge } from '../components/UI';

interface PacientesProps {
    activeSubArea: string;
    onSubAreaChange: (subArea: string) => void;
    showToast: (message: string) => void;
}

const initialPacienteState: Paciente = {
    id: "6110",
    nombre: "Bárbara",
    apellidos: "Ruiz Fernandez",
    dni: "12345678X",
    telefono: "600123456",
    fechaNacimiento: "1985-05-20",
    medicacionActual: "Paracetamol (ocasional)",
    alergias: ["Látex", "Metales pesados"],
    deuda: true,
    consentimientosFirmados: false,
    historial: [
        {
            id: "1",
            fecha: "20 Oct 2024",
            doctor: "Pablo García",
            especialidad: "Implantología",
            subjetivo: "Paciente acude para revisión post-quirúrgica. Refiere molestia leve (3/10) en zona del 2.6.",
            objetivo: "Encía en fase de cicatrización normocrómica. Puntos de sutura estables. RX control: implante osteointegrado.",
            analisis: "Evolución clínica satisfactoria.",
            plan: "Retirada de puntos. Higiene de la zona con clorhexidina 0.12%. Próxima cita en 15 días.",
            firmada: true,
            eva: 3,
            timestamp: "2024-10-20 11:34:22",
            alertasDetectadas: []
        },
        {
            id: "2",
            fecha: "05 Ago 2024",
            doctor: "Elena Rubio",
            especialidad: "Higiene",
            subjetivo: "Revisión semestral de higiene. Sin sintomatología.",
            objetivo: "Placa supragingival moderada en sectores posteriores. Sin sangrado al sondaje.",
            analisis: "Gingivitis leve inducida por placa.",
            plan: "Tartrectomía ultrasónica. Pulido. Instrucciones de higiene reforzadas.",
            firmada: true,
            eva: 0,
            timestamp: "2024-08-05 09:15:00",
            alertasDetectadas: []
        },
        {
            id: "3",
            fecha: "14 Mar 2024",
            doctor: "Pablo García",
            especialidad: "Implantología",
            subjetivo: "Primera fase quirúrgica. Colocación implante 2.6. Paciente nerviosa pero estable.",
            objetivo: "Anestesia local efectiva. Inserción implante Nobel Ø4.3 L10mm. Torque 45Ncm. ISQ 72.",
            analisis: "Implante inserto en buenas condiciones. Sin complicaciones intraoperatorias.",
            plan: "Sutura reabsorbible 3-0. Amoxicilina 500mg 8h/7d. Ibuprofeno 600mg 8h/3d. Control en 10 días.",
            firmada: true,
            eva: 5,
            timestamp: "2024-03-14 10:00:00",
            alertasDetectadas: ["Alergia látex — guantes nitrilo"]
        },
        {
            id: "4",
            fecha: "22 Ene 2024",
            doctor: "Elena Rubio",
            especialidad: "Ortodoncia",
            subjetivo: "Visita de seguimiento ortodoncia. Refiere ligera molestia tras último ajuste.",
            objetivo: "Alineación mejorando en sector anterior. Rotación del 2.3 sin alcanzar objetivo. Gaps residuales de 0.5mm.",
            analisis: "Progreso adecuado. Estimado 3-4 meses más para finalizar.",
            plan: "Cambio aligner set 18→19. Cita en 6 semanas.",
            firmada: true,
            eva: 1,
            timestamp: "2024-01-22 17:00:00",
            alertasDetectadas: []
        },
        {
            id: "5",
            fecha: "03 Nov 2023",
            doctor: "Pablo García",
            especialidad: "Urgencia",
            subjetivo: "Dolor agudo en 3.6, EVA 8/10. Inicio hace 48h. Dolor nocturno. Pulsátil.",
            objetivo: "Percusión positiva en 3.6. Prueba de frío: no responde. RX: lesión periapical difusa Ø4mm.",
            analisis: "Necrosis pulpar con absceso periapical agudo en 3.6.",
            plan: "Apertura cameral de urgencia bajo anestesia. Drenaje. Prescripción amoxicilina + metronidazol. Cita en 3 días para inicio endodoncia.",
            firmada: true,
            eva: 8,
            timestamp: "2023-11-03 19:30:00",
            alertasDetectadas: ["Dolor severo — seguimiento prioritario"]
        },
        {
            id: "6",
            fecha: "18 Sep 2023",
            doctor: "Elena Rubio",
            especialidad: "Diagnóstico",
            subjetivo: "Primera visita. Paciente refiere no haber ido al dentista en 5 años. Quiere revisión completa.",
            objetivo: "Exploración intraoral: múltiples caries (1.7, 2.3, 3.6). Periodontitis estadio II. Maloclusión clase II div 1.",
            analisis: "Patología múltiple. Prioridad: periodoncia básica y urgencias cariosas.",
            plan: "Ortopantomografía + serie periapical. Presupuesto global. Inicio higiene profesional. Cita implantología para valoración 1.6.",
            firmada: true,
            eva: 2,
            timestamp: "2023-09-18 11:00:00",
            alertasDetectadas: []
        },
        {
            id: "7",
            fecha: "02 Feb 2023",
            doctor: "Pablo García",
            especialidad: "Cirugía",
            subjetivo: "Extracción 1.6 irrecuperable. Pérdida de soporte >80%, fractura radicular vertical.",
            objetivo: "TC previo: tabla vestibular preservada, tabique interdental presente. Sin patología sinusal.",
            analisis: "Exodoncia indicada. Sector favorable para implante diferido 3 meses.",
            plan: "Extracción atraumática con luxadores Bein. Curetaje alveolar. Colágeno hemostático. Sutura. Mantener espacio para implante futuro.",
            firmada: true,
            eva: 4,
            timestamp: "2023-02-02 09:00:00",
            alertasDetectadas: []
        }
    ]
};

// Color por especialidad
const especialidadConfig: Record<string, { dot: string; badge: string; border: string }> = {
    'Implantología': { dot: 'bg-rose-500', badge: 'bg-rose-50 text-rose-700 border-rose-200', border: 'border-l-rose-500' },
    'Higiene': { dot: 'bg-emerald-500', badge: 'bg-emerald-50 text-emerald-700 border-emerald-200', border: 'border-l-emerald-500' },
    'Ortodoncia': { dot: 'bg-blue-500', badge: 'bg-blue-50 text-blue-700 border-blue-200', border: 'border-l-blue-500' },
    'Diagnóstico': { dot: 'bg-slate-400', badge: 'bg-slate-50 text-slate-600 border-slate-200', border: 'border-l-slate-400' },
    'Urgencia': { dot: 'bg-amber-500', badge: 'bg-amber-50 text-amber-700 border-amber-200', border: 'border-l-amber-500' },
    'Cirugía': { dot: 'bg-purple-500', badge: 'bg-purple-50 text-purple-700 border-purple-200', border: 'border-l-purple-500' },
    'General': { dot: 'bg-slate-400', badge: 'bg-slate-50 text-slate-600 border-slate-200', border: 'border-l-slate-400' },
};
const getEsp = (esp: string) => especialidadConfig[esp] ?? especialidadConfig['General'];


const Pacientes: React.FC<PacientesProps> = ({ activeSubArea, onSubAreaChange, showToast }) => {
    const [paciente, setPaciente] = useState<Paciente>(initialPacienteState);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [searchInitialView, setSearchInitialView] = useState<'search' | 'create'>('search');
    const [saraTyped, setSaraTyped] = useState('');
    const saraText = `Paciente con recurrencia en dolor. Alergia al látex activa — asegurar material alternativo en G1. RX control pieza 2.5 recomendado. Considerar revisión periodoncia en próxima visita.`;
    // Cuadrantes state
    const [expandedNoteId, setExpandedNoteId] = useState<string | null>(null);
    const [editingNoteId, setEditingNoteId] = useState<string | null>(null);
    const [panoramicaIdx, setPanoramicaIdx] = useState(0);
    const [fotoIdx, setFotoIdx] = useState(0);
    const [panoramicas, setPanoramicas] = useState<RomexisPanoramica[]>([]);
    const [fotos, setFotos] = useState<PatientPhoto[]>([]);
    const [loadingRX, setLoadingRX] = useState(true);
    const [loadingFotos, setLoadingFotos] = useState(true);

    // Alertas + Medicación state
    const [medications, setMedications] = useState<PatientMedication[]>([]);
    const [allergies, setAllergies] = useState<PatientAllergy[]>([]);
    const [alertEditMode, setAlertEditMode] = useState(false);
    const [newAllergyText, setNewAllergyText] = useState('');
    const [medQuery, setMedQuery] = useState('');
    const [medSuggestions, setMedSuggestions] = useState<Medicamento[]>([]);

    // Inicializar alergias y medicaciones desde el paciente + Supabase
    useEffect(() => {
        // Alergias: partir del estado local del paciente (mock)
        const localAllergies: PatientAllergy[] = paciente.alergias.map((n, i) => ({
            id: `local-${i}`, paciente_id: paciente.id, nombre: n, severidad: 'moderada' as const,
        }));
        const localMeds: PatientMedication[] = paciente.medicacionActual
            ? [{ id: 'local-med-0', paciente_id: paciente.id, nombre: paciente.medicacionActual, importante: false }]
            : [];

        setAllergies(localAllergies);
        setMedications(localMeds);

        if (isSupabaseConfigured()) {
            getAllergies(paciente.id).then(a => { if (a.length) setAllergies(a); });
            getMedications(paciente.id).then(m => { if (m.length) setMedications(m); });
        }

        // Cargar notas SOAP desde BD (si está configurado)
        getSoapNotes(paciente.id).then(notes => {
            if (notes.length > 0) {
                setPaciente(prev => ({ ...prev, historial: notes }));
            }
        });
    }, [paciente.id]);

    // Autocompletado del vademecum
    useEffect(() => {
        setMedSuggestions(searchVademecum(medQuery));
    }, [medQuery]);


    useEffect(() => {
        if (activeSubArea === 'ACTION_SEARCH') { setSearchInitialView('search'); setIsSearchOpen(true); onSubAreaChange('Historial Clínico'); }
        else if (activeSubArea === 'ACTION_NEW') { setSearchInitialView('create'); setIsSearchOpen(true); onSubAreaChange('Historial Clínico'); }
    }, [activeSubArea, onSubAreaChange]);

    // SARA IA typing effect
    useEffect(() => {
        setSaraTyped('');
        let i = 0;
        const timer = setInterval(() => {
            setSaraTyped(saraText.slice(0, i + 1));
            i++;
            if (i >= saraText.length) clearInterval(timer);
        }, 18);
        return () => clearInterval(timer);
    }, [paciente.id]);

    const handleSelectPatient = (p: Paciente) => { setPaciente(p); showToast(`Cargando ficha de ${p.nombre}`); };

    const handleSaveNote = async (noteData: { subjetivo: string; objetivo: string; analisis: string; plan: string; eva: number; fecha?: string; especialidad?: string }) => {
        const fechaDisplay = noteData.fecha
            ? new Date(noteData.fecha).toLocaleDateString('es-ES', { day: '2-digit', month: 'short', year: 'numeric' })
            : new Date().toLocaleDateString('es-ES', { day: '2-digit', month: 'short', year: 'numeric' });
        const newNote: SOAPNote = {
            id: Date.now().toString(),
            fecha: fechaDisplay,
            doctor: 'Elena Rubio',
            especialidad: noteData.especialidad || 'General',
            subjetivo: noteData.subjetivo || '',
            objetivo: noteData.objetivo || '',
            analisis: noteData.analisis || '',
            plan: noteData.plan || '',
            firmada: true,
            eva: noteData.eva || 0,
            timestamp: new Date().toISOString().replace('T', ' ').split('.')[0],
            alertasDetectadas: []
        };
        // Intentar persistir en BD
        const savedNote = await createSoapNote(paciente.id, newNote);
        const finalNote = savedNote ?? newNote;
        setPaciente(prev => ({ ...prev, historial: [finalNote, ...prev.historial] }));
        showToast('Evolutivo registrado legalmente');
    };

    const handleUpdateNote = async (id: string, data: { subjetivo: string; objetivo: string; analisis: string; plan: string; eva: number; fecha?: string; especialidad?: string }) => {
        // Persistir en BD
        await updateSoapNote(id, {
            subjetivo: data.subjetivo, objetivo: data.objetivo,
            analisis: data.analisis, plan: data.plan,
            eva: data.eva,
            ...(data.fecha ? { fecha: data.fecha } : {}),
            ...(data.especialidad ? { especialidad: data.especialidad } : {}),
        });
        setPaciente(prev => ({
            ...prev,
            historial: prev.historial.map(n =>
                n.id === id
                    ? {
                        ...n,
                        subjetivo: data.subjetivo,
                        objetivo: data.objetivo,
                        analisis: data.analisis,
                        plan: data.plan,
                        eva: data.eva,
                        fecha: data.fecha
                            ? new Date(data.fecha).toLocaleDateString('es-ES', { day: '2-digit', month: 'short', year: 'numeric' })
                            : n.fecha,
                        especialidad: data.especialidad ?? n.especialidad,
                    }
                    : n
            ),
        }));
        setEditingNoteId(null);
        setExpandedNoteId(id);
        showToast('Entrada clínica actualizada');
    };

    const handleAlertsChange = (newAlerts: { alergias: string[]; deuda: boolean }) => {
        setPaciente(prev => ({ ...prev, ...newAlerts }));
        showToast("Alertas de seguridad actualizadas");
    };

    // ── Handlers alergias ──────────────────────────────────────
    const handleAddAllergy = async () => {
        const nombre = newAllergyText.trim();
        if (!nombre) return;
        const newA: PatientAllergy = {
            id: crypto.randomUUID(), paciente_id: paciente.id, nombre, severidad: 'moderada'
        };
        setAllergies(prev => [...prev, newA]);
        setNewAllergyText('');
        if (isSupabaseConfigured()) await upsertAllergy({ paciente_id: paciente.id, nombre, severidad: 'moderada' });
        showToast(`Alergia "${nombre}" añadida`);
    };

    const handleRemoveAllergy = async (id: string) => {
        setAllergies(prev => prev.filter(a => a.id !== id));
        if (isSupabaseConfigured()) await deleteAllergy(id);
        showToast('Alergia eliminada');
    };

    // ── Handlers medicación ────────────────────────────────────
    const handleAddMedication = async (med: Medicamento) => {
        const newMed: PatientMedication = {
            id: crypto.randomUUID(), paciente_id: paciente.id,
            nombre: med.nombre, importante: med.importante,
            categoria: med.categoria, nota: med.nota,
        };
        setMedications(prev => [...prev, newMed]);
        setMedQuery('');
        setMedSuggestions([]);
        if (isSupabaseConfigured()) await upsertMedication(newMed);
        showToast(`${med.nombre} añadido al perfil`);
    };

    const handleRemoveMedication = async (id: string) => {
        setMedications(prev => prev.filter(m => m.id !== id));
        if (isSupabaseConfigured()) await deleteMedication(id);
        showToast('Medicación eliminada');
    };

    const handleToggleMedImportante = async (id: string) => {
        let updated: PatientMedication | undefined;
        setMedications(prev => prev.map(m => {
            if (m.id !== id) return m;
            updated = { ...m, importante: !m.importante };
            return updated;
        }));
        if (updated && isSupabaseConfigured()) await upsertMedication(updated);
    };


    const handleDocumentSigned = () => {
        setPaciente(prev => ({ ...prev, consentimientosFirmados: true }));
        showToast("Consentimientos OK");
    };

    // Cargar panorámicas Romexis y fotos GDrive al montar
    useEffect(() => {
        setLoadingRX(true);
        getPatientPanoramicas(paciente.id)
            .then(p => { setPanoramicas(p); setPanoramicaIdx(0); })
            .finally(() => setLoadingRX(false));

        setLoadingFotos(true);
        getPatientPhotos(paciente.id)
            .then(f => { setFotos(f); setFotoIdx(0); })
            .finally(() => setLoadingFotos(false));
    }, [paciente.id]);

    // Edad calculada
    const edad = new Date().getFullYear() - new Date(paciente.fechaNacimiento).getFullYear();
    const ultimaVisita = paciente.historial[0]?.fecha ?? '—';


    const renderHistorial = () => (
        <div className="grid gap-3 animate-in fade-in duration-400" style={{ gridTemplateColumns: '26fr 44fr 30fr', gridTemplateRows: '1fr' }}>

            {/* ── COL 1: HISTORIAL (estrecho, alto) ──────────────── */}
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm flex flex-col overflow-hidden" style={{ height: 'calc(100vh - 340px)', minHeight: '520px' }}>
                <div className="flex items-center justify-between px-3 py-2.5 bg-slate-50 border-b border-slate-100 flex-shrink-0">
                    <div className="flex items-center gap-1.5">
                        <Activity className="w-3.5 h-3.5 text-[#051650]" />
                        <h3 className="text-[10px] font-black text-slate-700 uppercase tracking-widest">Entradas Médicas</h3>
                    </div>
                    <span className="text-[9px] font-bold text-slate-400">{paciente.historial.length}</span>
                </div>
                <div className="flex-1 overflow-y-auto divide-y divide-slate-50">
                    {paciente.historial.length === 0 && (
                        <div className="flex items-center justify-center h-full">
                            <p className="text-sm text-slate-300 font-medium">Sin entradas registradas</p>
                        </div>
                    )}
                    {[...paciente.historial]
                        .sort((a, b) => {
                            const ta = a.timestamp ?? a.fecha ?? '';
                            const tb = b.timestamp ?? b.fecha ?? '';
                            return tb.localeCompare(ta);
                        })
                        .map((note) => {
                            const cfg = getEsp(note.especialidad);
                            const isOpen = expandedNoteId === note.id;
                            const isEditing = editingNoteId === note.id;
                            const fechaISO = (() => {
                                try {
                                    const d = new Date(note.fecha);
                                    return isNaN(d.getTime()) ? new Date().toISOString().split('T')[0] : d.toISOString().split('T')[0];
                                } catch { return new Date().toISOString().split('T')[0]; }
                            })();
                            return (
                                <div key={note.id} className="border-l-2 transition-all" style={{ borderLeftColor: isOpen || isEditing ? '#051650' : '#e2e8f0' }}>
                                    <div className="w-full flex items-center justify-between px-2 py-2 hover:bg-slate-50 transition-colors">
                                        <button
                                            onClick={() => { setExpandedNoteId(isOpen ? null : note.id); setEditingNoteId(null); }}
                                            className="flex items-center gap-2 min-w-0 flex-1 text-left"
                                        >
                                            {/* Fecha tipo calendario */}
                                            <div className="flex flex-col items-center justify-center w-9 h-9 bg-slate-100 rounded-lg flex-shrink-0 border border-slate-200">
                                                <span className="text-xs font-black text-[#051650] leading-none">{note.fecha.split(' ')[0]}</span>
                                                <span className="text-[8px] font-bold text-slate-400 uppercase">{note.fecha.split(' ')[1]}</span>
                                            </div>
                                            {/* Resumen */}
                                            <div className="min-w-0 flex-1">
                                                <div className="flex items-center gap-1 mb-0.5 flex-wrap">
                                                    <span className={`text-[8px] font-black uppercase tracking-wider px-1 py-0.5 rounded border ${cfg.badge}`}>{note.especialidad}</span>
                                                    {note.firmada && <CheckCircle className="w-2.5 h-2.5 text-emerald-500 flex-shrink-0" />}
                                                    {note.eva > 0 && (
                                                        <span className={`text-[8px] font-bold px-1 rounded ${note.eva >= 7 ? 'bg-red-50 text-red-600' : note.eva >= 4 ? 'bg-amber-50 text-amber-600' : 'bg-emerald-50 text-emerald-700'}`}>
                                                            {note.eva}
                                                        </span>
                                                    )}
                                                </div>
                                                <p className="text-[10px] text-slate-600 font-medium leading-snug line-clamp-2">{note.plan}</p>
                                            </div>
                                        </button>
                                        <div className="flex items-center gap-0.5 flex-shrink-0 ml-1">
                                            <button
                                                onClick={() => { setEditingNoteId(isEditing ? null : note.id); setExpandedNoteId(null); }}
                                                className={`w-5 h-5 flex items-center justify-center rounded transition-all ${isEditing ? 'bg-[#051650] text-white' : 'text-slate-400 hover:text-[#051650] hover:bg-slate-100'}`}
                                                title="Editar entrada"
                                            >
                                                <Pencil className="w-2.5 h-2.5" />
                                            </button>
                                            {isOpen
                                                ? <ChevronUp className="w-3.5 h-3.5 text-slate-300 cursor-pointer" onClick={() => setExpandedNoteId(null)} />
                                                : <ChevronDown className="w-3.5 h-3.5 text-slate-300 cursor-pointer" onClick={() => { setExpandedNoteId(note.id); setEditingNoteId(null); }} />}
                                        </div>
                                    </div>
                                    {/* Modo edición inline */}
                                    {isEditing && (
                                        <div className="mx-2 mb-3">
                                            <SOAPEditor
                                                onSave={(data) => handleUpdateNote(note.id, data)}
                                                alergiasPaciente={paciente.alergias}
                                                onCancel={() => setEditingNoteId(null)}
                                                initialData={{
                                                    subjetivo: note.subjetivo,
                                                    objetivo: note.objetivo,
                                                    analisis: note.analisis,
                                                    plan: note.plan,
                                                    eva: note.eva,
                                                    fecha: fechaISO,
                                                    especialidad: note.especialidad,
                                                }}
                                            />
                                        </div>
                                    )}
                                    {/* Contenido expandido SOAP solo lectura */}
                                    {isOpen && !isEditing && (
                                        <div className="grid grid-cols-2 gap-px bg-slate-100 text-[10px] mx-2 mb-2 rounded-lg overflow-hidden">
                                            <div className="bg-white p-2">
                                                <span className="block text-[8px] font-black text-blue-600 uppercase tracking-widest mb-0.5">S</span>
                                                <p className="text-slate-600 leading-relaxed">{note.subjetivo}</p>
                                            </div>
                                            <div className="bg-white p-2">
                                                <span className="block text-[8px] font-black text-orange-600 uppercase tracking-widest mb-0.5">O</span>
                                                <p className="text-slate-600 leading-relaxed">{note.objetivo}</p>
                                            </div>
                                            <div className="bg-white p-2">
                                                <span className="block text-[8px] font-black text-emerald-700 uppercase tracking-widest mb-0.5">A</span>
                                                <p className="text-slate-600 leading-relaxed">{note.analisis}</p>
                                            </div>
                                            <div className="bg-[#051650] p-2">
                                                <span className="block text-[8px] font-black text-white/60 uppercase tracking-widest mb-0.5">P</span>
                                                <p className="text-white font-medium leading-relaxed">{note.plan}</p>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            );
                        })}

                </div>
                {/* IA DENTAL al pie */}
                <div className="border-t border-slate-100 bg-[#051650] px-3 py-2 flex items-center gap-2 flex-shrink-0">
                    <Brain className="w-3.5 h-3.5 text-blue-300 flex-shrink-0" />
                    <p className="text-[9px] text-blue-200 font-medium leading-tight flex-1 truncate italic">
                        {saraTyped.slice(0, 70)}{saraTyped.length > 70 ? '…' : ''}
                    </p>
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse flex-shrink-0" />
                </div>
            </div>

            {/* ── COL 2: EDITOR SOAP (amplio, toda la altura) ────── */}
            <div style={{ height: 'calc(100vh - 340px)', minHeight: '520px' }} className="overflow-y-auto">
                <SOAPEditor onSave={handleSaveNote} alergiasPaciente={paciente.alergias} />
            </div>

            {/* ── COL 3: RX + FOTOS apilados  ──────────────────────── */}
            <div className="flex flex-col gap-3">

                {/* PANORÁMICAS RX — compacto */}
                <div className="bg-slate-900 rounded-xl overflow-hidden shadow-lg flex flex-col" style={{ height: '250px' }}>
                    <div className="flex items-center justify-between px-3 py-2 bg-slate-800/80 border-b border-slate-700/50 flex-shrink-0">
                        <div className="flex items-center gap-1.5">
                            <Camera className="w-3 h-3 text-slate-400" />
                            <span className="text-[9px] font-black text-slate-300 uppercase tracking-widest">Panorámicas RX</span>
                            {!isRomexisConfigured() && (
                                <span className="text-[8px] font-bold text-amber-400 bg-amber-400/10 border border-amber-500/30 px-1 py-0.5 rounded">DEMO</span>
                            )}
                        </div>
                        <span className="text-[9px] text-slate-500 font-semibold">{panoramicas[panoramicaIdx]?.dateLabel ?? ''}</span>
                    </div>
                    {/* Imagen principal */}
                    <div className="flex-1 relative overflow-hidden cursor-zoom-in group">
                        {loadingRX
                            ? <div className="w-full h-full flex items-center justify-center"><span className="w-5 h-5 border-2 border-slate-600 border-t-blue-400 rounded-full animate-spin" /></div>
                            : panoramicas.length === 0
                                ? <div className="w-full h-full flex items-center justify-center text-slate-600 text-xs font-bold">Sin radiografías</div>
                                : <>
                                    <img
                                        src={panoramicas[panoramicaIdx]?.url}
                                        className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity"
                                        alt="Panorámica"
                                        style={{ filter: 'contrast(1.15) brightness(0.9)' }}
                                    />
                                    <div className="absolute bottom-0 left-0 right-0 h-10 bg-gradient-to-t from-slate-900 to-transparent" />
                                </>
                        }
                    </div>
                    {/* Carrete filmstrip compacto */}
                    <div className="flex gap-1.5 px-2 py-1.5 bg-slate-900/90 border-t border-slate-800 flex-shrink-0 overflow-x-auto">
                        {panoramicas.map((p, i) => (
                            <button
                                key={p.id}
                                onClick={() => setPanoramicaIdx(i)}
                                className={`relative flex-shrink-0 w-14 h-10 rounded overflow-hidden border-2 transition-all ${panoramicaIdx === i ? 'border-blue-400 opacity-100' : 'border-slate-700 opacity-50 hover:opacity-80'}`}
                            >
                                <img src={p.thumbnail ?? p.url} className="w-full h-full object-cover" style={{ filter: 'contrast(1.1)' }} alt={p.dateLabel} />
                                <div className="absolute bottom-0 left-0 right-0 bg-slate-900/70 text-[7px] text-slate-300 font-bold text-center py-px">{p.dateLabel}</div>
                            </button>
                        ))}
                        <label className="flex-shrink-0 w-10 h-10 rounded border-2 border-dashed border-slate-700 flex flex-col items-center justify-center cursor-pointer hover:border-blue-500 transition-all">
                            <Camera className="w-3 h-3 text-slate-600" />
                            <input type="file" accept="image/*" className="hidden" />
                        </label>
                    </div>
                </div>

                {/* FOTOS INTRAORALES — compacto */}
                <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col" style={{ height: '250px' }}>
                    <div className="flex items-center justify-between px-3 py-2 bg-slate-50 border-b border-slate-100 flex-shrink-0">
                        <div className="flex items-center gap-1.5">
                            <Camera className="w-3 h-3 text-slate-500" />
                            <span className="text-[9px] font-black text-slate-700 uppercase tracking-widest">Fotos Intraorales</span>
                            {!isGDriveConfigured() && (
                                <span className="text-[8px] font-bold text-amber-500 bg-amber-50 border border-amber-200 px-1 py-0.5 rounded">DEMO</span>
                            )}
                        </div>
                        <span className="text-[9px] text-slate-400 font-semibold truncate max-w-[80px]">{fotos[fotoIdx]?.label}</span>
                    </div>
                    {/* Imagen principal */}
                    <div className="flex-1 relative overflow-hidden cursor-zoom-in group bg-slate-100">
                        {loadingFotos
                            ? <div className="w-full h-full flex items-center justify-center"><span className="w-5 h-5 border-2 border-slate-200 border-t-blue-400 rounded-full animate-spin" /></div>
                            : fotos.length === 0
                                ? <div className="w-full h-full flex items-center justify-center text-slate-400 text-xs font-bold">Sin fotos en Google Drive</div>
                                : <>
                                    <img
                                        src={fotos[fotoIdx]?.url}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                        alt={fotos[fotoIdx]?.label}
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center pb-2">
                                        <span className="text-white text-[9px] font-black uppercase bg-black/50 px-2 py-0.5 rounded-full">Ampliar</span>
                                    </div>
                                </>
                        }
                    </div>
                    {/* Carrete compacto */}
                    <div className="flex gap-1.5 px-2 py-1.5 bg-white border-t border-slate-100 flex-shrink-0 overflow-x-auto">
                        {fotos.map((f, i) => (
                            <button
                                key={f.id}
                                onClick={() => setFotoIdx(i)}
                                className={`relative flex-shrink-0 w-14 h-10 rounded-lg overflow-hidden border-2 transition-all ${fotoIdx === i ? 'border-[#051650] opacity-100 shadow-md' : 'border-slate-200 opacity-60 hover:opacity-90'}`}
                            >
                                <img src={f.thumbnail ?? f.url} className="w-full h-full object-cover" alt={f.label} />
                                <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-[7px] text-white font-bold text-center py-px">{f.label}</div>
                            </button>
                        ))}
                        <label className="flex-shrink-0 w-10 h-10 rounded-lg border-2 border-dashed border-slate-200 flex flex-col items-center justify-center cursor-pointer hover:border-[#051650] transition-all">
                            <Camera className="w-3 h-3 text-slate-300" />
                            <input type="file" accept="image/*" className="hidden" />
                        </label>
                    </div>
                </div>

            </div>
        </div>
    );




    const renderContent = () => {
        switch (activeSubArea) {
            case 'Odontograma': return <Odontograma onSuggestionUpdate={() => { }} />;
            case 'Periodoncia': return <Periodontograma />;
            case 'Económica':
            case 'Presupuestos': return <Economica />;
            case 'Documentos': return <Documentos onDocumentSigned={handleDocumentSigned} />;
            case 'Historial Clínico':
            default: return renderHistorial();
        }
    };

    return (
        <div className="flex flex-col gap-4">

            {/* ── CABECERA PREMIUM ─────────────────────────────────────── */}
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                {/* ── PANEL DE SEGURIDAD CLÍNICA — editable ───────────────── */}
                {(() => {
                    const medsImportantes = medications.filter(m => m.importante);
                    const hasAlerts = allergies.length > 0 || medsImportantes.length > 0;
                    return (
                        <div>
                            {/* Franja roja siempre visible si hay alertas */}
                            {hasAlerts && (
                                <div className={`bg-rose-500 px-4 py-1.5 flex items-center gap-2 ${alertEditMode ? 'rounded-t-none' : ''}`}>
                                    <ShieldAlert className="w-3.5 h-3.5 text-white flex-shrink-0" />
                                    <div className="flex-1 min-w-0 flex items-center gap-2 flex-wrap">
                                        {allergies.length > 0 && (
                                            <span className="text-[10px] font-black text-white uppercase tracking-wider">
                                                ⚠ Alergias: {allergies.map(a => a.nombre).join(' · ')}
                                            </span>
                                        )}
                                        {medsImportantes.length > 0 && (
                                            <span className="text-[10px] font-black text-red-200 uppercase tracking-wider flex items-center gap-1">
                                                <Pill className="w-3 h-3" />
                                                {medsImportantes.map(m => m.nombre).join(' · ')}
                                            </span>
                                        )}
                                    </div>
                                    <button
                                        onClick={() => setAlertEditMode(v => !v)}
                                        className="flex items-center gap-1 text-[9px] font-black text-white/80 hover:text-white bg-white/10 hover:bg-white/20 px-2 py-0.5 rounded transition-all flex-shrink-0"
                                    >
                                        <Pencil className="w-2.5 h-2.5" />{alertEditMode ? 'Cerrar' : 'Editar'}
                                    </button>
                                </div>
                            )}

                            {/* Si no hay alertas, botón flotante discreto para añadir */}
                            {!hasAlerts && !alertEditMode && (
                                <div className="bg-slate-50 border-b border-slate-100 px-4 py-1.5 flex items-center gap-2">
                                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                                    <span className="text-[10px] font-bold text-emerald-600 flex-1">Sin alertas de seguridad</span>
                                    <button
                                        onClick={() => setAlertEditMode(true)}
                                        className="text-[9px] font-black text-slate-400 hover:text-[#051650] flex items-center gap-1 transition-all"
                                    >
                                        <Plus className="w-3 h-3" /> Añadir
                                    </button>
                                </div>
                            )}

                            {/* Panel de edición expandible */}
                            {alertEditMode && (
                                <div className="bg-rose-50 border-b border-rose-200 px-4 py-3 space-y-3">

                                    {/* Sección alergias */}
                                    <div>
                                        <p className="text-[9px] font-black uppercase tracking-widest text-red-700 mb-1.5 flex items-center gap-1">
                                            <ShieldAlert className="w-3 h-3" /> Alergias activas
                                        </p>
                                        <div className="flex flex-wrap gap-1.5 mb-2">
                                            {allergies.map(a => (
                                                <span key={a.id} className="flex items-center gap-1 text-[10px] font-bold text-rose-700 bg-rose-100 border border-rose-200 px-2 py-0.5 rounded-full">
                                                    {a.nombre}
                                                    <button onClick={() => handleRemoveAllergy(a.id)} className="text-red-400 hover:text-red-700 transition-colors">
                                                        <X className="w-2.5 h-2.5" />
                                                    </button>
                                                </span>
                                            ))}
                                        </div>
                                        <div className="flex gap-2">
                                            <input
                                                type="text"
                                                value={newAllergyText}
                                                onChange={e => setNewAllergyText(e.target.value)}
                                                onKeyDown={e => e.key === 'Enter' && handleAddAllergy()}
                                                placeholder="Nueva alergia (Enter para añadir)"
                                                className="flex-1 text-xs px-3 py-1.5 border border-red-200 rounded-lg bg-white focus:outline-none focus:ring-1 focus:ring-red-400"
                                            />
                                            <button onClick={handleAddAllergy} className="px-3 py-1.5 bg-rose-500 text-white text-xs font-bold rounded-lg hover:bg-rose-600 transition-all">
                                                <Plus className="w-3.5 h-3.5" />
                                            </button>
                                        </div>
                                    </div>

                                    {/* Sección medicación */}
                                    <div>
                                        <p className="text-[9px] font-black uppercase tracking-widest text-slate-600 mb-1.5 flex items-center gap-1">
                                            <Pill className="w-3 h-3" /> Medicación del paciente
                                        </p>

                                        {/* Lista de medicaciones existentes */}
                                        {medications.length > 0 && (
                                            <div className="mb-2 space-y-1">
                                                {medications.map(m => (
                                                    <div key={m.id} className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs border ${m.importante ? 'bg-rose-50 border-rose-200' : 'bg-white border-slate-200'
                                                        }`}>
                                                        <button
                                                            onClick={() => handleToggleMedImportante(m.id)}
                                                            title={m.importante ? 'Marcar como no importante' : 'Marcar como importante (aparecerá en franja roja)'}
                                                            className={`w-4 h-4 rounded border-2 flex items-center justify-center flex-shrink-0 transition-all ${m.importante ? 'bg-rose-500 border-rose-500 text-white' : 'border-slate-300'
                                                                }`}
                                                        >
                                                            {m.importante && <ShieldAlert className="w-2.5 h-2.5" />}
                                                        </button>
                                                        <span className={`flex-1 font-semibold ${m.importante ? 'text-rose-700' : 'text-slate-700'}`}>{m.nombre}</span>
                                                        {m.categoria && <span className="text-[9px] text-slate-400">{m.categoria}</span>}
                                                        {m.nota && <span className="text-[9px] text-amber-600 italic max-w-[160px] truncate">{m.nota}</span>}
                                                        <button onClick={() => handleRemoveMedication(m.id)} className="text-slate-300 hover:text-red-500 transition-colors">
                                                            <X className="w-3 h-3" />
                                                        </button>
                                                    </div>
                                                ))}
                                            </div>
                                        )}

                                        {/* Buscador vademecum */}
                                        <div className="relative">
                                            <input
                                                type="text"
                                                value={medQuery}
                                                onChange={e => setMedQuery(e.target.value)}
                                                placeholder="🔍 Buscar en el vademecum..."
                                                className="w-full text-xs px-3 py-1.5 border border-slate-200 rounded-lg bg-white focus:outline-none focus:ring-1 focus:ring-blue-400"
                                            />
                                            {medSuggestions.length > 0 && (
                                                <div className="absolute z-50 left-0 right-0 mt-1 bg-white border border-slate-200 rounded-xl shadow-xl overflow-hidden">
                                                    {medSuggestions.map(med => (
                                                        <button
                                                            key={med.nombre}
                                                            onClick={() => handleAddMedication(med)}
                                                            className="w-full text-left px-3 py-2 hover:bg-slate-50 border-b border-slate-50 last:border-0 transition-colors"
                                                        >
                                                            <div className="flex items-center gap-2">
                                                                {med.importante && <ShieldAlert className="w-3 h-3 text-red-500 flex-shrink-0" />}
                                                                <span className="text-xs font-bold text-slate-800 flex-1">{med.nombre}</span>
                                                                <span className="text-[9px] text-slate-400">{med.categoria}</span>
                                                            </div>
                                                            {med.nota && <p className="text-[9px] text-amber-600 italic mt-0.5">{med.nota}</p>}
                                                        </button>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                        <p className="text-[9px] text-slate-400 mt-1">☑ El checkbox rojo indica que la medicación es importante y aparecerá en la franja de alertas.</p>
                                    </div>

                                    {/* Guardar / Cerrar */}
                                    <div className="flex justify-end">
                                        <button
                                            onClick={() => setAlertEditMode(false)}
                                            className="flex items-center gap-1.5 px-4 py-2 bg-[#051650] text-white text-xs font-black rounded-lg hover:bg-blue-900 transition-all"
                                        >
                                            <Save className="w-3.5 h-3.5" /> Guardar y cerrar
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    );
                })()}
                <div className="px-6 py-4 flex flex-col xl:flex-row justify-between items-start xl:items-center gap-4">
                    {/* Avatar + datos */}
                    <div className="flex items-center gap-4">
                        <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#051650] to-blue-700 text-white flex flex-col items-center justify-center shadow-md flex-shrink-0">
                            <span className="text-[9px] font-bold text-blue-300 uppercase tracking-widest leading-none">#HC</span>
                            <span className="text-sm font-black leading-tight">{paciente.id}</span>
                        </div>
                        <div>
                            <div className="flex items-center gap-2 flex-wrap">
                                <h2 className="text-xl font-black text-slate-800 uppercase tracking-tight">
                                    {paciente.nombre} {paciente.apellidos}
                                </h2>
                                <Badge variant="blue" className="rounded-sm text-[9px] px-1.5 py-0">Premium</Badge>
                                {paciente.deuda && (
                                    <span className="inline-flex items-center gap-1 text-[9px] font-black text-red-600 bg-red-50 border border-red-200 px-2 py-0.5 rounded">
                                        <CircleDollarSign className="w-3 h-3" /> Deuda
                                    </span>
                                )}
                                {!paciente.consentimientosFirmados && (
                                    <span
                                        onClick={() => onSubAreaChange('Documentos')}
                                        className="inline-flex items-center gap-1 text-[9px] font-black text-amber-700 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded cursor-pointer hover:bg-amber-100 transition-all"
                                    >
                                        <Gavel className="w-3 h-3" /> Firma pendiente
                                    </span>
                                )}
                            </div>
                            <div className="flex items-center gap-4 mt-1 text-slate-400 text-[10px] font-semibold">
                                <span className="flex items-center gap-1"><FileText className="w-3 h-3" />{paciente.dni}</span>
                                <span className="flex items-center gap-1"><Phone className="w-3 h-3" />{paciente.telefono}</span>
                                <span className="flex items-center gap-1"><Calendar className="w-3 h-3" />{edad} años</span>
                            </div>
                        </div>
                    </div>

                    {/* Acciones rápidas */}
                    <div className="flex items-center gap-2 shrink-0">
                        <button className="flex items-center gap-1.5 px-3 py-2 bg-emerald-500 text-white rounded-lg text-[10px] font-black uppercase tracking-wider hover:bg-emerald-600 transition-all shadow-sm active:scale-95">
                            <MessageSquare className="w-3.5 h-3.5" /> WhatsApp
                        </button>
                        <button className="flex items-center gap-1.5 px-3 py-2 bg-slate-100 text-slate-600 rounded-lg text-[10px] font-black uppercase tracking-wider hover:bg-slate-200 transition-all active:scale-95">
                            <Calendar className="w-3.5 h-3.5" /> Nueva Cita
                        </button>
                        <button
                            onClick={() => { setIsSearchOpen(true); setSearchInitialView('search'); }}
                            className="flex items-center gap-1.5 px-3 py-2 bg-[#051650] text-white rounded-lg text-[10px] font-black uppercase tracking-wider hover:bg-blue-900 transition-all shadow-sm active:scale-95"
                        >
                            <ArrowLeftRight className="w-3.5 h-3.5" /> Cambiar
                        </button>
                    </div>
                </div>

            </div>

            {/* ── CONTENIDO ───────────────────────────────────────────── */}
            <div>{renderContent()}</div>

            <PatientSearchModal
                isOpen={isSearchOpen}
                onClose={() => setIsSearchOpen(false)}
                onSelect={handleSelectPatient}
                initialView={searchInitialView}
            />
        </div>
    );
};

export default Pacientes;
