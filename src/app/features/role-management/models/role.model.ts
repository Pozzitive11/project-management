export interface Role {
  id: number
  Name: string
  permissions?: Permission[]
}

export interface Permission {
  App: string
  Action: string
  id: number
}

export interface PermissionByRole {
  app: string
  permissions: { id: number; Action: string }[]
}
