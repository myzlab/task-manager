import React, { useRef, forwardRef, useImperativeHandle } from 'react';
import { Toast } from 'primereact/toast';

export interface ToastMessage {
    severity: 'success' | 'info' | 'warn' | 'error';
    summary: string;
    detail: string;
    life?: number; // Opcional: duración del mensaje
}

export interface ToastHandler {
    showMessage: (message: ToastMessage) => void;
}

const ToastWrapper = forwardRef<ToastHandler>((_, ref) => {
    const toast = useRef<Toast>(null);

    // Exponer métodos a través de la referencia
    useImperativeHandle(ref, () => ({
        showMessage(message: ToastMessage) {
            toast.current?.show(message);
        },
    }));

    return <Toast ref={toast} />;
});

export default ToastWrapper;
