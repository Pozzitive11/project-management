import { CommonModule } from '@angular/common'
import { Component, Input, OnInit, inject } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { NgbModal } from '@ng-bootstrap/ng-bootstrap'
import { App, Project } from '../../models/project.model'
import { ProjectManagementProjectService } from '../../services/project-management-project.service'
import { ProjectManagementAppsListComponent } from '../project-management-apps-list/project-management-apps-list.component'
import { ProjectManagementAppService } from '../../services/project-management-app.service'
import { ModalComponent } from 'src/app/shared/components/modal/modal.component'
@Component({
  selector: 'app-project-management-project',
  standalone: true,
  imports: [CommonModule, FormsModule, ProjectManagementAppsListComponent, ModalComponent],
  templateUrl: './project-management-project.component.html',
  styleUrl: './project-management-project.component.css',
  providers: [ProjectManagementAppService]
})
export class ProjectManagementProjectComponent implements OnInit {
  protected projectManagementProjectService = inject(ProjectManagementProjectService)
  protected projectManagementAppService = inject(ProjectManagementAppService)
  private modalService = inject(NgbModal)

  @Input() project: Project
  showBody = false

  updateProjectName = ''
  updateProjectDescription = ''

  ngOnInit(): void {
    this.setProjectValues()
  }

  toggleShow() {
    if (this.projectManagementAppService.isDataLoaded) {
      this.showBody = !this.showBody
    }
  }

  setProjectValues() {
    this.updateProjectName = this.project.Name
    this.updateProjectDescription = this.project.Description
  }

  deleteProject() {
    this.projectManagementProjectService.deleteProject(this.project.id)
  }

  updateProject() {
    this.projectManagementProjectService.updateProject(
      this.project.id,
      this.updateProjectName,
      this.updateProjectDescription
    )

    this.modalService.dismissAll()
  }

  getProjectApps() {
    this.showBody = true
    this.projectManagementAppService.setApps(this.project.id)
  }
}
