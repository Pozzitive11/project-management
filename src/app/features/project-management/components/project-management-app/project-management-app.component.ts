import { Component, Input } from '@angular/core'
import { CommonModule } from '@angular/common'
import { App } from '../../models/project.model'

@Component({
  selector: 'app-project-management-app',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './project-management-app.component.html',
  styleUrl: './project-management-app.component.css'
})
export class ProjectManagementAppComponent {
  @Input() app: App
  isShow: { [key: string]: boolean } = {}

  show(entryId: number) {
    this.isShow[entryId] = !this.isShow[entryId]
  }
}
