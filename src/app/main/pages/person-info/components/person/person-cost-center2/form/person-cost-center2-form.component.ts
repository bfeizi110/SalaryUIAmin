import { Component, EventEmitter, Input, Output } from '@angular/core'
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms'

import { ControlMessageService } from 'src/app/main/main-body/common/custom-form/control-message/control-message.service'
import { Validation } from 'src/app/main/main-body/common/custom-form/control-message/Validation'
import { ModalOptions } from 'src/app/main/main-body/common/custom-modal/modal-options.interface'
import { GridFormService } from 'src/app/main/main-body/common/grid-form.service'

const Controller = 'CostCenter2PrsInfo'

@Component({
  selector: 'person-cost-center2-form',
  templateUrl: './person-cost-center2-form.component.html',
  styleUrls: ['./person-cost-center2-form.component.scss']
})
export class PersonCostCenter2FormComponent {

  @Output() done = new EventEmitter()
  @Output() closed = new EventEmitter()
  @Input() ID: number
  @Input() personId: number
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
      PersonID_Fld: [this.personId],
      CostCenterIDDesc: [null],
      CostCenterID: [{ value: null, disabled: Validation.disable('CostCenterID') }, Validation.setValidator('CostCenterID')],
      CostCenter_StartDate: [{ value: null, disabled: Validation.disable('CostCenter_StartDate') }, Validation.setValidator('CostCenter_StartDate')],
      CostCenter_EndDate: [{ value: null, disabled: Validation.disable('CostCenter_EndDate') }, Validation.setValidator('CostCenter_EndDate')],
      FormType:[{value: this.formType}]
    })
    this.formType != 'Add' ? this.form.patchValue(this.data) : null
    this.showModal = true
  }

  showCostCenterModal: boolean = false
  onShowCostCenterModal() { this.showCostCenterModal = true}

  nodeSelected(node) {
    this.form.controls.CostCenterID.patchValue(node.Id)
    this.form.controls.CostCenterIDDesc.patchValue(node.name)
    this.showCostCenterModal = false
  }

  closedCostCenterModal() { this.showCostCenterModal = false }

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

  ngOnChanges(UpdatedValue: string): void {
    this.formType != 'Add' ? this.get() : this.setForm()
    this.modalOptions = {
      formType: this.formType,
      modatTitle: 'انتساب مرکز هزینه دوم به پرسنل',
      saveCallback: this.save.bind(this),
      hideCallback: this.close.bind(this),
    }
  }

}
