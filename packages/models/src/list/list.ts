import { UserType } from "../user"

export const DEFAULT_LIST_TITLE = "My Todo"

export type ListType = "defaultUserList"

export interface IListCommon {
  id: string
  title: string
  userId: string
  expertId?: string
  userType: UserType
  listType?: ListType
}

export interface IList extends IListCommon {
  createdAt: Date
  updatedAt: Date
}
