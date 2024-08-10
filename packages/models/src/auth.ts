export interface AuthSignupRequest {
  uid: string
  email: string
  name: string
}

export interface AuthSignupResponse {}

export interface AuthVerifyIdRequest {
  id: string
}
export interface AuthVerifyIdResonse {}
