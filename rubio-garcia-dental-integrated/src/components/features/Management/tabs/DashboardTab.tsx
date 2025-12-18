import React from 'react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, AreaChart, Area } from 'recharts';
import { TrendingUp, ArrowUpRight, ArrowDownRight, Receipt, AlertCircle } from 'lucide-react';

interface DashboardTabProps {
    weeklyData: Array<{ name: string; ingresos: number; gastos: number }>;
    monthlyTrend: Array<{ month: string; value: number }>;
    totalRevenue: number;
    totalExpenses: number;
    pendingInvoices: number;
    criticalStock: number;
    onNavigateToStock: () => void;
}

export const DashboardTab: React.FC<DashboardTabProps> = ({
    weeklyData,
    monthlyTrend,
    totalRevenue,
    totalExpenses,
    pendingInvoices,
    criticalStock,
    onNavigateToStock
}) => {
    return (
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
                    <button onClick={onNavigateToStock} className="text-xs text-brand-cyan font-bold mt-2 hover:underline">Revisar stock →</button>
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
    );
};
