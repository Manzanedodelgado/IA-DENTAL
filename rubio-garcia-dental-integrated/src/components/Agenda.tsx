import React, { useState, useEffect, useRef } from 'react';
import { Calendar, ChevronLeft, ChevronRight, Plus, Clock, User, Phone, Edit2, Save, X, Trash2, RefreshCw, AlertCircle, CheckCircle, GripVertical, Move } from 'lucide-react';
import { Appointment, Patient } from '../types';
import { databaseService } from '../services/databaseService';
import { MOCK_APPOINTMENTS } from '../constants';

interface AgendaProps {
    preselectedPatient: Patient | null;
    onClearPreselectedPatient: () => void;
}

const DOCTORS = ['Dr. García', 'Dra. Rubio', 'Dr. López', 'Dra. Martín'];
const HOURS = Array.from({ length: 12 }, (_, i) => `${(i + 8).toString().padStart(2, '0')}:00`);
const START_HOUR = 8;
const PIXELS_PER_HOUR = 80;

const SIT_CIT_OPTIONS: Record<string, string> = {
    '1': 'Pendiente',
    '2': 'Confirmada',
    '3': 'En Sala',
    '4': 'En Gabinete',
    '5': 'Finalizada',
    '6': 'Anulada',
    '7': 'Fallo',
};

const Agenda: React.FC<AgendaProps> = ({ preselectedPatient, onClearPreselectedPatient }) => {
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [appointments, setAppointments] = useState<Appointment[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingId, setEditingId] = useState<number | null>(null);

    // Drag & Drop state
    const [draggingId, setDraggingId] = useState<number | null>(null);
    const [dragOverTime, setDragOverTime] = useState<string | null>(null);
    const gridRef = useRef<HTMLDivElement>(null);

    const [formData, setFormData] = useState({
        date: '',
        time: '09:00',
        durationMinutes: 30,
        patientName: '',
        phone: '',
        doctor: DOCTORS[0],
        treatment: '',
        notes: '',
        urgent: false,
        sitCit: '1'
    });

    // Fetch appointments
    useEffect(() => {
        const fetchAppointments = async () => {
            setLoading(true);
            setError('');
            try {
                const data = await databaseService.getAppointments(selectedDate);
                setAppointments(data.length > 0 ? data : []);
            } catch (e: any) {
                setError(e.message || 'Error cargando citas');
                setAppointments(MOCK_APPOINTMENTS);
            } finally {
                setLoading(false);
            }
        };
        fetchAppointments();
    }, [selectedDate]);

    // Handle preselected patient
    useEffect(() => {
        if (preselectedPatient) {
            setFormData(prev => ({
                ...prev,
                patientName: preselectedPatient.name,
                phone: preselectedPatient.phone,
                date: new Date().toISOString().split('T')[0]
            }));
            setIsModalOpen(true);
        }
    }, [preselectedPatient]);

    const navigateDay = (delta: number) => {
        const newDate = new Date(selectedDate);
        newDate.setDate(newDate.getDate() + delta);
        setSelectedDate(newDate);
    };

    const handleOpenEdit = (apt: Appointment) => {
        setEditingId(typeof apt.id === 'number' ? apt.id : parseInt(apt.id.toString()));
        setFormData({
            date: apt.date,
            time: apt.time,
            durationMinutes: apt.durationMinutes,
            patientName: apt.patientName,
            phone: apt.phone,
            doctor: apt.doctor,
            treatment: apt.treatment,
            notes: apt.notes || '',
            urgent: apt.urgent,
            sitCit: apt.sitCit || '1'
        });
        setIsModalOpen(true);
    };

    const handleOpenNew = () => {
        setEditingId(null);
        setFormData({
            date: selectedDate.toISOString().split('T')[0],
            time: '09:00',
            durationMinutes: 30,
            patientName: '',
            phone: '',
            doctor: DOCTORS[0],
            treatment: '',
            notes: '',
            urgent: false,
            sitCit: '1'
        });
        setIsModalOpen(true);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (editingId !== null) {
            // Edit existing
            setAppointments(prev => prev.map(apt =>
                (typeof apt.id === 'number' ? apt.id : parseInt(apt.id.toString())) === editingId
                    ? { ...apt, ...formData, duration: `${formData.durationMinutes} min` }
                    : apt
            ));
        } else {
            // Add new
            const newApt: Appointment = {
                id: Date.now(),
                ...formData,
                duration: `${formData.durationMinutes} min`,
                status: 'pending'
            };
            setAppointments(prev => [...prev, newApt]);
        }
        setIsModalOpen(false);
        onClearPreselectedPatient();
    };

    const handleDelete = () => {
        if (editingId !== null) {
            setAppointments(prev => prev.filter(apt => (typeof apt.id === 'number' ? apt.id : parseInt(apt.id.toString())) !== editingId));
            setIsModalOpen(false);
        }
    };

    // ============ DRAG & DROP HANDLERS ============

    const handleDragStart = (e: React.DragEvent<HTMLDivElement>, apt: Appointment) => {
        setDraggingId(typeof apt.id === 'number' ? apt.id : parseInt(apt.id.toString()));
        e.dataTransfer.effectAllowed = 'move';
        e.dataTransfer.setData('text/plain', apt.id.toString());

        // Add visual feedback
        if (e.currentTarget) {
            e.currentTarget.style.opacity = '0.5';
        }
    };

    const handleDragEnd = (e: React.DragEvent<HTMLDivElement>) => {
        setDraggingId(null);
        setDragOverTime(null);

        // Reset visual
        if (e.currentTarget) {
            e.currentTarget.style.opacity = '1';
        }
    };

    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'move';

        // Calculate time from mouse position
        if (gridRef.current) {
            const rect = gridRef.current.getBoundingClientRect();
            const y = e.clientY - rect.top + gridRef.current.scrollTop;
            const hour = Math.floor(y / PIXELS_PER_HOUR) + START_HOUR;
            const minutes = Math.round((y % PIXELS_PER_HOUR) / PIXELS_PER_HOUR * 60 / 15) * 15;
            const timeStr = `${hour.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
            setDragOverTime(timeStr);
        }
    };

    const handleDragLeave = () => {
        setDragOverTime(null);
    };

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();

        const aptId = parseInt(e.dataTransfer.getData('text/plain'));

        if (gridRef.current && aptId) {
            const rect = gridRef.current.getBoundingClientRect();
            const y = e.clientY - rect.top + gridRef.current.scrollTop;
            const hour = Math.floor(y / PIXELS_PER_HOUR) + START_HOUR;
            const minutes = Math.round((y % PIXELS_PER_HOUR) / PIXELS_PER_HOUR * 60 / 15) * 15;
            const newTime = `${hour.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;

            // Update appointment time
            setAppointments(prev => prev.map(apt =>
                (typeof apt.id === 'number' ? apt.id : parseInt(apt.id.toString())) === aptId ? { ...apt, time: newTime } : apt
            ));
        }

        setDraggingId(null);
        setDragOverTime(null);
    };

    const dateFormatted = selectedDate.toLocaleDateString('es-ES', {
        weekday: 'long', day: 'numeric', month: 'long', year: 'numeric'
    });

    return (
        <div className="h-full flex flex-col animate-fade-in">
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-brand-blue to-brand-cyan flex items-center justify-center text-white shadow-lg">
                        <Calendar size={28} />
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold text-brand-dark">Agenda</h1>
                        <p className="text-gray-500 text-sm capitalize">{dateFormatted}</p>
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    {/* Drag hint */}
                    <div className="hidden md:flex items-center gap-2 px-3 py-1.5 bg-brand-cyan/10 text-brand-cyan rounded-lg text-xs font-medium">
                        <Move size={14} /> Arrastra citas para cambiar hora
                    </div>

                    {error && (
                        <div className="flex items-center gap-2 px-3 py-1.5 bg-red-50 text-red-600 rounded-lg text-xs font-medium">
                            <AlertCircle size={14} /> {error}
                        </div>
                    )}

                    <button
                        onClick={handleOpenNew}
                        className="flex items-center gap-2 px-5 py-2.5 bg-brand-dark text-white rounded-xl font-bold text-sm hover:bg-brand-blue transition-all shadow-lg"
                    >
                        <Plus size={18} /> Nueva Cita
                    </button>
                </div>
            </div>

            {/* Date Navigation */}
            <div className="flex items-center justify-center gap-4 mb-6">
                <button
                    onClick={() => navigateDay(-1)}
                    className="p-2 rounded-lg bg-white border border-gray-200 hover:bg-gray-50 hover:border-brand-cyan transition-all"
                >
                    <ChevronLeft size={20} className="text-brand-dark" />
                </button>

                <div className="flex gap-2">
                    {[-1, 0, 1, 2, 3].map((offset) => {
                        const d = new Date(selectedDate);
                        d.setDate(selectedDate.getDate() + offset);
                        const isSelected = offset === 0;
                        return (
                            <button
                                key={offset}
                                onClick={() => setSelectedDate(d)}
                                className={`w-14 h-16 rounded-xl flex flex-col items-center justify-center transition-all ${isSelected
                                    ? 'bg-gradient-to-br from-brand-blue to-brand-cyan text-white shadow-lg scale-110'
                                    : 'bg-white border border-gray-200 text-gray-600 hover:border-brand-cyan'
                                    }`}
                            >
                                <span className="text-xs font-medium uppercase">{d.toLocaleDateString('es-ES', { weekday: 'short' })}</span>
                                <span className="text-xl font-bold">{d.getDate()}</span>
                            </button>
                        );
                    })}
                </div>

                <button
                    onClick={() => navigateDay(1)}
                    className="p-2 rounded-lg bg-white border border-gray-200 hover:bg-gray-50 hover:border-brand-cyan transition-all"
                >
                    <ChevronRight size={20} className="text-brand-dark" />
                </button>
            </div>

            {/* Calendar Grid */}
            <div className="flex-1 bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
                {loading ? (
                    <div className="flex items-center justify-center h-full">
                        <RefreshCw className="animate-spin text-brand-cyan" size={32} />
                    </div>
                ) : (
                    <div className="grid grid-cols-[80px_1fr] h-full overflow-auto">
                        {/* Time Column */}
                        <div className="border-r border-gray-100">
                            {HOURS.map((hour) => (
                                <div key={hour} className="h-20 border-b border-gray-50 flex items-start justify-end pr-3 pt-1">
                                    <span className="text-xs font-mono text-gray-400">{hour}</span>
                                </div>
                            ))}
                        </div>

                        {/* Appointments Column */}
                        <div
                            ref={gridRef}
                            className="relative"
                            onDragOver={handleDragOver}
                            onDragLeave={handleDragLeave}
                            onDrop={handleDrop}
                        >
                            {HOURS.map((hour) => (
                                <div
                                    key={hour}
                                    className="h-20 border-b border-gray-50 hover:bg-gray-50/50 cursor-pointer transition-colors"
                                    onClick={() => {
                                        setFormData(prev => ({ ...prev, time: hour, date: selectedDate.toISOString().split('T')[0] }));
                                        handleOpenNew();
                                    }}
                                />
                            ))}

                            {/* Drop indicator line */}
                            {dragOverTime && draggingId && (
                                <div
                                    className="absolute left-0 right-0 h-0.5 bg-brand-cyan z-20 pointer-events-none"
                                    style={{
                                        top: `${(() => {
                                            const [h, m] = dragOverTime.split(':').map(Number);
                                            return ((h - START_HOUR) * PIXELS_PER_HOUR) + ((m / 60) * PIXELS_PER_HOUR);
                                        })()}px`
                                    }}
                                >
                                    <div className="absolute -top-3 left-2 bg-brand-cyan text-white text-[10px] px-2 py-0.5 rounded font-mono">
                                        {dragOverTime}
                                    </div>
                                </div>
                            )}

                            {/* Appointment Cards */}
                            {appointments.map((apt) => {
                                const [h, m] = apt.time.split(':').map(Number);
                                const top = ((h - START_HOUR) * PIXELS_PER_HOUR) + ((m / 60) * PIXELS_PER_HOUR);
                                const height = (apt.durationMinutes / 60) * PIXELS_PER_HOUR;
                                const isDragging = draggingId === (typeof apt.id === 'number' ? apt.id : parseInt(apt.id.toString()));

                                return (
                                    <div
                                        key={apt.id}
                                        draggable
                                        onDragStart={(e) => handleDragStart(e, apt)}
                                        onDragEnd={handleDragEnd}
                                        onClick={(e) => { e.stopPropagation(); handleOpenEdit(apt); }}
                                        style={{
                                            top: `${top}px`,
                                            height: `${Math.max(height, 40)}px`,
                                            cursor: 'grab'
                                        }}
                                        className={`absolute left-2 right-4 p-2 rounded-lg border-l-4 transition-all group ${isDragging
                                            ? 'opacity-50 shadow-2xl scale-105 z-30'
                                            : 'hover:shadow-md hover:scale-[1.02]'
                                            } ${apt.status === 'confirmed'
                                                ? 'bg-gradient-to-r from-green-50 to-white border-brand-lime'
                                                : apt.status === 'completed'
                                                    ? 'bg-gradient-to-r from-blue-50 to-white border-brand-blue'
                                                    : apt.urgent
                                                        ? 'bg-gradient-to-r from-red-50 to-white border-red-500'
                                                        : 'bg-gradient-to-r from-amber-50 to-white border-amber-400'
                                            }`}
                                    >
                                        <div className="flex items-start justify-between">
                                            {/* Drag handle */}
                                            <div className="flex items-start gap-2">
                                                <GripVertical
                                                    size={14}
                                                    className="text-gray-300 group-hover:text-gray-500 mt-0.5 flex-shrink-0 cursor-grab active:cursor-grabbing"
                                                />
                                                <div className="min-w-0">
                                                    <p className="text-sm font-bold text-brand-dark truncate">{apt.patientName}</p>
                                                    <p className="text-xs text-gray-500 truncate">{apt.treatment} • {apt.doctor}</p>
                                                </div>
                                            </div>
                                            <span className="text-[10px] font-mono text-gray-400 flex-shrink-0">{apt.time}</span>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                )}
            </div>

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4">
                    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg animate-fade-in">
                        <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                            <h3 className="text-lg font-bold text-brand-dark flex items-center gap-2">
                                <Calendar size={20} className="text-brand-blue" />
                                {editingId ? 'Editar Cita' : 'Nueva Cita'}
                            </h3>
                            <button
                                onClick={() => { setIsModalOpen(false); onClearPreselectedPatient(); }}
                                className="text-gray-400 hover:text-gray-600 transition-colors"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="p-6 space-y-4">
                            <div className="grid grid-cols-3 gap-4">
                                <div>
                                    <label className="block text-xs font-bold text-gray-500 mb-1">Fecha</label>
                                    <input
                                        type="date"
                                        required
                                        value={formData.date}
                                        onChange={e => setFormData({ ...formData, date: e.target.value })}
                                        className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-gray-500 mb-1">Hora</label>
                                    <input
                                        type="time"
                                        required
                                        value={formData.time}
                                        onChange={e => setFormData({ ...formData, time: e.target.value })}
                                        className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-gray-500 mb-1">Duración (min)</label>
                                    <input
                                        type="number"
                                        min="15"
                                        step="15"
                                        value={formData.durationMinutes}
                                        onChange={e => setFormData({ ...formData, durationMinutes: parseInt(e.target.value) })}
                                        className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-gray-500 mb-1">Paciente</label>
                                <div className="relative">
                                    <User size={16} className="absolute left-3 top-2.5 text-gray-400" />
                                    <input
                                        type="text"
                                        required
                                        placeholder="Nombre completo"
                                        value={formData.patientName}
                                        onChange={e => setFormData({ ...formData, patientName: e.target.value })}
                                        className="w-full border border-gray-300 rounded-lg pl-9 pr-3 py-2 text-sm"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-bold text-gray-500 mb-1">Teléfono</label>
                                    <input
                                        type="tel"
                                        placeholder="600 000 000"
                                        value={formData.phone}
                                        onChange={e => setFormData({ ...formData, phone: e.target.value })}
                                        className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-gray-500 mb-1">Doctor</label>
                                    <select
                                        value={formData.doctor}
                                        onChange={e => setFormData({ ...formData, doctor: e.target.value })}
                                        className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm bg-white"
                                    >
                                        {DOCTORS.map(d => <option key={d} value={d}>{d}</option>)}
                                    </select>
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-gray-500 mb-1">Tratamiento</label>
                                <input
                                    type="text"
                                    placeholder="Ej: Revisión General"
                                    value={formData.treatment}
                                    onChange={e => setFormData({ ...formData, treatment: e.target.value })}
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-bold text-gray-500 mb-1">Estado</label>
                                    <select
                                        value={formData.sitCit}
                                        onChange={e => setFormData({ ...formData, sitCit: e.target.value })}
                                        className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm bg-white font-mono"
                                    >
                                        {Object.entries(SIT_CIT_OPTIONS).map(([k, v]) => <option key={k} value={k}>{k} - {v}</option>)}
                                    </select>
                                </div>
                                <div className="flex items-center pt-6">
                                    <label className="flex items-center gap-2 cursor-pointer">
                                        <input
                                            type="checkbox"
                                            checked={formData.urgent}
                                            onChange={e => setFormData({ ...formData, urgent: e.target.checked })}
                                            className="rounded text-brand-blue focus:ring-brand-blue"
                                        />
                                        <span className="text-sm font-bold text-red-600">Es Urgente</span>
                                    </label>
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-gray-500 mb-1">Notas</label>
                                <textarea
                                    rows={2}
                                    value={formData.notes}
                                    onChange={e => setFormData({ ...formData, notes: e.target.value })}
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm resize-none"
                                />
                            </div>

                            <div className="flex justify-between items-center pt-4 border-t border-gray-100">
                                {editingId ? (
                                    <button
                                        type="button"
                                        onClick={handleDelete}
                                        className="text-red-500 hover:text-red-700 text-sm font-bold flex items-center gap-2"
                                    >
                                        <Trash2 size={16} /> Eliminar
                                    </button>
                                ) : <div></div>}
                                <div className="flex gap-3">
                                    <button
                                        type="button"
                                        onClick={() => { setIsModalOpen(false); onClearPreselectedPatient(); }}
                                        className="px-4 py-2 text-gray-600 font-bold hover:bg-gray-100 rounded-lg text-sm"
                                    >
                                        Cancelar
                                    </button>
                                    <button
                                        type="submit"
                                        className="px-6 py-2 bg-brand-dark text-white font-bold rounded-lg text-sm hover:bg-brand-blue transition-colors flex items-center gap-2"
                                    >
                                        <Save size={16} /> Guardar
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Agenda;
