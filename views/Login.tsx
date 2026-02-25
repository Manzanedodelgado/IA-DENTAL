import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { signIn } from '../services/auth.service';
import { LogIn, Mail, Lock, AlertCircle, ShieldCheck } from 'lucide-react';

const Login: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const { login } = useAuth();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setLoading(true);

        try {
            const session = await signIn(email, password);
            if (session) {
                login(session.access_token, session.user, session.refresh_token);
            } else {
                setError('Credenciales inválidas o configuración de Supabase ausente.');
            }
        } catch (err: any) {
            setError(err.message || 'Error al iniciar sesión');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#f4f7f9] relative overflow-hidden">
            {/* Background Decorations */}
            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-100/50 rounded-full blur-[120px]" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-50/50 rounded-full blur-[120px]" />

            <div className="w-full max-w-md p-8 relative z-10">
                <div className="bg-white/80 backdrop-blur-xl border border-white shadow-[0_8px_32px_rgba(0,40,85,0.08)] rounded-[2rem] p-8 lg:p-10">

                    {/* Brand / Logo */}
                    <div className="text-center mb-10">
                        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-[#002855] to-[#0056b3] rounded-2xl shadow-lg mb-4">
                            <ShieldCheck className="text-white w-8 h-8" />
                        </div>
                        <h1 className="text-2xl font-black text-[#002855] tracking-tight">SmilePro <span className="text-[#0056b3]">2026</span></h1>
                        <p className="text-slate-500 text-xs font-medium uppercase tracking-[0.2em] mt-1">Ecosistema Dental Inteligente</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {error && (
                            <div className="bg-red-50 border border-red-100 text-red-600 px-4 py-3 rounded-xl flex items-center gap-3 animate-shake">
                                <AlertCircle className="w-5 h-5 flex-shrink-0" />
                                <p className="text-sm font-semibold">{error}</p>
                            </div>
                        )}

                        <div className="space-y-2">
                            <label className="text-[11px] font-black uppercase tracking-widest text-[#002855]/60 ml-1">Email Profesional</label>
                            <div className="relative group">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-[#0056b3] transition-colors" />
                                <input
                                    type="text"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-4 focus:ring-blue-500/10 focus:border-[#0056b3] transition-all outline-none text-sm font-medium placeholder:text-slate-300"
                                    placeholder="JMD o email profesional"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-[11px] font-black uppercase tracking-widest text-[#002855]/60 ml-1">Contraseña</label>
                            <div className="relative group">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-[#0056b3] transition-colors" />
                                <input
                                    type="password"
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-4 focus:ring-blue-500/10 focus:border-[#0056b3] transition-all outline-none text-sm font-medium placeholder:text-slate-300"
                                    placeholder="••••••••"
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className={`w-full py-4 rounded-2xl bg-gradient-to-r from-[#002855] to-[#0056b3] text-white font-bold text-sm shadow-xl shadow-blue-900/10 hover:shadow-blue-900/20 active:scale-[0.98] transition-all flex items-center justify-center gap-2 group ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
                        >
                            {loading ? (
                                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            ) : (
                                <>
                                    <span>ACCEDER AL SISTEMA</span>
                                    <LogIn className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                </>
                            )}
                        </button>
                    </form>

                    <div className="mt-10 text-center">
                        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest leading-relaxed">
                            Acceso restringido a personal de <br />
                            RUBIO GARCIA DENTAL
                        </p>
                    </div>
                </div>

                {/* Footer simple */}
                <p className="text-center mt-8 text-slate-400 text-[10px] font-bold uppercase tracking-widest opacity-50">
                    &copy; 2026 Antigravity Systems &bull; SmilePro v2.4
                </p>
            </div>

            <style>{`
                @keyframes shake {
                    0%, 100% { transform: translateX(0); }
                    25% { transform: translateX(-4px); }
                    75% { transform: translateX(4px); }
                }
                .animate-shake { animation: shake 0.2s ease-in-out 0s 2; }
            `}</style>
        </div>
    );
};

export default Login;
