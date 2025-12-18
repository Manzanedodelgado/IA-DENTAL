// ============================================
// TIPOS PRINCIPALES - RUBIO GARCÍA DENTAL + IA DENTAL
// ============================================

export enum UserRole {
    ADMIN = 'admin',
    USER = 'user'
}

export interface User {
    id: string;
    username: string;
    email: string;
    name: string;
    role: UserRole;
    avatar?: string;
}

export interface Appointment {
    id: number | string;
    date: string;
    time: string;
    duration: string;
    durationMinutes: number;
    patientId?: string;
    patientName: string;
    doctor: string;
    treatment: string;
    phone: string;
    urgent: boolean;
    status: 'confirmed' | 'pending' | 'cancelled' | 'completed';
    notes?: string;
    sitCit?: string;
}

export interface Patient {
    id: string;
    name: string;
    firstName?: string;
    lastName?: string;
    dni: string;
    recordNumber: string;
    phone: string;
    email: string;
    address?: string;
    birthDate?: string;
    lastVisit: string;
    nextVisit?: string;
    status: 'active' | 'inactive';
    medicalHistory?: string[];
    alerts?: string[];
}

export interface Treatment {
    id: string;
    date: string;
    tooth?: number;
    treatment: string;
    description: string;
    doctor: string;
    cost?: number;
    status?: string;
}

export interface Budget {
    id: string;
    date: string;
    title: string;
    treatments: string[];
    total: number;
    status: 'accepted' | 'pending' | 'rejected';
    expiryDate?: string;
}

export interface ChatContact {
    id: string;
    name: string;
    time: string;
    msg: string;
    unread: number;
    avatar: string;
    phone: string;
    urgent?: boolean;
    status: 'patient' | 'lead';
    recordNumber?: string;
}

export interface ChatMessage {
    id: string;
    sender: 'user' | 'bot' | 'patient' | 'assistant' | 'system';
    text: string;
    timestamp: Date;
    isUrgent?: boolean;
    metadata?: {
        sqlQuery?: string;
        executionTimeMs?: number;
        relatedTable?: string;
    };
}

export interface IADentalConfig {
    voiceName: string;
    tone: 'formal' | 'empathetic' | 'casual';
    systemInstruction: string;
    autoReply: {
        enabled: boolean;
        scheduleEnabled: boolean;
        startTime: string;
        endTime: string;
        days: string[];
    };
    knowledgeBase: {
        prices: boolean;
        orthodontics: boolean;
        periodontics: boolean;
        database: boolean;
    };
}

export interface SystemConfigItem {
    key: string;
    value: string;
    description: string;
    isEditable: boolean;
    category: 'CORE' | 'BUSINESS_RULE' | 'SECURITY';
}

export interface ReflectionLog {
    id: string;
    timestamp: Date;
    errorType: string;
    description: string;
    proposedFix: string;
    status: 'PENDING' | 'APPROVED' | 'REJECTED';
}

export type ViewState =
    | 'dashboard'
    | 'agenda'
    | 'patients'
    | 'communication'
    | 'management'
    | 'ia-dental'
    | 'config'
    | 'documents';

export type IADentalMode = 'patient' | 'admin';

// ============================================
// TIPOS ADICIONALES - NUEVAS FUNCIONALIDADES
// ============================================

// Odontograma (Dental Chart)
export type ToothStateType = 'healthy' | 'caries' | 'endo' | 'implant' | 'crown' | 'extracted' | 'filling';

export interface ToothState {
    toothNumber: number;
    state: ToothStateType;
    notes?: string;
}

export interface Odontograma {
    patientId: string;
    teeth: ToothState[];
    lastModified: string;
    modifiedBy: string;
}

// Patient Invoice (Facturación)
export interface InvoiceItem {
    id: string;
    description: string;
    quantity: number;
    unitPrice: number;
    total: number;
}

export interface PatientInvoice {
    id: string;
    invoiceNumber: string;
    patientId: string;
    patientName: string;
    date: string;
    items: InvoiceItem[];
    subtotal: number;
    tax: number;
    taxRate: number;
    total: number;
    status: 'paid' | 'pending' | 'cancelled';
    qrCode?: string;
    notes?: string;
}

// Patient Documents
export interface PatientDocument {
    id: string;
    patientId: string;
    title: string;
    type: 'consent' | 'report' | 'prescription' | 'xray' | 'other';
    signatureStatus: 'signed' | 'pending' | 'not_required';
    signedAt?: string;
    fileUrl?: string;
    createdAt: string;
    createdBy: string;
}

// Expenses (Gastos)
export interface Expense {
    id: string;
    date: string;
    supplier: string;
    concept: string;
    amount: number;
    category: 'material' | 'services' | 'rent' | 'salaries' | 'other';
    invoiceNumber?: string;
    invoiceFile?: string;
    status: 'paid' | 'pending';
}

// Workflow Automation
export interface WorkflowNode {
    id: string;
    type: 'trigger' | 'action' | 'condition';
    name: string;
    icon: string;
    position: { x: number; y: number };
    config: Record<string, any>;
}

export interface WorkflowConnection {
    id: string;
    from: string;
    to: string;
    label?: string;
}

export interface Workflow {
    id: string;
    name: string;
    description: string;
    nodes: WorkflowNode[];
    connections: WorkflowConnection[];
    active: boolean;
    createdAt: string;
    lastRun?: string;
}

// Voice Configuration (Voz IA)
export interface VoiceConfig {
    voiceName: string;
    accent: 'es-ES' | 'es-MX' | 'es-AR';
    speed: number; // 0.5 - 2.0
    pitch: number; // 0.5 - 2.0
    pauseDuration: number; // milliseconds
}
