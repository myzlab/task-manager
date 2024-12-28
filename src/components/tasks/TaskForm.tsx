import React, { useRef, useState } from 'react';
import { Button } from 'primereact/button';
import Label from '../util/Label';
import { InputText } from 'primereact/inputtext';
import InputErrorMessage from '../util/InputErrorMessage';
import { InputTextarea } from 'primereact/inputtextarea';
import { Dropdown } from 'primereact/dropdown';
import { useRouter } from 'next/navigation';
import { Task } from '@/app/store/tasks-slice';
import styles from './TaskForm.module.scss';
import { taskApi } from '@/api/task-api';
import ToastWrapper, { ToastHandler } from '../util/ToastWrapper';

interface TaskFormProps {
  id?: string,
  handleOperation: (task: Task) => void;
}

const TaskForm: React.FC<TaskFormProps> = ({
  id,
  handleOperation
}) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState<'To do' | 'In Progress' | 'Completed'>('To do');
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [loading, setLoading] = useState(false);
  const toastRef = useRef<ToastHandler>(null);
  const router = useRouter();

  React.useEffect(() => {
    if (!id) {
      return;
    }

    fetchTask();
  }, [ id ]);

  const fetchTask = async () => {
    try {
      const task: Task = (await taskApi.getTaskById(id)).task;

      setTitle(task.title);
      setDescription(task.description);
      setStatus(task.status);
    } catch {
      router.push('/404');
    }
  };

  const statusOptions = [
    { label: 'To do', value: 'To do' },
    { label: 'In Progress', value: 'In Progress' },
    { label: 'Completed', value: 'Completed' }
  ];

  const handleOnBackToList = async () => {
    router.push('/tasks');
  };

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!title.trim()) newErrors.title = 'Title is required';
    if (!description.trim()) newErrors.description = 'Description is required';

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    const task: Task = {
      title,
      description,
      status,
      id: id ? id : ''
    };

    try {
      await handleOperation(task);

      setTimeout(() => {
        handleOnBackToList();
      }, 200);
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

  return (
    <>
      <ToastWrapper ref={toastRef} />
      <div className="flex align-items-center">
        <div className="flex flex-1">
          <h3>Create a task</h3>
        </div>
        <div className="flex flex-1 justify-content-end">
          <Button
            label="Back to list"
            icon="pi pi-arrow-left"
            onClick={handleOnBackToList}
            text
          />
        </div>
      </div>
      <div className={styles.taskForm}>
        <div className='flex flex-column gap-3'>
          <div className="z-field">
            <Label htmlFor="email" isRequired={true}>Title</Label>
            <InputText
              id="email"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="A new title"
              autoFocus
            />
            <InputErrorMessage error={errors.title} />
          </div>
          <div className="z-field">
            <Label htmlFor="description" isRequired={true}>Description</Label>
            <InputTextarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Type a description"
            />
            <InputErrorMessage error={errors.description} />
          </div>
          <div className="z-field">
            <Label htmlFor="status" isRequired={true}>Status</Label>
            <Dropdown
              id="status"
              value={status}
              options={statusOptions}
              onChange={(e) => setStatus(e.value)}
              optionLabel="label"
              optionValue="value"
              required
            />
          </div>
          <div className="flex gap-2 justify-content-center">
            <Button
              label="Cancel"
              onClick={handleOnBackToList}
              text
            />
            <Button
              label="Save"
              icon="pi pi-check"
              severity="success"
              onClick={handleSubmit}
              loading={loading}
              text
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default TaskForm;
