import { Component, inject } from '@angular/core'
import { CommonModule } from '@angular/common'
import { ProjectManagementListComponent } from '../../components/project-management-list/project-management-list/project-management-list.component'
import { ProjectManagementCreateProjectComponent } from '../../components/project-management-create-project/project-management-create-project/project-management-create-project.component'

@Component({
  selector: 'app-project-management-page',
  standalone: true,
  imports: [CommonModule, ProjectManagementListComponent, ProjectManagementCreateProjectComponent],

  templateUrl: './project-management-page.component.html',
  styleUrls: ['./project-management-page.component.css']
})
export class ProjectManagementPageComponent {}
