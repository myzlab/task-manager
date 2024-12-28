'use client';

import { taskApi } from '@/api/task-api';
import { Task } from '@/app/store/tasks-slice';
import TaskForm from '@/components/tasks/TaskForm';
import { useParams } from 'next/navigation';

const EditTaskPage = () => {
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
