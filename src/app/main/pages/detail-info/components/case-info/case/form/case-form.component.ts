import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms'
import { CustomGridOption } from 'src/app/main/main-body/common/custom-ag-grid/interfaces/ag-grid-option.interface'

import { ControlMessageService } from 'src/app/main/main-body/common/custom-form/control-message/control-message.service'
import { Validation } from 'src/app/main/main-body/common/custom-form/control-message/Validation'
import { GridFormService } from 'src/app/main/main-body/common/grid-form.service'
import { Month_Fld, Year_Fld } from 'src/app/main/pages/global-attr'

const Controller = 'Case'

@Component({
  selector: 'case-form',
  templateUrl: './case-form.component.html',
  styleUrls: ['./case-form.component.scss']
})

export class CaseFormComponent {

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
        this.getAttr()
      }
    })
  }

  post(fakeFormValue) { this.service.post(`${Controller}/Create`, fakeFormValue).subscribe((res: any) => this.done.emit(res.Data)) }

  put(fakeFormValue) { this.service.post(`${Controller}/Update`, fakeFormValue).subscribe((res: any) => this.done.emit(res.Data)) }

  showForm: boolean = false
  form: UntypedFormGroup
  setForm() {
    Validation.form = this.formObj
    this.form = this.formBuilder.group({
      Id: [0],
      Year_Fld: [Year_Fld],
      Month_Fld: [Month_Fld],
      Code_Fld: [null],
      CodeDesc_Fld: [{ value: null, disabled: Validation.disable('CodeDesc_Fld') }, Validation.setValidator('CodeDesc_Fld')],
      CaseKindDesc_Fld: [null],
      Casekind_Fld: [{ value: null, disabled: Validation.disable('Casekind_Fld') }, Validation.setValidator('Casekind_Fld')],
      NewPayTypeDesc_Fld: [],
      NewPayType_Fld: [{ value: null, disabled: Validation.disable('NewPayType_Fld') }, Validation.setValidator('NewPayType_Fld')],
      TaxBaseTableDesc_Fld: [null],
      TaxBaseTable_Fld: [{ value: null, disabled: Validation.disable('TaxBaseTable_Fld') }, Validation.setValidator('TaxBaseTable_Fld')],
      TaxPayTypeDesc_Fld: [null],
      TaxPayType_Fld: [{ value: null, disabled: Validation.disable('TaxPayType_Fld') }, Validation.setValidator('TaxPayType_Fld')],
      TaxPayType1403Desc_Fld: [null],
      TaxPayType1403_Fld: [{ value: null, disabled: Validation.disable('TaxPayType1403_Fld') }, Validation.setValidator('TaxPayType1403_Fld')],
      CalcInsure_Fld: [{ value: null, disabled: Validation.disable('CalcInsure_Fld') }, Validation.setValidator('CalcInsure_Fld')],
      InsureCode_Fld: [{ value: null, disabled: Validation.disable('InsureCode_Fld') }, Validation.setValidator('InsureCode_Fld')],
      AccTypeDesc_Fld: [null],
      AccType_Fld: [{ value: null, disabled: Validation.disable('AccType_Fld') }, Validation.setValidator('AccType_Fld')],
      CalcBaseDesc_Fld: [null],
      CalcBase_Fld: [{ value: null, disabled: Validation.disable('CalcBase_Fld') }, Validation.setValidator('CalcBase_Fld')],
      SplitPrice_Fld: [{ value: null, disabled: Validation.disable('SplitPrice_Fld') }, Validation.setValidator('SplitPrice_Fld')],
      FormulaDesc_Fld: [null],
      FormulaBase_Fld: [{ value: null, disabled: Validation.disable('FormulaBase_Fld') }, Validation.setValidator('FormulaBase_Fld')],
      Formula_Fld: [{ value: null, disabled: Validation.disable('Formula_Fld') }, Validation.setValidator('Formula_Fld')],
      WorkAddingDesc_Fld: [null],
      WorkAdding_Fld: [{ value: null, disabled: Validation.disable('WorkAdding_Fld') }, Validation.setValidator('WorkAdding_Fld')],
      HourMax_Fld: [{ value: null, disabled: Validation.disable('HourMax_Fld') }, Validation.setValidator('HourMax_Fld')],
      DayMax_Fld: [{ value: null, disabled: Validation.disable('DayMax_Fld') }, Validation.setValidator('DayMax_Fld')],
      CasePriceMax_Fld: [{ value: null, disabled: Validation.disable('CasePriceMax_Fld') }, Validation.setValidator('CasePriceMax_Fld')],
      SanavatMax_Fld: [{ value: null, disabled: Validation.disable('SanavatMax_Fld') }, Validation.setValidator('SanavatMax_Fld')],
      HokmYear_Fld: [{ value: null, disabled: Validation.disable('HokmYear_Fld') }, Validation.setValidator('HokmYear_Fld')],
      HokmMonth_Fld: [{ value: null, disabled: Validation.disable('HokmMonth_Fld') }, Validation.setValidator('HokmMonth_Fld')],
      HokmStatusDesc_Fld: [null],
      HokmStatus_Fld: [{ value: null, disabled: Validation.disable('HokmStatus_Fld') }, Validation.setValidator('HokmStatus_Fld')],
      OneDayOrHour_Fld: [{ value: null, disabled: Validation.disable('OneDayOrHour_Fld') }, Validation.setValidator('OneDayOrHour_Fld')],
      InActive_Fld: [{ value: null, disabled: Validation.disable('InActive_Fld') }, Validation.setValidator('InActive_Fld')],
      CalcTax_Fld: [{ value: null, disabled: Validation.disable('CalcTax_Fld') }, Validation.setValidator('CalcTax_Fld')],
      SpeedDisplay_Fld: [{ value: null, disabled: Validation.disable('SpeedDisplay_Fld') }, Validation.setValidator('SpeedDisplay_Fld')],
      SpeedDisplayPrice_Fld: [{ value: null, disabled: Validation.disable('SpeedDisplayPrice_Fld') }, Validation.setValidator('SpeedDisplayPrice_Fld')],
      IdHkmDesc_Fld: [null],
      IdHkm_Fld: [{ value: null, disabled: Validation.disable('IdHkm_Fld') }, Validation.setValidator('IdHkm_Fld')],
      TaxManual_Fld: [{ value: null, disabled: Validation.disable('TaxManual_Fld') }, Validation.setValidator('TaxManual_Fld')],
      
      FormType:[{value: this.formType}]
    })
    this.caseKindDesc = this.caseKindList.filter(a => a.Id == this.data.Casekind_Fld)[0]?.CodeDesc_Fld
    this.form.controls.Casekind_Fld.patchValue(this.data.Casekind_Fld)
    if (this.formType != 'Add') {
      this.form.patchValue(this.data)
      this.getInsureCode()
    }
    this.showForm = true
    setTimeout(() => {
      this.service.scrollToElement('form')
    }, 200); 
    this.getInsure()
    this.changeCalcInsure()
    this.changeCalcTax()
    this.changeSpeedDisplay()
    this.changeFormulaBase()
    this.hokmStatusChange()
  }

  caseKindDesc: string

  caseKindChange() {
    // if (this.form.controls.Casekind_Fld.value == 100044)
    //   if (this.formType == 'Add') {
    //     this.form.controls.HokmStatus_Fld.disable()
    //     this.form.controls.HokmYear_Fld.disable()
    //     this.form.controls.HokmMonth_Fld.disable()
    //   }
    //   else {
    //     this.form.controls.HokmStatus_Fld.enable()
    //     this.form.controls.HokmYear_Fld.enable()
    //     this.form.controls.HokmMonth_Fld.enable()
    //   }
    this.getAttr()
  }

  getAttr() {
    if (this.form && this.form.value.Casekind_Fld) {
      this.data.CaseKindDesc_Fld = this.form.value.CaseKindDesc_Fld
      this.data.Casekind_Fld = this.form.value.Casekind_Fld
    }

    this.service.getAttrById(Controller, this.form && this.form.value.Casekind_Fld ? this.form.value.Casekind_Fld : this.data.Casekind_Fld).subscribe((res: any) => {
      this.formObj = res.Data.EntityAttribute
      this.setForm()
    })
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

  changeCalcTax() {
    this.formObj.TaxBaseTableDesc_Fld.ishidden = true
    if (this.form.controls.CalcTax_Fld.value) {
      this.form.controls.TaxBaseTable_Fld.enable()
      this.form.controls.TaxBaseTable_Fld.setValidators([Validation.required()])
      this.form.controls.TaxManual_Fld.disable()
    }
    else {
      this.form.controls.TaxBaseTable_Fld.disable()
      this.form.controls.TaxBaseTable_Fld.setValue(null)
      this.form.controls.TaxBaseTable_Fld.clearValidators()
      this.form.controls.TaxManual_Fld.enable()
    }
    setTimeout(() => this.formObj.TaxBaseTableDesc_Fld.ishidden = false)
  }

  caseKindList = []
  getCaseKind() { this.caseKindList.length == 0 ? this.service.getCombo('OtherDetail/10004').subscribe((res: any) => this.caseKindList = res.Data) : null }

  insureCodeList = []
  getInsure() { this.insureCodeList.length == 0 ? this.service.getCombo('Insure').subscribe((res: any) => this.insureCodeList = res.Data) : null }

  fixInsureCode(form) { if (form.InsureCode_Fld) form.InsureCode_Fld = form.InsureCode_Fld.toString() }

  getInsureCode() { if (this.form.controls.InsureCode_Fld.value) this.form.controls.InsureCode_Fld.patchValue(this.form.controls.InsureCode_Fld.value.split(',').map(i => Number(i))) }

  save() {
    let fakeFormValue = { ...this.form.getRawValue() }
    this.fixInsureCode(fakeFormValue)

    if (this.form.invalid) return this.controlService.isSubmitted = true

    if (this.formType == 'Add') return this.post(fakeFormValue)

    if (this.formType == 'Edit') this.put(fakeFormValue)
  }

  close() { this.closed.emit() }

  constructor(private controlService: ControlMessageService, private service: GridFormService, private formBuilder: UntypedFormBuilder) { }

  ngOnChanges(UpdatedValue: string): void {
    this.data = {}
    this.form?.reset()
    this.getCaseKind()
    this.formType != 'Add' ? this.get() : this.setForm()
  }

  showMashmoul: boolean = false

  hireTypeList = []
  clickCombo() { this.hireTypeList.length == 0 ? this.service.getCombo('HireType').subscribe((res: any) => this.hireTypeList = res.Data) : null }

  refreshCombo() {
    this.hireTypeList = []
    this.clickCombo()
  }

  hireTypeId: number
  async hireTypeChange(id) {
    this.selectedAcccessList = []
    this.selectedNotAcccessList = []
    this.hireTypeId = id
    this.showGridAccess = false
    this.showGridNotAccess = false
    await this.getAttrHokm()
    await this.getNotInCaseDetail()
    await this.getInCaseDetail()
    this.showGridAccess = true
    this.showGridNotAccess = true
    setTimeout(() => {
      this.service.scrollToElement("access-grid")
    }, 200); 
  }

  getAttrHokm() {
    return new Promise(resolve => {
      this.service.get(`${Controller}/GetDetailAttribute`).subscribe((res: any) => {
        this.gridOptionNotAccess.columnDefs = res.Data
        this.gridOptionAccess.columnDefs = res.Data
        return resolve(true)
      })
    })
  }

  getNotInCaseDetail() {
    return new Promise(resolve => {
      this.service.get(`${Controller}/GetNotInCaseDetail/${this.form.getRawValue().Id}/${this.hireTypeId}`).subscribe((res: any) => {
        this.gridOptionNotAccess.rowData = res.Data
        return resolve(true)
      })
    })
  }

  getInCaseDetail() {
    return new Promise(resolve => {
      this.service.get(`${Controller}/GetInCaseDetail/${this.form.getRawValue().Id}/${this.hireTypeId}`).subscribe((res: any) => {
        this.gridOptionAccess.rowData = res.Data
        return resolve(true)
      })
    })
  }

  addAccess() { this.selectedNotAcccessList.length != 0 ? this.service.post(`${Controller}/AddCaseDetail`, { CaseCode_Fld: this.form.getRawValue().Id, HireType_Fld: this.hireTypeId, ParamIDCollect_Fld: this.selectedNotAcccessList.toString(), Id: 0 }).subscribe(_ => this.hireTypeChange(this.hireTypeId)) : null }

  removeAccess() { this.selectedAcccessList.length != 0 ? this.service.deleteByBody(`${Controller}/DeleteCaseDetail`, { Id: this.selectedAcccessList.toString() }).subscribe(_ => this.hireTypeChange(this.hireTypeId)) : null }

  showGridAccess: boolean = false
  showGridNotAccess: boolean = false
  gridOptionAccess = <CustomGridOption>{ checkboxSelection: true, rowSelected: this.rowSelectedAccess.bind(this) }
  gridOptionNotAccess = <CustomGridOption>{ checkboxSelection: true, rowSelected: this.rowSelectedNotAccess.bind(this) }

  selectedAcccessList = []
  rowSelectedAccess(event) { this.selectedAcccessList.includes(event.data.Id) ? this.selectedAcccessList = this.selectedAcccessList.filter(a => a != event.data.Id) : this.selectedAcccessList.push(event.data.Id) }

  selectedNotAcccessList = []
  rowSelectedNotAccess(event) { this.selectedNotAcccessList.includes(event.data.Id) ? this.selectedNotAcccessList = this.selectedNotAcccessList.filter(a => a != event.data.Id) : this.selectedNotAcccessList.push(event.data.Id) }

  changeSpeedDisplay() { this.form.controls.SpeedDisplay_Fld.value ? this.form.controls.SpeedDisplayPrice_Fld.enable() : this.form.controls.SpeedDisplayPrice_Fld.disable() }

  changeFormulaBase() {
    if (!this.formObj.FormulaDesc_Fld) return
    this.formObj.FormulaDesc_Fld.ishidden = true
    if (this.form.controls.FormulaBase_Fld.value) {
      this.form.controls.Formula_Fld.setValidators([Validation.required()])
      this.form.controls.Formula_Fld.enable()
    }
    else {
      this.form.controls.Formula_Fld.disable()
      this.form.controls.Formula_Fld.setValue(null)
    }

    setTimeout(() => this.formObj.FormulaDesc_Fld.ishidden = false)
  }

  hokmStatusChange() {
    if (!this.formObj.HokmYear_Fld) return
    let hokmStatusValue: any = this.form.controls.HokmStatus_Fld.value
    this.formObj.HokmYear_Fld.ishidden = true
    this.formObj.HokmMonth_Fld.ishidden = true
    if (hokmStatusValue) {
      this.form.controls.HokmYear_Fld.enable()
      this.form.controls.HokmMonth_Fld.enable()
      this.form.controls.HokmYear_Fld.setValidators([Validation.required()])
      this.form.controls.HokmMonth_Fld.setValidators([Validation.required()])
    }
    else {
      this.form.controls.HokmYear_Fld.patchValue(null)
      this.form.controls.HokmYear_Fld.clearValidators()
      this.form.controls.HokmYear_Fld.disable()
      this.form.controls.HokmMonth_Fld.clearValidators()
      this.form.controls.HokmMonth_Fld.patchValue(null)
      this.form.controls.HokmMonth_Fld.disable()
    }
    setTimeout(() => {
      this.formObj.HokmYear_Fld.ishidden = false
      this.formObj.HokmMonth_Fld.ishidden = false
    })
  }

  showCommissionBackPay: boolean = false
  onShowCommissionBackPay() { this.showCommissionBackPay = true }

  clearHkm() {
    this.form.controls.IdHkm_Fld.patchValue(null)
    this.form.controls.IdHkmDesc_Fld.patchValue(null)
  }

  commissionChanged(commission) {
    this.closeCommissionBackPay()
    this.form.controls.IdHkm_Fld.patchValue(commission.Id)
    this.form.controls.IdHkmDesc_Fld.patchValue(commission.HokmIDDesc)
  }

  closeCommissionBackPay() { this.showCommissionBackPay = false }

}
