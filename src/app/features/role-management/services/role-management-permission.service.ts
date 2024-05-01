import { DestroyRef, Injectable, inject } from '@angular/core'
import { BehaviorSubject, from, tap } from 'rxjs'
import { Permission, Role } from '../models/role.model'
import { RoleManagementHttpService } from './role-management-http.service'
import { NgbModal } from '@ng-bootstrap/ng-bootstrap'
import { takeUntilDestroyed } from '@angular/core/rxjs-interop'
import { App } from '../../project-management/models/project.model'
import { RoleManagementRoleService } from './role-management-role.service'

@Injectable({
  providedIn: 'root'
})
export class RoleManagementPermissionService {
  private roleManagementHttpService = inject(RoleManagementHttpService)
  private roleManagementRoleService = inject(RoleManagementRoleService)
  private modalService = inject(NgbModal)
  private destroyRef = inject(DestroyRef)

  private _permission$ = new BehaviorSubject<Permission[]>([])
  permission$ = from(this._permission$)

  // private _permission$ = new BehaviorSubject<Permission[]>([])
  // permission$ = from(this._permission$)

  permissionsByRole: Permission[] | null = null

  selectedPermission: Permission[] | null = null
  selectedApp: App | null = null
  apps: App[]
  setPermissionByApp(roleId: number) {
    if (this.selectedApp) {
      this.roleManagementHttpService
        .getPermissionByApp(roleId, this.selectedApp.id)
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe((data) => {
          this._permission$.next(data.permissions)
        })
    }
  }

  setApps() {
    this.roleManagementHttpService
      .getAppsList()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((data) => {
        this.apps = data.apps
      })
  }

  addRolePermissions(roleId: number) {
    const selectedPermissionIds = this.selectedPermission?.map((permission) => permission.id)
    if (selectedPermissionIds) {
      this.roleManagementHttpService
        .addRolePermissions(roleId, selectedPermissionIds)
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe(() => {
          this.roleManagementRoleService.getRole()
        })
      this.clearAddPermissionModalValues()
      this.modalService.dismissAll()
    }
  }
  deletePermission(roleId: number) {
    // if (this.selectedPermission) {
    //   this.roleManagementHttpService
    //     .deleteRolePermissions(roleId, this.selectedPermission.id)
    //     .pipe(takeUntilDestroyed(this.destroyRef))
    //     .subscribe(() => {
    //       this.roleManagementRoleService.getRole()
    //     })
    // }
  }
  setPermissionsByRole(roleId: number) {
    this.roleManagementHttpService
      .getPermissionByRole(roleId)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((data) => {
        this.permissionsByRole = data.permissions
      })
  }

  clearAddPermissionModalValues() {
    this.selectedApp = null
    this.selectedPermission = null
  }
}
