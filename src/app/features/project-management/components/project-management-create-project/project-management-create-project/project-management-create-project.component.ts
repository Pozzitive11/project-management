import { Component, inject } from '@angular/core'
import { ProjectManagementModalComponent } from '../../project-management-modal/project-management-modal/project-management-modal.component'
import { FormsModule } from '@angular/forms'
import { CommonModule } from '@angular/common'
import { ProjectManagementProjectService } from '../../../service/project-management-project.service'

@Component({
  selector: 'app-project-management-create-project',
  standalone: true,
  imports: [ProjectManagementModalComponent, FormsModule, CommonModule],
  templateUrl: './project-management-create-project.component.html',
  styleUrl: './project-management-create-project.component.css'
})
export class ProjectManagementCreateProjectComponent {
  protected projectManagementProjectService = inject(ProjectManagementProjectService)
}
