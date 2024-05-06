import { HttpClient } from '@angular/common/http'

import { Injectable, inject } from '@angular/core'
import { environment } from 'src/environments/environment'
import { Permission, PermissionByRole, Role } from '../models/role.model'
import { App } from '../../project-management/models/project.model'

@Injectable({
  providedIn: 'root'
})
export class RoleManagementHttpService {
  private http = inject(HttpClient)

  roleUrl = (environment.BACKEND_URL || window.location.origin) + environment.API_BASE_URL + '/structure/role'
  appUrl = (environment.BACKEND_URL || window.location.origin) + environment.API_BASE_URL + '/structure/app'
  permissionUrl =
    (environment.BACKEND_URL || window.location.origin) + environment.API_BASE_URL + '/structure/permission/perm_role'

  // APP
  getAppsList() {
    return this.http.get<{ apps: App[] }>(this.appUrl)
  }
  // ROLE
  getRolesList() {
    return this.http.get<{ roles: Role[] }>(this.roleUrl)
  }
  createRole(roleName: string) {
    return this.http.post<Role>(this.roleUrl, { Name: roleName })
  }
  getRoleInfo(roleId: number) {
    return this.http.get<Role>(`${this.roleUrl}/${roleId}`)
  }
  deleteRole(roleId: number) {
    return this.http.delete(`${this.roleUrl}/${roleId}`)
  }
  updateRole(roleId: number, roleName: string) {
    return this.http.patch<Role>(`${this.roleUrl}/${roleId}`, { Name: roleName })
  }
  // PERMISSION
  getPermissionByApp(roleId: number, appId: number) {
    return this.http.get<{ permissions: Permission[] }>(`${this.roleUrl}/${roleId}/permissions/${appId}`)
  }
  getPermissionByRole(roleId: number) {
    return this.http.get<{ permissions_by_app: PermissionByRole[] }>(`${this.roleUrl}/${roleId}/permissions`)
  }
  addRolePermissions(roleId: number, permissionIds: number[]) {
    return this.http.post(this.permissionUrl, {
      RoleId: roleId,
      PermissionIds: permissionIds
    })
  }
  deleteRolePermissions(roleId: number, permissionIds: number[]) {
    const options = {
      body: {
        RoleId: roleId,
        PermissionIds: permissionIds
      }
    }

    return this.http.delete(this.permissionUrl, options)
  }
}
