import React from 'react';
import { Mic, Save, Volume2, Play, Pause } from 'lucide-react';
import { VoiceConfig } from '../../../../types';

const AVAILABLE_VOICES = [
    { name: 'Lucía', gender: 'female', accent: 'es-ES' },
    { name: 'Jorge', gender: 'male', accent: 'es-ES' },
    { name: 'María', gender: 'female', accent: 'es-MX' },
    { name: 'Carlos', gender: 'male', accent: 'es-MX' },
];

interface VoiceTabProps {
    voiceConfig: VoiceConfig;
    setVoiceConfig: React.Dispatch<React.SetStateAction<VoiceConfig>>;
    isPlaying: boolean;
    onTest: () => void;
}

export const VoiceTab: React.FC<VoiceTabProps> = ({
    voiceConfig,
    setVoiceConfig,
    isPlaying,
    onTest
}) => {
    return (
        <div className="flex-1 overflow-y-auto p-6 bg-gray-50/50">
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h2 className="text-lg font-bold text-brand-dark flex items-center gap-2">
                        <Mic className="text-brand-cyan" size={20} /> Configuración de Voz
                    </h2>
                    <p className="text-xs text-gray-500">Personaliza cómo suena IA Dental al hablar con los pacientes</p>
                </div>
                <button className="px-4 py-2 bg-brand-dark text-white rounded-lg text-sm font-bold flex items-center gap-2 hover:bg-brand-blue transition-colors">
                    <Save size={16} /> Guardar
                </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Voice Selection */}
                <div className="bg-white rounded-xl border border-gray-200 p-6">
                    <h3 className="font-bold text-brand-dark mb-4">Voz del Asistente</h3>
                    <div className="grid grid-cols-2 gap-3">
                        {AVAILABLE_VOICES.map(voice => (
                            <button
                                key={voice.name}
                                onClick={() => setVoiceConfig(prev => ({ ...prev, voiceName: voice.name, accent: voice.accent as any }))}
                                className={`p-4 rounded-xl border-2 text-left transition-all ${voiceConfig.voiceName === voice.name
                                        ? 'border-brand-cyan bg-brand-cyan/5'
                                        : 'border-gray-200 hover:border-gray-300'
                                    }`}
                            >
                                <div className="flex items-center gap-3">
                                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${voice.gender === 'female' ? 'bg-pink-100 text-pink-600' : 'bg-blue-100 text-blue-600'
                                        }`}>
                                        <Volume2 size={18} />
                                    </div>
                                    <div>
                                        <p className="font-bold text-brand-dark">{voice.name}</p>
                                        <p className="text-xs text-gray-500">{voice.accent}</p>
                                    </div>
                                </div>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Voice Parameters */}
                <div className="bg-white rounded-xl border border-gray-200 p-6">
                    <h3 className="font-bold text-brand-dark mb-4">Parámetros de Voz</h3>
                    <div className="space-y-6">
                        {/* Speed */}
                        <div>
                            <div className="flex justify-between text-sm mb-2">
                                <span className="font-medium text-gray-700">Velocidad</span>
                                <span className="text-brand-cyan font-bold">{voiceConfig.speed.toFixed(1)}x</span>
                            </div>
                            <input
                                type="range"
                                min="0.5"
                                max="2"
                                step="0.1"
                                value={voiceConfig.speed}
                                onChange={e => setVoiceConfig(prev => ({ ...prev, speed: parseFloat(e.target.value) }))}
                                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-brand-cyan"
                            />
                            <div className="flex justify-between text-xs text-gray-400 mt-1">
                                <span>Lento</span>
                                <span>Rápido</span>
                            </div>
                        </div>

                        {/* Pitch */}
                        <div>
                            <div className="flex justify-between text-sm mb-2">
                                <span className="font-medium text-gray-700">Tono</span>
                                <span className="text-brand-cyan font-bold">{voiceConfig.pitch.toFixed(1)}</span>
                            </div>
                            <input
                                type="range"
                                min="0.5"
                                max="2"
                                step="0.1"
                                value={voiceConfig.pitch}
                                onChange={e => setVoiceConfig(prev => ({ ...prev, pitch: parseFloat(e.target.value) }))}
                                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-brand-cyan"
                            />
                            <div className="flex justify-between text-xs text-gray-400 mt-1">
                                <span>Grave</span>
                                <span>Agudo</span>
                            </div>
                        </div>

                        {/* Pause Duration */}
                        <div>
                            <div className="flex justify-between text-sm mb-2">
                                <span className="font-medium text-gray-700">Duración de Pausas</span>
                                <span className="text-brand-cyan font-bold">{voiceConfig.pauseDuration}ms</span>
                            </div>
                            <input
                                type="range"
                                min="200"
                                max="1000"
                                step="100"
                                value={voiceConfig.pauseDuration}
                                onChange={e => setVoiceConfig(prev => ({ ...prev, pauseDuration: parseInt(e.target.value) }))}
                                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-brand-cyan"
                            />
                            <div className="flex justify-between text-xs text-gray-400 mt-1">
                                <span>Corta</span>
                                <span>Larga</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Test Voice */}
            <div className="mt-6 bg-gradient-to-r from-brand-dark to-brand-blue rounded-xl p-6 text-white">
                <div className="flex items-center justify-between">
                    <div>
                        <h3 className="font-bold text-lg">Probar Voz</h3>
                        <p className="text-white/70 text-sm">Escucha cómo suena la configuración actual</p>
                    </div>
                    <button
                        onClick={onTest}
                        disabled={isPlaying}
                        className="px-6 py-3 bg-white text-brand-dark rounded-xl font-bold flex items-center gap-2 hover:bg-brand-lime transition-colors"
                    >
                        {isPlaying ? (
                            <>
                                <Pause size={18} /> Reproduciendo...
                            </>
                        ) : (
                            <>
                                <Play size={18} /> Reproducir Ejemplo
                            </>
                        )}
                    </button>
                </div>
                {isPlaying && (
                    <div className="mt-4 bg-white/10 rounded-lg p-3">
                        <p className="text-sm italic">"Hola, soy IA Dental, tu asistente de Rubio Garc González Dental. ¿En qué puedo ayudarte hoy?"</p>
                        <div className="mt-2 h-1 bg-white/20 rounded-full overflow-hidden">
                            <div className="h-full bg-brand-lime animate-pulse" style={{ width: '60%' }} />
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};
