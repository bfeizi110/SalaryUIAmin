import { Component, EventEmitter, Input, Output } from '@angular/core'
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms'

import { ControlMessageService } from 'src/app/main/main-body/common/custom-form/control-message/control-message.service'
import { Validation } from 'src/app/main/main-body/common/custom-form/control-message/Validation'
import { ModalOptions } from 'src/app/main/main-body/common/custom-modal/modal-options.interface'
import { GridFormService } from 'src/app/main/main-body/common/grid-form.service'

const Controller = 'TadrisFractionType'

@Component({
  selector: 'tadris-fraction-type-form',
  templateUrl: './tadris-fraction-type-form.component.html',
  styleUrls: ['./tadris-fraction-type-form.component.scss']
})
export class TadrisFractionTypeFormComponent {

  @Output() done = new EventEmitter()
  @Output() closed = new EventEmitter()
  @Input() ID: number
  @Input() formType: string
  @Input() formObj: any
  @Input() BankId: number

  data: any = {}
  getById() {
    let promise = new Promise((resolve, reject) => {
      this.service.get(`${Controller}/${this.ID}/${this.formType == 'Edit'}`).toPromise().then((res: any) => {
        if (res && res.Data) {
          this.data = res.Data
          resolve(true)
        }
        else {
          this.done.emit(false)
          reject()
        }
      }).catch(e => e)
    })
    return promise
  }

  post() { this.service.post(`${Controller}/Create`, this.form.getRawValue()).subscribe((res: any) => { res && res.IsSuccess ? this.done.emit(res.Data) : null }) }

  put() { this.service.post(`${Controller}/Update`, this.form.getRawValue()).subscribe((res: any) => { res && res.IsSuccess ? this.done.emit(res.Data) : null }) }

  form: UntypedFormGroup
  setForm() {
    Validation.form = this.formObj
    this.form = this.formBuilder.group({
      Id: [0],
      CodeDesc_Fld: [{ value: null, disabled: Validation.disable('CodeDesc_Fld') }, Validation.setValidator('CodeDesc_Fld')],
      Desc_Fld: [{ value: null, disabled: Validation.disable('Desc_Fld') }, Validation.setValidator('Desc_Fld')],
      FormType:[{value: this.formType}]
    })
    this.formType != 'Add' ? this.form.patchValue(this.data) : null
    this.showModal = true
  }

  save() {
    if (this.form.invalid) return this.controlService.isSubmitted = true

    if (this.formType == 'Add') return this.post()

    if (this.formType == 'Edit') this.put()
  }

  showModal: boolean = false
  close() {
    this.showModal = false
    this.closed.emit()
  }

  async buildForm() {
    this.formType != 'Add' ? await this.getById() : null
    this.setForm()
  }

  modalOptions: ModalOptions

  constructor(private controlService: ControlMessageService, private service: GridFormService, private formBuilder: UntypedFormBuilder) { }

  ngOnChanges(UpdatedValue: string): void {
    this.buildForm()
    this.modalOptions = {
      formType: this.formType,
      modatTitle: 'کسورات حق التدریس',
      saveCallback: this.save.bind(this),
      hideCallback: this.close.bind(this),
    }
  }

}
