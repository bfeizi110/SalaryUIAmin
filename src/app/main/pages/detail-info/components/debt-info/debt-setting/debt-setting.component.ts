import { Component, OnInit } from '@angular/core'
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms'

import { ControlMessageService } from 'src/app/main/main-body/common/custom-form/control-message/control-message.service'
import { Validation } from 'src/app/main/main-body/common/custom-form/control-message/Validation'
import { GridFormService } from 'src/app/main/main-body/common/grid-form.service'

const Controller = 'DebtSetting'

@Component({
  templateUrl: './debt-setting.component.html',
  styleUrls: ['./debt-setting.component.scss']
})
export class DebtSettingComponent implements OnInit {

  comboList = []
  clickCombo() { if (this.comboList.length == 0) this.service.getSelect('Debt', 'true', '').subscribe((res: any) => this.comboList = res.Data) }

  refreshCombo() {
    this.comboList = []
    this.clickCombo()
  }

  debtId: number
  debtChange(id) {
    this.getAttr()
  }

  formObj: any
  getAttr() {
    this.service.getAttr(Controller).subscribe((res: any) => {
      this.formObj = res.Data
      this.get()
    })
  }

  hireTypeList = []
  getHireType() { this.service.get('HireType').subscribe((res: any) => this.hireTypeList = res.Data) }

  data: any = {}
  get() {
    this.service.getById(Controller, this.debtId, 'Add').toPromise().then((res: any) => {
      if (!res) return
      else {
        this.data = res.Data
        this.setForm()
      }
    })
  }

  put() {
    if (this.form.invalid) return this.controlService.isSubmitted = true
    let fakeFormValue = { ...this.form.getRawValue() }
    this.fixEmpPrice(fakeFormValue)
    this.service.post(`${Controller}/Update`, fakeFormValue).subscribe(_ => {
      this.showForm = false
      this.debtId = null
    })
  }

  form: UntypedFormGroup
  showForm: boolean = false
  setForm() {
    this.showForm = false
    Validation.form = this.formObj
    this.form = this.formBuilder.group({
      Id: [0],
      CalcTypeDesc_Fld: [null],
      CalcType_Fld: [{ value: null, disabled: Validation.disable('CalcType_Fld') }, Validation.setValidator('CalcType_Fld')],
      BenefitPayTypeDesc_Fld: [null],
      BenefitPayType_Fld: [{ value: null, disabled: Validation.disable('BenefitPayType_Fld') }, Validation.setValidator('BenefitPayType_Fld')],
      Duration_Fld: [{ value: null, disabled: Validation.disable('Duration_Fld') }, Validation.setValidator('Duration_Fld')],
      FixedPrice_Fld: [{ value: null, disabled: Validation.disable('FixedPrice_Fld') }, Validation.setValidator('FixedPrice_Fld')],
      MinSavingPrice_Fld: [{ value: null, disabled: Validation.disable('MinSavingPrice_Fld') }, Validation.setValidator('MinSavingPrice_Fld')],
      MaxSavingPrice_Fld: [{ value: null, disabled: Validation.disable('MaxSavingPrice_Fld') }, Validation.setValidator('MaxSavingPrice_Fld')],
      Rate_Fld: [{ value: null, disabled: Validation.disable('Rate_Fld') }, Validation.setValidator('Rate_Fld')],
      RateSpecial_Fld: [{ value: null, disabled: Validation.disable('RateSpecial_Fld') }, Validation.setValidator('RateSpecial_Fld')],
      RateLating_Fld: [{ value: null, disabled: Validation.disable('RateLating_Fld') }, Validation.setValidator('RateLating_Fld')],
      MaxPartNumber_Fld: [{ value: null, disabled: Validation.disable('MaxPartNumber_Fld') }, Validation.setValidator('MaxPartNumber_Fld')],
      MaxPartNumberSpecial_Fld: [{ value: null, disabled: Validation.disable('MaxPartNumberSpecial_Fld') }, Validation.setValidator('MaxPartNumberSpecial_Fld')],
      MinPartPrice_Fld: [{ value: null, disabled: Validation.disable('MinPartPrice_Fld') }, Validation.setValidator('MinPartPrice_Fld')],
      CalcZarib_Fld: [{ value: null, disabled: Validation.disable('CalcZarib_Fld') }, Validation.setValidator('CalcZarib_Fld')],
      CalcZaribSpecial_Fld: [{ value: null, disabled: Validation.disable('CalcZaribSpecial_Fld') }, Validation.setValidator('CalcZaribSpecial_Fld')],
      AcceptSubsRecord_Fld: [{ value: null, disabled: Validation.disable('AcceptSubsRecord_Fld') }, Validation.setValidator('AcceptSubsRecord_Fld')],
      AcceptSubsRecordSpecial_Fld: [{ value: null, disabled: Validation.disable('AcceptSubsRecordSpecial_Fld') }, Validation.setValidator('AcceptSubsRecordSpecial_Fld')],
      SavingPrice_Fld: [{ value: null, disabled: Validation.disable('SavingPrice_Fld') }, Validation.setValidator('SavingPrice_Fld')],
      MaxDebtPriceSpecial_Fld: [{ value: null, disabled: Validation.disable('MaxDebtPriceSpecial_Fld') }, Validation.setValidator('MaxDebtPriceSpecial_Fld')],
      MinGapMonthes_Fld: [{ value: null, disabled: Validation.disable('MinGapMonthes_Fld') }, Validation.setValidator('MinGapMonthes_Fld')],
      CheckPayPower_Fld: [{ value: null, disabled: Validation.disable('CheckPayPower_Fld') }, Validation.setValidator('CheckPayPower_Fld')],
      Insured_Fld: [{ value: null, disabled: Validation.disable('Insured_Fld') }, Validation.setValidator('Insured_Fld')],
      GuarantorNeeded_Fld: [{ value: null, disabled: Validation.disable('GuarantorNeeded_Fld') }, Validation.setValidator('GuarantorNeeded_Fld')],
      ForPersons_Fld: [{ value: null, disabled: Validation.disable('ForPersons_Fld') }, Validation.setValidator('ForPersons_Fld')],
      ForBaznesh_Fld: [{ value: null, disabled: Validation.disable('ForBaznesh_Fld') }, Validation.setValidator('ForBaznesh_Fld')],
      Mojaz_Fld: [{ value: null, disabled: Validation.disable('Mojaz_Fld') }, Validation.setValidator('Mojaz_Fld')],
      HaveSaving_Fld: [{ value: null, disabled: Validation.disable('HaveSaving_Fld') }, Validation.setValidator('HaveSaving_Fld')],
      SavingCodeDesc_Fld: [null],
      SavingCode_Fld: [{ value: null, disabled: Validation.disable('SavingCode_Fld') }, Validation.setValidator('SavingCode_Fld')],
      Rounding_Fld: [{ value: null, disabled: Validation.disable('Rounding_Fld') }, Validation.setValidator('Rounding_Fld')],
      AddWith_Fld: [{ value: null, disabled: Validation.disable('AddWith_Fld') }, Validation.setValidator('AddWith_Fld')],
      HaveHireCheckDesc_Fld: [null],
      HaveHireCheck_Fld: [{ value: null, disabled: Validation.disable('HaveHireCheck_Fld') }, Validation.setValidator('HaveHireCheck_Fld')],
      HaveGCheckDesc_Fld: [null],
      HaveGCheck_Fld: [{ value: null, disabled: Validation.disable('HaveGCheck_Fld') }, Validation.setValidator('HaveGCheck_Fld')],
      SettleAccountNo_Fld: [{ value: null, disabled: Validation.disable('SettleAccountNo_Fld') }, Validation.setValidator('SettleAccountNo_Fld')],
      FPrice1_Fld: [{ value: null, disabled: Validation.disable('FPrice1_Fld') }, Validation.setValidator('FPrice1_Fld')],
      TPrice1_Fld: [{ value: null, disabled: Validation.disable('TPrice1_Fld') }, Validation.setValidator('TPrice1_Fld')],
      GNumber1_Fld: [{ value: null, disabled: Validation.disable('GNumber1_Fld') }, Validation.setValidator('GNumber1_Fld')],
      FPrice2_Fld: [{ value: null, disabled: Validation.disable('FPrice2_Fld') }, Validation.setValidator('FPrice2_Fld')],
      TPrice2_Fld: [{ value: null, disabled: Validation.disable('TPrice2_Fld') }, Validation.setValidator('TPrice2_Fld')],
      GNumber2_Fld: [{ value: null, disabled: Validation.disable('GNumber2_Fld') }, Validation.setValidator('GNumber2_Fld')],
      FPrice3_Fld: [{ value: null, disabled: Validation.disable('FPrice3_Fld') }, Validation.setValidator('FPrice3_Fld')],
      TPrice3_Fld: [{ value: null, disabled: Validation.disable('TPrice3_Fld') }, Validation.setValidator('TPrice3_Fld')],
      GNumber3_Fld: [{ value: null, disabled: Validation.disable('GNumber3_Fld') }, Validation.setValidator('GNumber3_Fld')],
      MaxDebtPrice_Fld: [{ value: null, disabled: Validation.disable('MaxDebtPrice_Fld') }, Validation.setValidator('MaxDebtPrice_Fld')],
      MaxDebtPrice2_Fld: [{ value: null, disabled: Validation.disable('MaxDebtPrice2_Fld') }, Validation.setValidator('MaxDebtPrice2_Fld')],
      MaxDebtPrice3_Fld: [{ value: null, disabled: Validation.disable('MaxDebtPrice3_Fld') }, Validation.setValidator('MaxDebtPrice3_Fld')],
      MaxDebtPriceEmp1_Fld: [{ value: null, disabled: Validation.disable('MaxDebtPriceEmp1_Fld') }, Validation.setValidator('MaxDebtPriceEmp1_Fld')],
      MaxDebtPriceEmp2_Fld: [{ value: null, disabled: Validation.disable('MaxDebtPriceEmp2_Fld') }, Validation.setValidator('MaxDebtPriceEmp2_Fld')],
      MaxDebtPriceEmp3_Fld: [{ value: null, disabled: Validation.disable('MaxDebtPriceEmp3_Fld') }, Validation.setValidator('MaxDebtPriceEmp3_Fld')],
      FormType:[{value: 'Edit'}]
    })
    this.form.patchValue(this.data)
    this.getMultipleCombo()
    this.showForm = true
    this.getHireType()
  }

  close() {
    this.showForm = false
  }

  fixEmpPrice(form) {
    if (form.MaxDebtPriceEmp1_Fld) form.MaxDebtPriceEmp1_Fld = form.MaxDebtPriceEmp1_Fld.toString()
    if (form.MaxDebtPriceEmp2_Fld) form.MaxDebtPriceEmp2_Fld = form.MaxDebtPriceEmp2_Fld.toString()
    if (form.MaxDebtPriceEmp3_Fld) form.MaxDebtPriceEmp3_Fld = form.MaxDebtPriceEmp3_Fld.toString()
  }

  getMultipleCombo() {
    if (this.form.controls.MaxDebtPriceEmp1_Fld.value) this.form.controls.MaxDebtPriceEmp1_Fld.patchValue(this.form.controls.MaxDebtPriceEmp1_Fld.value.split(',').map(i => Number(i)))
    if (this.form.controls.MaxDebtPriceEmp2_Fld.value) this.form.controls.MaxDebtPriceEmp2_Fld.patchValue(this.form.controls.MaxDebtPriceEmp2_Fld.value.split(',').map(i => Number(i)))
    if (this.form.controls.MaxDebtPriceEmp3_Fld.value) this.form.controls.MaxDebtPriceEmp3_Fld.patchValue(this.form.controls.MaxDebtPriceEmp3_Fld.value.split(',').map(i => Number(i)))
  }

  constructor(private controlService: ControlMessageService, private service: GridFormService, private formBuilder: UntypedFormBuilder) { }

  ngOnInit(): void {
  }
}
