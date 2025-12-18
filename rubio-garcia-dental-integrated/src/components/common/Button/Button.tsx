import React from 'react';
import { Loader2 } from 'lucide-react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
    size?: 'sm' | 'md' | 'lg';
    loading?: boolean;
    icon?: React.ReactNode;
    fullWidth?: boolean;
}

const variantClasses = {
    primary: 'bg-brand-dark text-white hover:bg-brand-blue shadow-sm',
    secondary: 'bg-brand-cyan text-white hover:bg-brand-cyan/90 shadow-sm',
    outline: 'border-2 border-brand-blue text-brand-blue hover:bg-brand-blue hover:text-white',
    ghost: 'text-brand-dark hover:bg-gray-100',
    danger: 'bg-alert-error text-white hover:bg-alert-error/90 shadow-sm',
};

const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-sm',
    lg: 'px-6 py-3 text-base',
};

export const Button: React.FC<ButtonProps> = ({
    variant = 'primary',
    size = 'md',
    loading = false,
    icon,
    fullWidth = false,
    disabled,
    children,
    className = '',
    ...props
}) => {
    const baseClasses = 'rounded-xl font-bold transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2';
    const widthClass = fullWidth ? 'w-full' : '';

    return (
        <button
            className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${widthClass} ${className}`}
            disabled={disabled || loading}
            {...props}
        >
            {loading && <Loader2 size={16} className="animate-spin" />}
            {!loading && icon}
            {children}
        </button>
    );
};

export default Button;
