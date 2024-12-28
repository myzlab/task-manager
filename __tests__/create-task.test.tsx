import '@testing-library/jest-dom';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import TaskForm from '@/components/tasks/TaskForm';
import { Provider } from 'react-redux';
import { store } from '@/app/store/index';
import { useRouter } from 'next/navigation';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

describe('TaskForm Component', () => {
  it('displays "Title is required" when trying to save without a title', async () => {
    const mockRouter = { push: jest.fn() };
    (useRouter as jest.Mock).mockReturnValue(mockRouter);

    const mockHandleOperation = jest.fn();

    render(
      <Provider store={store}>
        <TaskForm handleOperation={mockHandleOperation} />
      </Provider>
    );

    const saveButton = screen.getByRole('button', { name: /Save/i });

    fireEvent.click(saveButton);

    await waitFor(() => {
      expect(screen.getByText(/Title is required/i)).toBeInTheDocument();
    });

    expect(mockHandleOperation).not.toHaveBeenCalled();
  });

  it('displays "Description is required" when trying to save without a description, and ensures "Title is required" does not appear if title is provided', async () => {
    const mockRouter = { push: jest.fn() };
    (useRouter as jest.Mock).mockReturnValue(mockRouter);

    const mockHandleOperation = jest.fn();

    render(
      <Provider store={store}>
        <TaskForm handleOperation={mockHandleOperation} />
      </Provider>
    );

    const titleInput = screen.getByTestId('title-input');
    const saveButton = screen.getByRole('button', { name: /Save/i });

    fireEvent.change(titleInput, { target: { value: 'Test Title' } });

    fireEvent.click(saveButton);

    await waitFor(() => {
      expect(screen.queryByText(/Title is required/i)).not.toBeInTheDocument();
    });

    await waitFor(() => {
      expect(screen.getByText(/Description is required/i)).toBeInTheDocument();
    });

    expect(mockHandleOperation).not.toHaveBeenCalled();
  });
});
