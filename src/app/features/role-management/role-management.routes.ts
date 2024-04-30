import { Routes } from '@angular/router'
import { AuthGuard } from '../../core/guards/auth-guard.service'

export const roleManagementRoutes: Routes = [
  {
    path: '',
    canActivate: [AuthGuard],
    title: 'Керування ролями',
    loadComponent: () =>
      import('./pages/role-management-page/role-management-page.component').then((m) => m.RoleManagementPageComponent)
  }
]
