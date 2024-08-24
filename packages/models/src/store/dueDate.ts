export interface DueDateState {
  dueDate: Date | null
  setToday: () => void
  setTomorrow: () => void
  setNextWeek: () => void
  reset: () => void
}
