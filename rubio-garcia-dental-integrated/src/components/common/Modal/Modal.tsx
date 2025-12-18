import React from 'react';
import { X } from 'lucide-react';

export interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
    size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl';
    closeOnOverlay?: boolean;
}

export interface ModalHeaderProps {
    children: React.ReactNode;
    onClose?: () => void;
    className?: string;
}

export interface ModalBodyProps {
    children: React.ReactNode;
    className?: string;
}

export interface ModalFooterProps {
    children: React.ReactNode;
    className?: string;
}

const sizeClasses = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl',
    '2xl': 'max-w-2xl',
};

export const Modal: React.FC<ModalProps> & {
    Header: React.FC<ModalHeaderProps>;
    Body: React.FC<ModalBodyProps>;
    Footer: React.FC<ModalFooterProps>;
} = ({ isOpen, onClose, children, size = 'md', closeOnOverlay = true }) => {
    if (!isOpen) return null;

    return (
        <div
            className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 animate-fade-in"
            onClick={closeOnOverlay ? onClose : undefined}
        >
            <div
                className={`bg-white rounded-2xl shadow-2xl w-full ${sizeClasses[size]} max-h-[90vh] overflow-hidden`}
                onClick={(e) => e.stopPropagation()}
            >
                {children}
            </div>
        </div>
    );
};

const ModalHeader: React.FC<ModalHeaderProps> = ({ children, onClose, className = '' }) => (
    <div className={`p-6 border-b border-gray-100 flex justify-between items-center bg-gradient-to-r from-brand-blue to-brand-cyan ${className}`}>
        <div className="flex items-center gap-3 text-white">
            {children}
        </div>
        {onClose && (
            <button
                onClick={onClose}
                className="p-2 hover:bg-white/10 rounded-lg transition-colors"
            >
                <X size={20} className="text-white" />
            </button>
        )}
    </div>
);

const ModalBody: React.FC<ModalBodyProps> = ({ children, className = '' }) => (
    <div className={`p-6 overflow-y-auto max-h-[calc(90vh-200px)] ${className}`}>
        {children}
    </div>
);

const ModalFooter: React.FC<ModalFooterProps> = ({ children, className = '' }) => (
    <div className={`p-6 border-t border-gray-100 flex justify-end gap-2 bg-gray-50 ${className}`}>
        {children}
    </div>
);

Modal.Header = ModalHeader;
Modal.Body = ModalBody;
Modal.Footer = ModalFooter;

export default Modal;
