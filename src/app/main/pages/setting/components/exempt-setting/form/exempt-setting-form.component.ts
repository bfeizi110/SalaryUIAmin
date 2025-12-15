import { Component, EventEmitter, Input, Output } from '@angular/core'
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms'

import { ControlMessageService } from 'src/app/main/main-body/common/custom-form/control-message/control-message.service'
import { Validation } from 'src/app/main/main-body/common/custom-form/control-message/Validation'
import { ModalOptions } from 'src/app/main/main-body/common/custom-modal/modal-options.interface'
import { GridFormService } from 'src/app/main/main-body/common/grid-form.service'
import { Month_Fld, Year_Fld } from '../../../../global-attr'

const Controller = 'ExemptSetting'

@Component({
  selector: 'exempt-setting-form',
  templateUrl: './exempt-setting-form.component.html',
  styleUrls: ['./exempt-setting-form.component.scss']
})
export class ExemptSettingFormComponent {

  @Output() done = new EventEmitter()
  @Output() closed = new EventEmitter()
  @Input() ID: number
  @Input() formType: string
  @Input() formObj: any

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

  post() { this.service.post(`${Controller}/Create`, this.form.getRawValue()).subscribe((res: any) => { res && res.IsSuccess ? this.done.emit(res.Data) : null }) }

  put() { this.service.post(`${Controller}/Update`, this.form.getRawValue()).subscribe((res: any) => { res && res.IsSuccess ? this.done.emit(res.Data) : null }) }

  form: UntypedFormGroup
  setForm() {
    Validation.form = this.formObj
    this.form = this.formBuilder.group({
      Id: [0],
      Year_Fld: [Year_Fld],
      Month_Fld: [Month_Fld],
      StatusCodeDesc_Fld: [null],
      StatusCode_Fld: [{ value: null, disabled: Validation.disable('StatusCode_Fld') }, Validation.setValidator('StatusCode_Fld')],
      TypeCodeDesc_Fld: [null],
      TypeCode_Fld: [{ value: null, disabled: Validation.disable('TypeCode_Fld') }, Validation.setValidator('TypeCode_Fld')],
      ItemCodeDesc_Fld: [null],
      ItemCode_Fld: [{ value: null, disabled: Validation.disable('ItemCode_Fld') }, Validation.setValidator('ItemCode_Fld')],
      ItemSubCodeDesc_Fld: [null],
      ItemSubCode_Fld: [{ value: null, disabled: Validation.disable('ItemSubCode_Fld') }, Validation.setValidator('ItemSubCode_Fld')],
      CopExempt_Fld: [{ value: null, disabled: Validation.disable('CopExempt_Fld') }, Validation.setValidator('CopExempt_Fld')],
      Percent_Fld: [{ value: 100, disabled: Validation.disable('Percent_Fld') }, Validation.setValidator('Percent_Fld')],
      ExemptTypeDesc_Fld: [null],
      ExemptType_Fld: [{ value: 100, disabled: Validation.disable('ExemptType_Fld') }, Validation.setValidator('ExemptType_Fld')],
      Desc_Fld: [{ value: null, disabled: Validation.disable('Desc_Fld') }, Validation.setValidator('Desc_Fld')],
      CalcWithStartDay_Fld: [{ value: null, disabled: Validation.disable('CalcWithStartDay_Fld') }, Validation.setValidator('CalcWithStartDay_Fld')],
      FormType:[{value: this.formType}]
    })
    this.formType != 'Add' ? this.form.patchValue(this.data) : null
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

  comboArrayTypeCode = []
  getTypeCodeCombo() {
    this.service.get(`${Controller}/GetComboTypeCode`).subscribe((res: any) => {
      let data = res.Data
      this.comboArrayTypeCode = data.map(({ FldInt1: Id, FldString1: CodeDesc_Fld, FldInt2: HaveEmpCop, FldInt3: HaveCopExempt }) => ({ Id, CodeDesc_Fld, HaveEmpCop, HaveCopExempt }))
    })
  }

  async changeTypeCode(isOnInit?) {
    if (this.form.controls.TypeCode_Fld.value) {
      let typeSelected = this.comboArrayTypeCode.filter(a => a.Id == this.form.controls.TypeCode_Fld.value)[0]
      if (typeSelected.HaveEmpCop == 1) {
        let itemCodeUrl = `${Controller}/GetComboItemCode/${this.form.controls.TypeCode_Fld.value}`
        this.form.controls.ItemCode_Fld.enable()
        this.form.controls.ItemSubCode_Fld.disable()
        await this.getItemCode(itemCodeUrl)
        this.changeItemCode()
      }
      else {
        this.form.controls.ItemCode_Fld.patchValue(null)
        this.form.controls.ItemSubCode_Fld.patchValue(null)
        this.form.controls.ItemCode_Fld.disable()
        this.form.controls.ItemSubCode_Fld.disable()
      }
      if (typeSelected.HaveCopExempt == 1) {
        this.form.controls.CopExempt_Fld.enable()
      }
      else {
        this.form.controls.CopExempt_Fld.disable()
        this.form.controls.CopExempt_Fld.patchValue(null)
      }
    }

    if (isOnInit) return
    this.form.controls.ItemCode_Fld.patchValue(null)
    this.form.controls.ItemCodeDesc_Fld.patchValue(null)
    this.form.controls.ItemSubCode_Fld.patchValue(null)
    this.form.controls.ItemSubCodeDesc_Fld.patchValue(null)
  }

  itemCodeArray = []
  getItemCode(url) {
    return new Promise(resolve => {
      this.service.get(url).subscribe((res: any) => {
        this.itemCodeArray = res.Data.map(({ FldInt1: Id, FldString1: CodeDesc_Fld, FldInt2: HaveEmpCop }) => ({ Id, CodeDesc_Fld, HaveEmpCop }))
        return resolve(true)
      })
    })
  }

  changeItemCode() {
    if (this.form.controls.ItemCode_Fld.value && this.itemCodeArray.filter(a => a.Id == this.form.controls.ItemCode_Fld.value)[0].HaveEmpCop == 1) {
      this.form.controls.ItemSubCode_Fld.enable()
    }
    else {
      this.form.controls.ItemSubCode_Fld.disable()
      this.form.controls.ItemSubCode_Fld.patchValue(null)
    }
  }

  modalOptions: ModalOptions

  async buildForm() {
    this.getTypeCodeCombo()
    if (this.formType != 'Add') {
      await this.getById()
      this.setForm()
      this.changeTypeCode(true)
    }
    else {
      this.setForm()
      this.form.controls.ItemCode_Fld.disable()
      this.form.controls.ItemSubCode_Fld.disable()
    }
    this.showModal = true
  }

  constructor(private controlService: ControlMessageService, private service: GridFormService, private formBuilder: UntypedFormBuilder) { }

  ngOnChanges(UpdatedValue: string): void {
    this.modalOptions = {
      formType: this.formType,
      modatTitle: 'تنظیمات معافیت',
      saveCallback: this.save.bind(this),
      hideCallback: this.close.bind(this),
      maxWidth: 600
    }
    this.buildForm()
  }

}

