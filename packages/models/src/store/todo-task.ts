import { ITask, TaskType } from "../task"

export type TaskStoreState = {
  id: string
  task: string
  listId: string
  userId: string
  isDone: boolean
  taskType: TaskType
  dueDate?: Date
  note?: string
  isLoading: boolean
}

export const INIT_TASKSTORE_STATE: TaskStoreState = {
  id: "",
  task: "",
  listId: "",
  userId: "",
  note: "",
  taskType: "todo",
  isDone: false,
  isLoading: false,
}

export type TaskStoreActions = {
  loadTask: (task: ITask) => void
  newTask: (userId: string, listId: string, taskType: TaskType) => void
  resetTask: () => void
  toggleIsDone: () => void
  setTask: (task: string) => void
  setTaskType: (taskType: TaskType) => void
  setNote: (note: string) => void
  setDueDate: (dueDate: Date) => void
  setIsLoading: (isLoading: boolean) => void
}
