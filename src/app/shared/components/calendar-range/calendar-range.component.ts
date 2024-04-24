import { Component, EventEmitter, Input, Output } from '@angular/core'
import { CommonModule, JsonPipe } from '@angular/common'
import { NgbDate, NgbCalendar, NgbDateParserFormatter, NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap'
import { FormsModule } from '@angular/forms'

@Component({
  selector: 'app-calendar-range',
  standalone: true,
  imports: [CommonModule, NgbDatepickerModule, FormsModule, JsonPipe],
  templateUrl: './calendar-range.component.html',
  styleUrls: ['./calendar-range.component.css']
})
export class CalendarRangeComponent {
  hoveredDate: NgbDate | null = null

  fromDate: NgbDate | null
  toDate: NgbDate | null

  @Output() date = new EventEmitter<{ fromDate: NgbDate | null; toDate: NgbDate | null }>()

  constructor(
    private calendar: NgbCalendar,
    public formatter: NgbDateParserFormatter
  ) {
    // this.fromDate = calendar.getToday()
    // this.toDate = calendar.getNext(calendar.getToday(), 'd', 10)
  }
  onDateSelection(date: NgbDate) {
    if (!this.fromDate && !this.toDate) {
      this.fromDate = date
    } else if (this.fromDate && !this.toDate && date && date.after(this.fromDate)) {
      this.toDate = date
    } else {
      this.toDate = null
      this.fromDate = date
    }
    if (this.fromDate && this.toDate) {
      this.date.emit({ fromDate: this.fromDate, toDate: this.toDate })
    }
  }

  isHovered(date: NgbDate) {
    return (
      this.fromDate && !this.toDate && this.hoveredDate && date.after(this.fromDate) && date.before(this.hoveredDate)
    )
  }

  isInside(date: NgbDate) {
    return this.toDate && date.after(this.fromDate) && date.before(this.toDate)
  }

  isRange(date: NgbDate) {
    return (
      date.equals(this.fromDate) ||
      (this.toDate && date.equals(this.toDate)) ||
      this.isInside(date) ||
      this.isHovered(date)
    )
  }

  validateInput(currentValue: NgbDate | null, input: string): NgbDate | null {
    const parsed = this.formatter.parse(input)
    return parsed && this.calendar.isValid(NgbDate.from(parsed)) ? NgbDate.from(parsed) : currentValue
  }
}
