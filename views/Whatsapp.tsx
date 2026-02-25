import React, { useState, useEffect, useRef } from 'react';
import {
    Search, MoreVertical, Smile, Send, Phone, Video,
    CheckCheck, Bot, Sparkles, ChevronLeft, Wifi, WifiOff,
    QrCode, RefreshCw, Tag, CheckCircle2, Paperclip, Filter,
    AlertCircle
} from 'lucide-react';
import {
    ConversacionUI, MensajeUI, InstanceStatus,
    isEvolutionConfigured, isChatwootConfigured,
    getInstanceStatus, getQRCode,
    getChatwootConversaciones, getChatwootMensajes,
    sendChatwootMessage, sendTextMessage,
    labelConversation, resolveConversation
} from '../services/evolution.service';

// ── Mock fallback when neither service is configured ─────────────────────────
const MOCK_CONV: ConversacionUI[] = [
    { id: '34600123456', name: 'Javier Gómez', phone: '34600123456', lastMessage: 'Perfecto, el Jueves 16 me va genial.', lastMessageAt: Date.now() - 900000, unread: 2, status: 'open', avatar: 'JG', type: 'patient', tags: ['Paciente Premium'] },
    { id: '34611222333', name: 'Ana Martínez', phone: '34611222333', lastMessage: 'Muchas gracias por la información!', lastMessageAt: Date.now() - 3600000, unread: 0, status: 'resolved', avatar: 'AM', type: 'patient', tags: [] },
    { id: '34622111444', name: 'Luis Pérez', phone: '34622111444', lastMessage: '¿Qué cuidados necesito después del implante?', lastMessageAt: Date.now() - 7200000, unread: 1, status: 'pending', avatar: 'LP', type: 'patient', tags: ['Post-Implante'] },
];
const MOCK_MSGS: MensajeUI[] = [
    { id: 'm1', sender: 'them', text: 'Hola, me gustaría saber si tienen hueco para una limpieza la semana que viene.', time: '10:42', status: 'read' },
    { id: 'm2', sender: 'bot', text: '¡Hola! Tengo disponibilidad para ti: Martes 14 a las 10:30h o Jueves 16 a las 16:00h. ¿Cuál le viene mejor?', time: '10:43', status: 'read' },
    { id: 'm3', sender: 'them', text: 'Perfecto, el Jueves 16 me va genial.', time: '10:45', status: 'read' },
    { id: 'm4', sender: 'me', text: '¡Perfecto! He reservado el Jueves 16 a las 16:00h para una higiene dental. Recibirás confirmación en breve 😊', time: '10:46', status: 'read' },
];

type FilterStatus = 'all' | 'open' | 'pending' | 'resolved';
const STATUS_COLOR: Record<string, string> = {
    open: 'bg-emerald-500', pending: 'bg-amber-400', resolved: 'bg-slate-300', online: 'bg-emerald-500', offline: 'bg-slate-300'
};

interface WhatsappProps { activeSubArea?: string; }

const Whatsapp: React.FC<WhatsappProps> = () => {
    const [convs, setConvs] = useState<ConversacionUI[]>([]);
    const [active, setActive] = useState<ConversacionUI | null>(null);
    const [msgs, setMsgs] = useState<MensajeUI[]>([]);
    const [input, setInput] = useState('');
    const [search, setSearch] = useState('');
    const [filterStatus, setFilterStatus] = useState<FilterStatus>('all');
    const [instanceStatus, setInstanceStatus] = useState<InstanceStatus | null>(null);
    const [qr, setQr] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [sending, setSending] = useState(false);
    const isMock = !isEvolutionConfigured() && !isChatwootConfigured();
    const messagesEndRef = useRef<HTMLDivElement>(null);

    // Load conversations
    useEffect(() => {
        const load = async () => {
            setLoading(true);
            if (isChatwootConfigured()) {
                const data = await getChatwootConversaciones();
                setConvs(data.length > 0 ? data : MOCK_CONV);
                if (data.length > 0) setActive(data[0]);
            } else {
                setConvs(MOCK_CONV);
                setActive(MOCK_CONV[0]);
            }
            setLoading(false);
        };
        load();
    }, []);

    // Load messages when conversation changes
    useEffect(() => {
        if (!active) return;
        const load = async () => {
            if (isChatwootConfigured() && active.chatwootId) {
                const data = await getChatwootMensajes(active.chatwootId);
                setMsgs(data.length > 0 ? data : MOCK_MSGS);
            } else {
                setMsgs(MOCK_MSGS);
            }
        };
        load();
    }, [active]);

    // Check Evolution instance status
    useEffect(() => {
        if (!isEvolutionConfigured()) return;
        getInstanceStatus().then(s => setInstanceStatus(s));
        const interval = setInterval(() => getInstanceStatus().then(s => setInstanceStatus(s)), 30000);
        return () => clearInterval(interval);
    }, []);

    // Auto-scroll messages
    useEffect(() => { messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [msgs]);

    const handleSend = async () => {
        if (!input.trim() || !active) return;
        const text = input.trim();
        const optimistic: MensajeUI = { id: Date.now().toString(), sender: 'me', text, time: new Date().toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' }), status: 'sent' };
        setMsgs(p => [...p, optimistic]);
        setInput('');
        setSending(true);

        try {
            if (isChatwootConfigured() && active.chatwootId) {
                const ok = await sendChatwootMessage(active.chatwootId, text);
                if (!ok) throw new Error();
            } else if (isEvolutionConfigured()) {
                const ok = await sendTextMessage(active.phone, text);
                if (!ok) throw new Error();
            }
            setMsgs(p => p.map(m => m.id === optimistic.id ? { ...m, status: 'delivered' } : m));
        } catch {
            setMsgs(p => p.map(m => m.id === optimistic.id ? { ...m, status: 'failed' } : m));
        } finally {
            setSending(false);
        }
    };

    const handleGetQR = async () => {
        const code = await getQRCode();
        setQr(code);
    };

    const filteredConvs = convs
        .filter(c => filterStatus === 'all' || c.status === filterStatus)
        .filter(c => !search || c.name.toLowerCase().includes(search.toLowerCase()) || c.phone.includes(search));

    const connectionBadge = () => {
        if (isMock) return { text: 'Modo demo', color: 'bg-amber-50 text-amber-700 border-amber-200', icon: AlertCircle };
        if (isEvolutionConfigured() && instanceStatus?.state === 'open') return { text: 'WhatsApp conectado', color: 'bg-emerald-50 text-emerald-700 border-emerald-200', icon: Wifi };
        if (isEvolutionConfigured() && instanceStatus?.state === 'connecting') return { text: 'Conectando...', color: 'bg-blue-50 text-blue-700 border-blue-200', icon: RefreshCw };
        if (isEvolutionConfigured()) return { text: 'WhatsApp desconectado', color: 'bg-rose-50 text-rose-700 border-rose-200', icon: WifiOff };
        if (isChatwootConfigured()) return { text: 'Chatwoot conectado', color: 'bg-emerald-50 text-emerald-700 border-emerald-200', icon: Wifi };
        return { text: 'Sin configurar', color: 'bg-slate-50 text-slate-500 border-slate-200', icon: WifiOff };
    };
    const badge = connectionBadge();
    const BadgeIcon = badge.icon;

    return (
        <div className="flex flex-col h-full space-y-3">

            {/* Connection status bar */}
            <div className="flex items-center justify-between">
                <div className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border text-[10px] font-black uppercase tracking-wider ${badge.color}`}>
                    <BadgeIcon className="w-3 h-3" />
                    {badge.text}
                    {isMock && <span className="text-amber-500 font-bold normal-case tracking-normal ml-1">— Configura VITE_EVOLUTION_API_URL o VITE_CHATWOOT_URL en .env.local</span>}
                </div>
                <div className="flex items-center gap-2">
                    {isEvolutionConfigured() && instanceStatus?.state !== 'open' && (
                        <button onClick={handleGetQR} className="flex items-center gap-1.5 px-3 py-1.5 bg-[#0056b3] text-white rounded-xl text-[10px] font-black uppercase hover:bg-[#004494] transition-all">
                            <QrCode className="w-3.5 h-3.5" />Conectar WhatsApp
                        </button>
                    )}
                    <button onClick={async () => { const d = await getChatwootConversaciones(); if (d.length) setConvs(d); }} className="p-2 border border-slate-200 rounded-xl hover:bg-slate-50 transition-all">
                        <RefreshCw className="w-3.5 h-3.5 text-slate-400" />
                    </button>
                </div>
            </div>

            {/* QR Modal */}
            {qr && (
                <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-[200]" onClick={() => setQr(null)}>
                    <div className="bg-white rounded-2xl p-6 shadow-2xl" onClick={e => e.stopPropagation()}>
                        <p className="text-[12px] font-black text-[#051650] uppercase tracking-widest mb-4 text-center">Escanea con WhatsApp</p>
                        <img src={`data:image/png;base64,${qr}`} alt="QR Code" className="w-64 h-64 rounded-xl" />
                        <p className="text-[10px] text-slate-400 text-center mt-3">WhatsApp → Dispositivos vinculados → Vincular dispositivo</p>
                    </div>
                </div>
            )}

            {/* Main chat UI */}
            <div className="flex-1 flex bg-white rounded-2xl border-2 border-[#051650] shadow-xl overflow-hidden" style={{ minHeight: 0 }}>

                {/* Left: Conversation List */}
                <div className="w-80 border-r border-slate-200 flex flex-col shrink-0">
                    <div className="p-4 border-b border-slate-100 space-y-3">
                        <div className="flex items-center justify-between">
                            <h2 className="text-[14px] font-black text-[#051650] uppercase tracking-tighter">Chats</h2>
                            <span className="text-[10px] font-black text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full">{convs.length}</span>
                        </div>
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
                            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Buscar..." className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-[11px] focus:outline-none focus:ring-2 focus:ring-[#0056b3]/20" />
                        </div>
                        <div className="flex gap-1">
                            {(['all', 'open', 'pending', 'resolved'] as FilterStatus[]).map(s => (
                                <button key={s} onClick={() => setFilterStatus(s)} className={`flex-1 py-1 rounded-lg text-[9px] font-black uppercase transition-all ${filterStatus === s ? 'bg-[#0056b3] text-white' : 'bg-slate-50 text-slate-400 border border-slate-200 hover:border-[#0056b3]/30'}`}>
                                    {s === 'all' ? 'Todos' : s === 'open' ? 'Abiertos' : s === 'pending' ? 'Pendientes' : 'Resueltos'}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="flex-1 overflow-y-auto">
                        {loading ? (
                            <div className="p-4 text-center text-[11px] text-slate-400">Cargando conversaciones...</div>
                        ) : filteredConvs.length === 0 ? (
                            <div className="p-4 text-center text-[11px] text-slate-400">No hay conversaciones</div>
                        ) : (
                            filteredConvs.map(conv => {
                                const isAct = active?.id === conv.id;
                                return (
                                    <div key={conv.id} onClick={() => setActive(conv)}
                                        className={`px-3 py-3 flex items-start gap-3 cursor-pointer border-b border-slate-50 transition-all ${isAct ? 'bg-[#0056b3]/5 border-l-4 border-l-[#0056b3]' : 'hover:bg-slate-50'}`}>
                                        <div className="relative shrink-0">
                                            <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-black text-sm ${isAct ? 'bg-[#0056b3] text-white' : 'bg-slate-100 text-slate-500'}`}>
                                                {conv.avatar}
                                            </div>
                                            <span className={`absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-white ${STATUS_COLOR[conv.status] ?? 'bg-slate-300'}`} />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center justify-between mb-0.5">
                                                <p className="text-[11px] font-black text-[#051650] truncate">{conv.name}</p>
                                                <div className="flex items-center gap-1 shrink-0">
                                                    {conv.unread > 0 && <span className="w-4 h-4 bg-[#0056b3] text-white text-[9px] font-black rounded-full flex items-center justify-center">{conv.unread}</span>}
                                                </div>
                                            </div>
                                            <p className="text-[10px] text-slate-400 truncate">{conv.lastMessage}</p>
                                            <div className="flex items-center gap-1 mt-0.5 flex-wrap">
                                                {conv.tags.slice(0, 2).map(t => <span key={t} className="text-[8px] font-black text-[#0056b3] bg-[#0056b3]/10 px-1.5 py-0.5 rounded-full">{t}</span>)}
                                            </div>
                                        </div>
                                    </div>
                                );
                            })
                        )}
                    </div>
                </div>

                {/* Right: Chat window */}
                <div className="flex-1 flex flex-col" style={{ minWidth: 0 }}>
                    {!active ? (
                        <div className="flex-1 flex items-center justify-center">
                            <div className="text-center">
                                <Bot className="w-16 h-16 text-slate-100 mx-auto mb-4" />
                                <p className="text-[13px] font-black text-slate-300 uppercase tracking-widest">Selecciona una conversación</p>
                            </div>
                        </div>
                    ) : (
                        <>
                            {/* Header */}
                            <div className="flex items-center justify-between px-4 py-3 border-b border-slate-200 bg-white shrink-0">
                                <div className="flex items-center gap-3">
                                    <div className={`w-9 h-9 rounded-xl flex items-center justify-center font-black text-sm bg-[#0056b3] text-white`}>{active.avatar}</div>
                                    <div>
                                        <p className="text-[12px] font-black text-[#051650]">{active.name}</p>
                                        <div className="flex items-center gap-1.5">
                                            <span className={`w-1.5 h-1.5 rounded-full ${STATUS_COLOR[active.status] ?? 'bg-slate-300'}`} />
                                            <span className="text-[9px] text-slate-400 font-bold uppercase">{active.phone}</span>
                                            {active.assignedAgent && <span className="text-[9px] text-slate-400">· {active.assignedAgent}</span>}
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-1.5">
                                    <button className="p-2 hover:bg-slate-50 rounded-xl transition-all" title="Llamar"><Phone className="w-4 h-4 text-slate-400" /></button>
                                    <button onClick={async () => { if (active.chatwootId) { await labelConversation(active.chatwootId, ['Revisado']); } }} className="p-2 hover:bg-slate-50 rounded-xl transition-all" title="Etiquetar"><Tag className="w-4 h-4 text-slate-400" /></button>
                                    <button onClick={async () => { if (active.chatwootId) { await resolveConversation(active.chatwootId); setConvs(p => p.map(c => c.id === active.id ? { ...c, status: 'resolved' } : c)); } }} className="flex items-center gap-1 px-3 py-1.5 bg-emerald-50 border border-emerald-200 text-emerald-700 rounded-xl text-[10px] font-black uppercase hover:bg-emerald-100 transition-all">
                                        <CheckCircle2 className="w-3.5 h-3.5" />Resolver
                                    </button>
                                </div>
                            </div>

                            {/* Messages */}
                            <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-slate-50/30">
                                {msgs.map(msg => (
                                    <div key={msg.id} className={`flex ${msg.sender !== 'them' ? 'justify-end' : 'justify-start'}`}>
                                        {msg.sender === 'bot' ? (
                                            <div className="bg-[#051650] text-white rounded-2xl rounded-tr-sm py-3 px-4 max-w-lg shadow-lg">
                                                <div className="flex items-center gap-2 mb-1.5">
                                                    <Bot className="w-3.5 h-3.5 text-blue-300" />
                                                    <span className="text-[9px] font-black uppercase text-blue-300 tracking-wider">Sara AI</span>
                                                    <Sparkles className="w-3 h-3 text-blue-400/50" />
                                                </div>
                                                <p className="text-[12px] leading-relaxed text-blue-50/90">{msg.text}</p>
                                                <div className="flex justify-end mt-1">
                                                    <span className="text-[9px] text-blue-400">{msg.time}</span>
                                                </div>
                                            </div>
                                        ) : msg.sender === 'me' ? (
                                            <div className="bg-[#0056b3] text-white rounded-2xl rounded-tr-sm py-2.5 px-4 max-w-lg shadow-sm">
                                                <p className="text-[12px] leading-relaxed">{msg.text}</p>
                                                <div className="flex justify-end mt-1 items-center gap-1.5">
                                                    <span className="text-[9px] text-blue-200">{msg.time}</span>
                                                    <CheckCheck className={`w-3.5 h-3.5 ${msg.status === 'read' ? 'text-blue-200' : msg.status === 'failed' ? 'text-rose-300' : 'text-blue-300/60'}`} />
                                                    {msg.status === 'failed' && <span className="text-[9px] text-rose-300">Error</span>}
                                                </div>
                                            </div>
                                        ) : (
                                            <div className="bg-white rounded-2xl rounded-tl-sm py-2.5 px-4 max-w-lg shadow-sm border border-slate-100">
                                                <p className="text-[12px] text-slate-700 leading-relaxed">{msg.text}</p>
                                                <div className="flex justify-end mt-1">
                                                    <span className="text-[9px] text-slate-400">{msg.time}</span>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                ))}
                                <div ref={messagesEndRef} />
                            </div>

                            {/* Input */}
                            <div className="p-3 border-t border-slate-200 bg-white shrink-0">
                                <div className="flex items-center gap-2">
                                    <button className="p-2 text-slate-400 hover:text-slate-600 transition-colors"><Paperclip className="w-4 h-4" /></button>
                                    <button className="p-2 text-slate-400 hover:text-slate-600 transition-colors"><Smile className="w-4 h-4" /></button>
                                    <input
                                        value={input}
                                        onChange={e => setInput(e.target.value)}
                                        onKeyDown={e => e.key === 'Enter' && !e.shiftKey && handleSend()}
                                        placeholder={`Escribe a ${active.name.split(' ')[0]}...`}
                                        className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-[12px] focus:outline-none focus:ring-2 focus:ring-[#0056b3]/20"
                                    />
                                    <button
                                        onClick={handleSend}
                                        disabled={!input.trim() || sending}
                                        className="w-9 h-9 bg-[#0056b3] text-white rounded-xl flex items-center justify-center hover:bg-[#004494] disabled:opacity-40 transition-all shadow-sm"
                                    >
                                        {sending ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Send className="w-3.5 h-3.5" />}
                                    </button>
                                </div>
                                {isMock && (
                                    <p className="text-[9px] text-amber-500 text-center mt-1.5">
                                        ⚠️ Modo demo — configura VITE_EVOLUTION_API_URL y VITE_CHATWOOT_URL para mensajes reales
                                    </p>
                                )}
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Whatsapp;
