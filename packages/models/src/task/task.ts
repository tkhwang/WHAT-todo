export type TaskType = "todo" | "not-todo"

export interface ITaskCommon {
  id: string
  task: string
  listId: string
  expertId?: string
  userIds: string[]
  supervisorIds: string[]
  taskType: TaskType
  dueDate?: Date
  note?: string
  //
  isLocalUpdated?: boolean
}

export interface ITask extends ITaskCommon {
  createdAt: Date
  updatedAt: Date
}

export interface IAddTaskCommon {
  task: string
  taskType: TaskType
}

export interface IAddTask extends IAddTaskCommon {
  id: number
}

export const SEND_TODO_STEPS = {
  SEARCH: "send-todo-steps-search",
  SELECT: "send-todo-steps-select",
}
