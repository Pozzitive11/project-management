import { HttpClient, HttpParams } from '@angular/common/http'

import { Injectable, inject } from '@angular/core'
import { environment } from 'src/environments/environment'
import { App, NewApp, Project } from '../models/project.model'
import { Observable } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class ProjectManagementHttpService {
  private http = inject(HttpClient)

  projectsUrl = (environment.BACKEND_URL || window.location.origin) + environment.API_BASE_URL + '/structure/project'
  appUrl = (environment.BACKEND_URL || window.location.origin) + environment.API_BASE_URL + '/structure/app'

  // PROJECTS
  getProjectsList(): Observable<{ projects: Project[] }> {
    return this.http.get<{ projects: Project[] }>(this.projectsUrl)
  }
  createProject(projectName: string, projectDescription: string) {
    return this.http.post<Project>(this.projectsUrl, {
      Name: projectName,
      Description: projectDescription
    })
  }
  deleteProject(projectId: number) {
    return this.http.delete(`${this.projectsUrl}/${projectId}`)
  }
  updateProject(projectId: number, projectName: string, projectDescription: string) {
    return this.http.patch(`${this.projectsUrl}/${projectId}`, {
      Name: projectName,
      Description: projectDescription
    })
  }
  // APPS
  getAppsList(projectId: number): Observable<{ apps: App[] }> {
    return this.http.get<{ apps: App[] }>(`${this.projectsUrl}/${projectId}/apps`)
  }
  createApp(newApp: NewApp) {
    return this.http.post<App>(this.appUrl, newApp)
  }
}
