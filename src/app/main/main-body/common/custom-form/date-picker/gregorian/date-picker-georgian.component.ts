import { ControlContainer, ControlValueAccessor, UntypedFormControl, FormControlDirective, NG_VALUE_ACCESSOR } from '@angular/forms'
import { Component, ElementRef, EventEmitter, forwardRef, HostListener, Input, OnInit, Optional, Output, ViewChild } from '@angular/core'
import { NgbDateStruct, NgbCalendar } from '@ng-bootstrap/ng-bootstrap'

@Component({
  selector: 'app-date-picker-georgian',
  templateUrl: './date-picker-georgian.component.html',
  styleUrls: ['../date-picker.component.scss'],
  styles: [
    `
           :host ::ng-deep .ngb-dp-content {
             direction: ltr !important;
           }
           :host ::ng-deep .btn-light {
             font-family: none !important;
           }
           :host ::ng-deep .custom-select {
             font-family: none !important;
           }
         `,
  ],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DatePickerGeorgianComponent),
      multi: true,
    },
  ],
})
export class DatePickerGeorgianComponent implements OnInit, ControlValueAccessor {
  @Input() class: string
  @Input() disabled: boolean
  @Input() requireClass: boolean
  @Input() position
  @Input() InputValue: any | null
  @Output() InputValueChange = new EventEmitter() //just for double buinding
  @Output() dateChanged = new EventEmitter()

  @ViewChild(FormControlDirective, { static: true })
  formControlDirective: FormControlDirective
  @ViewChild('inp', { static: true, read: ElementRef }) inputElementRef: ElementRef
  @Input() formControl: UntypedFormControl
  @Input() formControlName: string

  date: { year: number; month: number }
  minDate = {
    day: 29,
    month: 12,
    year: 1920,
  }
  maxDate = {
    day: 29,
    month: 12,
    year: 2030,
  }

  valueInputElement
  dateSelect() {
    this.showPopup = false
    this.setZeroMonthDay()
    this.valueInputElement = `${this.datePickerValue.year}/${this.datePickerValue.month}/${this.datePickerValue.day}`
    this.dateChanged.emit(this.valueInputElement)
    this.InputValueChange.emit(this.valueInputElement)
  }

  setZeroMonthDay() {
    let month: any = this.datePickerValue.month.toString()
    let day: any = this.datePickerValue.day.toString()
    if (month.length == 1) {
      month = `0${month}`
      this.datePickerValue.month = month
    }
    if (day.length == 1) {
      day = `0${day}`
      this.datePickerValue.day = day
    }
  }

  onKeyup(event, dp) {
    let value = event.target.value

    if (value.length === 0) {
      this.InputValueChange.emit(null)
      this.dateChanged.emit(null)
      return
    }

    if (value.length !== 10) return

    let valueStr = value.split('/')
    let setDate = {
      day: +valueStr[2],
      month: +valueStr[1],
      year: +valueStr[0],
    }
    dp.navigateTo(setDate)
    this.datePickerValue = setDate
    this.InputValueChange.emit(value)
    this.dateChanged.emit(value)
  }

  monthChanged(event, dp) {}

  showPopup: boolean = false

  @ViewChild('dp', { static: false }) dp
  clickInput() {
    this.showPopup = true
    if (!this.InputValue) this.datePickerValue = this.calendar.getToday()
    else {
      let value = this.InputValue
      value = value.split('/')
      let setDate = {
        day: +value[2],
        month: +value[1],
        year: +value[0],
      }
      this.dp.navigateTo(setDate)
    }
  }

  mouseOver = false
  @HostListener('document:click', ['$event'])
  onClick() {
    if (!this.mouseOver) this.showPopup = false
  }

  constructor(private calendar: NgbCalendar, @Optional() private controlContainer: ControlContainer) {}

  datePickerValue: NgbDateStruct
  ngOnInit(): void {
    this.valueInputElement = this.InputValue
  }

  _onChange(event: any) {}

  writeValue(obj: any): void {}

  get control() {
    if (!this.controlContainer || !this.controlContainer.control) return
    return this.formControl || this.controlContainer.control.get(this.formControlName)
  }

  onStart(event) {
    // debugger
  }

  registerOnChange(fn: any): void {}

  registerOnTouched(fn: any): void {}
  setDisabledState(isDisabled: boolean): void {}
}
