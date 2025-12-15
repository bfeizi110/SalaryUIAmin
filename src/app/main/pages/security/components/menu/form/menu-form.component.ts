import { Validation } from './../../../../../main-body/common/custom-form/control-message/Validation'

import { Component, Output, EventEmitter, Input } from '@angular/core'
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms'
import { ControlMessageService } from 'src/app/main/main-body/common/custom-form/control-message/control-message.service'
import { GridFormService } from 'src/app/main/main-body/common/grid-form.service'

const Controller = 'Menu'

@Component({
  selector: 'menu-form',
  templateUrl: './menu-form.component.html',
  styleUrls: ['./menu-form.component.scss']
})
export class MenuFormComponent {

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
      ParentIdDesc: [null],
      ParentId: [{ value: null, disabled: Validation.disable('ParentId') }, Validation.setValidator('ParentId')],
      // Level: [{ value: null, disabled: Validation.disable('Level') }, Validation.setValidator('Level')],
      Order: [{ value: null, disabled: Validation.disable('Order') }, Validation.setValidator('Order')],
      CodeDesc_Fld: [{ value: null, disabled: Validation.disable('CodeDesc_Fld') }, Validation.setValidator('CodeDesc_Fld')],
      Path: [{ value: null, disabled: Validation.disable('Path') }, Validation.setValidator('Path')],
      Icon: [{ value: null, disabled: Validation.disable('Icon') }, Validation.setValidator('Icon')],
      Controller: [{ value: null, disabled: Validation.disable('Controller') }, Validation.setValidator('Controller')],
      UseManualForm_Fld: [{ value: null, disabled: Validation.disable('UseManualForm_Fld') }, Validation.setValidator('UseManualForm_Fld')],
      FormID_Fld: [{ value: null, disabled: Validation.disable('FormID_Fld') }, Validation.setValidator('FormID_Fld')],   
      FormIDDesc_Fld:[null],
      // Action: [{ value: null, disabled: Validation.disable('Action') }, Validation.setValidator('Action')],
      FormType:[{value: this.formType}]
    })
    this.formType != 'Add' ? this.form.patchValue(this.data) : null
    this.showForm = true
    setTimeout(() => {
      this.service.scrollToElement('form')
    }, 200); 
  }

  save() {
    if (this.form.invalid) return this.controlService.isSubmitted = true

    if (this.formType == 'Add') return this.post()

    if (this.formType == 'Edit') this.put()
  }

  close() {
    this.closed.emit()
  }

  constructor(private controlService: ControlMessageService, private service: GridFormService, private formBuilder: UntypedFormBuilder) { }

  ngOnChanges(UpdatedValue: string): void { this.formType != 'Add' ? this.get() : this.setForm() }

}
