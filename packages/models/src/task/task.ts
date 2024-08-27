export interface ITask {
  id: string
  task: string
  dueDate: string
  userId: string
  isDone: boolean
  createdAt: Date
  updatedAt: Date
}

// export interface IUseTodos {
//   data: ITask[]
//   arePending: boolean
// }
