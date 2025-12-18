import React, { useState, ChangeEvent, FormEvent } from 'react';

export interface UseFormOptions<T> {
    initialValues: T;
    onSubmit: (values: T) => void | Promise<void>;
    validate?: (values: T) => Partial<Record<keyof T, string>>;
}

export interface UseFormReturn<T> {
    values: T;
    errors: Partial<Record<keyof T, string>>;
    isSubmitting: boolean;
    handleChange: (name: keyof T) => (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
    handleSubmit: (e: FormEvent<HTMLFormElement>) => Promise<void>;
    setFieldValue: (name: keyof T, value: any) => void;
    setFieldError: (name: keyof T, error: string) => void;
    resetForm: () => void;
}

export function useForm<T extends Record<string, any>>({
    initialValues,
    onSubmit,
    validate,
}: UseFormOptions<T>): UseFormReturn<T> {
    const [values, setValues] = useState<T>(initialValues);
    const [errors, setErrors] = useState<Partial<Record<keyof T, string>>>({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (name: keyof T) => (
        e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        const value = e.target.type === 'checkbox'
            ? (e.target as HTMLInputElement).checked
            : e.target.value;

        setValues(prev => ({ ...prev, [name]: value }));

        // Clear error when user starts typing
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: undefined }));
        }
    };

    const setFieldValue = (name: keyof T, value: any) => {
        setValues(prev => ({ ...prev, [name]: value }));
    };

    const setFieldError = (name: keyof T, error: string) => {
        setErrors(prev => ({ ...prev, [name]: error }));
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // Run validation if provided
        if (validate) {
            const validationErrors = validate(values);
            if (Object.keys(validationErrors).length > 0) {
                setErrors(validationErrors);
                return;
            }
        }

        setIsSubmitting(true);
        try {
            await onSubmit(values);
        } catch (error) {
            console.error('Form submission error:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    const resetForm = () => {
        setValues(initialValues);
        setErrors({});
        setIsSubmitting(false);
    };

    return {
        values,
        errors,
        isSubmitting,
        handleChange,
        handleSubmit,
        setFieldValue,
        setFieldError,
        resetForm,
    };
}

export default useForm;
