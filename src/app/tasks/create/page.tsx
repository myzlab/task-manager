'use client';

import { Task } from '@/app/store/tasks-slice';
import React from 'react';
import TaskForm from '@/components/tasks/TaskForm';
import { taskApi } from '@/api/task-api';
import { useAuthService } from '@/services/auth-service';
import { useRouter } from 'next/navigation';

const CreateTask = () => {
  const router = useRouter();
  const { getToken } = useAuthService();
  const token = getToken();

  React.useEffect(() => {
    if (!token) {
      router.push('/login');
    }
  }, [router, token]);

  const handleCreate = async (task: Task) => {
    await taskApi.createTask(task);
  };

  return (
    <>
      <TaskForm
        handleOperation={handleCreate}
      />
    </>
  );
};

export default CreateTask;