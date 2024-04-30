import { HttpClient } from '@angular/common/http'

import { Injectable, inject } from '@angular/core'
import { environment } from 'src/environments/environment'
import { Observable } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class RoleManagementHttpService {
  private http = inject(HttpClient)

  roleUrl = (environment.BACKEND_URL || window.location.origin) + environment.API_BASE_URL + '/role'

  // ROLE
  getRolesList() {
    return this.http.get(this.roleUrl)
  }
}
