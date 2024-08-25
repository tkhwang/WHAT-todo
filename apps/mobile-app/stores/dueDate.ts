import { DueDateActions, DueDateState, INIT_DUE_DATE_STATE } from "@whatTodo/models";
import { create } from "zustand";

export const useDueDateStore = create<DueDateState & DueDateActions>((set, get) => ({
  ...INIT_DUE_DATE_STATE,
  init: () => {
    const today = new Date();
    const todayDay = today.getDay();
    set({
      today,
      dueDate: null,
      todayDay,
      tomorrowDay: (todayDay + 1) % 7,
    });
  },
  reset: () => set({ today: null, dueDate: null }),
  setToday: () => set({ dueDate: get().today }),
  setTomorrow: () => set({ dueDate: new Date(get().today + 86400000) }), // 1 day in ms
  setNextWeek: () => set({ dueDate: new Date(get().today + 86400000 * 7) }), // 7 days in ms
}));
