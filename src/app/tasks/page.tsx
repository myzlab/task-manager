'use client';

import { useDispatch, useSelector } from "react-redux";
import React, { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { RootState } from "../store";
import { Button } from "primereact/button";
import { taskApi } from "@/api/task-api";
import { removeTask, Task } from "../store/tasks-slice";
import TaskStatus from "@/components/tasks/TaskStatus";
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';
import { Skeleton } from 'primereact/skeleton';
import ToastWrapper, { ToastHandler } from "@/components/util/ToastWrapper";
import Image from 'next/image';

export default function TasksList() {
  const token = useSelector((state: RootState) => state.auth.token);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const confirmDialogRef = useRef(null);
  const toastRef = useRef<ToastHandler>(null);

  const router = useRouter();
  const dispatch = useDispatch();

  React.useEffect(() => {
    if (!token) {
      router.push('/login');
    }
    
    fetchTasks();
  }, [router, token]);

  const fetchTasks = async () => {
    setLoading(true);

    try {
      const tasks: Task[] = (await taskApi.getTasks()).tasks;

      setTasks(tasks);
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

  const handleOnCreate = async () => {
    router.push('/tasks/create');
  };

  const handleUpdateTask = (task: Task) => {
    router.push('/tasks/edit/' + task.id);
  }

  const handleDeleteTask = (task: Task) => {
    confirmDialog({
      message: (
        <span>Do you want to delete task <b> {task.title} </b> ? </span>
      ),
      header: 'Delete Confirmation',
      icon: 'pi pi-trash',
      defaultFocus: 'reject',
      acceptClassName: 'p-button-danger',
      accept: () => {
        dispatch(removeTask(task.id));

        fetchTasks();
      },
      reject: () => {}
    });
  };

  return (
    <>
      <ToastWrapper ref={toastRef} />
      <ConfirmDialog ref={confirmDialogRef} />
      <div className="flex align-items-center">
        <div className="flex flex-1">
          <h3>Tasks</h3>
        </div>
        <div className="flex flex-1 justify-content-end">
          <Button
            label="Add task"
            icon="pi pi-plus"
            onClick={handleOnCreate}
            text
          />
        </div>
      </div>

      <div className="flex flex-wrap gap-3 justify-content-center my-3">
        {loading ? (
          <>
            {[...Array(5)].map((_, index) => (
              <div key={index} className="task-card-skeleton">
                <Skeleton height="135px" borderRadius="15px"/>
              </div>
            ))}
          </>
        ) : tasks.length === 0 ? (
          <div className="flex flex-column text-center text-sm font-medium">
            <Image
              src="/no-records.png"
              alt="No tasks"
              width={200}
              height={0}
              style={{ height: 'auto' }}
            />
            No tasks
          </div>
        ) : (
          <>
            {tasks.map((task) => (
              <div
                key={task.id}
                className="task-card px-3 pt-3 pb-2"
              >
                <div className="task-title text-sm font-semibold mb-1">
                  {task.title}
                </div>
                <div className="task-description text-xs">
                  {task.description}
                </div>
                <div className="flex task-card-footer mt-2 pt-1">
                  <div className="flex align-items-center">
                    <TaskStatus status={task.status}></TaskStatus>
                  </div>
                  <div className="flex flex-1 justify-content-end">
                    <Button
                      icon="pi pi-pencil"
                      rounded
                      text
                      raised
                      onClick={() => handleUpdateTask(task)}
                    />
                    <Button
                      icon="pi pi-times"
                      rounded
                      text
                      raised
                      severity="danger"
                      onClick={() => handleDeleteTask(task)}
                    />
                  </div>
                </div>
              </div>
            ))}
          </>
        )}
      </div>
    </>
  );
}
