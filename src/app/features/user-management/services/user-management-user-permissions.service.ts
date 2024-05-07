import { DestroyRef, Injectable, inject } from '@angular/core'
import { BehaviorSubject, catchError, from, of, tap } from 'rxjs'
import { takeUntilDestroyed } from '@angular/core/rxjs-interop'
import { NgbModal } from '@ng-bootstrap/ng-bootstrap'
import { MessageHandlingService } from 'src/app/shared/services/message-handling.service'
import { UserManagementHttpService } from './user-management-http.service'
import { User, UserRole } from '../models/user.model'
import { Permission, PermissionByRole } from '../../role-management/models/role.model'
import { UserManagementUserService } from './user-management-user.service'
import { ProjectManagementAppService } from '../../project-management/services/project-management-app.service'
import { App } from '../../project-management/models/project.model'

@Injectable({
  providedIn: 'root'
})
export class UserManagementUserPermissionsService {
  private userManagementHttpService = inject(UserManagementHttpService)
  protected userManagementUserService = inject(UserManagementUserService)
  private destroyRef = inject(DestroyRef)
  private modalService = inject(NgbModal)
  private messageService = inject(MessageHandlingService)

  userPermissions: PermissionByRole[] = []

  selectedAppForAdd: App | null = null
  selectedAppForDelete: PermissionByRole | null = null

  availablePermissions: Permission[] | null = null

  selectedPermissionsForAdd: Permission[] | null = null
  selectedPermissionsForDelete: Permission[] | null = null

  actionsByApp: { id: number; Action: string }[] | null = null

  getUserPermissions() {
    if (this.userManagementUserService.selectedUser) {
      this.userManagementHttpService
        .getUserPermissions(this.userManagementUserService.selectedUser.id)
        .pipe(
          takeUntilDestroyed(this.destroyRef),
          catchError((error) => {
            this.messageService.alertError(error)
            return of(null)
          })
        )
        .subscribe((data) => {
          if (data) {
            this.userPermissions = data.permissions_by_app
          }
        })
    }
  }

  getAvailablePermissionByApp(userId: number) {
    if (this.selectedAppForAdd) {
      this.userManagementHttpService
        .getAvailablePermissionsByApp(userId, this.selectedAppForAdd.id)
        .pipe(
          takeUntilDestroyed(this.destroyRef),
          catchError((error) => {
            this.messageService.alertError(error)
            return of(null)
          })
        )
        .subscribe((data) => {
          if (data) {
            this.availablePermissions = data.permissions
          }
        })
    }
  }

  addUserPermission(userId: number) {
    const permissionIds = this.selectedPermissionsForAdd?.map((permission) => permission.id)
    if (permissionIds) {
      this.userManagementHttpService
        .addUserPermission(userId, permissionIds)
        .pipe(
          takeUntilDestroyed(this.destroyRef),
          catchError((error) => {
            this.messageService.alertError(error)
            return of(null)
          })
        )
        .subscribe(() => {
          this.getUserPermissions()
          permissionIds.length === 1
            ? this.messageService.sendInfo(`Дозвіл додано`)
            : this.messageService.sendInfo(`Дозволи додано`)
          this.modalService.dismissAll()
        })
    }
  }
  deleteUserPermission(userId: number) {
    const permissionIds = this.selectedPermissionsForDelete?.map((permission) => permission.id)
    if (permissionIds) {
      this.userManagementHttpService
        .deleteUserPermission(userId, permissionIds)
        .pipe(
          takeUntilDestroyed(this.destroyRef),
          catchError((error) => {
            this.messageService.alertError(error)
            return of(null)
          })
        )
        .subscribe(() => {
          this.getUserPermissions()
          permissionIds.length === 1
            ? this.messageService.sendInfo(`Дозвіл видалено`)
            : this.messageService.sendInfo(`Дозволи видалено`)
          this.modalService.dismissAll()
        })
    }
  }

  getPermissionsByApp(app: string) {
    const appObject = this.userPermissions?.find((item) => item.app === app)

    this.actionsByApp = appObject ? appObject.permissions : null
  }
}
