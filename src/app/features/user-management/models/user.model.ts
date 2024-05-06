export interface User {
  id: number
  Login: string
  IsActive: number
}

export interface UserRole {
  id: number
  Name: string
}

export interface UserPermissionByApp {
  App: string
  Action: string
  id: number
}
