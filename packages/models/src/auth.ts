export type AuthProviders = "apple"
export interface AuthSignupRequest {
  id: string
  email: string
  whatTodoId: string
  name: string
  provider: AuthProviders
}

export interface AuthSignupResponse {}

export interface AuthVerifyIdRequest {
  id: string
}
export interface AuthVerifyIdResonse {}
