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
  // status
  isLoading: boolean
}

export const INIT_TASKSTORE_STATE: TaskStoreState = {
  id: "",
  task: "",
  listId: "",
  userId: "",
  taskType: "todo",
  isDone: false,
  isLoading: false,
}

export type TaskStoreActions = {
  load: (task: ITask) => void
  new: (userId: string, listId: string) => void
  setTask: (task: string) => void
  setTaskType: (isTodoType: boolean) => void
  setNote: (note: string) => void
  setDueDate: (dueDate: Date) => void
  toggleIsDone: () => void
  reset: () => void
  saveToFirestore: (cachedTask: ITask) => Promise<void>
  // status
  setIsLoading: (isLoading: boolean) => void
}
