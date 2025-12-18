import React from 'react';
import { Package, AlertCircle, Plus } from 'lucide-react';

interface StockItem {
    id: string;
    name: string;
    stock: number;
    minStock: number;
    unit: string;
    status: 'ok' | 'low' | 'critical';
}

interface StockTabProps {
    stockItems: StockItem[];
}

export const StockTab: React.FC<StockTabProps> = ({ stockItems }) => {
    return (
        <div className="space-y-6">
            {/* Stock Alerts */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-brand-lime/10 p-4 rounded-xl border border-brand-lime/30 flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-brand-lime/20 flex items-center justify-center">
                        <Package className="text-brand-dark" size={24} />
                    </div>
                    <div>
                        <p className="text-xs font-bold text-green-800 uppercase">Stock OK</p>
                        <p className="text-2xl font-bold text-brand-dark">{stockItems.filter(s => s.status === 'ok').length}</p>
                    </div>
                </div>
                <div className="bg-yellow-50 p-4 rounded-xl border border-yellow-200 flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-yellow-100 flex items-center justify-center">
                        <Package className="text-yellow-600" size={24} />
                    </div>
                    <div>
                        <p className="text-xs font-bold text-yellow-800 uppercase">Stock Bajo</p>
                        <p className="text-2xl font-bold text-yellow-700">{stockItems.filter(s => s.status === 'low').length}</p>
                    </div>
                </div>
                <div className="bg-red-50 p-4 rounded-xl border border-red-200 flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-red-100 flex items-center justify-center">
                        <AlertCircle className="text-red-600 animate-pulse" size={24} />
                    </div>
                    <div>
                        <p className="text-xs font-bold text-red-800 uppercase">Crítico</p>
                        <p className="text-2xl font-bold text-red-700">{stockItems.filter(s => s.status === 'critical').length}</p>
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
                        {stockItems.map(item => (
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
    );
};
