import { Component, inject, TemplateRef } from '@angular/core'
import { MessageHandlingService } from '../../services/message-handling.service'
import { UtilFunctions } from '../../utils/util.functions'
import { AuthService } from '../../../core/services/auth.service'
import { NgbOffcanvas, NgbTooltip } from '@ng-bootstrap/ng-bootstrap'
import { NgFor, NgIf } from '@angular/common'
import { PpHttpClientService } from '../../services/pp-http-client.service'

@Component({
  selector: 'app-account-info',
  templateUrl: './account-info.component.html',
  standalone: true,
  imports: [NgIf, NgFor, NgbTooltip]
})
export class AccountInfoComponent {
  userFiles: string[] = []
  private http = inject(PpHttpClientService)
  private messageService = inject(MessageHandlingService)
  private authService = inject(AuthService)
  private offcanvasService = inject(NgbOffcanvas)

  get username() {
    return this.authService.loadedUser?.username
  }

  open(content: TemplateRef<any>) {
    this.offcanvasService.open(content, {
      ariaLabelledBy: 'offcanvas-basic-title',
      scroll: true,
      position: 'end'
    })
  }

  downloadFile(filename: string) {
    this.http.requestFile(filename).subscribe({
      next: (fileBinary) => UtilFunctions.downloadXlsx(fileBinary, filename, null),
      error: (err) => this.messageService.sendError(err.error.detail)
    })
  }

  removeFile(filename: string) {
    this.http.deleteFile(filename).subscribe({
      next: (value) => this.messageService.sendInfo(value.description),
      error: (err) => this.messageService.sendError(err.error.detail),
      complete: () => (this.userFiles = this.userFiles.filter((file) => file !== filename))
    })
  }
}
