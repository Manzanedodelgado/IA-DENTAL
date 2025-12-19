import React, { useState } from 'react';
import { Calendar as CalendarIcon, Plus } from 'lucide-react';
import { Appointment } from '../../../types';
import { CalendarView, TimeGrid, AppointmentModal } from '../Agenda';

// Mock appointments
const MOCK_APPOINTMENTS: Appointment[] = [
    {
        id: 1,
        patientName: 'María García',
        date: new Date(2024, 11, 16, 10, 0).toISOString(),
        treatment: 'Limpieza dental',
        duration: '30 min',
        status: 'confirmed',
        notes: ''
    },
    {
        id: 2,
        patientName: 'Juan Pérez',
        date: new Date(2024, 11, 16, 11, 30).toISOString(),
        treatment: 'Endodoncia',
        duration: '60 min',
        status: 'confirmed',
        notes: ''
    },
    {
        id: 3,
        patientName: 'Ana López',
        date: new Date(2024, 11, 16, 15, 0).toISOString(),
        treatment: 'Revisión',
        duration: '30 min',
        status: 'pending',
        notes: ''
    }
];

const Agenda: React.FC = () => {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [appointments, setAppointments] = useState<Appointment[]>(MOCK_APPOINTMENTS);
    const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);
    const [showModal, setShowModal] = useState(false);

    const handlePrevMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
    };

    const handleNextMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
    };

    const handleDateChange = (date: Date) => {
        setSelectedDate(date);
        setCurrentDate(new Date(date.getFullYear(), date.getMonth(), 1));
    };

    const handleAppointmentClick = (appointment: Appointment) => {
        setSelectedAppointment(appointment);
        setShowModal(true);
    };

    const handleNewAppointment = () => {
        setSelectedAppointment(null);
        setShowModal(true);
    };

    const handleSaveAppointment = (appointmentData: Partial<Appointment>) => {
        if (selectedAppointment) {
            // Update existing
            setAppointments(appointments.map(apt =>
                apt.id === selectedAppointment.id
                    ? { ...apt, ...appointmentData }
                    : apt
            ));
        } else {
            // Create new
            const newAppointment: Appointment = {
                id: Date.now(),
                patientName: appointmentData.patientName || '',
                date: appointmentData.date || new Date().toISOString(),
                treatment: appointmentData.treatment || '',
                duration: appointmentData.duration || '30 min',
                status: 'pending',
                notes: appointmentData.notes || ''
            };
            setAppointments([...appointments, newAppointment]);
        }
    };

    const handleDeleteAppointment = (id: string | number) => {
        setAppointments(appointments.filter(apt => apt.id !== id));
    };

    return (
        <div className="h-full flex flex-col animate-in fade-in duration-500">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-brand-blue to-brand-cyan flex items-center justify-center shadow-lg">
                        <CalendarIcon size={28} className="text-white" />
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold text-brand-dark">Agenda</h1>
                        <p className="text-sm text-gray-500">Gestión de citas y calendario</p>
                    </div>
                </div>
                <button
                    onClick={handleNewAppointment}
                    className="px-4 py-2 bg-brand-dark text-white rounded-xl text-sm font-bold flex items-center gap-2 hover:bg-brand-blue transition-colors"
                >
                    <Plus size={16} /> Nueva Cita
                </button>
            </div>

            {/* Main Content */}
            <div className="flex-1 flex gap-6 overflow-hidden">
                <CalendarView
                    currentDate={currentDate}
                    selectedDate={selectedDate}
                    onDateChange={handleDateChange}
                    onPrevMonth={handlePrevMonth}
                    onNextMonth={handleNextMonth}
                />

                <TimeGrid
                    appointments={appointments}
                    selectedDate={selectedDate}
                    onAppointmentClick={handleAppointmentClick}
                />
            </div>

            <AppointmentModal
                isOpen={showModal}
                appointment={selectedAppointment}
                onClose={() => {
                    setShowModal(false);
                    setSelectedAppointment(null);
                }}
                onSave={handleSaveAppointment}
                onDelete={handleDeleteAppointment}
            />
        </div>
    );
};

export default Agenda;
