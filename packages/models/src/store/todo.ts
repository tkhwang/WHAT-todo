export type TaskStoreState = {
  task: string
  isLoading: boolean
  dueDate?: Date
}

export const INIT_TODOSTORE_STATE: TaskStoreState = {
  task: "",
  isLoading: false,
}

export type TaskStoreActions = {
  setIsLoading: (isLoading: boolean) => void
  updateTask: (task: string) => void
  setDueDate: (dueDate: Date) => void
  reset: () => void
}
