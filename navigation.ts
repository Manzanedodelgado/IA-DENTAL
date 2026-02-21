
import { type MenuItem } from './types';

export const navigationItems: MenuItem[] = [
    {
        name: 'CLÍNICA',
        icon: 'dashboard',
        title: 'Cuadro de Mando Operativo',
        children: [
            { name: 'Resumen del Día', icon: 'dashboard' },
            { name: 'KPIs & Métricas', icon: 'analytics' },
        ]
    },
    {
        name: 'Agenda',
        icon: 'calendar_today',
        title: 'Agenda Clínica',
        children: [
            { name: 'Semana Completa', icon: 'view_week' },
            { name: 'Jornada de Hoy', icon: 'view_day' },
            { name: 'Gestión de Citas', icon: 'edit_calendar' },
            { name: 'Lista de Espera', icon: 'hourglass_top' },
        ]
    },
    {
        name: 'Pacientes',
        icon: 'people',
        title: 'Ficha de Paciente',
        children: [
            { name: 'Historia Clínica', icon: 'medical_information' },
            { name: 'Odontograma 3D', icon: 'grid_view' },
            { name: 'Sondaje Periodontal', icon: 'sick' },
            { name: 'Documentos y Consentimientos', icon: 'description' },
            { name: 'Cuenta Corriente', icon: 'payments' },
            { name: 'Presupuestos', icon: 'request_quote' },
        ]
    },
    {
        name: 'IA & Automatización',
        icon: 'psychology',
        title: 'Cerebro Digital',
        children: [
            { name: 'Asistente Sara ✦', icon: 'smart_toy' },
            { name: 'Mensajes y Plantillas', icon: 'fact_check' },
            { name: 'Flujos Automáticos', icon: 'rule' },
        ]
    },
    {
        name: 'Inventario',
        icon: 'inventory_2',
        title: 'Smart Inventory',
        children: [
            { name: 'Panel de Stock', icon: 'grid_view' },
            { name: 'Trazabilidad por QR', icon: 'qr_code_scanner' },
            { name: 'Reposición con IA', icon: 'shopping_cart' },
        ]
    },
    {
        name: 'Gestoría',
        icon: 'business_center',
        title: 'Gestoría Inteligente',
        children: [
            { name: 'Visión Financiera', icon: 'analytics' },
            { name: 'Facturación', icon: 'receipt_long' },
            { name: 'Banco y Conciliación', icon: 'account_balance' },
            { name: 'Declaraciones Fiscales', icon: 'request_page' },
            { name: 'Informes de Gestión', icon: 'analytics' },
        ]
    },
    {
        name: 'Whatsapp',
        icon: 'chat',
        title: 'Centro de Mensajería',
        children: [
            { name: 'Conversaciones', icon: 'inbox' },
            { name: 'Agenda de Contactos', icon: 'contacts' },
        ]
    },
];
