import React from 'react';
import { User, Phone, Mail, MapPin, Calendar, Edit2 } from 'lucide-react';
import { Patient } from '../../../../types';

interface PatientDetailsProps {
    patient: Patient;
    onEdit: () => void;
}

export const PatientDetails: React.FC<PatientDetailsProps> = ({ patient, onEdit }) => {
    return (
        <div className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex justify-between items-start mb-6">
                <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-brand-blue to-brand-cyan flex items-center justify-center text-white text-2xl font-bold">
                        {patient.name.charAt(0)}
                    </div>
                    <div>
                        <h2 className="text-2xl font-bold text-brand-dark">{patient.name}</h2>
                        <p className="text-sm text-gray-500">Paciente desde {patient.dateOfBirth || 'N/A'}</p>
                    </div>
                </div>
                <button
                    onClick={onEdit}
                    className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg text-sm font-bold hover:bg-gray-50 flex items-center gap-2"
                >
                    <Edit2 size={16} /> Editar
                </button>
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <Phone size={18} className="text-brand-blue" />
                    <div>
                        <p className="text-xs text-gray-500 font-bold uppercase">Teléfono</p>
                        <p className="text-sm text-brand-dark font-medium">{patient.phone || 'No especificado'}</p>
                    </div>
                </div>

                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <Mail size={18} className="text-brand-cyan" />
                    <div>
                        <p className="text-xs text-gray-500 font-bold uppercase">Email</p>
                        <p className="text-sm text-brand-dark font-medium truncate">{patient.email || 'No especificado'}</p>
                    </div>
                </div>

                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <Calendar size={18} className="text-brand-lime" />
                    <div>
                        <p className="text-xs text-gray-500 font-bold uppercase">Fecha de Nacimiento</p>
                        <p className="text-sm text-brand-dark font-medium">{patient.dateOfBirth || 'No especificado'}</p>
                    </div>
                </div>

                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <MapPin size={18} className="text-red-500" />
                    <div>
                        <p className="text-xs text-gray-500 font-bold uppercase">Dirección</p>
                        <p className="text-sm text-brand-dark font-medium truncate">{patient.address || 'No especificada'}</p>
                    </div>
                </div>
            </div>

            {patient.allergies && (
                <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                    <h3 className="text-sm font-bold text-red-700 mb-2">⚠️ Alergias</h3>
                    <p className="text-sm text-red-600">{patient.allergies}</p>
                </div>
            )}

            {patient.medicalHistory && (
                <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                    <h3 className="text-sm font-bold text-blue-700 mb-2">📋 Historial Médico</h3>
                    <p className="text-sm text-blue-600">{patient.medicalHistory}</p>
                </div>
            )}
        </div>
    );
};
