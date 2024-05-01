import { Component, inject } from '@angular/core'
import { ModalComponent } from 'src/app/shared/components/modal/modal.component'
import { RoleManagementRoleService } from '../../services/role-management-role.service'
import { FormsModule } from '@angular/forms'

@Component({
  selector: 'app-role-management-create-role',
  standalone: true,
  imports: [FormsModule, ModalComponent],
  templateUrl: './role-management-create-role.component.html',
  styleUrl: './role-management-create-role.component.css'
})
export class RoleManagementCreateRoleComponent {
  protected roleManagementRoleService = inject(RoleManagementRoleService)
  clearValue() {
    this.roleManagementRoleService.createRoleName = ''
  }
}
