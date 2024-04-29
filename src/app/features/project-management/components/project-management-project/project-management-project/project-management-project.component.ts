import { CommonModule } from '@angular/common'
import { Component, EventEmitter, Input, OnInit, Output, inject } from '@angular/core'
import { App, Project } from '../../../models/project.model'
import { ProjectManagementHttpService } from '../../../service/project-management-http.service'
import { ProjectManagementAppComponent } from '../../project-management-app/project-management-app/project-management-app.component'
import { ProjectManagementProjectService } from '../../../service/project-management-project.service'
import { ProjectManagementModalComponent } from '../../project-management-modal/project-management-modal/project-management-modal.component'
import { FormsModule } from '@angular/forms'
@Component({
  selector: 'app-project-management-project',
  standalone: true,
  imports: [CommonModule, ProjectManagementAppComponent, ProjectManagementModalComponent, FormsModule],
  templateUrl: './project-management-project.component.html',
  styleUrl: './project-management-project.component.css'
})
export class ProjectManagementProjectComponent implements OnInit {
  private projectManagementHttpService = inject(ProjectManagementHttpService)
  protected projectManagementProjectService = inject(ProjectManagementProjectService)
  @Input() project: Project
  apps: App[] = []
  showBody = false
  updateProjectName = ''
  updateProjectDescription = ''
  ngOnInit(): void {
    this.setProjectValues()
  }
  toggleShow() {
    if (this.apps.length > 0) {
      this.showBody = !this.showBody
    }
  }
  setProjectValues() {
    this.updateProjectName = this.project.Name
    this.updateProjectDescription = this.project.Description
  }
  getProjectApps() {
    this.projectManagementHttpService.getAppsList(this.project.id).subscribe((data) => {
      this.apps = data.apps
      this.showBody = true
    })
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
  }
}
