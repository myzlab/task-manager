'use client';

import { Task } from '@/app/store/tasks-slice';
import React from 'react';
import TaskForm from '@/components/tasks/TaskForm';
import { taskApi } from '@/api/task-api';

const CreateTask = () => {
  const handleCreate = (task: Task) => {
    taskApi.createTask(task);
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