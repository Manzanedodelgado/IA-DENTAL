import React from 'react';
import { FileText, Edit2, Copy, Trash2, Eye } from 'lucide-react';

interface DocumentTemplate {
    id: string;
    title: string;
    category: 'template' | 'consent' | 'questionnaire' | 'info';
    subCategory?: string;
    format: 'document' | 'whatsapp';
    lastModified: string;
    modifiedBy: string;
    status: 'active' | 'draft' | 'archived';
}

interface DocumentsListProps {
    documents: DocumentTemplate[];
    selectedDoc: DocumentTemplate | null;
    searchTerm: string;
    filterCategory: string;
    onSearchChange: (value: string) => void;
    onFilterChange: (category: string) => void;
    onSelectDoc: (doc: DocumentTemplate) => void;
}

export const DocumentsList: React.FC<DocumentsListProps> = ({
    documents,
    selectedDoc,
    searchTerm,
    filterCategory,
    onSearchChange,
    onFilterChange,
    onSelectDoc
}) => {
    const filteredDocs = documents.filter(doc => {
        const matchesSearch = doc.title.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesFilter = !filterCategory || filterCategory === 'all' || doc.category === filterCategory;
        return matchesSearch && matchesFilter;
    });

    return (
        <div className="w-80 bg-gray-50 border-r border-gray-200 flex flex-col">
            {/* Search */}
            <div className="p-4 border-b border-gray-200">
                <input
                    type="text"
                    placeholder="Buscar documentos..."
                    value={searchTerm}
                    onChange={e => onSearchChange(e.target.value)}
                    className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg text-sm outline-none focus:border-brand-cyan"
                />
                <select
                    value={filterCategory}
                    onChange={e => onFilterChange(e.target.value)}
                    className="w-full mt-2 px-3 py-2 bg-white border border-gray-300 rounded-lg text-sm outline-none focus:border-brand-cyan"
                >
                    <option value="all">Todas las categorías</option>
                    <option value="template">Plantillas</option>
                    <option value="consent">Consentimientos</option>
                    <option value="questionnaire">Cuestionarios</option>
                    <option value="info">Información</option>
                </select>
            </div>

            {/* Documents List */}
            <div className="flex-1 overflow-y-auto">
                {filteredDocs.map(doc => (
                    <button
                        key={doc.id}
                        onClick={() => onSelectDoc(doc)}
                        className={`w-full p-4 border-b border-gray-200 text-left transition-colors ${selectedDoc?.id === doc.id
                                ? 'bg-brand-blue/10 border-l-4 border-l-brand-blue'
                                : 'hover:bg-gray-100'
                            }`}
                    >
                        <div className="flex items-start gap-3">
                            <FileText size={18} className={selectedDoc?.id === doc.id ? 'text-brand-blue' : 'text-gray-400'} />
                            <div className="flex-1 min-w-0">
                                <h4 className="text-sm font-bold text-brand-dark truncate">{doc.title}</h4>
                                <p className="text-xs text-gray-500 mt-1">{doc.subCategory || doc.category}</p>
                                <div className="flex items-center gap-2 mt-2">
                                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${doc.format === 'whatsapp'
                                            ? 'bg-green-100 text-green-700'
                                            : 'bg-blue-100 text-blue-700'
                                        }`}>
                                        {doc.format}
                                    </span>
                                    <span className="text-[10px] text-gray-400">{doc.lastModified}</span>
                                </div>
                            </div>
                        </div>
                    </button>
                ))}
            </div>
        </div>
    );
};
