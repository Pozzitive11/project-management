import { Component } from '@angular/core'
import { RoleManagementRolesListComponent } from '../../components/role-management-roles-list/role-management-roles-list.component'
import { RoleManagementCreateRoleComponent } from '../../components/role-management-create-role/role-management-create-role.component'

@Component({
  selector: 'app-role-management-page',
  standalone: true,
  imports: [RoleManagementRolesListComponent, RoleManagementCreateRoleComponent],
  templateUrl: './role-management-page.component.html',
  styleUrl: './role-management-page.component.css'
})
export class RoleManagementPageComponent {}
