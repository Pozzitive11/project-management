export interface Project {
  Name: string
  Description: string
  ResponsibleId: number | null
  id: number
}
export interface App {
  Name: string
  Route: string
  ShortDescription: string
  Description: string
  id: number
  Project: string
}
