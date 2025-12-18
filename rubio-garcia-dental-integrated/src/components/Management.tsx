import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area, LineChart, Line } from 'recharts';
import { FileText, Package, TrendingUp, Download, BarChart3, Receipt, Boxes, Wallet, Plus, Search, Filter, ArrowUpRight, ArrowDownRight, AlertCircle, Upload } from 'lucide-react';
import { MOCK_INVOICES } from '../constants';
import { Expense } from '../types';

// Weekly revenue data
const weeklyData = [
    { name: 'Lun', ingresos: 4000, gastos: 1200 },
    { name: 'Mar', ingresos: 3000, gastos: 800 },
    { name: 'Mié', ingresos: 2000, gastos: 600 },
    { name: 'Jue', ingresos: 2780, gastos: 1100 },
    { name: 'Vie', ingresos: 1890, gastos: 900 },
    { name: 'Sáb', ingresos: 2390, gastos: 400 },
];

// Monthly trend data
const monthlyTrend = [
    { month: 'Jul', value: 12000 },
    { month: 'Ago', value: 15000 },
    { month: 'Sep', value: 14000 },
    { month: 'Oct', value: 18000 },
    { month: 'Nov', value: 16000 },
    { month: 'Dic', value: 21000 },
];

// Stock items
const STOCK_ITEMS = [
    { id: '1', name: 'Anestesia Lidocaína', stock: 12, minStock: 20, unit: 'un.', status: 'low' as const },
    { id: '2', name: 'Guantes Látex M', stock: 5, minStock: 3, unit: 'cajas', status: 'ok' as const },
    { id: '3', name: 'Composite A2', stock: 2, minStock: 5, unit: 'un.', status: 'critical' as const },
    { id: '4', name: 'Agujas 27G', stock: 45, minStock: 30, unit: 'un.', status: 'ok' as const },
    { id: '5', name: 'Gasas Estériles', stock: 8, minStock: 10, unit: 'paq.', status: 'low' as const },
    { id: '6', name: 'Material Impresión', stock: 3, minStock: 5, unit: 'un.', status: 'critical' as const },
];

// Mock expenses
const MOCK_EXPENSES: Expense[] = [
    { id: '1', date: '2024-12-10', supplier: 'Dental Supply Co.', concept: 'Material de implantes', amount: 1250.00, category: 'material', invoiceNumber: 'FAC-2024-1234', status: 'paid' },
    { id: '2', date: '2024-12-08', supplier: 'Laboratorio Dental Madrid', concept: 'Prótesis paciente García', amount: 450.00, category: 'services', invoiceNumber: 'LD-8876', status: 'paid' },
    { id: '3', date: '2024-12-05', supplier: 'Iberdrola', concept: 'Suministro eléctrico diciembre', amount: 185.50, category: 'services', status: 'pending' },
    { id: '4', date: '2024-12-01', supplier: 'Propietario Local', concept: 'Alquiler mensual', amount: 1800.00, category: 'rent', invoiceNumber: 'ALQ-12-2024', status: 'paid' },
    { id: '5', date: '2024-11-28', supplier: 'Henry Schein', concept: 'Instrumental quirúrgico', amount: 890.00, category: 'material', invoiceNumber: 'HS-45632', status: 'pending' },
];

type ManagementTab = 'dashboard' | 'invoices' | 'stock' | 'expenses';

const Management: React.FC = () => {
    const [activeTab, setActiveTab] = useState<ManagementTab>('dashboard');
    const [searchTerm, setSearchTerm] = useState('');
    const [showExpenseModal, setShowExpenseModal] = useState(false);

    const tabs: { id: ManagementTab; label: string; icon: React.ReactNode }[] = [
        { id: 'dashboard', label: 'Tablero', icon: <BarChart3 size={16} /> },
        { id: 'invoices', label: 'Facturas', icon: <Receipt size={16} /> },
        { id: 'stock', label: 'Stock', icon: <Boxes size={16} /> },
        { id: 'expenses', label: 'Gastos', icon: <Wallet size={16} /> },
    ];

    // KPIs calculation
    const totalRevenue = weeklyData.reduce((sum, d) => sum + d.ingresos, 0);
    const totalExpenses = MOCK_EXPENSES.reduce((sum, e) => sum + e.amount, 0);
    const pendingInvoices = MOCK_INVOICES.filter(i => i.status === 'pending').length;
    const criticalStock = STOCK_ITEMS.filter(s => s.status === 'critical').length;

    return (
        <div className="animate-in fade-in duration-500 space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold text-brand-dark">Gestión y Facturación</h1>
            </div>

            {/* Sub-tabs Navigation */}
            <div className="flex gap-2 border-b border-gray-200 pb-0">
                {tabs.map(tab => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`px-4 py-3 text-sm font-bold flex items-center gap-2 transition-all duration-200 border-b-2 -mb-[2px] ${activeTab === tab.id
                                ? 'text-brand-blue border-brand-blue'
                                : 'text-gray-500 border-transparent hover:text-brand-dark hover:border-gray-300'
                            }`}
                    >
                        {tab.icon}
                        {tab.label}
                    </button>
                ))}
            </div>

            {/* Dashboard Tab */}
            {activeTab === 'dashboard' && (
                <>
                    {/* KPI Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm">
                            <div className="flex justify-between items-start">
                                <div>
                                    <p className="text-xs font-bold text-gray-500 uppercase">Ingresos Semana</p>
                                    <p className="text-2xl font-bold text-brand-dark mt-1">{totalRevenue.toLocaleString()} €</p>
                                </div>
                                <div className="w-10 h-10 rounded-xl bg-brand-lime/20 flex items-center justify-center">
                                    <ArrowUpRight className="text-brand-dark" size={20} />
                                </div>
                            </div>
                            <p className="text-xs text-brand-dark font-bold mt-2 flex items-center gap-1">
                                <ArrowUpRight size={12} /> +12% vs semana anterior
                            </p>
                        </div>

                        <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm">
                            <div className="flex justify-between items-start">
                                <div>
                                    <p className="text-xs font-bold text-gray-500 uppercase">Gastos Mes</p>
                                    <p className="text-2xl font-bold text-brand-dark mt-1">{totalExpenses.toLocaleString()} €</p>
                                </div>
                                <div className="w-10 h-10 rounded-xl bg-red-100 flex items-center justify-center">
                                    <ArrowDownRight className="text-red-600" size={20} />
                                </div>
                            </div>
                            <p className="text-xs text-red-600 font-bold mt-2 flex items-center gap-1">
                                <ArrowDownRight size={12} /> +5% vs mes anterior
                            </p>
                        </div>

                        <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm">
                            <div className="flex justify-between items-start">
                                <div>
                                    <p className="text-xs font-bold text-gray-500 uppercase">Facturas Pendientes</p>
                                    <p className="text-2xl font-bold text-brand-dark mt-1">{pendingInvoices}</p>
                                </div>
                                <div className="w-10 h-10 rounded-xl bg-yellow-100 flex items-center justify-center">
                                    <Receipt className="text-yellow-600" size={20} />
                                </div>
                            </div>
                            <button className="text-xs text-brand-cyan font-bold mt-2 hover:underline">Ver detalles →</button>
                        </div>

                        <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm">
                            <div className="flex justify-between items-start">
                                <div>
                                    <p className="text-xs font-bold text-gray-500 uppercase">Stock Crítico</p>
                                    <p className="text-2xl font-bold text-brand-dark mt-1">{criticalStock} items</p>
                                </div>
                                <div className="w-10 h-10 rounded-xl bg-red-100 flex items-center justify-center">
                                    <AlertCircle className="text-red-600 animate-pulse" size={20} />
                                </div>
                            </div>
                            <button onClick={() => setActiveTab('stock')} className="text-xs text-brand-cyan font-bold mt-2 hover:underline">Revisar stock →</button>
                        </div>
                    </div>

                    {/* Charts Grid */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        {/* Main Chart */}
                        <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
                            <div className="flex justify-between items-center mb-6">
                                <h3 className="font-bold text-brand-dark flex items-center gap-2">
                                    <TrendingUp size={18} className="text-brand-lime" /> Ingresos vs Gastos
                                </h3>
                                <select className="text-xs bg-gray-50 border border-gray-200 rounded-lg px-2 py-1 outline-none">
                                    <option>Esta semana</option>
                                    <option>Mes pasado</option>
                                    <option>Trimestre</option>
                                </select>
                            </div>
                            <div className="h-64 w-full">
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart data={weeklyData}>
                                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                                        <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#888' }} dy={10} />
                                        <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#888' }} />
                                        <Tooltip
                                            cursor={{ fill: '#f5f7fa' }}
                                            contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                                        />
                                        <Bar dataKey="ingresos" fill="#3340D3" radius={[4, 4, 0, 0]} barSize={20} name="Ingresos" />
                                        <Bar dataKey="gastos" fill="#ef4444" radius={[4, 4, 0, 0]} barSize={20} name="Gastos" />
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                        </div>

                        {/* Trend Chart */}
                        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
                            <h3 className="font-bold text-brand-dark flex items-center gap-2 mb-4">
                                <TrendingUp size={18} className="text-brand-cyan" /> Tendencia Mensual
                            </h3>
                            <div className="h-40">
                                <ResponsiveContainer width="100%" height="100%">
                                    <AreaChart data={monthlyTrend}>
                                        <defs>
                                            <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="5%" stopColor="#3340D3" stopOpacity={0.3} />
                                                <stop offset="95%" stopColor="#3340D3" stopOpacity={0} />
                                            </linearGradient>
                                        </defs>
                                        <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#888' }} />
                                        <Tooltip />
                                        <Area type="monotone" dataKey="value" stroke="#3340D3" fillOpacity={1} fill="url(#colorValue)" />
                                    </AreaChart>
                                </ResponsiveContainer>
                            </div>
                            <div className="mt-4 text-center">
                                <p className="text-xs text-gray-500">Total Semestre</p>
                                <p className="text-xl font-bold text-brand-blue">{monthlyTrend.reduce((s, m) => s + m.value, 0).toLocaleString()} €</p>
                            </div>
                        </div>
                    </div>
                </>
            )}

            {/* Invoices Tab */}
            {activeTab === 'invoices' && (
                <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
                    <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                        <div className="flex items-center gap-4">
                            <div className="flex items-center gap-2 bg-gray-50 px-3 py-2 rounded-lg w-64">
                                <Search size={16} className="text-gray-400" />
                                <input
                                    type="text"
                                    placeholder="Buscar facturas..."
                                    className="bg-transparent border-none outline-none text-sm flex-1"
                                    value={searchTerm}
                                    onChange={e => setSearchTerm(e.target.value)}
                                />
                            </div>
                            <button className="flex items-center gap-2 px-3 py-2 border border-gray-200 rounded-lg text-sm font-medium hover:bg-gray-50">
                                <Filter size={14} /> Filtrar
                            </button>
                        </div>
                        <button className="text-xs font-bold bg-brand-dark text-white px-3 py-1.5 rounded-lg flex items-center gap-2 hover:bg-brand-blue transition-colors">
                            <Download size={12} /> Exportar
                        </button>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-50 text-xs text-gray-500 font-semibold uppercase tracking-wider text-left">
                                <tr>
                                    <th className="px-6 py-4">Nº Factura</th>
                                    <th className="px-6 py-4">Paciente</th>
                                    <th className="px-6 py-4">Fecha</th>
                                    <th className="px-6 py-4">Importe</th>
                                    <th className="px-6 py-4">Estado</th>
                                    <th className="px-6 py-4">Acción</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {MOCK_INVOICES.filter(inv =>
                                    inv.number.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                    inv.patientName.toLowerCase().includes(searchTerm.toLowerCase())
                                ).map((inv) => (
                                    <tr key={inv.id} className="hover:bg-gray-50 transition-colors">
                                        <td className="px-6 py-4 text-sm font-medium text-brand-dark">{inv.number}</td>
                                        <td className="px-6 py-4 text-sm text-gray-600">{inv.patientName}</td>
                                        <td className="px-6 py-4 text-sm text-gray-500">{inv.date}</td>
                                        <td className="px-6 py-4 text-sm font-bold text-brand-dark">{inv.total.toFixed(2)} €</td>
                                        <td className="px-6 py-4">
                                            <span className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase ${inv.status === 'paid'
                                                ? 'bg-brand-lime/20 text-brand-dark'
                                                : 'bg-yellow-100 text-yellow-700'
                                                }`}>
                                                {inv.status === 'paid' ? 'Pagada' : 'Pendiente'}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <button className="text-brand-cyan hover:text-brand-blue transition-colors">
                                                <Download size={16} />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {/* Stock Tab */}
            {activeTab === 'stock' && (
                <div className="space-y-6">
                    {/* Stock Alerts */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="bg-brand-lime/10 p-4 rounded-xl border border-brand-lime/30 flex items-center gap-4">
                            <div className="w-12 h-12 rounded-xl bg-brand-lime/20 flex items-center justify-center">
                                <Package className="text-brand-dark" size={24} />
                            </div>
                            <div>
                                <p className="text-xs font-bold text-green-800 uppercase">Stock OK</p>
                                <p className="text-2xl font-bold text-brand-dark">{STOCK_ITEMS.filter(s => s.status === 'ok').length}</p>
                            </div>
                        </div>
                        <div className="bg-yellow-50 p-4 rounded-xl border border-yellow-200 flex items-center gap-4">
                            <div className="w-12 h-12 rounded-xl bg-yellow-100 flex items-center justify-center">
                                <Package className="text-yellow-600" size={24} />
                            </div>
                            <div>
                                <p className="text-xs font-bold text-yellow-800 uppercase">Stock Bajo</p>
                                <p className="text-2xl font-bold text-yellow-700">{STOCK_ITEMS.filter(s => s.status === 'low').length}</p>
                            </div>
                        </div>
                        <div className="bg-red-50 p-4 rounded-xl border border-red-200 flex items-center gap-4">
                            <div className="w-12 h-12 rounded-xl bg-red-100 flex items-center justify-center">
                                <AlertCircle className="text-red-600 animate-pulse" size={24} />
                            </div>
                            <div>
                                <p className="text-xs font-bold text-red-800 uppercase">Crítico</p>
                                <p className="text-2xl font-bold text-red-700">{STOCK_ITEMS.filter(s => s.status === 'critical').length}</p>
                            </div>
                        </div>
                    </div>

                    {/* Stock Table */}
                    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
                        <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                            <h3 className="font-bold text-brand-dark flex items-center gap-2">
                                <Package size={18} className="text-brand-cyan" /> Inventario Completo
                            </h3>
                            <button className="px-4 py-2 bg-brand-dark text-white rounded-xl text-sm font-bold flex items-center gap-2 hover:bg-brand-blue transition-colors">
                                <Plus size={14} /> Añadir Producto
                            </button>
                        </div>
                        <table className="w-full">
                            <thead className="bg-gray-50 text-xs text-gray-500 font-semibold uppercase tracking-wider text-left">
                                <tr>
                                    <th className="px-6 py-4">Producto</th>
                                    <th className="px-6 py-4">Stock Actual</th>
                                    <th className="px-6 py-4">Stock Mínimo</th>
                                    <th className="px-6 py-4">Estado</th>
                                    <th className="px-6 py-4">Acción</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {STOCK_ITEMS.map(item => (
                                    <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                                        <td className="px-6 py-4 text-sm font-bold text-brand-dark">{item.name}</td>
                                        <td className="px-6 py-4 text-sm text-gray-600">{item.stock} {item.unit}</td>
                                        <td className="px-6 py-4 text-sm text-gray-500">{item.minStock} {item.unit}</td>
                                        <td className="px-6 py-4">
                                            <span className={`w-3 h-3 rounded-full inline-block ${item.status === 'critical' ? 'bg-red-500 animate-pulse' :
                                                    item.status === 'low' ? 'bg-yellow-500' : 'bg-brand-lime'
                                                }`} />
                                        </td>
                                        <td className="px-6 py-4">
                                            <button className="text-xs font-bold text-brand-blue hover:underline">Reponer</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {/* Expenses Tab (Gastos) */}
            {activeTab === 'expenses' && (
                <div className="space-y-6">
                    {/* Actions Bar */}
                    <div className="flex justify-between items-center">
                        <div className="flex items-center gap-4">
                            <div className="flex items-center gap-2 bg-white border border-gray-200 px-3 py-2 rounded-lg w-64">
                                <Search size={16} className="text-gray-400" />
                                <input
                                    type="text"
                                    placeholder="Buscar gastos..."
                                    className="bg-transparent border-none outline-none text-sm flex-1"
                                />
                            </div>
                            <select className="text-sm bg-white border border-gray-200 rounded-lg px-3 py-2 outline-none">
                                <option value="">Todas las categorías</option>
                                <option value="material">Material</option>
                                <option value="services">Servicios</option>
                                <option value="rent">Alquiler</option>
                                <option value="salaries">Salarios</option>
                            </select>
                        </div>
                        <div className="flex gap-2">
                            <button className="px-4 py-2 border border-gray-200 rounded-xl text-sm font-bold flex items-center gap-2 hover:bg-gray-50 transition-colors">
                                <Upload size={14} /> Importar de Email
                            </button>
                            <button
                                onClick={() => setShowExpenseModal(true)}
                                className="px-4 py-2 bg-brand-dark text-white rounded-xl text-sm font-bold flex items-center gap-2 hover:bg-brand-blue transition-colors"
                            >
                                <Plus size={14} /> Nuevo Gasto
                            </button>
                        </div>
                    </div>

                    {/* Expenses Summary */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        {['material', 'services', 'rent', 'other'].map(cat => {
                            const total = MOCK_EXPENSES.filter(e => e.category === cat || (cat === 'other' && !['material', 'services', 'rent'].includes(e.category))).reduce((s, e) => s + e.amount, 0);
                            const labels: Record<string, string> = { material: 'Material', services: 'Servicios', rent: 'Alquiler', other: 'Otros' };
                            const colors: Record<string, string> = { material: 'bg-blue-100 text-blue-700', services: 'bg-purple-100 text-purple-700', rent: 'bg-amber-100 text-amber-700', other: 'bg-gray-100 text-gray-700' };
                            return (
                                <div key={cat} className="bg-white p-4 rounded-xl border border-gray-200">
                                    <span className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase ${colors[cat]}`}>{labels[cat]}</span>
                                    <p className="text-xl font-bold text-brand-dark mt-2">{total.toLocaleString()} €</p>
                                </div>
                            );
                        })}
                    </div>

                    {/* Expenses Table */}
                    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
                        <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                            <h3 className="font-bold text-brand-dark flex items-center gap-2">
                                <Wallet size={18} className="text-brand-blue" /> Registro de Gastos
                            </h3>
                            <button className="text-xs font-bold bg-gray-100 text-gray-700 px-3 py-1.5 rounded-lg flex items-center gap-2 hover:bg-gray-200 transition-colors">
                                <Download size={12} /> Exportar
                            </button>
                        </div>
                        <table className="w-full">
                            <thead className="bg-gray-50 text-xs text-gray-500 font-semibold uppercase tracking-wider text-left">
                                <tr>
                                    <th className="px-6 py-4">Fecha</th>
                                    <th className="px-6 py-4">Proveedor</th>
                                    <th className="px-6 py-4">Concepto</th>
                                    <th className="px-6 py-4">Categoría</th>
                                    <th className="px-6 py-4">Importe</th>
                                    <th className="px-6 py-4">Estado</th>
                                    <th className="px-6 py-4">Factura</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {MOCK_EXPENSES.map(expense => (
                                    <tr key={expense.id} className="hover:bg-gray-50 transition-colors">
                                        <td className="px-6 py-4 text-sm text-gray-500">{expense.date}</td>
                                        <td className="px-6 py-4 text-sm font-bold text-brand-dark">{expense.supplier}</td>
                                        <td className="px-6 py-4 text-sm text-gray-600">{expense.concept}</td>
                                        <td className="px-6 py-4">
                                            <span className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase ${expense.category === 'material' ? 'bg-blue-100 text-blue-700' :
                                                    expense.category === 'services' ? 'bg-purple-100 text-purple-700' :
                                                        expense.category === 'rent' ? 'bg-amber-100 text-amber-700' :
                                                            'bg-gray-100 text-gray-700'
                                                }`}>
                                                {expense.category === 'material' ? 'Material' :
                                                    expense.category === 'services' ? 'Servicios' :
                                                        expense.category === 'rent' ? 'Alquiler' : expense.category}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-sm font-bold text-red-600">-{expense.amount.toFixed(2)} €</td>
                                        <td className="px-6 py-4">
                                            <span className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase ${expense.status === 'paid' ? 'bg-brand-lime/20 text-brand-dark' : 'bg-yellow-100 text-yellow-700'
                                                }`}>
                                                {expense.status === 'paid' ? 'Pagado' : 'Pendiente'}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            {expense.invoiceNumber ? (
                                                <button className="text-xs text-brand-cyan hover:underline">{expense.invoiceNumber}</button>
                                            ) : (
                                                <span className="text-xs text-gray-400">Sin factura</span>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Email Import Info */}
                    <div className="p-4 bg-brand-blue/5 rounded-xl border border-brand-blue/20 flex items-center gap-3">
                        <Upload size={24} className="text-brand-blue" />
                        <div>
                            <p className="text-sm font-bold text-brand-dark">Importar facturas desde email</p>
                            <p className="text-xs text-gray-600">Conecta tu correo para descargar automáticamente las facturas recibidas de proveedores</p>
                        </div>
                        <button className="ml-auto px-4 py-2 bg-brand-blue text-white rounded-lg text-sm font-bold hover:bg-brand-dark transition-colors">
                            Configurar
                        </button>
                    </div>
                </div>
            )}

            {/* Expense Modal */}
            {showExpenseModal && (
                <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
                    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg animate-fade-in">
                        <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                            <h2 className="text-xl font-bold text-brand-dark">Nuevo Gasto</h2>
                            <button onClick={() => setShowExpenseModal(false)} className="p-2 hover:bg-gray-100 rounded-lg">
                                ✕
                            </button>
                        </div>
                        <div className="p-6 space-y-4">
                            <div>
                                <label className="text-xs font-bold text-gray-500 uppercase block mb-1">Proveedor</label>
                                <input type="text" placeholder="Nombre del proveedor" className="w-full p-3 border border-gray-200 rounded-xl outline-none focus:border-brand-cyan" />
                            </div>
                            <div>
                                <label className="text-xs font-bold text-gray-500 uppercase block mb-1">Concepto</label>
                                <input type="text" placeholder="Descripción del gasto" className="w-full p-3 border border-gray-200 rounded-xl outline-none focus:border-brand-cyan" />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="text-xs font-bold text-gray-500 uppercase block mb-1">Importe</label>
                                    <input type="number" placeholder="0.00" className="w-full p-3 border border-gray-200 rounded-xl outline-none focus:border-brand-cyan" />
                                </div>
                                <div>
                                    <label className="text-xs font-bold text-gray-500 uppercase block mb-1">Categoría</label>
                                    <select className="w-full p-3 border border-gray-200 rounded-xl outline-none focus:border-brand-cyan">
                                        <option value="material">Material</option>
                                        <option value="services">Servicios</option>
                                        <option value="rent">Alquiler</option>
                                        <option value="salaries">Salarios</option>
                                        <option value="other">Otros</option>
                                    </select>
                                </div>
                            </div>
                            <div>
                                <label className="text-xs font-bold text-gray-500 uppercase block mb-1">Adjuntar Factura (PDF)</label>
                                <div className="border-2 border-dashed border-gray-200 rounded-xl p-6 text-center hover:border-brand-cyan transition-colors cursor-pointer">
                                    <Upload size={24} className="mx-auto text-gray-400 mb-2" />
                                    <p className="text-sm text-gray-500">Arrastra o haz click para subir</p>
                                </div>
                            </div>
                        </div>
                        <div className="p-6 border-t border-gray-100 flex justify-end gap-2">
                            <button onClick={() => setShowExpenseModal(false)} className="px-4 py-2 border border-gray-300 rounded-xl text-sm font-bold hover:bg-gray-100 transition-colors">
                                Cancelar
                            </button>
                            <button className="px-4 py-2 bg-brand-dark text-white rounded-xl text-sm font-bold hover:bg-brand-blue transition-colors">
                                Guardar Gasto
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Management;
