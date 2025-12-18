import React from 'react';
import { Appointment } from '../../../../types';

interface TimeGridProps {
    appointments: Appointment[];
    selectedDate: Date;
    onAppointmentClick: (appointment: Appointment) => void;
}

export const TimeGrid: React.FC<TimeGridProps> = ({
    appointments,
    selectedDate,
    onAppointmentClick
}) => {
    const hours = Array.from({ length: 13 }, (_, i) => i + 8); // 8:00 to 20:00

    const getAppointmentsForHour = (hour: number) => {
        return appointments.filter(apt => {
            const aptDate = new Date(apt.date);
            const aptHour = aptDate.getHours();

            // Check if appointment is on selected date and in this hour
            return (
                aptDate.toDateString() === selectedDate.toDateString() &&
                aptHour === hour
            );
        });
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'confirmed':
                return 'bg-green-100 border-green-300 text-green-700';
            case 'pending':
                return 'bg-yellow-100 border-yellow-300 text-yellow-700';
            case 'cancelled':
                return 'bg-red-100 border-red-300 text-red-700';
            default:
                return 'bg-blue-100 border-blue-300 text-blue-700';
        }
    };

    return (
        <div className="flex-1 bg-white rounded-2xl border border-gray-200 overflow-hidden flex flex-col">
            {/* Header */}
            <div className="p-4 border-b border-gray-200 bg-gray-50">
                <h2 className="text-lg font-bold text-brand-dark">
                    {selectedDate.toLocaleDateString('es-ES', {
                        weekday: 'long',
                        day: 'numeric',
                        month: 'long'
                    })}
                </h2>
            </div>

            {/* Time grid */}
            <div className="flex-1 overflow-y-auto">
                {hours.map(hour => {
                    const hourAppointments = getAppointmentsForHour(hour);

                    return (
                        <div key={hour} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                            <div className="flex">
                                {/* Time label */}
                                <div className="w-20 p-4 text-sm font-bold text-gray-500 border-r border-gray-100">
                                    {hour.toString().padStart(2, '0')}:00
                                </div>

                                {/* Appointments */}
                                <div className="flex-1 p-2 min-h-[60px]">
                                    {hourAppointments.length > 0 ? (
                                        <div className="space-y-2">
                                            {hourAppointments.map(apt => (
                                                <button
                                                    key={apt.id}
                                                    onClick={() => onAppointmentClick(apt)}
                                                    className={`w-full p-3 rounded-lg border-2 text-left transition-all hover:shadow-md ${getStatusColor(apt.status)}`}
                                                >
                                                    <div className="flex justify-between items-start">
                                                        <div className="flex-1">
                                                            <p className="font-bold text-sm">{apt.patientName}</p>
                                                            <p className="text-xs opacity-75 mt-1">{apt.treatment}</p>
                                                        </div>
                                                        <span className="text-xs font-bold opacity-75">
                                                            {new Date(apt.date).toLocaleTimeString('es-ES', {
                                                                hour: '2-digit',
                                                                minute: '2-digit'
                                                            })}
                                                        </span>
                                                    </div>
                                                </button>
                                            ))}
                                        </div>
                                    ) : (
                                        <div className="h-full flex items-center justify-center text-gray-300 text-xs">
                                            Sin citas
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};
