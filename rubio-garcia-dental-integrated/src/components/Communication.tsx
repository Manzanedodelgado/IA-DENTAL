import React, { useState, useEffect, useRef } from 'react';
import { Send, Search, MoreVertical, Plus, Bot, Sparkles, AlertCircle, Phone, CheckCheck, CalendarClock, AlertTriangle, X, Calendar, Clock, Check, QrCode, Wifi, WifiOff, RefreshCw, LogOut, Loader2 } from 'lucide-react';
import { ChatContact, Appointment } from '../types';
import { iaDentalPatientChat } from '../services/iaDentalService';
import { whatsappService, WhatsAppStatus, WhatsAppChat, WhatsAppMessage } from '../services/whatsappService';
import { INITIAL_CONTACTS } from '../constants';

// Mock patient appointments for the contact
const getPatientAppointments = (contactName: string): Appointment[] => {
    const now = Date.now();
    return [
        { id: 1, time: '10:00', patientName: contactName, doctor: 'Dr. Rubio', treatment: 'Limpieza dental', duration: '30min', durationMinutes: 30, status: 'completed', date: new Date(now - 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], phone: '', urgent: false },
        { id: 2, time: '11:00', patientName: contactName, doctor: 'Dr. García', treatment: 'Revisión general', duration: '20min', durationMinutes: 20, status: 'completed', date: new Date(now - 14 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], phone: '', urgent: false },
        { id: 3, time: '09:30', patientName: contactName, doctor: 'Dr. Rubio', treatment: 'Empaste', duration: '45min', durationMinutes: 45, status: 'completed', date: new Date(now - 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], phone: '', urgent: false },
        { id: 4, time: '16:00', patientName: contactName, doctor: 'Dr. García', treatment: 'Control implante', duration: '30min', durationMinutes: 30, status: 'pending', date: new Date(now + 5 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], phone: '', urgent: false },
    ];
};

const Communication: React.FC = () => {
    // WhatsApp state
    const [waStatus, setWaStatus] = useState<WhatsAppStatus | null>(null);
    const [waChats, setWaChats] = useState<WhatsAppChat[]>([]);
    const [waMessages, setWaMessages] = useState<WhatsAppMessage[]>([]);
    const [qrCode, setQrCode] = useState<string | null>(null);
    const [workerAvailable, setWorkerAvailable] = useState<boolean | null>(null);
    const [showQRPanel, setShowQRPanel] = useState(false);

    // Local state (fallback when WhatsApp not connected)
    const [chats, setChats] = useState<ChatContact[]>(() => {
        const saved = localStorage.getItem('ia_dental_chats');
        return saved ? JSON.parse(saved) : INITIAL_CONTACTS;
    });
    const [selectedContact, setSelectedContact] = useState<ChatContact>(chats[0]);
    const [searchTerm, setSearchTerm] = useState('');
    const [inputText, setInputText] = useState('');
    const [isAIActive, setIsAIActive] = useState(() => localStorage.getItem('ia_dental_active') === 'true');
    const [aiTyping, setAiTyping] = useState(false);
    const [chatHistory, setChatHistory] = useState<{ sender: string; text: string; time: string }[]>([]);
    const [showAppointments, setShowAppointments] = useState(false);
    const chatEndRef = useRef<HTMLDivElement>(null);

    // Check if WhatsApp worker is available
    useEffect(() => {
        const checkWorker = async () => {
            const available = await whatsappService.isWorkerAvailable();
            setWorkerAvailable(available);

            if (available) {
                // Connect to WhatsApp worker
                await whatsappService.connect();

                // Get initial status
                const status = await whatsappService.getStatus();
                setWaStatus(status);

                if (status.hasQR) {
                    setQrCode(status.qrCode);
                }

                if (status.status === 'connected') {
                    const chats = await whatsappService.getChats();
                    setWaChats(chats);
                }
            }
        };

        checkWorker();

        return () => {
            whatsappService.disconnect();
        };
    }, []);

    // Subscribe to WhatsApp events
    useEffect(() => {
        if (!workerAvailable) return;

        const unsubStatus = whatsappService.onStatus((status) => {
            setWaStatus(status);
            if (!status.hasQR) setQrCode(null);
        });

        const unsubQR = whatsappService.onQR((qr) => {
            setQrCode(qr);
            setShowQRPanel(true);
        });

        const unsubMessage = whatsappService.onMessage((message) => {
            setWaMessages(prev => [...prev, message]);
            // Update chat history if viewing this chat
            if (selectedContact && message.jid.includes(selectedContact.phone?.replace(/[^0-9]/g, '') || '')) {
                setChatHistory(prev => [...prev, {
                    sender: 'contact',
                    text: message.text,
                    time: new Date(message.timestamp).toLocaleTimeString('es', { hour: '2-digit', minute: '2-digit' })
                }]);
            }
        });

        const unsubChats = whatsappService.onChatsUpdated((chats) => {
            setWaChats(chats);
        });

        return () => {
            unsubStatus();
            unsubQR();
            unsubMessage();
            unsubChats();
        };
    }, [workerAvailable, selectedContact]);

    // AI config listener
    useEffect(() => {
        const loadConfig = () => setIsAIActive(localStorage.getItem('ia_dental_active') === 'true');
        window.addEventListener('storage', loadConfig);
        return () => window.removeEventListener('storage', loadConfig);
    }, []);

    // Load chat history when contact changes
    useEffect(() => {
        setChatHistory([
            { sender: 'contact', text: 'Hola, buenos días.', time: '09:00' },
            { sender: 'user', text: `Hola ${selectedContact.name}, le saludamos de Rubio García Dental.`, time: '09:05' },
            { sender: 'contact', text: selectedContact.msg, time: selectedContact.time }
        ]);
        setShowAppointments(false);
    }, [selectedContact]);

    // Auto-scroll chat
    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [chatHistory, aiTyping]);

    const handleSendMessage = async (e?: React.FormEvent) => {
        e?.preventDefault();
        if (!inputText.trim()) return;

        const newMsg = { sender: 'user', text: inputText, time: 'Ahora' };
        setChatHistory(prev => [...prev, newMsg]);
        setInputText('');

        // If WhatsApp connected, send via WhatsApp
        if (waStatus?.status === 'connected' && selectedContact.phone) {
            try {
                await whatsappService.sendMessage(selectedContact.phone, inputText);
            } catch (error) {
                console.error('Error sending WhatsApp message:', error);
            }
        }

        // Update local storage
        setChats(prev => {
            const updated = prev.map(c => c.id === selectedContact.id ? { ...c, msg: inputText, time: 'Ahora' } : c);
            localStorage.setItem('ia_dental_chats', JSON.stringify(updated));
            return updated;
        });

        // AI auto-reply
        if (isAIActive) {
            setAiTyping(true);
            try {
                const aiRes = await iaDentalPatientChat(`Responde a: ${inputText}`, { name: selectedContact.name });
                setChatHistory(p => [...p, { sender: 'bot', text: aiRes, time: 'Ahora' }]);
            } catch { } finally {
                setAiTyping(false);
            }
        }
    };

    const toggleUrgent = () => {
        setChats(prev => {
            const updated = prev.map(c =>
                c.id === selectedContact.id ? { ...c, urgent: !c.urgent } : c
            );
            localStorage.setItem('ia_dental_chats', JSON.stringify(updated));
            const updatedContact = updated.find(c => c.id === selectedContact.id);
            if (updatedContact) setSelectedContact(updatedContact);
            return updated;
        });
    };

    const patientAppointments = getPatientAppointments(selectedContact.name);
    const pastAppointments = patientAppointments.filter(a => a.status === 'completed').slice(-3);
    const nextAppointment = patientAppointments.find(a => a.status === 'pending');

    const filteredChats = chats.filter(c => c.name.toLowerCase().includes(searchTerm.toLowerCase()));

    const formatRelativeDate = (dateStr?: string) => {
        if (!dateStr) return '';
        const date = new Date(dateStr);
        const diff = Math.floor((Date.now() - date.getTime()) / (1000 * 60 * 60 * 24));
        if (diff < 0) {
            const futureDiff = Math.abs(diff);
            if (futureDiff === 0) return 'Hoy';
            if (futureDiff === 1) return 'Mañana';
            return `En ${futureDiff} días`;
        }
        if (diff === 0) return 'Hoy';
        if (diff === 1) return 'Ayer';
        if (diff < 7) return `Hace ${diff} días`;
        if (diff < 30) return `Hace ${Math.floor(diff / 7)} semanas`;
        return `Hace ${Math.floor(diff / 30)} meses`;
    };

    // WhatsApp status indicator
    const getStatusColor = () => {
        if (!workerAvailable) return 'bg-gray-400';
        switch (waStatus?.status) {
            case 'connected': return 'bg-brand-lime';
            case 'connecting':
            case 'reconnecting': return 'bg-yellow-500 animate-pulse';
            case 'qr_ready': return 'bg-blue-500 animate-pulse';
            case 'logged_out':
            case 'error': return 'bg-red-500';
            default: return 'bg-gray-400';
        }
    };

    const getStatusText = () => {
        if (!workerAvailable) return 'Worker offline';
        switch (waStatus?.status) {
            case 'connected': return `Conectado${waStatus.user?.id ? ` (${waStatus.user.id.split('@')[0]})` : ''}`;
            case 'connecting': return 'Conectando...';
            case 'reconnecting': return 'Reconectando...';
            case 'qr_ready': return 'Escanea el QR';
            case 'logged_out': return 'Sesión cerrada';
            case 'error': return 'Error';
            default: return 'Desconectado';
        }
    };

    return (
        <div className="h-full flex bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden animate-fade-in">
            {/* Sidebar */}
            <div className="w-80 border-r border-gray-200 flex flex-col bg-gray-50">
                {/* WhatsApp Status Header */}
                <div className="p-3 border-b border-gray-200 bg-white">
                    <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                            <div className={`w-2 h-2 rounded-full ${getStatusColor()}`}></div>
                            <span className="text-xs font-bold text-gray-600">{getStatusText()}</span>
                        </div>
                        <div className="flex items-center gap-1">
                            {waStatus?.status === 'qr_ready' && (
                                <button
                                    onClick={() => setShowQRPanel(true)}
                                    className="p-1.5 rounded-lg hover:bg-gray-100 text-brand-blue"
                                    title="Ver QR"
                                >
                                    <QrCode size={16} />
                                </button>
                            )}
                            {waStatus?.status === 'connected' && (
                                <button
                                    onClick={() => whatsappService.logout()}
                                    className="p-1.5 rounded-lg hover:bg-red-50 text-red-500"
                                    title="Cerrar sesión"
                                >
                                    <LogOut size={14} />
                                </button>
                            )}
                            {(waStatus?.status === 'logged_out' || waStatus?.status === 'error') && (
                                <button
                                    onClick={() => whatsappService.reconnect()}
                                    className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-500"
                                    title="Reconectar"
                                >
                                    <RefreshCw size={14} />
                                </button>
                            )}
                        </div>
                    </div>
                    {!workerAvailable && (
                        <p className="text-[10px] text-gray-400">Ejecuta: cd whatsapp-worker && npm start</p>
                    )}
                </div>

                <div className="p-4 border-b border-gray-200 flex items-center justify-between">
                    <h3 className="font-bold text-brand-dark">Conversaciones</h3>
                    <button className="p-2 rounded-lg hover:bg-gray-200"><Plus size={18} /></button>
                </div>
                <div className="p-3">
                    <div className="flex items-center gap-2 bg-white px-3 py-2 rounded-lg border border-gray-200">
                        <Search size={14} className="text-gray-400" />
                        <input placeholder="Buscar..." className="bg-transparent border-none outline-none text-sm flex-1" value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
                    </div>
                </div>
                <div className="flex-1 overflow-y-auto">
                    {filteredChats.map(chat => (
                        <div key={chat.id} onClick={() => setSelectedContact(chat)} className={`p-4 border-b border-gray-100 cursor-pointer hover:bg-white transition-colors ${selectedContact.id === chat.id ? 'bg-white border-l-4 border-l-brand-blue' : ''}`}>
                            <div className="flex justify-between mb-1">
                                <span className="font-semibold text-sm">{chat.name}</span>
                                <span className="text-[10px] text-gray-400">{chat.time}</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <p className="text-xs text-gray-500 truncate max-w-[180px]">{chat.msg}</p>
                                {chat.urgent && <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>}
                                {chat.unread > 0 && <span className="w-5 h-5 rounded-full bg-brand-cyan text-white text-[10px] flex items-center justify-center">{chat.unread}</span>}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* QR Code Panel Overlay */}
            {showQRPanel && qrCode && (
                <div className="absolute inset-0 bg-black/50 z-50 flex items-center justify-center animate-fade-in">
                    <div className="bg-white rounded-2xl p-8 max-w-sm shadow-2xl">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="font-bold text-brand-dark text-lg">Escanea con WhatsApp</h3>
                            <button onClick={() => setShowQRPanel(false)} className="p-1 hover:bg-gray-100 rounded">
                                <X size={20} className="text-gray-400" />
                            </button>
                        </div>
                        <img src={qrCode} alt="WhatsApp QR Code" className="w-64 h-64 mx-auto" />
                        <p className="text-xs text-gray-500 text-center mt-4">
                            Abre WhatsApp en tu teléfono → Dispositivos vinculados → Vincular dispositivo
                        </p>
                        <div className="mt-4 flex items-center justify-center gap-2 text-brand-cyan">
                            <Loader2 size={16} className="animate-spin" />
                            <span className="text-sm">Esperando escaneo...</span>
                        </div>
                    </div>
                </div>
            )}

            {/* Chat Area */}
            <div className="flex-1 flex flex-col relative">
                {/* Header */}
                <div className="p-4 border-b border-gray-200 flex justify-between items-center bg-white">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-brand-blue/10 text-brand-blue flex items-center justify-center font-bold">{selectedContact.name.charAt(0)}</div>
                        <div>
                            <h3 className="font-bold text-brand-dark">{selectedContact.name}</h3>
                            <p className="text-xs text-gray-500">{selectedContact.phone}</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        {selectedContact.urgent && <span className="text-xs bg-red-100 text-red-600 px-2 py-1 rounded-full font-bold flex items-center gap-1"><AlertCircle size={12} /> Urgente</span>}

                        <button className="p-2 rounded-lg hover:bg-gray-100" title="Llamar">
                            <Phone size={18} className="text-gray-500" />
                        </button>

                        <button
                            onClick={() => setShowAppointments(!showAppointments)}
                            className={`p-2 rounded-lg transition-colors ${showAppointments ? 'bg-brand-blue/10 text-brand-blue' : 'hover:bg-gray-100 text-gray-500'}`}
                            title="Ver historial de citas"
                        >
                            <CalendarClock size={18} />
                        </button>

                        <button
                            onClick={toggleUrgent}
                            className={`p-2 rounded-lg transition-colors ${selectedContact.urgent ? 'bg-red-100 text-red-600' : 'hover:bg-gray-100 text-gray-500'}`}
                            title={selectedContact.urgent ? 'Quitar urgente' : 'Marcar como urgente'}
                        >
                            <AlertTriangle size={18} />
                        </button>

                        <button className="p-2 rounded-lg hover:bg-gray-100"><MoreVertical size={18} className="text-gray-500" /></button>
                    </div>
                </div>

                {/* Appointments Panel (collapsible) */}
                {showAppointments && (
                    <div className="bg-gradient-to-r from-brand-blue/5 to-brand-cyan/5 border-b border-gray-200 p-4 animate-slide-up">
                        <div className="flex items-center justify-between mb-3">
                            <h4 className="text-sm font-bold text-brand-dark flex items-center gap-2">
                                <CalendarClock size={16} className="text-brand-blue" /> Historial de Citas
                            </h4>
                            <button onClick={() => setShowAppointments(false)} className="p-1 hover:bg-white rounded">
                                <X size={14} className="text-gray-400" />
                            </button>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <p className="text-xs font-bold text-gray-500 uppercase mb-2">Últimas 3 Citas</p>
                                <div className="space-y-2">
                                    {pastAppointments.map(apt => (
                                        <div key={apt.id} className="bg-white p-2 rounded-lg border border-gray-100 text-xs">
                                            <div className="flex justify-between items-center">
                                                <span className="font-bold text-brand-dark">{apt.treatment}</span>
                                                <span className="text-gray-400">{formatRelativeDate(apt.date)}</span>
                                            </div>
                                            <div className="flex items-center gap-2 mt-1 text-gray-500">
                                                <Clock size={10} /> {apt.time} • {apt.doctor}
                                            </div>
                                            <div className="flex items-center gap-1 mt-1 text-brand-dark">
                                                <Check size={10} /> Completada
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <p className="text-xs font-bold text-gray-500 uppercase mb-2">Próxima Cita</p>
                                {nextAppointment ? (
                                    <div className="bg-gradient-to-r from-brand-lime/20 to-brand-cyan/20 p-3 rounded-xl border border-brand-lime/30">
                                        <div className="flex items-center gap-2 mb-2">
                                            <Calendar size={14} className="text-brand-dark" />
                                            <span className="font-bold text-brand-dark">{formatRelativeDate(nextAppointment.date)}</span>
                                        </div>
                                        <p className="text-sm font-bold text-brand-dark">{nextAppointment.treatment}</p>
                                        <div className="flex items-center gap-2 mt-2 text-xs text-gray-600">
                                            <Clock size={10} /> {nextAppointment.time} • {nextAppointment.duration}
                                        </div>
                                        <p className="text-xs text-gray-500 mt-1">{nextAppointment.doctor}</p>
                                        <div className="mt-2">
                                            <span className="text-[10px] px-2 py-0.5 rounded-full bg-brand-lime text-brand-dark font-bold">Pendiente</span>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="bg-gray-50 p-3 rounded-xl border border-dashed border-gray-200 text-center">
                                        <Calendar size={24} className="mx-auto text-gray-300 mb-2" />
                                        <p className="text-xs text-gray-400">Sin citas programadas</p>
                                        <button className="mt-2 text-xs text-brand-cyan font-bold hover:underline">+ Agendar cita</button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                )}

                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-[#f0f2f5]">
                    {chatHistory.map((msg, i) => (
                        <div key={i} className={`flex ${msg.sender === 'user' || msg.sender === 'bot' ? 'justify-end' : 'justify-start'}`}>
                            <div className={`max-w-[70%] rounded-2xl p-3 shadow-sm relative ${msg.sender === 'contact' ? 'bg-white text-gray-800 rounded-bl-none' :
                                msg.sender === 'bot' ? 'bg-gradient-to-r from-brand-lime to-brand-cyan text-brand-dark rounded-br-none' :
                                    'bg-brand-blue text-white rounded-br-none'
                                }`}>
                                {msg.sender === 'bot' && <div className="absolute -top-2 -right-1 bg-brand-dark text-white text-[8px] px-1.5 py-0.5 rounded-full flex items-center gap-1"><Bot size={8} /> IA Dental</div>}
                                <p className="text-sm">{msg.text}</p>
                                <div className="flex justify-end items-center gap-1 mt-1">
                                    <span className="text-[10px] opacity-60">{msg.time}</span>
                                    {msg.sender !== 'contact' && <CheckCheck size={12} className="opacity-60" />}
                                </div>
                            </div>
                        </div>
                    ))}
                    {aiTyping && <div className="flex justify-end"><div className="bg-white p-3 rounded-2xl rounded-br-none shadow-sm flex items-center gap-2"><Sparkles className="animate-pulse text-brand-cyan" size={14} /><span className="text-xs text-gray-500">IA Dental escribiendo...</span></div></div>}
                    <div ref={chatEndRef} />
                </div>

                {/* Input */}
                <form onSubmit={handleSendMessage} className="p-4 bg-white border-t border-gray-200 flex gap-3">
                    <input value={inputText} onChange={e => setInputText(e.target.value)} placeholder="Escribe un mensaje..." className="flex-1 bg-gray-100 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-brand-cyan" />
                    <button type="submit" className="p-3 bg-brand-blue text-white rounded-xl hover:bg-brand-dark transition-colors"><Send size={18} /></button>
                </form>

                {/* AI Status */}
                <div className={`px-4 py-2 text-xs font-medium flex items-center justify-center gap-2 ${isAIActive ? 'bg-brand-lime/20 text-brand-dark' : 'bg-gray-100 text-gray-500'}`}>
                    <Sparkles size={12} className={isAIActive ? 'text-brand-dark' : 'text-gray-400'} />
                    {isAIActive ? 'IA Dental: Respuesta Automática Activa' : 'IA Dental: Inactivo'}
                </div>
            </div>
        </div>
    );
};

export default Communication;
