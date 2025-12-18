import React from 'react';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
    helperText?: string;
    icon?: React.ReactNode;
}

export const Input: React.FC<InputProps> = ({
    label,
    error,
    helperText,
    icon,
    className = '',
    ...props
}) => {
    return (
        <div className="w-full">
            {label && (
                <label className="text-xs font-bold text-gray-500 uppercase block mb-2">
                    {label} {props.required && <span className="text-alert-error">*</span>}
                </label>
            )}
            <div className="relative">
                {icon && (
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                        {icon}
                    </div>
                )}
                <input
                    className={`
                        w-full px-4 py-2 border rounded-xl
                        focus:outline-none focus:ring-2 focus:ring-brand-cyan focus:border-transparent
                        disabled:opacity-50 disabled:cursor-not-allowed
                        ${error ? 'border-alert-error' : 'border-gray-300'}
                        ${icon ? 'pl-10' : ''}
                        ${className}
                    `}
                    {...props}
                />
            </div>
            {error && (
                <p className="text-xs text-alert-error mt-1">{error}</p>
            )}
            {helperText && !error && (
                <p className="text-xs text-gray-500 mt-1">{helperText}</p>
            )}
        </div>
    );
};

export default Input;
