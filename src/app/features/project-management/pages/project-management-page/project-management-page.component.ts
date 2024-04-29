import { Component, inject } from '@angular/core'
import { CommonModule } from '@angular/common'
import { ProjectManagementListComponent } from '../../components/project-management-list/project-management-list/project-management-list.component'

@Component({
  selector: 'app-project-management-page',
  standalone: true,
  imports: [CommonModule, ProjectManagementListComponent],

  templateUrl: './project-management-page.component.html',
  styleUrls: ['./project-management-page.component.css']
})
export class ProjectManagementPageComponent {}
