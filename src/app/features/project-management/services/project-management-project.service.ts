import { DestroyRef, Injectable, inject } from '@angular/core'
import { Project } from '../models/project.model'
import { BehaviorSubject, catchError, from, of, tap } from 'rxjs'
import { ProjectManagementHttpService } from './project-management-http.service'
import { takeUntilDestroyed } from '@angular/core/rxjs-interop'
import { NgbModal } from '@ng-bootstrap/ng-bootstrap'
import { MessageHandlingService } from 'src/app/shared/services/message-handling.service'

@Injectable({
  providedIn: 'root'
})
export class ProjectManagementProjectService {
  private projectManagementHttpService = inject(ProjectManagementHttpService)
  private destroyRef = inject(DestroyRef)
  private modalService = inject(NgbModal)
  private messageService = inject(MessageHandlingService)

  private _projects$ = new BehaviorSubject<Project[]>([])
  projects$ = from(this._projects$)

  createProjectName = ''
  createProjectDescription = ''
  loader = false

  setProjects() {
    this.loader = true
    this.projectManagementHttpService
      .getProjectsList()
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        catchError((error) => {
          this.messageService.alertError(error)
          return of(null)
        })
      )
      .subscribe((data) => {
        if (data) {
          this._projects$.next(data.projects)
          this.loader = false
        }
      })
  }
  createProject() {
    this.projectManagementHttpService
      .createProject(this.createProjectName, this.createProjectDescription)
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        catchError((error) => {
          this.messageService.alertError(error)
          return of(null)
        }),
        tap((data) => {
          if (data) {
            const currentProjects = this._projects$.getValue()
            const updatedProjects = [...currentProjects, data]
            this._projects$.next(updatedProjects)

            this.messageService.sendInfo('Проект створено')
          }
        })
      )
      .subscribe()
    this.modalService.dismissAll()
  }
  deleteProject(projectId: number) {
    this.projectManagementHttpService
      .deleteProject(projectId)
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        catchError((error) => {
          this.messageService.alertError(error)
          return of(null)
        })
      )
      .subscribe(() => {
        this.filterProjects(projectId)
        this.messageService.sendInfo('Проект видалено')
      })
  }
  updateProject(projectId: number, projectName: string, projectDescription: string) {
    this.projectManagementHttpService
      .updateProject(projectId, projectName, projectDescription)
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        catchError((error) => {
          this.messageService.alertError(error)
          return of(null)
        })
      )
      .subscribe(() => {
        this.updateProjectValues(projectId, projectName, projectDescription)
        this.messageService.sendInfo('Проект оновлено')
      })

    this.modalService.dismissAll()
  }
  private updateProjectValues(projectId: number, projectName: string, projectDescription: string) {
    const currentProjects = this._projects$.getValue()
    const projectIndex = currentProjects.findIndex((project) => project.id === projectId)
    if (projectIndex !== -1) {
      const updatedProject = { ...currentProjects[projectIndex] }
      updatedProject.Name = projectName
      updatedProject.Description = projectDescription
      const updatedProjects = [...currentProjects]
      updatedProjects[projectIndex] = updatedProject
      this._projects$.next(updatedProjects)
    }
  }
  private filterProjects(projectId: number) {
    const currentProjects = this._projects$.getValue()
    const updatedProjects = currentProjects.filter((project) => project.id !== projectId)
    this._projects$.next(updatedProjects)
  }
}
