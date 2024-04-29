import { Component, inject } from '@angular/core'
import { CommonModule } from '@angular/common'
import { ProjectManagementCreateProjectComponent } from '../../components/project-management-create-project/project-management-create-project.component'
import { ProjectManagementProjectsListComponent } from '../../components/project-management-projects-list/project-management-projects-list.component'

@Component({
  selector: 'app-project-management-page',
  standalone: true,
  imports: [CommonModule, ProjectManagementProjectsListComponent, ProjectManagementCreateProjectComponent],

  templateUrl: './project-management-page.component.html',
  styleUrls: ['./project-management-page.component.css']
})
export class ProjectManagementPageComponent {}
