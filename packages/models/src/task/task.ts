export interface ITaskCommon {
  id: string
  task: string
  listId: string
  dueDate: string
  userId: string
  isDone: boolean
  note?: string
}

export interface ITask extends ITaskCommon {
  createdAt: Date
  updatedAt: Date
}
