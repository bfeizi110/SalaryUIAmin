import { Component, EventEmitter, Input, Output } from '@angular/core'
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms'

import { ControlMessageService } from 'src/app/main/main-body/common/custom-form/control-message/control-message.service'
import { Validation } from 'src/app/main/main-body/common/custom-form/control-message/Validation'
import { ModalOptions } from 'src/app/main/main-body/common/custom-modal/modal-options.interface'
import { GridFormService } from 'src/app/main/main-body/common/grid-form.service'

const Controller = 'ReportDesignFile'

@Component({
  selector: 'report-design-file-form',
  templateUrl: './report-design-file-form.component.html',
  styleUrls: ['./report-design-file-form.component.scss']
})
export class ReportDesignFileFormComponent {

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
      FileTypeDesc_Fld: [null],
      FileType_Fld: [{ value: null, disabled: Validation.disable('FileType_Fld') }, Validation.setValidator('FileType_Fld')],
      FormulaIDPart1Desc_Fld: [null],
      FormulaIDPart1_Fld: [{ value: null, disabled: Validation.disable('FormulaIDPart1_Fld') }, Validation.setValidator('FormulaIDPart1_Fldx')],
      DelimiterPart1_Fld: [{ value: null, disabled: Validation.disable('DelimiterPart1_Fld') }, Validation.setValidator('DelimiterPart1_Fld')],
      FormulaIDPart2Desc_Fld: [null],
      FormulaIDPart2_Fld: [{ value: null, disabled: Validation.disable('FormulaIDPart2_Fld') }, Validation.setValidator('FormulaIDPart2_Fld')],
      DelimiterPart2_Fld: [{ value: null, disabled: Validation.disable('DelimiterPart2_Fld') }, Validation.setValidator('DelimiterPart2_Fld')],
      FormulaIDPart3Desc_Fld: [null],
      FormulaIDPart3_Fld: [{ value: null, disabled: Validation.disable('FormulaIDPart3_Fld') }, Validation.setValidator('FormulaIDPart3_Fld')],
      DelimiterPart3_Fld: [{ value: null, disabled: Validation.disable('DelimiterPart3_Fld') }, Validation.setValidator('DelimiterPart3_Fld')],

      SheetName1_Fld: [{ value: null, disabled: Validation.disable('SheetName1_Fld') }, Validation.setValidator('SheetName1_Fld')],
      SheetName2_Fld: [{ value: null, disabled: Validation.disable('SheetName2_Fld') }, Validation.setValidator('SheetName2_Fld')],
      SheetName3_Fld: [{ value: null, disabled: Validation.disable('SheetName3_Fld') }, Validation.setValidator('SheetName3_Fld')],

      FormType:[{value: this.formType}]
    })
    this.formType != 'Add' ? this.form.patchValue(this.data) : null
    this.changeFileType()
    this.showModal = true
  }

  changeFileType() {
    this.formObj.FormulaIDPart1Desc_Fld.ishidden = true
    this.formObj.DelimiterPart1_Fld.ishidden = true
    this.formObj.FormulaIDPart2Desc_Fld.ishidden = true
    this.formObj.DelimiterPart2_Fld.ishidden = true
    this.formObj.FormulaIDPart3Desc_Fld.ishidden = true
    this.formObj.DelimiterPart3_Fld.ishidden = true

    this.form.controls.SheetName1_Fld.disable()
    this.form.controls.SheetName2_Fld.disable()
    this.form.controls.SheetName3_Fld.disable()

    if (this.form.controls.FileType_Fld.value == 100491) { // متنی
      this.form.controls.FormulaIDPart1_Fld.enable()
      this.form.controls.DelimiterPart1_Fld.enable()
      this.form.controls.FormulaIDPart1_Fld.setValidators(Validation.required())
      this.form.controls.DelimiterPart1_Fld.setValidators(Validation.required())

      this.form.controls.FormulaIDPart2_Fld.enable()
      this.form.controls.DelimiterPart2_Fld.enable()
      this.form.controls.FormulaIDPart3_Fld.enable()
      this.form.controls.DelimiterPart3_Fld.enable()
    }
    else if (this.form.controls.FileType_Fld.value == 100492 || this.form.controls.FileType_Fld.value == 100493 || this.form.controls.FileType_Fld.value == 100494) { // اکسل
      this.form.controls.FormulaIDPart1_Fld.enable()
      this.form.controls.FormulaIDPart1_Fld.setValidators(Validation.required())
      this.form.controls.DelimiterPart1_Fld.disable()
      this.form.controls.DelimiterPart1_Fld.patchValue(null)
      this.form.controls.DelimiterPart1_Fld.clearValidators()

      this.form.controls.DelimiterPart2_Fld.disable()
      this.form.controls.DelimiterPart2_Fld.patchValue(null)

      this.form.controls.DelimiterPart3_Fld.disable()
      this.form.controls.DelimiterPart3_Fld.patchValue(null)

      this.form.controls.SheetName1_Fld.patchValue(null)
      this.form.controls.SheetName2_Fld.patchValue(null)
      this.form.controls.SheetName3_Fld.patchValue(null)

      if (this.form.controls.FileType_Fld.value == 100492)
      {
        this.form.controls.SheetName1_Fld.enable()
        this.form.controls.SheetName2_Fld.enable()
        this.form.controls.SheetName3_Fld.enable()
      }
    }

    setTimeout(() => {
      this.formObj.FormulaIDPart1Desc_Fld.ishidden = false
      this.formObj.DelimiterPart1_Fld.ishidden = false
      this.formObj.FormulaIDPart2Desc_Fld.ishidden = false
      this.formObj.DelimiterPart2_Fld.ishidden = false
      this.formObj.FormulaIDPart3Desc_Fld.ishidden = false
      this.formObj.DelimiterPart3_Fld.ishidden = false
    })
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

  ngOnChanges(UpdatedValue: string): void {
    this.formType != 'Add' ? this.get() : this.setForm()
    this.modalOptions = {
      formType: this.formType,
      modatTitle: 'خروجی فایل',

      saveCallback: this.save.bind(this),
      hideCallback: this.close.bind(this),
      maxWidth: 780
    }
  }

}
