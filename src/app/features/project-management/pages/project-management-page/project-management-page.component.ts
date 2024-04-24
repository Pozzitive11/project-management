import { Component, inject } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'

@Component({
  selector: 'app-project-management-page',
  standalone: true,
  imports: [CommonModule, FormsModule],

  templateUrl: './project-management-page.component.html',
  styleUrls: ['./project-management-page.component.css']
})
export class ProjectManagementPageComponent {}
