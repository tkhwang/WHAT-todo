import { ITask } from "../task"

export type TaskStoreState = {
  task: string
  today: Date
  dueDate?: Date
  isLoading: boolean
  isDone: boolean
}

export const INIT_TASKSTORE_STATE: TaskStoreState = {
  task: "",
  today: new Date(),
  isLoading: false,
  isDone: false,
}

export type TaskStoreActions = {
  updateTask: (task: string) => void
  setDueDate: (dueDate: Date) => void
  setIsLoading: (isLoading: boolean) => void
  toggleIsDone: () => void
  reset: () => void
}
