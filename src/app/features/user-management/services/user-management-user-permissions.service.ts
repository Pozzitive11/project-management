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
  selectedApp: { id: number; Action: string } | null = null
  availablePermissions: Permission[] | null = null
  selectedPermission: Permission[] | null = null
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
    if (this.selectedApp) {
      this.userManagementHttpService
        .getAvailablePermissionsByApp(userId, this.selectedApp.id)
        .pipe()
        .subscribe((data) => {
          this.availablePermissions = data.permissions
        })
    }
  }

  addUserPermission(userId: number) {
    const permissionIds = this.selectedPermission?.map((permission) => permission.id)
    if (permissionIds) {
      this.userManagementHttpService.addUserPermission(userId, permissionIds).subscribe((data) => {
        this.getUserPermissions()
        this.modalService.dismissAll()
      })
    }
  }
}
