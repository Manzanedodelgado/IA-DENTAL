/**
 * WhatsApp Service - Frontend client for WhatsApp Worker
 * Connects to the backend via Socket.IO for real-time updates
 */

// Configuration
const WHATSAPP_WORKER_URL = 'http://localhost:3001';

// Types
export interface WhatsAppStatus {
    status: 'disconnected' | 'connecting' | 'qr_ready' | 'connected' | 'reconnecting' | 'logged_out' | 'error';
    user: { id: string; name: string } | null;
    hasQR: boolean;
    qrCode: string | null;
    chatsCount: number;
}

export interface WhatsAppChat {
    jid: string;
    name: string;
    lastMessage: string;
    timestamp: string;
    unread: number;
}

export interface WhatsAppMessage {
    id: string;
    jid: string;
    from: string;
    pushName?: string;
    text: string;
    timestamp: string;
    isFromMe: boolean;
}

// Event callbacks
type StatusCallback = (status: WhatsAppStatus) => void;
type QRCallback = (qrCode: string) => void;
type MessageCallback = (message: WhatsAppMessage) => void;
type ChatsCallback = (chats: WhatsAppChat[]) => void;
type ErrorCallback = (error: { message: string }) => void;

class WhatsAppService {
    private socket: any = null;
    private callbacks = {
        status: [] as StatusCallback[],
        qr: [] as QRCallback[],
        message: [] as MessageCallback[],
        chats: [] as ChatsCallback[],
        error: [] as ErrorCallback[]
    };
    private isConnected = false;

    /**
     * Initialize Socket.IO connection to WhatsApp Worker
     */
    async connect(): Promise<void> {
        if (this.isConnected) return;

        // Dynamically import socket.io-client
        const { io } = await import('socket.io-client');

        this.socket = io(WHATSAPP_WORKER_URL, {
            reconnection: true,
            reconnectionDelay: 1000,
            reconnectionAttempts: 10
        });

        // Bind events
        this.socket.on('connect', () => {
            console.log('🔌 Connected to WhatsApp Worker');
            this.isConnected = true;
        });

        this.socket.on('disconnect', () => {
            console.log('🔌 Disconnected from WhatsApp Worker');
            this.isConnected = false;
        });

        this.socket.on('status', (status: WhatsAppStatus) => {
            this.callbacks.status.forEach(cb => cb(status));
        });

        this.socket.on('qr', (qrCode: string) => {
            this.callbacks.qr.forEach(cb => cb(qrCode));
        });

        this.socket.on('new_message', (message: WhatsAppMessage) => {
            this.callbacks.message.forEach(cb => cb(message));
        });

        this.socket.on('chats_updated', (chats: WhatsAppChat[]) => {
            this.callbacks.chats.forEach(cb => cb(chats));
        });

        this.socket.on('error', (error: { message: string }) => {
            this.callbacks.error.forEach(cb => cb(error));
        });

        this.socket.on('connected', (data: { user: any }) => {
            console.log('✅ WhatsApp authenticated as:', data.user?.id);
        });

        this.socket.on('logged_out', () => {
            console.log('🚪 WhatsApp logged out');
        });
    }

    /**
     * Disconnect from WhatsApp Worker
     */
    disconnect(): void {
        if (this.socket) {
            this.socket.disconnect();
            this.socket = null;
            this.isConnected = false;
        }
    }

    // ============ Event Subscription ============

    onStatus(callback: StatusCallback): () => void {
        this.callbacks.status.push(callback);
        return () => {
            this.callbacks.status = this.callbacks.status.filter(cb => cb !== callback);
        };
    }

    onQR(callback: QRCallback): () => void {
        this.callbacks.qr.push(callback);
        return () => {
            this.callbacks.qr = this.callbacks.qr.filter(cb => cb !== callback);
        };
    }

    onMessage(callback: MessageCallback): () => void {
        this.callbacks.message.push(callback);
        return () => {
            this.callbacks.message = this.callbacks.message.filter(cb => cb !== callback);
        };
    }

    onChatsUpdated(callback: ChatsCallback): () => void {
        this.callbacks.chats.push(callback);
        return () => {
            this.callbacks.chats = this.callbacks.chats.filter(cb => cb !== callback);
        };
    }

    onError(callback: ErrorCallback): () => void {
        this.callbacks.error.push(callback);
        return () => {
            this.callbacks.error = this.callbacks.error.filter(cb => cb !== callback);
        };
    }

    // ============ API Methods ============

    /**
     * Get current WhatsApp status
     */
    async getStatus(): Promise<WhatsAppStatus> {
        const response = await fetch(`${WHATSAPP_WORKER_URL}/status`);
        const data = await response.json();
        return data.whatsapp;
    }

    /**
     * Get all chats
     */
    async getChats(): Promise<WhatsAppChat[]> {
        const response = await fetch(`${WHATSAPP_WORKER_URL}/chats`);
        return response.json();
    }

    /**
     * Get messages for a specific chat
     */
    async getMessages(jid: string, limit = 50): Promise<WhatsAppMessage[]> {
        const response = await fetch(`${WHATSAPP_WORKER_URL}/chats/${encodeURIComponent(jid)}/messages?limit=${limit}`);
        return response.json();
    }

    /**
     * Send a message
     */
    async sendMessage(to: string, message: string): Promise<{ success: boolean; messageId?: string; error?: string }> {
        const response = await fetch(`${WHATSAPP_WORKER_URL}/send`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ to, message })
        });
        return response.json();
    }

    /**
     * Send message via WebSocket (faster)
     */
    sendMessageWS(to: string, message: string): void {
        if (this.socket && this.isConnected) {
            this.socket.emit('send_message', { to, message });
        }
    }

    /**
     * Logout from WhatsApp
     */
    async logout(): Promise<void> {
        await fetch(`${WHATSAPP_WORKER_URL}/logout`, { method: 'POST' });
    }

    /**
     * Reconnect to WhatsApp
     */
    async reconnect(): Promise<void> {
        await fetch(`${WHATSAPP_WORKER_URL}/reconnect`, { method: 'POST' });
    }

    /**
     * Check if worker is reachable
     */
    async isWorkerAvailable(): Promise<boolean> {
        try {
            const response = await fetch(`${WHATSAPP_WORKER_URL}/status`, {
                method: 'GET',
                signal: AbortSignal.timeout(2000)
            });
            return response.ok;
        } catch {
            return false;
        }
    }
}

// Export singleton instance
export const whatsappService = new WhatsAppService();
