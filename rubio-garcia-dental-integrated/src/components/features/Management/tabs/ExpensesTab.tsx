import React from 'react';
import { Search, Upload, Download, Wallet, Plus } from 'lucide-react';
import { Expense } from '../../../../types';

Interface ExpensesTabProps {
    expenses: Expense[];
    showExpenseModal: boolean;
    setShowExpenseModal: (show: boolean) => void;
}

export const ExpensesTab: React.FC<ExpensesTabProps> = ({
    expenses,
    showExpenseModal,
    setShowExpenseModal
}) => {
    return (
        <>
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
                        const total = expenses.filter(e => e.category === cat || (cat === 'other' && !['material', 'services', 'rent'].includes(e.category))).reduce((s, e) => s + e.amount, 0);
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
                            {expenses.map(expense => (
                                <tr key={expense.id} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-6 py-4 text-sm text-gray-500">{expense.date}</td>
                                    <td className="px-6 py-4 text-sm font-bold text-brand-dark">{expense.supplier}</td>
                                    <td className="px-6 py-4 text-sm text-gray-600">{expense.concept}</td>
                                    <td className="px-6 py-4">
                                        <span className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase ${expense.category === 'material' ? 'bg-blue-100 text-blue-700' :
                                            expense.category === 'services' ? 'bg-purple-100 text-purple-700' :
                                                expense.category === 'rent' ? 'bg-amber-100 text-amber-707' :
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
        </>
    );
};
