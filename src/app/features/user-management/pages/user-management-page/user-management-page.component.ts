import { Component } from '@angular/core'
import { UserManagementUsersListComponent } from '../../components/user-management-users-list/user-management-users-list.component'

@Component({
  selector: 'app-user-management-page',
  standalone: true,
  imports: [UserManagementUsersListComponent],
  templateUrl: './user-management-page.component.html',
  styleUrl: './user-management-page.component.css'
})
export class UserManagementPageComponent {}
