import { Component, EventEmitter, Input, Output } from '@angular/core'
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms'

import { ControlMessageService } from 'src/app/main/main-body/common/custom-form/control-message/control-message.service'
import { Validation } from 'src/app/main/main-body/common/custom-form/control-message/Validation'
import { ModalOptions } from 'src/app/main/main-body/common/custom-modal/modal-options.interface'
import { GridFormService } from 'src/app/main/main-body/common/grid-form.service'

const Controller = 'ReportDesignStimul'

@Component({
  selector: 'report-design-stimul-form',
  templateUrl: './report-design-stimul-form.component.html',
  styleUrls: ['./report-design-stimul-form.component.scss']
})
export class ReportDesignStimulFormComponent {

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
      ParentID_Fld: [this.parentId],
      CodeDesc_Fld: [{ value: null, disabled: Validation.disable('CodeDesc_Fld') }, Validation.setValidator('CodeDesc_Fld')],
      FileName_Fld: [{ value: null, disabled: Validation.disable('FileName_Fld') }, Validation.setValidator('FileName_Fld')],
      VarName1_Fld: [{ value: null, disabled: Validation.disable('VarName1_Fld') }, Validation.setValidator('VarName1_Fld')],
      VarValue1_Fld: [{ value: null, disabled: Validation.disable('VarValue1_Fld') }, Validation.setValidator('VarValue1_Fld')],
      VarName2_Fld: [{ value: null, disabled: Validation.disable('VarName2_Fld') }, Validation.setValidator('VarName2_Fld')],
      VarValue2_Fld: [{ value: null, disabled: Validation.disable('VarValue2_Fld') }, Validation.setValidator('VarValue2_Fld')],
      IsJson_Fld: [{ value: null, disabled: Validation.disable('IsJson_Fld') }, Validation.setValidator('IsJson_Fld')],
      DtName1_Fld: [{ value: null, disabled: Validation.disable('DtName1_Fld') }, Validation.setValidator('DtName1_Fld')],
      Formula1Desc_Fld: [null],
      Formula1_Fld: [{ value: null, disabled: Validation.disable('Formula1_Fld') }, Validation.setValidator('Formula1_Fld')],
      DtName2_Fld: [{ value: null, disabled: Validation.disable('DtName2_Fld') }, Validation.setValidator('DtName2_Fld')],
      Formula2Desc_Fld: [null],
      Formula2_Fld: [{ value: null, disabled: Validation.disable('Formula2_Fld') }, Validation.setValidator('Formula2_Fld')],
      DtName3_Fld: [{ value: null, disabled: Validation.disable('DtName3_Fld') }, Validation.setValidator('DtName3_Fld')],
      Formula3Desc_Fld: [null],
      Formula3_Fld: [{ value: null, disabled: Validation.disable('Formula3_Fld') }, Validation.setValidator('Formula3_Fld')],
      DtName4_Fld: [{ value: null, disabled: Validation.disable('DtName4_Fld') }, Validation.setValidator('DtName4_Fld')],
      Formula4Desc_Fld: [null],
      Formula4_Fld: [{ value: null, disabled: Validation.disable('Formula4_Fld') }, Validation.setValidator('Formula4_Fld')],
      FormulaBeforeDesc_Fld: [null],
      FormulaBefore_Fld: [{ value: null, disabled: Validation.disable('FormulaBefore_Fld') }, Validation.setValidator('FormulaBefore_Fld')],
      FormType:[{value: this.formType}]
    })
    this.formType != 'Add' ? this.form.patchValue(this.data) : null
    this.changeIsJson()
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

  changeIsJson() {
    if (this.form.controls.IsJson_Fld.value) {
      this.form.controls.DtName1_Fld.enable()
      this.form.controls.Formula1_Fld.enable()
      this.form.controls.DtName2_Fld.enable()
      this.form.controls.Formula2_Fld.enable()
      this.form.controls.DtName3_Fld.enable()
      this.form.controls.Formula3_Fld.enable()
      this.form.controls.DtName4_Fld.enable()
      this.form.controls.Formula4_Fld.enable()
    }
    else {
      this.form.controls.DtName1_Fld.disable()
      this.form.controls.Formula1_Fld.disable()
      this.form.controls.DtName2_Fld.disable()
      this.form.controls.Formula2_Fld.disable()
      this.form.controls.DtName3_Fld.disable()
      this.form.controls.Formula3_Fld.disable()
      this.form.controls.DtName4_Fld.disable()
      this.form.controls.Formula4_Fld.disable()
    }
  }

  modalOptions: ModalOptions

  constructor(private controlService: ControlMessageService, private service: GridFormService, private formBuilder: UntypedFormBuilder) { }

  ngOnChanges(UpdatedValue: string): void {
    this.formType != 'Add' ? this.get() : this.setForm()
    this.modalOptions = {
      formType: this.formType,
      modatTitle: 'خروجی نمایش',
      saveCallback: this.save.bind(this),
      hideCallback: this.close.bind(this),
      maxWidth: 600
    }
  }

}
