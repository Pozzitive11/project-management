import { Component, Input, TemplateRef, inject } from '@angular/core'
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap'

@Component({
  selector: 'app-project-management-modal',
  standalone: true,
  imports: [],
  templateUrl: './project-management-modal.component.html',
  styleUrl: './project-management-modal.component.css'
})
export class ProjectManagementModalComponent {
  @Input() buttonName: string
  @Input() modalName: string
  private modalService = inject(NgbModal)
  closeResult = ''

  open(content: TemplateRef<any>) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then(
      (result) => {
        this.closeResult = `Closed with: ${result}`
      },
      (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`
      }
    )
  }

  private getDismissReason(reason: any): string {
    switch (reason) {
      case ModalDismissReasons.ESC:
        return 'by pressing ESC'
      case ModalDismissReasons.BACKDROP_CLICK:
        return 'by clicking on a backdrop'
      default:
        return `with: ${reason}`
    }
  }
}
