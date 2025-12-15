import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms'
import { Console } from 'console'

import { ControlMessageService } from 'src/app/main/main-body/common/custom-form/control-message/control-message.service'
import { Validation } from 'src/app/main/main-body/common/custom-form/control-message/Validation'
import { ModalOptions } from 'src/app/main/main-body/common/custom-modal/modal-options.interface'
import { GridFormService } from 'src/app/main/main-body/common/grid-form.service'

const Controller = 'CostCenter2Unit'

@Component({
  selector: 'cost-center-unit-form',
  templateUrl: './cost-center-unit-form.component.html',
  styleUrls: ['./cost-center-unit-form.component.scss']
})
export class CostCenterUnitFormComponent implements OnInit {

  @Output() done = new EventEmitter()
  @Output() closed = new EventEmitter()
  @Input() ID: number
  @Input() formType: string
  @Input() formObj: any
  @Input() nodeId: any

  data: any = {}
  get() {
    this.service.getById(Controller, this.ID, this.formType).subscribe((res: any) => {
      if (!res || !res.Data) return this.done.emit(false)
      else this.setForm()
      this.data = res.Data.EntityAttribute
    })
  }

  post() { this.service.post(`${Controller}/Create`, this.form.getRawValue()).subscribe((res: any) => { res && res.IsSuccess ? this.done.emit(res.Data) : null })}

  put() { this.service.post(`${Controller}/Update`, this.form.getRawValue()).subscribe((res: any) => { res && res.IsSuccess ? this.done.emit(res.Data) : null })}

  form: UntypedFormGroup
  setForm() {
    Validation.form = this.formObj
    this.form = this.formBuilder.group({
      Id: [0],
      CostCenterTreeCode_Fld: [this.nodeId],
      OrgUnitCodeDesc_Fld: [null],
      OrgUnitCode_Fld: [{ value: null, disabled: Validation.disable('OrgUnitCode_Fld') }, Validation.setValidator('OrgUnitCode_Fld')],
      FormType:[{value: this.formType}]
    })
    this.formType != 'Add' ? this.form.patchValue(this.data) : null
    this.showModal = true
  }

  showTreeModal: boolean = false
  onShowCostCenterModal() {
    this.showTreeModal = true
  }

  clearOrg() {
    this.form.controls.OrgUnitCode_Fld.patchValue(null)
    this.form.controls.OrgUnitCodeDesc_Fld.patchValue(null)
  }

  closedTreeModal() { this.showTreeModal = false }

  nodeSelected(node) {

    if (node.Id) {
      this.form.controls.OrgUnitCode_Fld.patchValue(node.Id)
      this.form.controls.OrgUnitCodeDesc_Fld.patchValue(node.name)
    }
    this.showTreeModal = false
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
      modatTitle: 'واحد مرکز هزینه',
      saveCallback: this.save.bind(this),
      hideCallback: this.close.bind(this),
    }
  }

}
