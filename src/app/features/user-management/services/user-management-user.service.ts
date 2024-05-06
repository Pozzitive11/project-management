import { DestroyRef, Injectable, inject } from '@angular/core'
import { BehaviorSubject, catchError, from, of, tap } from 'rxjs'
import { takeUntilDestroyed } from '@angular/core/rxjs-interop'
import { NgbModal } from '@ng-bootstrap/ng-bootstrap'
import { MessageHandlingService } from 'src/app/shared/services/message-handling.service'
import { UserManagementHttpService } from './user-management-http.service'
import { User, UserRole } from '../models/user.model'
import { Permission } from '../../role-management/models/role.model'

@Injectable({
  providedIn: 'root'
})
export class UserManagementUserService {
  private userManagementHttpService = inject(UserManagementHttpService)
  private destroyRef = inject(DestroyRef)
  private modalService = inject(NgbModal)
  private messageService = inject(MessageHandlingService)

  private _users$ = new BehaviorSubject<User[]>([])
  users$ = from(this._users$)

  private _user$ = new BehaviorSubject<User | null>(null)
  user$ = from(this._user$)
  private _userRoles$ = new BehaviorSubject<UserRole[] | null>(null)
  userRoles$ = from(this._userRoles$)

  userPermissions: Permission[] | null = null

  selectedUser: User | null = null
  availableRoles: UserRole[] | null = null

  selectedRoleForAdd: UserRole[] | null = null
  selectedRoleForDelete: UserRole[] | null = null

  userListLoader = false
  userLoader = false

  getUsers() {
    this.userListLoader = true
    this.userManagementHttpService
      .getUsersList()
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        catchError((error) => {
          this.messageService.alertError(error)
          this.userListLoader = false
          return of(null)
        })
      )
      .subscribe((data) => {
        if (data) {
          this.userListLoader = false
          this._users$.next(data.users)
        }
      })
  }

  getUser() {
    this.userLoader = true
    if (this.selectedUser) {
      this.userManagementHttpService
        .getUserInfo(this.selectedUser.id)
        .pipe(
          takeUntilDestroyed(this.destroyRef),
          catchError((error) => {
            this.messageService.alertError(error)
            this.userLoader = false
            return of(null)
          })
        )
        .subscribe((data) => {
          this._user$.next(data)
          this.userLoader = false
        })
    }
  }

  getUserRoles() {
    if (this.selectedUser) {
      this.userManagementHttpService
        .getUserRoles(this.selectedUser.id)
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
  getUserPermissions() {
    if (this.selectedUser) {
      this.userManagementHttpService
        .getUserPermissions(this.selectedUser.id)
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

  getAvailableRoles() {
    if (this.selectedUser) {
      this.userManagementHttpService
        .getAvailableRoles(this.selectedUser.id)
        .pipe(
          takeUntilDestroyed(this.destroyRef),
          catchError((error) => {
            this.messageService.alertError(error)
            return of(null)
          })
        )
        .subscribe((data) => {
          if (data) {
            this.availableRoles = data.roles
          }
        })
    }
  }

  addUserRole() {
    const selectedRolesIds = this.selectedRoleForAdd?.map((permission) => permission.id)

    if (this.selectedUser && selectedRolesIds) {
      this.userManagementHttpService
        .addRoleToUSer(this.selectedUser.id, selectedRolesIds)
        .pipe(
          takeUntilDestroyed(this.destroyRef),
          catchError((error) => {
            this.messageService.alertError(error)
            return of(null)
          })
        )
        .subscribe(() => {
          this.messageService.sendInfo(`Роль додано`)
        })
    }
    this.modalService.dismissAll()
  }
  deleteUserRole() {
    const selectedRolesIds = this.selectedRoleForDelete?.map((permission) => permission.id)
    if (this.selectedUser && selectedRolesIds) {
      this.userManagementHttpService
        .deleteUserRole(this.selectedUser.id, selectedRolesIds)
        .pipe(
          takeUntilDestroyed(this.destroyRef),
          catchError((error) => {
            this.messageService.alertError(error)
            return of(null)
          }),
          tap(() => {
            this.filterUserRoles(selectedRolesIds)
            this.getUserPermissions()
          })
        )
        .subscribe(() => {
          this.messageService.sendInfo(`Роль видалено`)
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
