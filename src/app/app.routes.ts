import { Routes } from '@angular/router'

export const appRoutes: Routes = [
  { path: '', redirectTo: 'project-management', pathMatch: 'full' },

  {
    path: 'login',
    loadComponent: () => import('./shared/components/auth/auth.component').then((m) => m.AuthComponent),
    title: 'Вхід'
  },
  {
    path: 'project-management',
    loadChildren: () =>
      import('./features/project-management/project-management.routes').then((m) => m.projectManagementRoutes)
  },
  {
    path: '**',
    loadComponent: () => import('./shared/components/page-404/page404.component').then((m) => m.Page404Component),
    title: 'Сторінка не знайдена'
  }
]
