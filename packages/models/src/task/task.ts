export interface ITaskCommon {
  id: string
  task: string
  listId: string
  userId: string
  isDone: boolean
  dueDate?: Date
  note?: string
  //
  isLocalUpdated?: boolean
}

export interface ITask extends ITaskCommon {
  createdAt: Date
  updatedAt: Date
}

export type TaskType = "todo" | "not-todo"
