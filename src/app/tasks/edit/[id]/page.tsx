'use client';

import { taskApi } from '@/api/task-api';
import { Task } from '@/app/store/tasks-slice';
import TaskForm from '@/components/tasks/TaskForm';
import { useAuthService } from '@/services/auth-service';
import { useParams, useRouter } from 'next/navigation';
import React from 'react';

const EditTaskPage = () => {
  const router = useRouter();
  const { getToken } = useAuthService();
  const token = getToken();

  React.useEffect(() => {
    if (!token) {
      router.push('/login');
    }
  }, [router, token]);

  const { id } = useParams();

  const taskId = Array.isArray(id) ? id[0] : id;

  const handleUpdate = async (task: Task) => {
    await taskApi.updateTaskById(task);
  };
  
  return (
    <>
      <TaskForm
        id={taskId}
        handleOperation={handleUpdate}
      />
    </>
  );
};

export default EditTaskPage;
