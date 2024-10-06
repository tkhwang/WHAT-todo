import { IAddTask, IAddTaskCommon } from "../../task"

export interface SendTodoRequest {
  todoListTitle: string
  todoTasks: IAddTaskCommon[]
  expertId: string
  userIds: string[]
  supervisorIds: string[]
}

export interface SendTodoResponse {}
