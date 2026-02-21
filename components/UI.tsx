import React from 'react';
import { ArrowUpRight, ArrowDownRight, LucideIcon } from 'lucide-react';

interface StatCardProps {
    icon: LucideIcon;
    title: string;
    value: string;
    trend?: string;
    isPositive?: boolean;
    color: string;
    description?: string;
    onClick?: () => void;
}

/**
 * Premium StatCard following the "Nivel 3: Gestión Avanzada" standard.
 */
export const StatCard: React.FC<StatCardProps> = ({
    icon: Icon,
    title,
    value,
    trend,
    isPositive = true,
    color,
    description,
    onClick
}) => (
    <div
        onClick={onClick}
        className={`bg-white dark:bg-slate-800 p-5 rounded-md shadow-sm border-2 border-[#051650] dark:border-slate-700 hover:border-blue-600 transition-all group relative overflow-hidden ${onClick ? 'cursor-pointer active:scale-95' : ''}`}
    >
        <div className="flex justify-between items-start mb-3 relative z-10">
            <div className={`p-2.5 rounded-md ${color} bg-opacity-10`}>
                <Icon className={`w-5 h-5 ${color}`} />
            </div>
            {trend && (
                <div className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black ${isPositive ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'}`}>
                    {isPositive ? <ArrowUpRight className="w-3.5 h-3.5" /> : <ArrowDownRight className="w-3.5 h-3.5" />}
                    {trend}
                </div>
            )}
        </div>
        <div className="relative z-10">
            <p className="text-[10px] font-bold uppercase tracking-wider text-slate-600 mb-1">{title}</p>
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mt-0.5 tracking-tight">{value}</h3>
            {description && <p className="text-[10px] text-slate-700 mt-1 font-bold">{description}</p>}
        </div>
    </div>
);

interface PremiumContainerProps {
    children: React.ReactNode;
    title?: string;
    subtitle?: string;
    actions?: React.ReactNode;
    footer?: React.ReactNode;
    className?: string;
}

/**
 * High-Density Container for main views.
 */
export const PremiumContainer: React.FC<PremiumContainerProps> = ({
    children,
    title,
    subtitle,
    actions,
    footer,
    className = ""
}) => (
    <div className={`bg-white dark:bg-slate-800 rounded-md border-2 border-[#051650] dark:border-slate-700 shadow-sm overflow-hidden flex flex-col ${className}`}>
        {(title || actions) && (
            <div className="px-6 py-4 border-b-2 border-[#051650] dark:border-slate-700 flex justify-between items-center bg-slate-50">
                <div>
                    {title && <h3 className="text-md font-bold text-slate-800 dark:text-white tracking-tight uppercase">{title}</h3>}
                    {subtitle && <p className="text-xs text-slate-500 font-medium">{subtitle}</p>}
                </div>
                {actions && <div className="flex items-center gap-2">{actions}</div>}
            </div>
        )}
        <div className="p-6 flex-1">
            {children}
        </div>
        {footer && (
            <div className="px-6 py-3 border-t border-slate-100 dark:border-slate-700 bg-slate-50/30">
                {footer}
            </div>
        )}
    </div>
);

interface BadgeProps {
    children: React.ReactNode;
    variant?: 'blue' | 'emerald' | 'rose' | 'amber' | 'slate';
    className?: string;
}

export const Badge: React.FC<BadgeProps> = ({ children, variant = 'slate', className = "" }) => {
    const variants = {
        blue: 'bg-blue-50 text-blue-600 border-blue-100',
        emerald: 'bg-emerald-50 text-emerald-600 border-emerald-100',
        rose: 'bg-rose-50 text-rose-600 border-rose-100',
        amber: 'bg-amber-50 text-amber-600 border-amber-100',
        slate: 'bg-slate-50 text-slate-600 border-slate-100',
    };

    return (
        <span className={`px-2 py-0.5 rounded-sm border text-[9px] font-bold uppercase tracking-wider ${variants[variant]} ${className}`}>
            {children}
        </span>
    );
};
