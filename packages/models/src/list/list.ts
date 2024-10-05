export const DEFAULT_LIST_TITLE = "My Todo"

export interface IListCommon {
  id: string
  title: string
}

export interface IList extends IListCommon {
  createdAt: Date
  updatedAt: Date
}
