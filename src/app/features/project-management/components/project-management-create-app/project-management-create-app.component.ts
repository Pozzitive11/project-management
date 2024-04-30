import { FormsModule } from '@angular/forms'
import { CommonModule } from '@angular/common'
import { Component, inject } from '@angular/core'
import { ProjectManagementAppService } from '../../services/project-management-app.service'
import { ModalComponent } from 'src/app/shared/components/modal/modal.component'

@Component({
  selector: 'app-project-management-create-app',
  standalone: true,
  imports: [CommonModule, FormsModule, ModalComponent],
  templateUrl: './project-management-create-app.component.html',
  styleUrl: './project-management-create-app.component.css'
})
export class ProjectManagementCreateAppComponent {
  protected projectManagementAppService = inject(ProjectManagementAppService)
}
