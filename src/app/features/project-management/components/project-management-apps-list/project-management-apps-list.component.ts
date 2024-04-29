import { CommonModule } from '@angular/common'
import { Component, Input } from '@angular/core'
import { App } from '../../models/project.model'
import { ProjectManagementAppComponent } from '../project-management-app/project-management-app.component'

@Component({
  selector: 'app-project-management-apps-list',
  standalone: true,
  imports: [CommonModule, ProjectManagementAppComponent],
  templateUrl: './project-management-apps-list.component.html',
  styleUrl: './project-management-apps-list.component.css'
})
export class ProjectManagementAppsListComponent {
  @Input() apps: App[]
}
