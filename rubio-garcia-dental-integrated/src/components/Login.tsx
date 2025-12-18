import React, { useState } from 'react';
import { User } from '../types';

interface LoginProps {
    onLogin: (user: User) => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
    const [email, setEmail] = useState('JMD');
    const [password, setPassword] = useState('190582');
    const [error, setError] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // Credenciales: JMD / 190582 (Admin)
        if ((email === 'JMD' || email === 'info@rubiogarciadental.com') && password === '190582') {
            onLogin({
                id: '1',
                name: 'JMD',
                email: 'info@rubiogarciadental.com',
                role: 'admin' as any,
                username: 'JMD'
            });
        } else if (email === 'user' && password === 'user') {
            onLogin({
                id: '2',
                name: 'Usuario Estándar',
                email: 'user@rubiogarciadental.com',
                role: 'user' as any,
                username: 'user'
            });
        } else {
            setError('Credenciales incorrectas');
        }
    };

    return (
        <div className="min-h-screen w-full flex font-sans overflow-hidden">
            {/* Login Form Panel - Full Width */}
            <div className="w-full flex items-center justify-center p-8 relative"
                style={{
                    background: 'linear-gradient(135deg, rgba(5,5,53,0.95) 0%, rgba(16,6,159,0.95) 50%, rgba(35,24,184,0.95) 100%)',
                }}>
                <div className="relative z-10 w-full max-w-md">
                    <div className="bg-white/10 backdrop-blur-xl p-10 rounded-3xl shadow-2xl border border-white/20">
                        {/* Header */}
                        <div className="text-center mb-10">
                            <h1 className="text-3xl font-bold text-white mb-2">
                                RUBIO GARCÍA DENTAL
                            </h1>
                            <p className="text-white/70 text-sm">
                                Ingresa a tu cuenta para continuar
                            </p>
                        </div>

                        {error && (
                            <div className="bg-red-500/20 text-red-200 p-4 rounded-xl text-sm font-bold mb-6 border-l-4 border-red-400 flex items-center">
                                <span className="mr-2">⚠️</span> {error}
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label className="block text-white text-xs font-bold uppercase mb-2 tracking-wider">
                                    Usuario
                                </label>
                                <input
                                    type="text"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full p-4 border-2 border-white/20 rounded-xl bg-white/10 focus:outline-none focus:bg-white/20 focus:border-white/40 transition-all text-sm font-semibold text-white placeholder-white/50"
                                    placeholder="Ingrese su usuario..."
                                />
                            </div>

                            <div>
                                <label className="block text-white text-xs font-bold uppercase mb-2 tracking-wider">
                                    Contraseña
                                </label>
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full p-4 border-2 border-white/20 rounded-xl bg-white/10 focus:outline-none focus:bg-white/20 focus:border-white/40 transition-all text-sm font-semibold text-white placeholder-white/50"
                                    placeholder="••••••••"
                                />
                            </div>

                            <button
                                type="submit"
                                className="w-full py-4 bg-gradient-to-r from-white/20 to-white/10 text-white rounded-xl font-bold uppercase tracking-wider text-sm hover:shadow-[0_8px_30px_rgba(255,255,255,0.3)] hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 relative overflow-hidden group border border-white/30"
                            >
                                <span className="relative z-10 flex items-center justify-center gap-2">
                                    Iniciar Sesión
                                </span>
                                <div className="absolute inset-0 bg-gradient-to-r from-white/30 to-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                            </button>
                        </form>

                        <div className="mt-8 flex justify-between items-center text-xs font-semibold text-white/70">
                            <label className="flex items-center gap-2 cursor-pointer hover:text-white transition-colors">
                                <input type="checkbox" className="rounded border-white/30 bg-white/10 text-white focus:ring-white/50" />
                                Recordar sesión
                            </label>
                            <a href="#" className="text-white hover:text-white/90 hover:underline transition-colors">
                                ¿Olvidaste contraseña?
                            </a>
                        </div>

                        {/* Version */}
                        <div className="mt-10 pt-6 border-t border-white/10 text-center">
                            <p className="text-[10px] text-white/50 font-semibold tracking-wider uppercase">
                                Rubio García Dental © 2025 • IA Dental v3.0
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
