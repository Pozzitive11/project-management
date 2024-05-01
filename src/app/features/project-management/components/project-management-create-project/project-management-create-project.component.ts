import { Component, inject } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { CommonModule } from '@angular/common'
import { ProjectManagementProjectService } from '../../services/project-management-project.service'
import { ModalComponent } from 'src/app/shared/components/modal/modal.component'

@Component({
  selector: 'app-project-management-create-project',
  standalone: true,
  imports: [FormsModule, CommonModule, ModalComponent],
  templateUrl: './project-management-create-project.component.html',
  styleUrl: './project-management-create-project.component.css'
})
export class ProjectManagementCreateProjectComponent {
  protected projectManagementProjectService = inject(ProjectManagementProjectService)
  clearValues() {
    this.projectManagementProjectService.createProjectName = ''
    this.projectManagementProjectService.createProjectDescription = ''
  }
}
