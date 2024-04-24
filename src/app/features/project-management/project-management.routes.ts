import { Routes } from '@angular/router'
import { AuthGuard } from '../../core/guards/auth-guard.service'

export const projectManagementRoutes: Routes = [
  {
    path: '',
    canActivate: [AuthGuard],
    title: 'Керування проектами',
    loadComponent: () =>
      import('./pages/project-management-page/project-management-page.component').then(
        (m) => m.ProjectManagementPageComponent
      )
  }
]
