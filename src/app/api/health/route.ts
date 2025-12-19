import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

/**
 * Health Check Endpoint
 * 
 * Monitorea el estado del sistema y sus dependencias críticas
 * 
 * @returns {Object} Estado del sistema con timestamp y servicios
 */
export async function GET() {
    try {
        // Test database connection
        const dbStart = Date.now();
        await prisma.$queryRaw`SELECT 1`;
        const dbLatency = Date.now() - dbStart;

        // Check AI Gateway (si está configurado)
        const aiStatus = process.env.NEXT_PUBLIC_API_URL ? 'CONFIGURED' : 'NOT_CONFIGURED';

        const healthStatus = {
            status: 'UP',
            timestamp: new Date().toISOString(),
            services: {
                database: {
                    status: 'CONNECTED',
                    latency: `${dbLatency}ms`
                },
                ai_gateway: {
                    status: aiStatus,
                    url: process.env.NEXT_PUBLIC_API_URL || null
                }
            },
            version: process.env.npm_package_version || '1.2.0'
        };

        return NextResponse.json(healthStatus, { status: 200 });
    } catch (error: any) {
        return NextResponse.json(
            {
                status: 'DOWN',
                timestamp: new Date().toISOString(),
                error: error.message || 'Database unreachable'
            },
            { status: 503 }
        );
    }
}
