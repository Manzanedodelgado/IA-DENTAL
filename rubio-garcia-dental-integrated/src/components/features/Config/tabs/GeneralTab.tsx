import React from 'react';
import { Save, Edit2, X } from 'lucide-react';

interface ClinicData {
    name: string;
    cif: string;
    address: string;
    phone: string;
    email: string;
    registry: string;
}

interface GeneralTabProps {
    clinicData: ClinicData;
    setClinicData: React.Dispatch<React.SetStateAction<ClinicData>>;
    isEditing: boolean;
    setIsEditing: (value: boolean) => void;
    onSave: () => void;
}

export const GeneralTab: React.FC<GeneralTabProps> = ({
    clinicData,
    setClinicData,
    isEditing,
    setIsEditing,
    onSave
}) => {
    return (
        <div className="max-w-2xl animate-in fade-in">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg font-bold text-brand-dark">Datos de la Clínica</h2>
                {isEditing ? (
                    <div className="flex gap-2">
                        <button onClick={() => setIsEditing(false)} className="p-2 text-gray-500 hover:bg-gray-100 rounded-lg">
                            <X size={18} />
                        </button>
                        <button onClick={onSave} className="flex items-center gap-2 px-4 py-2 bg-brand-cyan text-white rounded-lg font-bold text-sm">
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
    );
};
