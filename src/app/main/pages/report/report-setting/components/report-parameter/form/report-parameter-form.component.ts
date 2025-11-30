import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms'

import { ControlMessageService } from 'src/app/main/main-body/common/custom-form/control-message/control-message.service'
import { Validation } from 'src/app/main/main-body/common/custom-form/control-message/Validation'
import { ModalOptions } from 'src/app/main/main-body/common/custom-modal/modal-options.interface'
import { GridFormService } from 'src/app/main/main-body/common/grid-form.service'
import { Month_Fld, Year_Fld } from 'src/app/main/pages/global-attr'

const Controller = 'ReportParameter'

@Component({
  selector: 'report-parameter-form',
  templateUrl: './report-parameter-form.component.html',
  styleUrls: ['./report-parameter-form.component.scss']
})
export class ReportParameterFormComponent {

  @Output() done = new EventEmitter()
  @Output() closed = new EventEmitter()
  @Input() ID: number
  @Input() reportParameterId: number
  @Input() typeId: number
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
  setForm() {
    Validation.form = this.formObj
    this.form = this.formBuilder.group({
      Id: [0],
      Year_Fld: [Year_Fld],
      Month_Fld: [Month_Fld],
      Type_Fld: [this.typeId],
      Code_Fld: [{ value: null, disabled: Validation.disable('Code_Fld') }, Validation.setValidator('Code_Fld')],
      CodeDesc_Fld: [{ value: null, disabled: Validation.disable('CodeDesc_Fld') }, Validation.setValidator('CodeDesc_Fld')],
      Order_Fld: [{ value: null, disabled: Validation.disable('Order_Fld') }, Validation.setValidator('Order_Fld')],
      FormType:[{value: this.formType}]
    })
    if (this.formType != 'Add') {
      this.form.patchValue(this.data)
    }
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

  modalOptions: ModalOptions

  constructor(private controlService: ControlMessageService, private service: GridFormService, private formBuilder: UntypedFormBuilder) { }

  ngOnInit(): void {
    this.formType != 'Add' ? this.get() : this.setForm()
    this.modalOptions = {
      formType: this.formType,
      modatTitle: 'عنوان',
      saveCallback: this.save.bind(this),
      hideCallback: this.close.bind(this),
      maxWidth: 650
    }
  }

}
