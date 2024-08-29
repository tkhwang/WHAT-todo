import { INIT_TASKSTORE_STATE, ITask, TaskStoreActions, TaskStoreState } from "@whatTodo/models";
import { create } from "zustand";

export const useTaskStore = create<TaskStoreState & TaskStoreActions>((set, get) => ({
  ...INIT_TASKSTORE_STATE,
  setDueDate: (dueDate: Date) => set({ dueDate }),
  updateTask: (task: string) => set({ task }),
  setIsLoading: (isLoading: boolean) => set({ isLoading }),
  toggleIsDone: () => set({ isDone: !get().isDone }),
  reset: () => set(INIT_TASKSTORE_STATE),
}));
