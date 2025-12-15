import { Component, EventEmitter, Input, Output } from '@angular/core'
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms'

import { ControlMessageService } from 'src/app/main/main-body/common/custom-form/control-message/control-message.service'
import { Validation } from 'src/app/main/main-body/common/custom-form/control-message/Validation'
import { ModalOptions } from 'src/app/main/main-body/common/custom-modal/modal-options.interface'
import { GridFormService } from 'src/app/main/main-body/common/grid-form.service'

const Controller = 'SalaryCalcSetting'

@Component({
  selector: 'salary-calc-setting-form',
  templateUrl: './salary-calc-setting-form.component.html',
  styleUrls: ['./salary-calc-setting-form.component.scss']
})
export class SalaryCalcSettingFormComponent {

  @Output() done = new EventEmitter()
  @Output() closed = new EventEmitter()
  @Input() ID: number
  @Input() formType: string
  @Input() formObj: any
  @Input() BankId: number

  data: any = {}
  getById() {
    return new Promise((resolve, reject) => {
      this.service.getById(Controller, this.ID, this.formType).toPromise().then((res: any) => {
        if (res && res.Data) {
          this.data = res.Data
          resolve(true)
        }
        else {
          this.done.emit(false)
          reject()
        }
      })
    })
  }

  getAttr() {
    return new Promise(resolve => {
      this.service.getAttrById(Controller, this.ID).subscribe((res: any) => {
        this.formObj = res.Data.EntityAttribute
        return resolve(true)
      })
    })
  }

  post() { this.service.post(`${Controller}/Create`, this.form.getRawValue()).subscribe((res: any) => { res && res.IsSuccess ? this.done.emit(res.Data) : null })}

  put() { this.service.post(`${Controller}/Update`, this.form.getRawValue()).subscribe((res: any) => { res && res.IsSuccess ? this.done.emit(res.Data) : null })}

  form: UntypedFormGroup
  setForm() {
    Validation.form = this.formObj
    this.form = this.formBuilder.group({
      Id: [0],
      CalcTypeDesc_Fld: [null],
      CalcType_Fld: [{ value: null, disabled: Validation.disable('CalcType_Fld') }, Validation.setValidator('CalcType_Fld')],
      Active_Fld: [{ value: null, disabled: Validation.disable('Active_Fld') }, Validation.setValidator('Active_Fld')],
      CalcOrderDesc_Fld: [null],
      CalcOrder_Fld: [{ value: null, disabled: Validation.disable('CalcOrder_Fld') }, Validation.setValidator('CalcOrder_Fld')],
      CalcTypeInOrderDesc_Fld: [null],
      CalcTypeInOrder_Fld: [{ value: null, disabled: Validation.disable('CalcTypeInOrder_Fld') }, Validation.setValidator('CalcTypeInOrder_Fld')],
      NewFormulaIDDesc_Fld: [null],
      NewFormulaID_Fld: [{ value: null, disabled: Validation.disable('NewFormulaID_Fld') }, Validation.setValidator('NewFormulaID_Fld')],
      FormType:[{value: this.formType}]
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

  CalcTypeInOrderUrl: string = ''
  changeNewFormula(onInit) {
    this.CalcTypeInOrderUrl = `*${Controller}/GetCombo/${this.form.controls.NewFormulaID_Fld.value}`
    this.form.controls.CalcTypeInOrder_Fld.enable()
    if (onInit) return
    this.form.controls.CalcTypeInOrder_Fld.patchValue(null)
    this.form.controls.CalcTypeInOrderDesc_Fld.patchValue(null)
  }

  async buildForm() {
    if (this.formType != 'Add') {
      await this.getAttr()
      await this.getById()
      this.setForm()
      this.form.patchValue(this.data)
      this.changeNewFormula(true)
    }
    else {
      this.setForm()
      this.form.controls.CalcTypeInOrder_Fld.disable()
    }
    this.showModal = true
  }

  ngOnChanges(UpdatedValue: string): void {
    this.modalOptions = {
      formType: this.formType,
      modatTitle: 'تنظیمات محاسبه حقوق',
      saveCallback: this.save.bind(this),
      hideCallback: this.close.bind(this),
    }
    this.buildForm()
  }

}
