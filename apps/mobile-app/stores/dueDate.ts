import { DueDateState } from "@whatTodo/models";
import { create } from "zustand";

export const useDueDateStore = create<DueDateState>((set) => ({
  dueDate: null,
  setToday: () => set({ dueDate: new Date() }),
  setTomorrow: () => set({ dueDate: new Date(Date.now() + 86400000) }), // 1 day in ms
  setNextWeek: () => set({ dueDate: new Date(Date.now() + 86400000 * 7) }), // 7 days in ms
  reset: () => set({ dueDate: null }),
}));
