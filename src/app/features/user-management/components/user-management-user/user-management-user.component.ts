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
import { UserManagementPermissionsListComponent } from '../user-management-permissions-list/user-management-permissions-list.component'
import { UserManagementRolesListComponent } from '../user-management-roles-list/user-management-roles-list.component'

@Component({
  selector: 'app-user-management-user',
  standalone: true,
  imports: [CommonModule, UserManagementPermissionsListComponent, UserManagementRolesListComponent],
  templateUrl: './user-management-user.component.html',
  styleUrl: './user-management-user.component.css'
})
export class UserManagementUserComponent {
  protected userManagementUserService = inject(UserManagementUserService)
  protected userManagementUserRolesService = inject(UserManagementUserRolesService)

  @Input() user: User | null
  // ngOnInit(): void {
  //   this.userManagementUserRolesService.getAvailableRoles()
  // }
  // ngOnChanges(changes: SimpleChanges): void {
  //   this.userManagementUserRolesService.getAvailableRoles()
  // }
}
