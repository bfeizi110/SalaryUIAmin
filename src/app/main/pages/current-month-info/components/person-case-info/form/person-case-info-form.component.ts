import { Component, Output, EventEmitter, Input, ViewChild, ElementRef } from '@angular/core'
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms'
import { ControlMessageService } from 'src/app/main/main-body/common/custom-form/control-message/control-message.service'
import { GridFormService } from 'src/app/main/main-body/common/grid-form.service'
import { Validation } from 'src/app/main/main-body/common/custom-form/control-message/Validation'
import { Month_Fld, Year_Fld } from '../../../../global-attr'
import { Console } from 'console'

const Controller = 'PersonCaseInfo'

@Component({
  selector: 'person-case-info-form',
  templateUrl: './person-case-info-form.component.html',
  styleUrls: ['./person-case-info-form.component.scss']
})
export class PersonCaseInfoFormComponent {

  @Output() done = new EventEmitter()
  @Output() closed = new EventEmitter()
  @Output() caseCodeChange = new EventEmitter()
  @Input() ID: number
  @Input() formType: string
  @Input() formObj: any
  @Input() PID: any
  @Input() caseKindId: number
  @Input() caseCode: number
  @Input() personList: number[]
  @Input() idList: number[]
  @Input() selectedPersonelNF: any
  
  @ViewChild("myElem") MyProp: ElementRef;
  
  showListNoForm: boolean = false
  
  onAddList(){
    this.showListNoForm = true
  }

  submitedListNo(newData) {

    this.form.controls.NoDesc_Fld.patchValue(newData[0].CodeDesc_Fld)
    this.form.controls.No_Fld.patchValue(newData[0].Id)
    this.data.NoDesc_Fld = newData[0].CodeDesc_Fld

    this.closeFormListNo()
  }

  closeFormListNo() {
    this.showListNoForm = false
  }

  onGetLastList(){
    this.service.getByIdSimple('ListNo/GetLastNo', Controller).toPromise().then((res: any) => {
      if (!res || !res.Data) return this.done.emit(false)
      else {
        this.form.controls.NoDesc_Fld.patchValue(res.Data.CodeDesc_Fld)
        this.form.controls.No_Fld.patchValue(res.Data.Id)
        this.data.NoDesc_Fld = res.Data.CodeDesc_Fld
      }
    })

  }

  clearCostEtebar() {
    this.form.controls.CostEtebar_Fld.patchValue(null)
    this.form.controls.CostEtebarDesc_Fld.patchValue(null)
  }

  async changeCaseCode() {
    this.data.CaseCode_Fld = this.form.value.CaseCode_Fld
    await this.getCaseById()
    this.caseKindId = this.caseData.Casekind_Fld
    this.caseCode = this.caseData.Code_Fld
    this.caseCodeChange.emit(this.caseCode)    
    await this.getAttr()
    this.setForm()
    if (this.formType != 'Add') this.form.patchValue(this.data)
    else {
      this.form.patchValue(this.caseData)
      this.form.controls.Id.patchValue(0)
    }
    this.form.controls.CaseCode_Fld.patchValue(this.data.CaseCode_Fld)
    this.data.CaseCodeDesc_Fld = this.caseCodeList.filter(a => a.Id == this.data.CaseCode_Fld)[0]?.CodeDesc_Fld
    this.setStatusOfCommission()
    this.onIsManualIdHkm(this.form.controls.IsManualIdHkm_Fld.value)
  }

  getAttr(): Promise<any> {
    return new Promise(resolve => {
      this.service.get(Controller + `/GetAttribute/${this.caseKindId}/${this.caseCode}`).subscribe((res: any) => {
        this.formObj = res.Data.EntityAttribute
        return resolve(true)
      })
    })
  }

  caseData: any = {}
  getCaseById() {
    return new Promise((resolve, reject) => {
      this.service.getById('Case', this.caseCodeList.filter(a => this.form.controls.CaseCode_Fld.value == a.Id)[0].Code_Fld, 'View').toPromise().then((res: any) => {
        if (res) {
          this.caseData = res.Data
          this.caseData.InsureCode_Fld ? this.caseData.InsureCode_Fld = this.caseData.InsureCode_Fld.split(',').map(i => Number(i)) : null
          this.form.patchValue(this.caseData)
          resolve(true)
        }
        else {
          this.done.emit(false)
          reject()
        }
      })
    })
  }

  data: any = {}
  get() {
    return new Promise((resolve, reject) => {
      this.service.getById(Controller, this.ID, this.formType).toPromise().then((res: any) => {
        if (res) {
          this.data = res.Data
          this.data.InsureCode_Fld ? this.data.InsureCode_Fld = this.data.InsureCode_Fld.split(',').map(i => Number(i)) : null
          this.form.patchValue(this.data)
          this.changeLimit()
          this.onIsManualIdHkm(this.form.controls.IsManualIdHkm_Fld.value)
          resolve(true)
        }
        else {
          this.done.emit(false)
          reject()
        }
      })
    })
  }

  post(fakeFormValue) {
    fakeFormValue.Id = 0
    if (this.personList.length == 0) fakeFormValue.PersonIDCollect_Fld = null
    else {
      fakeFormValue.PersonID_Fld = 0
      fakeFormValue.PersonIDCollect_Fld = this.personList.toString()
    }
    this.service.post(`${Controller}/Create`, fakeFormValue).subscribe(_ => this.done.emit(this.personList.length == 0 ? 'single' : 'multi'))
  }

  put(fakeFormValue) {
    if (this.idList.length == 0) {
      fakeFormValue.IDCollect_Fld = null
      this.service.post(`${Controller}/Update`, fakeFormValue).subscribe(_ => this.done.emit('single'))
    }
    else {
      fakeFormValue.Id = 0
      fakeFormValue.PersonID_Fld = 0
      fakeFormValue.IDCollect_Fld = this.idList.toString()
      fakeFormValue.FieldChanged_Fld = this.fieldChange.toString()
      this.service.post(`${Controller}/UpdateAll`, fakeFormValue).subscribe(_ => this.done.emit('multi'))
    }
  }

  form: UntypedFormGroup
  showForm: boolean = false
  isSanavat: boolean = false
  setForm() {
    Validation.form = this.formObj
    this.form = this.formBuilder.group({
      Id: [0],
      Year_Fld: [Year_Fld],
      Month_Fld: [Month_Fld],
      PersonID_Fld: [this.PID],
      CaseCodeDesc_Fld: [null],
      CaseCode_Fld: [{ value: null, disabled: Validation.disable('CaseCode_Fld') }, Validation.setValidator('CaseCode_Fld')],
      NoDesc_Fld: [null],
      No_Fld: [{ value: null, disabled: Validation.disable('No_Fld') }, Validation.setValidator('No_Fld')],
      Hours_Fld: [{ value: null, disabled: Validation.disable('Hours_Fld') }, Validation.setValidator('Hours_Fld')],
      Mins_Fld: [{ value: null, disabled: Validation.disable('Mins_Fld') }, Validation.setValidator('Mins_Fld')],
      Days_Fld: [{ value: null, disabled: Validation.disable('Days_Fld') }, Validation.setValidator('Days_Fld')],
      NonPurePrice_Fld: [{ value: null, disabled: Validation.disable('NonPurePrice_Fld') }, Validation.setValidator('NonPurePrice_Fld')],
      TaxPrice_Fld: [{ value: null, disabled: Validation.disable('TaxPrice_Fld') }, Validation.setValidator('TaxPrice_Fld')],
      Sanavat_Fld: [{ value: null, disabled: Validation.disable('Sana') }, Validation.setValidator('Sanavat_Fld')],
      SanavatUntilDate_Fld: [{ value: null, disabled: Validation.disable('SanavatUntilDate_Fld') }, Validation.setValidator('SanavatUntilDate_Fld')],
      PrevPrice_Fld: [{ value: null, disabled: Validation.disable('PrevPrice_Fld') }, Validation.setValidator('PrevPrice_Fld')],
      SanadNo_Fld: [{ value: null, disabled: Validation.disable('SanadNo_Fld') }, Validation.setValidator('SanadNo_Fld')],
      WorkAddingDesc_Fld: [null],
      WorkAdding_Fld: [{ value: null, disabled: Validation.disable('WorkAdding_Fld') }, Validation.setValidator('WorkAdding_Fld')],
      OneDayOrHour_Fld: [{ value: null, disabled: Validation.disable('OneDayOrHour_Fld') }, Validation.setValidator('OneDayOrHour_Fld')],
      Desc_Fld: [{ value: null, disabled: Validation.disable('Desc_Fld') }, Validation.setValidator('Desc_Fld')],
      DocDate_Fld: [{ value: null, disabled: Validation.disable('DocDate_Fld') }, Validation.setValidator('DocDate_Fld')],
      DocNo_Fld: [{ value: null, disabled: Validation.disable('DocNo_Fld') }, Validation.setValidator('DocNo_Fld')],
      CostEtebarDesc_Fld: [null],
      CostEtebar_Fld: [{ value: null, disabled: Validation.disable('CostEtebar_Fld') }, Validation.setValidator('CostEtebar_Fld')],
      IsManualIdHkm_Fld: [{ value: null, disabled: Validation.disable('IsManualIdHkm_Fld') }, Validation.setValidator('IsManualIdHkm_Fld')],
      IdHkmDesc_Fld: [null],
      IdHkm_Fld: [{ value: null, disabled: Validation.disable('IdHkm_Fld') }, Validation.setValidator('IdHkm_Fld')],
      IsDateLimit_Fld: [{ value: null, disabled: Validation.disable('IsDateLimit_Fld') }, Validation.setValidator('IsDateLimit_Fld')],
      FromDateLimit_Fld: [{ value: null, disabled: Validation.disable('FromDateLimit_Fld') }, Validation.setValidator('FromDateLimit_Fld')],
      ToDateLimit_Fld: [{ value: null, disabled: Validation.disable('ToDateLimit_Fld') }, Validation.setValidator('ToDateLimit_Fld')],

      PersonIDCollect_Fld: [null],
      IDCollect_Fld: [null],
      FormType:[{value: this.formType}]
    })
    this.changeLimit()
    // setTimeout(() => { this.service.scrollToElement("form") }, 200)
  }
  onIsManualIdHkm(event){
    if (event)
    {
      this.form.controls.IdHkm_Fld.setValidators([Validation.required()])
      this.form.controls.IdHkm_Fld.updateValueAndValidity()
      this.formObj.IdHkm_Fld ? this.formObj.IdHkm_Fld.require = true : null
    }
    else
    {
      this.form.controls.IdHkm_Fld.clearValidators()
      this.form.controls.IdHkm_Fld.updateValueAndValidity()
      this.formObj.IdHkm_Fld ? this.formObj.IdHkm_Fld.require = false : null
    }
  }
  changeLimit() {
      this.formObj.FromDateLimit_Fld ? this.formObj.FromDateLimit_Fld.ishidden = true : null
      this.formObj.ToDateLimit_Fld ? this.formObj.ToDateLimit_Fld.ishidden = true : null

    if (this.form.controls.IsDateLimit_Fld.value) {
      this.form.controls.FromDateLimit_Fld.enable()
      this.form.controls.FromDateLimit_Fld.setValidators([Validation.required()])
      this.form.controls.FromDateLimit_Fld.updateValueAndValidity()
      this.formObj.FromDateLimit_Fld ? this.formObj.FromDateLimit_Fld.require = false : null
      this.form.controls.ToDateLimit_Fld.enable()
      this.form.controls.ToDateLimit_Fld.setValidators([Validation.required()])
      this.form.controls.ToDateLimit_Fld.updateValueAndValidity()
      this.formObj.ToDateLimit_Fld ? this.formObj.ToDateLimit_Fld.require = false : null
      this.isSanavat = true
      this.form.controls.Sanavat_Fld.disable()
      // this.form.controls.Sanavat_Fld.setValue(null)
      this.form.controls.Sanavat_Fld.clearValidators()
      setTimeout(() => {
        this.formObj.FromDateLimit_Fld ? this.formObj.FromDateLimit_Fld.ishidden = false : null
        this.formObj.ToDateLimit_Fld ? this.formObj.ToDateLimit_Fld.ishidden = false : null 
      }, 100);
    }
    else {
      this.form.controls.FromDateLimit_Fld.disable()
      this.form.controls.FromDateLimit_Fld.setValue(null)
      this.form.controls.FromDateLimit_Fld.clearValidators()
      this.form.controls.FromDateLimit_Fld.updateValueAndValidity()

      this.form.controls.ToDateLimit_Fld.disable()
      this.form.controls.ToDateLimit_Fld.setValue(null)
      this.form.controls.ToDateLimit_Fld.clearValidators()
      this.form.controls.ToDateLimit_Fld.updateValueAndValidity()
      if (this.isSanavat)
      {
        this.form.controls.Sanavat_Fld.enable()
        this.form.controls.Sanavat_Fld.setValidators([Validation.required()])
        this.form.controls.Sanavat_Fld.updateValueAndValidity()
        this.formObj.Sanavat_Fld ? this.formObj.Sanavat_Fld.require = false : null
      }
    }
  }

  save() {
    this.personList.length > 0 ? this.form.controls.PersonIDCollect_Fld.patchValue(this.personList.toString()) : null
    let fakeFormValue = { ...this.form.getRawValue() }
    this.toString(fakeFormValue)

    if (this.form.invalid) return this.controlService.isSubmitted = true

    if (this.formType == 'Add') return this.post(fakeFormValue)

    if (this.formType == 'Edit') this.put(fakeFormValue)
  }

  toString(fakeFormValue) { if (fakeFormValue.InsureCode_Fld) fakeFormValue.InsureCode_Fld = fakeFormValue.InsureCode_Fld.toString() }

  close() { this.closed.emit() }

  insureList = []
  getInsure() { this.insureList.length == 0 ? this.service.getCombo('Insure').subscribe((res: any) => this.insureList = res.Data) : null }

  caseCodeList = []
  getCaseCode() {
    return new Promise(resolve => {
      this.service.getCombo('Case').toPromise().then((res: any) => {
        this.caseCodeList = res.Data
        return resolve(true)
      })
    })    
  }

  showCostCenterModal: boolean = false
  onShowCostCenterModal() {
    this.showCostCenterModal = true
  }

  nodeSelected(node) {
    this.form.controls.CostEtebar_Fld.patchValue(node.Id)
    this.form.controls.CostEtebarDesc_Fld.patchValue(node.name)
    this.showCostCenterModal = false
  }

  closedCostCenterModal() { this.showCostCenterModal = false }

  multiEdit: boolean = false
  async buildForm() {
    this.idList.length > 0 ? this.multiEdit = true : this.multiEdit = false
    await this.getCaseCode()
    this.getInsure()
    this.data = {}
    if (this.personList.length > 0 || this.idList.length > 0) {
      this.caseCode = 0
      this.caseKindId = 0
      // this.form.reset()
      this.getAttr()
      this.setForm()
      this.multiEdit ? Object.keys(this.form.controls).forEach(a => this.changeCheckbox(false, a)) : null
      this.form.controls.Year_Fld.patchValue(Year_Fld)
      this.form.controls.Month_Fld.patchValue(Month_Fld)
      if (this.formType == 'Edit') this.form.controls.IDCollect_Fld.patchValue(this.idList)
    }
    else {
      if (this.formType != 'Add') {
        this.formObj = {}
        await this.getAttr()
        this.setForm()
        // await this.getCaseById()
        await this.get()
        this.showForm = true
      }
      else {
        this.setForm()
        if (this.caseCode) {
          this.form.controls.CaseCode_Fld.patchValue(this.caseCode)
          this.form.controls.CaseCodeDesc_Fld.patchValue(this.caseCodeList.find(a => a.Id == this.caseCode).CodeDesc_Fld)
          this.data.CaseCodeDesc_Fld = this.form.controls.CaseCodeDesc_Fld.value
          await this.changeCaseCode()
        }
        this.showForm = true
      }
    }
    this.showForm = true
    setTimeout(() => {
      this.MyProp.nativeElement.scrollIntoView({ behavior: "smooth", block: "start" });    
    }, 250); 
    this.setStatusOfCommission()
  }

  fieldChange: string[] = []
  changeCheckbox(enabled: boolean, fieldName: string) {
    if (!this.formObj[fieldName]) return // || this.formObj[fieldName].type == 'date'
    if (this.formObj[fieldName].disableInput && this.multiEdit)
      this.formObj[fieldName].ishidden = true

    if (enabled && !this.formObj[fieldName].disableInput) {
      this.form.controls[fieldName].enable()
      this.fieldChange.push(fieldName)
    }
    else {
      this.form.controls[fieldName].disable()
      this.fieldChange = this.fieldChange.filter(a => a != fieldName)
    }
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

  setStatusOfCommission() {
    // if (!this.formObj.IdHkmDesc_Fld) return
    // this.formObj.IdHkmDesc_Fld.ishidden = true
    // let hokmStatusValue: any = this.form.controls.HokmStatus_Fld.value
    // let caseKindValue: number = this.caseKindId
    // if (!hokmStatusValue && caseKindValue == 100044) {
    //   this.formObj.IdHkmDesc_Fld.ishidden = false
    //   this.form.controls.IdHkm_Fld.setValidators([Validation.required()])
    // }
    // else {
    //   this.formObj.IdHkmDesc_Fld.ishidden = true
    //   this.form.controls.IdHkm_Fld.patchValue(null)
    //   this.form.controls.IdHkmDesc_Fld.patchValue(null)
    // }
  }

  constructor(private controlService: ControlMessageService, private service: GridFormService, private formBuilder: UntypedFormBuilder) { }

  ngOnChanges(UpdatedValue: string): void { this.buildForm() }

}
