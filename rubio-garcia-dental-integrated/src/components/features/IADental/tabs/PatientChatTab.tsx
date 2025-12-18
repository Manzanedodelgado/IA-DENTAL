import React, { useRef, useEffect } from 'react';
import { Users, Loader2, Send } from 'lucide-react';
import { ChatMessage } from '../../../../types';

interface PatientChatTabProps {
    messages: ChatMessage[];
    input: string;
    loading: boolean;
    onInputChange: (value: string) => void;
    onSend: () => void;
}

export const PatientChatTab: React.FC<PatientChatTabProps> = ({
    messages,
    input,
    loading,
    onInputChange,
    onSend
}) => {
    const endRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        endRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    return (
        <>
            <div className="p-4 border-b border-gray-100 bg-gradient-to-r from-brand-cyan/10 to-transparent">
                <div className="flex items-center gap-2">
                    <Users size={18} className="text-brand-cyan" />
                    <h2 className="font-bold text-brand-dark">Chat Modo Paciente</h2>
                    <span className="ml-auto text-xs bg-brand-cyan/20 text-brand-dark px-2 py-1 rounded-lg font-medium">
                        Sin Acceso a Datos
                    </span>
                </div>
                <p className="text-xs text-gray-500 mt-1">Simula cómo un paciente interactúa con IA Dental</p>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gradient-to-b from-brand-cyan/5 to-white">
                {messages.map((msg) => (
                    <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                        <div className={`max-w-[80%] rounded-2xl p-4 shadow-sm ${msg.sender === 'user'
                                ? 'bg-brand-cyan text-white rounded-br-none'
                                : 'bg-white text-gray-700 border border-gray-200 rounded-bl-none'
                            }`}>
                            <div className="text-sm leading-relaxed whitespace-pre-wrap">{msg.text}</div>
                        </div>
                    </div>
                ))}
                {loading && (
                    <div className="flex justify-start">
                        <div className="bg-white p-4 rounded-2xl rounded-bl-none shadow-sm border border-gray-200 flex items-center gap-3">
                            <Loader2 className="animate-spin text-brand-cyan" size={18} />
                            <span className="text-xs text-gray-500">IA Dental está escribiendo...</span>
                        </div>
                    </div>
                )}
                <div ref={endRef} />
            </div>

            <div className="p-4 bg-white border-t border-gray-100">
                <div className="flex items-center gap-2 bg-gray-100 p-2 rounded-xl border border-gray-200 focus-within:ring-2 focus-within:ring-brand-cyan/30">
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => onInputChange(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && onSend()}
                        placeholder="Escribe como si fueras un paciente..."
                        className="flex-1 bg-transparent border-none outline-none text-sm text-gray-700 placeholder:text-gray-400 mx-2"
                        disabled={loading}
                    />
                    <button
                        onClick={onSend}
                        disabled={!input.trim() || loading}
                        className={`p-3 rounded-lg transition-all ${input.trim() && !loading
                                ? 'bg-brand-cyan text-white hover:bg-brand-dark'
                                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                            }`}
                    >
                        <Send size={18} />
                    </button>
                </div>
            </div>
        </>
    );
};
