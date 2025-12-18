/**
 * Example: Refactored PatientForm using new common components
 * 
 * This demonstrates how to use the new Modal, Input, Button components
 * and useForm hook to create a clean, maintainable form.
 * 
 * BEFORE: 150+ lines of inline modal with repetitive input styling
 * AFTER: ~80 lines with reusable components
 */

import React from 'react';
import { UserPlus } from 'lucide-react';
import { Modal, Input, Button } from '../../common';
import { useForm } from '../../../hooks';
import { Patient } from '../../../types';

export interface PatientFormProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (patient: Partial<Patient>) => Promise<void>;
    initialData?: Partial<Patient>;
}

interface PatientFormValues {
    firstName: string;
    lastName: string;
    dni: string;
    phone: string;
    email: string;
    address: string;
    birthDate: string;
}

const PatientForm: React.FC<PatientFormProps> = ({
    isOpen,
    onClose,
    onSubmit,
    initialData
}) => {
    const { values, errors, isSubmitting, handleChange, handleSubmit, resetForm } = useForm<PatientFormValues>({
        initialValues: {
            firstName: initialData?.firstName || '',
            lastName: initialData?.lastName || '',
            dni: initialData?.dni || '',
            phone: initialData?.phone || '',
            email: initialData?.email || '',
            address: initialData?.address || '',
            birthDate: initialData?.birthDate || '',
        },
        validate: (values) => {
            const errors: Partial<Record<keyof PatientFormValues, string>> = {};

            if (!values.firstName) errors.firstName = 'El nombre es obligatorio';
            if (!values.lastName) errors.lastName = 'Los apellidos son obligatorios';
            if (!values.phone) errors.phone = 'El teléfono es obligatorio';
            if (values.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
                errors.email = 'Email inválido';
            }

            return errors;
        },
        onSubmit: async (values) => {
            const patient: Partial<Patient> = {
                ...initialData,
                id: initialData?.id || Date.now().toString(),
                name: `${values.firstName} ${values.lastName}`.trim(),
                firstName: values.firstName,
                lastName: values.lastName,
                dni: values.dni,
                phone: values.phone,
                email: values.email,
                address: values.address,
                birthDate: values.birthDate,
                recordNumber: initialData?.recordNumber || `RG${Date.now().toString().slice(-6)}`,
                lastVisit: new Date().toISOString().split('T')[0],
                status: 'active'
            };

            await onSubmit(patient);
            resetForm();
            onClose();
        },
    });

    const handleClose = () => {
        resetForm();
        onClose();
    };

    return (
        <Modal isOpen={isOpen} onClose={handleClose} size="2xl">
            <Modal.Header onClose={handleClose}>
                <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
                    <UserPlus size={20} />
                </div>
                <h2 className="text-xl font-bold">
                    {initialData ? 'Editar Paciente' : 'Nuevo Paciente'}
                </h2>
            </Modal.Header>

            <form onSubmit={handleSubmit}>
                <Modal.Body>
                    <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <Input
                                label="Nombre"
                                placeholder="Juan"
                                required
                                value={values.firstName}
                                onChange={handleChange('firstName')}
                                error={errors.firstName}
                            />
                            <Input
                                label="Apellidos"
                                placeholder="García López"
                                required
                                value={values.lastName}
                                onChange={handleChange('lastName')}
                                error={errors.lastName}
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <Input
                                label="DNI/NIE"
                                placeholder="12345678A"
                                value={values.dni}
                                onChange={handleChange('dni')}
                                error={errors.dni}
                            />
                            <Input
                                label="Fecha de Nacimiento"
                                type="date"
                                value={values.birthDate}
                                onChange={handleChange('birthDate')}
                                error={errors.birthDate}
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <Input
                                label="Teléfono"
                                type="tel"
                                placeholder="600123456"
                                required
                                value={values.phone}
                                onChange={handleChange('phone')}
                                error={errors.phone}
                            />
                            <Input
                                label="Email"
                                type="email"
                                placeholder="juan@example.com"
                                value={values.email}
                                onChange={handleChange('email')}
                                error={errors.email}
                            />
                        </div>

                        <Input
                            label="Dirección"
                            placeholder="Calle Principal, 123"
                            value={values.address}
                            onChange={handleChange('address')}
                            error={errors.address}
                        />
                    </div>
                </Modal.Body>

                <Modal.Footer>
                    <p className="text-xs text-gray-500 mr-auto">* Campos obligatorios</p>
                    <Button
                        type="button"
                        variant="outline"
                        onClick={handleClose}
                    >
                        Cancelar
                    </Button>
                    <Button
                        type="submit"
                        variant="primary"
                        loading={isSubmitting}
                        icon={<UserPlus size={16} />}
                    >
                        {initialData ? 'Guardar Cambios' : 'Crear Paciente'}
                    </Button>
                </Modal.Footer>
            </form>
        </Modal>
    );
};

export default PatientForm;
