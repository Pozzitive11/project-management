import { DestroyRef, Injectable, inject } from '@angular/core'
import { BehaviorSubject, catchError, from, of, tap } from 'rxjs'
import { takeUntilDestroyed } from '@angular/core/rxjs-interop'
import { NgbModal } from '@ng-bootstrap/ng-bootstrap'
import { MessageHandlingService } from 'src/app/shared/services/message-handling.service'
import { UserManagementHttpService } from './user-management-http.service'
import { User, UserRole } from '../models/user.model'
import { Permission, Role } from '../../role-management/models/role.model'
import { UserManagementUserService } from './user-management-user.service'
import { UserManagementUserPermissionsService } from './user-management-user-permissions.service'
import { RoleManagementHttpService } from '../../role-management/services/role-management-http.service'

@Injectable({
  providedIn: 'root'
})
export class UserManagementUserRolesService {
  private userManagementHttpService = inject(UserManagementHttpService)
  protected userManagementUserService = inject(UserManagementUserService)
  protected userManagementUserPermissionsService = inject(UserManagementUserPermissionsService)
  private destroyRef = inject(DestroyRef)
  private modalService = inject(NgbModal)
  private messageService = inject(MessageHandlingService)

  private _userRoles$ = new BehaviorSubject<UserRole[] | null>(null)
  userRoles$ = from(this._userRoles$)

  private _availableRoles$ = new BehaviorSubject<UserRole[] | null>(null)
  availableRoles$ = from(this._availableRoles$)

  selectedRoleForAdd: UserRole[] | null = null
  selectedRoleForDelete: UserRole[] | null = null

  getUserRoles() {
    if (this.userManagementUserService.selectedUser) {
      this.userManagementHttpService
        .getUserRoles(this.userManagementUserService.selectedUser.id)
        .pipe(
          takeUntilDestroyed(this.destroyRef),
          catchError((error) => {
            this.messageService.alertError(error)
            return of(null)
          })
        )
        .subscribe((data) => {
          if (data) {
            this._userRoles$.next(data.roles)
          }
        })
    }
  }

  getAvailableRoles() {
    if (this.userManagementUserService.selectedUser) {
      this.userManagementHttpService
        .getAvailableRoles(this.userManagementUserService.selectedUser.id)
        .pipe(
          takeUntilDestroyed(this.destroyRef),
          catchError((error) => {
            this.messageService.alertError(error)
            return of(null)
          })
        )
        .subscribe((data) => {
          if (data) {
            this._availableRoles$.next(data.roles)
          }
        })
    }
  }

  addUserRole() {
    const selectedRolesIds = this.selectedRoleForAdd?.map((permission) => permission.id)
    if (this.userManagementUserService.selectedUser && selectedRolesIds) {
      this.userManagementHttpService
        .addRoleToUSer(this.userManagementUserService.selectedUser.id, selectedRolesIds)
        .pipe(
          takeUntilDestroyed(this.destroyRef),
          catchError((error) => {
            this.messageService.alertError(error)
            return of(null)
          }),
          tap(() => {
            this.getUserRoles()
            this.getAvailableRoles()
            this.userManagementUserPermissionsService.getUserPermissions()
            selectedRolesIds.length === 1
              ? this.messageService.sendInfo('Роль додано')
              : this.messageService.sendInfo('Ролі додано')
          })
        )
        .subscribe(() => {})
    }
    this.modalService.dismissAll()
  }
  deleteUserRole() {
    const selectedRolesIds = this.selectedRoleForDelete?.map((permission) => permission.id)
    if (this.userManagementUserService.selectedUser && selectedRolesIds) {
      this.userManagementHttpService
        .deleteUserRole(this.userManagementUserService.selectedUser.id, selectedRolesIds)
        .pipe(
          takeUntilDestroyed(this.destroyRef),
          catchError((error) => {
            this.messageService.alertError(error)
            return of(null)
          }),
          tap(() => {
            this.filterUserRoles(selectedRolesIds)
            this.userManagementUserPermissionsService.getUserPermissions()
            this.getAvailableRoles()
          })
        )
        .subscribe(() => {
          selectedRolesIds.length === 1
            ? this.messageService.sendInfo(`Роль видалено`)
            : this.messageService.sendInfo(`Ролі видалено`)
        })
    }
    this.modalService.dismissAll()
  }

  private filterUserRoles(roleIds: number[]) {
    const currentUserRoles = this._userRoles$.getValue()
    if (!currentUserRoles) return
    const updatedUserRoles = currentUserRoles.filter((userRole) => !roleIds.includes(userRole.id))
    this._userRoles$.next(updatedUserRoles)
  }
}
