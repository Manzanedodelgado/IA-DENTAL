import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import { WhatsAppManager } from './whatsappManager.js';

const app = express();
const httpServer = createServer(app);

// CORS configuration
app.use(cors({
    origin: ['http://localhost:5173', 'http://localhost:3000'],
    credentials: true
}));
app.use(express.json());

// Socket.IO setup
const io = new Server(httpServer, {
    cors: {
        origin: ['http://localhost:5173', 'http://localhost:3000'],
        methods: ['GET', 'POST'],
        credentials: true
    }
});

// WhatsApp Manager instance
const whatsapp = new WhatsAppManager(io);

// ============ REST API ENDPOINTS ============

// Health check
app.get('/status', (req, res) => {
    res.json({
        status: 'running',
        whatsapp: whatsapp.getStatus(),
        timestamp: new Date().toISOString()
    });
});

// Get all chats
app.get('/chats', async (req, res) => {
    try {
        const chats = await whatsapp.getChats();
        res.json(chats);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get messages for a specific chat
app.get('/chats/:jid/messages', async (req, res) => {
    try {
        const messages = await whatsapp.getMessages(req.params.jid, parseInt(req.query.limit) || 50);
        res.json(messages);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Send a message
app.post('/send', async (req, res) => {
    try {
        const { to, message } = req.body;
        if (!to || !message) {
            return res.status(400).json({ error: 'Missing "to" or "message" field' });
        }
        const result = await whatsapp.sendMessage(to, message);
        res.json({ success: true, messageId: result.key.id });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Disconnect and logout
app.post('/logout', async (req, res) => {
    try {
        await whatsapp.logout();
        res.json({ success: true, message: 'Logged out successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Reconnect
app.post('/reconnect', async (req, res) => {
    try {
        await whatsapp.connect();
        res.json({ success: true, message: 'Reconnection initiated' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// ============ SOCKET.IO EVENTS ============

io.on('connection', (socket) => {
    console.log('🔌 Client connected:', socket.id);

    // Send current status to new client
    socket.emit('status', whatsapp.getStatus());

    // Handle disconnect
    socket.on('disconnect', () => {
        console.log('🔌 Client disconnected:', socket.id);
    });

    // Handle send message request via socket
    socket.on('send_message', async (data) => {
        try {
            const result = await whatsapp.sendMessage(data.to, data.message);
            socket.emit('message_sent', { success: true, messageId: result.key.id });
        } catch (error) {
            socket.emit('message_error', { error: error.message });
        }
    });
});

// ============ START SERVER ============

const PORT = process.env.PORT || 3001;

httpServer.listen(PORT, () => {
    console.log(`
╔═══════════════════════════════════════════════════╗
║     WhatsApp Worker Service - Rubio García        ║
╠═══════════════════════════════════════════════════╣
║  🚀 Server running on http://localhost:${PORT}       ║
║  📡 Socket.IO ready for connections               ║
║  📱 Initializing WhatsApp connection...           ║
╚═══════════════════════════════════════════════════╝
    `);

    // Initialize WhatsApp connection on startup
    whatsapp.connect();
});
