import { Component, Input, OnInit, inject } from '@angular/core'
import { RoleManagementRoleService } from '../../services/role-management-role.service'
import { CommonModule } from '@angular/common'
import { Permission, Role } from '../../models/role.model'
import { ModalComponent } from 'src/app/shared/components/modal/modal.component'
import { FormsModule } from '@angular/forms'

@Component({
  selector: 'app-role-management-role',
  standalone: true,
  imports: [CommonModule, ModalComponent, FormsModule],
  templateUrl: './role-management-role.component.html',
  styleUrl: './role-management-role.component.css'
})
export class RoleManagementRoleComponent implements OnInit {
  protected roleManagementRoleService = inject(RoleManagementRoleService)
  updateRoleName = ''
  ngOnInit(): void {
    if (this.roleManagementRoleService.role) {
      this.updateRoleName = this.roleManagementRoleService.role.Name
    }
  }
  updateRole() {
    this.roleManagementRoleService.updateRole(this.updateRoleName)
  }
  deleteRole() {
    this.roleManagementRoleService.deleteRole()
  }
}
