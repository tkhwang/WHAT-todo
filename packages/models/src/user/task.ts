import { ITaskCommon } from "../task"

export interface IUserTask extends ITaskCommon {
  isDone: boolean
  myNote?: string
}
