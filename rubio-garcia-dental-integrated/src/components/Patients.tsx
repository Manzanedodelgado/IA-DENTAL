import React, { useState, useEffect } from 'react';
import { Users, Search, Plus, User, Phone, Mail, Calendar, FileText, Activity, ChevronDown, Clock, MapPin, DollarSign, Edit2, RefreshCw, FileSignature, Download, Printer, QrCode, Check, X, AlertCircle, UserPlus } from 'lucide-react';
import { ViewState, Patient, Treatment, Budget, ToothState, ToothStateType, PatientInvoice, InvoiceItem, PatientDocument } from '../types';
import { databaseService } from '../services/databaseService';

interface PatientsProps {
    onNavigate: (view: ViewState) => void;
    onScheduleAppointment: (patient: Patient) => void;
}

// Tooth state colors and labels
const TOOTH_STATES: Record<ToothStateType, { color: string; label: string; bgColor: string }> = {
    healthy: { color: '#22c55e', label: 'Sano', bgColor: 'bg-brand-lime/20' },
    caries: { color: '#ef4444', label: 'Caries', bgColor: 'bg-red-100' },
    endo: { color: '#8b5cf6', label: 'Endodoncia', bgColor: 'bg-purple-100' },
    implant: { color: '#3b82f6', label: 'Implante', bgColor: 'bg-blue-100' },
    crown: { color: '#f59e0b', label: 'Corona', bgColor: 'bg-amber-100' },
    extracted: { color: '#6b7280', label: 'Extraído', bgColor: 'bg-gray-100' },
    filling: { color: '#06b6d4', label: 'Obturación', bgColor: 'bg-cyan-100' },
};

// Adult teeth numbers (FDI notation)
const UPPER_TEETH = [18, 17, 16, 15, 14, 13, 12, 11, 21, 22, 23, 24, 25, 26, 27, 28];
const LOWER_TEETH = [48, 47, 46, 45, 44, 43, 42, 41, 31, 32, 33, 34, 35, 36, 37, 38];

// Mock data for invoices
const MOCK_PATIENT_INVOICES: PatientInvoice[] = [
    {
        id: '1',
        invoiceNumber: 'FAC-2024-0042',
        patientId: '1',
        patientName: 'María García López',
        date: '2024-12-10',
        items: [
            { id: '1', description: 'Limpieza dental', quantity: 1, unitPrice: 80, total: 80 },
            { id: '2', description: 'Obturación composite', quantity: 2, unitPrice: 60, total: 120 },
        ],
        subtotal: 200,
        tax: 42,
        taxRate: 21,
        total: 242,
        status: 'paid',
    },
];

// Mock patient documents
const MOCK_PATIENT_DOCS: PatientDocument[] = [
    { id: '1', patientId: '1', title: 'Consentimiento Implantes', type: 'consent', signatureStatus: 'signed', signedAt: '2024-11-15', createdAt: '2024-11-10', createdBy: 'Dr. García' },
    { id: '2', patientId: '1', title: 'Radiografía Panorámica', type: 'xray', signatureStatus: 'not_required', createdAt: '2024-12-01', createdBy: 'Dra. Rubio' },
    { id: '3', patientId: '1', title: 'Consentimiento Ortodoncia', type: 'consent', signatureStatus: 'pending', createdAt: '2024-12-10', createdBy: 'Dra. Rubio' },
];

type PatientTab = 'general' | 'clinical' | 'odontograma' | 'budgets' | 'invoices' | 'documents';

const Patients: React.FC<PatientsProps> = ({ onNavigate, onScheduleAppointment }) => {
    const [patients, setPatients] = useState<Patient[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
    const [showSearchDropdown, setShowSearchDropdown] = useState(false);
    const [activeTab, setActiveTab] = useState<PatientTab>('general');
    const [patientTreatments, setPatientTreatments] = useState<Treatment[]>([]);
    const [patientBudgets, setPatientBudgets] = useState<Budget[]>([]);

    // Odontograma state
    const [teethStates, setTeethStates] = useState<Record<number, ToothStateType>>({});
    const [selectedTooth, setSelectedTooth] = useState<number | null>(null);

    // Invoice modal state
    const [showInvoiceModal, setShowInvoiceModal] = useState(false);
    const [invoiceItems, setInvoiceItems] = useState<InvoiceItem[]>([]);

    // New patient modal state
    const [showNewPatientModal, setShowNewPatientModal] = useState(false);
    const [newPatientForm, setNewPatientForm] = useState({
        name: '',
        firstName: '',
        lastName: '',
        dni: '',
        phone: '',
        email: '',
        address: '',
        birthDate: ''
    });

    useEffect(() => {
        const fetchPatients = async () => {
            setLoading(true);
            try {
                const data = await databaseService.getPatients();
                setPatients(data);
                if (data.length > 0) setSelectedPatient(data[0]);
            } catch (error) {
                console.error('Error:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchPatients();
    }, []);

    useEffect(() => {
        if (selectedPatient) {
            Promise.all([
                databaseService.getPatientTreatments(selectedPatient.id),
                databaseService.getPatientBudgets(selectedPatient.id)
            ]).then(([treatments, budgets]) => {
                setPatientTreatments(treatments);
                setPatientBudgets(budgets);
            }).catch(console.error);

            // Reset odontograma for new patient
            setTeethStates({});
        }
    }, [selectedPatient]);

    // Enhanced search (name, dni, phone, email, record number)
    const filteredPatients = patients.filter(p => {
        const search = searchTerm.toLowerCase();
        return (
            p.name.toLowerCase().includes(search) ||
            p.recordNumber?.toLowerCase().includes(search) ||
            p.dni?.toLowerCase().includes(search) ||
            p.phone?.toLowerCase().includes(search) ||
            p.email?.toLowerCase().includes(search)
        );
    });

    const calculateAge = (birthDate?: string) => {
        if (!birthDate) return '-';
        return Math.floor((Date.now() - new Date(birthDate).getTime()) / 31557600000);
    };

    // Cycle through tooth states
    const handleToothClick = (toothNum: number) => {
        const states: ToothStateType[] = ['healthy', 'caries', 'filling', 'endo', 'crown', 'implant', 'extracted'];
        const currentState = teethStates[toothNum] || 'healthy';
        const currentIndex = states.indexOf(currentState);
        const nextIndex = (currentIndex + 1) % states.length;
        setTeethStates(prev => ({ ...prev, [toothNum]: states[nextIndex] }));
        setSelectedTooth(toothNum);
    };

    // SVG Tooth Component
    const Tooth: React.FC<{ number: number; isUpper: boolean }> = ({ number, isUpper }) => {
        const state = teethStates[number] || 'healthy';
        const stateInfo = TOOTH_STATES[state];
        const isSelected = selectedTooth === number;

        return (
            <button
                onClick={() => handleToothClick(number)}
                className={`relative flex flex-col items-center transition-all duration-200 ${isSelected ? 'scale-110' : 'hover:scale-105'}`}
            >
                <svg width="28" height="36" viewBox="0 0 28 36" className="drop-shadow-sm">
                    {/* Tooth shape */}
                    <path
                        d={isUpper
                            ? "M14 2 C6 2 4 10 4 16 C4 24 8 34 14 34 C20 34 24 24 24 16 C24 10 22 2 14 2"
                            : "M14 34 C6 34 4 26 4 20 C4 12 8 2 14 2 C20 2 24 12 24 20 C24 26 22 34 14 34"
                        }
                        fill={stateInfo.color}
                        stroke={isSelected ? '#1D1160' : '#e5e7eb'}
                        strokeWidth={isSelected ? 2 : 1}
                        className="transition-colors duration-200"
                    />
                    {/* Implant screw indicator */}
                    {state === 'implant' && (
                        <g>
                            <line x1="14" y1="8" x2="14" y2="28" stroke="white" strokeWidth="2" />
                            <line x1="10" y1="12" x2="18" y2="12" stroke="white" strokeWidth="1.5" />
                            <line x1="10" y1="18" x2="18" y2="18" stroke="white" strokeWidth="1.5" />
                            <line x1="10" y1="24" x2="18" y2="24" stroke="white" strokeWidth="1.5" />
                        </g>
                    )}
                    {/* Extracted X */}
                    {state === 'extracted' && (
                        <g>
                            <line x1="8" y1="10" x2="20" y2="26" stroke="white" strokeWidth="2" />
                            <line x1="20" y1="10" x2="8" y2="26" stroke="white" strokeWidth="2" />
                        </g>
                    )}
                </svg>
                <span className="text-[10px] font-bold text-gray-600 mt-1">{number}</span>
            </button>
        );
    };

    // Generate QR Code (placeholder - in production use a QR library)
    const generateQRCode = () => {
        // This would use a library like qrcode.react in production
        return `data:image/svg+xml,${encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><rect fill="#fff" width="100" height="100"/><text x="10" y="50" font-size="8">QR FACTURA</text></svg>')}`;
    };

    if (loading) return <div className="h-full flex items-center justify-center"><RefreshCw className="animate-spin text-brand-cyan" size={40} /></div>;

    const tabs: { id: PatientTab; label: string; icon: React.ReactNode }[] = [
        { id: 'general', label: 'General', icon: <User size={14} /> },
        { id: 'clinical', label: 'Historia Clínica', icon: <Activity size={14} /> },
        { id: 'odontograma', label: 'Odontograma', icon: <span className="text-xs">🦷</span> },
        { id: 'budgets', label: 'Presupuestos', icon: <DollarSign size={14} /> },
        { id: 'invoices', label: 'Facturación', icon: <FileText size={14} /> },
        { id: 'documents', label: 'Documentos', icon: <FileSignature size={14} /> },
    ];

    return (
        <div className="h-full flex flex-col bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden animate-fade-in">
            {/* Header */}
            <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-brand-blue to-brand-cyan text-white flex items-center justify-center font-bold text-2xl shadow-lg">
                        {selectedPatient?.name.charAt(0) || '?'}
                    </div>
                    <div className="relative">
                        <button onClick={() => setShowSearchDropdown(!showSearchDropdown)} className="flex items-center gap-2">
                            <h1 className="text-xl font-bold text-brand-dark">{selectedPatient?.name || 'Seleccionar paciente'}</h1>
                            <ChevronDown size={18} className="text-gray-400" />
                        </button>
                        {showSearchDropdown && (
                            <div className="absolute top-8 left-0 w-80 bg-white border rounded-xl shadow-xl z-50 p-2">
                                <div className="flex items-center gap-2 bg-gray-50 px-3 py-2 rounded-lg mb-2">
                                    <Search size={14} className="text-gray-400" />
                                    <input autoFocus placeholder="Buscar..." className="bg-transparent border-none outline-none text-sm flex-1" value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
                                </div>
                                <div className="max-h-48 overflow-y-auto">
                                    {filteredPatients.slice(0, 15).map(p => (
                                        <button key={p.id} onClick={() => { setSelectedPatient(p); setShowSearchDropdown(false); }} className="w-full text-left p-2 hover:bg-blue-50 rounded-lg flex items-center gap-2">
                                            <div className="w-7 h-7 rounded-full bg-brand-blue/10 text-brand-blue flex items-center justify-center text-xs font-bold">{p.name.charAt(0)}</div>
                                            <div><p className="text-sm font-bold">{p.name}</p><p className="text-xs text-gray-500">{p.recordNumber}</p></div>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}
                        {selectedPatient && <p className="text-sm text-gray-500">{selectedPatient.recordNumber} • {selectedPatient.phone}</p>}
                    </div>
                </div>
                <div className="flex gap-2">
                    <button onClick={() => setShowNewPatientModal(true)} className="px-4 py-2 bg-brand-cyan text-white rounded-xl text-sm font-bold flex items-center gap-2 hover:bg-brand-blue transition-colors">
                        <UserPlus size={16} /> Nuevo Paciente
                    </button>
                    <button onClick={() => { if (selectedPatient) onScheduleAppointment(selectedPatient); onNavigate('agenda'); }} className="px-4 py-2 bg-brand-dark text-white rounded-xl text-sm font-bold flex items-center gap-2 hover:bg-brand-blue transition-colors">
                        <Plus size={16} /> Nueva Cita
                    </button>
                </div>
            </div>

            {/* Tabs */}
            <div className="px-6 border-b border-gray-100 flex gap-1 bg-gray-50/50 overflow-x-auto">
                {tabs.map(tab => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`px-4 py-3 text-sm font-bold flex items-center gap-2 whitespace-nowrap transition-colors ${activeTab === tab.id
                            ? 'bg-white text-brand-blue border-t border-x border-gray-200 rounded-t-lg -mb-px'
                            : 'text-gray-500 hover:text-brand-blue'
                            }`}
                    >
                        {tab.icon}
                        {tab.label}
                    </button>
                ))}
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-6">
                {selectedPatient ? (
                    <>
                        {/* General Tab */}
                        {activeTab === 'general' && (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="bg-gray-50 p-5 rounded-xl border border-gray-200">
                                    <h3 className="font-bold text-brand-dark mb-4 flex items-center gap-2"><User size={16} className="text-brand-blue" /> Datos Personales</h3>
                                    <div className="space-y-3 text-sm">
                                        <div><span className="text-gray-400 text-xs uppercase">Nombre</span><p className="font-medium">{selectedPatient.name}</p></div>
                                        <div><span className="text-gray-400 text-xs uppercase">DNI</span><p className="font-medium">{selectedPatient.dni || '-'}</p></div>
                                        <div><span className="text-gray-400 text-xs uppercase">Edad</span><p className="font-medium">{calculateAge(selectedPatient.birthDate)} años</p></div>
                                        <div><span className="text-gray-400 text-xs uppercase">Dirección</span><p className="font-medium">{selectedPatient.address || '-'}</p></div>
                                    </div>
                                </div>
                                <div className="bg-gray-50 p-5 rounded-xl border border-gray-200">
                                    <h3 className="font-bold text-brand-dark mb-4 flex items-center gap-2"><Phone size={16} className="text-brand-blue" /> Contacto</h3>
                                    <div className="space-y-3 text-sm">
                                        <div className="flex items-center gap-3 p-3 bg-white rounded-lg"><Phone size={16} className="text-brand-cyan" /><div><span className="text-gray-400 text-xs">Teléfono</span><p className="font-bold">{selectedPatient.phone}</p></div></div>
                                        <div className="flex items-center gap-3 p-3 bg-white rounded-lg"><Mail size={16} className="text-brand-cyan" /><div><span className="text-gray-400 text-xs">Email</span><p className="font-bold">{selectedPatient.email || '-'}</p></div></div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Clinical History Tab */}
                        {activeTab === 'clinical' && (
                            <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                                <table className="w-full text-sm">
                                    <thead className="bg-gray-50 text-xs text-gray-500 uppercase"><tr><th className="p-4 text-left">Fecha</th><th className="p-4 text-left">Tratamiento</th><th className="p-4 text-left">Doctor</th><th className="p-4 text-right">Coste</th></tr></thead>
                                    <tbody className="divide-y divide-gray-100">
                                        {patientTreatments.length === 0 ? <tr><td colSpan={4} className="p-8 text-center text-gray-400">Sin tratamientos registrados</td></tr> :
                                            patientTreatments.map((t, i) => <tr key={i} className="hover:bg-gray-50"><td className="p-4">{t.date?.split('T')[0]}</td><td className="p-4 font-bold text-brand-blue">{t.treatment}</td><td className="p-4">{t.doctor}</td><td className="p-4 text-right font-bold">{t.cost?.toFixed(2)} €</td></tr>)}
                                    </tbody>
                                </table>
                            </div>
                        )}

                        {/* Odontograma Tab */}
                        {activeTab === 'odontograma' && (
                            <div className="space-y-6">
                                {/* Legend */}
                                <div className="flex flex-wrap gap-3 p-4 bg-gray-50 rounded-xl border border-gray-200">
                                    <span className="text-xs font-bold text-gray-500 uppercase mr-2">Leyenda:</span>
                                    {Object.entries(TOOTH_STATES).map(([key, value]) => (
                                        <div key={key} className="flex items-center gap-1">
                                            <div className="w-4 h-4 rounded" style={{ backgroundColor: value.color }} />
                                            <span className="text-xs font-medium text-gray-600">{value.label}</span>
                                        </div>
                                    ))}
                                </div>

                                {/* Dental Chart */}
                                <div className="bg-white p-8 rounded-2xl border border-gray-200 shadow-sm">
                                    <h4 className="text-center text-sm font-bold text-gray-400 uppercase mb-4">Arcada Superior</h4>
                                    <div className="flex justify-center gap-1 mb-8">
                                        {UPPER_TEETH.map(num => (
                                            <Tooth key={num} number={num} isUpper={true} />
                                        ))}
                                    </div>

                                    <div className="border-t border-dashed border-gray-300 my-4" />

                                    <h4 className="text-center text-sm font-bold text-gray-400 uppercase mb-4">Arcada Inferior</h4>
                                    <div className="flex justify-center gap-1">
                                        {LOWER_TEETH.map(num => (
                                            <Tooth key={num} number={num} isUpper={false} />
                                        ))}
                                    </div>
                                </div>

                                {/* Selected Tooth Info */}
                                {selectedTooth && (
                                    <div className="p-4 bg-brand-blue/5 rounded-xl border border-brand-blue/20 flex items-center justify-between">
                                        <div>
                                            <p className="text-sm text-gray-500">Diente seleccionado</p>
                                            <p className="text-lg font-bold text-brand-dark">#{selectedTooth}</p>
                                        </div>
                                        <div className={`px-4 py-2 rounded-lg ${TOOTH_STATES[teethStates[selectedTooth] || 'healthy'].bgColor}`}>
                                            <p className="text-sm font-bold" style={{ color: TOOTH_STATES[teethStates[selectedTooth] || 'healthy'].color }}>
                                                {TOOTH_STATES[teethStates[selectedTooth] || 'healthy'].label}
                                            </p>
                                        </div>
                                        <p className="text-xs text-gray-500">Click para cambiar estado</p>
                                    </div>
                                )}
                            </div>
                        )}

                        {/* Budgets Tab */}
                        {activeTab === 'budgets' && (
                            <div className="space-y-4">
                                <div className="flex justify-between items-center mb-4">
                                    <h3 className="font-bold text-brand-dark">Presupuestos del Paciente</h3>
                                    <button className="px-4 py-2 bg-brand-dark text-white rounded-xl text-sm font-bold flex items-center gap-2 hover:bg-brand-blue transition-colors">
                                        <Plus size={16} /> Nuevo Presupuesto
                                    </button>
                                </div>
                                {patientBudgets.length === 0 ? <p className="text-center py-8 text-gray-400">Sin presupuestos</p> :
                                    patientBudgets.map((b, i) => (
                                        <div key={i} className="p-4 border border-gray-200 rounded-xl flex justify-between items-center bg-white hover:shadow-md transition-shadow">
                                            <div>
                                                <h4 className="font-bold text-brand-dark">{b.title}</h4>
                                                <p className="text-xs text-gray-500">{b.date?.split('T')[0]}</p>
                                            </div>
                                            <div className="flex items-center gap-4">
                                                <span className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase ${b.status === 'accepted' ? 'bg-brand-lime/20 text-brand-dark' :
                                                    b.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                                                        'bg-red-100 text-red-700'
                                                    }`}>
                                                    {b.status === 'accepted' ? 'Aceptado' : b.status === 'pending' ? 'Pendiente' : 'Rechazado'}
                                                </span>
                                                <span className="text-xl font-bold text-brand-blue">{b.total?.toFixed(2)} €</span>
                                            </div>
                                        </div>
                                    ))}
                            </div>
                        )}

                        {/* Invoices Tab (Facturación) */}
                        {activeTab === 'invoices' && (
                            <div className="space-y-4">
                                <div className="flex justify-between items-center mb-4">
                                    <h3 className="font-bold text-brand-dark">Facturas del Paciente</h3>
                                    <button
                                        onClick={() => setShowInvoiceModal(true)}
                                        className="px-4 py-2 bg-brand-dark text-white rounded-xl text-sm font-bold flex items-center gap-2 hover:bg-brand-blue transition-colors"
                                    >
                                        <Plus size={16} /> Nueva Factura
                                    </button>
                                </div>

                                {/* Invoice List */}
                                <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                                    <table className="w-full text-sm">
                                        <thead className="bg-gray-50 text-xs text-gray-500 uppercase">
                                            <tr>
                                                <th className="p-4 text-left">Nº Factura</th>
                                                <th className="p-4 text-left">Fecha</th>
                                                <th className="p-4 text-right">Total</th>
                                                <th className="p-4 text-center">Estado</th>
                                                <th className="p-4 text-center">QR</th>
                                                <th className="p-4 text-center">Acciones</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-100">
                                            {MOCK_PATIENT_INVOICES.length === 0 ? (
                                                <tr><td colSpan={6} className="p-8 text-center text-gray-400">Sin facturas</td></tr>
                                            ) : (
                                                MOCK_PATIENT_INVOICES.map(inv => (
                                                    <tr key={inv.id} className="hover:bg-gray-50">
                                                        <td className="p-4 font-bold text-brand-dark">{inv.invoiceNumber}</td>
                                                        <td className="p-4 text-gray-600">{inv.date}</td>
                                                        <td className="p-4 text-right font-bold text-brand-blue">{inv.total.toFixed(2)} €</td>
                                                        <td className="p-4 text-center">
                                                            <span className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase ${inv.status === 'paid' ? 'bg-brand-lime/20 text-brand-dark' :
                                                                inv.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                                                                    'bg-red-100 text-red-700'
                                                                }`}>
                                                                {inv.status === 'paid' ? 'Pagada' : inv.status === 'pending' ? 'Pendiente' : 'Anulada'}
                                                            </span>
                                                        </td>
                                                        <td className="p-4 text-center">
                                                            <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors" title="Ver QR">
                                                                <QrCode size={18} className="text-brand-cyan" />
                                                            </button>
                                                        </td>
                                                        <td className="p-4 text-center">
                                                            <div className="flex justify-center gap-2">
                                                                <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors" title="Descargar">
                                                                    <Download size={16} className="text-gray-500" />
                                                                </button>
                                                                <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors" title="Imprimir">
                                                                    <Printer size={16} className="text-gray-500" />
                                                                </button>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                ))
                                            )}
                                        </tbody>
                                    </table>
                                </div>

                                {/* QR Info */}
                                <div className="p-4 bg-brand-lime/10 rounded-xl border border-brand-lime/30 flex items-center gap-3">
                                    <QrCode size={24} className="text-brand-dark" />
                                    <div>
                                        <p className="text-sm font-bold text-brand-dark">Facturas con código QR</p>
                                        <p className="text-xs text-gray-600">Cumple con la legislación española de facturación electrónica (TicketBAI / VeriFactu)</p>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Documents Tab */}
                        {activeTab === 'documents' && (
                            <div className="space-y-4">
                                <div className="flex justify-between items-center mb-4">
                                    <h3 className="font-bold text-brand-dark">Documentos del Paciente</h3>
                                    <button className="px-4 py-2 bg-brand-dark text-white rounded-xl text-sm font-bold flex items-center gap-2 hover:bg-brand-blue transition-colors">
                                        <Plus size={16} /> Subir Documento
                                    </button>
                                </div>

                                <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                                    <table className="w-full text-sm">
                                        <thead className="bg-gray-50 text-xs text-gray-500 uppercase">
                                            <tr>
                                                <th className="p-4 text-left">Documento</th>
                                                <th className="p-4 text-left">Tipo</th>
                                                <th className="p-4 text-left">Fecha</th>
                                                <th className="p-4 text-center">Estado Firma</th>
                                                <th className="p-4 text-center">Acciones</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-100">
                                            {MOCK_PATIENT_DOCS.map(doc => (
                                                <tr key={doc.id} className="hover:bg-gray-50">
                                                    <td className="p-4">
                                                        <div className="flex items-center gap-3">
                                                            <div className="w-10 h-10 rounded-lg bg-brand-blue/10 flex items-center justify-center">
                                                                <FileText size={18} className="text-brand-blue" />
                                                            </div>
                                                            <span className="font-bold text-brand-dark">{doc.title}</span>
                                                        </div>
                                                    </td>
                                                    <td className="p-4 text-gray-600 capitalize">{doc.type}</td>
                                                    <td className="p-4 text-gray-500">{doc.createdAt}</td>
                                                    <td className="p-4 text-center">
                                                        {doc.signatureStatus === 'signed' ? (
                                                            <span className="inline-flex items-center gap-1 px-2 py-1 bg-brand-lime/20 text-brand-dark rounded-full text-[10px] font-bold uppercase">
                                                                <Check size={12} /> Firmado
                                                            </span>
                                                        ) : doc.signatureStatus === 'pending' ? (
                                                            <span className="inline-flex items-center gap-1 px-2 py-1 bg-yellow-100 text-yellow-700 rounded-full text-[10px] font-bold uppercase">
                                                                <AlertCircle size={12} /> Pendiente
                                                            </span>
                                                        ) : (
                                                            <span className="text-xs text-gray-400">N/A</span>
                                                        )}
                                                    </td>
                                                    <td className="p-4 text-center">
                                                        <div className="flex justify-center gap-2">
                                                            <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors" title="Ver">
                                                                <FileText size={16} className="text-gray-500" />
                                                            </button>
                                                            <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors" title="Descargar">
                                                                <Download size={16} className="text-gray-500" />
                                                            </button>
                                                            {doc.signatureStatus === 'pending' && (
                                                                <button className="p-2 hover:bg-brand-lime/20 rounded-lg transition-colors" title="Solicitar Firma">
                                                                    <FileSignature size={16} className="text-brand-lime" />
                                                                </button>
                                                            )}
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        )}
                    </>
                ) : (
                    <div className="flex flex-col items-center justify-center h-full text-gray-400">
                        <User size={64} className="opacity-20 mb-4" />
                        <p>Selecciona un paciente</p>
                    </div>
                )}
            </div>

            {/* Invoice Modal */}
            {showInvoiceModal && (
                <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
                    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden animate-fade-in">
                        <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                            <h2 className="text-xl font-bold text-brand-dark">Nueva Factura</h2>
                            <button onClick={() => setShowInvoiceModal(false)} className="p-2 hover:bg-gray-100 rounded-lg">
                                <X size={20} />
                            </button>
                        </div>
                        <div className="p-6 space-y-4 max-h-[60vh] overflow-y-auto">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="text-xs font-bold text-gray-500 uppercase">Paciente</label>
                                    <p className="font-bold text-brand-dark">{selectedPatient?.name}</p>
                                </div>
                                <div>
                                    <label className="text-xs font-bold text-gray-500 uppercase">Fecha</label>
                                    <p className="font-bold text-brand-dark">{new Date().toLocaleDateString('es-ES')}</p>
                                </div>
                            </div>

                            <div className="border-t pt-4">
                                <div className="flex justify-between items-center mb-2">
                                    <h4 className="font-bold text-brand-dark">Líneas de Factura</h4>
                                    <button className="text-sm text-brand-cyan font-bold flex items-center gap-1">
                                        <Plus size={14} /> Añadir Línea
                                    </button>
                                </div>
                                <div className="bg-gray-50 p-4 rounded-xl text-center text-gray-400 text-sm">
                                    Añade tratamientos o conceptos a facturar
                                </div>
                            </div>

                            <div className="flex justify-end gap-4 pt-4 border-t">
                                <div className="text-right">
                                    <p className="text-xs text-gray-500">Base Imponible</p>
                                    <p className="font-bold">0.00 €</p>
                                </div>
                                <div className="text-right">
                                    <p className="text-xs text-gray-500">IVA (21%)</p>
                                    <p className="font-bold">0.00 €</p>
                                </div>
                                <div className="text-right bg-brand-blue/5 px-4 py-2 rounded-lg">
                                    <p className="text-xs text-gray-500">Total</p>
                                    <p className="text-xl font-bold text-brand-blue">0.00 €</p>
                                </div>
                            </div>
                        </div>
                        <div className="p-6 border-t border-gray-100 flex justify-between items-center bg-gray-50">
                            <div className="flex items-center gap-2 text-xs text-gray-500">
                                <QrCode size={16} />
                                Se generará código QR automáticamente
                            </div>
                            <div className="flex gap-2">
                                <button onClick={() => setShowInvoiceModal(false)} className="px-4 py-2 border border-gray-300 rounded-xl text-sm font-bold hover:bg-gray-100 transition-colors">
                                    Cancelar
                                </button>
                                <button className="px-4 py-2 bg-brand-dark text-white rounded-xl text-sm font-bold hover:bg-brand-blue transition-colors">
                                    Crear Factura
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* New Patient Modal */}
            {showNewPatientModal && (
                <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
                    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden animate-fade-in">
                        <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gradient-to-r from-brand-blue to-brand-cyan">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
                                    <UserPlus size={20} className="text-white" />
                                </div>
                                <h2 className="text-xl font-bold text-white">Nuevo Paciente</h2>
                            </div>
                            <button onClick={() => setShowNewPatientModal(false)} className="p-2 hover:bg-white/10 rounded-lg transition-colors">
                                <X size={20} className="text-white" />
                            </button>
                        </div>

                        <div className="p-6 space-y-4 max-h-[calc(90vh-200px)] overflow-y-auto">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="text-xs font-bold text-gray-500 uppercase block mb-2">Nombre *</label>
                                    <input
                                        type="text"
                                        value={newPatientForm.firstName}
                                        onChange={e => setNewPatientForm({ ...newPatientForm, firstName: e.target.value, name: `${e.target.value} ${newPatientForm.lastName}`.trim() })}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-cyan focus:border-transparent"
                                        placeholder="Juan"
                                    />
                                </div>
                                <div>
                                    <label className="text-xs font-bold text-gray-500 uppercase block mb-2">Apellidos *</label>
                                    <input
                                        type="text"
                                        value={newPatientForm.lastName}
                                        onChange={e => setNewPatientForm({ ...newPatientForm, lastName: e.target.value, name: `${newPatientForm.firstName} ${e.target.value}`.trim() })}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-cyan focus:border-transparent"
                                        placeholder="García López"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="text-xs font-bold text-gray-500 uppercase block mb-2">DNI/NIE</label>
                                    <input
                                        type="text"
                                        value={newPatientForm.dni}
                                        onChange={e => setNewPatientForm({ ...newPatientForm, dni: e.target.value })}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-cyan focus:border-transparent"
                                        placeholder="12345678A"
                                    />
                                </div>
                                <div>
                                    <label className="text-xs font-bold text-gray-500 uppercase block mb-2">Fecha de Nacimiento</label>
                                    <input
                                        type="date"
                                        value={newPatientForm.birthDate}
                                        onChange={e => setNewPatientForm({ ...newPatientForm, birthDate: e.target.value })}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-cyan focus:border-transparent"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="text-xs font-bold text-gray-500 uppercase block mb-2">Teléfono *</label>
                                    <input
                                        type="tel"
                                        value={newPatientForm.phone}
                                        onChange={e => setNewPatientForm({ ...newPatientForm, phone: e.target.value })}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-cyan focus:border-transparent"
                                        placeholder="600123456"
                                    />
                                </div>
                                <div>
                                    <label className="text-xs font-bold text-gray-500 uppercase block mb-2">Email</label>
                                    <input
                                        type="email"
                                        value={newPatientForm.email}
                                        onChange={e => setNewPatientForm({ ...newPatientForm, email: e.target.value })}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-cyan focus:border-transparent"
                                        placeholder="juan@example.com"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="text-xs font-bold text-gray-500 uppercase block mb-2">Dirección</label>
                                <input
                                    type="text"
                                    value={newPatientForm.address}
                                    onChange={e => setNewPatientForm({ ...newPatientForm, address: e.target.value })}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-cyan focus:border-transparent"
                                    placeholder="Calle Principal, 123"
                                />
                            </div>
                        </div>

                        <div className="p-6 border-t border-gray-100 flex justify-between items-center bg-gray-50">
                            <p className="text-xs text-gray-500">* Campos obligatorios</p>
                            <div className="flex gap-2">
                                <button
                                    onClick={() => {
                                        setShowNewPatientModal(false);
                                        setNewPatientForm({ name: '', firstName: '', lastName: '', dni: '', phone: '', email: '', address: '', birthDate: '' });
                                    }}
                                    className="px-4 py-2 border border-gray-300 rounded-xl text-sm font-bold hover:bg-gray-100 transition-colors"
                                >
                                    Cancelar
                                </button>
                                <button
                                    onClick={async () => {
                                        if (!newPatientForm.firstName || !newPatientForm.lastName || !newPatientForm.phone) {
                                            alert('Por favor completa los campos obligatorios');
                                            return;
                                        }
                                        try {
                                            const newPatient: Partial<Patient> = {
                                                id: Date.now().toString(),
                                                name: newPatientForm.name,
                                                firstName: newPatientForm.firstName,
                                                lastName: newPatientForm.lastName,
                                                dni: newPatientForm.dni,
                                                phone: newPatientForm.phone,
                                                email: newPatientForm.email,
                                                address: newPatientForm.address,
                                                birthDate: newPatientForm.birthDate,
                                                recordNumber: `RG${Date.now().toString().slice(-6)}`,
                                                lastVisit: new Date().toISOString().split('T')[0],
                                                status: 'active'
                                            };

                                            // In production, save to database via databaseService
                                            setPatients(prev => [newPatient as Patient, ...prev]);
                                            setSelectedPatient(newPatient as Patient);
                                            setShowNewPatientModal(false);
                                            setNewPatientForm({ name: '', firstName: '', lastName: '', dni: '', phone: '', email: '', address: '', birthDate: '' });
                                        } catch (error) {
                                            console.error('Error creating patient:', error);
                                            alert('Error al crear el paciente');
                                        }
                                    }}
                                    className="px-4 py-2 bg-brand-dark text-white rounded-xl text-sm font-bold hover:bg-brand-blue transition-colors flex items-center gap-2"
                                    disabled={!newPatientForm.firstName || !newPatientForm.lastName || !newPatientForm.phone}
                                >
                                    <UserPlus size={16} />
                                    Crear Paciente
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Patients;
