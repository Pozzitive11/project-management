import { Component, inject } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { CommonModule } from '@angular/common'
import { ProjectManagementModalComponent } from '../project-management-modal/project-management-modal.component'
import { ProjectManagementProjectService } from '../../services/project-management-project.service'

@Component({
  selector: 'app-project-management-create-project',
  standalone: true,
  imports: [FormsModule, CommonModule, ProjectManagementModalComponent],
  templateUrl: './project-management-create-project.component.html',
  styleUrl: './project-management-create-project.component.css'
})
export class ProjectManagementCreateProjectComponent {
  protected projectManagementProjectService = inject(ProjectManagementProjectService)
}
