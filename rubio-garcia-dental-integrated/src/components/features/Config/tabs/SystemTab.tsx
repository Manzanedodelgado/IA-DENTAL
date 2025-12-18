import React from 'react';
import { Database, Bot, MessageCircle } from 'lucide-react';

export const SystemTab: React.FC = () => {
    return (
        <div className="animate-in fade-in max-w-2xl">
            <h2 className="text-lg font-bold text-brand-dark mb-6">Estado del Sistema</h2>

            <div className="space-y-4">
                {/* Database Connection */}
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border border-gray-200">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-brand-lime/20 text-brand-dark flex items-center justify-center">
                            <Database size={24} />
                        </div>
                        <div>
                            <p className="font-bold text-brand-dark">Base de Datos SQL Server</p>
                            <p className="text-xs text-gray-500">GABINETE2\INFOMED - GELITE</p>
                        </div>
                    </div>
                    <span className="flex items-center gap-2 px-3 py-1.5 bg-brand-lime/20 text-brand-dark rounded-full text-xs font-bold">
                        <span className="w-2 h-2 rounded-full bg-brand-lime animate-pulse" />
                        Conectado
                    </span>
                </div>

                {/* AI Connection */}
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border border-gray-200">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-brand-lime/30 text-brand-dark flex items-center justify-center">
                            <Bot size={24} />
                        </div>
                        <div>
                            <p className="font-bold text-brand-dark">IA Dental (Gemini)</p>
                            <p className="text-xs text-gray-500">gemini-2.5-flash</p>
                        </div>
                    </div>
                    <span className="flex items-center gap-2 px-3 py-1.5 bg-brand-lime/20 text-brand-dark rounded-full text-xs font-bold">
                        <span className="w-2 h-2 rounded-full bg-brand-lime animate-pulse" />
                        Activo
                    </span>
                </div>

                {/* WhatsApp Connection */}
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border border-gray-200">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-brand-lime/20 text-brand-dark flex items-center justify-center">
                            <MessageCircle size={24} />
                        </div>
                        <div>
                            <p className="font-bold text-brand-dark">WhatsApp Business</p>
                            <p className="text-xs text-gray-500">+34 91 123 45 67</p>
                        </div>
                    </div>
                    <span className="flex items-center gap-2 px-3 py-1.5 bg-yellow-100 text-yellow-700 rounded-full text-xs font-bold">
                        <span className="w-2 h-2 rounded-full bg-yellow-500" />
                        Pendiente QR
                    </span>
                </div>
            </div>

            {/* Version Info */}
            <div className="mt-8 p-4 bg-gray-50 rounded-xl border border-dashed border-gray-300">
                <p className="text-xs text-gray-500 text-center">
                    <strong>Rubio García Dental App</strong> v1.0.0 • IA Dental v3.0 Beta<br />
                    © 2025 TRIDENTAL ODONTOLOGOS SLP
                </p>
            </div>
        </div>
    );
};
