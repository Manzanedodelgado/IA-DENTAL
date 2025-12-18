import React, { useState, useEffect } from 'react';
import { FileText, Plus } from 'lucide-react';
import { messagingService, SendResult } from '../../../services/messagingService';
import { whatsappService, WhatsAppStatus } from '../../../services/whatsappService';
import { DocumentsList, DocumentViewer, SendDocumentModal } from '../Documents';

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
        content: `Bienvenido/a a Rubio García Dental.\n\nPor favor, completa los siguientes datos:\n\n1. Nombre completo:\n2. DNI:\n3. Fecha de nacimiento:\n4. Dirección:\n5. Teléfono:\n6. Email:\n\nAutorizo el tratamiento de mis datos según LOPD.`,
        lastModified: '10/12/2024',
        modifiedBy: 'Recepción',
        status: 'active'
    },
    {
        id: '2',
        title: 'Consentimiento Implantes Dentales',
        category: 'consent',
        subCategory: 'Cirugía',
        format: 'document',
        content: `CONSENTIMIENTO INFORMADO - IMPLANTES DENTALES\n\nYo, [NOMBRE_PACIENTE], autorizo la colocación de implantes dentales.\n\n1. He sido informado/a por el Dr./Dra. [NOMBRE_DOCTOR].\n2. Comprendo los riesgos: infección, sangrado, lesión nerviosa.\n\nFecha: [FECHA]\nFirma: _______________`,
        lastModified: '15/01/2024',
        modifiedBy: 'Dr. García',
        status: 'active'
    }
];

const Documents: React.FC = () => {
    const [documents] = useState<DocumentTemplate[]>(INITIAL_DOCS);
    const [selectedDoc, setSelectedDoc] = useState<DocumentTemplate | null>(INITIAL_DOCS[0]);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterCategory, setFilterCategory] = useState('all');
    const [isEditing, setIsEditing] = useState(false);
    const [editedContent, setEditedContent] = useState('');

    // Send modal state
    const [showSendModal, setShowSendModal] = useState(false);
    const [recipientPhone, setRecipientPhone] = useState('');
    const [recipientName, setRecipientName] = useState('');
    const [sendStatus, setSendStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
    const [sendError, setSendError] = useState<string | null>(null);
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
    }, []);

    const handleSelectDoc = (doc: DocumentTemplate) => {
        setSelectedDoc(doc);
        setIsEditing(false);
        setSendStatus('idle');
    };

    const handleStartEdit = () => {
        if (selectedDoc) {
            setEditedContent(selectedDoc.content);
            setIsEditing(true);
        }
    };

    const handleSave = () => {
        if (selectedDoc && editedContent) {
            selectedDoc.content = editedContent;
            setIsEditing(false);
        }
    };

    const handleCancelEdit = () => {
        setIsEditing(false);
        setEditedContent('');
    };

    const handleOpenSendModal = () => {
        if (waStatus?.status !== 'connected') {
            setSendError('WhatsApp no está conectado');
            setSendStatus('error');
            return;
        }
        setShowSendModal(true);
        setSendStatus('idle');
        setSendError(null);
    };

    const handleSend = async () => {
        if (!selectedDoc || !recipientPhone || !recipientName) return;

        setSendStatus('sending');
        setSendError(null);

        try {
            const result: SendResult = await messagingService.sendMessage({
                to: recipientPhone,
                message: selectedDoc.content
            });

            if (result.success) {
                setSendStatus('success');
                setTimeout(() => {
                    setShowSendModal(false);
                    setRecipientPhone('');
                    setRecipientName('');
                    setSendStatus('idle');
                }, 2000);
            } else {
                setSendStatus('error');
                setSendError(result.error || 'Error al enviar');
            }
        } catch (error: any) {
            setSendStatus('error');
            setSendError(error.message || 'Error de conexión');
        }
    };

    return (
        <div className="h-full flex flex-col animate-in fade-in duration-500">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h1 className="text-2xl font-bold text-brand-dark flex items-center gap-3">
                        <FileText className="text-brand-cyan" /> Documentos y Plantillas
                    </h1>
                    <p className="text-sm text-gray-500">Gestiona documentos, consentimientos y cuestionarios</p>
                </div>
                <button className="px-4 py-2 bg-brand-dark text-white rounded-xl text-sm font-bold flex items-center gap-2 hover:bg-brand-blue">
                    <Plus size={16} /> Nueva Plantilla
                </button>
            </div>

            {/* Main Content */}
            <div className="flex-1 bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden flex">
                <DocumentsList
                    documents={documents}
                    selectedDoc={selectedDoc}
                    searchTerm={searchTerm}
                    filterCategory={filterCategory}
                    onSearchChange={setSearchTerm}
                    onFilterChange={setFilterCategory}
                    onSelectDoc={handleSelectDoc}
                />

                {selected Doc ? (
                <DocumentViewer
                    title={selectedDoc.title}
                    content={selectedDoc.content}
                    isEditing={isEditing}
                    editedContent={editedContent}
                    onEditStart={handleStartEdit}
                    onEditChange={setEditedContent}
                    onSave={handleSave}
                    onCancelEdit={handleCancelEdit}
                    onOpenSendModal={handleOpenSendModal}
                />
                ) : (
                <div className="flex-1 flex items-center justify-center text-gray-400">
                    <p>Selecciona un documento de la lista</p>
                </div>
                )}
            </div>

            <SendDocumentModal
                isOpen={showSendModal}
                onClose={() => {
                    setShowSendModal(false);
                    setSendStatus('idle');
                    setSendError(null);
                }}
                onSend={handleSend}
                documentTitle={selectedDoc?.title || ''}
                recipientPhone={recipientPhone}
                recipientName={recipientName}
                onRecipientPhoneChange={setRecipientPhone}
                onRecipientNameChange={setRecipientName}
                sendStatus={sendStatus}
                sendError={sendError}
            />
        </div>
    );
};

export default Documents;
