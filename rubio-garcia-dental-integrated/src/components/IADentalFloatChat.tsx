import React, { useState, useRef, useEffect } from 'react';
import { X, Send, Sparkles, Database, Loader2, Copy, ChevronDown } from 'lucide-react';
import { User, SystemConfigItem, ChatMessage } from '../types';
import { iaDentalAdminQuery, iaDentalPatientChat } from '../services/iaDentalService';

interface IADentalFloatChatProps {
    user: User;
    systemConfig: SystemConfigItem[];
}

const IADentalFloatChat: React.FC<IADentalFloatChatProps> = ({ user, systemConfig }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [inputText, setInputText] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [messages, setMessages] = useState<ChatMessage[]>([
        {
            id: 'init',
            sender: 'assistant',
            text: `¡Hola ${user.name}! Soy **IA Dental**, tu asistente de base de datos. Puedo consultar GELITE por ti.\n\nPrueba preguntarme:\n- "¿Cuántos pacientes tenemos?"\n- "Muéstrame las citas de mañana"\n- "Busca pacientes con apellido García"`,
            timestamp: new Date()
        }
    ]);

    const messagesEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const handleSend = async () => {
        if (!inputText.trim() || isLoading) return;

        const userMsg: ChatMessage = {
            id: Date.now().toString(),
            sender: 'user',
            text: inputText,
            timestamp: new Date()
        };

        setMessages(prev => [...prev, userMsg]);
        setInputText('');
        setIsLoading(true);

        try {
            const response = await iaDentalAdminQuery(messages, inputText, systemConfig);

            const aiMsg: ChatMessage = {
                id: (Date.now() + 1).toString(),
                sender: 'assistant',
                text: response,
                timestamp: new Date()
            };

            setMessages(prev => [...prev, aiMsg]);
        } catch (error: any) {
            setMessages(prev => [...prev, {
                id: (Date.now() + 1).toString(),
                sender: 'assistant',
                text: `❌ Error: ${error.message}`,
                timestamp: new Date()
            }]);
        } finally {
            setIsLoading(false);
        }
    };

    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text);
    };

    // Renderizar contenido con código SQL resaltado
    const renderContent = (content: string) => {
        const parts = content.split(/(```sql[\s\S]*?```)/g);
        return parts.map((part, index) => {
            if (part.startsWith('```sql')) {
                const code = part.replace(/```sql\n?|```/g, '').trim();
                return (
                    <div key={index} className="my-2 rounded-lg overflow-hidden border border-brand-cyan/30 bg-brand-dark">
                        <div className="flex justify-between items-center px-3 py-1 bg-brand-dark/80 border-b border-brand-cyan/20">
                            <span className="text-[10px] font-mono text-brand-cyan flex items-center gap-1">
                                <Database size={10} /> SQL QUERY
                            </span>
                            <button
                                onClick={() => copyToClipboard(code)}
                                className="text-slate-400 hover:text-white transition-colors"
                            >
                                <Copy size={12} />
                            </button>
                        </div>
                        <pre className="p-3 overflow-x-auto">
                            <code className="text-xs font-mono text-brand-lime whitespace-pre">{code}</code>
                        </pre>
                    </div>
                );
            }
            // Procesar markdown básico
            return (
                <span key={index} dangerouslySetInnerHTML={{
                    __html: part
                        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                        .replace(/\n/g, '<br/>')
                }} />
            );
        });
    };

    return (
        <>
            {/* Botón Flotante */}
            {!isOpen && (
                <button
                    onClick={() => setIsOpen(true)}
                    className="fixed bottom-6 right-6 z-50 group flex items-center gap-3 bg-gradient-to-r from-brand-dark to-brand-blue text-white pl-4 pr-2 py-2 rounded-full shadow-xl hover:shadow-brand-cyan/40 hover:scale-105 transition-all ia-dental-float-btn"
                >
                    <span className="font-bold text-sm">IA Dental Admin</span>
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-brand-lime to-brand-cyan flex items-center justify-center">
                        <Sparkles size={20} className="text-brand-dark" />
                    </div>
                </button>
            )}

            {/* Panel de Chat */}
            {isOpen && (
                <div className="fixed bottom-6 right-6 z-50 w-96 h-[520px] bg-white rounded-2xl shadow-2xl border border-gray-200 flex flex-col overflow-hidden animate-slide-up">
                    {/* Header */}
                    <div className="bg-gradient-to-r from-brand-dark to-brand-blue p-4 flex justify-between items-center">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-lime to-brand-cyan flex items-center justify-center">
                                <Sparkles size={20} className="text-brand-dark" />
                            </div>
                            <div>
                                <h3 className="text-white font-bold">IA Dental</h3>
                                <span className="text-brand-lime text-xs flex items-center gap-1">
                                    <span className="w-1.5 h-1.5 rounded-full bg-brand-lime animate-pulse"></span>
                                    Modo Administrador
                                </span>
                            </div>
                        </div>
                        <button
                            onClick={() => setIsOpen(false)}
                            className="text-white/60 hover:text-white transition-colors p-1 hover:bg-white/10 rounded-lg"
                        >
                            <ChevronDown size={20} />
                        </button>
                    </div>

                    {/* Messages */}
                    <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50 custom-scrollbar">
                        {messages.map((msg) => (
                            <div
                                key={msg.id}
                                className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                            >
                                <div
                                    className={`max-w-[85%] rounded-2xl p-3 shadow-sm ${msg.sender === 'user'
                                        ? 'bg-brand-blue text-white rounded-br-none'
                                        : 'bg-white text-gray-700 border border-gray-200 rounded-bl-none'
                                        }`}
                                >
                                    <div className="text-sm leading-relaxed">
                                        {msg.sender === 'user' ? msg.text : renderContent(msg.text)}
                                    </div>
                                    <div className={`text-[10px] mt-2 ${msg.sender === 'user' ? 'text-white/60' : 'text-gray-400'}`}>
                                        {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                    </div>
                                </div>
                            </div>
                        ))}

                        {isLoading && (
                            <div className="flex justify-start">
                                <div className="bg-white p-3 rounded-2xl rounded-bl-none shadow-sm border border-gray-200 flex items-center gap-2">
                                    <Loader2 className="animate-spin text-brand-cyan" size={16} />
                                    <span className="text-xs text-gray-500">Consultando GELITE...</span>
                                </div>
                            </div>
                        )}

                        <div ref={messagesEndRef} />
                    </div>

                    {/* Input */}
                    <div className="p-3 bg-white border-t border-gray-100">
                        <div className="flex items-center gap-2 bg-gray-100 p-2 rounded-xl border border-gray-200 focus-within:ring-2 focus-within:ring-brand-cyan/30 focus-within:border-brand-cyan">
                            <input
                                type="text"
                                value={inputText}
                                onChange={(e) => setInputText(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                                placeholder="Pregunta sobre la base de datos..."
                                className="flex-1 bg-transparent border-none outline-none text-sm text-gray-700 placeholder:text-gray-400"
                                disabled={isLoading}
                            />
                            <button
                                onClick={handleSend}
                                disabled={!inputText.trim() || isLoading}
                                className={`p-2 rounded-lg transition-all ${inputText.trim() && !isLoading
                                    ? 'bg-brand-blue text-white hover:bg-brand-dark'
                                    : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                                    }`}
                            >
                                <Send size={16} />
                            </button>
                        </div>
                        <div className="flex justify-center mt-2">
                            <span className="text-[10px] text-gray-400 flex items-center gap-1">
                                <Database size={10} /> Conectado a GELITE
                            </span>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default IADentalFloatChat;
