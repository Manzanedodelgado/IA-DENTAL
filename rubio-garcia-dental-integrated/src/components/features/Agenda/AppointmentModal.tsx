import React, { useState } from 'react';
import { X, Save, Calendar, Clock, User as UserIcon, FileText } from 'lucide-react';
import { Appointment } from '../../../../types';

interface AppointmentModalProps {
    isOpen: boolean;
    appointment: Appointment | null;
    onClose: () => void;
    onSave: (appointment: Partial<Appointment>) => void;
    onDelete?: (id: string | number) => void;
}

export const AppointmentModal: React.FC<AppointmentModalProps> = ({
    isOpen,
    appointment,
    onClose,
    onSave,
    onDelete
}) => {
    const [formData, setFormData] = useState({
        patientName: appointment?.patientName || '',
        treatment: appointment?.treatment || '',
        date: appointment?.date ? new Date(appointment.date).toISOString().slice(0, 16) : '',
        duration: appointment?.duration || 30,
        notes: appointment?.notes || ''
    });

    const handleSave = () => {
        onSave({
            ...appointment,
            ...formData,
            date: new Date(formData.date).toISOString()
        });
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg animate-fade-in">
                {/* Header */}
                <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                    <h3 className="text-xl font-bold text-brand-dark">
                        {appointment ? 'Editar Cita' : 'Nueva Cita'}
                    </h3>
                    <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg">
                        <X size={20} />
                    </button>
                </div>

                {/* Form */}
                <div className="p-6 space-y-4">
                    <div>
                        <label className="text-xs font-bold text-gray-500 uppercase block mb-2 flex items-center gap-2">
                            <UserIcon size={14} /> Paciente
                        </label>
                        <input
                            type="text"
                            value={formData.patientName}
                            onChange={e => setFormData({ ...formData, patientName: e.target.value })}
                            placeholder="Nombre del paciente"
                            className="w-full p-3 border border-gray-300 rounded-xl text-sm outline-none focus:border-brand-cyan"
                        />
                    </div>

                    <div>
                        <label className="text-xs font-bold text-gray-500 uppercase block mb-2 flex items-center gap-2">
                            <FileText size={14} /> Tratamiento
                        </label>
                        <input
                            type="text"
                            value={formData.treatment}
                            onChange={e => setFormData({ ...formData, treatment: e.target.value })}
                            placeholder="Tipo de tratamiento"
                            className="w-full p-3 border border-gray-300 rounded-xl text-sm outline-none focus:border-brand-cyan"
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="text-xs font-bold text-gray-500 uppercase block mb-2 flex items-center gap-2">
                                <Calendar size={14} /> Fecha y Hora
                            </label>
                            <input
                                type="datetime-local"
                                value={formData.date}
                                onChange={e => setFormData({ ...formData, date: e.target.value })}
                                className="w-full p-3 border border-gray-300 rounded-xl text-sm outline-none focus:border-brand-cyan"
                            />
                        </div>

                        <div>
                            <label className="text-xs font-bold text-gray-500 uppercase block mb-2 flex items-center gap-2">
                                <Clock size={14} /> Duración (min)
                            </label>
                            <select
                                value={formData.duration}
                                onChange={e => setFormData({ ...formData, duration: parseInt(e.target.value) })}
                                className="w-full p-3 border border-gray-300 rounded-xl text-sm outline-none focus:border-brand-cyan"
                            >
                                <option value={15}>15 min</option>
                                <option value={30}>30 min</option>
                                <option value={45}>45 min</option>
                                <option value={60}>1 hora</option>
                                <option value={90}>1.5 horas</option>
                                <option value={120}>2 horas</option>
                            </select>
                        </div>
                    </div>

                    <div>
                        <label className="text-xs font-bold text-gray-500 uppercase block mb-2">
                            Notas
                        </label>
                        <textarea
                            value={formData.notes}
                            onChange={e => setFormData({ ...formData, notes: e.target.value })}
                            placeholder="Notas adicionales..."
                            rows={3}
                            className="w-full p-3 border border-gray-300 rounded-xl text-sm outline-none focus:border-brand-cyan resize-none"
                        />
                    </div>
                </div>

                {/* Actions */}
                <div className="p-6 border-t border-gray-100 flex justify-between">
                    {appointment && onDelete ? (
                        <button
                            onClick={() => {
                                onDelete(appointment.id);
                                onClose();
                            }}
                            className="px-4 py-2 text-red-600 hover:bg-red-50 rounded-xl text-sm font-bold"
                        >
                            Eliminar
                        </button>
                    ) : (
                        <div />
                    )}
                    <div className="flex gap-2">
                        <button
                            onClick={onClose}
                            className="px-4 py-2 border border-gray-300 text-gray-700 rounded-xl text-sm font-bold hover:bg-gray-50"
                        >
                            Cancelar
                        </button>
                        <button
                            onClick={handleSave}
                            disabled={!formData.patientName || !formData.date}
                            className={`px-4 py-2 rounded-xl text-sm font-bold flex items-center gap-2 ${!formData.patientName || !formData.date
                                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                    : 'bg-brand-cyan text-white hover:bg-brand-blue'
                                }`}
                        >
                            <Save size={16} /> Guardar
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
