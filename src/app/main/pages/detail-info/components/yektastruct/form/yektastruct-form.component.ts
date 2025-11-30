import { Component, EventEmitter, Input, Output } from '@angular/core'
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms'

import { ControlMessageService } from 'src/app/main/main-body/common/custom-form/control-message/control-message.service'
import { Validation } from 'src/app/main/main-body/common/custom-form/control-message/Validation'
import { GridFormService } from 'src/app/main/main-body/common/grid-form.service'

const Controller = 'YektaStruct'

@Component({
  selector: 'yektastruct-form',
  templateUrl: './yektastruct-form.component.html',
  styleUrls: ['./yektastruct-form.component.scss']
})

export class YektaStructFormComponent {

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

  post(fakeFormValue) { this.service.post(`${Controller}/Create`, fakeFormValue).subscribe((res: any) => this.done.emit(res.Data)) }

  put(fakeFormValue) { this.service.post(`${Controller}/Update`, fakeFormValue).subscribe((res: any) => this.done.emit(res.Data)) }

  form: UntypedFormGroup
  showForm: boolean = false
  setForm() {
    Validation.form = this.formObj
    this.form = this.formBuilder.group({
      Id: [0],
      CodeDesc_Fld: [{ value: null, disabled: Validation.disable('CodeDesc_Fld') }, Validation.setValidator('CodeDesc_Fld')],
      PayTypeDesc_Fld: [null],
      PayType_Fld: [{ value: null, disabled: Validation.disable('PayType_Fld') }, Validation.setValidator('PayType_Fld')],
      PayHokmTypeDesc_Fld: [null],
      PayHokmType_Fld: [{ value: null, disabled: Validation.disable('PayHokmType_Fld') }, Validation.setValidator('PayHokmType_Fld')],
      PayNowOldTypeDesc_Fld: [null],
      PayNowOldType_Fld: [{ value: null, disabled: Validation.disable('PayNowOldType_Fld') }, Validation.setValidator('PayNowOldType_Fld')],
      TaminLocationTypeDesc_Fld: [null],
      TaminLocationType_Fld: [{ value: null, disabled: Validation.disable('TaminLocationType_Fld') }, Validation.setValidator('TaminLocationType_Fld')],

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

    let fakeFormValue = { ...this.form.getRawValue() }

    if (this.formType == 'Add') return this.post(fakeFormValue)

    if (this.formType == 'Edit') this.put(fakeFormValue)
  }

  close() {
    this.closed.emit()
  }

  async buildForm() {
    this.formType != 'Add' ? this.get() : this.setForm()
  }

  constructor(private controlService: ControlMessageService, private service: GridFormService, private formBuilder: UntypedFormBuilder) { }

  ngOnChanges(UpdatedValue: string): void { this.buildForm() }

}
