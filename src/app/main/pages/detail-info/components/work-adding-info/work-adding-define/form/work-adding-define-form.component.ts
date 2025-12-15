import { Component, Output, EventEmitter, Input } from '@angular/core'
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms'
import { ControlMessageService } from 'src/app/main/main-body/common/custom-form/control-message/control-message.service'
import { GridFormService } from 'src/app/main/main-body/common/grid-form.service'
import { Validation } from 'src/app/main/main-body/common/custom-form/control-message/Validation'
import { Month_Fld, Year_Fld } from 'src/app/main/pages/global-attr'

const Controller = 'WorkAddingDefine'

@Component({
  selector: 'work-adding-define-form',
  templateUrl: './work-adding-define-form.component.html',
  styleUrls: ['./work-adding-define-form.component.scss']
})
export class WorkAddingDefineFormComponent {

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

  post(fakeFormValue) {
    fakeFormValue.Id = 0
    this.service.post(`${Controller}/Create`, fakeFormValue).subscribe((res: any) => this.done.emit(res.Data))
  }

  put(fakeFormValue) { this.service.post(`${Controller}/Update`, fakeFormValue).subscribe((res: any) => this.done.emit(res.Data)) }

  form: UntypedFormGroup
  showForm: boolean = false
  setForm() {
    Validation.form = this.formObj
    this.form = this.formBuilder.group({
      Id: [null],
      Year_Fld: [Year_Fld],
      Month_Fld: [Month_Fld],
      CalcInsure_Fld: [{ value: null, disabled: Validation.disable('CalcInsure_Fld') }, Validation.setValidator('CalcInsure_Fld')],
      InsureCode_Fld: [{ value: null, disabled: Validation.disable('InsureCode_Fld') }, Validation.setValidator('InsureCode_Fld')],
      CodeDesc_Fld: [{ value: null, disabled: Validation.disable('CodeDesc_Fld') }, Validation.setValidator('CodeDesc_Fld')],
      Code_Fld: [{ value: null, disabled: Validation.disable('Code_Fld') }, Validation.setValidator('Code_Fld')],
      CoveredDesc_Fld: [null],
      Covered_Fld: [{ value: null, disabled: Validation.disable('Covered_Fld') }, Validation.setValidator('Covered_Fld')],
      MinPriceWorkAdding_Fld: [{ value: null, disabled: Validation.disable('MinPriceWorkAdding_Fld') }, Validation.setValidator('MinPriceWorkAdding_Fld')],
      WorkAddingTypeDesc_Fld: [null],
      WorkAddingType_Fld: [{ value: null, disabled: Validation.disable('WorkAddingType_Fld') }, Validation.setValidator('WorkAddingType_Fld')],
      WorkAdding_FormulaDesc_Fld: [null],
      WorkAdding_Formula_Fld: [{ value: null, disabled: Validation.disable('WorkAdding_Formula_Fld') }, Validation.setValidator('WorkAdding_Formula_Fld')],
      WorkAdding_Limit_Fld: [{ value: null, disabled: Validation.disable('WorkAdding_Limit_Fld') }, Validation.setValidator('WorkAdding_Limit_Fld')],
      WorkAdding_Treshold_Fld: [{ value: null, disabled: Validation.disable('WorkAdding_Treshold_Fld') }, Validation.setValidator('WorkAdding_Treshold_Fld')],
      WorkAdding_T1Divideby_Fld: [{ value: null, disabled: Validation.disable('WorkAdding_T1Divideby_Fld') }, Validation.setValidator('WorkAdding_T1Divideby_Fld')],
      WorkAdding_T2Divideby_Fld: [{ value: null, disabled: Validation.disable('WorkAdding_T2Divideby_Fld') }, Validation.setValidator('WorkAdding_T2Divideby_Fld')],
      Zarib_Fld: [{ value: null, disabled: Validation.disable('Zarib_Fld') }, Validation.setValidator('Zarib_Fld')],
      ZaribInFish_Fld: [{ value: null, disabled: Validation.disable('ZaribInFish_Fld') }, Validation.setValidator('ZaribInFish_Fld')],
      CalcTax_Fld: [{ value: null, disabled: Validation.disable('CalcTax_Fld') }, Validation.setValidator('CalcTax_Fld')],
      TaxBaseTableDesc_Fld: [null],
      TaxBaseTable_Fld: [{ value: null, disabled: Validation.disable('TaxBaseTable_Fld') }, Validation.setValidator('TaxBaseTable_Fld')],
      FormType:[{value: this.formType}]
    })
    this.formType != 'Add' ? this.form.patchValue(this.data) : null
    this.getInsure()
    this.getInsureCode()
    this.changeCalcInsure()
    this.changeCalcTax()
    this.showForm = true
    setTimeout(() => {
      this.service.scrollToElement('form')
    }, 200); 
  }

  insureList = []
  getInsure() { this.service.getCombo('Insure').subscribe((res: any) => this.insureList = res.Data) }

  fixInsureCode(form) { form.InsureCode_Fld ? form.InsureCode_Fld = form.InsureCode_Fld.toString() : null }

  getInsureCode() { this.form.controls.InsureCode_Fld.value ? this.form.controls.InsureCode_Fld.patchValue(this.form.controls.InsureCode_Fld.value.split(',').map(i => Number(i))) : null }

  changeCalcTax() {
    this.formObj.TaxBaseTableDesc_Fld.ishidden = true
    if (this.form.controls.CalcTax_Fld.value) {
      this.form.controls.TaxBaseTable_Fld.enable()
      this.insureList.length == 0 ? this.getInsure() : null
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
      this.insureList.length == 0 ? this.getInsure() : null
      this.form.controls.InsureCode_Fld.setValidators([Validation.required()])
    }
    else {
      this.form.controls.InsureCode_Fld.disable()
      this.form.controls.InsureCode_Fld.setValue(null)
      this.form.controls.InsureCode_Fld.clearValidators()
    }
    setTimeout(() => this.formObj.InsureCode_Fld.ishidden = false)
  }

  save() {
    if (this.form.invalid) return this.controlService.isSubmitted = true

    let fakeFormValue = { ...this.form.getRawValue() }
    this.fixInsureCode(fakeFormValue)

    if (this.formType == 'Add') return this.post(fakeFormValue)

    if (this.formType == 'Edit') this.put(fakeFormValue)
  }

  close() {
    this.closed.emit()
  }

  constructor(private controlService: ControlMessageService, private service: GridFormService, private formBuilder: UntypedFormBuilder) { }

  ngOnChanges(UpdatedValue: string): void { this.formType != 'Add' ? this.get() : this.setForm() }

}
