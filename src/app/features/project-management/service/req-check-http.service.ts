import { HttpClient, HttpParams } from '@angular/common/http'

import { Injectable, inject } from '@angular/core'
import { environment } from 'src/environments/environment'

@Injectable({
  providedIn: 'root'
})
export class ReqCheckHttpService {
  private http = inject(HttpClient)

  cashtanUbkiUrl = (environment.BACKEND_URL || window.location.origin) + environment.API_BASE_URL + '/ubki_info'
}
