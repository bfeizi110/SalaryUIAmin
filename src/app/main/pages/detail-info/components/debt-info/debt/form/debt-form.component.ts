import { Component, EventEmitter, Input, Output } from '@angular/core'
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms'

import { ControlMessageService } from 'src/app/main/main-body/common/custom-form/control-message/control-message.service'
import { Validation } from 'src/app/main/main-body/common/custom-form/control-message/Validation'
import { GridFormService } from 'src/app/main/main-body/common/grid-form.service'

const Controller = 'Debt'

@Component({
  selector: 'debt-form',
  templateUrl: './debt-form.component.html',
  styleUrls: ['./debt-form.component.scss']
})

export class DebtFormComponent {

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

  post() {
    this.form.patchValue({ Id: 0 })
    this.service.post(`${Controller}/Create`, this.form.getRawValue()).subscribe((res: any) => this.done.emit(res.Data))
  }

  put() { this.service.post(`${Controller}/Update`, this.form.getRawValue()).subscribe((res: any) => this.done.emit(res.Data)) }

  form: UntypedFormGroup
  showForm: boolean = false
  setForm() {
    Validation.form = this.formObj
    this.form = this.formBuilder.group({
      Id: [null],
      CodeDesc_Fld: [{ value: null, disabled: Validation.disable('CodeDesc_Fld') }, Validation.setValidator('CodeDesc_Fld')],
      Debttype_Fld: [{ value: null, disabled: Validation.disable('Debttype_Fld') }, Validation.setValidator('Debttype_Fld')],
      DKarmand_Fld: [{ value: null, disabled: Validation.disable('DKarmand_Fld') }, Validation.setValidator('DKarmand_Fld')],
      MashmoolTypeDesc_Fld: [null],
      MashmoolType_Fld: [{ value: null, disabled: Validation.disable('MashmoolType_Fld') }, Validation.setValidator('MashmoolType_Fld')],
      Group_Debt: [{ value: null, disabled: Validation.disable('Group_Debt') }, Validation.setValidator('Group_Debt')],
      ContinueslyFlag_Fld: [{ value: null, disabled: Validation.disable('ContinueslyFlag_Fld') }, Validation.setValidator('ContinueslyFlag_Fld')],
      MoafSayer_Fld: [{ value: null, disabled: Validation.disable('MoafSayer_Fld') }, Validation.setValidator('MoafSayer_Fld')],
      KasrDigit_Fld: [{ value: null, disabled: Validation.disable('KasrDigit_Fld') }, Validation.setValidator('KasrDigit_Fld')],
      NoDigit_Fld: [{ value: null, disabled: Validation.disable('NoDigit_Fld') }, Validation.setValidator('NoDigit_Fld')],
      NoTax_Fld: [{ value: null, disabled: Validation.disable('NoTax_Fld') }, Validation.setValidator('NoTax_Fld')],
      NoTaxType_Fld: [{ value: null, disabled: Validation.disable('NoTaxType_Fld') }, Validation.setValidator('NoTaxType_Fld')],
      Description_Fld: [{ value: null, disabled: Validation.disable('Description_Fld') }, Validation.setValidator('Description_Fld')],
      DebtPlace_Fld: [{ value: null, disabled: Validation.disable('DebtPlace_Fld') }, Validation.setValidator('DebtPlace_Fld')],
      DebtPlaceDesc_Fld: [{ value: null, disabled: Validation.disable('DebtPlaceDesc_Fld') }, Validation.setValidator('DebtPlaceDesc_Fld')],
      KasrOrder_Fld: [{ value: null, disabled: Validation.disable('KasrOrder_Fld') }, Validation.setValidator('KasrOrder_Fld')],
      Baz_Fld: [{ value: null, disabled: Validation.disable('Baz_Fld') }, Validation.setValidator('Baz_Fld')],
      Bazneshastegi_Fld: [{ value: null, disabled: Validation.disable('Bazneshastegi_Fld') }, Validation.setValidator('Bazneshastegi_Fld')],
      FirstMonth_Fld: [{ value: null, disabled: Validation.disable('FirstMonth_Fld') }, Validation.setValidator('FirstMonth_Fld')],
      RefahDebt_Fld: [{ value: null, disabled: Validation.disable('RefahDebt_Fld') }, Validation.setValidator('RefahDebt_Fld')],
      Tax_Fld: [{ value: null, disabled: Validation.disable('Tax_Fld') }, Validation.setValidator('Tax_Fld')],
      CalcDebt_Fld: [{ value: null, disabled: Validation.disable('CalcDebt_Fld') }, Validation.setValidator('CalcDebt_Fld')],
      NewFormulaIDDesc_Fld: [null],
      NewFormulaID_Fld: [{ value: null, disabled: Validation.disable('NewFormulaID_Fld') }, Validation.setValidator('NewFormulaID_Fld')],
      FormType:[{value: this.formType}]
    })
    this.formType != 'Add' ? this.form.patchValue(this.data) : null
    this.changeDebtType()
    this.changeKasrDigit()
    this.showForm = true
    setTimeout(() => {
      this.service.scrollToElement("form")
    }, 200); 
  }

  save() {
    if (this.form.invalid) return this.controlService.isSubmitted = true

    if (this.formType == 'Add') return this.post()

    if (this.formType == 'Edit') this.put()
  }

  close() {
    this.closed.emit()
  }

  changeDebtType() {
    this.formObj.DKarmand_Fld.ishidden = true
    this.formObj.MashmoolTypeDesc_Fld.ishidden = true
    let debtTypeValue = this.form.getRawValue().Debttype_Fld
    if (debtTypeValue) {
      this.form.controls.DKarmand_Fld.setValidators([Validation.required()])
      this.form.controls.MashmoolType_Fld.setValidators([Validation.required()])
      this.form.controls.DKarmand_Fld.enable()
      this.form.controls.MashmoolType_Fld.enable()
    }
    else {
      this.form.controls.DKarmand_Fld.disable()
      this.form.controls.MashmoolType_Fld.disable()
      this.form.controls.DKarmand_Fld.patchValue(null)
      this.form.controls.MashmoolType_Fld.patchValue(null)
      this.form.controls.MashmoolTypeDesc_Fld.patchValue(null)
    }
    setTimeout(() => {
      this.formObj.DKarmand_Fld.ishidden = false
      this.formObj.MashmoolTypeDesc_Fld.ishidden = false
    })
  }

  changeKasrDigit() {
    this.formObj.NoDigit_Fld.ishidden = true
    let kasrDigitValue = this.form.getRawValue().KasrDigit_Fld
    if (kasrDigitValue) {
      this.form.controls.NoDigit_Fld.setValidators([Validation.required()])
      this.form.controls.NoDigit_Fld.enable()
    }
    else {
      this.form.controls.NoDigit_Fld.disable()
      this.form.controls.NoDigit_Fld.patchValue(null)
    }
    setTimeout(() => this.formObj.NoDigit_Fld.ishidden = false)
  }

  constructor(private controlService: ControlMessageService, private service: GridFormService, private formBuilder: UntypedFormBuilder) { }

  ngOnChanges(UpdatedValue: string): void { this.formType != 'Add' ? this.get() : this.setForm() }

}
