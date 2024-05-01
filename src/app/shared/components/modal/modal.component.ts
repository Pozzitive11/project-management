import { CommonModule } from '@angular/common'
import { Component, EventEmitter, Input, Output, TemplateRef, inject } from '@angular/core'
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap'

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.css'
})
export class ModalComponent {
  @Input() buttonName: string
  @Input() modalName: string
  @Input() buttonClasses: string
  private modalService = inject(NgbModal)
  closeResult = ''
  @Output() modalClosed = new EventEmitter<void>()
  open(content: TemplateRef<any>) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then(
      (result) => {
        this.closeResult = `Closed with: ${result}`
        this.closeModal()
      },
      (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`
        this.closeModal()
      }
    )
  }
  private closeModal() {
    this.modalClosed.emit()
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
