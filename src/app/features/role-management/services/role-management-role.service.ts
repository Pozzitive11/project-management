import { DestroyRef, Injectable, inject } from '@angular/core'
import { BehaviorSubject, from, tap } from 'rxjs'
import { Permission, Role } from '../models/role.model'
import { RoleManagementHttpService } from './role-management-http.service'
import { NgbModal } from '@ng-bootstrap/ng-bootstrap'
import { takeUntilDestroyed } from '@angular/core/rxjs-interop'

@Injectable({
  providedIn: 'root'
})
export class RoleManagementRoleService {
  private roleManagementHttpService = inject(RoleManagementHttpService)
  private modalService = inject(NgbModal)
  private destroyRef = inject(DestroyRef)
  private _roles$ = new BehaviorSubject<Role[]>([])
  roles$ = from(this._roles$)
  private _role$ = new BehaviorSubject<Role | null>(null)
  role$ = from(this._role$)
  selectedRole: Role | null

  role: Role | null
  rolePermissionsGroups: { [key: string]: Permission[] } = {}
  createRoleName = ''
  setRoles() {
    this.roleManagementHttpService
      .getRolesList()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((data) => {
        this._roles$.next(data.roles)
      })
  }

  createRole() {
    this.roleManagementHttpService
      .createRole(this.createRoleName)
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        tap((data) => {
          if (data) {
            const currentRoles = this._roles$.getValue()
            const updatedProjects = [...currentRoles, data]
            this._roles$.next(updatedProjects)
          }
        })
      )
      .subscribe()
    this.modalService.dismissAll()
  }

  getRole() {
    if (this.selectedRole) {
      this.roleManagementHttpService
        .getRoleInfo(this.selectedRole.id)
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe((data) => {
          if (data.permissions) {
            this.rolePermissionsGroups = this.groupPermissionsByApp(data.permissions)
          }
          this.role = data
        })
    }
  }

  deleteRole() {
    if (this.role) {
      this.roleManagementHttpService
        .deleteRole(this.role.id)
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe(() => {
          if (this.role) {
            this.filterRoles(this.role.id)
            this.selectedRole = null
            this.role = null
          }
        })
    }
  }
  updateRole(roleName: string) {
    if (this.role) {
      this.roleManagementHttpService
        .updateRole(this.role.id, roleName)
        .pipe()
        .subscribe((data) => {
          this.updateProjectValues(data.id, data.Name)
          this.selectedRole = { Name: data.Name, id: data.id }
          this.role = { Name: data.Name, id: data.id, permissions: data.permissions }
        })
    }
  }
  private filterRoles(appId: number) {
    const currentApps = this._roles$.getValue()
    const updatedApps = currentApps.filter((app) => app.id !== appId)
    this._roles$.next(updatedApps)
  }
  private updateProjectValues(roleId: number, roleName: string) {
    const currentRoles = this._roles$.getValue()
    const roleIndex = currentRoles.findIndex((role) => role.id === roleId)
    if (roleIndex !== -1) {
      const updatedProject = { ...currentRoles[roleIndex] }
      updatedProject.Name = roleName
      const updatedProjects = [...currentRoles]
      updatedProjects[roleIndex] = updatedProject
      this._roles$.next(updatedProjects)
    }
  }
  private groupPermissionsByApp(permissions: Permission[]) {
    return permissions.reduce<{ [key: string]: Permission[] }>((groups, permission) => {
      const appName = permission.App
      if (!groups[appName]) {
        groups[appName] = []
      }
      groups[appName].push(permission)
      return groups
    }, {})
  }
}
