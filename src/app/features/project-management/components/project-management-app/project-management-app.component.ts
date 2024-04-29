import { Component, Input, OnInit, inject } from '@angular/core'
import { CommonModule } from '@angular/common'
import { App } from '../../models/project.model'
import { ProjectManagementAppService } from '../../service/project-management-app.service'
import { FormsModule } from '@angular/forms'
import { ProjectManagementModalComponent } from '../project-management-modal/project-management-modal.component'

@Component({
  selector: 'app-project-management-app',
  standalone: true,
  imports: [CommonModule, FormsModule, ProjectManagementModalComponent],
  templateUrl: './project-management-app.component.html',
  styleUrl: './project-management-app.component.css'
})
export class ProjectManagementAppComponent implements OnInit {
  protected projectManagementAppService = inject(ProjectManagementAppService)

  @Input() app: App
  isShow: { [key: string]: boolean } = {}
  updateAppName = ''
  updateAppShortDescription = ''
  updateAppRoute = ''
  updateAppDescription = ''
  ngOnInit(): void {
    this.setAppValues()
  }
  show(entryId: number) {
    this.isShow[entryId] = !this.isShow[entryId]
  }

  setAppValues() {
    this.updateAppName = this.app.Name
    this.updateAppDescription = this.app.Description
    this.updateAppShortDescription = this.app.ShortDescription
    this.updateAppRoute = this.app.Route
  }

  deleteApp() {
    this.projectManagementAppService.deleteApp(this.app.id)
  }

  updateApp() {
    this.projectManagementAppService.updateApp(
      this.app.id,
      this.updateAppName,
      this.updateAppDescription,
      this.updateAppShortDescription,
      this.updateAppRoute
    )
  }
}
