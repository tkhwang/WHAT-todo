import { ITask } from "../task"

export interface UpdateTaskRequest {
  taskId: string
}

export type UpdateTaskResponse = ITask
