import { Component, OnDestroy, OnInit } from '@angular/core'
import { environment } from '../../../../environments/environment'
import { webSocket, WebSocketSubject } from 'rxjs/webSocket'
import { AuthService } from '../../../core/services/auth.service'
import { HttpClient } from '@angular/common/http'

@Component({
  selector: 'app-page-404',
  templateUrl: './page404.component.html',
  standalone: true
})
export class Page404Component implements OnInit, OnDestroy {
  websocketLink = environment.SOCKET_ENDPOINT
  url = 'http://localhost:8050/api/v0/'
  messages: string[] = []

  connection?: WebSocketSubject<{ message: string }>

  constructor(
    private auth: AuthService,
    private http: HttpClient
  ) {}

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.connection?.unsubscribe()
  }

  startProcess() {
    if (!this.auth.isAuthorized || !this.auth.loadedUser) return

    this.http.get(this.url + 'run_back_test/' + this.auth.loadedUser.username).subscribe({
      next: (value) => console.log(value),
      error: (err) => console.log(err)
    })
  }

  connectToSocket() {
    if (!this.auth.isAuthorized || !this.auth.loadedUser) return

    this.connection = webSocket(this.websocketLink + '/' + this.auth.loadedUser.username)
    this.connection.subscribe({
      next: (value) => {
        this.messages.push(value.message)
        console.log(value)
      },
      error: (err) => console.log(err),
      complete: () => console.log('connection ended')
    })
  }

  sendMessage() {
    this.connection?.next({ message: 'kekw' })
  }

  disconnectFromSocket() {
    this.connection?.unsubscribe()
  }

  sendFiles(files: FileList | null) {
    if (!files) return
    const formData = new FormData()

    for (let i = 0; i < files.length; i++) {
      formData.append('files', files[i])
    }
    formData.append('session_id', 'sss')
    this.http
      .post('http://10.11.32.60:8000/api/v0/ASVPBot/upload_files', formData)
      .subscribe((resp) => console.log(resp))
  }
}
