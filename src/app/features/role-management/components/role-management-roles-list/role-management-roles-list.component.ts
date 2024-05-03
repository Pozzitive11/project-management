import { Component, OnInit, inject } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { NgSelectModule } from '@ng-select/ng-select'
import { CommonModule } from '@angular/common'
import { RoleManagementRoleService } from '../../services/role-management-role.service'
import { Role } from '../../models/role.model'
import { RoleManagementRoleComponent } from '../role-management-role/role-management-role.component'
@Component({
  selector: 'app-role-management-roles-list',
  standalone: true,
  imports: [CommonModule, FormsModule, NgSelectModule, RoleManagementRoleComponent],
  templateUrl: './role-management-roles-list.component.html',
  styleUrl: './role-management-roles-list.component.css'
})
export class RoleManagementRolesListComponent implements OnInit {
  protected roleManagementRoleService = inject(RoleManagementRoleService)

  ngOnInit(): void {
    this.roleManagementRoleService.setRoles()
  }

  roleSelection() {
    this.roleManagementRoleService.getRole()
    if (this.roleManagementRoleService.selectedRole === null) {
      this.roleManagementRoleService.clearRole()
    }
  }
}
