import { Component, Output, EventEmitter, Input, ViewChild, ElementRef } from '@angular/core'
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms'
import { ControlMessageService } from 'src/app/main/main-body/common/custom-form/control-message/control-message.service'
import { GridFormService } from 'src/app/main/main-body/common/grid-form.service'
import { Validation } from 'src/app/main/main-body/common/custom-form/control-message/Validation'
import { ToastrService } from 'ngx-toastr'

const Controller = 'BackpayInsure'

@Component({
  selector: 'backpay-insure-form',
  templateUrl: './backpay-insure-form.component.html',
  styleUrls: ['./backpay-insure-form.component.scss']
})
export class BackPayInsureFormComponent {

  @Output() done = new EventEmitter()
  @Output() closed = new EventEmitter()
  @Input() ID: number
  @Input() PID: number
  @Input() formObj: any
  @Input() personList: any[]
  @Input() selectedPersonelNF: any
  
  @ViewChild("myElem") MyProp: ElementRef;
  
  getNewAttr() {
    return new Promise(resolve => {
      this.service.get(`${Controller}/GetAttributeCreate`).subscribe((res: any) => {
        this.formObj = res.Data.EntityAttribute
        return resolve(true)
      })
    })
  }

  post() {
    this.form.patchValue({ Id: 0 })
    this.form.controls.PersonIDCollect_Fld.patchValue(this.personList.toString())
    let formValue = this.form.getRawValue()
    this.service.post(`${Controller}/Create`, formValue).subscribe(_ => this.done.emit('multi'))
    this.showDetail = false
  }

  form: UntypedFormGroup
  showForm: boolean = false
  setForm() {
    Validation.form = this.formObj
    this.form = this.formBuilder.group({
      Id: [0],
      InsureCode_Fld: [{ value: null, disabled: Validation.disable('InsureCode_Fld') }, Validation.setValidator('InsureCode_Fld')],
      FromYearMonth_Fld: [{ value: null, disabled: Validation.disable('FromYearMonth_Fld') }, Validation.setValidator('FromYearMonth_Fld')],
      UntilYearMonth_Fld: [{ value: null, disabled: Validation.disable('UntilYearMonth_Fld') }, Validation.setValidator('UntilYearMonth_Fld')],
      No_Fld: [{ value: null, disabled: Validation.disable('No_Fld') }, Validation.setValidator('No_Fld')],
      CalcNoOnNow_Fld: [{ value: null, disabled: Validation.disable('CalcNoOnNow_Fld') }, Validation.setValidator('CalcNoOnNow_Fld')],
      CalcMashmoolOnNow_Fld: [{ value: null, disabled: Validation.disable('CalcMashmoolOnNow_Fld') }, Validation.setValidator('CalcMashmoolOnNow_Fld')],
      CalcBaseInfoOnNow_Fld: [{ value: null, disabled: Validation.disable('CalcBaseInfoOnNow_Fld') }, Validation.setValidator('CalcBaseInfoOnNow_Fld')],
      CalcM_Fld: [{ value: null, disabled: Validation.disable('CalcM_Fld') }, Validation.setValidator('CalcM_Fld')],
      PersonIDCollect_Fld: [null],
      IDCollect_Fld: [null],
      FormType:[null]
    })
  }

  save() {
    this.form.controls.PersonIDCollect_Fld.patchValue(this.personList)
    if (this.form.invalid) return this.controlService.isSubmitted = true

    if (!this.checkFromUntilDateValidation()) return this.toastr.error('تاریخ پایان نمیتواند کوچکتر از تاریخ شروع باشد', 'خطا')

    return this.post()

  }

  checkFromUntilDateValidation(): boolean {
    if (this.personList.length != 0) {
      let fromDate = this.form.getRawValue().FromYearMonth_Fld
      let untilDate = this.form.getRawValue().UntilYearMonth_Fld

      if (fromDate > untilDate) return false
      else return true
    }
    return true
  }

  close() { 
    this.showDetail = false
    this.showForm = false
    this.closed.emit() 
  }

  yearmonthList = []

  getYear() { this.yearmonthList.length == 0 ? this.service.getCombo('YearMonth').subscribe((res: any) => this.yearmonthList = res.Data) : null }

  orginalFormObj: any
  showDetail: boolean = false
  semiBackpaySelectedId: any
  async buildForm() {
    this.showDetail = false
    this.orginalFormObj = this.formObj
    if (this.personList.length > 0) {
      await this.getNewAttr() 
      this.setForm()
      this.showForm = true
    }
    else
      this.showDetail = true
    setTimeout(() => {
      this.MyProp.nativeElement.scrollIntoView({ behavior: "smooth", block: "start" });    
    }, 250);     
  }

  constructor(private controlService: ControlMessageService, private service: GridFormService, private formBuilder: UntypedFormBuilder, private toastr: ToastrService) { }

  ngOnChanges(UpdatedValue: string): void { this.buildForm() }

}
