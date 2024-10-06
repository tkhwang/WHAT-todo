import { IAddTask, IAddTaskCommon } from "../../task"

export interface SendTodoRequest {
  title: string
  todoTasks: IAddTaskCommon[]
  expertId: string
  userIds: string[]
  supervisorIds: string[]
}

export interface SendTodoResponse {}
