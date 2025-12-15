import { Component, EventEmitter, Input, Output } from '@angular/core'
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms'

import { ControlMessageService } from 'src/app/main/main-body/common/custom-form/control-message/control-message.service'
import { Validation } from 'src/app/main/main-body/common/custom-form/control-message/Validation'
import { ModalOptions } from 'src/app/main/main-body/common/custom-modal/modal-options.interface'
import { GridFormService } from 'src/app/main/main-body/common/grid-form.service'

const Controller = 'ReportDesignGrid'

@Component({
  selector: 'report-design-grid-form',
  templateUrl: './report-design-grid-form.component.html',
  styleUrls: ['./report-design-grid-form.component.scss']
})
export class ReportDesignGridFormComponent {

  @Output() done = new EventEmitter()
  @Output() closed = new EventEmitter()
  @Input() ID: number
  @Input() formType: string
  @Input() formObj: any
  @Input() parentId: number

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
      IsFormula_Fld: [{ value: null, disabled: Validation.disable('IsFormula_Fld') }, Validation.setValidator('IsFormula_Fld')],
      FormulaIDDesc_Fld: [null],
      FormulaID_Fld: [{ value: null, disabled: Validation.disable('FormulaID_Fld') }, Validation.setValidator('FormulaID_Fld')],
      ParentID_Fld: [this.parentId],
      CodeDesc_Fld: [{ value: null, disabled: Validation.disable('CodeDesc_Fld') }, Validation.setValidator('CodeDesc_Fld')],
      Query_Fld: [{ value: null, disabled: Validation.disable('Query_Fld') }, Validation.setValidator('Query_Fld')],
      FormType:[{value: this.formType}]
    })
    this.formType != 'Add' ? this.form.patchValue(this.data) : null
    this.changeIsFormula()
    this.showModal = true
  }

  save() {
    if (this.form.invalid) return this.controlService.isSubmitted = true

    if (this.formType == 'Add') return this.post()

    if (this.formType == 'Edit') this.put()
  }

  changeIsFormula() {
    this.formObj.FormulaIDDesc_Fld.ishidden = true
    this.formObj.Query_Fld.ishidden = true
    if (this.form.controls.IsFormula_Fld.value) {
      this.form.controls.FormulaID_Fld.setValidators(Validation.required())
      this.form.controls.FormulaID_Fld.enable()
      this.form.controls.Query_Fld.clearValidators()
      this.form.controls.Query_Fld.disable()
      this.form.controls.Query_Fld.patchValue(null)
    }
    else {
      this.form.controls.Query_Fld.setValidators(Validation.required())
      this.form.controls.Query_Fld.enable()
      this.form.controls.FormulaID_Fld.clearValidators()
      this.form.controls.FormulaID_Fld.disable()
      this.form.controls.FormulaID_Fld.patchValue(null)
    }
    setTimeout(() => {
      this.formObj.FormulaIDDesc_Fld.ishidden = false
      this.formObj.Query_Fld.ishidden = false
    })
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
      modatTitle: 'خروجی جدول',
      saveCallback: this.save.bind(this),
      hideCallback: this.close.bind(this),
    }
  }

}
