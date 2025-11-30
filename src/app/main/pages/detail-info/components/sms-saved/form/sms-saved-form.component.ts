import { Component, Output, EventEmitter, Input } from '@angular/core'
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms'
import { ControlMessageService } from 'src/app/main/main-body/common/custom-form/control-message/control-message.service'
import { GridFormService } from 'src/app/main/main-body/common/grid-form.service'
import { Validation } from 'src/app/main/main-body/common/custom-form/control-message/Validation'

const Controller = 'SmsSaved'

@Component({
  selector: 'sms-saved-form',
  templateUrl: './sms-saved-form.component.html',
  styleUrls: ['./sms-saved-form.component.scss']
})
export class SmsSavedFormComponent {

  @Output() done = new EventEmitter()
  @Output() closed = new EventEmitter()
  @Input() ID: number
  @Input() formType: string
  @Input() formObj: any

  data: any = {}
  get() {
    this.service.getById(Controller, this.ID, this.formType).toPromise().then((res: any) => {
      if (!res || !res.Data) return this.done.emit(false)
      else {
        this.data = res.Data
        this.setForm()
      }
    })
  }

  post() { this.service.post(`${Controller}/Create`, this.form.getRawValue()).subscribe((res: any) => { res && res.IsSuccess ? this.done.emit(res.Data) : null })}

  put() { this.service.post(`${Controller}/Update`, this.form.getRawValue()).subscribe((res: any) => { res && res.IsSuccess ? this.done.emit(res.Data) : null })}

  form: UntypedFormGroup
  showForm: boolean = false
  setForm() {
    Validation.form = this.formObj
    this.form = this.formBuilder.group({
      Id: [0],
      CodeDesc_Fld: [{ value: null, disabled: Validation.disable('CodeDesc_Fld') }, Validation.setValidator('CodeDesc_Fld')],
      SmsText1_Fld: [{ value: null, disabled: Validation.disable('SmsText1_Fld') }, Validation.setValidator('SmsText1_Fld')],
      Type1Desc_Fld: [null],
      Type1_Fld: [{ value: null, disabled: Validation.disable('Type1_Fld') }, Validation.setValidator('Type1_Fld')],
      SmsText2_Fld: [{ value: null, disabled: Validation.disable('SmsText2_Fld') }, Validation.setValidator('SmsText2_Fld')],
      Type2Desc_Fld: [null],
      Type2_Fld: [{ value: null, disabled: Validation.disable('Type2_Fld') }, Validation.setValidator('Type2_Fld  ')],
      SmsText3_Fld: [{ value: null, disabled: Validation.disable('SmsText3_Fld') }, Validation.setValidator('SmsText3_Fld')],
      Type3Desc_Fld: [null],
      Type3_Fld: [{ value: null, disabled: Validation.disable('Type3_Fld') }, Validation.setValidator('Type3_Fld')],
      SmsText4_Fld: [{ value: null, disabled: Validation.disable('SmsText4_Fld') }, Validation.setValidator('SmsText4_Fld')],
      Type4Desc_Fld: [null],
      Type4_Fld: [{ value: null, disabled: Validation.disable('Type4_Fld') }, Validation.setValidator('Type4_Fld')],
      FormType:[{value: this.formType}]
    })
    this.formType != 'Add' ? this.form.patchValue(this.data) : null
    this.showForm = true
    setTimeout(() => {
      this.service.scrollToElement("form")
    }, 200); 
  }

  save() {
    if (this.form.invalid) return this.controlService.isSubmitted = true

    if (this.formType == 'Add') return this.post()

    if (this.formType == 'Edit') this.put()
  }

  close() { this.closed.emit() }

  constructor(private controlService: ControlMessageService, private service: GridFormService, private formBuilder: UntypedFormBuilder) { }

  ngOnChanges(UpdatedValue: string): void { this.formType != 'Add' ? this.get() : this.setForm() }

}
