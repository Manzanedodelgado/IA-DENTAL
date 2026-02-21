import React, { useState } from 'react';

const ConfiguracionAgenda: React.FC = () => {
    const [doctorActivo, setDoctorActivo] = useState('Dr. Pablo García');
    
    const doctores = [
        { id: 1, nombre: 'Dr. Pablo García', especialidad: 'Implantología', color: '#003a70' },
        { id: 2, nombre: 'Dra. Elena Rubio', especialidad: 'Ortodoncia', color: '#009fe3' },
        { id: 3, nombre: 'Dra. Sofía Marín', especialidad: 'Estética', color: '#10b981' }
    ];

    const horariosBase = [
        { dia: 'Lunes', mañana: '09:00 - 14:00', tarde: '16:00 - 20:00', activo: true },
        { dia: 'Martes', mañana: '09:00 - 14:00', tarde: '16:00 - 20:00', activo: true },
        { dia: 'Miércoles', mañana: '09:00 - 14:00', tarde: '16:00 - 20:00', activo: true },
        { dia: 'Jueves', mañana: '09:00 - 14:00', tarde: '16:00 - 20:00', activo: true },
        { dia: 'Viernes', mañana: '09:00 - 15:00', tarde: 'Cerrado', activo: true },
        { dia: 'Sábado', mañana: 'Cerrado', tarde: 'Cerrado', activo: false },
        { dia: 'Domingo', mañana: 'Cerrado', tarde: 'Cerrado', activo: false },
    ];

    const tratamientos = [
        { nombre: 'Primera Visita', tiempo: 20, color: 'bg-blue-100 text-blue-700' },
        { nombre: 'Limpieza Dental', tiempo: 30, color: 'bg-green-100 text-green-700' },
        { nombre: 'Obturación Simple', tiempo: 45, color: 'bg-purple-100 text-purple-700' },
        { nombre: 'Cirugía Compleja', tiempo: 90, color: 'bg-red-100 text-red-700' },
        { nombre: 'Revisión Ortodoncia', tiempo: 15, color: 'bg-orange-100 text-orange-700' },
    ];

    return (
        <div className="animate-fade-in space-y-6 pb-20">
            {/* SELECTOR DE DOCTOR */}
            <div className="flex flex-wrap items-center gap-3">
                {doctores.map(doc => (
                    <button
                        key={doc.id}
                        onClick={() => setDoctorActivo(doc.nombre)}
                        className={`px-5 py-3 rounded-2xl flex items-center gap-3 transition-all border ${
                            doctorActivo === doc.nombre
                                ? 'bg-secondary text-white border-secondary shadow-lg shadow-secondary/20'
                                : 'bg-white text-slate-500 border-slate-100 hover:border-secondary/30'
                        }`}
                    >
                        <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center font-black text-xs">
                            {doc.nombre.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div className="text-left">
                            <p className="text-[11px] font-black uppercase tracking-tighter leading-none">{doc.nombre}</p>
                            <p className={`text-[9px] font-bold opacity-70 mt-0.5 ${doctorActivo === doc.nombre ? 'text-white' : 'text-slate-400'}`}>{doc.especialidad}</p>
                        </div>
                    </button>
                ))}
                <button className="w-12 h-12 rounded-2xl border-2 border-dashed border-slate-200 text-slate-400 hover:border-secondary hover:text-secondary transition-all flex items-center justify-center">
                    <span className="material-icons">add</span>
                </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                
                {/* HORARIOS SEMANALES */}
                <div className="lg:col-span-8 space-y-6">
                    <section className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-100 dark:border-slate-800 shadow-xl">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-sm font-black text-primary dark:text-white uppercase tracking-widest flex items-center gap-2">
                                <span className="material-icons text-secondary">schedule</span>
                                Horario Base Semanal
                            </h3>
                            <button className="text-[10px] font-black text-secondary uppercase hover:underline">Replicar en Gabinetes</button>
                        </div>
                        <div className="space-y-3">
                            {horariosBase.map(h => (
                                <div key={h.dia} className={`flex items-center gap-4 p-4 rounded-2xl border transition-all ${h.activo ? 'bg-slate-50 border-slate-100' : 'bg-slate-50/50 border-transparent opacity-50'}`}>
                                    <div className="w-24 text-xs font-black text-slate-600 uppercase tracking-tighter">{h.dia}</div>
                                    <div className="flex-1 grid grid-cols-2 gap-4">
                                        <div className="flex items-center gap-3 bg-white p-2.5 rounded-xl border border-slate-200">
                                            <span className="material-icons text-slate-300 text-sm">wb_sunny</span>
                                            <input type="text" defaultValue={h.mañana} className="bg-transparent text-[11px] font-bold w-full focus:outline-none" />
                                        </div>
                                        <div className="flex items-center gap-3 bg-white p-2.5 rounded-xl border border-slate-200">
                                            <span className="material-icons text-slate-300 text-sm">dark_mode</span>
                                            <input type="text" defaultValue={h.tarde} className="bg-transparent text-[11px] font-bold w-full focus:outline-none" />
                                        </div>
                                    </div>
                                    <button className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${h.activo ? 'bg-secondary/10 text-secondary' : 'bg-slate-200 text-slate-400'}`}>
                                        <span className="material-icons text-lg">{h.activo ? 'check_circle' : 'do_not_disturb_on'}</span>
                                    </button>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* BLOQUEOS Y EXCEPCIONES */}
                    <section className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-100 dark:border-slate-800 shadow-xl">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-sm font-black text-primary dark:text-white uppercase tracking-widest flex items-center gap-2">
                                <span className="material-icons text-red-500">event_busy</span>
                                Bloqueos y Aperturas Especiales
                            </h3>
                            <button className="bg-primary text-white text-[9px] font-black px-4 py-2 rounded-xl uppercase tracking-widest shadow-lg shadow-primary/20">Añadir Excepción</button>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="border border-red-100 bg-red-50/30 p-4 rounded-2xl flex items-center gap-4">
                                <div className="p-3 bg-red-100 text-red-600 rounded-xl font-black text-center leading-tight">
                                    <span className="block text-xs">OCT</span>
                                    <span className="text-xl">12</span>
                                </div>
                                <div className="flex-1">
                                    <p className="text-[11px] font-black text-slate-800">Festivo Nacional</p>
                                    <p className="text-[9px] font-bold text-slate-400 uppercase tracking-tighter">Agenda Cerrada Todo el día</p>
                                </div>
                                <button className="material-icons text-slate-300 hover:text-red-500">delete</button>
                            </div>
                            <div className="border border-green-100 bg-green-50/30 p-4 rounded-2xl flex items-center gap-4">
                                <div className="p-3 bg-green-100 text-green-600 rounded-xl font-black text-center leading-tight">
                                    <span className="block text-xs">OCT</span>
                                    <span className="text-xl">14</span>
                                </div>
                                <div className="flex-1">
                                    <p className="text-[11px] font-black text-slate-800">Apertura Sábado</p>
                                    <p className="text-[9px] font-bold text-slate-400 uppercase tracking-tighter">09:00 - 14:00 (Urgencias)</p>
                                </div>
                                <button className="material-icons text-slate-300 hover:text-red-500">delete</button>
                            </div>
                        </div>
                    </section>
                </div>

                {/* TRATAMIENTOS Y TIEMPOS */}
                <div className="lg:col-span-4 space-y-6">
                    <section className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-100 dark:border-slate-800 shadow-xl h-full">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-sm font-black text-primary dark:text-white uppercase tracking-widest flex items-center gap-2">
                                <span className="material-icons text-secondary">timer</span>
                                Tiempos Estimados
                            </h3>
                        </div>
                        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-tighter mb-6">Duración personalizada por doctor para optimizar la agenda.</p>
                        <div className="space-y-2">
                            {tratamientos.map((t, idx) => (
                                <div key={idx} className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-100 group hover:border-secondary/50 transition-all">
                                    <div className="flex flex-col">
                                        <span className="text-[11px] font-black text-slate-700 leading-tight">{t.nombre}</span>
                                        <span className={`text-[8px] font-black uppercase tracking-tighter mt-0.5 px-1.5 py-0.5 rounded-full ${t.color} inline-block self-start`}>Categoría</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <input type="number" defaultValue={t.tiempo} className="w-12 bg-white border border-slate-200 rounded-lg text-center font-black text-xs py-1" />
                                        <span className="text-[9px] font-black text-slate-400 uppercase tracking-tighter">min</span>
                                    </div>
                                </div>
                            ))}
                            <button className="w-full py-4 mt-4 border-2 border-dashed border-slate-200 rounded-2xl text-slate-400 font-black text-[10px] uppercase tracking-widest hover:border-secondary hover:text-secondary transition-all">
                                + Nuevo Tratamiento
                            </button>
                        </div>
                    </section>
                </div>

            </div>

            {/* BOTÓN GUARDAR FLOTANTE */}
            <div className="fixed bottom-8 right-12">
                <button className="bg-secondary text-white px-8 py-4 rounded-2xl font-black uppercase tracking-widest shadow-2xl shadow-secondary/40 flex items-center gap-3 hover:-translate-y-1 transition-all active:scale-95">
                    <span className="material-icons">save</span>
                    Guardar Configuración
                </button>
            </div>
        </div>
    );
};

export default ConfiguracionAgenda;