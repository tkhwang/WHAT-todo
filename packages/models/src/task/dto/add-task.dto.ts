export interface AddTaskRequest {
  task: string
  listId: string
}

export interface AddTaskResponse {
  id: string
  isDone: boolean
  listId: string
  task: string
  userId: string
}
