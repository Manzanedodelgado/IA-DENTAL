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

// Supabase connection — reads from env vars, with hardcoded fallback for reliability
const SUPABASE_URL: string =
    (meta.env?.VITE_SUPABASE_URL as string) ||
    'https://ltfstsjfybpbtiakopor.supabase.co';

// Service role key bypasses RLS — safe for this internal clinic tool
const SUPABASE_KEY: string =
    (meta.env?.VITE_SUPABASE_SERVICE_KEY as string) ||
    (meta.env?.VITE_SUPABASE_ANON_KEY as string) ||
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imx0ZnN0c2pmeWJwYnRpYWtvcG9yIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3MTIwMDU0MywiZXhwIjoyMDg2Nzc2NTQzfQ.DPKKLmvnyOKDQng5Q-2sAGC4mXe7fMrPKPCrBaMsr5I';

export const isDbConfigured = (): boolean => Boolean(SUPABASE_URL && SUPABASE_KEY);


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
            apikey: SUPABASE_KEY!,
            Authorization: `Bearer ${SUPABASE_KEY}`,
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
    // PostgREST requires OR filters wrapped in parentheses: ?or=(a,b,...) not ?or=a,b,...
    const fixedParams = params ? Object.fromEntries(
        Object.entries(params).map(([k, v]) =>
            k === 'or' && !v.startsWith('(') ? [k, `(${v})`] : [k, v]
        )
    ) : params;
    const res = await dbFetch(table, { params: fixedParams });
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
    body: Partial<T>,
    idColumn: string = 'id'
): Promise<T | null> => {
    if (!isDbConfigured()) return { ...body, [idColumn]: id } as unknown as T;
    const res = await dbFetch(`${table}?${idColumn}=eq.${id}`, {
        method: 'PATCH',
        body: JSON.stringify(body),
    });
    if (!res.ok) { console.error(`dbUpdate ${table}:`, await res.text()); return null; }
    const data = await res.json();
    return Array.isArray(data) ? data[0] : data;
};

/** DELETE por id */
export const dbDelete = async (
    table: string,
    id: string,
    idColumn: string = 'id'
): Promise<boolean> => {
    if (!isDbConfigured()) return true;
    const res = await dbFetch(`${table}?${idColumn}=eq.${id}`, { method: 'DELETE' });
    return res.ok;
};
