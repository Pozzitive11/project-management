import { Component, Input, OnChanges, OnInit, SimpleChanges, inject } from '@angular/core'
import { User } from '../../models/user.model'
import { UserManagementUserService } from '../../services/user-management-user.service'
import { CommonModule } from '@angular/common'
import { ModalComponent } from 'src/app/shared/components/modal/modal.component'
import { NgSelectModule } from '@ng-select/ng-select'
import { FormsModule } from '@angular/forms'
import { UserManagementUserRolesService } from '../../services/user-management-user-roles.service'
import { UserManagementUserPermissionsService } from '../../services/user-management-user-permissions.service'
import { RoleManagementPermissionService } from 'src/app/features/role-management/services/role-management-permission.service'
import { NgbAccordionModule } from '@ng-bootstrap/ng-bootstrap'
import { UserManagementRoleComponent } from '../user-management-role/user-management-role.component'

@Component({
  selector: 'app-user-management-user',
  standalone: true,
  imports: [CommonModule, ModalComponent, NgSelectModule, FormsModule, NgbAccordionModule, UserManagementRoleComponent],
  templateUrl: './user-management-user.component.html',
  styleUrl: './user-management-user.component.css'
})
export class UserManagementUserComponent implements OnInit, OnChanges {
  protected userManagementUserService = inject(UserManagementUserService)
  protected userManagementUserRolesService = inject(UserManagementUserRolesService)
  protected userManagementUserPermissionsService = inject(UserManagementUserPermissionsService)
  protected roleManagementPermissionService = inject(RoleManagementPermissionService)

  @Input() user: User | null
  ngOnInit(): void {
    this.userManagementUserRolesService.getAvailableRoles()
    this.roleManagementPermissionService.setApps()
  }
  ngOnChanges(changes: SimpleChanges): void {
    this.userManagementUserRolesService.getAvailableRoles()
    this.userManagementUserPermissionsService.getUserPermissions()
  }
  clearDeleteRoleModal() {
    this.userManagementUserRolesService.selectedRoleForDelete = null
  }
  clearAddRoleModal() {
    this.userManagementUserRolesService.selectedRoleForAdd = null
  }
  clearAddPermissionModal() {
    this.userManagementUserPermissionsService.selectedAppForAdd = null
    this.userManagementUserPermissionsService.selectedPermissionsForAdd = null
  }
  clearDeletePermissionModal() {
    this.userManagementUserPermissionsService.selectedAppForDelete = null
    this.userManagementUserPermissionsService.selectedPermissionsForDelete = null
  }
  getAvailablePermissions() {
    if (this.user) {
      this.userManagementUserPermissionsService.getAvailablePermissionByApp(this.user.id)
    }
  }
  addUserPermission() {
    if (this.user) {
      this.userManagementUserPermissionsService.addUserPermission(this.user.id)
    }
  }
  deleteUserPermission() {
    if (this.user) {
      this.userManagementUserPermissionsService.deleteUserPermission(this.user.id)
    }
  }
  getSelectedAppForDelete() {
    if (this.userManagementUserPermissionsService.selectedAppForDelete) {
      this.userManagementUserPermissionsService.getPermissionsByApp(
        this.userManagementUserPermissionsService.selectedAppForDelete.app
      )
    }
  }
}
