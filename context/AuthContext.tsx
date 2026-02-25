import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { AuthUser, getUser, signOut as sbSignOut } from '../services/auth.service';

interface AuthContextType {
    user: AuthUser | null;
    token: string | null;
    isAuthenticated: boolean;
    loading: boolean;
    login: (token: string, user: AuthUser, refreshToken: string) => void;
    logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<AuthUser | null>(null);
    const [token, setToken] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const initAuth = async () => {
            const savedToken = localStorage.getItem('sb_auth_token');
            if (savedToken) {
                try {
                    const currentUser = await getUser(savedToken);
                    if (currentUser) {
                        setToken(savedToken);
                        setUser(currentUser);
                    } else {
                        localStorage.removeItem('sb_auth_token');
                    }
                } catch (e) {
                    localStorage.removeItem('sb_auth_token');
                }
            }
            setLoading(false);
        };
        initAuth();
    }, []);

    const login = (newToken: string, newUser: AuthUser, refreshToken: string) => {
        setToken(newToken);
        setUser(newUser);
        localStorage.setItem('sb_auth_token', newToken);
        localStorage.setItem('sb_refresh_token', refreshToken);
    };

    const logout = async () => {
        if (token) {
            await sbSignOut(token);
        }
        setToken(null);
        setUser(null);
        localStorage.removeItem('sb_auth_token');
        localStorage.removeItem('sb_refresh_token');
    };

    return (
        <AuthContext.Provider value={{
            user,
            token,
            isAuthenticated: !!user,
            loading,
            login,
            logout
        }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) throw new Error('useAuth must be used within an AuthProvider');
    return context;
};
