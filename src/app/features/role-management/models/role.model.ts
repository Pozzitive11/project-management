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
