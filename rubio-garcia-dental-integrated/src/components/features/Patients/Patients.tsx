import React, { useState } from 'react';
import { Users } from 'lucide-react';
import { Patient } from '../../../types';
import { PatientsList, PatientDetails } from '../Patients';

// Mock patients
const MOCK_PATIENTS: Patient[] = [
    {
        id: '1',
        name: 'María García López',
        phone: '+34 600 111 222',
        email: 'maria.garcia@email.com',
        dateOfBirth: '15/03/1985',
        address: 'C/ Mayor 123, Madrid',
        allergies: 'Penicilina',
        medicalHistory: 'Hipertensión controlada'
    },
    {
        id: '2',
        name: 'Juan Pérez Martín',
        phone: '+34 600 333 444',
        email: 'juan.perez@email.com',
        dateOfBirth: '22/07/1990',
        address: 'Av. Constitución 45, Madrid',
        allergies: '',
        medicalHistory: ''
    },
    {
        id: '3',
        name: 'Ana López Ruiz',
        phone: '+34 600 555 666',
        email: 'ana.lopez@email.com',
        dateOfBirth: '08/11/1978',
        address: 'C/ Goya 67, Madrid',
        allergies: 'Látex',
        medicalHistory: 'Diabetes tipo 2'
    }
];

const Patients: React.FC = () => {
    const [patients] = useState<Patient[]>(MOCK_PATIENTS);
    const [selectedPatient, setSelectedPatient] = useState<Patient | null>(MOCK_PATIENTS[0]);
    const [searchTerm, setSearchTerm] = useState('');

    const handleNewPatient = () => {
        // In real app, open new patient form
        console.log('New patient');
    };

    const handleEditPatient = () => {
        // In real app, open edit patient form
        console.log('Edit patient', selectedPatient);
    };

    return (
        <div className="h-full flex flex-col animate-in fade-in duration-500">
            {/* Header */}
            <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-brand-blue to-brand-cyan flex items-center justify-center shadow-lg">
                    <Users size={28} className="text-white" />
                </div>
                <div>
                    <h1 className="text-2xl font-bold text-brand-dark">Pacientes</h1>
                    <p className="text-sm text-gray-500">Gestión de pacientes y fichas médicas</p>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden flex">
                <PatientsList
                    patients={patients}
                    selectedPatient={selectedPatient}
                    searchTerm={searchTerm}
                    onSearchChange={setSearchTerm}
                    onSelectPatient={setSelectedPatient}
                    onNewPatient={handleNewPatient}
                />

                {selectedPatient ? (
                    <div className="flex-1 p-6 overflow-y-auto">
                        <PatientDetails
                            patient={selectedPatient}
                            onEdit={handleEditPatient}
                        />

                        {/* Tabs Section - Would be additional tabs like Treatment, Documents, Budget */}
                        <div className="mt-6 p-8 border-2 border-dashed border-gray-200 rounded-xl text-center text-gray-400">
                            <p className="text-sm">Tabs adicionales: Tratamientos, Documentos, Presupuestos</p>
                            <p className="text-xs mt-2">(Extraídos del componente original según necesidad)</p>
                        </div>
                    </div>
                ) : (
                    <div className="flex-1 flex items-center justify-center text-gray-400">
                        <p>Selecciona un paciente de la lista</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Patients;
