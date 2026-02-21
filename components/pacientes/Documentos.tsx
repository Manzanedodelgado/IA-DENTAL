
import React, { useState } from 'react';

interface Documento {
    id: string;
    titulo: string;
    tipo: 'RGPD' | 'Consentimiento' | 'Presupuesto' | 'Instrucciones';
    fechaCreacion: string;
    estado: 'Pendiente' | 'Firmado' | 'Caducado';
    firmante?: string;
    fechaFirma?: string;
}

interface DocumentosProps {
    onDocumentSigned: () => void;
}

const TEMPLATES = [
    { id: 'tpl_rgpd', titulo: 'Protección de Datos (RGPD)', tipo: 'RGPD' },
    { id: 'tpl_cirugia', titulo: 'Consentimiento Informado - Cirugía Oral', tipo: 'Consentimiento' },
    { id: 'tpl_implantes', titulo: 'Consentimiento Informado - Implantología', tipo: 'Consentimiento' },
    { id: 'tpl_postop', titulo: 'Instrucciones Post-Operatorias', tipo: 'Instrucciones' },
];

const MOCK_DOCS: Documento[] = [
    { id: 'doc_1', titulo: 'Protección de Datos (RGPD)', tipo: 'RGPD', fechaCreacion: '10 Oct 2023', estado: 'Firmado', firmante: 'Bárbara Ruiz', fechaFirma: '10 Oct 2023 10:00' },
    { id: 'doc_2', titulo: 'Consentimiento Informado - Cirugía Oral', tipo: 'Consentimiento', fechaCreacion: '20 Oct 2024', estado: 'Pendiente' },
];

const Documentos: React.FC<DocumentosProps> = ({ onDocumentSigned }) => {
    const [docs, setDocs] = useState<Documento[]>(MOCK_DOCS);
    const [activeTab, setActiveTab] = useState<'pendientes' | 'historial' | 'generar'>('pendientes');
    const [signingDoc, setSigningDoc] = useState<Documento | null>(null);
    const [showSuccess, setShowSuccess] = useState(false);

    // Firma Mock
    const handleSign = () => {
        if (!signingDoc) return;
        
        const updatedDocs = docs.map(d => 
            d.id === signingDoc.id 
                ? { ...d, estado: 'Firmado' as const, fechaFirma: new Date().toLocaleString(), firmante: 'Bárbara Ruiz (Biométrico)' } 
                : d
        );
        
        setDocs(updatedDocs);
        setSigningDoc(null);
        setShowSuccess(true);
        setTimeout(() => setShowSuccess(false), 3000);
        onDocumentSigned(); // Callback to update Patient Status
    };

    const handleGenerate = (template: typeof TEMPLATES[0]) => {
        const newDoc: Documento = {
            id: `doc_${Date.now()}`,
            titulo: template.titulo,
            tipo: template.tipo as any,
            fechaCreacion: new Date().toLocaleDateString(),
            estado: 'Pendiente'
        };
        setDocs([newDoc, ...docs]);
        setActiveTab('pendientes');
    };

    const pendientes = docs.filter(d => d.estado === 'Pendiente');
    const historial = docs.filter(d => d.estado !== 'Pendiente');

    return (
        <div className="space-y-6 pb-20 animate-fade-in relative">
            
            {/* Success Toast Local */}
            {showSuccess && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 bg-green-500 text-white px-6 py-3 rounded-full shadow-xl z-50 flex items-center gap-2 animate-fade-in">
                    <span className="material-icons">verified</span>
                    <span className="text-sm font-black uppercase">Documento Firmado Correctamente</span>
                </div>
            )}

            {/* Header */}
            <div className="flex justify-between items-center">
                <div className="flex bg-white dark:bg-slate-900 p-1 rounded-xl border border-slate-100 dark:border-slate-800 shadow-sm">
                    <button 
                        onClick={() => setActiveTab('pendientes')}
                        className={`px-4 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all flex items-center gap-2 ${activeTab === 'pendientes' ? 'bg-primary text-white shadow-md' : 'text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'}`}
                    >
                        Pendientes
                        {pendientes.length > 0 && <span className="bg-red-500 text-white w-4 h-4 rounded-full flex items-center justify-center text-[8px]">{pendientes.length}</span>}
                    </button>
                    <button 
                        onClick={() => setActiveTab('historial')}
                        className={`px-4 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === 'historial' ? 'bg-primary text-white shadow-md' : 'text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'}`}
                    >
                        Historial
                    </button>
                    <button 
                        onClick={() => setActiveTab('generar')}
                        className={`px-4 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === 'generar' ? 'bg-primary text-white shadow-md' : 'text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'}`}
                    >
                        + Nuevo
                    </button>
                </div>
                
                <div className="hidden md:flex items-center gap-2 text-[10px] text-slate-400 font-medium">
                    <span className="material-icons text-base">security</span>
                    Almacenamiento Seguro (AES-256)
                </div>
            </div>

            {/* VISTA: PENDIENTES */}
            {activeTab === 'pendientes' && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {pendientes.length === 0 ? (
                        <div className="col-span-full py-12 flex flex-col items-center justify-center text-slate-300 border-2 border-dashed border-slate-100 rounded-2xl">
                            <span className="material-icons text-4xl mb-2">assignment_turned_in</span>
                            <p className="text-xs font-black uppercase">Todo en orden</p>
                        </div>
                    ) : (
                        pendientes.map(doc => (
                            <div key={doc.id} className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm relative overflow-hidden group hover:shadow-md transition-all">
                                <div className="absolute top-0 left-0 w-1 h-full bg-orange-400"></div>
                                <div className="flex justify-between items-start mb-4">
                                    <div className="w-10 h-10 rounded-lg bg-orange-50 text-orange-600 flex items-center justify-center">
                                        <span className="material-icons">description</span>
                                    </div>
                                    <span className="px-2 py-1 bg-orange-100 text-orange-700 text-[8px] font-black uppercase rounded border border-orange-200">
                                        Pendiente
                                    </span>
                                </div>
                                <h3 className="font-bold text-slate-800 dark:text-white text-sm mb-1">{doc.titulo}</h3>
                                <p className="text-[10px] text-slate-400 font-mono mb-4">Creado: {doc.fechaCreacion}</p>
                                
                                <div className="flex gap-2">
                                    <button 
                                        onClick={() => setSigningDoc(doc)}
                                        className="flex-1 py-2 bg-secondary text-white rounded-lg text-[9px] font-black uppercase shadow-lg shadow-secondary/20 hover:brightness-110 active:scale-95 transition-all flex items-center justify-center gap-2"
                                    >
                                        <span className="material-icons text-sm">draw</span> Firmar Ahora
                                    </button>
                                    <button className="px-3 py-2 border border-slate-200 rounded-lg text-slate-400 hover:text-primary hover:border-primary transition-all">
                                        <span className="material-icons text-sm">send_to_mobile</span>
                                    </button>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            )}

            {/* VISTA: HISTORIAL */}
            {activeTab === 'historial' && (
                <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm overflow-hidden">
                    <table className="w-full text-left">
                        <thead className="bg-slate-50 dark:bg-slate-800 text-[9px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-100 dark:border-slate-700">
                            <tr>
                                <th className="p-4">Documento</th>
                                <th className="p-4">Fecha Firma</th>
                                <th className="p-4">Firmante</th>
                                <th className="p-4 text-center">Estado</th>
                                <th className="p-4 text-center">Acciones</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50 dark:divide-slate-800 text-xs">
                            {historial.map(doc => (
                                <tr key={doc.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                                    <td className="p-4 font-bold text-slate-700 dark:text-slate-200">{doc.titulo}</td>
                                    <td className="p-4 font-mono text-slate-500">{doc.fechaFirma}</td>
                                    <td className="p-4 text-slate-600">{doc.firmante}</td>
                                    <td className="p-4 text-center">
                                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-green-50 text-green-700 text-[9px] font-black uppercase border border-green-100">
                                            <span className="material-icons text-[10px]">verified</span> Valido
                                        </span>
                                    </td>
                                    <td className="p-4 text-center">
                                        <button className="text-secondary hover:text-secondary-dark font-black text-[9px] uppercase hover:underline">
                                            Ver PDF
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {/* VISTA: GENERAR */}
            {activeTab === 'generar' && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {TEMPLATES.map(tpl => (
                        <div key={tpl.id} className="border border-slate-200 dark:border-slate-700 rounded-xl p-4 hover:border-secondary hover:shadow-md transition-all cursor-pointer bg-white dark:bg-slate-900 group" onClick={() => handleGenerate(tpl)}>
                            <div className="w-12 h-12 rounded-lg bg-slate-50 dark:bg-slate-800 text-slate-400 group-hover:bg-secondary group-hover:text-white flex items-center justify-center mb-3 transition-colors">
                                <span className="material-icons text-2xl">post_add</span>
                            </div>
                            <h4 className="font-bold text-slate-800 dark:text-white text-sm">{tpl.titulo}</h4>
                            <p className="text-[10px] text-slate-400 mt-1 uppercase tracking-widest">{tpl.tipo}</p>
                        </div>
                    ))}
                </div>
            )}

            {/* MODAL DE FIRMA */}
            {signingDoc && (
                <div className="fixed inset-0 z-[6000] bg-slate-900/80 backdrop-blur-sm flex items-center justify-center p-4">
                    <div className="bg-white dark:bg-slate-900 w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden animate-fade-in">
                        <div className="p-4 bg-slate-50 dark:bg-slate-800 border-b border-slate-100 dark:border-slate-700 flex justify-between items-center">
                            <h3 className="font-black text-slate-800 dark:text-white text-sm uppercase">Firmando: {signingDoc.titulo}</h3>
                            <button onClick={() => setSigningDoc(null)} className="p-1 hover:bg-slate-200 rounded-full"><span className="material-icons text-sm">close</span></button>
                        </div>
                        <div className="p-6">
                            <div className="bg-slate-50 border-2 border-dashed border-slate-200 rounded-xl h-48 flex items-center justify-center relative cursor-crosshair hover:bg-slate-100 transition-colors" onClick={handleSign}>
                                <p className="text-slate-300 font-bold uppercase tracking-widest pointer-events-none">Haga clic para simular firma</p>
                                <span className="material-icons text-6xl text-slate-200 absolute opacity-20">draw</span>
                            </div>
                            <div className="mt-4 flex items-center gap-2">
                                <input type="checkbox" id="consent" className="w-4 h-4 text-secondary rounded focus:ring-secondary" defaultChecked />
                                <label htmlFor="consent" className="text-xs text-slate-500">He leído y acepto los términos legales del documento.</label>
                            </div>
                            <div className="mt-6 flex gap-3">
                                <button onClick={() => setSigningDoc(null)} className="flex-1 py-3 border border-slate-200 rounded-xl text-xs font-bold text-slate-500 hover:bg-slate-50">Cancelar</button>
                                <button onClick={handleSign} className="flex-1 py-3 bg-primary text-white rounded-xl text-xs font-black uppercase shadow-lg hover:bg-primary-dark">Confirmar Firma</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

        </div>
    );
};

export default Documentos;
