import { INIT_TASKSTORE_STATE, TaskStoreActions, TaskStoreState } from "@whatTodo/models";
import { create } from "zustand";

export const useTodoStore = create<TaskStoreState & TaskStoreActions>((set, get) => ({
  ...INIT_TASKSTORE_STATE,
  setIsLoading: (isLoading: boolean) => set({ isLoading }),
  updateTask: (task: string) => set({ task }),
  setDueDate: (dueDate: Date) => set({ dueDate }),
  reset: () => set(INIT_TASKSTORE_STATE),
}));
