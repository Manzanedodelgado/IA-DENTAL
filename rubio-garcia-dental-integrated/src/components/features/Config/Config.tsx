import React, { useState } from 'react';
import { Settings, Building2 } from 'lucide-react';
import { GeneralTab, UsersTab, PricesTab, SystemTab } from './tabs';

// Mock clinic data
const CLINIC_DATA = {
    name: 'Clínica Dental Rubio García',
    cif: 'B-12345678',
    address: 'C/ Gran Vía 45, 28013 Madrid',
    phone: '+34 91 123 45 67',
    email: 'info@rubiogarciadental.com',
    registry: 'Inscrita en el Registro Mercantil de Madrid, Tomo 12345, Folio 67, Hoja M-123456',
};

// Mock users
const MOCK_USERS = [
    { id: '1', name: 'JMD', email: 'info@rubiogarciadental.com', role: 'admin', status: 'active' },
    { id: '2', name: 'Dr. García', email: 'garcia@rubiogarciadental.com', role: 'doctor', status: 'active' },
    { id: '3', name: 'Dra. Rubio', email: 'rubio@rubiogarciadental.com', role: 'doctor', status: 'active' },
    { id: '4', name: 'Recepción', email: 'recepcion@rubiogarciadental.com', role: 'user', status: 'active' },
];

// Mock prices
const MOCK_PRICES = [
    { id: '1', treatment: 'Limpieza Bucal', price: 80, category: 'Preventivo' },
    { id: '2', treatment: 'Obturación Simple', price: 60, category: 'Conservador' },
    { id: '3', treatment: 'Obturación Compuesta', price: 85, category: 'Conservador' },
    { id: '4', treatment: 'Endodoncia Unirradicular', price: 180, category: 'Endodoncia' },
    { id: '5', treatment: 'Endodoncia Birradicular', price: 220, category: 'Endodoncia' },
    { id: '6', treatment: 'Implante Titanio', price: 800, category: 'Cirugía' },
    { id: '7', treatment: 'Corona Zirconio', price: 400, category: 'Prótesis' },
    { id: '8', treatment: 'Ortodoncia Completa', price: 3500, category: 'Ortodoncia' },
];

type TabId = 'general' | 'users' | 'prices' | 'system';

const TABS = [
    { id: 'general', label: 'General', icon: Building2 },
    { id: 'users', label: 'Usuarios', icon: Settings },
    { id: 'prices', label: 'Tarifas', icon: Settings },
    { id: 'system', label: 'Sistema', icon: Settings },
];

const Config: React.FC = () => {
    const [activeTab, setActiveTab] = useState<TabId>('general');
    const [clinicData, setClinicData] = useState(CLINIC_DATA);
    const [users] = useState(MOCK_USERS);
    const [prices] = useState(MOCK_PRICES);
    const [isEditing, setIsEditing] = useState(false);

    const handleSave = () => {
        setIsEditing(false);
        // In real app, save to backend
    };

    return (
        <div className="h-full flex flex-col animate-in fade-in duration-500">
            {/* Header */}
            <div className="flex items-center justify-between mb-6 flex-shrink-0">
                <div>
                    <h1 className="text-2xl font-bold text-brand-dark flex items-center gap-3">
                        <Settings className="text-brand-blue" /> Configuración
                    </h1>
                    <p className="text-sm text-gray-500">Ajustes de la clínica, usuarios y sistema</p>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 flex gap-6 min-h-0 overflow-hidden">
                {/* Sidebar Tabs */}
                <div className="w-56 bg-white rounded-2xl border border-gray-200 shadow-sm p-4 flex-shrink-0">
                    <nav className="space-y-2">
                        {TABS.map(tab => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id as TabId)}
                                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all ${activeTab === tab.id
                                        ? 'bg-brand-blue text-white shadow-md'
                                        : 'text-gray-600 hover:bg-gray-50'
                                    }`}
                            >
                                <tab.icon size={18} />
                                {tab.label}
                            </button>
                        ))}
                    </nav>
                </div>

                {/* Content Panel */}
                <div className="flex-1 bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden flex flex-col">
                    <div className="flex-1 overflow-y-auto p-6">
                        {activeTab === 'general' && (
                            <GeneralTab
                                clinicData={clinicData}
                                setClinicData={setClinicData}
                                isEditing={isEditing}
                                setIsEditing={setIsEditing}
                                onSave={handleSave}
                            />
                        )}
                        {activeTab === 'users' && <UsersTab users={users} />}
                        {activeTab === 'prices' && <PricesTab prices={prices} />}
                        {activeTab === 'system' && <SystemTab />}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Config;
