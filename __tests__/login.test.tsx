import '@testing-library/jest-dom'
import { render, screen, fireEvent, waitFor  } from '@testing-library/react'
import { store } from '../src/app/store/index';
import LoginPage from '../src/app/login/page'
import { Provider } from 'react-redux';

import { useRouter } from 'next/navigation';
import { authApi } from '@/api/auth-api';

jest.mock('next/navigation', () => ({
    useRouter: jest.fn(),
}));

jest.mock('../src/api/auth-api', () => ({
    authApi: {
        login: jest.fn(),
    },
}));

describe('LoginPage', () => {
    it('renders Log in button', () => {
        const mockPush = jest.fn();
        const mockRouter = {
            push: mockPush
        };
        (useRouter as jest.Mock).mockReturnValue(mockRouter);

        render(
            <Provider store={store}>
                <LoginPage />
            </Provider>
        )

        expect(screen.getByText(/Log in/i)).toBeInTheDocument();
    });

    it('navigates to /tasks when login is successful', async () => {
        const mockPush = jest.fn();
        const mockRouter = {
            push: mockPush,
        };
        (useRouter as jest.Mock).mockReturnValue(mockRouter);

        (authApi.login as jest.Mock).mockResolvedValue({ token: 'fake-token' });
        
        render(
            <Provider store={store}>
                <LoginPage />
            </Provider>
        );
        
        const emailInput = screen.getByTestId('email-input');
        const passwordInput = screen.getByTestId('password-input');
        const loginButton = screen.getByRole('button', { name: /Log in/i });

        fireEvent.change(emailInput, { target: { value: 'admin@example.com' } });
        fireEvent.change(passwordInput, { target: { value: '1234' } });
        
        fireEvent.click(loginButton);

        await waitFor(() => expect(authApi.login).toHaveBeenCalledTimes(1));

        await waitFor(() => expect(mockPush).toHaveBeenCalledWith('/tasks'));
    });
})