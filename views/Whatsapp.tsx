
import React, { useState, useEffect } from 'react';
import { getConversaciones, getMensajes, sendMensaje, ConversacionUI, MensajeUI } from '../services/whatsapp.service';
import { isDbConfigured } from '../services/db';
import {
    Search,
    MoreVertical,
    Smile,
    Send,
    Phone,
    Video,
    Circle,
    User,
    CheckCheck,
    Bot,
    Sparkles,
    Calendar,
    ChevronLeft
} from 'lucide-react';
import { Badge } from '../components/UI';

interface WhatsappProps {
    activeSubArea?: string;
}

const Whatsapp: React.FC<WhatsappProps> = ({ activeSubArea }) => {
    const [conversaciones, setConversaciones] = useState<ConversacionUI[]>([]);
    const [activeChat, setActiveChat] = useState<ConversacionUI | null>(null);
    const [mensajes, setMensajes] = useState<MensajeUI[]>([]);
    const [newMessage, setNewMessage] = useState('');

    const MOCK_CONV: ConversacionUI[] = [
        { id: '1', name: 'Javier Gómez', phone: '600123456', lastMessage: 'Perfecto, el Jueves 16 me va genial.', time: '10:45 AM', unread: 0, status: 'online', avatar: 'JG', type: 'patient', tags: ['Paciente Premium'] },
        { id: '2', name: 'Ana Martínez', phone: '611222333', lastMessage: 'Muchas gracias por la información.', time: 'Ayer', unread: 0, status: 'offline', avatar: 'AM', type: 'patient', tags: [] }
    ];
    const MOCK_MESSAGES: MensajeUI[] = [
        { id: 'm1', sender: 'them', text: 'Hola, me gustaría saber si tienen hueco para una limpieza la semana que viene.', time: '10:42 AM', status: 'read' },
        { id: 'm2', sender: 'bot', text: '¡Hola! Tenemos disponibilidad para ti. Claro, revisando la agenda tengo los siguientes huecos: Martes 14 a las 10:30 y Jueves 16 a las 16:00. ¿Le viene bien alguno?', time: '10:43 AM', status: 'read' },
        { id: 'm3', sender: 'them', text: 'Perfecto, el Jueves 16 me va genial.', time: '10:45 AM', status: 'read' }
    ];

    useEffect(() => {
        if (isDbConfigured()) {
            getConversaciones().then(data => {
                if (data.length > 0) {
                    setConversaciones(data);
                    setActiveChat(data[0]);
                } else {
                    setConversaciones(MOCK_CONV);
                    setActiveChat(MOCK_CONV[0]);
                }
            });
        } else {
            setConversaciones(MOCK_CONV);
            setActiveChat(MOCK_CONV[0]);
        }
    }, []);

    useEffect(() => {
        if (!activeChat) return;
        if (isDbConfigured()) {
            getMensajes(activeChat.id).then(data => {
                if (data.length > 0) setMensajes(data);
                else setMensajes(MOCK_MESSAGES);
            });
        } else {
            setMensajes(MOCK_MESSAGES);
        }
    }, [activeChat]);

    const handleSend = async () => {
        if (!newMessage.trim() || !activeChat) return;
        const msg: MensajeUI = { id: Date.now().toString(), sender: 'me', text: newMessage, time: new Date().toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' }), status: 'sent' };
        setMensajes(prev => [...prev, msg]);
        setNewMessage('');
        if (isDbConfigured()) {
            await sendMensaje(activeChat.id, newMessage, 'clinica');
        }
    };

    return (
        <div className="flex flex-col h-full space-y-4">

            <div className="flex-1 flex bg-slate-50 dark:bg-slate-900 rounded-[2.5rem] border-2 border-[#051650] dark:border-slate-800 shadow-2xl shadow-slate-200/50 overflow-hidden animate-in fade-in duration-700">
                {/* Conversations List */}
                <div className="w-96 border-r border-slate-200 dark:border-slate-800 flex flex-col bg-white dark:bg-slate-800 relative z-20">
                    <div className="p-8 border-b border-slate-100 dark:border-slate-700 shrink-0">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-3xl font-black text-[#051650] dark:text-white uppercase tracking-tighter">Chats</h2>
                            <button className="p-2 hover:bg-slate-50 dark:hover:bg-slate-700 rounded-xl transition-all">
                                <MoreVertical className="w-5 h-5 text-slate-400" />
                            </button>
                        </div>
                        <div className="relative group">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-blue-600 transition-colors" />
                            <input
                                type="text"
                                placeholder="Buscar conversación..."
                                className="w-full pl-12 pr-4 py-4 text-sm font-bold bg-slate-50 dark:bg-slate-900 border-none rounded-2xl focus:ring-2 focus:ring-blue-600/20 transition-all outline-none"
                            />
                        </div>
                    </div>

                    <div className="flex-1 overflow-y-auto p-4 space-y-2">
                        {conversaciones.map(conv => {
                            const isActive = activeChat?.id === conv.id;
                            return (
                                <div
                                    key={conv.id}
                                    onClick={() => setActiveChat(conv)}
                                    className={`p-4 flex items-start gap-4 rounded-[1.5rem] cursor-pointer group transition-all ${isActive ? 'bg-blue-50 dark:bg-blue-900/20 border-2 border-[#051650] dark:border-blue-800/50 shadow-lg shadow-blue-500/5' : 'hover:bg-slate-50 dark:hover:bg-slate-700/50'}`}
                                >
                                    <div className="relative shrink-0">
                                        <div className={`w-14 h-14 rounded-2xl flex items-center justify-center font-black text-xl shadow-lg transition-transform group-hover:rotate-3 ${isActive ? 'bg-gradient-to-br from-blue-500 to-blue-600 text-white' : 'bg-slate-100 dark:bg-slate-700 text-slate-400'}`}>
                                            {conv.name.substring(0, 2).toUpperCase()}
                                        </div>
                                        {conv.status === 'online' && <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 border-4 border-white dark:border-slate-800 rounded-full"></div>}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex justify-between items-center mb-1">
                                            <p className={`font-black uppercase tracking-tight truncate ${isActive ? 'text-[#051650] dark:text-white' : 'text-slate-700 dark:text-slate-300'}`}>{conv.name}</p>
                                            <p className={`text-[10px] font-black uppercase ${isActive ? 'text-blue-600' : 'text-slate-400'}`}>{conv.time}</p>
                                        </div>
                                        <p className={`text-xs font-medium truncate ${isActive ? 'text-slate-500 dark:text-slate-400' : 'text-slate-400 dark:text-slate-500'}`}>{conv.lastMessage}</p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Chat Window */}
                <div className="flex-1 flex flex-col bg-slate-50/50 dark:bg-slate-900/50 relative">
                    {/* Decorative background logo/pattern */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] pointer-events-none">
                        <Bot className="w-96 h-96 rotate-12" />
                    </div>

                    <div className="p-6 border-b border-slate-200 dark:border-slate-800 shrink-0 bg-white/80 dark:bg-slate-800/80 backdrop-blur-md flex justify-between items-center relative z-10">
                        {activeChat && (
                            <div className="flex items-center gap-4">
                                <div className="lg:hidden p-2 -ml-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg">
                                    <ChevronLeft className="w-5 h-5 text-slate-400" />
                                </div>
                                <div className="relative">
                                    <div className="w-12 h-12 rounded-2xl bg-blue-600 text-white flex items-center justify-center font-black text-lg">
                                        {activeChat.name.substring(0, 2).toUpperCase()}
                                    </div>
                                    {activeChat.status === 'online' && <div className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-emerald-500 border-2 border-white dark:border-slate-800 rounded-full"></div>}
                                </div>
                                <div>
                                    <p className="font-black text-[#051650] dark:text-white uppercase tracking-tighter">{activeChat.name}</p>
                                    <div className="flex items-center gap-1.5">
                                        {activeChat.status === 'online' && <Badge variant="blue">En línea</Badge>}
                                        {activeChat.tags.map(t => <span key={t} className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">• {t}</span>)}
                                    </div>
                                </div>
                            </div>
                        )}
                        <div className="flex items-center gap-2">
                            <button className="p-3 rounded-2xl hover:bg-slate-50 dark:hover:bg-slate-700 transition-all text-slate-400 border border-slate-100 dark:border-slate-700">
                                <Phone className="w-5 h-5" />
                            </button>
                            <button className="p-3 rounded-2xl hover:bg-slate-50 dark:hover:bg-slate-700 transition-all text-slate-400 border border-slate-100 dark:border-slate-700">
                                <Video className="w-5 h-5" />
                            </button>
                            <button className="p-3 rounded-2xl hover:bg-slate-50 dark:hover:bg-slate-700 transition-all text-slate-400 border border-slate-100 dark:border-slate-700">
                                <Search className="w-5 h-5" />
                            </button>
                        </div>
                    </div>

                    <div className="flex-1 p-8 overflow-y-auto space-y-6 relative z-10">
                        <div className="flex justify-center">
                            <span className="bg-white dark:bg-slate-800 px-4 py-1.5 rounded-full text-[10px] font-black uppercase text-slate-400 tracking-widest border-2 border-[#051650] dark:border-slate-700 shadow-sm">
                                Hoy, 16 de Febrero
                            </span>
                        </div>
                        {mensajes.map(msg => {
                            if (msg.sender === 'them') {
                                return (
                                    <div key={msg.id} className="flex justify-start animate-in slide-in-from-left-4 duration-500">
                                        <div className="bg-white dark:bg-slate-800 rounded-[2rem] rounded-tl-sm py-4 px-6 max-w-lg shadow-sm border border-slate-100 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-bold text-sm">
                                            <p className="leading-relaxed text-[13px]">{msg.text}</p>
                                            <div className="flex justify-end mt-1">
                                                <span className="text-[9px] text-slate-400 uppercase font-black">{msg.time}</span>
                                            </div>
                                        </div>
                                    </div>
                                );
                            } else if (msg.sender === 'bot') {
                                return (
                                    <div key={msg.id} className="flex justify-end animate-in slide-in-from-right-4 duration-500">
                                        <div className="bg-[#051650] text-white rounded-[2rem] rounded-tr-sm py-5 px-7 max-w-xl shadow-xl shadow-blue-900/10 border-2 border-[#051650] relative overflow-hidden group">
                                            <div className="flex items-center gap-3 mb-3">
                                                <div className="w-8 h-8 bg-blue-600/30 backdrop-blur-md rounded-xl flex items-center justify-center order-last ring-1 ring-white/20">
                                                    <Bot className="w-4 h-4" />
                                                </div>
                                                <div className="flex flex-col items-end">
                                                    <span className="text-[10px] font-black uppercase tracking-widest text-blue-300">Inteligencia Sarah</span>
                                                    <span className="text-[8px] font-bold uppercase text-blue-400/80">Gestión Automática</span>
                                                </div>
                                            </div>
                                            <p className="text-[13px] font-medium leading-relaxed mb-4 text-blue-50/90">{msg.text}</p>
                                            <div className="flex items-center justify-between">
                                                <div className="flex gap-2">
                                                    <Badge variant="blue" className="bg-white/10 text-white border-white/20">AIA</Badge>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <span className="text-[9px] text-blue-300 uppercase font-black">{msg.time}</span>
                                                    <CheckCheck className="w-4 h-4 text-blue-400" />
                                                </div>
                                            </div>
                                            <Sparkles className="absolute -top-2 -right-2 w-12 h-12 text-blue-400/10 rotate-12 group-hover:scale-110 transition-transform" />
                                        </div>
                                    </div>
                                );
                            } else {
                                return (
                                    <div key={msg.id} className="flex justify-end animate-in slide-in-from-right-4 duration-500">
                                        <div className="bg-blue-600 text-white rounded-[2rem] rounded-tr-sm py-4 px-6 max-w-lg shadow-sm">
                                            <p className="leading-relaxed text-[13px]">{msg.text}</p>
                                            <div className="flex justify-end mt-1 items-center gap-2">
                                                <span className="text-[9px] text-blue-200 uppercase font-black">{msg.time}</span>
                                                <CheckCheck className="w-4 h-4 text-blue-300" />
                                            </div>
                                        </div>
                                    </div>
                                );
                            }
                        })}
                    </div>

                    <div className="p-8 shrink-0 bg-white dark:bg-slate-800 border-t border-slate-200 dark:border-slate-800 relative z-10">
                        <div className="relative group mx-auto max-w-4xl">
                            <button className="absolute left-4 top-1/2 -translate-y-1/2 p-2 hover:bg-slate-50 dark:hover:bg-slate-700 rounded-xl transition-all text-slate-400">
                                <Smile className="w-6 h-6" />
                            </button>
                            <input
                                type="text"
                                value={newMessage}
                                onChange={e => setNewMessage(e.target.value)}
                                onKeyDown={e => e.key === 'Enter' && handleSend()}
                                placeholder={`Escribe un mensaje para ${activeChat?.name.split(' ')[0] || '...'}`}
                                className="w-full pl-16 pr-16 py-5 bg-slate-50 dark:bg-slate-900 border-none rounded-3xl font-bold text-sm focus:ring-2 focus:ring-blue-600/10 transition-all outline-none"
                            />
                            <button onClick={handleSend} className="absolute right-3 top-1/2 -translate-y-1/2 p-4 bg-[#051650] text-white rounded-2xl hover:scale-105 active:scale-95 transition-all shadow-xl shadow-blue-900/20">
                                <Send className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Whatsapp;
