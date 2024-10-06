import { TaskType } from "../task"

export interface AddTaskRequest {
  listId: string
  task: string
  taskType: TaskType
  expertId?: string
  supervisorIds: string[]
  userIds: string[]
}

export interface AddTaskResponse {
  id: string
  isDone: boolean
  listId: string
  task: string
  taskType: TaskType
  userIds: string[]
  superevisorIds: string[]
}
