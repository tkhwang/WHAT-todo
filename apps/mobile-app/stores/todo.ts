import { INIT_TODOSTORE_STATE, TodoStoreActions, TodoStoreState } from "@whatTodo/models";
import { create } from "zustand";

export const useTodoStore = create<TodoStoreState & TodoStoreActions>((set, get) => ({
  ...INIT_TODOSTORE_STATE,
  setIsLoading: (isLoading: boolean) => set({ isLoading }),
  updateTask: (task: string) => set({ task }),
  setDueDate: (dueDate: Date) => set({ dueDate }),
  reset: () => set(INIT_TODOSTORE_STATE),
}));