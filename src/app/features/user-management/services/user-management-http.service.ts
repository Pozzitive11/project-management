import { HttpClient } from '@angular/common/http'

import { Injectable, inject } from '@angular/core'
import { environment } from 'src/environments/environment'
import { User, UserPermissionByApp, UserRole } from '../models/user.model'
import { Permission } from '../../role-management/models/role.model'

@Injectable({
  providedIn: 'root'
})
export class UserManagementHttpService {
  private http = inject(HttpClient)

  userUrl = (environment.BACKEND_URL || window.location.origin) + environment.API_BASE_URL + '/user'
  permissionUrl =
    (environment.BACKEND_URL || window.location.origin) + environment.API_BASE_URL + '/structure/permission'

  // USER
  getUsersList() {
    return this.http.get<{ users: User[] }>(this.userUrl)
  }

  getUserInfo(userId: number) {
    return this.http.get<User>(`${this.userUrl}/${userId}`)
  }

  getUserRoles(userId: number) {
    return this.http.get<{ roles: UserRole[] }>(`${this.userUrl}/${userId}/roles`)
  }
  getUserPermissions(userId: number) {
    return this.http.get<{ permissions: Permission[] }>(`${this.userUrl}/${userId}/permissions`)
  }

  getAvailableRoles(userId: number) {
    return this.http.get<{ roles: UserRole[] }>(`${this.userUrl}/${userId}/roles/available`)
  }
  getAvailablePermissionsByApp(userId: number, appId: number) {
    return this.http.get<{ permissions: UserPermissionByApp[] }>(`${this.userUrl}/${userId}/permissions/${appId}`)
  }
  // PERMISSIONS
  addRoleToUSer(userId: number, roleIds: number[]) {
    return this.http.post(`${this.permissionUrl}/role_user`, { UserId: userId, RoleIds: roleIds })
  }
  deleteUserRole(userId: number, roleIds: number[]) {
    const options = {
      body: {
        UserId: userId,
        RoleIds: roleIds
      }
    }
    return this.http.delete(`${this.permissionUrl}/role_user`, options)
  }
}
