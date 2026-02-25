
// ─────────────────────────────────────────────────────────────────
//  services/gmail.service.ts
//  Gmail API — extracción automática de facturas de proveedores
//  Cuenta: info@rubiogarciandental.com
//
//  Autenticación: Service Account JWT (RS256) via Web Crypto API
//  Variables de entorno (.env):
//    VITE_GMAIL_SA_EMAIL        = sincronizador-de-agenda@...
//    VITE_GMAIL_SA_PRIVATE_KEY  = -----BEGIN RSA PRIVATE KEY-----\n...
//    VITE_GMAIL_USER_EMAIL      = info@rubiogarciandental.com
// ─────────────────────────────────────────────────────────────────

const SA_EMAIL = import.meta.env.VITE_GMAIL_SA_EMAIL as string | undefined;
const SA_KEY_PEM = import.meta.env.VITE_GMAIL_SA_PRIVATE_KEY as string | undefined;
const USER_EMAIL = import.meta.env.VITE_GMAIL_USER_EMAIL ?? 'info@rubiogarciandental.com';

export const isGmailConfigured = (): boolean => Boolean(SA_EMAIL && SA_KEY_PEM);

// ── Types ───────────────────────────────────────────────────────────

export interface GmailInvoiceEmail {
    id: string;              // Gmail message ID
    threadId: string;
    fecha: string;           // ISO 8601
    de: string;              // From display name
    deEmail: string;         // From raw email
    asunto: string;
    snippet: string;         // Preview text
    hasAttachment: boolean;
    attachments: GmailAttachment[];
    bodyText: string;        // Plain text body
    enlaceGmail: string;
}

export interface GmailAttachment {
    id: string;
    filename: string;
    mimeType: string;
    size: number;
    data?: string;           // base64-url decoded content
}

// ── JWT / Token ─────────────────────────────────────────────────────

let _accessToken: string | null = null;
let _tokenExpiry = 0;

/** Base64-url encode (no padding) */
const b64url = (buf: ArrayBuffer) =>
    btoa(String.fromCharCode(...new Uint8Array(buf)))
        .replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '');

/** Import PEM RSA private key for RS256 signing */
async function importPrivateKey(pem: string): Promise<CryptoKey> {
    // Strip headers and whitespace
    const stripped = pem
        .replace(/-----BEGIN (RSA )?PRIVATE KEY-----/g, '')
        .replace(/-----END (RSA )?PRIVATE KEY-----/g, '')
        .replace(/\s+/g, '');
    const binaryDer = Uint8Array.from(atob(stripped), c => c.charCodeAt(0));
    return crypto.subtle.importKey(
        'pkcs8',
        binaryDer.buffer,
        { name: 'RSASSA-PKCS1-v1_5', hash: 'SHA-256' },
        false,
        ['sign'],
    );
}

/** Generate a signed JWT for Domain-Wide Delegation */
async function makeJwt(saEmail: string, userEmail: string, keyPem: string): Promise<string> {
    const now = Math.floor(Date.now() / 1000);
    const header = { alg: 'RS256', typ: 'JWT' };
    const payload = {
        iss: saEmail,
        sub: userEmail,
        scope: 'https://www.googleapis.com/auth/gmail.readonly',
        aud: 'https://oauth2.googleapis.com/token',
        iat: now,
        exp: now + 3600,
    };
    const enc = new TextEncoder();
    const headerB64 = b64url(enc.encode(JSON.stringify(header)).buffer as ArrayBuffer);
    const payloadB64 = b64url(enc.encode(JSON.stringify(payload)).buffer as ArrayBuffer);
    const sigInput = `${headerB64}.${payloadB64}`;
    const key = await importPrivateKey(keyPem);
    const sig = await crypto.subtle.sign(
        'RSASSA-PKCS1-v1_5',
        key,
        enc.encode(sigInput),
    );
    return `${sigInput}.${b64url(sig)}`;
}

/** Obtain or reuse OAuth2 access_token */
async function getAccessToken(): Promise<string | null> {
    if (!SA_EMAIL || !SA_KEY_PEM) return null;
    if (_accessToken && Date.now() < _tokenExpiry) return _accessToken;

    try {
        const jwt = await makeJwt(SA_EMAIL, USER_EMAIL, SA_KEY_PEM);
        const res = await fetch('https://oauth2.googleapis.com/token', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: new URLSearchParams({
                grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
                assertion: jwt,
            }),
        });
        if (!res.ok) {
            console.error('[Gmail] Token error', await res.text());
            return null;
        }
        const j = await res.json();
        _accessToken = j.access_token;
        _tokenExpiry = Date.now() + (j.expires_in - 60) * 1000;
        return _accessToken;
    } catch (e) {
        console.error('[Gmail] JWT sign error', e);
        return null;
    }
}

// ── Gmail API helpers ───────────────────────────────────────────────

const GMAIL = 'https://gmail.googleapis.com/gmail/v1/users/me';

async function gmailGet<T>(path: string, token: string): Promise<T> {
    const res = await fetch(`${GMAIL}${path}`, {
        headers: { Authorization: `Bearer ${token}` },
    });
    if (!res.ok) throw new Error(`Gmail ${res.status}: ${await res.text()}`);
    return res.json();
}

/** Decode base64url string to UTF-8 text */
function decodeBase64(b64: string): string {
    const std = b64.replace(/-/g, '+').replace(/_/g, '/');
    try {
        return decodeURIComponent(escape(atob(std)));
    } catch {
        return atob(std);
    }
}

/** Recursively extract text/plain body from MIME parts */
function extractBodyText(payload: GmailPayload): string {
    if (payload.mimeType === 'text/plain' && payload.body?.data) {
        return decodeBase64(payload.body.data);
    }
    if (payload.parts) {
        for (const part of payload.parts) {
            const t = extractBodyText(part);
            if (t) return t;
        }
    }
    return '';
}

interface GmailPayload {
    mimeType: string;
    filename?: string;
    body?: { data?: string; attachmentId?: string; size?: number };
    parts?: GmailPayload[];
    headers?: { name: string; value: string }[];
}

/** Collect attachments from MIME tree */
function extractAttachments(payload: GmailPayload): GmailAttachment[] {
    const out: GmailAttachment[] = [];
    const walk = (p: GmailPayload) => {
        if (p.filename && p.filename.length > 0 && p.body?.attachmentId) {
            out.push({
                id: p.body.attachmentId,
                filename: p.filename,
                mimeType: p.mimeType,
                size: p.body.size ?? 0,
            });
        }
        p.parts?.forEach(walk);
    };
    walk(payload);
    return out;
}

// ── Search query ────────────────────────────────────────────────────

const INVOICE_QUERY = [
    'subject:(factura OR invoice OR rechnung OR facture OR "nota de crédito" OR "albarán")',
    'OR (factura OR invoice) has:attachment',
].join(' ');

// ── Public API ──────────────────────────────────────────────────────

/**
 * Fetch invoices-related emails from the last N days.
 * Falls back to mock data when not configured.
 */
export const fetchInvoiceEmails = async (
    lastDays = 90,
): Promise<GmailInvoiceEmail[]> => {
    const token = await getAccessToken();
    if (!token) return MOCK_EMAILS;

    try {
        const after = Math.floor((Date.now() - lastDays * 864e5) / 1000);
        const q = encodeURIComponent(`${INVOICE_QUERY} after:${after}`);

        const list = await gmailGet<{ messages?: { id: string; threadId: string }[] }>(
            `/messages?q=${q}&maxResults=50`,
            token,
        );
        if (!list.messages?.length) return [];

        const emails: GmailInvoiceEmail[] = [];

        await Promise.all(
            list.messages.slice(0, 30).map(async (m) => {
                try {
                    const full = await gmailGet<{
                        id: string; threadId: string; snippet: string;
                        payload: GmailPayload;
                    }>(`/messages/${m.id}?format=full`, token);

                    const headers = full.payload.headers ?? [];
                    const hdr = (name: string) =>
                        headers.find(h => h.name.toLowerCase() === name)?.value ?? '';

                    const from = hdr('from');
                    const emailMatch = from.match(/<([^>]+)>/);
                    const deEmail = emailMatch?.[1] ?? from;
                    const de = from.replace(/<[^>]+>/, '').trim().replace(/^"|"$/g, '')
                        || deEmail;

                    const attachments = extractAttachments(full.payload);
                    const bodyText = extractBodyText(full.payload);

                    emails.push({
                        id: full.id,
                        threadId: full.threadId,
                        fecha: new Date(Number(hdr('date') || Date.now())).toISOString(),
                        de,
                        deEmail,
                        asunto: hdr('subject'),
                        snippet: full.snippet,
                        hasAttachment: attachments.length > 0,
                        attachments,
                        bodyText,
                        enlaceGmail: `https://mail.google.com/mail/u/0/#inbox/${full.id}`,
                    });
                } catch {/* skip bad messages */ }
            }),
        );

        return emails.sort((a, b) => b.fecha.localeCompare(a.fecha));
    } catch (e) {
        console.error('[Gmail] fetchInvoiceEmails error', e);
        return MOCK_EMAILS;
    }
};

/**
 * Download a specific attachment's binary content (base64url).
 */
export const downloadAttachment = async (
    messageId: string,
    attachmentId: string,
): Promise<string | null> => {
    const token = await getAccessToken();
    if (!token) return null;
    try {
        const res = await gmailGet<{ data: string }>(
            `/messages/${messageId}/attachments/${attachmentId}`,
            token,
        );
        return res.data; // base64url encoded
    } catch {
        return null;
    }
};

// ── Mock data ────────────────────────────────────────────────────────

const MOCK_EMAILS: GmailInvoiceEmail[] = [
    {
        id: 'mock-1', threadId: 't1',
        fecha: new Date(Date.now() - 2 * 864e5).toISOString(),
        de: 'Suministros Dentales Iberia', deEmail: 'facturas@sdi.es',
        asunto: 'FACTURA 2025/0234 - Pedido material clínica',
        snippet: 'Estimados clientes, adjuntamos factura correspondiente al pedido realizado...',
        hasAttachment: true,
        attachments: [{ id: 'a1', filename: 'Factura_2025_0234.pdf', mimeType: 'application/pdf', size: 48200 }],
        bodyText: 'Factura nº 2025/0234\nFecha: 23/02/2025\nBase imponible: 1.240,00 €\nIVA 21%: 260,40 €\nTOTAL: 1.500,40 €',
        enlaceGmail: '#mock',
    },
    {
        id: 'mock-2', threadId: 't2',
        fecha: new Date(Date.now() - 5 * 864e5).toISOString(),
        de: 'Telefónica', deEmail: 'automatico@telefonica.com',
        asunto: 'Tu factura de Movistar - Febrero 2025',
        snippet: 'Tu factura del mes de febrero ya está disponible. Importe total: 89,45 €',
        hasAttachment: true,
        attachments: [{ id: 'a2', filename: 'factura_MAT_202502.pdf', mimeType: 'application/pdf', size: 112000 }],
        bodyText: 'Factura nº MAT-202502\nPeriodo: 01/02/2025 - 28/02/2025\nBase: 73,93 €\nIVA 21%: 15,52 €\nTOTAL: 89,45 €',
        enlaceGmail: '#mock',
    },
    {
        id: 'mock-3', threadId: 't3',
        fecha: new Date(Date.now() - 12 * 864e5).toISOString(),
        de: 'Endocare Dental', deEmail: 'admin@endocare.es',
        asunto: 'invoice #INV-2025-089 for dental supplies',
        snippet: 'Please find attached invoice INV-2025-089. Payment due in 30 days.',
        hasAttachment: true,
        attachments: [{ id: 'a3', filename: 'INV-2025-089.pdf', mimeType: 'application/pdf', size: 67000 }],
        bodyText: 'Invoice INV-2025-089\nDate: 13/02/2025\nSubtotal: 3.200,00 €\nVAT 21%: 672,00 €\nTotal: 3.872,00 €',
        enlaceGmail: '#mock',
    },
    {
        id: 'mock-4', threadId: 't4',
        fecha: new Date(Date.now() - 18 * 864e5).toISOString(),
        de: 'Seguros Sanitas', deEmail: 'facturas@sanitas.es',
        asunto: 'Factura seguro clínica - Febrero 2025',
        snippet: 'Adjuntamos la factura correspondiente a la cuota mensual de su seguro clínica...',
        hasAttachment: false,
        attachments: [],
        bodyText: 'Factura 2025-02-001842\nFecha: 07/02/2025\nBase: 415,00 €\nIVA Exento\nTOTAL: 415,00 €',
        enlaceGmail: '#mock',
    },
    {
        id: 'mock-5', threadId: 't5',
        fecha: new Date(Date.now() - 25 * 864e5).toISOString(),
        de: 'Iberdrola Empresas', deEmail: 'noreply@iberdrola.es',
        asunto: 'Factura Luz Clínica - Enero 2025 - Ref: 7823991',
        snippet: 'Su factura de electricidad correspondiente al periodo enero 2025 está disponible.',
        hasAttachment: true,
        attachments: [{ id: 'a5', filename: 'factura_iberdrola_01_2025.pdf', mimeType: 'application/pdf', size: 93000 }],
        bodyText: 'Ref. Factura: 7823991\nPeriodo: 01/01/2025 - 31/01/2025\nBase imponible: 342,18 €\nIVA 21%: 71,86 €\nTOTAL: 414,04 €',
        enlaceGmail: '#mock',
    },
];
