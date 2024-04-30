import { Routes } from '@angular/router'
import { AuthGuard } from '../../core/guards/auth-guard.service'

export const userManagementRoutes: Routes = [
  {
    path: '',
    canActivate: [AuthGuard],
    title: 'Керування користувачами',
    loadComponent: () =>
      import('./pages/user-management-page/user-management-page.component').then((m) => m.UserManagementPageComponent)
  }
]
