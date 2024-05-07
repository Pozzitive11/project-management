import { DestroyRef, Injectable, inject } from '@angular/core'
import { BehaviorSubject, catchError, from, of, tap } from 'rxjs'
import { Permission, Role } from '../models/role.model'
import { RoleManagementHttpService } from './role-management-http.service'
import { NgbModal } from '@ng-bootstrap/ng-bootstrap'
import { takeUntilDestroyed } from '@angular/core/rxjs-interop'
import { MessageHandlingService } from 'src/app/shared/services/message-handling.service'

@Injectable({
  providedIn: 'root'
})
export class RoleManagementRoleService {
  private roleManagementHttpService = inject(RoleManagementHttpService)
  private modalService = inject(NgbModal)
  private destroyRef = inject(DestroyRef)
  private messageService = inject(MessageHandlingService)

  private _roles$ = new BehaviorSubject<Role[]>([])
  roles$ = from(this._roles$)
  private _role$ = new BehaviorSubject<Role | null>(null)
  role$ = from(this._role$)
  selectedRole: Role | null

  roleLoader = false

  rolePermissionsGroups: { [key: string]: Permission[] } = {}
  createRoleName = ''
  setRoles() {
    this.roleManagementHttpService
      .getRolesList()
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        catchError((error) => {
          this.messageService.alertError(error)
          return of(null)
        })
      )
      .subscribe((data) => {
        if (data) {
          this._roles$.next(data.roles)
        }
      })
  }

  createRole() {
    this.roleManagementHttpService
      .createRole(this.createRoleName)
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        catchError((error) => {
          this.messageService.alertError(error)
          return of(null)
        }),
        tap((data) => {
          if (data) {
            this.setRoles()
            // const currentRoles = this._roles$.getValue()
            // const updatedProjects = [...currentRoles, data]
            // this._roles$.next(updatedProjects)
            this.messageService.sendInfo(`Роль створено`)
            // this.createRoleName = ''
          }
        })
      )
      .subscribe()
    this.modalService.dismissAll()
  }

  getRole() {
    this.roleLoader = true
    if (this.selectedRole) {
      this.roleManagementHttpService
        .getRoleInfo(this.selectedRole.id)
        .pipe(
          takeUntilDestroyed(this.destroyRef),
          catchError((error) => {
            this.messageService.alertError(error)
            this.roleLoader = false
            return of(null)
          })
        )
        .subscribe((data) => {
          if (data && data.permissions) {
            this.rolePermissionsGroups = this.groupPermissionsByApp(data.permissions)
            this.roleLoader = false
          }
          this._role$.next(data)
        })
    }
  }
  clearRole() {
    this._role$.next(null)
    this.roleLoader = false
  }
  deleteRole() {
    if (this._role$.value) {
      this.roleManagementHttpService
        .deleteRole(this._role$.value.id)
        .pipe(
          takeUntilDestroyed(this.destroyRef),
          catchError((error) => {
            this.messageService.alertError(error)
            return of(null)
          })
        )
        .subscribe(() => {
          if (this._role$.value) {
            this.setRoles()
            this.selectedRole = null
            this._role$.next(null)
            this.messageService.sendInfo(`Роль видалено`)
          }
        })
    }
  }
  updateRole(roleName: string) {
    if (this._role$.value) {
      this.roleManagementHttpService
        .updateRole(this._role$.value.id, roleName)
        .pipe(
          takeUntilDestroyed(this.destroyRef),
          catchError((error) => {
            this.messageService.alertError(error)
            return of(null)
          })
        )
        .subscribe((data) => {
          if (data) {
            this.getRole()
            // this.updateProjectValues(data.id, data.Name)
            // this.selectedRole = { Name: data.Name, id: data.id }
            // this._role$.next(data)
            this.messageService.sendInfo(`Роль оновлено`)
          }
        })
    }
    this.modalService.dismissAll()
  }
  // private filterRoles(appId: number) {
  //   const currentApps = this._roles$.getValue()
  //   const updatedApps = currentApps.filter((app) => app.id !== appId)
  //   this._roles$.next(updatedApps)
  // }
  // private updateProjectValues(roleId: number, roleName: string) {
  //   const currentRoles = this._roles$.getValue()
  //   const roleIndex = currentRoles.findIndex((role) => role.id === roleId)
  //   if (roleIndex !== -1) {
  //     const updatedProject = { ...currentRoles[roleIndex] }
  //     updatedProject.Name = roleName
  //     const updatedProjects = [...currentRoles]
  //     updatedProjects[roleIndex] = updatedProject
  //     this._roles$.next(updatedProjects)
  //   }
  // }
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
