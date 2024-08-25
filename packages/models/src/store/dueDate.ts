export type DueDateState = {
  today: Date | null
  dueDate: Date | null
  todayDay?: number
  tomorrowDay?: number
}

export const INIT_DUE_DATE_STATE: DueDateState = {
  today: null,
  dueDate: null,
}

export type DueDateActions = {
  init: () => void
  reset: () => void
  setToday: () => void
  setTomorrow: () => void
  setNextWeek: () => void
}

export const enum DUE_DATE {
  TODAY = 0,
  TOMORROW = 1,
  NEXT_WEEK = 7,
}
