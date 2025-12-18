import React from 'react';
import { X, Send, Loader2, CheckCircle, AlertCircle, User, Smartphone } from 'lucide-react';

interface SendDocumentModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSend: () => void;
    documentTitle: string;
    recipientPhone: string;
    recipientName: string;
    onRecipientPhoneChange: (value: string) => void;
    onRecipientNameChange: (value: string) => void;
    sendStatus: 'idle' | 'sending' | 'success' | 'error';
    sendError: string | null;
}

export const SendDocumentModal: React.FC<SendDocumentModalProps> = ({
    isOpen,
    onClose,
    onSend,
    documentTitle,
    recipientPhone,
    recipientName,
    onRecipientPhoneChange,
    onRecipientNameChange,
    sendStatus,
    sendError
}) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md animate-fade-in">
                <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                    <h3 className="text-xl font-bold text-brand-dark">Enviar Documento</h3>
                    <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg">
                        <X size={20} />
                    </button>
                </div>

                <div className="p-6 space-y-4">
                    <div>
                        <label className="text-xs font-bold text-gray-500 uppercase block mb-2">Documento</label>
                        <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                            <p className="text-sm font-medium text-brand-dark">{documentTitle}</p>
                        </div>
                    </div>

                    <div>
                        <label className="text-xs font-bold text-gray-500 uppercase block mb-2 flex items-center gap-2">
                            <User size={14} /> Nombre del Paciente
                        </label>
                        <input
                            type="text"
                            value={recipientName}
                            onChange={e => onRecipientNameChange(e.target.value)}
                            placeholder="Ej: Juan García"
                            className="w-full p-3 border border-gray-300 rounded-xl text-sm outline-none focus:border-brand-cyan"
                        />
                    </div>

                    <div>
                        <label className="text-xs font-bold text-gray-500 uppercase block mb-2 flex items-center gap-2">
                            <Smartphone size={14} /> Teléfono (con país)
                        </label>
                        <input
                            type="tel"
                            value={recipientPhone}
                            onChange={e => onRecipientPhoneChange(e.target.value)}
                            placeholder="+34 600 000 000"
                            className="w-full p-3 border border-gray-300 rounded-xl text-sm outline-none focus:border-brand-cyan"
                        />
                        <p className="text-xs text-gray-500 mt-1">Formato: +34 seguido del número</p>
                    </div>

                    {/* Status Messages */}
                    {sendStatus === 'success' && (
                        <div className="p-3 bg-green-50 border border-green-200 rounded-lg flex items-center gap-2">
                            <CheckCircle size={18} className="text-green-600" />
                            <p className="text-sm text-green-700 font-medium">¡Documento enviado correctamente!</p>
                        </div>
                    )}

                    {sendStatus === 'error' && (
                        <div className="p-3 bg-red-50 border border-red-200 rounded-lg flex items-start gap-2">
                            <AlertCircle size={18} className="text-red-600 flex-shrink-0 mt-0.5" />
                            <p className="text-sm text-red-700">{sendError || 'Error al enviar el documento'}</p>
                        </div>
                    )}
                </div>

                <div className="p-6 border-t border-gray-100 flex justify-end gap-2">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 border border-gray-300 text-gray-700 rounded-xl text-sm font-bold hover:bg-gray-50"
                    >
                        Cancelar
                    </button>
                    <button
                        onClick={onSend}
                        disabled={!recipientPhone || !recipientName || sendStatus === 'sending'}
                        className={`px-4 py-2 rounded-xl text-sm font-bold flex items-center gap-2 ${!recipientPhone || !recipientName || sendStatus === 'sending'
                                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                : 'bg-brand-cyan text-white hover:bg-brand-blue'
                            }`}
                    >
                        {sendStatus === 'sending' ? (
                            <>
                                <Loader2 className="animate-spin" size={16} />
                                Enviando...
                            </>
                        ) : (
                            <>
                                <Send size={16} />
                                Enviar
                            </>
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
};
