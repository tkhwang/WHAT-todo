import {
  INIT_TASKSTORE_STATE,
  ITask,
  TaskStoreActions,
  TaskStoreState,
  TaskType,
} from "@whatTodo/models";
import { create } from "zustand";
import uuid from "react-native-uuid";

import { TASK_OPTIMISTIC_ADD_KEY } from "@/constants/appConsts";

export const useTaskStore = create<TaskStoreState & TaskStoreActions>((set, get) => ({
  ...INIT_TASKSTORE_STATE,
  loadTask: (task: ITask) => {
    const loadedTask = {
      id: task.id,
      task: task.task,
      listId: task.listId,
      userId: task.userId,
      isDone: task.isDone,
      note: task.note,
      taskType: task.taskType,
      isLoading: false,
      ...(task.dueDate && { dueDate: task.dueDate }),
      ...(task.note && { note: task.note }),
    };
    set(loadedTask);
    console.log(`[+][useTaskStore] loadTask: ${JSON.stringify(loadedTask)}`);
  },
  newTask: (userId: string, listId: string, taskType: TaskType) => {
    set({
      id: `${TASK_OPTIMISTIC_ADD_KEY}-${uuid.v4()}`,
      userId,
      listId,
      task: "",
      isDone: false,
      taskType,
      isLoading: false,
    });
    console.log(`[+][useTaskStore] newTask`);
  },
  resetTask: () => {
    set(INIT_TASKSTORE_STATE);
    console.log(`[+][useTaskStore] resetTask`);
  },
  toggleIsDone: () => set({ isDone: !get().isDone }),
  setTask: (task: string) => set({ task }),
  setTaskType: (taskType: TaskType) => set({ taskType }),
  setDueDate: (dueDate: Date) => set({ dueDate }),
  setNote: (note: string) => set({ note }),
  setIsLoading: (isLoading: boolean) => set({ isLoading }),
}));
