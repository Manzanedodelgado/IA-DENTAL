import React, { useState } from 'react';
import { Settings, Users, DollarSign, Wifi, Building2, Save, Plus, Trash2, Edit2, Check, X, Database, Bot, MessageCircle } from 'lucide-react';

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
    { id: 'users', label: 'Usuarios', icon: Users },
    { id: 'prices', label: 'Tarifas', icon: DollarSign },
    { id: 'system', label: 'Sistema', icon: Wifi },
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
                        {/* General Tab */}
                        {activeTab === 'general' && (
                            <div className="max-w-2xl animate-in fade-in">
                                <div className="flex justify-between items-center mb-6">
                                    <h2 className="text-lg font-bold text-brand-dark">Datos de la Clínica</h2>
                                    {isEditing ? (
                                        <div className="flex gap-2">
                                            <button onClick={() => setIsEditing(false)} className="p-2 text-gray-500 hover:bg-gray-100 rounded-lg">
                                                <X size={18} />
                                            </button>
                                            <button onClick={handleSave} className="flex items-center gap-2 px-4 py-2 bg-brand-cyan text-white rounded-lg font-bold text-sm">
                                                <Save size={16} /> Guardar
                                            </button>
                                        </div>
                                    ) : (
                                        <button onClick={() => setIsEditing(true)} className="flex items-center gap-2 px-4 py-2 bg-brand-dark text-white rounded-lg font-bold text-sm">
                                            <Edit2 size={16} /> Editar
                                        </button>
                                    )}
                                </div>

                                <div className="space-y-4">
                                    <div>
                                        <label className="text-[10px] font-bold text-gray-400 uppercase">Nombre de la Clínica</label>
                                        <input
                                            type="text"
                                            value={clinicData.name}
                                            onChange={(e) => setClinicData({ ...clinicData, name: e.target.value })}
                                            disabled={!isEditing}
                                            className="w-full mt-1 px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-brand-cyan disabled:bg-gray-50 disabled:text-gray-600"
                                        />
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="text-[10px] font-bold text-gray-400 uppercase">CIF</label>
                                            <input
                                                type="text"
                                                value={clinicData.cif}
                                                onChange={(e) => setClinicData({ ...clinicData, cif: e.target.value })}
                                                disabled={!isEditing}
                                                className="w-full mt-1 px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-brand-cyan disabled:bg-gray-50 disabled:text-gray-600"
                                            />
                                        </div>
                                        <div>
                                            <label className="text-[10px] font-bold text-gray-400 uppercase">Teléfono</label>
                                            <input
                                                type="text"
                                                value={clinicData.phone}
                                                onChange={(e) => setClinicData({ ...clinicData, phone: e.target.value })}
                                                disabled={!isEditing}
                                                className="w-full mt-1 px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-brand-cyan disabled:bg-gray-50 disabled:text-gray-600"
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="text-[10px] font-bold text-gray-400 uppercase">Dirección</label>
                                        <input
                                            type="text"
                                            value={clinicData.address}
                                            onChange={(e) => setClinicData({ ...clinicData, address: e.target.value })}
                                            disabled={!isEditing}
                                            className="w-full mt-1 px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-brand-cyan disabled:bg-gray-50 disabled:text-gray-600"
                                        />
                                    </div>
                                    <div>
                                        <label className="text-[10px] font-bold text-gray-400 uppercase">Email</label>
                                        <input
                                            type="email"
                                            value={clinicData.email}
                                            onChange={(e) => setClinicData({ ...clinicData, email: e.target.value })}
                                            disabled={!isEditing}
                                            className="w-full mt-1 px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-brand-cyan disabled:bg-gray-50 disabled:text-gray-600"
                                        />
                                    </div>
                                    <div>
                                        <label className="text-[10px] font-bold text-gray-400 uppercase">Registro Mercantil</label>
                                        <textarea
                                            value={clinicData.registry}
                                            onChange={(e) => setClinicData({ ...clinicData, registry: e.target.value })}
                                            disabled={!isEditing}
                                            rows={2}
                                            className="w-full mt-1 px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-brand-cyan disabled:bg-gray-50 disabled:text-gray-600 resize-none"
                                        />
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Users Tab */}
                        {activeTab === 'users' && (
                            <div className="animate-in fade-in">
                                <div className="flex justify-between items-center mb-6">
                                    <h2 className="text-lg font-bold text-brand-dark">Gestión de Usuarios</h2>
                                    <button className="flex items-center gap-2 px-4 py-2 bg-brand-dark text-white rounded-lg font-bold text-sm">
                                        <Plus size={16} /> Nuevo Usuario
                                    </button>
                                </div>

                                <table className="w-full">
                                    <thead className="bg-gray-50 text-xs text-gray-500 font-bold uppercase">
                                        <tr>
                                            <th className="px-6 py-4 text-left rounded-l-xl">Usuario</th>
                                            <th className="px-6 py-4 text-left">Email</th>
                                            <th className="px-6 py-4 text-left">Rol</th>
                                            <th className="px-6 py-4 text-left">Estado</th>
                                            <th className="px-6 py-4 text-right rounded-r-xl">Acciones</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-100">
                                        {users.map(user => (
                                            <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center gap-3">
                                                        <div className="w-9 h-9 rounded-full bg-gradient-to-br from-brand-blue to-brand-cyan text-white flex items-center justify-center font-bold text-sm">
                                                            {user.name.charAt(0)}
                                                        </div>
                                                        <span className="font-bold text-brand-dark text-sm">{user.name}</span>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 text-sm text-gray-600">{user.email}</td>
                                                <td className="px-6 py-4">
                                                    <span className={`px-2.5 py-1 rounded text-[10px] font-bold uppercase ${user.role === 'admin' ? 'bg-purple-100 text-purple-700' :
                                                        user.role === 'doctor' ? 'bg-blue-100 text-blue-700' :
                                                            'bg-gray-100 text-gray-700'
                                                        }`}>
                                                        {user.role}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <span className="flex items-center gap-2 text-sm">
                                                        <span className="w-2 h-2 rounded-full bg-brand-lime" />
                                                        <span className="text-gray-600">Activo</span>
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 text-right">
                                                    <div className="flex justify-end gap-2">
                                                        <button className="p-2 text-gray-400 hover:text-brand-blue hover:bg-blue-50 rounded-lg transition-colors">
                                                            <Edit2 size={16} />
                                                        </button>
                                                        <button className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors">
                                                            <Trash2 size={16} />
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}

                        {/* Prices Tab */}
                        {activeTab === 'prices' && (
                            <div className="animate-in fade-in">
                                <div className="flex justify-between items-center mb-6">
                                    <h2 className="text-lg font-bold text-brand-dark">Tarifas de Tratamientos</h2>
                                    <button className="flex items-center gap-2 px-4 py-2 bg-brand-dark text-white rounded-lg font-bold text-sm">
                                        <Plus size={16} /> Nuevo Tratamiento
                                    </button>
                                </div>

                                <table className="w-full">
                                    <thead className="bg-gray-50 text-xs text-gray-500 font-bold uppercase">
                                        <tr>
                                            <th className="px-6 py-4 text-left rounded-l-xl">Tratamiento</th>
                                            <th className="px-6 py-4 text-left">Categoría</th>
                                            <th className="px-6 py-4 text-right">Precio</th>
                                            <th className="px-6 py-4 text-right rounded-r-xl">Acciones</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-100">
                                        {prices.map(price => (
                                            <tr key={price.id} className="hover:bg-gray-50 transition-colors">
                                                <td className="px-6 py-4 font-bold text-brand-dark text-sm">{price.treatment}</td>
                                                <td className="px-6 py-4">
                                                    <span className="px-2.5 py-1 bg-gray-100 text-gray-600 rounded text-[10px] font-bold uppercase">
                                                        {price.category}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 text-right font-bold text-lg text-brand-blue">
                                                    {price.price.toFixed(2)} €
                                                </td>
                                                <td className="px-6 py-4 text-right">
                                                    <div className="flex justify-end gap-2">
                                                        <button className="p-2 text-gray-400 hover:text-brand-blue hover:bg-blue-50 rounded-lg transition-colors">
                                                            <Edit2 size={16} />
                                                        </button>
                                                        <button className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors">
                                                            <Trash2 size={16} />
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}

                        {/* System Tab */}
                        {activeTab === 'system' && (
                            <div className="animate-in fade-in max-w-2xl">
                                <h2 className="text-lg font-bold text-brand-dark mb-6">Estado del Sistema</h2>

                                <div className="space-y-4">
                                    {/* Database Connection */}
                                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border border-gray-200">
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 rounded-xl bg-brand-lime/20 text-brand-dark flex items-center justify-center">
                                                <Database size={24} />
                                            </div>
                                            <div>
                                                <p className="font-bold text-brand-dark">Base de Datos SQL Server</p>
                                                <p className="text-xs text-gray-500">GABINETE2\INFOMED - GELITE</p>
                                            </div>
                                        </div>
                                        <span className="flex items-center gap-2 px-3 py-1.5 bg-brand-lime/20 text-brand-dark rounded-full text-xs font-bold">
                                            <span className="w-2 h-2 rounded-full bg-brand-lime animate-pulse" />
                                            Conectado
                                        </span>
                                    </div>

                                    {/* AI Connection */}
                                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border border-gray-200">
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 rounded-xl bg-brand-lime/30 text-brand-dark flex items-center justify-center">
                                                <Bot size={24} />
                                            </div>
                                            <div>
                                                <p className="font-bold text-brand-dark">IA Dental (Gemini)</p>
                                                <p className="text-xs text-gray-500">gemini-2.5-flash</p>
                                            </div>
                                        </div>
                                        <span className="flex items-center gap-2 px-3 py-1.5 bg-brand-lime/20 text-brand-dark rounded-full text-xs font-bold">
                                            <span className="w-2 h-2 rounded-full bg-brand-lime animate-pulse" />
                                            Activo
                                        </span>
                                    </div>

                                    {/* WhatsApp Connection */}
                                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border border-gray-200">
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 rounded-xl bg-brand-lime/20 text-brand-dark flex items-center justify-center">
                                                <MessageCircle size={24} />
                                            </div>
                                            <div>
                                                <p className="font-bold text-brand-dark">WhatsApp Business</p>
                                                <p className="text-xs text-gray-500">+34 91 123 45 67</p>
                                            </div>
                                        </div>
                                        <span className="flex items-center gap-2 px-3 py-1.5 bg-yellow-100 text-yellow-700 rounded-full text-xs font-bold">
                                            <span className="w-2 h-2 rounded-full bg-yellow-500" />
                                            Pendiente QR
                                        </span>
                                    </div>
                                </div>

                                {/* Version Info */}
                                <div className="mt-8 p-4 bg-gray-50 rounded-xl border border-dashed border-gray-300">
                                    <p className="text-xs text-gray-500 text-center">
                                        <strong>Rubio García Dental App</strong> v1.0.0 • IA Dental v3.0 Beta<br />
                                        © 2025 TRIDENTAL ODONTOLOGOS SLP
                                    </p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Config;
