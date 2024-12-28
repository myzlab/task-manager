import { store } from "@/app/store";
import { addTask, Task, updateTask } from "@/app/store/tasks-slice";

export const taskApi = {
  getTasks: async (): Promise<{ tasks: Task[] }> => {
    await new Promise((resolve) => setTimeout(resolve, 250));

    const state = store.getState();
    const tasks = state.tasks.tasks;

    return { tasks };
  },
  getTaskById: async (id: string | undefined): Promise<{ task: Task }> => {
    const state = store.getState();

    const index = state.tasks.tasks.findIndex((task) => task.id === id);

    if (index === -1) {
      throw new Error('Task not found');
    }

    return {
      task: state.tasks.tasks[index]
    };
  },
  updateTaskById: async (task: Task): Promise<void> => {
    await new Promise((resolve) => setTimeout(resolve, 250));

    const state = store.getState();

    const index = state.tasks.tasks.findIndex((task) => task.id === task.id);

    if (index === -1) {
      throw new Error('Task not found');
    }

    store.dispatch(updateTask(task));
  },
  createTask: async (task: Task): Promise<void> => {
    await new Promise((resolve) => setTimeout(resolve, 250));
    
    store.dispatch(addTask(task));
  }
};
