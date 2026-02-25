
// ─────────────────────────────────────────────────────────────────
//  services/invoice-parser.service.ts
//  Extrae datos estructurados de facturas desde:
//    • Cuerpo de email (texto plano)
//    • Adjuntos PDF (pdf.js — lectura de texto en browser)
// ─────────────────────────────────────────────────────────────────

import type { GmailInvoiceEmail } from './gmail.service';

export interface FacturaExtraida {
    // Identificación
    gmail_message_id: string;
    enlace_gmail: string;

    // Datos proveedor
    proveedor: string;
    proveedor_email: string;

    // Datos factura
    numero_factura: string | null;
    fecha_email: string;       // ISO
    fecha_factura: string | null;
    concepto: string;

    // Importes
    base_imponible: number | null;
    iva_pct: number | null;    // e.g. 21, 10, 4, 0
    total: number | null;

    // Meta
    tiene_adjunto: boolean;
    nombre_adjunto: string | null;
    estado: 'pendiente' | 'cruzado' | 'descartado';
    raw_snippet: string;
}

// ── Helpers de regex ─────────────────────────────────────────────

/** Limpia y parsea un string de importe español/europeo a número */
function parseAmount(s: string): number | null {
    if (!s) return null;
    // Quitar símbolo monetario y espacios
    const cleaned = s.replace(/[€$£\s]/g, '')
        // Si hay puntos de miles y coma decimal: 1.234,56 → 1234.56
        .replace(/\.(\d{3}),/g, '$1.')
        // Si solo hay coma como decimal: 1234,56 → 1234.56
        .replace(',', '.');
    const n = parseFloat(cleaned);
    return isNaN(n) ? null : n;
}

/** Extraer un importe de un texto usando uno o varios patrones */
function findAmount(text: string, patterns: RegExp[]): number | null {
    for (const re of patterns) {
        const m = text.match(re);
        if (m?.[1]) {
            const n = parseAmount(m[1]);
            if (n !== null && n > 0) return n;
        }
    }
    return null;
}

// ── Parsers por campo ────────────────────────────────────────────

const reFacturaNum = [
    /[Ff]actura[:\s#nNº]*\s*([A-Z0-9\-\/]{4,20})/,
    /[Ii]nvoice[:\s#]*\s*([A-Z0-9\-\/]{4,20})/,
    /[Rr]echnung[:\s#]*\s*([A-Z0-9\-\/]{4,20})/,
    /\b(?:Nº|No|Ref\.?)[:\s]*([A-Z0-9\-\/]{4,20})/i,
    /\b(F(?:ACT)?[\-\/]?\d{4}[\-\/]\d{2,6})\b/i,
    /\b(INV[\-\/\s]?\d{4}[\-\/]?\d{1,6})\b/i,
];

const reTotal = [
    /[Tt]otal[:\s€]*([\d.,]+\s*€?)/,
    /[Ii]mporte[:\s€]*([\d.,]+\s*€?)/,
    /[Tt]otal[:\s]+([\d]{1,3}(?:[.,]\d{3})*(?:[.,]\d{2}))\s*€/,
    /€\s*([\d]{1,3}(?:[.,]\d{3})*(?:[.,]\d{2}))/,
    /Total amount[:\s]+([\d.,]+)/i,
];

const reBase = [
    /[Bb]ase\s*(?:imponible)?[:\s€]*([\d.,]+)/,
    /[Ss]ubtotal[:\s€]*([\d.,]+)/,
    /[Nn]et amount[:\s€]*([\d.,]+)/i,
];

const reIVA = [
    /IVA\s*(\d{1,2})\s*%/i,
    /VAT\s*(\d{1,2})\s*%/i,
    /MwSt\.?\s*(\d{1,2})\s*%/i,
];

const reDate = [
    /[Ff]echa[:\s]*([\d]{1,2}\/[\d]{1,2}\/[\d]{4})/,
    /[Dd]ate[:\s]*([\d]{1,2}[\/\-][\d]{1,2}[\/\-][\d]{4})/,
    /[Dd]atum[:\s]*([\d]{1,2}[\/\-][\d]{1,2}[\/\-][\d]{4})/,
    /(\d{1,2})\/(\d{1,2})\/(\d{4})/,
];

function parseDate(text: string): string | null {
    for (const re of reDate) {
        const m = text.match(re);
        if (m) {
            const raw = m[0].match(/(\d{1,2})[\/\-](\d{1,2})[\/\-](\d{4})/);
            if (raw) {
                const [, d, mo, y] = raw;
                return `${y}-${mo.padStart(2, '0')}-${d.padStart(2, '0')}`;
            }
        }
    }
    return null;
}

function parseNumeroFactura(text: string, subject: string): string | null {
    for (const re of reFacturaNum) {
        const m = (subject + '\n' + text).match(re);
        if (m?.[1] && m[1].length >= 4) return m[1].trim();
    }
    return null;
}

function parseIvaPct(text: string): number | null {
    for (const re of reIVA) {
        const m = text.match(re);
        if (m?.[1]) {
            const n = parseInt(m[1]);
            if ([0, 4, 10, 21].includes(n)) return n;
        }
    }
    // Dental suele ser exento
    if (/exento|exempt|exento de iva/i.test(text)) return 0;
    return null;
}

// ── PDF text extraction (pdf.js) ─────────────────────────────────

/** Extract plain text from a PDF given as base64url string */
async function extractPdfText(base64url: string): Promise<string> {
    try {
        // Load pdfjs-dist from CDN dynamically at runtime — bypass TS module resolution
        // eslint-disable-next-line no-new-func
        const cdnImport = new Function('url', 'return import(url)');
        const pdfjsModule = await cdnImport(
            'https://cdn.jsdelivr.net/npm/pdfjs-dist@4.0.379/+esm'
        ).catch(() => null);

        if (!pdfjsModule) return '';

        // Set worker
        if (pdfjsModule.GlobalWorkerOptions) {
            pdfjsModule.GlobalWorkerOptions.workerSrc =
                'https://cdn.jsdelivr.net/npm/pdfjs-dist@4.0.379/build/pdf.worker.min.js';
        }

        const std = base64url.replace(/-/g, '+').replace(/_/g, '/');
        const binary = atob(std);
        const bytes = new Uint8Array(binary.length);
        for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);

        const pdf = await pdfjsModule.getDocument({ data: bytes }).promise;
        let text = '';
        for (let p = 1; p <= Math.min(pdf.numPages, 5); p++) {
            const page = await pdf.getPage(p);
            const content = await page.getTextContent();
            text += (content.items as { str?: string }[]).map(item => item.str ?? '').join(' ') + '\n';
        }
        return text;
    } catch {
        return '';
    }
}


// ── Main parser ──────────────────────────────────────────────────

/**
 * Parse a GmailInvoiceEmail into a structured FacturaExtraida.
 * Uses email body text first; tries PDF if provided.
 */
export const parseInvoiceEmail = async (
    email: GmailInvoiceEmail,
    pdfBase64?: string,
): Promise<FacturaExtraida> => {
    // Combine all text sources
    let text = email.bodyText || email.snippet || '';
    if (pdfBase64) {
        const pdfText = await extractPdfText(pdfBase64);
        if (pdfText.length > text.length) text = pdfText + '\n' + text;
    }

    const total = findAmount(text, reTotal);
    const base = findAmount(text, reBase);

    // If only total is found and we know IVA, derive base
    const ivaPct = parseIvaPct(text);
    let baseImponible = base;
    if (!baseImponible && total !== null && ivaPct !== null && ivaPct > 0) {
        baseImponible = Math.round((total / (1 + ivaPct / 100)) * 100) / 100;
    }

    const attachment = email.attachments[0] ?? null;

    return {
        gmail_message_id: email.id,
        enlace_gmail: email.enlaceGmail,
        proveedor: email.de,
        proveedor_email: email.deEmail,
        numero_factura: parseNumeroFactura(text, email.asunto),
        fecha_email: email.fecha,
        fecha_factura: parseDate(text),
        concepto: email.asunto,
        base_imponible: baseImponible,
        iva_pct: ivaPct,
        total,
        tiene_adjunto: email.hasAttachment,
        nombre_adjunto: attachment?.filename ?? null,
        estado: 'pendiente',
        raw_snippet: email.snippet.slice(0, 300),
    };
};

/**
 * Batch-parse multiple invoice emails.
 * Returns results sorted by fecha_email descending.
 */
export const parseAllInvoiceEmails = async (
    emails: GmailInvoiceEmail[],
): Promise<FacturaExtraida[]> => {
    const results = await Promise.all(emails.map(e => parseInvoiceEmail(e)));
    return results.sort((a, b) => b.fecha_email.localeCompare(a.fecha_email));
};
