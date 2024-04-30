import { HttpClient } from '@angular/common/http'

import { Injectable, inject } from '@angular/core'
import { environment } from 'src/environments/environment'
import { Observable } from 'rxjs'
import { User } from '../models/user.model'

@Injectable({
  providedIn: 'root'
})
export class UserManagementHttpService {
  private http = inject(HttpClient)

  userUrl = (environment.BACKEND_URL || window.location.origin) + environment.API_BASE_URL + '/user'

  // USER
  getUsersList() {
    return this.http.get<{ users: User[] }>(this.userUrl)
  }
}
