import React, { useRef, useEffect } from 'react';
import { Send, Smile, Paperclip } from 'lucide-react';
import { ChatMessage, ChatContact } from '../../../../types';

interface ChatPanelProps {
    selectedContact: ChatContact | null;
    messages: ChatMessage[];
    currentMessage: string;
    onMessageChange: (value: string) => void;
    onSendMessage: () => void;
}

export const ChatPanel: React.FC<ChatPanelProps> = ({
    selectedContact,
    messages,
    currentMessage,
    onMessageChange,
    onSendMessage
}) => {
    const messagesEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    if (!selectedContact) {
        return (
            <div className="flex-1 flex items-center justify-center bg-gray-50">
                <div className="text-center">
                    <p className="text-gray-400 text-lg">Selecciona un contacto para comenzar</p>
                </div>
            </div>
        );
    }

    return (
        <div className="flex-1 flex flex-col bg-white">
            {/* Chat Header */}
            <div className="p-4 border-b border-gray-200 bg-gray-50">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center text-white font-bold">
                        {selectedContact.name.charAt(0)}
                    </div>
                    <div>
                        <h3 className="font-bold text-brand-dark">{selectedContact.name}</h3>
                        <p className="text-xs text-gray-500">{selectedContact.phone}</p>
                    </div>
                </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-[#E5DDD5]">
                {messages.map((msg) => (
                    <div
                        key={msg.id}
                        className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                        <div
                            className={`max-w-[70%] rounded-lg p-3 shadow-sm ${msg.sender === 'user'
                                    ? 'bg-[#DCF8C6] text-gray-800'
                                    : 'bg-white text-gray-800'
                                }`}
                        >
                            <p className="text-sm whitespace-pre-wrap">{msg.text}</p>
                            <span className="text-[10px] text-gray-500 mt-1 block text-right">
                                {msg.timestamp.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })}
                            </span>
                        </div>
                    </div>
                ))}
                <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 bg-gray-50 border-t border-gray-200">
                <div className="flex items-center gap-2 bg-white rounded-full px-4 py-2 border border-gray-300">
                    <button className="text-gray-400 hover:text-gray-600">
                        <Smile size={20} />
                    </button>
                    <button className="text-gray-400 hover:text-gray-600">
                        <Paperclip size={20} />
                    </button>
                    <input
                        type="text"
                        value={currentMessage}
                        onChange={(e) => onMessageChange(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && onSendMessage()}
                        placeholder="Escribe un mensaje..."
                        className="flex-1 bg-transparent outline-none text-sm"
                    />
                    <button
                        onClick={onSendMessage}
                        disabled={!currentMessage.trim()}
                        className={`p-2 rounded-full transition-colors ${currentMessage.trim()
                                ? 'bg-green-500 text-white hover:bg-green-600'
                                : 'bg-gray-200 text-gray-400'
                            }`}
                    >
                        <Send size={18} />
                    </button>
                </div>
            </div>
        </div>
    );
};
