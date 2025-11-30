
import { Component, Output, EventEmitter, Input } from '@angular/core'
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms'
import { ControlMessageService } from 'src/app/main/main-body/common/custom-form/control-message/control-message.service'
import { GridFormService } from 'src/app/main/main-body/common/grid-form.service'
import { Validation } from 'src/app/main/main-body/common/custom-form/control-message/Validation'
import { Month_Fld, PID, Year_Fld } from 'src/app/main/pages/global-attr'
import { ToastrService } from 'ngx-toastr'

const Controller = 'PersonMissionInfo'

@Component({
  selector: 'person-mission-info-form',
  templateUrl: './person-mission-info-form.component.html',
  styleUrls: ['./person-mission-info-form.component.scss']
})
export class PersonMissionInfoFormComponent {

  @Output() done = new EventEmitter()
  @Output() closed = new EventEmitter()
  @Input() ID: number
  @Input() PID: number
  @Input() formType: string
  @Input() formObj: any
  @Input() personList: string[]
  @Input() idList: string[]
  @Input() selectedPersonelNF: any
  
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

  clearHkm() {
    this.form.controls.RuleID_Fld.patchValue(null)
    this.form.controls.RuleIDDesc_Fld.patchValue(null)
  }
  clearPayCode() {
    this.form.controls.PayCode_Fld.patchValue(null)
    this.form.controls.PayCodeDesc_Fld.patchValue(null)
  }

  showCommission: boolean = false
  onShowCommissionBackPay() { this.showCommission = true }

  closeCommission() { this.showCommission = false }

  commissionChanged(commission) {
    this.closeCommission()
    this.form.controls.RuleID_Fld.patchValue(commission.Id)
    this.form.controls.RuleIDDesc_Fld.patchValue(commission.HokmIDDesc)
  }


  clearCostCenter() {
    this.form.controls.CostCenter1_Fld.patchValue(null)
    this.form.controls.CostCenter1Desc_Fld.patchValue(null)
  }

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

  post() {
    this.form.patchValue({ Id: 0 })
    if (this.personList.length == 0) this.form.controls.PersonIDCollect_Fld.patchValue(null)
    else {
      this.form.controls.PersonID_Fld.patchValue(0)
      this.form.controls.PersonIDCollect_Fld.patchValue(this.personList)
    }
    if (this.form.controls.PersonMissionInfoDetail.value) this.form.controls.PersonMissionInfoDetail.value.forEach(e => e.Id == 1 ? e.Id = 0 : null)
    this.service.post(`${Controller}/Create`, this.form.getRawValue()).subscribe((res: any) => this.done.emit(this.personList.length == 0 ? 'single' : 'multi'))
  }

  put() {
    if (this.idList.length == 0) {
      this.form.controls.IDCollect_Fld.patchValue(null)
      this.service.post(`${Controller}/Update`, this.form.getRawValue()).subscribe(_ => this.done.emit('single'))
    }
    else {
      this.form.controls.Id.patchValue(0)
      this.form.controls.PersonID_Fld.patchValue(0)
      this.form.controls.IDCollect_Fld.patchValue(this.idList)
      let model = this.form.getRawValue()
      model.FieldChanged_Fld = this.fieldChange.toString()
      this.service.post(`${Controller}/UpdateAll`, model).subscribe(_ => this.done.emit('multi'))
    }
  }

  form: UntypedFormGroup
  showForm: boolean = false
  setForm() {
    Validation.form = this.formObj
    this.form = this.formBuilder.group({
      Id: [0],
      Year_Fld: [Year_Fld],
      Month_Fld: [Month_Fld],
      PersonID_Fld: [this.PID],
      MissionTypeDesc_Fld: ['درجه 2'],
      MissionType_Fld: [{ value: 100382, disabled: Validation.disable('MissionType_Fld') }, Validation.setValidator('MissionType_Fld')],
      CommissionNumber_Fld: [{ value: null, disabled: Validation.disable('CommissionNumber_Fld') }, Validation.setValidator('CommissionNumber_Fld')],
      LetterNo_Fld: [{ value: null, disabled: Validation.disable('LetterNo_Fld') }, Validation.setValidator('LetterNo_Fld')],
      CommissionDate_Fld: [{ value: null, disabled: Validation.disable('CommissionDate_Fld') }, Validation.setValidator('CommissionDate_Fld')],
      BeginDate_Fld: [{ value: null, disabled: Validation.disable('BeginDate_Fld') }, Validation.setValidator('BeginDate_Fld')],
      EndDate_Fld: [{ value: null, disabled: Validation.disable('EndDate_Fld') }, Validation.setValidator('EndDate_Fld')],
      BeginTime_Fld: [{ value: null, disabled: Validation.disable('BeginTime_Fld') }, Validation.setValidator('BeginTime_Fld')],
      EndTime_Fld: [{ value: null, disabled: Validation.disable('EndTime_Fld') }, Validation.setValidator('EndTime_Fld')],
      Commission_Fld: [{ value: null, disabled: Validation.disable('Commission_Fld') }, Validation.setValidator('Commission_Fld')],
      CommissionDaily_Fld: [{ value: null, disabled: Validation.disable('CommissionDaily_Fld') }, Validation.setValidator('CommissionDaily_Fld')],
      CommissionHour_Fld: [{ value: null, disabled: Validation.disable('CommissionHour_Fld') }, Validation.setValidator('CommissionHour_Fld')],
      CommissionFactor_Fld: [{ value: null, disabled: Validation.disable('CommissionFactor_Fld') }, Validation.setValidator('CommissionFactor_Fld')],
      PlaceCodeSourceDesc_Fld: [null],
      PlaceCodeSource_Fld: [{ value: null, disabled: Validation.disable('PlaceCodeSource_Fld') }, Validation.setValidator('PlaceCodeSource_Fld')],
      PlaceCodeDesc_Fld: [null],
      PlaceCode_Fld: [{ value: null, disabled: Validation.disable('PlaceCode_Fld') }, Validation.setValidator('PlaceCode_Fld')],
      Distance_Fld: [{ value: null, disabled: Validation.disable('Distance_Fld') }, Validation.setValidator('Distance_Fld')],
      Driver_Fld: [{ value: null, disabled: Validation.disable('Driver_Fld') }, Validation.setValidator('Driver_Fld')],
      DrivingFactor_Fld: [{ value: null, disabled: Validation.disable('DrivingFactor_Fld') }, Validation.setValidator('DrivingFactor_Fld')],
      TransportTypeDesc_Fld: [null],
      TransportType_Fld: [{ value: null, disabled: Validation.disable('TransportType_Fld') }, Validation.setValidator('TransportType_Fld')],
      TransportType1Desc_Fld: [null],
      TransportType1_Fld: [{ value: null, disabled: Validation.disable('TransportType1_Fld') }, Validation.setValidator('TransportType1_Fld')],
      TaminMaskan_Fld: [{ value: null, disabled: Validation.disable('TaminMaskan_Fld') }, Validation.setValidator('TaminMaskan_Fld')],
      MaskanFactor_Fld: [{ value: null, disabled: Validation.disable('MaskanFactor_Fld') }, Validation.setValidator('MaskanFactor_Fld')],
      PayCodeDesc_Fld: [null],
      PayCode_Fld: [{ value: null, disabled: Validation.disable('PayCode_Fld') }, Validation.setValidator('PayCode_Fld')],
      CommissionHardPercent_Fld: [{ value: null, disabled: Validation.disable('CommissionHardPercent_Fld') }, Validation.setValidator('CommissionHardPercent_Fld')],
      RateHourOpt_Fld: [{ value: null, disabled: Validation.disable('RateHourOpt_Fld') }, Validation.setValidator('RateHourOpt_Fld')],
      CommissionTPercent_Fld: [{ value: null, disabled: Validation.disable('CommissionTPercent_Fld') }, Validation.setValidator('CommissionTPercent_Fld')],
      CommissionDesc_Fld: [{ value: null, disabled: Validation.disable('CommissionDesc_Fld') }, Validation.setValidator('CommissionDesc_Fld')],
      NoDesc_Fld: [null],
      No_Fld: [{ value: null, disabled: Validation.disable('No_Fld') }, Validation.setValidator('No_Fld')],
      SabtDate_Fld: [{ value: null, disabled: Validation.disable('SabtDate_Fld') }, Validation.setValidator('SabtDate_Fld')],
      FractionPrice_Fld: [{ value: null, disabled: Validation.disable('FractionPrice_Fld') }, Validation.setValidator('FractionPrice_Fld')],
      RateWithPlace_Fld: [{ value: null, disabled: Validation.disable('RateWithPlace_Fld') }, Validation.setValidator('RateWithPlace_Fld')],
      RateWithoutPlace_Fld: [{ value: null, disabled: Validation.disable('RateWithoutPlace_Fld') }, Validation.setValidator('RateWithoutPlace_Fld')],
      RateWithPlaceOpt_Fld: [{ value: null, disabled: Validation.disable('RateWithPlaceOpt_Fld') }, Validation.setValidator('RateWithPlaceOpt_Fld')],
      RateWithoutPlaceOpt_Fld: [{ value: null, disabled: Validation.disable('RateWithoutPlaceOpt_Fld') }, Validation.setValidator('RateWithoutPlaceOpt_Fld')],
      CostCenter1Desc_Fld: [null],
      CostCenter1_Fld: [{ value: null, disabled: Validation.disable('CostCenter1_Fld') }, Validation.setValidator('CostCenter1_Fld')],
      ParentID_Fld: [null],
      PayTypeDesc_Fld: [null],
      PayType_Fld: [{ value: null, disabled: Validation.disable('PayType_Fld') }, Validation.setValidator('PayType_Fld')],
      Price_Fld: [{ value: null, disabled: Validation.disable('Price_Fld') }, Validation.setValidator('Price_Fld')],
      PersonMissionInfoDetail: [null],
      PersonIDCollect_Fld: [null],
      IDCollect_Fld: [null],
      RuleIDDesc_Fld: [null],
      RuleID_Fld: [{ value: null, disabled: Validation.disable('RuleID_Fld') }, Validation.setValidator('RuleID_Fld')],
      FormType:[{value: this.formType}]
    })
    this.formType != 'Add' ? this.form.patchValue(this.data) : null
    this.PersonMissionInfoDetail = this.form.value.PersonMissionInfoDetail
  }

  PersonMissionInfoDetail

  save() {
    if (this.form.invalid) return this.controlService.isSubmitted = true

    if (this.formType == 'Add') return this.post()

    if (this.formType == 'Edit') this.put()
  }

  close() {
    this.closed.emit()
  }

  showCostCenterModal: boolean = false
  activeCostCenterTreeName: string
  onShowCostCenterModal(fieldName) {
    this.activeCostCenterTreeName = fieldName
    this.showCostCenterModal = true
  }

  closedCostCenterModal() { this.showCostCenterModal = false }

  nodeSelected(node) {
    if (node.Id && this.activeCostCenterTreeName == 'PayCode_Fld') {
      this.form.controls.PayCode_Fld.patchValue(node.Id)
      this.form.controls.PayCodeDesc_Fld.patchValue(node.name)
    }
    else {
      this.form.controls.CostCenter1_Fld.patchValue(node.Id)
      this.form.controls.CostCenter1Desc_Fld.patchValue(node.name)
    }
    this.showCostCenterModal = false
  }

  changeDriver() {
    if (this.form.controls.Driver_Fld.value) {
      this.form.controls.Distance_Fld.enable()
      this.form.controls.DrivingFactor_Fld.enable()
    }
    else {
      this.form.controls.Distance_Fld.patchValue(null)
      this.form.controls.DrivingFactor_Fld.patchValue(null)
      this.form.controls.Distance_Fld.disable()
      this.form.controls.DrivingFactor_Fld.disable()
    }
  }

  changeStartEndDate() {
    this.form.controls.Commission_Fld.patchValue(null)
    this.form.controls.CommissionDaily_Fld.patchValue(null)
    let beganDate = this.form.controls.BeginDate_Fld.value
    let endDate = this.form.controls.EndDate_Fld.value
    if (beganDate && endDate) {
      let convertedDate = Validation.CalculateDiffer2Date(beganDate, endDate, 'D')
      if (convertedDate.Day < 0) {
        this.form.controls.EndDate_Fld.patchValue(null)
        return this.toastr.error('تاریخ پایان نمیتواند کوچکتر از تاریخ شروع باشد', 'خطا')
      }
      this.service.post(`${Controller}/GetDayNight`, {FldString1: beganDate, FldString2: endDate}).subscribe((res: any) => 
      {
        if (res.Data)
        {
          this.form.controls.Commission_Fld.patchValue(res.Data.FldInt1)
          this.form.controls.CommissionDaily_Fld.patchValue(res.Data.FldInt2)
        }
      }
      )
    }
  }

  showFormDetail: boolean = false
  multiEdit: boolean = false
  async buildForm() {
    this.showFormDetail = false
    this.idList.length > 0 ? this.multiEdit = true : this.multiEdit = false
    if (this.personList.length > 0 || this.idList.length > 0) {
      this.setForm()
      this.form.reset()
      this.multiEdit ? Object.keys(this.form.controls).forEach(a => this.changeCheckbox(false, a)) : null
      this.form.controls.Year_Fld.patchValue(Year_Fld)
      this.form.controls.Month_Fld.patchValue(Month_Fld)
      if (this.formType == 'Edit') this.form.controls.IDCollect_Fld.patchValue(this.idList)
    }
    else {
      if (this.formType != 'Add') {
        await this.getById()
        this.setForm()
        this.form.patchValue(this.data)
        this.changeDriver()
      }
      else {
        this.setForm()
        this.form.controls.Id.patchValue(0)
        this.form.controls.Year_Fld.patchValue(Year_Fld)
        this.form.controls.Month_Fld.patchValue(Month_Fld)
      }
    }
    this.showForm = true
    this.showFormDetail = true
    setTimeout(() => this.service.scrollToElement('form'), 300)
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

  detailChange(dataDetail) { this.form.controls.PersonMissionInfoDetail.patchValue(dataDetail) }

  constructor(private controlService: ControlMessageService, private service: GridFormService, private formBuilder: UntypedFormBuilder, private toastr: ToastrService) { }

  ngOnChanges(UpdatedValue: string): void { this.buildForm() }

}
