import { Component, OnInit, inject } from '@angular/core'
import { CommonModule } from '@angular/common'
import { ProjectManagementProjectComponent } from '../../project-management-project/project-management-project/project-management-project.component'
import { FormsModule } from '@angular/forms'
import { ProjectManagementProjectService } from '../../../service/project-management-project.service'
@Component({
  selector: 'app-project-management-list',
  standalone: true,
  imports: [CommonModule, ProjectManagementProjectComponent, FormsModule],
  templateUrl: './project-management-list.component.html',
  styleUrl: './project-management-list.component.css'
})
export class ProjectManagementListComponent implements OnInit {
  protected projectManagementProjectService = inject(ProjectManagementProjectService)
  ngOnInit(): void {
    this.projectManagementProjectService.setProjects()
  }
}
