import { Component, Output, EventEmitter, Input } from '@angular/core'
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms'
import { ControlMessageService } from 'src/app/main/main-body/common/custom-form/control-message/control-message.service'
import { GridFormService } from 'src/app/main/main-body/common/grid-form.service'
import { Validation } from 'src/app/main/main-body/common/custom-form/control-message/Validation'
import { HireTypeSettingAttr, Month_Fld, setHireTypeSettingAttr, Year_Fld } from 'src/app/main/pages/global-attr'

const Controller = 'HireTypeSetting'

@Component({
  selector: 'hire-type-setting-form',
  templateUrl: './hire-type-setting-form.component.html',
  styleUrls: ['./hire-type-setting-form.component.scss']
})

export class HireTypeSettingFormComponent {

  @Output() closed = new EventEmitter()
  @Input() hireTypeId: number

  formObj: any
  getAttr() {
    !HireTypeSettingAttr
      ? this.service.getAttr(Controller).subscribe((res: any) => this.setAttr(res.Data, 'toLocal'))
      : this.setAttr(HireTypeSettingAttr)
  }

  setAttr(attr, type?) {
    this.checkAccess(attr)
    this.formObj = attr.EntityAttribute
    type == 'toLocal' ? setHireTypeSettingAttr(attr) : null
    this.getByHireTypeId()
  }

  EditPolicy: boolean = false
  checkAccess(attr) { attr.EntityAccess.includes('EditPolicy') ? this.EditPolicy = true : null }

  data: any = {}
  getByHireTypeId() {
    this.service.getById(Controller, this.hireTypeId, 'View').toPromise().then((res: any) => {
      if (!res) return
      else {
        this.data = res.Data
        this.setForm()
      }
    })
  }

  put(val) { this.service.post(`${Controller}/Update`, val).subscribe(_ => this.closed.emit()) }

  form: UntypedFormGroup
  showForm: boolean = false
  setForm() {
    Validation.form = this.formObj
    this.form = this.formBuilder.group({
      Id: [null],
      Year_Fld: [Year_Fld],
      Month_Fld: [Month_Fld],
      HireType_Fld: [this.hireTypeId],
      CalcInJari_Fld: [{ value: null, disabled: Validation.disable('CalcInJari_Fld') }, Validation.setValidator('CalcInJari_Fld')],
      TaxInDaraei_Fld: [{ value: null, disabled: Validation.disable('TaxInDaraei_Fld') }, Validation.setValidator('TaxInDaraei_Fld')],
      ParamMinusDesc_Fld: [null],
      ParamMinus_Fld: [{ value: null, disabled: Validation.disable('ParamMinus_Fld') }, Validation.setValidator('ParamMinus_Fld')],
      DaraeiEmpTypeDesc_Fld: [null],
      DaraeiEmpType_Fld: [{ value: null, disabled: Validation.disable('DaraeiEmpType_Fld') }, Validation.setValidator('DaraeiEmpType_Fld')],
      TaxEmpTypeDesc_Fld: [null],
      TaxEmpType_Fld: [{ value: null, disabled: Validation.disable('TaxEmpType_Fld') }, Validation.setValidator('TaxEmpType_Fld')],
      TaxEmpType1403Desc_Fld: [null],
      TaxEmpType1403_Fld: [{ value: null, disabled: Validation.disable('TaxEmpType1403_Fld') }, Validation.setValidator('TaxEmpType1403_Fld')],
      TopZamen_Fld: [{ value: null, disabled: Validation.disable('TopZamen_Fld') }, Validation.setValidator('TopZamen_Fld')],
      TopGovahi_Fld: [{ value: null, disabled: Validation.disable('TopGovahi_Fld') }, Validation.setValidator('TopGovahi_Fld')],
      TopDebtPrice_Fld: [{ value: null, disabled: Validation.disable('TopDebtPrice_Fld') }, Validation.setValidator('TopDebtPrice_Fld')],
      EmpGroupDesc_Fld: [null],
      EmpGroup_Fld: [{ value: null, disabled: Validation.disable('EmpGroup_Fld') }, Validation.setValidator('EmpGroup_Fld')],
      EmpGroup401Desc_Fld: [null],
      EmpGroup401_Fld: [{ value: null, disabled: Validation.disable('EmpGroup401_Fld') }, Validation.setValidator('EmpGroup401_Fld')],
      YektaEmpType_Fld: [{ value: null, disabled: Validation.disable('YektaEmpType_Fld') }, Validation.setValidator('YektaEmpType_Fld')],
      YektaEmpTypeDesc_Fld: [null],
      TopDebtFormulaID_Fld: [{ value: null, disabled: Validation.disable('TopDebtFormulaID_Fld') }, Validation.setValidator('TopDebtFormulaID_Fld')],
      TopDebtFormulaIDDesc_Fld: [null],

      FormType:[{value: 'Edit'}]
    })
    this.form.patchValue(this.data)
    this.data.CalcInJari_Fld ? this.form.controls.CalcInJari_Fld.patchValue(this.data.CalcInJari_Fld.split(',').map(i => Number(i))) : null
    !this.form.value.Year_Fld ? this.form.controls.Year_Fld.patchValue(Year_Fld) : null
    !this.form.value.Month_Fld ? this.form.controls.Month_Fld.patchValue(Month_Fld) : null
    !this.form.value.HireType_Fld ? this.form.controls.HireType_Fld.patchValue(this.hireTypeId) : null
    this.showForm = true
  }

  save() {
    if (this.form.invalid) return this.controlService.isSubmitted = true
    let fakeFormValue = { ...this.form.getRawValue() }
    this.fixMultiCombo(fakeFormValue)
    this.put(fakeFormValue)
  }
  changeTopDebtCombo(event:any)
  {
      if (event) {
       this.form.controls.TopDebtPrice_Fld.disable() 
       this.form.controls.TopDebtPrice_Fld.setValue(null)
      }
      else
       this.form.controls.TopDebtPrice_Fld.enable()
  }

  changeTopDebtText(event:any)
  {
      if (this.form.controls.TopDebtPrice_Fld.value > 0) {
       this.form.controls.TopDebtFormulaID_Fld.disable() 
       this.form.controls.TopDebtFormulaIDDesc_Fld.disable() 
       this.form.controls.TopDebtFormulaID_Fld.setValue(null)
      }
      else
      {
        this.form.controls.TopDebtFormulaID_Fld.enable() 
        this.form.controls.TopDebtFormulaIDDesc_Fld.enable() 
      }
  }

  fixMultiCombo(form) { if (form.CalcInJari_Fld) form.CalcInJari_Fld = form.CalcInJari_Fld.toString() }

  close() { this.closed.emit() }

  calcInJariList = []
  getCalcInJari() { this.service.get('OtherDetail/GetCombo/10030,10031/0').subscribe((res: any) => this.calcInJariList = res.Data) }

  constructor(private controlService: ControlMessageService, private service: GridFormService, private formBuilder: UntypedFormBuilder) { }

  paramMinusUrl: string
  ngOnChanges(UpdatedValue: string): void {
    this.calcInJariList.length == 0 ? this.getCalcInJari() : null
    this.paramMinusUrl = `HireTypeParam/${this.hireTypeId}`
    this.getAttr()
  }

}
