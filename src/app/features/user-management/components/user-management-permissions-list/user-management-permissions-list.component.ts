import { CommonModule } from '@angular/common'
import { Component, Input, OnChanges, OnInit, inject } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { NgbAccordionModule } from '@ng-bootstrap/ng-bootstrap'
import { NgSelectModule } from '@ng-select/ng-select'
import { ModalComponent } from 'src/app/shared/components/modal/modal.component'
import { UserManagementRoleComponent } from '../user-management-role/user-management-role.component'
import { UserManagementUserPermissionsService } from '../../services/user-management-user-permissions.service'
import { RoleManagementPermissionService } from 'src/app/features/role-management/services/role-management-permission.service'
import { User } from '../../models/user.model'

@Component({
  selector: 'app-user-management-permissions-list',
  standalone: true,
  imports: [CommonModule, ModalComponent, NgSelectModule, FormsModule, NgbAccordionModule, UserManagementRoleComponent],
  templateUrl: './user-management-permissions-list.component.html',
  styleUrl: './user-management-permissions-list.component.css'
})
export class UserManagementPermissionsListComponent implements OnInit, OnChanges {
  protected userManagementUserPermissionsService = inject(UserManagementUserPermissionsService)
  protected roleManagementPermissionService = inject(RoleManagementPermissionService)
  @Input() user: User | null
  ngOnInit(): void {
    this.roleManagementPermissionService.setApps()
  }
  ngOnChanges(): void {
    this.userManagementUserPermissionsService.getUserPermissions()
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
