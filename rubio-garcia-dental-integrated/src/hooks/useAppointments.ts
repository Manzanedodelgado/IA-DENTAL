import { useState, useEffect } from 'react';
import { Appointment } from '../types';
import { databaseService } from '../services/databaseService';

interface UseAppointmentsOptions {
    date?: Date;
    patientId?: string;
}

interface UseAppointmentsReturn {
    appointments: Appointment[];
    loading: boolean;
    error: string | null;
    createAppointment: (appointment: Partial<Appointment>) => Promise<Appointment>;
    updateAppointment: (id: string, updates: Partial<Appointment>) => Promise<void>;
    deleteAppointment: (id: string) => Promise<void>;
    getAppointmentsByDate: (date: Date) => Appointment[];
    getAppointmentsByPatient: (patientId: string) => Appointment[];
    refreshAppointments: () => Promise<void>;
}

export const useAppointments = (options: UseAppointmentsOptions = {}): UseAppointmentsReturn => {
    const [appointments, setAppointments] = useState<Appointment[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const loadAppointments = async () => {
        try {
            setLoading(true);
            setError(null);

            // Get all appointments first
            let data = await databaseService.getAppointments();

            // Filter by date if provided
            if (options.date) {
                const dateStr = options.date.toISOString().split('T')[0];
                data = data.filter(apt => {
                    const aptDate = new Date(apt.date).toISOString().split('T')[0];
                    return aptDate === dateStr;
                });
            }

            // Filter by patient if provided
            if (options.patientId) {
                data = data.filter(apt => apt.patientId === options.patientId);
            }

            setAppointments(data);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Error loading appointments');
            console.error('Error loading appointments:', err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadAppointments();
    }, [options.date, options.patientId]);

    const createAppointment = async (appointmentData: Partial<Appointment>): Promise<Appointment> => {
        try {
            const newAppointment = await databaseService.createAppointment(appointmentData);
            setAppointments(prev => [...prev, newAppointment]);
            return newAppointment;
        } catch (err) {
            const errorMsg = err instanceof Error ? err.message : 'Error creating appointment';
            setError(errorMsg);
            throw new Error(errorMsg);
        }
    };

    const updateAppointment = async (id: string, updates: Partial<Appointment>): Promise<void> => {
        try {
            await databaseService.updateAppointment(id, updates);
            setAppointments(prev =>
                prev.map(appointment =>
                    appointment.id === id ? { ...appointment, ...updates } : appointment
                )
            );
        } catch (err) {
            const errorMsg = err instanceof Error ? err.message : 'Error updating appointment';
            setError(errorMsg);
            throw new Error(errorMsg);
        }
    };

    const deleteAppointment = async (id: string): Promise<void> => {
        try {
            await databaseService.deleteAppointment(id);
            setAppointments(prev => prev.filter(appointment => appointment.id !== id));
        } catch (err) {
            const errorMsg = err instanceof Error ? err.message : 'Error deleting appointment';
            setError(errorMsg);
            throw new Error(errorMsg);
        }
    };

    const getAppointmentsByDate = (date: Date): Appointment[] => {
        const dateStr = date.toISOString().split('T')[0];
        return appointments.filter(apt => {
            const aptDate = new Date(apt.date).toISOString().split('T')[0];
            return aptDate === dateStr;
        });
    };

    const getAppointmentsByPatient = (patientId: string): Appointment[] => {
        return appointments.filter(apt => apt.patientId === patientId);
    };

    const refreshAppointments = async () => {
        await loadAppointments();
    };

    return {
        appointments,
        loading,
        error,
        createAppointment,
        updateAppointment,
        deleteAppointment,
        getAppointmentsByDate,
        getAppointmentsByPatient,
        refreshAppointments,
    };
};
