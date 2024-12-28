'use client';

import { taskApi } from '@/api/task-api';
import { Task, updateTask } from '@/app/store/tasks-slice';
import TaskForm from '@/components/tasks/TaskForm';
import { useParams, useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';

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
