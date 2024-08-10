export type AuthProviders = "apple"
export interface AuthSignupRequest {
  uid: string
  email: string
  id: string
  name: string
  provider: AuthProviders
}

export interface AuthSignupResponse {}

export interface AuthVerifyIdRequest {
  id: string
}
export interface AuthVerifyIdResonse {}
