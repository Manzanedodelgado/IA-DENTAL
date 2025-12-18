import React from 'react';
import { Search, Filter, Download } from 'lucide-react';

interface Invoice {
    id: string;
    number: string;
    patientName: string;
    date: string;
    total: number;
    status: string;
}

interface InvoicesTabProps {
    invoices: Invoice[];
    searchTerm: string;
    onSearchChange: (value: string) => void;
}

export const InvoicesTab: React.FC<InvoicesTabProps> = ({
    invoices,
    searchTerm,
    onSearchChange
}) => {
    return (
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
                            onChange={e => onSearchChange(e.target.value)}
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
                        {invoices.filter(inv =>
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
    );
};
