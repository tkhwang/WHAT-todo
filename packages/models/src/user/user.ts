export interface IUserCommon {
  id: string
  name: string
  email: string
  provider: "apple" | "google"
  whatTodoId: string
}
