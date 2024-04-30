import { Component, Input, OnChanges, OnInit, SimpleChanges, inject } from '@angular/core'
import { RoleManagementRoleService } from '../../services/role-management-role.service'
import { CommonModule } from '@angular/common'
import { Permission, Role } from '../../models/role.model'
import { ModalComponent } from 'src/app/shared/components/modal/modal.component'
import { FormsModule } from '@angular/forms'
import { NgSelectModule } from '@ng-select/ng-select'

@Component({
  selector: 'app-role-management-role',
  standalone: true,
  imports: [CommonModule, ModalComponent, FormsModule, NgSelectModule],
  templateUrl: './role-management-role.component.html',
  styleUrl: './role-management-role.component.css'
})
export class RoleManagementRoleComponent implements OnInit, OnChanges {
  protected roleManagementRoleService = inject(RoleManagementRoleService)
  @Input() role: Role | null
  updateRoleName = ''
  ngOnInit(): void {
    this.updateRoleNameFromRole()
  }

  ngOnChanges(changes: SimpleChanges): void {
    if ('role' in changes) {
      this.updateRoleNameFromRole()
    }
  }

  private updateRoleNameFromRole(): void {
    if (this.role) {
      this.updateRoleName = this.role.Name
    }
  }
  updateRole() {
    this.roleManagementRoleService.updateRole(this.updateRoleName)
  }
  deleteRole() {
    this.roleManagementRoleService.deleteRole()
  }
}
