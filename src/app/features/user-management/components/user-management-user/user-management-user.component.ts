import { Component, Input, OnChanges, OnInit, SimpleChanges, inject } from '@angular/core'
import { User } from '../../models/user.model'
import { UserManagementUserService } from '../../services/user-management-user.service'
import { CommonModule } from '@angular/common'
import { ModalComponent } from 'src/app/shared/components/modal/modal.component'
import { NgSelectModule } from '@ng-select/ng-select'
import { FormsModule } from '@angular/forms'
import { UserManagementUserRolesService } from '../../services/user-management-user-roles.service'
import { UserManagementUserPermissionsService } from '../../services/user-management-user-permissions.service'

@Component({
  selector: 'app-user-management-user',
  standalone: true,
  imports: [CommonModule, ModalComponent, NgSelectModule, FormsModule],
  templateUrl: './user-management-user.component.html',
  styleUrl: './user-management-user.component.css'
})
export class UserManagementUserComponent {
  protected userManagementUserService = inject(UserManagementUserService)
  protected userManagementUserRolesService = inject(UserManagementUserRolesService)
  protected userManagementUserPermissionsService = inject(UserManagementUserPermissionsService)
  @Input() user: User | null

  clearDeleteRoleModal() {
    this.userManagementUserRolesService.selectedRoleForDelete = null
  }
}
