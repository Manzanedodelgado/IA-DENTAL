import React from 'react';
import { Plus, Edit2, Trash2 } from 'lucide-react';

interface User {
    id: string;
    name: string;
    email: string;
    role: string;
    status: string;
}

interface UsersTabProps {
    users: User[];
}

export const UsersTab: React.FC<UsersTabProps> = ({ users }) => {
    return (
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
    );
};
