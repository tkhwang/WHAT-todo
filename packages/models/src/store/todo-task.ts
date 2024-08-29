import { ITask } from "../task"

export type TaskStoreState = {
  task: string
  isLoading: boolean
  isDone: boolean
  dueDate?: Date
}

export const INIT_TODOSTORE_STATE: TaskStoreState = {
  task: "",
  isLoading: false,
  isDone: false,
}

export type TaskStoreActions = {
  setIsLoading: (isLoading: boolean) => void
  toggleIsDone: () => void
  updateTask: (task: string) => void
  setDueDate: (dueDate: Date) => void
  reset: () => void
}
