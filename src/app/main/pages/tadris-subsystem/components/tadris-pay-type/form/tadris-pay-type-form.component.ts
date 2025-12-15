import { Component, Output, EventEmitter, Input } from '@angular/core'
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms'
import { ControlMessageService } from 'src/app/main/main-body/common/custom-form/control-message/control-message.service'
import { GridFormService } from 'src/app/main/main-body/common/grid-form.service'
import { Validation } from 'src/app/main/main-body/common/custom-form/control-message/Validation'

const Controller = 'TadrisPayType'

@Component({
  selector: 'tadris-pay-type-form',
  templateUrl: './tadris-pay-type-form.component.html',
  styleUrls: ['./tadris-pay-type-form.component.scss']
})
export class TadrisPayTypeFormComponent {

  @Output() done = new EventEmitter()
  @Output() closed = new EventEmitter()
  @Input() ID: number
  @Input() formType: string
  @Input() formObj: any

  data: any = {}
  getById() {
    let promise = new Promise((resolve, reject) => {
      this.service.get(`${Controller}/${this.ID}/${this.formType == 'Edit'}`).toPromise().then((res: any) => {
        if (res && res.Data) {
          this.data = res.Data
          resolve(true)
        }
        else {
          this.done.emit(false)
          reject()
        }
      }).catch(e => e)
    })
    return promise
  }

  insureList = []
  getInsure() { this.insureList.length == 0 ? this.service.getCombo('Insure').subscribe((res: any) => this.insureList = res.Data) : null }

  post(fakeFormValue) { 
    this.service.post(`${Controller}/Create`, fakeFormValue).subscribe((res: any) => this.done.emit(res.Data)) 
  }

  put(fakeFormValue) { this.service.post(`${Controller}/Update`, fakeFormValue).subscribe((res: any) => this.done.emit(res.Data)) }

  form: UntypedFormGroup
  showForm: boolean = false
  setForm() {
    Validation.form = this.formObj
    this.form = this.formBuilder.group({
      Id: [0],
      CodeDesc_Fld: [{ value: null, disabled: Validation.disable('CodeDesc_Fld') }, Validation.setValidator('CodeDesc_Fld')],
      LicenseLevelDesc_Fld: [null],
      LicenseLevel_Fld: [{ value: null, disabled: Validation.disable('LicenseLevel_Fld') }, Validation.setValidator('LicenseLevel_Fld')],
      TypeDesc_Fld: [null],
      Type_Fld: [{ value: null, disabled: Validation.disable('Type_Fld') }, Validation.setValidator('Type_Fld')],
      CalcTax_Fld: [{ value: null, disabled: Validation.disable('CalcTax_Fld') }, Validation.setValidator('CalcTax_Fld')],
      TaxBaseTableDesc_Fld: [null],
      TaxBaseTable_Fld: [{ value: null, disabled: Validation.disable('TaxBaseTable_Fld') }, Validation.setValidator('TaxBaseTable_Fld')],
      NotTadil_Fld: [{ value: null, disabled: Validation.disable('NotTadil_Fld') }, Validation.setValidator('NotTadil_Fld')],
      CalcInsure_Fld: [{ value: null, disabled: Validation.disable('CalcInsure_Fld') }, Validation.setValidator('CalcInsure_Fld')],
      InsureCode_Fld: [{ value: null, disabled: Validation.disable('InsureCode_Fld') }, Validation.setValidator('InsureCode_Fld')],
      HourMax_Fld: [{ value: null, disabled: Validation.disable('HourMax_Fld') }, Validation.setValidator('HourMax_Fld')],
      Desc_Fld: [{ value: null, disabled: Validation.disable('Desc_Fld') }, Validation.setValidator('Desc_Fld')],
      CalcFactor_Fld: [{ value: null, disabled: Validation.disable('CalcFactor_Fld') }, Validation.setValidator('CalcFactor_Fld')],
      TaxPayType1403_Fld: [{ value: null, disabled: Validation.disable('TaxPayType1403_Fld') }, Validation.setValidator('TaxPayType1403_Fld')],
      TaxPayType1403Desc_Fld: [null],
      FormType:[{value: this.formType}]
    })
    if (this.formType != 'Add') {
      this.form.patchValue(this.data)
      this.getInsureCode()
      this.changeCalcInsure()
    }
    this.changeCalcTax()
    this.showForm = true
    setTimeout(() => {
      this.service.scrollToElement("form")
    }, 200); 
  }

  save() {
    let fakeFormValue = { ...this.form.getRawValue() }
    this.fixInsureCode(fakeFormValue)

    if (this.form.invalid) return this.controlService.isSubmitted = true

    if (this.formType == 'Add') return this.post(fakeFormValue)

    if (this.formType == 'Edit') this.put(fakeFormValue)
  }

  changeCalcTax() {
    this.formObj.TaxBaseTableDesc_Fld.ishidden = true
    if (this.form.controls.CalcTax_Fld.value) {
      this.form.controls.TaxBaseTable_Fld.enable()
      this.form.controls.TaxBaseTable_Fld.setValidators([Validation.required()])
    }
    else {
      this.form.controls.TaxBaseTable_Fld.disable()
      this.form.controls.TaxBaseTable_Fld.setValue(null)
      this.form.controls.TaxBaseTable_Fld.clearValidators()
    }
    setTimeout(() => this.formObj.TaxBaseTableDesc_Fld.ishidden = false)
  }

  changeCalcInsure() {
    this.formObj.InsureCode_Fld.ishidden = true
    if (this.form.controls.CalcInsure_Fld.value) {
      this.form.controls.InsureCode_Fld.enable()
      this.form.controls.InsureCode_Fld.setValidators([Validation.required()])
    }
    else {
      this.form.controls.InsureCode_Fld.disable()
      this.form.controls.InsureCode_Fld.setValue(null)
      this.form.controls.InsureCode_Fld.clearValidators()
    }
    setTimeout(() => this.formObj.InsureCode_Fld.ishidden = false)
  }

  fixInsureCode(form) { if (form.InsureCode_Fld) form.InsureCode_Fld = form.InsureCode_Fld.toString() }

  getInsureCode() { if (this.form.controls.InsureCode_Fld.value) this.form.controls.InsureCode_Fld.patchValue(this.form.controls.InsureCode_Fld.value.split(',').map(i => Number(i))) }

  close() { this.closed.emit() }

  async buildForm() {
    this.getInsure()
    this.formType != 'Add' ? await this.getById() : null
    this.setForm()
  }

  constructor(private controlService: ControlMessageService, private service: GridFormService, private formBuilder: UntypedFormBuilder) { }

  ngOnChanges(UpdatedValue: string): void { this.buildForm() }

}
