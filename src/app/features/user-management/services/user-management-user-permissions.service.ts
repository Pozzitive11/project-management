import { DestroyRef, Injectable, inject } from '@angular/core'
import { BehaviorSubject, catchError, from, of, tap } from 'rxjs'
import { takeUntilDestroyed } from '@angular/core/rxjs-interop'
import { NgbModal } from '@ng-bootstrap/ng-bootstrap'
import { MessageHandlingService } from 'src/app/shared/services/message-handling.service'
import { UserManagementHttpService } from './user-management-http.service'
import { User, UserRole } from '../models/user.model'
import { Permission } from '../../role-management/models/role.model'
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

  userPermissions: Permission[] | null = null
  selectedApp: { id: number; Action: string }[] | null = null
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
            this.userPermissions = data.permissions
          }
        })
    }
  }

  addUserPermission() {}
}
