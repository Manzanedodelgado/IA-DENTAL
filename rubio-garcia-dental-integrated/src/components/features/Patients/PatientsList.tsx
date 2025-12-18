import React from 'react';
import { Search, Plus, User } from 'lucide-react';
import { Patient } from '../../../../types';

interface PatientsListProps {
    patients: Patient[];
    selectedPatient: Patient | null;
    searchTerm: string;
    onSearchChange: (value: string) => void;
    onSelectPatient: (patient: Patient) => void;
    onNewPatient: () => void;
}

export const PatientsList: React.FC<PatientsListProps> = ({
    patients,
    selectedPatient,
    searchTerm,
    onSearchChange,
    onSelectPatient,
    onNewPatient
}) => {
    const filteredPatients = patients.filter(p =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.phone?.includes(searchTerm) ||
        p.email?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="w-80 bg-white border-r border-gray-200 flex flex-col">
            {/* Header */}
            <div className="p-4 border-b border-gray-200">
                <button
                    onClick={onNewPatient}
                    className="w-full px-4 py-2 bg-brand-dark text-white rounded-xl text-sm font-bold flex items-center justify-center gap-2 hover:bg-brand-blue transition-colors"
                >
                    <Plus size={16} /> Nuevo Paciente
                </button>
            </div>

            {/* Search */}
            <div className="p-3 border-b border-gray-200">
                <div className="flex items-center gap-2 bg-gray-100 rounded-lg px-3 py-2">
                    <Search size={16} className="text-gray-400" />
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={(e) => onSearchChange(e.target.value)}
                        placeholder="Buscar paciente..."
                        className="flex-1 bg-transparent outline-none text-sm"
                    />
                </div>
            </div>

            {/* Patients List */}
            <div className="flex-1 overflow-y-auto">
                {filteredPatients.length === 0 ? (
                    <div className="p-8 text-center text-gray-400">
                        <p className="text-sm">No se encontraron pacientes</p>
                    </div>
                ) : (
                    filteredPatients.map((patient) => (
                        <button
                            key={patient.id}
                            onClick={() => onSelectPatient(patient)}
                            className={`w-full p-4 border-b border-gray-100 text-left transition-colors hover:bg-gray-50 ${selectedPatient?.id === patient.id ? 'bg-brand-blue/10 border-l-4 border-l-brand-blue' : ''
                                }`}
                        >
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-brand-blue to-brand-cyan flex items-center justify-center text-white font-bold shrink-0">
                                    {patient.name.charAt(0)}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <h4 className="font-bold text-brand-dark text-sm truncate">{patient.name}</h4>
                                    <p className="text-xs text-gray-500 truncate">{patient.phone || patient.email}</p>
                                </div>
                            </div>
                        </button>
                    ))
                )}
            </div>
        </div>
    );
};
