import React from 'react';
import { Edit2, Send, Save, X } from 'lucide-react';

interface DocumentViewerProps {
    title: string;
    content: string;
    isEditing: boolean;
    editedContent: string;
    onEditStart: () => void;
    onEditChange: (value: string) => void;
    onSave: () => void;
    onCancelEdit: () => void;
    onOpenSendModal: () => void;
}

export const DocumentViewer: React.FC<DocumentViewerProps> = ({
    title,
    content,
    isEditing,
    editedContent,
    onEditStart,
    onEditChange,
    onSave,
    onCancelEdit,
    onOpenSendModal
}) => {
    return (
        <div className="flex-1 flex flex-col bg-white">
            {/* Header */}
            <div className="p-6 border-b border-gray-200 flex justify-between items-center">
                <h2 className="text-lg font-bold text-brand-dark">{title}</h2>
                <div className="flex gap-2">
                    {isEditing ? (
                        <>
                            <button
                                onClick={onCancelEdit}
                                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg text-sm font-bold hover:bg-gray-50 flex items-center gap-2"
                            >
                                <X size={16} /> Cancelar
                            </button>
                            <button
                                onClick={onSave}
                                className="px-4 py-2 bg-brand-cyan text-white rounded-lg text-sm font-bold hover:bg-brand-blue flex items-center gap-2"
                            >
                                <Save size={16} /> Guardar
                            </button>
                            <>
                                ) : (
                                <>
                                    <button
                                        onClick={onEditStart}
                                        className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg text-sm font-bold hover:bg-gray-50 flex items-center gap-2"
                                    >
                                        <Edit2 size={16} /> Editar
                                    </button>
                                    <button
                                        onClick={onOpenSendModal}
                                        className="px-4 py-2 bg-brand-cyan text-white rounded-lg text-sm font-bold hover:bg-brand-blue flex items-center gap-2"
                                    >
                                        <Send size={16} /> Enviar por WhatsApp
                                    </button>
                                </>
                    )}
                            </div>
                        </div>

                    {/* Content */}
                    <div className="flex-1 overflow-y-auto p-6">
                        {isEditing ? (
                            <textarea
                                value={editedContent}
                                onChange={e => onEditChange(e.target.value)}
                                className="w-full h-full p-4 border border-gray-300 rounded-xl text-sm font-mono resize-none outline-none focus:border-brand-cyan"
                            />
                        ) : (
                            <div className="prose max-w-none">
                                <pre className="whitespace-pre-wrap text-sm text-gray-700 font-sans leading-relaxed">
                                    {content}
                                </pre>
                            </div>
                        )}
                    </div>
                </div>
                );
};
