export interface ITodo {
  id: string
  todo: string
  dueDate: string
  userId: string
  createdAt: Date
  updatedAt: Date
}

export interface IUseTodos {
  data: ITodo[]
  arePending: boolean
}
