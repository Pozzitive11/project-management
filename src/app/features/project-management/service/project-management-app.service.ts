import { DestroyRef, Injectable, inject } from '@angular/core'
import { App, NewApp, UpdateApp } from '../models/project.model'
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
  deleteApp(appId: number) {
    this.projectManagementHttpService
      .deleteApp(appId)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => {
        this.filterApps(appId)
      })
  }
  updateApp(appId: number) {
    const app: UpdateApp = {
      Name: this.createAppName,
      Route: this.createAppRoute,
      ShortDescription: this.createAppShortDescription,
      Description: this.createAppDescription
    }
    this.projectManagementHttpService
      .updateApp(appId, app)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => {
        this.updateAppValues(appId, app)
      })
  }
  private updateAppValues(appId: number, updatedApp: UpdateApp) {
    const currentApps = this._apps$.getValue()
    const appIndex = currentApps.findIndex((app) => app.id === appId)

    if (appIndex !== -1) {
      const updatedApps = [...currentApps]
      updatedApps[appIndex] = { ...updatedApps[appIndex], ...updatedApp }
      this._apps$.next(updatedApps)
    }
  }

  private filterApps(appId: number) {
    const currentApps = this._apps$.getValue()
    const updatedApps = currentApps.filter((app) => app.id !== appId)
    this._apps$.next(updatedApps)
  }
}
