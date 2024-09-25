export type TaskType = "todo" | "not-todo"

export interface ITaskCommon {
  id: string
  task: string
  listId: string
  userId: string
  isDone: boolean
  taskType: TaskType
  dueDate?: Date
  note?: string
  //
  isLocalUpdated?: boolean
}

export interface ITask extends ITaskCommon {
  createdAt: Date
  updatedAt: Date
}
