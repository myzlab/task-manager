'use client';

import React, { useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { Button } from 'primereact/button';
import InfoMessage from '@/components/util/InfoMessage';
import ToastWrapper, { ToastHandler } from '@/components/util/ToastWrapper';
import { authApi } from '@/api/auth-api';
import Label from '@/components/util/Label';
import InputErrorMessage from '@/components/util/InputErrorMessage';
import { useAuthService } from '@/services/auth-service';
import './styles.scss';

export default function LoginPage() {
    const [email, setEmail] = useState('admin@example.com');
    const [password, setPassword] = useState('1234');
    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const [loading, setLoading] = useState(false);
    const toastRef = useRef<ToastHandler>(null);
    const { loginUser, token } = useAuthService();
    const router = useRouter();

    React.useEffect(() => {
        if (token) {
            router.push('/tasks');
        }
    }, [router, token]);

    const validateForm = () => {
        const newErrors: { [key: string]: string } = {};

        if (!email.trim()) newErrors.email = 'Email is required';
        if (!password.trim()) newErrors.password = 'Password is required';

        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;
    };

    const handleLogin = async () => {
        if (!validateForm()) {
            return;
        }

        setLoading(true);

        try {
            const response = await authApi.login(email, password);

            loginUser(response.token);
        } catch (error: unknown) {
            if (!(error instanceof Error)) {
                return;
            }

            toastRef.current?.showMessage({
                severity: 'error',
                summary: 'Error',
                detail: error.message
            });
        } finally {
            setLoading(false);
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            handleLogin();
        }
    };

    return (
        <div className="flex justify-content-center align-items-center min-h-screen bg-gradient">
            <ToastWrapper ref={toastRef} />
            <div className="login-card">
                <div className="mb-3 text-center font-semibold">
                    Welcome to task manager
                </div>
                <div className="mb-3">
                    <InfoMessage html={"Use <b>admin@example.com</b> and <b>1234</b>"} />
                </div>
                <div className="flex flex-column gap-3">
                    <div className="z-field">
                        <Label htmlFor="email">Email</Label>
                        <InputText
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="example@mail.com"
                            onKeyDown={handleKeyDown}
                            data-testid="email-input"
                        />
                        <InputErrorMessage error={errors.email} />
                    </div>
                    <div className="z-field">
                        <Label htmlFor="password">Password</Label>
                        <Password
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="············"
                            feedback={false}
                            toggleMask
                            onKeyDown={handleKeyDown}
                            data-testid="password-input"
                        />
                        <InputErrorMessage error={errors.password} />
                    </div>
                    <Button
                        label="Log in"
                        onClick={handleLogin}
                        iconPos='right'
                        loading={loading}
                    />
                </div>
            </div>
        </div>
    );
}
