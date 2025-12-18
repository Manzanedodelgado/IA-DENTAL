import React, { useState } from 'react';
import { BarChart3, Receipt, Boxes, Wallet } from 'lucide-react';
import { MOCK_INVOICES } from '../../../constants';
import { Expense } from '../../../types';
import { DashboardTab, InvoicesTab, StockTab, ExpensesTab } from './tabs';

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

            {/* Tab Content */}
            {activeTab === 'dashboard' && (
                <DashboardTab
                    weeklyData={weeklyData}
                    monthlyTrend={monthlyTrend}
                    totalRevenue={totalRevenue}
                    totalExpenses={totalExpenses}
                    pendingInvoices={pendingInvoices}
                    criticalStock={criticalStock}
                    onNavigateToStock={() => setActiveTab('stock')}
                />
            )}

            {activeTab === 'invoices' && (
                <InvoicesTab
                    invoices={MOCK_INVOICES}
                    searchTerm={searchTerm}
                    onSearchChange={setSearchTerm}
                />
            )}

            {activeTab === 'stock' && (
                <StockTab stockItems={STOCK_ITEMS} />
            )}

            {activeTab === 'expenses' && (
                <ExpensesTab
                    expenses={MOCK_EXPENSES}
                    showExpenseModal={showExpenseModal}
                    setShowExpenseModal={setShowExpenseModal}
                />
            )}
        </div>
    );
};

export default Management;
