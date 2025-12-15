import { Validation } from './../../../../../main-body/common/custom-form/control-message/Validation'

import { Component, Output, EventEmitter, Input } from '@angular/core'
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms'
import { ControlMessageService } from 'src/app/main/main-body/common/custom-form/control-message/control-message.service'
import { GridFormService } from 'src/app/main/main-body/common/grid-form.service'

const Controller = 'Faq'

@Component({
  selector: 'faq-form',
  templateUrl: './faq-form.component.html',
  styleUrls: ['./faq-form.component.scss']
})
export class FaqFormComponent {

  @Output() done = new EventEmitter()
  @Output() closed = new EventEmitter()
  @Input() ID: number
  @Input() formType: string
  @Input() formObj: any
  @Input() ShowControllerName: string
  
  formList = []
  getForm() { this.formList.length == 0 ? this.service.get(`${Controller}/GetComboForms`).subscribe((res: any) => this.formList = res.Data) : null }

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
      Code_Fld: [{ value: null, disabled: Validation.disable('Code_Fld') }, Validation.setValidator('Code_Fld')],
      CodeDesc_Fld: [{ value: null, disabled: Validation.disable('CodeDesc_Fld') }, Validation.setValidator('CodeDesc_Fld')],
      Forms_Fld: [{ value: null, disabled: Validation.disable('Forms_Fld') }, Validation.setValidator('Forms_Fld')],
      FormsDesc_Fld: [{ value: null, disabled: Validation.disable('FormsDesc_Fld') }, Validation.setValidator('FormsDesc_Fld')],
      Desc_Fld: [{ value: null, disabled: Validation.disable('Desc_Fld') }, Validation.setValidator('Desc_Fld')],
      FormType:[{value: this.formType}]
    })
    if (this.formType != 'Add')
    {
      this.form.patchValue(this.data)
      this.getFormCode()
    }  
    this.getForm()
    this.showForm = true
    setTimeout(() => {
      this.service.scrollToElement('form')
    }, 200); 
  }

  getFormCode(){
    if (this.form.controls.Forms_Fld.value) this.form.controls.Forms_Fld.patchValue(this.form.controls.Forms_Fld.value.split(',').map(i => (i))) 
  }
  fixFormCode(form) { if (form.Forms_Fld) form.Forms_Fld = form.Forms_Fld.toString() }

  save() {
    let fakeFormValue = { ...this.form.getRawValue() }
    this.fixFormCode(fakeFormValue)

    if (this.form.invalid) return this.controlService.isSubmitted = true

    if (this.formType == 'Add') return this.post(fakeFormValue)

    if (this.formType == 'Edit') this.put(fakeFormValue)
  }

  close() {
    this.closed.emit()
  }

  constructor(private controlService: ControlMessageService, private service: GridFormService, private formBuilder: UntypedFormBuilder) { }

  ngOnChanges(UpdatedValue: string): void { this.formType != 'Add' ? this.get() : this.setForm() }

}
