import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms'

import { ControlMessageService } from 'src/app/main/main-body/common/custom-form/control-message/control-message.service'
import { Validation } from 'src/app/main/main-body/common/custom-form/control-message/Validation'
import { ModalOptions } from 'src/app/main/main-body/common/custom-modal/modal-options.interface'
import { GridFormService } from 'src/app/main/main-body/common/grid-form.service'

const Controller = 'DebtFormula'

@Component({
  selector: 'debt-formula-form',
  templateUrl: './debt-formula-form.component.html',
  styleUrls: ['./debt-formula-form.component.scss']
})

export class DebtFormulaFormComponent implements OnInit {

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
    this.showModal = false
    Validation.form = this.formObj
    this.form = this.formBuilder.group({
      Id: [0],
      CalcTypeDesc_Fld: [{ value: null, disabled: Validation.disable('CalcTypeDesc_Fld') }, Validation.setValidator('CalcTypeDesc_Fld')],
      CalcTypeFormula_Fld: [{ value: null, disabled: Validation.disable('CalcTypeFormula_Fld') }, Validation.setValidator('CalcTypeFormula_Fld')],
      CalcTypeRefahFormula_Fld: [{ value: null, disabled: Validation.disable('CalcTypeRefahFormula_Fld') }, Validation.setValidator('CalcTypeRefahFormula_Fld')],
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

  modalOptions: ModalOptions

  constructor(private controlService: ControlMessageService, private service: GridFormService, private formBuilder: UntypedFormBuilder) { }


  ngOnInit(): void {
    this.formType != 'Add' ? this.get() : this.setForm()
    this.modalOptions = {
      formType: this.formType,
      modatTitle: 'انواع محاسبه بهره',
      saveCallback: this.save.bind(this),
      hideCallback: this.close.bind(this),
    }
  }

}
