export type TodoStoreState = {
  task: string
  isLoading: boolean
  dueDate?: Date
}

export const INIT_TODOSTORE_STATE: TodoStoreState = {
  task: "",
  isLoading: false,
}

export type TodoStoreActions = {
  setIsLoading: (isLoading: boolean) => void
  updateTask: (task: string) => void
  setDueDate: (dueDate: Date) => void
  reset: () => void
}
