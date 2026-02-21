import re

with open('components/Sidebar.tsx', 'r') as f:
    content = f.read()

# Add useState import
content = content.replace("import React from 'react';", "import React, { useState } from 'react';")

# Add state to Sidebar component
old_comp_def = "const Sidebar: React.FC<SidebarProps> = ({ activeArea, activeSubArea, onNavigate }) => {\n    const currentMenuItem = navigationItems.find(item => item.name === activeArea);"
new_comp_def = """const Sidebar: React.FC<SidebarProps> = ({ activeArea, activeSubArea, onNavigate }) => {
    const [isHovered, setIsHovered] = useState(false);
    const currentMenuItem = navigationItems.find(item => item.name === activeArea);"""
content = content.replace(old_comp_def, new_comp_def)

# Replace the return block
old_return_pattern = r"(const MainIcon = getIcon\(currentMenuItem\.icon \|\| 'clinic'\);\n\n    return \()([\s\S]+?)(    \);\n};\n\nexport default Sidebar;)"
new_return = """const MainIcon = getIcon(currentMenuItem.icon || 'clinic');

    return (
        <div className="relative h-full flex-shrink-0 z-40 transition-all duration-300 w-[84px]">
            <aside 
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                className={`absolute inset-y-0 left-0 h-full flex flex-col border-r-0 z-40 transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] flex-shrink-0 border-[#051650] overflow-hidden shadow-2xl bg-[#051650] ${isHovered ? 'w-80' : 'w-[84px]'}`}
                style={{
                    backgroundImage: `repeating-linear-gradient(45deg, rgba(255,255,255,0.025) 0, rgba(255,255,255,0.025) 1px, transparent 0, transparent 50%)`,
                    backgroundSize: '10px 10px',
                }}
            >
                {/* Header del Sidebar (Global Actions) */}
                <div className="h-16 flex items-center justify-center px-4 border-b border-white/10 flex-shrink-0">
                    {isHovered ? (
                        <div className="flex w-full gap-2 transition-opacity duration-300 opacity-100 animate-fade-in">
                            <button
                                onClick={() => onNavigate('Pacientes', 'ACTION_SEARCH')}
                                className="flex-1 flex items-center justify-center gap-2 py-2 bg-white/10 hover:bg-white/20 text-white rounded-md border border-white/20 transition-all active:scale-95 group"
                            >
                                <Search className="w-3.5 h-3.5" />
                                <span className="text-[11px] font-bold uppercase tracking-wider">Buscar</span>
                            </button>
                            <button
                                onClick={() => onNavigate('Pacientes', 'ACTION_NEW')}
                                className="flex-1 flex items-center justify-center gap-2 py-2 bg-white text-[#051650] hover:bg-white/90 rounded-md transition-all active:scale-95 group font-black"
                            >
                                <UserPlus className="w-3.5 h-3.5" />
                                <span className="text-[11px] font-bold uppercase tracking-wider">Nuevo</span>
                            </button>
                        </div>
                    ) : (
                        <div className="w-full flex flex-col gap-2 transition-opacity duration-300 opacity-100 animate-fade-in">
                            <button
                                onClick={() => onNavigate('Pacientes', 'ACTION_SEARCH')}
                                title="Buscar"
                                className="w-full flex items-center justify-center py-2 bg-white/10 hover:bg-white/20 text-white rounded-md border border-white/20 transition-all active:scale-95"
                            >
                                <Search className="w-4 h-4" />
                            </button>
                        </div>
                    )}
                </div>

                {/* Scrollable Content */}
                <div className={`flex-1 overflow-y-auto overflow-x-hidden custom-scrollbar ${isHovered ? 'px-4' : 'px-2'} ${isAgenda ? 'py-4' : 'py-6'} flex flex-col ${isAgenda ? 'gap-6' : 'gap-2'}`}>
                    
                    {/* Título del Área */}
                    {currentMenuItem.title && (
                        <div className={`transition-all duration-300 ${isHovered ? 'px-4 pt-3 pb-4 mb-1' : 'px-1 py-1 mb-2 flex flex-col items-center'}`}>
                            {isHovered ? (
                                <div className="animate-fade-in">
                                    <div className="flex items-center gap-3 mb-3 whitespace-nowrap">
                                        <div className="w-9 h-9 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center flex-shrink-0 shadow-inner">
                                            <MainIcon className="w-4.5 h-4.5 text-white" />
                                        </div>
                                        <div className="min-w-0 flex-1">
                                            <p className="text-[9px] font-black text-white/40 uppercase tracking-[0.2em] leading-none mb-0.5">{activeArea}</p>
                                            <h2 className="text-[15px] font-black text-white uppercase tracking-tight leading-tight truncate">{currentMenuItem.title}</h2>
                                        </div>
                                    </div>
                                    <div className="h-px w-full" style={{ background: 'linear-gradient(to right, rgba(255,255,255,0.25), transparent)' }} />
                                </div>
                            ) : (
                                <div className="w-10 h-10 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center flex-shrink-0 shadow-inner animate-fade-in mb-2" title={`${activeArea} - ${currentMenuItem.title}`}>
                                    <MainIcon className="w-5 h-5 text-white" />
                                </div>
                            )}
                        </div>
                    )}

                    {!isAgenda ? (
                        /* NAVEGACIÓN ESTÁNDAR */
                        <nav className="flex flex-col gap-1 w-full">
                            {currentMenuItem.children.map((subItem) => {
                                const SubIcon = getIcon(subItem.icon || 'dashboard');
                                const isActive = activeSubArea === subItem.name;
                                return (
                                    <button
                                        key={subItem.name}
                                        title={subItem.name}
                                        onClick={() => onNavigate(activeArea, subItem.name)}
                                        className={`flex items-center rounded-lg group transition-all duration-200 ${
                                            isHovered ? 'w-full gap-3 px-4 py-2.5 border-l-4' : 'w-12 h-12 justify-center mx-auto border-l-[3px]'
                                        } ${
                                            isActive
                                                ? 'bg-white border-white text-[#051650] shadow-sm'
                                                : 'bg-transparent border-transparent text-white/60 hover:bg-white/8 hover:text-white/90'
                                        }`}
                                    >
                                        <SubIcon className={`flex-shrink-0 ${isHovered ? 'w-4 h-4' : 'w-[18px] h-[18px]'} ${isActive ? 'text-[#051650]' : 'text-white/40 group-hover:text-white/70'}`} />
                                        
                                        {isHovered && (
                                            <div className="flex-1 flex items-center justify-between min-w-0 animate-fade-in">
                                                <span className="text-[13px] font-semibold flex-1 text-left leading-tight truncate">
                                                    {subItem.name}
                                                </span>
                                                {isActive && (
                                                    <ChevronRight className="w-3.5 h-3.5 text-[#051650]/50" />
                                                )}
                                            </div>
                                        )}
                                    </button>
                                );
                            })}
                        </nav>
                    ) : (
                        /* VISTA OPERATIVA (AGENDA) */
                        <>
                            {isHovered ? (
                                <div className="animate-fade-in space-y-6">
                                    {/* WIDGET 1: Producción Hoy */}
                                    <div className="bg-[#0a2150] border border-white/20 p-4 rounded-lg text-white">
                                        <div className="flex justify-between items-start mb-3">
                                            <span className="text-[10px] font-bold uppercase tracking-wider text-white/60">Producción Hoy</span>
                                            <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />
                                        </div>
                                        <div className="flex items-end gap-2">
                                            <span className="text-2xl font-bold tracking-tight text-white">{stats.produccion.actual}€</span>
                                            <span className="text-[9px] font-semibold text-white/50 mb-1">Obj: {stats.produccion.objetivo}€</span>
                                        </div>
                                        <div className="w-full bg-white/20 h-1.5 rounded-full mt-3 overflow-hidden">
                                            <div className="bg-white h-full" style={{ width: `${(stats.produccion.actual / stats.produccion.objetivo) * 100}%` }} />
                                        </div>
                                    </div>

                                    {/* WIDGET 2: Sala de Espera */}
                                    <div>
                                        <div className="flex items-center justify-between mb-2 px-1">
                                            <div className="flex items-center gap-2 text-white/60">
                                                <Clock className="w-3.5 h-3.5" />
                                                <span className="text-[9px] font-bold uppercase tracking-wider">Sala de Espera</span>
                                            </div>
                                            <span className="bg-white text-[#051650] text-[9px] font-black px-1.5 py-0.5 rounded-md">{stats.espera.length}</span>
                                        </div>
                                        <div className="space-y-1.5">
                                            {stats.espera.map((p) => (
                                                <div key={p.id} className="bg-white p-2.5 rounded-lg flex items-center gap-3 hover:bg-slate-50 transition-all cursor-pointer border border-slate-100">
                                                    <div className={`w-9 h-9 rounded-md flex items-center justify-center flex-shrink-0 ${parseInt(p.tiempo) > 10 ? 'bg-red-500/20 text-red-500 border border-red-500/30' : 'bg-emerald-500/20 text-emerald-600 border border-emerald-500/30'}`}>
                                                        <div className="flex flex-col items-center leading-none">
                                                            <span className="text-xs font-bold">{p.tiempo.split(' ')[0]}</span>
                                                            <span className="text-[7px] font-bold uppercase">min</span>
                                                        </div>
                                                    </div>
                                                    <div className="flex-1 min-w-0">
                                                        <p className="text-[12px] font-bold text-slate-800 truncate leading-tight">{p.nombre}</p>
                                                        <div className="flex items-center gap-1.5 mt-0.5">
                                                            <span className="text-[9px] font-semibold text-slate-500 uppercase tracking-wide truncate">{p.trat}</span>
                                                            {p.alerta === "Látex" && <span className="w-1.5 h-1.5 bg-red-400 rounded-full"></span>}
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* WIDGET 3: En Gabinete */}
                                    <div>
                                        <div className="flex items-center justify-between mb-3 px-1 mt-2">
                                            <div className="flex items-center gap-2 text-white/60">
                                                <Activity className="w-3.5 h-3.5" />
                                                <span className="text-[10px] font-black uppercase tracking-widest">En Gabinete</span>
                                            </div>
                                            <span className="bg-white text-[#051650] text-[10px] font-black px-1.5 py-0.5 rounded-md">1</span>
                                        </div>
                                        <div className="bg-white border-l-4 border-l-[#051650] border border-slate-200 p-3 rounded-lg flex items-center gap-3 hover:bg-slate-50 transition-all cursor-pointer">
                                            <div className="w-10 h-10 rounded-lg bg-[#051650] text-white flex items-center justify-center flex-shrink-0 font-black text-sm">
                                                G1
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className="text-xs font-bold text-slate-800 truncate leading-tight">Maria Carmen</p>
                                                <span className="text-[9px] font-bold text-slate-500 uppercase tracking-wide">Dr. Pérez • 35 min</span>
                                            </div>
                                            <span className="w-2 h-2 rounded-full bg-orange-400 shadow-[0_0_8px_rgba(251,146,60,0.5)]"></span>
                                        </div>
                                    </div>

                                    {/* WIDGET 4: Lista de Espera */}
                                    <div>
                                        <div className="flex items-center justify-between mb-3 px-1 mt-2">
                                            <div className="flex items-center gap-2 text-white/60">
                                                <ClipboardList className="w-3.5 h-3.5" />
                                                <span className="text-[10px] font-black uppercase tracking-widest">Lista Espera</span>
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            {stats.waitlist.map((w) => (
                                                <div
                                                    key={w.id}
                                                    draggable
                                                    className="bg-white border border-slate-200 p-3 rounded-lg flex items-center justify-between hover:bg-slate-50 transition-all cursor-grab active:cursor-grabbing group"
                                                    onDragStart={(e) => {
                                                        e.dataTransfer.setData("text/plain", JSON.stringify({ nombre: w.nombre, tratamiento: w.trat, fromWaitlist: true }));
                                                    }}
                                                >
                                                    <div className="flex flex-col min-w-0">
                                                        <span className="text-xs font-bold text-slate-800 truncate">{w.nombre}</span>
                                                        <div className="flex items-center gap-1.5 mt-0.5">
                                                            <span className={`w-1.5 h-1.5 rounded-full ${w.urgencia === 'Alta' ? 'bg-red-400' : 'bg-blue-400'}`}></span>
                                                            <span className="text-[9px] font-bold text-slate-500 uppercase tracking-wide">{w.trat}</span>
                                                        </div>
                                                    </div>
                                                    <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-slate-700" />
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <div className="flex flex-col items-center gap-4 animate-fade-in pt-4">
                                    <div className="w-11 h-11 rounded-xl bg-[#0a2150] border border-emerald-500/30 flex flex-col items-center justify-center text-white" title={`Producción Hoy: ${stats.produccion.actual}€`}>
                                        <TrendingUp className="w-4 h-4 text-emerald-400 mb-0.5" />
                                        <span className="text-[8px] font-bold">{stats.produccion.actual}€</span>
                                    </div>
                                    <div className="w-11 h-11 rounded-xl bg-white/10 flex flex-col items-center justify-center text-white relative shadow-inner" title={`Sala de Espera: ${stats.espera.length} pacientes`}>
                                        <Clock className="w-[18px] h-[18px] text-white/80" />
                                        <span className="absolute -top-1 -right-1 bg-white text-[#051650] text-[9px] font-black w-4.5 h-4.5 rounded-full flex items-center justify-center shadow-lg">{stats.espera.length}</span>
                                    </div>
                                    <div className="w-11 h-11 rounded-xl bg-white/10 flex flex-col items-center justify-center text-white relative shadow-inner" title="En Gabinete: 1 paciente">
                                        <Activity className="w-[18px] h-[18px] text-orange-400" />
                                        <span className="absolute -top-1 -right-1 bg-white text-[#051650] text-[9px] font-black w-4.5 h-4.5 rounded-full flex items-center justify-center shadow-lg">1</span>
                                    </div>
                                    <div className="w-11 h-11 rounded-xl bg-white/10 flex flex-col items-center justify-center text-white relative shadow-inner mt-2" title={`Lista Espera: ${stats.waitlist.length} pct`}>
                                        <ClipboardList className="w-[18px] h-[18px] text-white/80" />
                                        <span className="absolute -top-1 -right-1 bg-white text-[#051650] text-[9px] font-black w-4.5 h-4.5 rounded-full flex items-center justify-center shadow-lg">{stats.waitlist.length}</span>
                                    </div>
                                </div>
                            )}
                        </>
                    )}
                </div>

                {/* ACCIONES RÁPIDAS GLOBALES */}
                <div className={`p-3 border-t border-white/10 transition-all duration-300 mt-auto ${isHovered ? 'grid grid-cols-2 gap-2' : 'flex flex-col gap-2 items-center'}`}>
                    {isHovered ? (
                        <>
                            <button className="flex items-center justify-center gap-2 py-2 bg-[#0a2150] hover:bg-[#0d2760] text-white rounded-md border border-[#1a3a7a] transition-all active:scale-95 animate-fade-in">
                                <PlusCircle className="w-4 h-4" />
                                <span className="text-[10px] font-bold uppercase tracking-wider">Cita</span>
                            </button>
                            <button className="flex items-center justify-center gap-2 py-2 bg-red-700 hover:bg-red-600 text-white rounded-md border border-red-800 transition-all active:scale-95 animate-fade-in">
                                <AlertTriangle className="w-4 h-4" />
                                <span className="text-[10px] font-bold uppercase tracking-wider">Urgente</span>
                            </button>
                        </>
                    ) : (
                        <>
                            <button className="w-11 h-11 flex items-center justify-center bg-[#0a2150] hover:bg-[#0d2760] text-white rounded-xl border border-[#1a3a7a] transition-all active:scale-95 animate-fade-in shadow-inner" title="Nueva Cita">
                                <PlusCircle className="w-[18px] h-[18px]" />
                            </button>
                            <button className="w-11 h-11 flex items-center justify-center bg-red-700/80 hover:bg-red-600 text-white rounded-xl border border-red-800 transition-all active:scale-95 animate-fade-in shadow-inner" title="Urgencia">
                                <AlertTriangle className="w-[18px] h-[18px]" />
                            </button>
                        </>
                    )}
                </div>
            </aside>
        </div>
    );
};

export default Sidebar;"""

content = re.sub(old_return_pattern, new_return, content)

with open('components/Sidebar.tsx', 'w') as f:
    f.write(content)

