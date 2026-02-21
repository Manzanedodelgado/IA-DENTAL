/// <reference types="vite/client" />
// ─────────────────────────────────────────────────────────────────
//  services/db.ts
//  Helper base para todas las llamadas a Supabase REST API.
//  Configura en .env.local:
//    VITE_SUPABASE_URL=https://xxxx.supabase.co
//    VITE_SUPABASE_ANON_KEY=eyJhbGci...
// ─────────────────────────────────────────────────────────────────

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const meta = import.meta as any;
const SUPABASE_URL = meta.env?.VITE_SUPABASE_URL as string | undefined;
const SUPABASE_ANON_KEY = meta.env?.VITE_SUPABASE_ANON_KEY as string | undefined;

export const isDbConfigured = (): boolean =>
    Boolean(SUPABASE_URL && SUPABASE_ANON_KEY);

/** Fetch genérico contra Supabase REST v1 */
export const dbFetch = async (
    path: string,
    options?: RequestInit & { params?: Record<string, string> }
): Promise<Response> => {
    if (!isDbConfigured()) throw new Error('Supabase no configurado');

    const url = new URL(`${SUPABASE_URL}/rest/v1/${path}`);
    if (options?.params) {
        Object.entries(options.params).forEach(([k, v]) => url.searchParams.set(k, v));
    }

    return fetch(url.toString(), {
        ...options,
        headers: {
            apikey: SUPABASE_ANON_KEY!,
            Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
            'Content-Type': 'application/json',
            Prefer: 'return=representation',
            ...(options?.headers ?? {}),
        },
    });
};

/** SELECT — devuelve array o [] si no configurado */
export const dbSelect = async <T>(
    table: string,
    params?: Record<string, string>
): Promise<T[]> => {
    if (!isDbConfigured()) return [];
    const res = await dbFetch(table, { params });
    if (!res.ok) { console.error(`dbSelect ${table}:`, await res.text()); return []; }
    return res.json();
};

/** INSERT — devuelve el ítem creado o null */
export const dbInsert = async <T>(
    table: string,
    body: Partial<T>
): Promise<T | null> => {
    if (!isDbConfigured()) return { ...body, id: crypto.randomUUID() } as T;
    const res = await dbFetch(table, { method: 'POST', body: JSON.stringify(body) });
    if (!res.ok) { console.error(`dbInsert ${table}:`, await res.text()); return null; }
    const data = await res.json();
    return Array.isArray(data) ? data[0] : data;
};

/** UPDATE por id — devuelve el ítem actualizado o null */
export const dbUpdate = async <T>(
    table: string,
    id: string,
    body: Partial<T>
): Promise<T | null> => {
    if (!isDbConfigured()) return { ...body, id } as T;
    const res = await dbFetch(`${table}?id=eq.${id}`, {
        method: 'PATCH',
        body: JSON.stringify(body),
    });
    if (!res.ok) { console.error(`dbUpdate ${table}:`, await res.text()); return null; }
    const data = await res.json();
    return Array.isArray(data) ? data[0] : data;
};

/** DELETE por id */
export const dbDelete = async (table: string, id: string): Promise<boolean> => {
    if (!isDbConfigured()) return true;
    const res = await dbFetch(`${table}?id=eq.${id}`, { method: 'DELETE' });
    return res.ok;
};
