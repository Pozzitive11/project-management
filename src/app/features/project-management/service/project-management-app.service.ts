import { DestroyRef, Injectable, inject } from '@angular/core'
import { App, NewApp } from '../models/project.model'
import { BehaviorSubject, Observable, from, tap } from 'rxjs'
import { ProjectManagementHttpService } from './project-management-http.service'
import { takeUntilDestroyed } from '@angular/core/rxjs-interop'
import { NgbModal } from '@ng-bootstrap/ng-bootstrap'

// @Injectable({
//   providedIn: 'root'
// })
export class ProjectManagementAppService {
  private projectManagementHttpService = inject(ProjectManagementHttpService)
  private destroyRef = inject(DestroyRef)
  private modalService = inject(NgbModal)
  private _apps$ = new BehaviorSubject<App[]>([])
  apps$ = from(this._apps$)

  projectId: number
  createAppName = ''
  createAppShortDescription = ''
  createAppRoute = ''
  createAppDescription = ''
  loader = false
  isDataLoaded = false

  setApps(projectId: number) {
    this.projectId = projectId
    this.loader = true
    this.projectManagementHttpService
      .getAppsList(projectId)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((data) => {
        this._apps$.next(data.apps)
        this.loader = false
        this.isDataLoaded = true
      })
  }
  createApp() {
    const app: NewApp = {
      Name: this.createAppName,
      Description: this.createAppDescription,
      ShortDescription: this.createAppShortDescription,
      Route: this.createAppRoute,
      ProjectId: this.projectId
    }
    this.projectManagementHttpService
      .createApp(app)
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        tap((data) => {
          if (data) {
            const currentProjects = this._apps$.getValue()
            const updatedProjects = [...currentProjects, data]
            this._apps$.next(updatedProjects)
            this.createAppName = ''
            this.createAppShortDescription = ''
            this.createAppRoute = ''
            this.createAppDescription = ''
          }
        })
      )
      .subscribe()
    this.modalService.dismissAll()
  }
  // deleteProject(projectId: number) {
  //   this.projectManagementHttpService
  //     .deleteProject(projectId)
  //     .pipe(takeUntilDestroyed(this.destroyRef))
  //     .subscribe(() => {
  //       this.filterProjects(projectId)
  //     })
  // }
  // updateProject(projectId: number, projectName: string, projectDescription: string) {
  //   this.projectManagementHttpService
  //     .updateProject(projectId, projectName, projectDescription)
  //     .pipe(takeUntilDestroyed(this.destroyRef))
  //     .subscribe(() => {
  //       this.updateProjectValues(projectId, projectName, projectDescription)
  //     })
  // }
  // private updateProjectValues(projectId: number, projectName: string, projectDescription: string) {
  //   const currentProjects = this._apps$.getValue()
  //   const projectIndex = currentProjects.findIndex((project) => project.id === projectId)
  //   if (projectIndex !== -1) {
  //     const updatedProject = { ...currentProjects[projectIndex] }
  //     updatedProject.Name = projectName
  //     updatedProject.Description = projectDescription
  //     const updatedProjects = [...currentProjects]
  //     updatedProjects[projectIndex] = updatedProject
  //     this._apps$.next(updatedProjects)
  //   }
  // }
  // private filterProjects(projectId: number) {
  //   const currentProjects = this._apps$.getValue()
  //   const updatedProjects = currentProjects.filter((project) => project.id !== projectId)
  //   this._apps$.next(updatedProjects)
  // }
}
