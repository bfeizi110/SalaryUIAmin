import { Component, Output, EventEmitter, Input, ViewChild, ElementRef } from '@angular/core'
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms'
import { ControlMessageService } from 'src/app/main/main-body/common/custom-form/control-message/control-message.service'
import { GridFormService } from 'src/app/main/main-body/common/grid-form.service'
import { Validation } from 'src/app/main/main-body/common/custom-form/control-message/Validation'
import { ToastrService } from 'ngx-toastr'

const Controller = 'BackpayDetail'

@Component({
  selector: 'backpay-detail-form',
  templateUrl: './backpay-detail-form.component.html',
  styleUrls: ['./backpay-detail-form.component.scss']
})
export class BackpayDetailFormComponent {

  @Output() done = new EventEmitter()
  @Output() closed = new EventEmitter()
  @Input() ID: number
  @Input() PID: number
  @Input() formType: string
  @Input() formObj: any
  @Input() personList: any[]
  @Input() idList: any[]
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

  ParamData: any[]
  WorkAddingData: any[]
  FractionData: any[]

  submitedParam(newData) {
    this.ParamData = newData
  }

  submitedWorkAdding(newData) {
    this.WorkAddingData = newData
  }

  submitedFraction(newData) {
    this.FractionData = newData
  }

  clearHkm() {
    this.form.controls.IdHkm_Fld.patchValue(null)
    this.form.controls.IdHkmDesc_Fld.patchValue(null)
  }

  clearHkm1() {
    this.form.controls.IdHkm_Fld1.patchValue(null)
    this.form.controls.IdHkmDesc_Fld1.patchValue(null)
  }

  getNewAttr() {
    return new Promise(resolve => {
      this.service.get(`${Controller}/GetMultipleSelectAttribute`).subscribe((res: any) => {
        this.formObj = res.Data.EntityAttribute
        return resolve(true)
      })
    })
  }

  getNewAttr2() {
    return new Promise(resolve => {
      this.service.get(`${Controller}/GetBackPaySemiSelectAllUpdateAttribute`).subscribe((res: any) => {
        this.formObj = res.Data.EntityAttribute
        return resolve(true)
      })
    })
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
    if (this.personList.length == 0) 
    {
      this.form.controls.PersonIDCollect_Fld.patchValue(null)
      let list = ["BackPayID_Fld", "IdHkm_Fld", "IdHkm_Fld1", "IdHkmDesc_Fld", "IdHkmDesc_Fld1", "FromDate_Fld", "UntilDate_Fld", "BackPayType_Fld", "BackPayTypeDesc_Fld", "BackPayDesc_Fld", "No_Fld", "CalcHgh_Fld",
        "CalcNM_Fld",
        "NotCalcMogh_Fld",
        "CalcRolesOnNow_Fld",
        "CalcInfoOnNow_Fld",
        "CalcRolesOnNow_Fld1",
        "CalcInfoOnNow_Fld1",
        "Id",
        "PersonIDCollect_Fld"
      ]
      const filteredColumnObj: any = Object.keys(this.form.getRawValue()).filter(key => list.includes(key)).reduce((obj, key) => {
        obj[key] = this.form.getRawValue()[key]
        return obj
      }, {})
      let formValue = this.form.getRawValue()
      formValue.PersonIDCollect_Fld = this.PID.toString()
      this.service.post(`${Controller}/Create`, formValue).subscribe(_ => this.done.emit(this.personList.length == 0 ? 'single' : 'multi'))
    }
    else 
    {
      this.form.controls.PersonIDCollect_Fld.patchValue(this.personList.toString())
      let formValue = this.form.getRawValue()
      if (this.ParamData) formValue.BackPayHokmParamManualSelectDtos = this.ParamData
      if (this.FractionData) formValue.BackPayHokmFractionManualSelectDtos = this.FractionData
      if (this.WorkAddingData) formValue.BackPayWorkAddingSelectDtos = this.WorkAddingData
      this.service.post(`${Controller}/CreateMultiple`, formValue).subscribe(_ => this.done.emit('multi'))
      this.showDetail = false
    }
  }

  put() {
    if (this.idList.length == 0) {
      let list = ["BackPayID_Fld", "IdHkm_Fld", "IdHkm_Fld1", "IdHkmDesc_Fld", "IdHkmDesc_Fld", "IdHkmDesc_Fld1", "FromDate_Fld", "UntilDate_Fld", "BackPayType_Fld", "BackPayTypeDesc_Fld", "BackPayDesc_Fld", "No_Fld", "CalcHgh_Fld",
        "CalcNM_Fld",
        "NotCalcMogh_Fld",
        "CalcRolesOnNow_Fld",
        "CalcInfoOnNow_Fld",
        "CalcRolesOnNow_Fld1",
        "CalcInfoOnNow_Fld1",
        "Id",
        "PersonIDCollect_Fld",
        "CalcM_Fld"
      ]
      let filteredColumnObj: any = Object.keys(this.form.getRawValue()).filter(key => list.includes(key)).reduce((obj, key) => {
        obj[key] = this.form.getRawValue()[key]
        return obj
      }, {})
      filteredColumnObj.PersonIDCollect_Fld = this.PID.toString()
      this.service.post(`${Controller}/Update`, filteredColumnObj).subscribe(_ => this.done.emit('single'))
    }//this.form.controls.IDCollect_Fld.patchValue(null)
    else {
      this.form.controls.Id.patchValue(0)
      this.form.controls.PersonIDCollect_Fld.patchValue(0)
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
      BackPayID_Fld: [null],
      IdHkmDesc_Fld: [null],
      IdHkm_Fld: [{ value: null, disabled: Validation.disable('IdHkm_Fld') }, Validation.setValidator('IdHkm_Fld')],
      IdHkmDesc_Fld1: [null],
      IdHkm_Fld1: [{ value: null, disabled: Validation.disable('IdHkm_Fld1') }, Validation.setValidator('IdHkm_Fld1')],
      FromDate_Fld: [{ value: null, disabled: Validation.disable('FromDate_Fld') }, Validation.setValidator('FromDate_Fld')],
      UntilDate_Fld: [{ value: null, disabled: Validation.disable('UntilDate_Fld') }, Validation.setValidator('UntilDate_Fld')],
      TotalDay_Fld: [{ value: null, disabled: Validation.disable('TotalDay_Fld') }, Validation.setValidator('TotalDay_Fld')],
      CalcYear_Fld: [{ value: null, disabled: Validation.disable('CalcYear_Fld') }, Validation.setValidator('CalcYear_Fld')],
      CalcMonth_Fld: [{ value: null, disabled: Validation.disable('CalcMonth_Fld') }, Validation.setValidator('CalcMonth_Fld')],
      CalcRoleYear_Fld: [{ value: null, disabled: Validation.disable('CalcRoleYear_Fld') }, Validation.setValidator('CalcRoleYear_Fld')],
      CalcRoleYear_Fld1: [{ value: null, disabled: Validation.disable('CalcRoleYear_Fld1') }, Validation.setValidator('CalcRoleYear_Fld1')],
      CalcRoleMonth_Fld: [{ value: null, disabled: Validation.disable('CalcRoleMonth_Fld') }, Validation.setValidator('CalcRoleMonth_Fld')],
      CalcRoleMonth_Fld1: [{ value: null, disabled: Validation.disable('CalcRoleMonth_Fld1') }, Validation.setValidator('CalcRoleMonth_Fld1')],
      CalcInfoYear_Fld: [{ value: null, disabled: Validation.disable('CalcInfoYear_Fld') }, Validation.setValidator('CalcInfoYear_Fld')],
      CalcInfoYear_Fld1: [{ value: null, disabled: Validation.disable('CalcInfoYear_Fld1') }, Validation.setValidator('CalcInfoYear_Fld1')],
      CalcInfoMonth_Fld: [{ value: null, disabled: Validation.disable('CalcInfoMonth_Fld') }, Validation.setValidator('CalcInfoMonth_Fld')],
      CalcInfoMonth_Fld1: [{ value: null, disabled: Validation.disable('CalcInfoMonth_Fld1') }, Validation.setValidator('CalcInfoMonth_Fld1')],
      BackPayTypeDesc_Fld: [null],
      BackPayType_Fld: [{ value: null, disabled: Validation.disable('BackPayType_Fld') }, Validation.setValidator('BackPayType_Fld')],
      BackPayDesc_Fld: [{ value: null, disabled: Validation.disable('BackPayDesc_Fld') }, Validation.setValidator('BackPayDesc_Fld')],
      NoDesc_Fld: [null],
      No_Fld: [{ value: null, disabled: Validation.disable('No_Fld') }, Validation.setValidator('No_Fld')],
      CalcHgh_Fld: [{ value: true, disabled: Validation.disable('CalcHgh_Fld') }, Validation.setValidator('CalcHgh_Fld')],
      CalcM_Fld: [{ value: null, disabled: Validation.disable('CalcM_Fld') }, Validation.setValidator('CalcM_Fld')],
      CalcNM_Fld: [{ value: null, disabled: Validation.disable('CalcNM_Fld') }, Validation.setValidator('CalcNM_Fld')],
      NotCalcMogh_Fld: [{ value: null, disabled: Validation.disable('NotCalcMogh_Fld') }, Validation.setValidator('NotCalcMogh_Fld')],
      CalcRolesOnNow_Fld: [{ value: null, disabled: Validation.disable('CalcRolesOnNow_Fld') }, Validation.setValidator('CalcRolesOnNow_Fld')],
      CalcInfoOnNow_Fld: [{ value: null, disabled: Validation.disable('CalcInfoOnNow_Fld') }, Validation.setValidator('CalcInfoOnNow_Fld')],
      CalcRolesOnNow_Fld1: [{ value: null, disabled: Validation.disable('CalcRolesOnNow_Fld1') }, Validation.setValidator('CalcRolesOnNow_Fld1')],
      CalcInfoOnNow_Fld1: [{ value: null, disabled: Validation.disable('CalcInfoOnNow_Fld1') }, Validation.setValidator('CalcInfoOnNow_Fld1')],
      PrevYearAuto_Fld: [{ value: null, disabled: Validation.disable('PrevYearAuto_Fld') }, Validation.setValidator('PrevYearAuto_Fld')],
      PrevMonthAuto_Fld: [{ value: null, disabled: Validation.disable('PrevMonthAuto_Fld') }, Validation.setValidator('PrevMonthAuto_Fld')],
      NowYearAuto_Fld: [{ value: null, disabled: Validation.disable('NowYearAuto_Fld') }, Validation.setValidator('NowYearAuto_Fld')],
      NowMonthAuto_Fld: [{ value: null, disabled: Validation.disable('NowMonthAuto_Fld') }, Validation.setValidator('NowMonthAuto_Fld')],
      CalcOnMonthDailyEarning_Fld: [{ value: null, disabled: Validation.disable('CalcOnMonthDailyEarning_Fld') }, Validation.setValidator('CalcOnMonthDailyEarning_Fld')],
      PersonIDCollect_Fld: [null],
      IDCollect_Fld: [null],
      FormType:[{value: this.formType}]
    })
  }

  save() {
    this.form.controls.PersonIDCollect_Fld.patchValue(this.personList)
    if (this.form.invalid) return this.controlService.isSubmitted = true

    if (!this.checkFromUntilDateValidation()) return this.toastr.error('تاریخ پایان نمیتواند کوچکتر از تاریخ شروع باشد', 'خطا')

    if (this.formType == 'Add') return this.post()

    if (this.formType == 'Edit') this.put()
  }

  checkFromUntilDateValidation(): boolean {
    if (this.personList.length != 0) {
      let fromDate = this.form.getRawValue().FromDate_Fld
      let untilDate = this.form.getRawValue().UntilDate_Fld

      if (fromDate > untilDate) return false
      else return true
    }
    return true
  }

  showCommissionBackPay: boolean = false
  activeCommission: number
  onShowCommissionBackPay(activeCommission: number) {
    this.activeCommission = activeCommission
    this.showCommissionBackPay = true
  }

  closeCommissionBackPay() { this.showCommissionBackPay = false }

  commissionChanged(commission) {
    this.closeCommissionBackPay()
    let hokmDesc: string = commission.HokmIDDesc
    let date: string = commission.Date_Exe
    let sumParams: string = commission.SumParams
    let commissionSelectedDesc = `${hokmDesc} -- ${date} -- ${sumParams}`
    if (this.activeCommission == 0) {
      this.form.controls.IdHkm_Fld.patchValue(commission.Id)
      this.form.controls.IdHkmDesc_Fld.patchValue(commissionSelectedDesc)
    }
    else {
      this.form.controls.IdHkm_Fld1.patchValue(commission.Id)
      this.form.controls.IdHkmDesc_Fld1.patchValue(commissionSelectedDesc)
    }
  }

  close() { 
    this.showDetail = false
    this.closed.emit() 
  }

  yearList = []
  monthList = []
  monthList1 = []

  getYear() { this.yearList.length == 0 ? this.service.get('YearMonth/GetYear').subscribe((res: any) => this.yearList = res.Data) : null }

  changeYear(id, i) {
    this.service.get(`YearMonth/GetMonth/${id}`).subscribe((res: any) => {
      const data = res.Data
      i == 0 ? this.monthList = data : this.monthList1 = data
    })
  }

  backPayType: any
  IsMultiple: boolean = false
  changeBackpayType() {
    if (this.form.controls.BackPayType_Fld.value == 100203) {
      this.form.controls.IdHkm_Fld.clearValidators()
      this.form.controls.IdHkm_Fld1.clearValidators()
      this.form.controls.PrevYearAuto_Fld.clearValidators()
      this.form.controls.PrevYearAuto_Fld.updateValueAndValidity();
      this.form.controls.PrevMonthAuto_Fld.clearValidators()
      this.form.controls.PrevMonthAuto_Fld.updateValueAndValidity()
      this.form.controls.NowYearAuto_Fld.clearValidators()
      this.form.controls.NowYearAuto_Fld.updateValueAndValidity()
      this.form.controls.NowMonthAuto_Fld.clearValidators()
      this.form.controls.NowMonthAuto_Fld.updateValueAndValidity()
      this.formObj.PrevYearAuto_Fld ? this.formObj.PrevYearAuto_Fld.ishidden = true : null
      this.formObj.IdHkmDesc_Fld ? this.formObj.IdHkmDesc_Fld.ishidden = true : null
      this.formObj.IdHkmDesc_Fld1 ? this.formObj.IdHkmDesc_Fld1.ishidden = true : null
      this.formObj.CalcHgh_Fld ? this.formObj.CalcHgh_Fld.ishidden = true : null
      this.formObj.CalcM_Fld? this.formObj.CalcM_Fld.ishidden = true : null
      this.formObj.CalcNM_Fld ? this.formObj.CalcNM_Fld.ishidden = true : null
      this.formObj.NotCalcMogh_Fld ? this.formObj.NotCalcMogh_Fld.ishidden = true : null
      this.formObj.CalcOnMonthDailyEarning_Fld ? this.formObj.CalcOnMonthDailyEarning_Fld.ishidden = true : null
      this.form.controls.IdHkm_Fld.patchValue(null)
      this.form.controls.IdHkm_Fld1.patchValue(null)
      this.form.controls.IdHkmDesc_Fld.patchValue(null)
      this.form.controls.IdHkmDesc_Fld1.patchValue(null)
      if (this.formType == 'Add') this.showDetail = true
      this.semiBackpaySelectedId = this.ID ?? 0
      if (this.personList.length == 0 ) this.personList[0] = this.PID
    }
    else {
      this.form.controls.IdHkm_Fld1.setValidators(Validation.required())
      this.form.controls.IdHkm_Fld.setValidators(Validation.required())
      this.formObj.IdHkm_Fld ? this.formObj.IdHkm_Fld.require = true : null 
      this.formObj.IdHkm_Fld1 ? this.formObj.IdHkm_Fld1.require = true : null
      this.formObj.PrevYearAuto_Fld ? this.formObj.PrevYearAuto_Fld.ishidden = false : null
      this.formObj.IdHkmDesc_Fld ? this.formObj.IdHkmDesc_Fld.ishidden = false : null
      this.formObj.IdHkmDesc_Fld1 ? this.formObj.IdHkmDesc_Fld1.ishidden = false : null
      this.formObj.CalcHgh_Fld ? this.formObj.CalcHgh_Fld.ishidden = false : null
      this.formObj.CalcM_Fld ? this.formObj.CalcM_Fld.ishidden = false : null
      this.formObj.CalcNM_Fld ? this.formObj.CalcNM_Fld.ishidden = false : null
      this.formObj.NotCalcMogh_Fld ? this.formObj.NotCalcMogh_Fld.ishidden = false : null
      this.formObj.CalcOnMonthDailyEarning_Fld ? this.formObj.CalcOnMonthDailyEarning_Fld.ishidden = false : null
      this.showDetail = false
    }
    this.IsMultiple = this.personList.length != 0 ? true : false
    this.backPayType = this.form.controls.BackPayType_Fld.value
  }

  orginalFormObj: any
  showDetail: boolean = false
  semiBackpaySelectedId: any
  multiEdit: boolean = false
  async buildForm() {
    this.showDetail = false
    this.idList.length > 0 ? this.multiEdit = true : this.multiEdit = false
    this.orginalFormObj = this.formObj
    if (this.personList.length > 0 || this.idList.length > 0) {
      this.personList.length > 0 ? await this.getNewAttr() : await this.getNewAttr2()
      this.setForm()
      this.multiEdit ? Object.keys(this.form.controls).forEach(a => this.changeCheckbox(false, a)) : null
      if (this.formType == 'Edit') this.form.controls.IDCollect_Fld.patchValue(this.idList)
    }
    else {
      this.formObj = this.orginalFormObj
      if (this.formType != 'Add') {
        await this.getById()
        this.setForm()
        this.form.patchValue(this.data)
      }
      else {
        this.setForm()
        this.form.controls.Id.patchValue(0)
      }
      this.changeBackpayType()
    }
    this.showForm = true
    setTimeout(() => {
      this.MyProp.nativeElement.scrollIntoView({ behavior: "smooth", block: "start" });    
    }, 250);     
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

  changeIdHokmRules(ckecked) {
    // this.formObj.IdHkmDesc_Fld.ishidden = true
    if (ckecked) {
      this.form.controls.IdHkm_Fld.clearAsyncValidators()
      this.form.controls.IdHkm_Fld.disable()
      this.form.controls.IdHkm_Fld.patchValue(null)
      this.form.controls.IdHkmDesc_Fld.patchValue(null)
      this.formObj.IdHkm_Fld.require = false
    }
    else {
      this.form.controls.IdHkm_Fld.enable()
      this.form.controls.IdHkm_Fld.setValidators(Validation.required())
      this.formObj.IdHkm_Fld.require = true
    }
    setTimeout(() => this.formObj.IdHkmDesc_Fld.ishidden = false, 100)
  }

  constructor(private controlService: ControlMessageService, private service: GridFormService, private formBuilder: UntypedFormBuilder, private toastr: ToastrService) { }

  ngOnChanges(UpdatedValue: string): void { this.buildForm() }

}
