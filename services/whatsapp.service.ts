// ─────────────────────────────────────────────────────────────────
//  services/whatsapp.service.ts
//  CRUD de conversaciones, mensajes y plantillas contra Supabase.
// ─────────────────────────────────────────────────────────────────
import { dbSelect, dbInsert, dbUpdate, isDbConfigured } from './db';

export interface ConversacionUI {
    id: string; // Puede ser el id en BD o telefono
    name: string;
    phone: string;
    lastMessage: string;
    time: string;
    unread: number;
    status: 'online' | 'offline';
    avatar: string;
    type: 'patient' | 'provider' | 'lead';
    tags: string[];
}

export interface MensajeUI {
    id: string; // UUID
    sender: 'me' | 'them' | 'bot';
    text: string;
    time: string;
    status: 'sent' | 'delivered' | 'read';
}

interface ConversacionRow {
    id: string;
    telefono: string;
    nombre_contacto: string;
    tipo_contacto: string;
    etiquetas: string[];
    estado_notificaciones: string;
}

interface MensajeRow {
    id: string;
    conversacion_id: string;
    remitente_tipo: string;
    contenido: string;
    estado_entrega: string;
    fecha_envio: string;
}

const formatDate = (dateStr: string): string => {
    const d = new Date(dateStr);
    return `${d.getHours().toString().padStart(2, '0')}:${d.getMinutes().toString().padStart(2, '0')}`;
};

export const getConversaciones = async (): Promise<ConversacionUI[]> => {
    if (!isDbConfigured()) return [];

    try {
        const rows = await dbSelect<ConversacionRow>('conversaciones', { order: 'updated_at.desc' });
        // Por simplificar, mapeamos al formato UI
        return rows.map(r => ({
            id: r.id,
            name: r.nombre_contacto || r.telefono,
            phone: r.telefono,
            lastMessage: 'Mensaje desde base de datos...',
            time: '12:00',
            unread: 0,
            status: 'offline',
            avatar: `https://i.pravatar.cc/150?u=${r.id}`,
            type: (r.tipo_contacto || 'patient') as any,
            tags: r.etiquetas || []
        }));
    } catch {
        return [];
    }
};

export const getMensajes = async (conversacionId: string): Promise<MensajeUI[]> => {
    if (!isDbConfigured()) return [];

    try {
        const rows = await dbSelect<MensajeRow>('mensajes', {
            conversacion_id: `eq.${conversacionId}`,
            order: 'fecha_envio.asc'
        });

        return rows.map(r => ({
            id: r.id,
            sender: (r.remitente_tipo === 'clinica' ? 'me' : r.remitente_tipo === 'bot' ? 'bot' : 'them'),
            text: r.contenido,
            time: formatDate(r.fecha_envio),
            status: (r.estado_entrega === 'leido' ? 'read' : r.estado_entrega === 'entregado' ? 'delivered' : 'sent') as any
        }));
    } catch {
        return [];
    }
};

export const sendMensaje = async (conversacionId: string, texto: string, remitente: string = 'clinica'): Promise<boolean> => {
    if (!isDbConfigured()) return true;

    const row = await dbInsert<MensajeRow>('mensajes', {
        conversacion_id: conversacionId,
        remitente_tipo: remitente,
        contenido: texto,
        estado_entrega: 'enviado',
        fecha_envio: new Date().toISOString()
    });

    // Al enviar un mensaje, idealmente actualizamos el updated_at de la conversacion,
    // pero eso puede manejarse con un trigger en la BD.
    return row !== null;
};
