import React, { useRef, useEffect } from 'react';
import { Database, Loader2, Send, Copy } from 'lucide-react';
import { ChatMessage, SystemConfigItem } from '../../../../types';

interface AdminChatTabProps {
    messages: ChatMessage[];
    input: string;
    loading: boolean;
    onInputChange: (value: string) => void;
    onSend: () => void;
    renderContent: (content: string) => React.ReactNode;
}

export const AdminChatTab: React.FC<AdminChatTabProps> = ({
    messages,
    input,
    loading,
    onInputChange,
    onSend,
    renderContent
}) => {
    const endRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        endRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    return (
        <>
            <div className="p-4 border-b border-gray-100 bg-gray-50/50">
                <div className="flex items-center gap-2">
                    <Database size={18} className="text-brand-blue" />
                    <h2 className="font-bold text-brand-dark">Chat Administrador</h2>
                    <span className="ml-auto text-xs bg-brand-blue/10 text-brand-blue px-2 py-1 rounded-lg font-medium">
                        Acceso SQL Completo
                    </span>
                </div>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50/30">
                {messages.map((msg) => (
                    <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                        <div className={`max-w-[80%] rounded-2xl p-4 shadow-sm ${msg.sender === 'user'
                                ? 'bg-brand-blue text-white rounded-br-none'
                                : 'bg-white text-gray-700 border border-gray-200 rounded-bl-none'
                            }`}>
                            <div className="text-sm leading-relaxed">
                                {msg.sender === 'user' ? msg.text : renderContent(msg.text)}
                            </div>
                        </div>
                    </div>
                ))}
                {loading && (
                    <div className="flex justify-start">
                        <div className="bg-white p-4 rounded-2xl rounded-bl-none shadow-sm border border-gray-200 flex items-center gap-3">
                            <Loader2 className="animate-spin text-brand-blue" size={18} />
                            <span className="text-xs text-gray-500">Consultando GELITE...</span>
                        </div>
                    </div>
                )}
                <div ref={endRef} />
            </div>

            <div className="p-4 bg-white border-t border-gray-100">
                <div className="flex items-center gap-2 bg-gray-100 p-2 rounded-xl border border-gray-200 focus-within:ring-2 focus-within:ring-brand-blue/30">
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => onInputChange(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && onSend()}
                        placeholder="Pregunta sobre la base de datos..."
                        className="flex-1 bg-transparent border-none outline-none text-sm text-gray-700 placeholder:text-gray-400 mx-2"
                        disabled={loading}
                    />
                    <button
                        onClick={onSend}
                        disabled={!input.trim() || loading}
                        className={`p-3 rounded-lg transition-all ${input.trim() && !loading
                                ? 'bg-brand-blue text-white hover:bg-brand-dark'
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
