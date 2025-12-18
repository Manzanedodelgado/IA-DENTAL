import { useState, useEffect } from 'react';
import { Patient } from '../types';
import { databaseService } from '../services/databaseService';

interface UsePatientsReturn {
    patients: Patient[];
    loading: boolean;
    error: string | null;
    selectedPatient: Patient | null;
    setSelectedPatient: (patient: Patient | null) => void;
    createPatient: (patient: Partial<Patient>) => Promise<Patient>;
    updatePatient: (id: string, updates: Partial<Patient>) => Promise<void>;
    deletePatient: (id: string) => Promise<void>;
    searchPatients: (query: string) => Patient[];
    refreshPatients: () => Promise<void>;
}

export const usePatients = (): UsePatientsReturn => {
    const [patients, setPatients] = useState<Patient[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);

    const loadPatients = async () => {
        try {
            setLoading(true);
            setError(null);
            const data = await databaseService.getPatients();
            setPatients(data);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Error loading patients');
            console.error('Error loading patients:', err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadPatients();
    }, []);

    const createPatient = async (patientData: Partial<Patient>): Promise<Patient> => {
        try {
            const newPatient = await databaseService.createPatient(patientData);
            setPatients(prev => [newPatient, ...prev]);
            return newPatient;
        } catch (err) {
            const errorMsg = err instanceof Error ? err.message : 'Error creating patient';
            setError(errorMsg);
            throw new Error(errorMsg);
        }
    };

    const updatePatient = async (id: string, updates: Partial<Patient>): Promise<void> => {
        try {
            await databaseService.updatePatient(id, updates);
            setPatients(prev =>
                prev.map(patient =>
                    patient.id === id ? { ...patient, ...updates } : patient
                )
            );
            if (selectedPatient?.id === id) {
                setSelectedPatient({ ...selectedPatient, ...updates });
            }
        } catch (err) {
            const errorMsg = err instanceof Error ? err.message : 'Error updating patient';
            setError(errorMsg);
            throw new Error(errorMsg);
        }
    };

    const deletePatient = async (id: string): Promise<void> => {
        try {
            await databaseService.deletePatient(id);
            setPatients(prev => prev.filter(patient => patient.id !== id));
            if (selectedPatient?.id === id) {
                setSelectedPatient(null);
            }
        } catch (err) {
            const errorMsg = err instanceof Error ? err.message : 'Error deleting patient';
            setError(errorMsg);
            throw new Error(errorMsg);
        }
    };

    const searchPatients = (query: string): Patient[] => {
        if (!query.trim()) return patients;

        const searchTerm = query.toLowerCase();
        return patients.filter(patient =>
            patient.firstName?.toLowerCase().includes(searchTerm) ||
            patient.lastName?.toLowerCase().includes(searchTerm) ||
            patient.dni?.toLowerCase().includes(searchTerm) ||
            patient.phone?.toLowerCase().includes(searchTerm) ||
            patient.email?.toLowerCase().includes(searchTerm)
        );
    };

    const refreshPatients = async () => {
        await loadPatients();
    };

    return {
        patients,
        loading,
        error,
        selectedPatient,
        setSelectedPatient,
        createPatient,
        updatePatient,
        deletePatient,
        searchPatients,
        refreshPatients,
    };
};
