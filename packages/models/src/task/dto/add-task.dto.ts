import { TaskType } from "../task"

export interface AddTaskRequest {
  task: string
  listId: string
  taskType: TaskType
}

export interface AddTaskResponse {
  id: string
  isDone: boolean
  listId: string
  task: string
  taskType: TaskType
  userId: string
}
