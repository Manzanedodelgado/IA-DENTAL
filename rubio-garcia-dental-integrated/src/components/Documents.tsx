import React, { useState, useEffect } from 'react';
import {
    FileText, Folder, Plus, Search, Filter, Edit2, Copy, Trash2,
    Eye, Save, X, Check, ArrowLeft, Send, Smartphone,
    FileSignature, ChevronRight, MessageCircle, Loader2, CheckCircle, AlertCircle, User
} from 'lucide-react';
import { messagingService, SendResult } from '../services/messagingService';
import { whatsappService, WhatsAppStatus } from '../services/whatsappService';

// Document template type
interface DocumentTemplate {
    id: string;
    title: string;
    category: 'template' | 'consent' | 'questionnaire' | 'info';
    subCategory?: string;
    format: 'document' | 'whatsapp';
    content: string;
    lastModified: string;
    modifiedBy: string;
    status: 'active' | 'draft' | 'archived';
    description?: string;
}

// Mock documents data
const INITIAL_DOCS: DocumentTemplate[] = [
    {
        id: '1',
        title: 'Filiación Nuevo Paciente + LOPD',
        category: 'questionnaire',
        subCategory: 'General',
        format: 'whatsapp',
        content: `Bienvenido a *RUBIO GARCIA DENTAL*.

Para crear su ficha de paciente, necesitamos registrar sus datos básicos e historial médico.

🛡️ *Protección de Datos (LOPD)*: Sus datos serán tratados con confidencialidad por TRIDENTAL ODONTOLOGOS SLP para la gestión clínica. Puede ejercer sus derechos ARCO en cualquier momento.

¿Da su consentimiento para el tratamiento de sus datos y desea comenzar?`,
        lastModified: '10/03/2024',
        modifiedBy: 'Admin',
        status: 'active',
        description: 'Inicio de registro para nuevos pacientes vía WhatsApp.',
    },
    {
        id: '2',
        title: 'Consentimiento Informado - Implantes',
        category: 'consent',
        subCategory: 'Cirugía',
        format: 'document',
        content: `CONSENTIMIENTO INFORMADO PARA CIRUGÍA DE IMPLANTES DENTALES

Yo, [NOMBRE_PACIENTE], con DNI [DNI_PACIENTE], manifiesto que:

1. He sido informado/a por el Dr./Dra. [NOMBRE_DOCTOR] de la naturaleza del tratamiento de implantes dentales.

2. Comprendo que la cirugía implica riesgos inherentes como: infección, sangrado, lesión nerviosa, fracaso de osteointegración.

3. Autorizo la intervención y el tratamiento necesario.

Fecha: [FECHA]
Firma del paciente: _______________`,
        lastModified: '15/01/2024',
        modifiedBy: 'Dr. García',
        status: 'active',
        description: 'Consentimiento para colocación de implantes dentales.',
    },
    {
        id: '3',
        title: 'Recordatorio de Cita',
        category: 'template',
        subCategory: 'Comunicación',
        format: 'whatsapp',
        content: `📅 *Recordatorio de Cita*

Hola [NOMBRE], le recordamos que tiene cita en *Rubio García Dental*:

📆 Fecha: [FECHA_CITA]
⏰ Hora: [HORA_CITA]
👨‍⚕️ Doctor: [DOCTOR]

¿Confirma asistencia?`,
        lastModified: '20/02/2024',
        modifiedBy: 'Admin',
        status: 'active',
        description: 'Plantilla para recordatorios automáticos.',
    },
    {
        id: '4',
        title: 'Información Ortodoncia',
        category: 'info',
        subCategory: 'Ortodoncia',
        format: 'document',
        content: `INFORMACIÓN SOBRE TRATAMIENTO DE ORTODONCIA

Estimado paciente:

Le proporcionamos información detallada sobre las opciones de tratamiento ortodóntico disponibles en nuestra clínica:

1. Brackets Metálicos: Opción tradicional y económica.
2. Brackets Estéticos: Cerámica o zafiro, menos visibles.
3. Invisalign: Alineadores transparentes removibles.

Duración estimada: 12-24 meses según cada caso.

Para más información, consulte con nuestro equipo.`,
        lastModified: '05/01/2024',
        modifiedBy: 'Dra. Rubio',
        status: 'active',
        description: 'Folleto informativo sobre ortodoncia.',
    },
    {
        id: '5',
        title: 'Seguimiento Post-Tratamiento',
        category: 'template',
        subCategory: 'Seguimiento',
        format: 'whatsapp',
        content: `👋 Hola [NOMBRE],

Han pasado 48 horas desde su tratamiento de *[TRATAMIENTO]*.

¿Cómo se encuentra? ¿Tiene alguna molestia o pregunta?

Estamos aquí para ayudarle. Puede responder a este mensaje o llamarnos.

*Rubio García Dental*`,
        lastModified: '12/12/2024',
        modifiedBy: 'Admin',
        status: 'active',
        description: 'Mensaje de seguimiento tras tratamiento.',
    },
];

const CATEGORIES = [
    { id: 'all', label: 'Todos', icon: Folder },
    { id: 'template', label: 'Plantillas', icon: FileText },
    { id: 'consent', label: 'Consentimientos', icon: FileSignature },
    { id: 'questionnaire', label: 'Cuestionarios', icon: MessageCircle },
    { id: 'info', label: 'Información', icon: FileText },
];

const Documents: React.FC = () => {
    const [docs] = useState<DocumentTemplate[]>(INITIAL_DOCS);
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [selectedDoc, setSelectedDoc] = useState<DocumentTemplate | null>(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [editingContent, setEditingContent] = useState('');
    const [isEditing, setIsEditing] = useState(false);

    // Send modal state
    const [showSendModal, setShowSendModal] = useState(false);
    const [sendPhone, setSendPhone] = useState('');
    const [sendName, setSendName] = useState('');
    const [isSending, setIsSending] = useState(false);
    const [sendResult, setSendResult] = useState<SendResult | null>(null);

    // WhatsApp status
    const [waStatus, setWaStatus] = useState<WhatsAppStatus | null>(null);

    // Check WhatsApp status
    useEffect(() => {
        const checkStatus = async () => {
            try {
                const available = await whatsappService.isWorkerAvailable();
                if (available) {
                    const status = await whatsappService.getStatus();
                    setWaStatus(status);
                }
            } catch (e) {
                console.error('Error checking WhatsApp status:', e);
            }
        };

        checkStatus();
        const interval = setInterval(checkStatus, 10000);
        return () => clearInterval(interval);
    }, []);

    // Filter documents
    const filteredDocs = docs.filter(doc => {
        const matchesCategory = selectedCategory === 'all' || doc.category === selectedCategory;
        const matchesSearch = doc.title.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    const handleSelectDoc = (doc: DocumentTemplate) => {
        setSelectedDoc(doc);
        setEditingContent(doc.content);
        setIsEditing(false);
    };

    const handleStartEdit = () => {
        setIsEditing(true);
    };

    const handleSave = () => {
        setIsEditing(false);
        // In a real app, save to backend
    };

    const handleOpenSendModal = () => {
        setSendResult(null);
        setSendPhone('');
        setSendName('');
        setShowSendModal(true);
    };

    const handleSend = async () => {
        if (!sendPhone || !selectedDoc) return;

        setIsSending(true);
        setSendResult(null);

        try {
            // Replace variables in content
            let content = isEditing ? editingContent : selectedDoc.content;
            content = content.replace(/\[NOMBRE\]/g, sendName || 'Paciente');

            // Send via messaging service
            const result = await messagingService.sendMessage(sendPhone, content);
            setSendResult(result);

            if (result.success) {
                // Close modal after success
                setTimeout(() => {
                    setShowSendModal(false);
                    setSendResult(null);
                }, 2000);
            }
        } catch (error: any) {
            setSendResult({
                success: false,
                error: error.message,
                channel: 'whatsapp',
                timestamp: new Date()
            });
        } finally {
            setIsSending(false);
        }
    };

    const isWhatsAppConnected = waStatus?.status === 'connected';

    return (
        <div className="h-full flex flex-col animate-in fade-in duration-500">
            {/* Header */}
            <div className="flex items-center justify-between mb-6 flex-shrink-0">
                <div>
                    <h1 className="text-2xl font-bold text-brand-dark">Documentos</h1>
                    <p className="text-sm text-gray-500">Gestión de plantillas, consentimientos y documentos</p>
                </div>
                <div className="flex items-center gap-3">
                    {/* WhatsApp Status Badge */}
                    <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold ${isWhatsAppConnected
                            ? 'bg-brand-lime/20 text-brand-dark'
                            : 'bg-gray-100 text-gray-500'
                        }`}>
                        <div className={`w-2 h-2 rounded-full ${isWhatsAppConnected ? 'bg-brand-lime' : 'bg-gray-400'}`}></div>
                        WhatsApp {isWhatsAppConnected ? 'Conectado' : 'Desconectado'}
                    </div>
                    <button className="flex items-center gap-2 bg-brand-dark text-white px-4 py-2.5 rounded-xl font-bold text-sm hover:bg-brand-blue transition-colors shadow-md">
                        <Plus size={16} /> Nueva Plantilla
                    </button>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 flex gap-6 min-h-0 overflow-hidden">
                {/* Sidebar - Categories and Document List */}
                <div className="w-80 flex flex-col bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden flex-shrink-0">
                    {/* Search */}
                    <div className="p-4 border-b border-gray-100">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                            <input
                                type="text"
                                placeholder="Buscar documento..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-brand-cyan"
                            />
                        </div>
                    </div>

                    {/* Categories */}
                    <div className="p-3 border-b border-gray-100">
                        <p className="text-[10px] font-bold text-gray-400 uppercase mb-2 px-2">Categorías</p>
                        <div className="space-y-1">
                            {CATEGORIES.map(cat => (
                                <button
                                    key={cat.id}
                                    onClick={() => setSelectedCategory(cat.id)}
                                    className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${selectedCategory === cat.id
                                        ? 'bg-brand-blue/10 text-brand-blue'
                                        : 'text-gray-600 hover:bg-gray-50'
                                        }`}
                                >
                                    <cat.icon size={16} />
                                    {cat.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Document List */}
                    <div className="flex-1 overflow-y-auto p-3">
                        <p className="text-[10px] font-bold text-gray-400 uppercase mb-2 px-2">
                            Documentos ({filteredDocs.length})
                        </p>
                        <div className="space-y-2">
                            {filteredDocs.map(doc => (
                                <button
                                    key={doc.id}
                                    onClick={() => handleSelectDoc(doc)}
                                    className={`w-full text-left p-3 rounded-xl border transition-all ${selectedDoc?.id === doc.id
                                        ? 'border-brand-cyan bg-brand-cyan/5 shadow-sm'
                                        : 'border-transparent hover:bg-gray-50'
                                        }`}
                                >
                                    <div className="flex items-start gap-3">
                                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${doc.format === 'whatsapp' ? 'bg-brand-lime/20 text-brand-dark' : 'bg-red-100 text-red-500'
                                            }`}>
                                            {doc.format === 'whatsapp' ? <Smartphone size={18} /> : <FileText size={18} />}
                                        </div>
                                        <div className="min-w-0 flex-1">
                                            <p className="font-bold text-sm text-brand-dark truncate">{doc.title}</p>
                                            <p className="text-[10px] text-gray-400 mt-0.5">{doc.lastModified} • {doc.modifiedBy}</p>
                                        </div>
                                        <ChevronRight size={14} className="text-gray-300 mt-1" />
                                    </div>
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Editor Panel */}
                <div className="flex-1 flex flex-col bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
                    {selectedDoc ? (
                        <>
                            {/* Editor Header */}
                            <div className="p-4 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
                                <div className="flex items-center gap-3">
                                    <button
                                        onClick={() => setSelectedDoc(null)}
                                        className="p-2 hover:bg-gray-200 rounded-lg transition-colors"
                                    >
                                        <ArrowLeft size={18} className="text-gray-500" />
                                    </button>
                                    <div>
                                        <h3 className="font-bold text-brand-dark">{selectedDoc.title}</h3>
                                        <p className="text-xs text-gray-400">{selectedDoc.description}</p>
                                    </div>
                                </div>
                                <div className="flex gap-2">
                                    {isEditing ? (
                                        <>
                                            <button
                                                onClick={() => setIsEditing(false)}
                                                className="p-2 text-gray-500 hover:bg-gray-200 rounded-lg transition-colors"
                                            >
                                                <X size={18} />
                                            </button>
                                            <button
                                                onClick={handleSave}
                                                className="flex items-center gap-2 px-3 py-2 bg-brand-cyan text-white rounded-lg font-bold text-sm"
                                            >
                                                <Save size={16} /> Guardar
                                            </button>
                                        </>
                                    ) : (
                                        <>
                                            <button className="p-2 text-gray-500 hover:bg-gray-200 rounded-lg transition-colors" title="Duplicar">
                                                <Copy size={18} />
                                            </button>
                                            <button
                                                onClick={handleStartEdit}
                                                className="flex items-center gap-2 px-3 py-2 bg-brand-dark text-white rounded-lg font-bold text-sm"
                                            >
                                                <Edit2 size={16} /> Editar
                                            </button>
                                            {selectedDoc.format === 'whatsapp' && (
                                                <button
                                                    onClick={handleOpenSendModal}
                                                    disabled={!isWhatsAppConnected}
                                                    className={`flex items-center gap-2 px-3 py-2 rounded-lg font-bold text-sm ${isWhatsAppConnected
                                                            ? 'bg-brand-lime text-brand-dark hover:bg-brand-cyan transition-colors'
                                                            : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                                                        }`}
                                                    title={isWhatsAppConnected ? 'Enviar por WhatsApp' : 'WhatsApp no conectado'}
                                                >
                                                    <Send size={16} /> Enviar
                                                </button>
                                            )}
                                        </>
                                    )}
                                </div>
                            </div>

                            {/* Editor Content */}
                            <div className="flex-1 flex overflow-hidden">
                                {/* Text Editor */}
                                <div className="flex-1 p-6 overflow-y-auto">
                                    {isEditing ? (
                                        <textarea
                                            value={editingContent}
                                            onChange={(e) => setEditingContent(e.target.value)}
                                            className="w-full h-full min-h-[400px] p-4 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-brand-cyan resize-none font-mono"
                                        />
                                    ) : (
                                        <div className="p-6 bg-gray-50 rounded-xl border border-gray-200">
                                            <pre className="whitespace-pre-wrap text-sm text-gray-700 font-sans">
                                                {selectedDoc.content}
                                            </pre>
                                        </div>
                                    )}
                                </div>

                                {/* Preview Panel (WhatsApp style for whatsapp format) */}
                                {selectedDoc.format === 'whatsapp' && (
                                    <div className="w-80 border-l border-gray-100 p-4 bg-gray-50/50 flex-shrink-0">
                                        <p className="text-[10px] font-bold text-gray-400 uppercase mb-3">Vista Previa WhatsApp</p>
                                        <div className="bg-[#e5ddd5] rounded-2xl overflow-hidden shadow-lg" style={{ backgroundImage: 'url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyBAMAAADsEZWCAAAAGFBMVEXm6Orm6Orm6Orm6Orm6Orm6Orm6Orm6OoxPB0wAAAACHRSTlMAGLvv/////ygQ2oEAAABNSURBVDjLY2AYBWiAAIsT4QICY+ACBBLhAgQS4QIEEuECBBLhAgQS4QIEEuECBBLhAgQS4QIEEuECBBLhAgQS4QIEEuECYnQOOgAAOdEMQdfSmWEAAAAASUVORK5CYII=")' }}>
                                            {/* Phone Header */}
                                            <div className="bg-[#075e54] text-white p-3 flex items-center gap-3">
                                                <div className="w-8 h-8 rounded-full bg-gray-400" />
                                                <div>
                                                    <p className="font-bold text-sm">Rubio García Dental</p>
                                                    <p className="text-[10px] opacity-80">En línea</p>
                                                </div>
                                            </div>
                                            {/* Message */}
                                            <div className="p-4">
                                                <div className="bg-white p-3 rounded-lg shadow-sm max-w-[90%] text-sm">
                                                    <p className="whitespace-pre-wrap text-gray-800" style={{ fontSize: '13px' }}>
                                                        {isEditing ? editingContent : selectedDoc.content}
                                                    </p>
                                                    <p className="text-[10px] text-gray-400 text-right mt-1">10:30 ✓✓</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </>
                    ) : (
                        /* Empty State */
                        <div className="flex-1 flex items-center justify-center">
                            <div className="text-center">
                                <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <FileText size={32} className="text-gray-400" />
                                </div>
                                <h3 className="font-bold text-gray-500 mb-1">Selecciona un documento</h3>
                                <p className="text-sm text-gray-400">Elige una plantilla de la lista para editarla o previsualizarla</p>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Send Modal */}
            {showSendModal && (
                <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center animate-fade-in">
                    <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-2xl">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-lg font-bold text-brand-dark">Enviar por WhatsApp</h3>
                            <button
                                onClick={() => setShowSendModal(false)}
                                className="p-1 hover:bg-gray-100 rounded"
                            >
                                <X size={20} className="text-gray-400" />
                            </button>
                        </div>

                        {sendResult ? (
                            <div className={`p-4 rounded-xl mb-4 flex items-center gap-3 ${sendResult.success ? 'bg-brand-lime/10 border border-brand-lime/30' : 'bg-red-50 border border-red-200'
                                }`}>
                                {sendResult.success ? (
                                    <>
                                        <CheckCircle size={24} className="text-green-500" />
                                        <div>
                                            <p className="font-bold text-brand-dark">¡Mensaje enviado!</p>
                                            <p className="text-sm text-brand-dark">El documento se ha enviado correctamente</p>
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        <AlertCircle size={24} className="text-red-500" />
                                        <div>
                                            <p className="font-bold text-red-700">Error al enviar</p>
                                            <p className="text-sm text-red-600">{sendResult.error}</p>
                                        </div>
                                    </>
                                )}
                            </div>
                        ) : (
                            <>
                                <div className="space-y-4 mb-6">
                                    <div>
                                        <label className="text-xs font-bold text-gray-500 uppercase block mb-1">
                                            Nombre del Paciente
                                        </label>
                                        <div className="relative">
                                            <User size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                                            <input
                                                type="text"
                                                value={sendName}
                                                onChange={(e) => setSendName(e.target.value)}
                                                placeholder="Juan García"
                                                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-brand-cyan"
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="text-xs font-bold text-gray-500 uppercase block mb-1">
                                            Teléfono WhatsApp *
                                        </label>
                                        <div className="relative">
                                            <Smartphone size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                                            <input
                                                type="tel"
                                                value={sendPhone}
                                                onChange={(e) => setSendPhone(e.target.value)}
                                                placeholder="+34 612 345 678"
                                                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-brand-cyan"
                                            />
                                        </div>
                                        <p className="text-xs text-gray-400 mt-1">Incluye el código de país</p>
                                    </div>
                                </div>

                                <div className="flex gap-3">
                                    <button
                                        onClick={() => setShowSendModal(false)}
                                        className="flex-1 px-4 py-3 border border-gray-200 rounded-xl font-bold text-sm text-gray-600 hover:bg-gray-50 transition-colors"
                                    >
                                        Cancelar
                                    </button>
                                    <button
                                        onClick={handleSend}
                                        disabled={!sendPhone || isSending}
                                        className="flex-1 px-4 py-3 bg-brand-lime text-brand-dark rounded-xl font-bold text-sm hover:bg-brand-cyan transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                                    >
                                        {isSending ? (
                                            <>
                                                <Loader2 size={16} className="animate-spin" />
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
                            </>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Documents;
