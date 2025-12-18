import { Appointment, ChatContact, SystemConfigItem, ReflectionLog } from './types';

// Interface for invoices (used in Management)
export interface Invoice {
    id: string;
    number: string;
    patientId: string;
    patientName: string;
    patientDNI: string;
    patientAddress: string;
    date: string;
    dueDate?: string;
    items: { id: string; description: string; quantity: number; unitPrice: number; discount: number; taxRate: number; total: number; }[];
    subtotal: number;
    taxAmount: number;
    total: number;
    status: 'paid' | 'pending' | 'rectified';
    paymentMethod: 'cash' | 'card' | 'transfer' | 'financing';
    notes?: string;
}

export const MOCK_INVOICES: Invoice[] = [
    {
        id: '1',
        number: 'F-2025-001',
        patientId: '1',
        patientName: 'María González Pérez',
        patientDNI: '12345678A',
        patientAddress: 'C/ Mayor 1, Madrid',
        date: '2025-01-20',
        status: 'paid',
        paymentMethod: 'card',
        subtotal: 80,
        taxAmount: 0,
        total: 80.00,
        items: [
            { id: '1', description: 'Limpieza Bucal Completa', quantity: 1, unitPrice: 80, discount: 0, taxRate: 0, total: 80 }
        ],
        notes: 'Exenta de IVA según Art. 20 Ley 37/1992'
    },
    {
        id: '2',
        number: 'F-2025-002',
        patientId: '2',
        patientName: 'Carlos Martínez López',
        patientDNI: '87654321B',
        patientAddress: 'Av. América 20, Madrid',
        date: '2025-01-21',
        status: 'pending',
        paymentMethod: 'financing',
        subtotal: 1200,
        taxAmount: 0,
        total: 1200.00,
        items: [
            { id: '1', description: 'Implante Titanio Alta Gama', quantity: 1, unitPrice: 800, discount: 0, taxRate: 0, total: 800 },
            { id: '2', description: 'Corona Zirconio sobre Implante', quantity: 1, unitPrice: 400, discount: 0, taxRate: 0, total: 400 }
        ],
        notes: 'Exenta de IVA según Art. 20 Ley 37/1992'
    },
    {
        id: '3',
        number: 'F-2025-003',
        patientId: '3',
        patientName: 'Ana Rodríguez Sánchez',
        patientDNI: '11223344C',
        patientAddress: 'Plaza España 5, Madrid',
        date: '2025-01-18',
        status: 'paid',
        paymentMethod: 'cash',
        subtotal: 65,
        taxAmount: 0,
        total: 65.00,
        items: [
            { id: '1', description: 'Revisión Ortodoncia Mensual', quantity: 1, unitPrice: 65, discount: 0, taxRate: 0, total: 65 }
        ],
        notes: 'Exenta de IVA según Art. 20 Ley 37/1992'
    },
];
export const MOCK_APPOINTMENTS: Appointment[] = [
    { id: 1, date: new Date().toISOString().split('T')[0], time: '09:00', duration: '45 min', durationMinutes: 45, patientName: 'María González Pérez', doctor: 'Dr. García', treatment: 'Limpieza dental', phone: '+34 612 345 678', urgent: false, status: 'confirmed' },
    { id: 2, date: new Date().toISOString().split('T')[0], time: '10:30', duration: '90 min', durationMinutes: 90, patientName: 'Carlos Martínez López', doctor: 'Dra. Rubio', treatment: 'Implante dental', phone: '+34 623 456 789', urgent: true, status: 'pending' },
    { id: 3, date: new Date().toISOString().split('T')[0], time: '12:00', duration: '30 min', durationMinutes: 30, patientName: 'Ana Rodríguez Sánchez', doctor: 'Dr. García', treatment: 'Ortodoncia - Revisión', phone: '+34 634 567 890', urgent: false, status: 'confirmed' },
];

export const INITIAL_CONTACTS: ChatContact[] = [
    { id: '1', name: 'María González', time: '10:45', msg: 'Gracias por la confirmación', unread: 0, avatar: 'https://ui-avatars.com/api/?name=María+González&background=random', phone: '+34 600 111 222', status: 'patient', recordNumber: 'P-00123' },
    { id: '2', name: 'Carlos Martínez', time: '09:30', msg: 'Tengo dolor en la muela', unread: 2, urgent: true, avatar: 'https://ui-avatars.com/api/?name=Carlos+Martínez&background=random', phone: '+34 600 333 444', status: 'patient', recordNumber: 'P-00124' },
    { id: '3', name: '600 999 888', time: 'Ayer', msg: 'Hola, quería información sobre precios', unread: 1, avatar: 'https://ui-avatars.com/api/?name=Unknown&background=random', phone: '+34 600 999 888', status: 'lead' },
];

export const MOCK_CONFIG: SystemConfigItem[] = [
    { key: "DB_CONNECTION_STRING", value: "Server=GABINETE2\\INFOMED;Database=GELITE;", description: "Connection string to GELITE SQL Server", isEditable: false, category: "CORE" },
    { key: "LLM_MODEL", value: "gemini-2.5-flash", description: "Modelo de IA para IA Dental", isEditable: true, category: "CORE" },
    { key: "RULE_BALANCE_CHECK", value: "TRUE", description: "Si la columna contiene 'saldo', aplicar formato contable", isEditable: true, category: "BUSINESS_RULE" },
    { key: "REQUIRE_PHONE_ON_INSERT", value: "TRUE", description: "Rechazar inserción de paciente sin teléfono válido", isEditable: true, category: "BUSINESS_RULE" },
    { key: "MAX_RETRY_ATTEMPTS", value: "3", description: "Máximo de reintentos SQL antes de activar reflexión", isEditable: true, category: "SECURITY" },
];

export const MOCK_REFLECTIONS: ReflectionLog[] = [
    {
        id: "REF-001",
        timestamp: new Date(Date.now() - 86400000),
        errorType: "INTEGRITY_VIOLATION",
        description: "Intento de INSERT en 'DCitas' sin 'IdCol'. El esquema requiere NON-NULL.",
        proposedFix: "Actualizar regla: Siempre consultar 'TColabos' para resolver ID antes de inserción.",
        status: "PENDING"
    },
    {
        id: "REF-002",
        timestamp: new Date(Date.now() - 172800000),
        errorType: "AMBIGUOUS_COLUMN",
        description: "Consulta de 'dirección' falló. Tabla 'Pacientes' tiene 'Direccion' y otros campos.",
        proposedFix: "Mapear 'dirección' solo a DIRECCION principal.",
        status: "APPROVED"
    }
];

export const SIMULATED_ANOMALIES = [
    {
        errorType: "SEMANTIC_MISMATCH",
        description: "Usuarios solicitan 'tarifa' pero la tabla usa 'Tratamientos.PrecioReferencia'. Tasa de fallo 15%.",
        proposedFix: "DEFINE_ALIAS: 'tarifa' -> 'PrecioReferencia'",
        configKey: "ALIAS_TARIFA_PRECIO",
        configValue: "TRUE"
    },
    {
        errorType: "SECURITY_THRESHOLD",
        description: "Múltiples consultas de 'borrar paciente' bloqueadas. Riesgo de pérdida de datos.",
        proposedFix: "HARD_BLOCK: Prohibir DELETE en tabla Pacientes vía Chat.",
        configKey: "BLOCK_DELETE_PACIENTES",
        configValue: "TRUE"
    },
];

export const APP_NAME = "Rubio García Dental";
export const CLINIC_NAME = "Sistema de Gestión con IA Dental";
