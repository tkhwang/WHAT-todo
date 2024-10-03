import { IAddTask } from "../../task"

export interface SendTodoRequest {
  expertId: string
  userIds: string[]
  supervisorIds: string[]
  todoListTitle: string
  todoTasks: IAddTask[]
}
