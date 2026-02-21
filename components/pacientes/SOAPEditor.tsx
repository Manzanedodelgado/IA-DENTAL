
import React, { useState, useRef, useEffect } from 'react';
import {
    Stethoscope, ChevronDown, ShieldAlert, Mic, MicOff, Brain,
    CheckCircle, Loader2, Calendar, Save, X
} from 'lucide-react';

interface SOAPEditorProps {
    onSave: (noteData: {
        subjetivo: string; objetivo: string; analisis: string; plan: string;
        eva: number; fecha?: string; especialidad?: string;
    }) => void;
    alergiasPaciente: string[];
    initialData?: {
        subjetivo: string; objetivo: string; analisis: string; plan: string;
        eva: number; fecha: string; especialidad: string;
    };
    onCancel?: () => void;
}

type ListenState = 'idle' | 'listening' | 'analyzing' | 'done';

const ESPECIALIDADES = [
    'General / Libre', 'Implantología', 'Higiene', 'Ortodoncia',
    'Cirugía', 'Periodoncia', 'Urgencia', 'Odontopediatría', 'Estético',
];

const SIN_DATOS = 'Sin datos relacionados';

/** Analiza el transcript y llena los campos SOAP con IA (mock rule-based) */
function analyzeTranscript(transcript: string): {
    subjetivo: string; objetivo: string; analisis: string; plan: string; eva: number;
} {
    const t = transcript.toLowerCase();

    const evaMatch = t.match(/eva\s*(\d+)|dolor\s*(\d+)(?:\s*sobre\s*10)?|(\d+)\s*(?:sobre|de)\s*10/);
    const eva = evaMatch ? parseInt(evaMatch[1] ?? evaMatch[2] ?? evaMatch[3] ?? '0') : 0;

    const subjetivoPatterns = [
        /(?:paciente (?:refiere|dice|comenta|indica|menciona|acude|viene)[^.]*\.)/gi,
        /(?:motivo de consulta[^.]*\.)/gi,
        /(?:dolor (?:en|de)[^.]*\.)/gi,
    ];
    const subjetivoPartes: string[] = [];
    subjetivoPatterns.forEach(r => {
        const m = transcript.match(r);
        if (m) subjetivoPartes.push(...m);
    });

    const objetivoPatterns = [
        /(?:(?:a la exploración|exploración clínica|radiografía|rx|sondaje)[^.]*\.)/gi,
        /(?:(?:encía|mucosa|tejidos|implante)[^.]*\.)/gi,
    ];
    const objetivoPartes: string[] = [];
    objetivoPatterns.forEach(r => {
        const m = transcript.match(r);
        if (m) objetivoPartes.push(...m);
    });

    const analisisPatterns = [
        /(?:(?:diagnóstico|diagnosi|se trata de|compatible con|juicio clínico)[^.]*\.)/gi,
    ];
    const analisisPartes: string[] = [];
    analisisPatterns.forEach(r => {
        const m = transcript.match(r);
        if (m) analisisPartes.push(...m);
    });

    const planPatterns = [
        /(?:(?:se procede|se realiza|se aplica|tratamiento|plan|prescrib|siguiente visita|próxima cita)[^.]*\.)/gi,
    ];
    const planPartes: string[] = [];
    planPatterns.forEach(r => {
        const m = transcript.match(r);
        if (m) planPartes.push(...m);
    });

    return {
        subjetivo: subjetivoPartes.length ? subjetivoPartes.join(' ').trim() : SIN_DATOS,
        objetivo: objetivoPartes.length ? objetivoPartes.join(' ').trim() : SIN_DATOS,
        analisis: analisisPartes.length ? analisisPartes.join(' ').trim() : SIN_DATOS,
        plan: planPartes.length ? planPartes.join(' ').trim() : SIN_DATOS,
        eva,
    };
}

const SOAPEditor: React.FC<SOAPEditorProps> = ({
    onSave, alergiasPaciente, initialData, onCancel,
}) => {
    const todayISO = new Date().toISOString().split('T')[0];
    const [nota, setNota] = useState({
        subjetivo: initialData?.subjetivo ?? '',
        objetivo: initialData?.objetivo ?? '',
        analisis: initialData?.analisis ?? '',
        plan: initialData?.plan ?? '',
        eva: initialData?.eva ?? 0,
        fecha: initialData?.fecha ?? todayISO,
        especialidad: initialData?.especialidad ?? 'General / Libre',
    });
    const [saving, setSaving] = useState(false);
    const [listenState, setListenState] = useState<ListenState>('idle');
    const [transcript, setTranscript] = useState('');
    const [listenSec, setListenSec] = useState(0);
    const recognitionRef = useRef<any>(null);
    const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

    // ── Limpieza ────────────────────────────────────────
    useEffect(() => () => {
        recognitionRef.current?.stop();
        if (timerRef.current) clearInterval(timerRef.current);
    }, []);

    // ── Escucha activa ───────────────────────────────────
    const startListening = () => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const SR: any = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
        if (!SR) { alert('Tu navegador no soporta la API de reconocimiento de voz.'); return; }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const recognition: any = new SR();
        recognition.lang = 'es-ES';
        recognition.continuous = true;
        recognition.interimResults = true;
        recognition.maxAlternatives = 1;

        let accumulated = '';
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        recognition.onresult = (e: any) => {
            let interim = '';
            for (let i = e.resultIndex; i < e.results.length; i++) {
                const text = e.results[i][0].transcript;
                if (e.results[i].isFinal) accumulated += text + '. ';
                else interim = text;
            }
            setTranscript(accumulated + interim);
        };
        recognition.onerror = () => stopListening(accumulated);
        recognition.onend = () => {
            if (listenState === 'listening') stopListening(accumulated);
        };

        recognitionRef.current = recognition;
        recognition.start();
        setListenState('listening');
        setListenSec(0);

        timerRef.current = setInterval(() => setListenSec(s => s + 1), 1000);
    };

    const stopListening = (finalTranscript?: string) => {
        recognitionRef.current?.stop();
        if (timerRef.current) clearInterval(timerRef.current);
        const text = finalTranscript ?? transcript;
        if (!text.trim()) { setListenState('idle'); return; }

        setListenState('analyzing');
        setTimeout(() => {
            const filled = analyzeTranscript(text);
            setNota(prev => ({
                ...prev,
                subjetivo: filled.subjetivo !== SIN_DATOS ? filled.subjetivo : prev.subjetivo,
                objetivo: filled.objetivo !== SIN_DATOS ? filled.objetivo : prev.objetivo,
                analisis: filled.analisis !== SIN_DATOS ? filled.analisis : prev.analisis,
                plan: filled.plan !== SIN_DATOS ? filled.plan : prev.plan,
                eva: filled.eva > 0 ? filled.eva : prev.eva,
            }));
            setListenState('done');
        }, 1200);
    };

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);
        await new Promise(r => setTimeout(r, 600));
        onSave({ ...nota });
        setSaving(false);
        // Reset if new entry (no initialData)
        if (!initialData) {
            setNota({ subjetivo: '', objetivo: '', analisis: '', plan: '', eva: 0, fecha: todayISO, especialidad: 'General / Libre' });
            setTranscript('');
            setListenState('idle');
        }
    };

    const textAreaCls = "w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-700 font-medium outline-none focus:border-[#051650] focus:ring-2 focus:ring-[#051650]/10 resize-none transition-all placeholder:text-slate-300";
    const inputCls = "w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm font-medium text-slate-700 outline-none focus:border-[#051650] focus:ring-2 focus:ring-[#051650]/10 transition-all";

    const listenIcon = listenState === 'listening'
        ? <MicOff className="w-5 h-5 text-white" />
        : listenState === 'analyzing'
            ? <Loader2 className="w-5 h-5 text-white animate-spin" />
            : <Mic className="w-5 h-5 text-white" />;

    const listenBg = listenState === 'listening'
        ? 'bg-red-500 animate-pulse shadow-red-400/50'
        : listenState === 'analyzing'
            ? 'bg-amber-500'
            : 'bg-[#051650] hover:bg-blue-800';

    return (
        <form onSubmit={handleSave} className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
            {/* Header */}
            <div className="bg-slate-50 border-b border-slate-200 px-5 py-3 flex items-center justify-between flex-wrap gap-2">
                <div className="flex items-center gap-2">
                    <Stethoscope className="w-4 h-4 text-[#051650]" />
                    <h3 className="text-xs font-black uppercase tracking-widest text-[#051650]">
                        {initialData ? 'Editar Evolutivo Clínico' : 'Nuevo Evolutivo Clínico'} — SOAP
                    </h3>
                </div>
                <div className="flex items-center gap-3">
                    {/* Fecha */}
                    <div className="flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-slate-400" />
                        <input
                            type="date"
                            value={nota.fecha}
                            onChange={e => setNota({ ...nota, fecha: e.target.value })}
                            className="text-xs font-bold text-slate-600 bg-transparent outline-none border-b border-dashed border-slate-300 focus:border-[#051650] transition-colors"
                        />
                    </div>
                    {/* Especialidad */}
                    <div className="relative">
                        <select
                            value={nota.especialidad}
                            onChange={e => setNota({ ...nota, especialidad: e.target.value })}
                            className="appearance-none bg-white border border-slate-200 text-xs font-bold rounded-lg pl-3 pr-7 py-1.5 outline-none text-slate-600 uppercase cursor-pointer hover:border-[#051650] transition-all"
                        >
                            {ESPECIALIDADES.map(e => <option key={e} value={e}>{e}</option>)}
                        </select>
                        <ChevronDown className="w-3 h-3 text-slate-400 absolute right-2 top-2 pointer-events-none" />
                    </div>
                </div>
            </div>

            <div className="p-5 space-y-4">
                {/* Alerta alergias */}
                {alergiasPaciente.length > 0 && (
                    <div className="bg-red-50 border border-red-200 p-3 rounded-lg flex items-center gap-3">
                        <ShieldAlert className="w-5 h-5 text-red-500 shrink-0" />
                        <p className="text-sm font-bold text-red-700">
                            ⚠ Alergias activas: {alergiasPaciente.join(', ')}
                        </p>
                    </div>
                )}

                {/* Botón escucha activa */}
                <div className="flex items-center gap-4 p-3.5 bg-slate-50 border border-slate-200 rounded-xl">
                    <button
                        type="button"
                        onClick={() => listenState === 'listening' ? stopListening() : startListening()}
                        disabled={listenState === 'analyzing'}
                        className={`w-11 h-11 rounded-full flex items-center justify-center shadow-lg transition-all flex-shrink-0 ${listenBg}`}
                    >
                        {listenIcon}
                    </button>
                    <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                            <Brain className="w-3.5 h-3.5 text-[#051650]" />
                            <span className="text-xs font-black text-slate-700 uppercase tracking-wider">IA Dental — Escucha Activa</span>
                            {listenState === 'listening' && (
                                <span className="text-xs font-bold text-red-500 tabular-nums">
                                    {String(Math.floor(listenSec / 60)).padStart(2, '0')}:{String(listenSec % 60).padStart(2, '0')}
                                </span>
                            )}
                            {listenState === 'done' && (
                                <span className="flex items-center gap-1 text-xs font-bold text-emerald-600">
                                    <CheckCircle className="w-3 h-3" /> Campos completados
                                </span>
                            )}
                        </div>
                        {listenState === 'idle' && (
                            <p className="text-xs text-slate-400 font-medium mt-0.5">Pulsa el micrófono para que IA DENTAL transcriba y analice la conversación</p>
                        )}
                        {listenState === 'listening' && (
                            <p className="text-xs text-red-500 font-medium mt-0.5 truncate">{transcript || 'Escuchando...'}</p>
                        )}
                        {listenState === 'analyzing' && (
                            <p className="text-xs text-amber-600 font-medium mt-0.5">IA Dental procesando la conversación...</p>
                        )}
                        {listenState === 'done' && transcript && (
                            <p className="text-[10px] text-slate-400 font-medium mt-0.5 truncate italic">"{transcript.slice(0, 100)}..."</p>
                        )}
                    </div>
                    {listenState !== 'idle' && (
                        <button
                            type="button"
                            onClick={() => { setListenState('idle'); setTranscript(''); recognitionRef.current?.stop(); }}
                            className="w-7 h-7 flex items-center justify-center rounded-full bg-slate-100 hover:bg-slate-200 transition-all"
                        >
                            <X className="w-3.5 h-3.5 text-slate-500" />
                        </button>
                    )}
                </div>

                {/* Campos SOAP */}
                <div className="grid grid-cols-2 gap-3">
                    {/* S */}
                    <div>
                        <div className="flex items-center justify-between mb-1.5">
                            <label className="text-xs font-black text-blue-600 uppercase tracking-wider flex items-center gap-1.5">
                                <span className="w-2.5 h-2.5 rounded-full bg-blue-500" /> S — Subjetivo
                            </label>
                            <div className="flex items-center gap-1.5 bg-slate-50 border border-slate-200 rounded-full px-2.5 py-1">
                                <span className="text-xs font-bold text-slate-500">EVA:</span>
                                <input
                                    type="number" min={0} max={10}
                                    value={nota.eva}
                                    onChange={e => setNota({ ...nota, eva: parseInt(e.target.value) || 0 })}
                                    className="w-7 bg-transparent text-sm font-black text-[#051650] outline-none text-center"
                                />
                                <span className="text-xs text-slate-400">/10</span>
                            </div>
                        </div>
                        <textarea rows={4} value={nota.subjetivo}
                            onChange={e => setNota({ ...nota, subjetivo: e.target.value })}
                            className={textAreaCls} placeholder="Motivo de consulta, palabras del paciente..." />
                    </div>

                    {/* O */}
                    <div>
                        <label className="text-xs font-black text-orange-600 uppercase tracking-wider flex items-center gap-1.5 mb-1.5">
                            <span className="w-2.5 h-2.5 rounded-full bg-orange-500" /> O — Objetivo
                        </label>
                        <textarea rows={4} value={nota.objetivo}
                            onChange={e => setNota({ ...nota, objetivo: e.target.value })}
                            className={textAreaCls} placeholder="Hallazgos físicos, pruebas, radiografías..." />
                    </div>

                    {/* A */}
                    <div>
                        <label className="text-xs font-black text-emerald-700 uppercase tracking-wider flex items-center gap-1.5 mb-1.5">
                            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" /> A — Análisis
                        </label>
                        <textarea rows={4} value={nota.analisis}
                            onChange={e => setNota({ ...nota, analisis: e.target.value })}
                            className={textAreaCls} placeholder="Juicio clínico y pronóstico..." />
                    </div>

                    {/* P */}
                    <div>
                        <label className="text-xs font-black text-[#051650] uppercase tracking-wider flex items-center gap-1.5 mb-1.5">
                            <span className="w-2.5 h-2.5 rounded-full bg-[#051650]" /> P — Plan
                        </label>
                        <textarea rows={4} value={nota.plan}
                            onChange={e => setNota({ ...nota, plan: e.target.value })}
                            className={textAreaCls} placeholder="Tratamiento ejecutado, medicación, instrucciones..." />
                    </div>
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between pt-3 border-t border-slate-100">
                    <p className="text-xs text-slate-500 font-medium italic">
                        El registro se bloquea legalmente 24h tras la firma electrónica.
                    </p>
                    <div className="flex items-center gap-2">
                        {onCancel && (
                            <button type="button" onClick={onCancel}
                                className="px-4 py-2 border border-slate-200 rounded-lg text-xs font-black uppercase text-slate-500 hover:bg-slate-50 transition-all">
                                Cancelar
                            </button>
                        )}
                        <button
                            type="submit" disabled={saving}
                            className="flex items-center gap-2 bg-[#051650] text-white px-6 py-2.5 rounded-lg font-black uppercase text-xs tracking-wider shadow-lg hover:bg-blue-900 active:scale-95 transition-all disabled:opacity-60"
                        >
                            {saving
                                ? <><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Firmando...</>
                                : <><Save className="w-3.5 h-3.5" /> {initialData ? 'Guardar cambios' : 'Firmar evolutivo'}</>
                            }
                        </button>
                    </div>
                </div>
            </div>
        </form>
    );
};

export default SOAPEditor;
