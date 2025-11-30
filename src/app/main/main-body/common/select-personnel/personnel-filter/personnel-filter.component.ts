import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms'
import { Month_Fld, Year_Fld } from 'src/app/main/pages/global-attr'
import { GridFormService } from '../../grid-form.service'

@Component({
  selector: 'personnel-filter',
  templateUrl: './personnel-filter.component.html',
  styleUrls: ['./personnel-filter.component.scss']
})
export class PersonnelFilterComponent implements OnInit {

  @Output() onFilter = new EventEmitter()
  @Output() onFilterWithoutFilterButton = new EventEmitter()
  @Output() showPerson = new EventEmitter()
  @Input() hideSearchButton: boolean
  @Input() personObj
  @Input() controller: string
  @Input() personData
  @Input() expanded: boolean

  form: UntypedFormGroup
  showForm: boolean = false
  setForm() {
    this.form = this.formBuilder.group({
      HireTypeHghID: [''],
      HireGroup:[''],
      PayCodeID: [''],
      CostCenterID: [''],
      JenderID: [''],
      MarriedID: [''],
      HasTadris: [null],
      OnlyTadris: [null],
      CostCenter1ID: [''],
      EmpID: [''],
      OnlyCutPay: [false],
      ///////////////////
      NotMostamar: [false],
      HasMostamar: [false],
      HasHokm: [false],
      MostamarCode: [''],
      HokmStatus: [''],
      HokmID: [''],
      HasDebt: [false],
      DebtCode: [''],
      AssignDebtCode: [''],
      HasInsure: [false],
      InsureCode: [''],
      HasSaving: [false],
      NotHokm: [false],
      NotSaving: [false],
      SavingCode: [''],
      AssignSavingCode: [''],
      CaseCode: [''],
      WorkAddingType: [null],
      IncreaseSavingPerson: [null],
      SettlePerson: [null],
      ShowGuarantor: [null],
      ShowHaveGuarantor: [null],
      ViewStatus: [''],
      Fromdate: [null],
      ToDate: [null],
      FromDateExe: [null],
      ToDateExe: [null],
      HasBackPaySemi: [false],
      BimehTypeID: [null],
      PersonMonthHistoryID: [null],
      PersonID: [''],
      OtherPerson: [''],
      IsTadris: [true],
      IsBaz: [true],
      TadrisCode: [''],
      BackPayTypeID: [''],
      ListTypeID: [null],
      PayTypeID: [''],
      YearMonthHgh: [null],
      HasMission: [null],
      NotMission: [null],
      WithCutPay: [null],
      CutPayTypeID: [null],
      NotInsure: [null],
      NotDebt: [null],
      HasCase: [null],
      NotCase: [null],
      HasWork: [null],
      HasMov: [null],
      HasChild: [null],
      ListNo: [''],
      PayGroupTypeID: [''],
      PayDetailID: [''],
      FormType:[{value: ''}],
      RuleState:[null],
      AllMonthOfThisYear:[null],
    })
    let controller: string = this.controller.toLowerCase()
    controller.includes('tadris') ? this.form.controls.IsTadris.patchValue(true) : this.form.controls.IsTadris.patchValue(false)
    controller.includes('baz-subsystem/commission') || controller.includes('baz') || controller.includes('mov') ? this.form.controls.IsBaz.patchValue(true) : this.form.controls.IsBaz.patchValue(false)


    this.showForm = true

  }

  ChechChange(event){
    this.WithCutPay = event.checked
  }
  WithCutPay: boolean = false
  FormLoaded:boolean = false
  activeCostCenterTreeName: string
  showCostCenterModal: boolean = false
  onShowCostCenterModal(fieldName) {
    this.activeCostCenterTreeName = fieldName
    this.showCostCenterModal = true
  }

  clearCostCenter() {
    this.form.controls.CostCenterID.patchValue(null)
    this.costCenterIDDesc = null
  }

  clearCostCenter1() {
    this.form.controls.CostCenter1ID.patchValue(null)
    this.costCenter1IDDesc = null
  }

  costCenterIDDesc: string
  costCenter1IDDesc: string
  nodeSelected(obj) {
    if (this.activeCostCenterTreeName == 'CostCenterID') {
      this.form.controls.CostCenterID.patchValue(obj.ids.toString())
      this.costCenterIDDesc = obj.names.toString()

    }
    else {
      this.form.controls.CostCenter1ID.patchValue(obj.ids.toString())
      this.costCenter1IDDesc = obj.names.toString()
    }
  }

  closedCostCenterModal() { this.showCostCenterModal = false }

  filter() {
    let fakeFormValue = { ...this.form.getRawValue() }
    this.fixMultiCombo(fakeFormValue)
    fakeFormValue = this.filterdFormObject(fakeFormValue)
    this.onFilter.emit(fakeFormValue)
  }

  fixMultiCombo(form) {
    if (form.EmpID) form.EmpID = form.EmpID.toString()
    if (form.PayCodeID) form.PayCodeID = form.PayCodeID.toString()
    if (form.HireTypeHghID) form.HireTypeHghID = form.HireTypeHghID.toString()
    if (form.DebtCode) form.DebtCode = form.DebtCode.toString()
    if (form.AssignDebtCode) form.AssignDebtCode = form.AssignDebtCode.toString()
    if (form.InsureCode) form.InsureCode = form.InsureCode.toString()
    if (form.SavingCode) form.SavingCode = form.SavingCode.toString()
    if (form.AssignSavingCode) form.AssignSavingCode = form.AssignSavingCode.toString()
    if (form.MostamarCode) form.MostamarCode = form.MostamarCode.toString()
    if (form.HokmStatus) form.HokmStatus = form.HokmStatus.toString()
    if (form.HokmID) form.HokmID = form.HokmID.toString()
    if (form.WorkAddingType) form.WorkAddingType = form.WorkAddingType.toString()
    if (form.CaseCode) form.CaseCode = form.CaseCode.toString()
    if (form.ViewStatus) form.ViewStatus = form.ViewStatus.toString()
    if (form.BimehTypeID) form.BimehTypeID = form.BimehTypeID.toString()
    if (form.CutPayTypeID) form.CutPayTypeID = form.CutPayTypeID.toString()
    if (form.PersonMonthHistoryID) form.PersonMonthHistoryID = form.PersonMonthHistoryID.toString()
    if (form.TadrisCode) form.TadrisCode = form.TadrisCode.toString()
    if (form.BackPayTypeID) form.BackPayTypeID = form.BackPayTypeID.toString()
    if (form.PayTypeID) form.PayTypeID = form.PayTypeID.toString()
    if (form.OtherPerson) form.OtherPerson = form.OtherPerson.toString()
    if (form.ListNo) form.ListNo = form.ListNo.toString()
    if (form.PayGroupTypeID) form.PayGroupTypeID = form.PayGroupTypeID.toString()
    if (form.PayDetailID) form.PayDetailID = form.PayDetailID.toString()
    if (form.JenderID) form.JenderID = form.JenderID.toString()
    if (form.MarriedID) form.MarriedID = form.MarriedID.toString()
    if (form.RuleState) form.RuleState = form.RuleState.toString()
    if (form.HireGroup) form.HireGroup = form.HireGroup.toString()
  }

  refresh() {
    this.DisableValueChange = true
    this.form.reset()
    this.controller.toLowerCase().includes('tadris') ? this.form.controls.IsTadris.patchValue(true) : this.form.controls.IsTadris.patchValue(false)
    this.controller.toLowerCase().includes('baz') || this.controller.toLowerCase().includes('mov') ? this.form.controls.IsBaz.patchValue(true) : this.form.controls.IsBaz.patchValue(false)
    this.costCenterIDDesc = ''
    this.costCenter1IDDesc = ''
    this.onFilter.emit(this.filterdFormObject(this.form.getRawValue()))
    this.DisableValueChange = false
  }
  clickFilter(FController: string, ListName: string)
  {
    if (!this[ListName] || this[ListName].length == 0)
      this.service.getCombo(FController).subscribe((res: any) => {
        this[ListName] = res.Data
      })
  }
  payTypeArray = []
  clickComboPayTypeList() { 
    this.payTypeArray.length == 0 ? this.service.get(`Accept/GetPayTypes/100323/100571`).subscribe((res: any) => this.payTypeArray = res.Data) : null 
  }

  formObj: any
  filterdFormObject(form): any {
    return Object.keys(form).filter(key => Object.keys(this.formObj).includes(key)).reduce((obj, key) => {
      obj[key] = form[key];
      return obj
    }, {})
  }

  ComboOpened: boolean = false
  attr: any
  getAttr() {
    return new Promise(resolve => {
      let url: string = this.controller == 'PersonMonthInfo' || this.controller == 'Person' ? `Person/GetFilterAttribute/Person` : `Person/GetFilterAttribute/${this.controller}`
      this.service.get(url).subscribe((res: any) => {
        this.formObj = res.Data.EntityAttribute
        this.formObj.IsTadris = {}
        this.formObj.IsBaz = {}
        this.attr = res.Data
        return resolve(true)
      })
    })
  }

  onShowPerson() {
    this.showPerson.emit()
  }

  personName: string
  onSelectPersonnel(data) {
    this.form.controls.PersonId.setValue(data.Id)
    this.personName = `${data.Name} -- ${data.Family}`
  }

  clearPerson() {
    this.form.controls.PersonID.patchValue(null)
    this.personName = null
  }

  constructor(private formBuilder: UntypedFormBuilder, private service: GridFormService) { }

  DisableValueChange: boolean = false
  async ngOnInit() {
    await this.getAttr()
    this.setForm()
    this.setFromDate()
    this.onFilter.emit(this.filterdFormObject(this.form.getRawValue()))
    setTimeout(() => {
      this.form.valueChanges.subscribe((res) => {
        if (this.DisableValueChange) return
        let fakeFormValue = { ...this.form.getRawValue() }
        this.fixMultiCombo(fakeFormValue)
        fakeFormValue = this.filterdFormObject(fakeFormValue)
        this.onFilterWithoutFilterButton.emit(fakeFormValue)
      })
        
    }, 300);
  }

  async ngOnChanges(UpdatedValue: any) {
    if (UpdatedValue['personObj'] && UpdatedValue['personObj'].currentValue) {
      this.personName = UpdatedValue['personObj'].currentValue.names.toString()
      this.form.controls.PersonID.patchValue(UpdatedValue['personObj'].currentValue.ids.toString())
      !this.form ? await this.ngOnInit() : this.onFilter.emit(this.filterdFormObject(this.form.getRawValue()))
    }
  }

  setFromDate() {
    if (this.formObj.Fromdate) {
      let month: number | string = Month_Fld
      if (month.toString().length == 1) month = `0${month.toString()}`
      this.form.controls.Fromdate.setValue(`${Year_Fld}/${month}/01`)
    }
  }

}
