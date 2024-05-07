import { DestroyRef, Injectable, inject } from '@angular/core'
import { BehaviorSubject, catchError, from, of, tap } from 'rxjs'
import { Permission, PermissionByRole, Role } from '../models/role.model'
import { RoleManagementHttpService } from './role-management-http.service'
import { NgbModal } from '@ng-bootstrap/ng-bootstrap'
import { takeUntilDestroyed } from '@angular/core/rxjs-interop'
import { App } from '../../project-management/models/project.model'
import { RoleManagementRoleService } from './role-management-role.service'
import { MessageHandlingService } from 'src/app/shared/services/message-handling.service'

@Injectable({
  providedIn: 'root'
})
export class RoleManagementPermissionService {
  private roleManagementHttpService = inject(RoleManagementHttpService)
  private roleManagementRoleService = inject(RoleManagementRoleService)
  private messageService = inject(MessageHandlingService)
  private modalService = inject(NgbModal)
  private destroyRef = inject(DestroyRef)

  private _permission$ = new BehaviorSubject<Permission[]>([])
  permission$ = from(this._permission$)

  permissionsByRole: PermissionByRole[] | null = null
  permissionApps: string[] = []
  selectedPermission: Permission[] | null = null
  selectedAppForUpdate: App | null = null
  selectedAppForDelete: string | null = null
  selectedAppActionForDelete: { id: number; Action: string }[] | null = null
  actionsByRoleApp: { id: number; Action: string }[] | null = null
  apps: App[]
  setPermissionByApp(roleId: number) {
    if (this.selectedAppForUpdate) {
      this.roleManagementHttpService
        .getPermissionByApp(roleId, this.selectedAppForUpdate.id)
        .pipe(
          takeUntilDestroyed(this.destroyRef),
          catchError((error) => {
            this.messageService.alertError(error)
            return of(null)
          })
        )
        .subscribe((data) => {
          if (data) {
            this._permission$.next(data.permissions)
          }
        })
    }
  }

  setApps() {
    this.roleManagementHttpService
      .getAppsList()
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        catchError((error) => {
          this.messageService.alertError(error)
          return of(null)
        })
      )
      .subscribe((data) => {
        if (data) {
          this.apps = data.apps
        }
      })
  }

  addRolePermissions(roleId: number) {
    const selectedPermissionIds = this.selectedPermission?.map((permission) => permission.id)
    if (selectedPermissionIds) {
      this.roleManagementHttpService
        .addRolePermissions(roleId, selectedPermissionIds)
        .pipe(
          takeUntilDestroyed(this.destroyRef),
          catchError((error) => {
            this.messageService.alertError(error)
            return of(null)
          })
        )
        .subscribe(() => {
          this.roleManagementRoleService.getRole()
          selectedPermissionIds.length > 1
            ? this.messageService.sendInfo('Дозволи додано')
            : this.messageService.sendInfo('Дозвіл додано')
        })
      this.clearAddPermissionUpdateModalValues()
      this.modalService.dismissAll()
    }
  }
  deletePermission(roleId: number) {
    const selectedPermissionIds = this.selectedAppActionForDelete?.map((permission) => permission.id)

    if (selectedPermissionIds) {
      this.roleManagementHttpService
        .deleteRolePermissions(roleId, selectedPermissionIds)
        .pipe(
          takeUntilDestroyed(this.destroyRef),
          catchError((error) => {
            this.messageService.alertError(error)
            return of(null)
          })
        )
        .subscribe(() => {
          this.roleManagementRoleService.getRole()
          if (selectedPermissionIds.length > 1) {
            this.messageService.sendInfo('Дозволи видалено')
          } else {
            this.messageService.sendInfo('Дозвіл видалено')
          }
        })
    }
    this.modalService.dismissAll()
  }
  setPermissionsByRole(roleId: number) {
    this.roleManagementHttpService
      .getPermissionByRole(roleId)
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        catchError((error) => {
          this.messageService.alertError(error)
          return of(null)
        })
      )
      .subscribe((data) => {
        if (data) {
          this.permissionsByRole = data.permissions_by_app
          this.permissionApps = this.permissionsByRole.map((perm) => perm.app)
        }
      })
  }
  getPermissionsByApp(app: string) {
    const appObject = this.permissionsByRole?.find((item) => item.app === app)

    this.actionsByRoleApp = appObject ? appObject.permissions : null
  }
  clearAddPermissionUpdateModalValues() {
    this.selectedAppForUpdate = null
    this.selectedPermission = null
  }
  clearAddPermissionDeleteModalValues() {
    this.selectedAppForDelete = null
    this.selectedAppActionForDelete = null
  }
}
