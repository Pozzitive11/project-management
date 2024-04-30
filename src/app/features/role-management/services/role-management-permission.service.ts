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
  private _permission$ = new BehaviorSubject<Permission[]>([])
  permission$ = from(this._permission$)

  setPermissionByApp() {
    this.roleManagementHttpService
      .getPermissionByApp(1, 1)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((data) => {
        this._permission$.next(data.permissions)
      })
  }
}
