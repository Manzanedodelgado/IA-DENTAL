/**
 * Messaging Service - Unified service for automated messages
 * Integrates with WhatsApp Worker for real message delivery
 */

import { whatsappService, WhatsAppStatus } from './whatsappService';

// Message types
export type MessageChannel = 'whatsapp' | 'sms' | 'email';
export type MessageType = 'reminder' | 'followup' | 'consent' | 'questionnaire' | 'info' | 'custom';

// Template with variables
export interface MessageTemplate {
    id: string;
    name: string;
    type: MessageType;
    channel: MessageChannel;
    content: string;
    variables: string[]; // e.g., ['NOMBRE', 'FECHA_CITA', 'HORA_CITA']
}

// Scheduled message
export interface ScheduledMessage {
    id: string;
    templateId?: string;
    recipientPhone: string;
    recipientName: string;
    content: string;
    channel: MessageChannel;
    type: MessageType;
    scheduledFor: Date;
    status: 'pending' | 'sent' | 'failed' | 'cancelled';
    attempts: number;
    lastAttempt?: Date;
    error?: string;
    metadata?: Record<string, any>;
}

// Message result
export interface SendResult {
    success: boolean;
    messageId?: string;
    error?: string;
    channel: MessageChannel;
    timestamp: Date;
}

// Built-in templates
export const MESSAGE_TEMPLATES: MessageTemplate[] = [
    {
        id: 'reminder-24h',
        name: 'Recordatorio 24h',
        type: 'reminder',
        channel: 'whatsapp',
        content: `📅 *Recordatorio de Cita*

Hola [NOMBRE], le recordamos que tiene cita en *Rubio García Dental*:

📆 Fecha: [FECHA_CITA]
⏰ Hora: [HORA_CITA]
👨‍⚕️ Doctor: [DOCTOR]
💊 Tratamiento: [TRATAMIENTO]

¿Confirma asistencia? Responda *SÍ* o *NO*`,
        variables: ['NOMBRE', 'FECHA_CITA', 'HORA_CITA', 'DOCTOR', 'TRATAMIENTO']
    },
    {
        id: 'reminder-1h',
        name: 'Recordatorio 1h',
        type: 'reminder',
        channel: 'whatsapp',
        content: `⏰ *Recordatorio Urgente*

Hola [NOMBRE], su cita es en *1 hora*:

📍 Rubio García Dental
⏰ [HORA_CITA]
👨‍⚕️ [DOCTOR]

¡Le esperamos!`,
        variables: ['NOMBRE', 'HORA_CITA', 'DOCTOR']
    },
    {
        id: 'followup-48h',
        name: 'Seguimiento 48h',
        type: 'followup',
        channel: 'whatsapp',
        content: `👋 Hola [NOMBRE],

Han pasado 48 horas desde su tratamiento de *[TRATAMIENTO]*.

¿Cómo se encuentra? ¿Tiene alguna molestia o pregunta?

Estamos aquí para ayudarle. Puede responder a este mensaje o llamarnos.

*Rubio García Dental*`,
        variables: ['NOMBRE', 'TRATAMIENTO']
    },
    {
        id: 'consent-implant',
        name: 'Consentimiento Implantes',
        type: 'consent',
        channel: 'whatsapp',
        content: `📋 *Consentimiento Informado*

Estimado/a [NOMBRE],

Antes de su cita de implantes, necesitamos su consentimiento informado.

👉 Por favor, lea el documento y confirme con *ACEPTO*:

[LINK_DOCUMENTO]

Si tiene dudas, estaremos encantados de resolverlas en consulta.`,
        variables: ['NOMBRE', 'LINK_DOCUMENTO']
    },
    {
        id: 'questionnaire-new-patient',
        name: 'Cuestionario Nuevo Paciente',
        type: 'questionnaire',
        channel: 'whatsapp',
        content: `🏥 *Bienvenido a Rubio García Dental*

Hola [NOMBRE],

Para poder atenderle de la mejor manera, necesitamos algunos datos.

Por favor, complete nuestro cuestionario de salud:
[LINK_CUESTIONARIO]

🛡️ Sus datos están protegidos según RGPD.`,
        variables: ['NOMBRE', 'LINK_CUESTIONARIO']
    },
    {
        id: 'info-preparation',
        name: 'Preparación Pre-Cita',
        type: 'info',
        channel: 'whatsapp',
        content: `ℹ️ *Instrucciones para su cita*

Hola [NOMBRE],

Para su cita de *[TRATAMIENTO]*, tenga en cuenta:

[INSTRUCCIONES]

Si tiene alguna duda, no dude en contactarnos.

📞 +34 912 345 678
*Rubio García Dental*`,
        variables: ['NOMBRE', 'TRATAMIENTO', 'INSTRUCCIONES']
    }
];

// In-memory queue for scheduled messages
let messageQueue: ScheduledMessage[] = [];
let processorInterval: NodeJS.Timeout | null = null;
let listeners: Array<(messages: ScheduledMessage[]) => void> = [];

class MessagingService {
    /**
     * Replace template variables with actual values
     */
    private replaceVariables(content: string, variables: Record<string, string>): string {
        let result = content;
        for (const [key, value] of Object.entries(variables)) {
            result = result.replace(new RegExp(`\\[${key}\\]`, 'g'), value);
        }
        return result;
    }

    /**
     * Get template by ID
     */
    getTemplate(templateId: string): MessageTemplate | undefined {
        return MESSAGE_TEMPLATES.find(t => t.id === templateId);
    }

    /**
     * Get all templates
     */
    getAllTemplates(): MessageTemplate[] {
        return MESSAGE_TEMPLATES;
    }

    /**
     * Get templates by type
     */
    getTemplatesByType(type: MessageType): MessageTemplate[] {
        return MESSAGE_TEMPLATES.filter(t => t.type === type);
    }

    /**
     * Send immediate message via WhatsApp
     */
    async sendMessage(
        phone: string,
        content: string,
        type: MessageType = 'custom'
    ): Promise<SendResult> {
        try {
            const result = await whatsappService.sendMessage(phone, content);

            return {
                success: result.success,
                messageId: result.messageId,
                error: result.error,
                channel: 'whatsapp',
                timestamp: new Date()
            };
        } catch (error: any) {
            return {
                success: false,
                error: error.message || 'Error sending message',
                channel: 'whatsapp',
                timestamp: new Date()
            };
        }
    }

    /**
     * Send message using template
     */
    async sendTemplateMessage(
        templateId: string,
        phone: string,
        variables: Record<string, string>
    ): Promise<SendResult> {
        const template = this.getTemplate(templateId);

        if (!template) {
            return {
                success: false,
                error: `Template ${templateId} not found`,
                channel: 'whatsapp',
                timestamp: new Date()
            };
        }

        const content = this.replaceVariables(template.content, variables);
        return this.sendMessage(phone, content, template.type);
    }

    /**
     * Schedule a message for future delivery
     */
    scheduleMessage(
        phone: string,
        recipientName: string,
        content: string,
        scheduledFor: Date,
        type: MessageType = 'reminder',
        metadata?: Record<string, any>
    ): ScheduledMessage {
        const message: ScheduledMessage = {
            id: `msg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
            recipientPhone: phone,
            recipientName,
            content,
            channel: 'whatsapp',
            type,
            scheduledFor,
            status: 'pending',
            attempts: 0,
            metadata
        };

        messageQueue.push(message);
        this.persistQueue();
        this.notifyListeners();

        console.log(`📅 Message scheduled for ${scheduledFor.toLocaleString()} to ${phone}`);

        return message;
    }

    /**
     * Schedule using template
     */
    scheduleTemplateMessage(
        templateId: string,
        phone: string,
        recipientName: string,
        variables: Record<string, string>,
        scheduledFor: Date,
        metadata?: Record<string, any>
    ): ScheduledMessage | null {
        const template = this.getTemplate(templateId);

        if (!template) {
            console.error(`Template ${templateId} not found`);
            return null;
        }

        const content = this.replaceVariables(template.content, variables);

        const message: ScheduledMessage = {
            id: `msg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
            templateId,
            recipientPhone: phone,
            recipientName,
            content,
            channel: template.channel,
            type: template.type,
            scheduledFor,
            status: 'pending',
            attempts: 0,
            metadata
        };

        messageQueue.push(message);
        this.persistQueue();
        this.notifyListeners();

        return message;
    }

    /**
     * Cancel scheduled message
     */
    cancelMessage(messageId: string): boolean {
        const index = messageQueue.findIndex(m => m.id === messageId);
        if (index >= 0 && messageQueue[index].status === 'pending') {
            messageQueue[index].status = 'cancelled';
            this.persistQueue();
            this.notifyListeners();
            return true;
        }
        return false;
    }

    /**
     * Get pending messages
     */
    getPendingMessages(): ScheduledMessage[] {
        return messageQueue.filter(m => m.status === 'pending');
    }

    /**
     * Get all scheduled messages
     */
    getAllMessages(): ScheduledMessage[] {
        return [...messageQueue];
    }

    /**
     * Start message processor
     */
    startProcessor(): void {
        if (processorInterval) return;

        console.log('🚀 Message processor started');

        processorInterval = setInterval(async () => {
            await this.processQueue();
        }, 30000); // Check every 30 seconds

        // Process immediately on start
        this.processQueue();
    }

    /**
     * Stop message processor
     */
    stopProcessor(): void {
        if (processorInterval) {
            clearInterval(processorInterval);
            processorInterval = null;
            console.log('⏹️ Message processor stopped');
        }
    }

    /**
     * Process pending messages
     */
    private async processQueue(): Promise<void> {
        const now = new Date();
        const pending = messageQueue.filter(
            m => m.status === 'pending' && new Date(m.scheduledFor) <= now
        );

        if (pending.length === 0) return;

        console.log(`📬 Processing ${pending.length} scheduled messages...`);

        for (const message of pending) {
            try {
                // Check WhatsApp status
                const status = await whatsappService.getStatus();

                if (status.status !== 'connected') {
                    console.warn(`⚠️ WhatsApp not connected, skipping message to ${message.recipientPhone}`);
                    message.attempts++;
                    message.lastAttempt = new Date();

                    if (message.attempts >= 3) {
                        message.status = 'failed';
                        message.error = 'WhatsApp not available after 3 attempts';
                    }
                    continue;
                }

                // Send message
                const result = await this.sendMessage(
                    message.recipientPhone,
                    message.content,
                    message.type
                );

                message.attempts++;
                message.lastAttempt = new Date();

                if (result.success) {
                    message.status = 'sent';
                    console.log(`✅ Message sent to ${message.recipientPhone}`);
                } else {
                    if (message.attempts >= 3) {
                        message.status = 'failed';
                        message.error = result.error;
                    }
                    console.error(`❌ Failed to send to ${message.recipientPhone}: ${result.error}`);
                }
            } catch (error: any) {
                message.attempts++;
                message.lastAttempt = new Date();
                message.error = error.message;

                if (message.attempts >= 3) {
                    message.status = 'failed';
                }
            }
        }

        this.persistQueue();
        this.notifyListeners();
    }

    /**
     * Persist queue to localStorage
     */
    private persistQueue(): void {
        try {
            localStorage.setItem('scheduled_messages', JSON.stringify(messageQueue));
        } catch (e) {
            console.error('Error persisting message queue:', e);
        }
    }

    /**
     * Load queue from localStorage
     */
    loadQueue(): void {
        try {
            const saved = localStorage.getItem('scheduled_messages');
            if (saved) {
                messageQueue = JSON.parse(saved);
                // Convert date strings back to Date objects
                messageQueue.forEach(m => {
                    m.scheduledFor = new Date(m.scheduledFor);
                    if (m.lastAttempt) m.lastAttempt = new Date(m.lastAttempt);
                });
            }
        } catch (e) {
            console.error('Error loading message queue:', e);
            messageQueue = [];
        }
    }

    /**
     * Subscribe to queue changes
     */
    onQueueChange(callback: (messages: ScheduledMessage[]) => void): () => void {
        listeners.push(callback);
        return () => {
            listeners = listeners.filter(l => l !== callback);
        };
    }

    /**
     * Notify listeners of queue changes
     */
    private notifyListeners(): void {
        listeners.forEach(l => l([...messageQueue]));
    }

    // ============ Automation Helpers ============

    /**
     * Schedule appointment reminder
     */
    scheduleAppointmentReminder(
        patientPhone: string,
        patientName: string,
        appointmentDate: Date,
        appointmentTime: string,
        doctorName: string,
        treatment: string,
        hoursBefore: number = 24
    ): ScheduledMessage | null {
        const reminderTime = new Date(appointmentDate);
        reminderTime.setHours(reminderTime.getHours() - hoursBefore);

        // Don't schedule if reminder time is in the past
        if (reminderTime < new Date()) {
            console.warn('Reminder time is in the past, skipping');
            return null;
        }

        const templateId = hoursBefore <= 2 ? 'reminder-1h' : 'reminder-24h';

        return this.scheduleTemplateMessage(
            templateId,
            patientPhone,
            patientName,
            {
                NOMBRE: patientName,
                FECHA_CITA: appointmentDate.toLocaleDateString('es-ES', { weekday: 'long', day: 'numeric', month: 'long' }),
                HORA_CITA: appointmentTime,
                DOCTOR: doctorName,
                TRATAMIENTO: treatment
            },
            reminderTime,
            { appointmentDate: appointmentDate.toISOString(), type: 'reminder' }
        );
    }

    /**
     * Schedule post-treatment followup
     */
    scheduleFollowup(
        patientPhone: string,
        patientName: string,
        treatment: string,
        treatmentDate: Date,
        hoursAfter: number = 48
    ): ScheduledMessage | null {
        const followupTime = new Date(treatmentDate);
        followupTime.setHours(followupTime.getHours() + hoursAfter);

        return this.scheduleTemplateMessage(
            'followup-48h',
            patientPhone,
            patientName,
            {
                NOMBRE: patientName,
                TRATAMIENTO: treatment
            },
            followupTime,
            { treatmentDate: treatmentDate.toISOString(), type: 'followup' }
        );
    }

    /**
     * Send consent request
     */
    async sendConsentRequest(
        patientPhone: string,
        patientName: string,
        documentLink: string
    ): Promise<SendResult> {
        return this.sendTemplateMessage(
            'consent-implant',
            patientPhone,
            {
                NOMBRE: patientName,
                LINK_DOCUMENTO: documentLink
            }
        );
    }

    /**
     * Send questionnaire
     */
    async sendQuestionnaire(
        patientPhone: string,
        patientName: string,
        questionnaireLink: string
    ): Promise<SendResult> {
        return this.sendTemplateMessage(
            'questionnaire-new-patient',
            patientPhone,
            {
                NOMBRE: patientName,
                LINK_CUESTIONARIO: questionnaireLink
            }
        );
    }
}

// Export singleton
export const messagingService = new MessagingService();

// Auto-load queue and start processor
if (typeof window !== 'undefined') {
    messagingService.loadQueue();
    // Start processor after a short delay to allow WhatsApp to connect
    setTimeout(() => {
        messagingService.startProcessor();
    }, 5000);
}
