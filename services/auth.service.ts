// ─────────────────────────────────────────────────────────────────
//  services/auth.service.ts
//  Comunicación con Supabase Auth vía REST API (evitando dependencias).
// ─────────────────────────────────────────────────────────────────

const meta = import.meta as any;
const SUPABASE_URL = meta.env?.VITE_SUPABASE_URL as string | undefined;
const SUPABASE_ANON_KEY = meta.env?.VITE_SUPABASE_ANON_KEY as string | undefined;

export interface AuthUser {
    id: string;
    email?: string;
    phone?: string;
    last_sign_in_at?: string;
}

export interface AuthSession {
    access_token: string;
    refresh_token: string;
    user: AuthUser;
}

const isConfigured = (): boolean => Boolean(SUPABASE_URL && SUPABASE_ANON_KEY);

/** Login con Email y Password */
export const signIn = async (email: string, password: string): Promise<AuthSession | null> => {
    // Bypass para el administrador (JMD / 190582)
    if (email.toUpperCase() === 'JMD' && password === '190582') {
        return {
            access_token: 'bypass-admin-token',
            refresh_token: 'bypass-admin-refresh',
            user: {
                id: 'admin-jmd',
                email: 'jmd@rubiogarcia.dental',
                last_sign_in_at: new Date().toISOString()
            }
        };
    }

    if (!isConfigured()) return null;

    try {
        const response = await fetch(`${SUPABASE_URL}/auth/v1/token?grant_type=password`, {
            method: 'POST',
            headers: {
                'apikey': SUPABASE_ANON_KEY!,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        });

        if (!response.ok) {
            const error = await response.json();
            console.error('Auth Error:', error);
            throw new Error(error.error_description || error.message || 'Error al iniciar sesión');
        }

        const session = await response.json();
        return session;
    } catch (err) {
        console.error('SignIn failed:', err);
        throw err;
    }
};

/** Obtener usuario actual a partir del token */
export const getUser = async (token: string): Promise<AuthUser | null> => {
    if (!isConfigured()) return null;

    try {
        const response = await fetch(`${SUPABASE_URL}/auth/v1/user`, {
            method: 'GET',
            headers: {
                'apikey': SUPABASE_ANON_KEY!,
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) return null;
        return await response.json();
    } catch (err) {
        console.error('GetUser failed:', err);
        return null;
    }
};

/** Logout */
export const signOut = async (token: string): Promise<boolean> => {
    if (!isConfigured()) return true;

    try {
        const response = await fetch(`${SUPABASE_URL}/auth/v1/logout`, {
            method: 'POST',
            headers: {
                'apikey': SUPABASE_ANON_KEY!,
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });

        return response.ok;
    } catch (err) {
        console.error('SignOut failed:', err);
        return true;
    }
};
