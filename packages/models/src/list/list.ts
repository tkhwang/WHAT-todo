export interface IListCommon {
  id: string
  title: string
}

export interface IList extends IListCommon {
  createdAt: Date
  updatedAt: Date
}
