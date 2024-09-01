export interface ITaskCommon {
  id: string
  task: string
  listId: string
  userId: string
  isDone: boolean
  dueDate?: Date
  note?: string
}

export interface ITask extends ITaskCommon {
  createdAt: Date
  updatedAt: Date
}
