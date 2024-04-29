import { FormsModule } from '@angular/forms'
import { CommonModule } from '@angular/common'
import { Component, inject } from '@angular/core'
import { ProjectManagementModalComponent } from '../project-management-modal/project-management-modal.component'
import { ProjectManagementAppService } from '../../service/project-management-app.service'

@Component({
  selector: 'app-project-management-create-app',
  standalone: true,
  imports: [CommonModule, FormsModule, ProjectManagementModalComponent],
  templateUrl: './project-management-create-app.component.html',
  styleUrl: './project-management-create-app.component.css'
})
export class ProjectManagementCreateAppComponent {
  protected projectManagementAppService = inject(ProjectManagementAppService)
}
