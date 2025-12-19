/**
 * Logger estructurado con redacción de PII
 * Reemplaza console.log en toda la aplicación
 */

type LogLevel = 'debug' | 'info' | 'warn' | 'error'

interface LogContext {
    [key: string]: any
}

const PII_FIELDS = ['email', 'phone', 'dni', 'password', 'address', 'mobile', 'telefono', 'correo']

/**
 * Redacta información personal identificable (PII)
 */
function redactPII(data: any): any {
    if (typeof data !== 'object' || data === null) {
        return data
    }

    if (Array.isArray(data)) {
        return data.map(redactPII)
    }

    const redacted: any = {}
    for (const [key, value] of Object.entries(data)) {
        const lowerKey = key.toLowerCase()
        if (PII_FIELDS.some(field => lowerKey.includes(field))) {
            redacted[key] = '[REDACTED]'
        } else if (typeof value === 'object') {
            redacted[key] = redactPII(value)
        } else {
            redacted[key] = value
        }
    }
    return redacted
}

class StructuredLogger {
    private isDevelopment = process.env.NODE_ENV === 'development'

    private log(level: LogLevel, message: string, context?: LogContext) {
        const timestamp = new Date().toISOString()
        const redactedContext = context ? redactPII(context) : {}

        const logEntry = {
            timestamp,
            level,
            message,
            ...redactedContext
        }

        // En producción, usar JSON estructurado
        if (!this.isDevelopment) {
            console.log(JSON.stringify(logEntry))
            return
        }

        // En desarrollo, formato legible
        const emoji = {
            debug: '🔍',
            info: 'ℹ️',
            warn: '⚠️',
            error: '❌'
        }[level]

        console.log(`${emoji} [${level.toUpperCase()}] ${message}`, redactedContext)
    }

    debug(message: string, context?: LogContext) {
        this.log('debug', message, context)
    }

    info(message: string, context?: LogContext) {
        this.log('info', message, context)
    }

    warn(message: string, context?: LogContext) {
        this.log('warn', message, context)
    }

    error(message: string, context?: LogContext) {
        this.log('error', message, context)
    }
}

export const logger = new StructuredLogger()
