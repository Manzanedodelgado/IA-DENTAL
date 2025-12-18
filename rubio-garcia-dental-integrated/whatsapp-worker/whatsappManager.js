import makeWASocket, {
    DisconnectReason,
    useMultiFileAuthState,
    fetchLatestBaileysVersion,
    makeCacheableSignalKeyStore
} from '@whiskeysockets/baileys';
import { Boom } from '@hapi/boom';
import pino from 'pino';
import QRCode from 'qrcode';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const AUTH_FOLDER = path.join(__dirname, 'auth_info');

// Logger configuration
const logger = pino({ level: 'warn' });

export class WhatsAppManager {
    constructor(io) {
        this.io = io;
        this.socket = null;
        this.status = 'disconnected';
        this.qrCode = null;
        this.user = null;
        this.chats = new Map();
        this.messages = new Map();
    }

    getStatus() {
        return {
            status: this.status,
            user: this.user,
            hasQR: !!this.qrCode,
            qrCode: this.qrCode,
            chatsCount: this.chats.size
        };
    }

    async connect() {
        try {
            // Ensure auth folder exists
            if (!fs.existsSync(AUTH_FOLDER)) {
                fs.mkdirSync(AUTH_FOLDER, { recursive: true });
            }

            // Load auth state
            const { state, saveCreds } = await useMultiFileAuthState(AUTH_FOLDER);

            // Get latest Baileys version
            const { version, isLatest } = await fetchLatestBaileysVersion();
            console.log(`📦 Using Baileys v${version.join('.')} (latest: ${isLatest})`);

            // Create socket connection
            this.socket = makeWASocket({
                version,
                logger,
                printQRInTerminal: true,
                auth: {
                    creds: state.creds,
                    keys: makeCacheableSignalKeyStore(state.keys, logger)
                },
                browser: ['Rubio García Dental', 'Chrome', '121.0.0'],
                generateHighQualityLinkPreview: true
            });

            // Bind events
            this.bindEvents(saveCreds);

            this.status = 'connecting';
            this.io.emit('status', this.getStatus());

        } catch (error) {
            console.error('❌ Connection error:', error);
            this.status = 'error';
            this.io.emit('status', this.getStatus());
            this.io.emit('error', { message: error.message });
        }
    }

    bindEvents(saveCreds) {
        const sock = this.socket;

        // Connection updates
        sock.ev.on('connection.update', async (update) => {
            const { connection, lastDisconnect, qr } = update;

            // QR Code received
            if (qr) {
                console.log('📱 QR Code generated - scan with WhatsApp');
                this.status = 'qr_ready';

                // Generate QR as data URL for frontend
                try {
                    this.qrCode = await QRCode.toDataURL(qr, {
                        width: 256,
                        margin: 2,
                        color: { dark: '#1D1160', light: '#FFFFFF' }
                    });
                    this.io.emit('qr', this.qrCode);
                    this.io.emit('status', this.getStatus());
                } catch (err) {
                    console.error('QR generation error:', err);
                }
            }

            // Connection opened
            if (connection === 'open') {
                console.log('✅ WhatsApp connected successfully!');
                this.status = 'connected';
                this.qrCode = null;
                this.user = sock.user;
                this.io.emit('connected', { user: this.user });
                this.io.emit('status', this.getStatus());
            }

            // Connection closed
            if (connection === 'close') {
                const statusCode = (lastDisconnect?.error instanceof Boom)
                    ? lastDisconnect.error.output.statusCode
                    : 500;

                const shouldReconnect = statusCode !== DisconnectReason.loggedOut;

                console.log(`⚠️ Connection closed (code: ${statusCode}). Reconnect: ${shouldReconnect}`);

                if (shouldReconnect) {
                    this.status = 'reconnecting';
                    this.io.emit('status', this.getStatus());
                    setTimeout(() => this.connect(), 3000);
                } else {
                    this.status = 'logged_out';
                    this.user = null;
                    this.qrCode = null;
                    this.io.emit('logged_out');
                    this.io.emit('status', this.getStatus());
                }
            }
        });

        // Save credentials when updated
        sock.ev.on('creds.update', saveCreds);

        // New messages
        sock.ev.on('messages.upsert', async ({ messages, type }) => {
            if (type !== 'notify') return;

            for (const msg of messages) {
                if (!msg.message || msg.key.fromMe) continue;

                const jid = msg.key.remoteJid;
                const text = msg.message.conversation ||
                    msg.message.extendedTextMessage?.text ||
                    '[Media]';

                const messageData = {
                    id: msg.key.id,
                    jid,
                    from: jid.replace('@s.whatsapp.net', ''),
                    pushName: msg.pushName || 'Unknown',
                    text,
                    timestamp: new Date(msg.messageTimestamp * 1000).toISOString(),
                    isFromMe: false
                };

                // Store message
                if (!this.messages.has(jid)) {
                    this.messages.set(jid, []);
                }
                this.messages.get(jid).push(messageData);

                // Update chat list
                this.chats.set(jid, {
                    jid,
                    name: msg.pushName || jid.replace('@s.whatsapp.net', ''),
                    lastMessage: text,
                    timestamp: messageData.timestamp,
                    unread: (this.chats.get(jid)?.unread || 0) + 1
                });

                console.log(`📩 New message from ${messageData.pushName}: ${text.substring(0, 50)}...`);

                // Emit to frontend
                this.io.emit('new_message', messageData);
                this.io.emit('chats_updated', Array.from(this.chats.values()));
            }
        });

        // Chat updates (for initial load)
        sock.ev.on('chats.upsert', (chats) => {
            for (const chat of chats) {
                this.chats.set(chat.id, {
                    jid: chat.id,
                    name: chat.name || chat.id.replace('@s.whatsapp.net', ''),
                    lastMessage: '',
                    timestamp: new Date().toISOString(),
                    unread: chat.unreadCount || 0
                });
            }
            this.io.emit('chats_updated', Array.from(this.chats.values()));
        });

        // Contacts update
        sock.ev.on('contacts.update', (contacts) => {
            for (const contact of contacts) {
                if (this.chats.has(contact.id)) {
                    const chat = this.chats.get(contact.id);
                    chat.name = contact.notify || contact.verifiedName || chat.name;
                    this.chats.set(contact.id, chat);
                }
            }
            this.io.emit('chats_updated', Array.from(this.chats.values()));
        });
    }

    async sendMessage(to, text) {
        if (!this.socket || this.status !== 'connected') {
            throw new Error('WhatsApp not connected');
        }

        // Format phone number
        let jid = to;
        if (!jid.includes('@')) {
            jid = jid.replace(/[^0-9]/g, '') + '@s.whatsapp.net';
        }

        console.log(`📤 Sending message to ${jid}: ${text.substring(0, 50)}...`);

        const result = await this.socket.sendMessage(jid, { text });

        // Store sent message
        const messageData = {
            id: result.key.id,
            jid,
            from: 'me',
            text,
            timestamp: new Date().toISOString(),
            isFromMe: true
        };

        if (!this.messages.has(jid)) {
            this.messages.set(jid, []);
        }
        this.messages.get(jid).push(messageData);

        // Update chat
        const existing = this.chats.get(jid) || { jid, name: jid.replace('@s.whatsapp.net', ''), unread: 0 };
        this.chats.set(jid, {
            ...existing,
            lastMessage: text,
            timestamp: messageData.timestamp
        });

        this.io.emit('message_sent', messageData);
        this.io.emit('chats_updated', Array.from(this.chats.values()));

        return result;
    }

    async getChats() {
        return Array.from(this.chats.values()).sort((a, b) =>
            new Date(b.timestamp) - new Date(a.timestamp)
        );
    }

    async getMessages(jid, limit = 50) {
        const msgs = this.messages.get(jid) || [];
        return msgs.slice(-limit);
    }

    async logout() {
        if (this.socket) {
            await this.socket.logout();
            this.socket = null;
            this.status = 'logged_out';
            this.user = null;
            this.qrCode = null;
            this.chats.clear();
            this.messages.clear();

            // Clear auth files
            if (fs.existsSync(AUTH_FOLDER)) {
                fs.rmSync(AUTH_FOLDER, { recursive: true });
            }

            this.io.emit('logged_out');
            this.io.emit('status', this.getStatus());
        }
    }
}
