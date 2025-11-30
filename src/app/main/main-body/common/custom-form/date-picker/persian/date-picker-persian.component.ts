import { Component, ElementRef, EventEmitter, forwardRef, HostListener, Input, OnInit, Output, ViewChild } from '@angular/core'
import { NgbDateStruct, NgbCalendar, NgbDatepickerI18n, NgbCalendarPersian } from '@ng-bootstrap/ng-bootstrap'
import { PersianDatePickerService } from '../persian-date-picker.service'
import { UntypedFormBuilder, UntypedFormGroup, Validators} from '@angular/forms';
import * as moment from 'moment-jalaali';

@Component({
  selector: 'date-picker',
  templateUrl: './date-picker-persian.component.html',
  styleUrls: ['../date-picker.component.scss'],
  providers: [
    { provide: NgbCalendar, useClass: NgbCalendarPersian },
    { provide: NgbDatepickerI18n, useClass: PersianDatePickerService },
  ],
})
export class DatePickerPersianComponent implements OnInit {
  @Input() placeholder
  @Input() label
  @Input() class: string
  @Input() disabled: boolean
  @Input() required: boolean
  @Input() position: string = "top"
  @Input() InputValue: any | null
  @Input() control
  @Input() parentFormGroup
  @Input() formtype: string
  @Input() labelColor
  @Output() InputValueChange = new EventEmitter() //just for double buinding
  @Output() dateChanged = new EventEmitter()

  @ViewChild('inp', { static: true, read: ElementRef }) inputElementRef: ElementRef
  @ViewChild('dp', { static: false }) dp


  showDate: boolean = false
  model: NgbDateStruct;
  showPopup: boolean = false
  valueInputElement
  dateValue:string ;
  convertedDate: string;
  frmUser!: UntypedFormGroup;

  constructor(private _fb: UntypedFormBuilder) { }

  datePickerValue: NgbDateStruct
  ngOnInit(): void {
    this.valueInputElement = this.InputValue
    this.showDate = true
    this.formInit()
  }
  formInit(){
    var gregorianDate :any;
    if(this.control.value)
       gregorianDate = moment(this.control.value, 'jYYYY/jM/jD').format('YYYY-MM-DD');

    this.frmUser = this._fb.group({
      Date: [{value: gregorianDate, disabled: this.disabled},Validators.required],
    });

  }

  clearText(val:any) {
    this.changeValue(val)
    this.frmUser.get('Date').setValue(null);
  }

  changeValue(val: any) {
    this.control.patchValue(val)
    this.InputValueChange.emit(val)
    this.dateChanged.emit(val)
  }
  onKeyup(event) {
    const gregorianDate = this.frmUser.get('Date')?.value;
    const jalaliDate = moment(gregorianDate).format('jYYYY/jM/jD');
    let value =jalaliDate
    if (value.length === 0 || value == 'Invalid date') {
      this.clearText('')
      return
    }
    let valueStr = value.split('/')
    let setDate = {
      day: Number(valueStr[2]),
      month: Number(valueStr[1]),
      year: Number(valueStr[0]),
    }
    if (+setDate.month > 12) setDate.month = 12
    if (+setDate.day > 31) setDate.day = 29

    this.valueInputElement = `${setDate.year}/${setDate.month.toString().padStart(2,'0')}/${setDate.day.toString().padStart(2,'0')}`
    this.datePickerValue = this.valueInputElement;
    this.showPopup = false
    this.changeValue(this.valueInputElement)
  }

formatDate(event: any) {
   var gregorianDate='';
   let value = event.target.value;
   if(value){
    gregorianDate= moment(value, 'jYYYY/jM/jD').format('YYYY-MM-DD');
    this.frmUser.get('Date').setValue(gregorianDate);
   }
  if (value == '')
    return
  if ((event.inputType === 'deleteContentBackward' || event.inputType === 'deleteContentForward')) {
      value = value.replace(/[^0-9/]/g, '');
      const parts = value.split('/');
      if (parts.length > 1) {
          value = parts.join('/');
      }
  } else {
      value = value.replace(/[^0-9/]/g, '');
      if (value.length > 10) {
          value = value.slice(0, 10);
      }
      const yearMatch = value.match(/^(\d{0,4})/);
      const monthMatch = value.match(/^\d{4}\/?(\d{0,2})/);
      const dayMatch = value.match(/^\d{4}\/\d{2}\/?(\d{0,2})/);
      let formattedValue = '';
      if (yearMatch) {
          formattedValue += yearMatch[1];
      }
      if (yearMatch && yearMatch[1].length === 4) {
          formattedValue += '/';
      }
      if (monthMatch) {
          formattedValue += monthMatch[1];
      }
      if (monthMatch && monthMatch[1].length === 2) {
          formattedValue += '/';
      }
      if (dayMatch) {
          formattedValue += dayMatch[1];
      }
      if (value.length < 3) {
          formattedValue = formattedValue.replace('/', '');
      }
      const parts = formattedValue.split('/');
      formattedValue = parts.join('/');
      value = formattedValue;
  }

  event.target.value = value;
}
}
