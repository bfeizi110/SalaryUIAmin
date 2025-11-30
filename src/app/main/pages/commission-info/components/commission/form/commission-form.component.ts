import { ToastrService } from 'ngx-toastr';
import { Component, Output, EventEmitter, Input, ViewChild, ElementRef } from '@angular/core'
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms'
import { ControlMessageService } from 'src/app/main/main-body/common/custom-form/control-message/control-message.service'
import { GridFormService } from 'src/app/main/main-body/common/grid-form.service'
import { Validation } from 'src/app/main/main-body/common/custom-form/control-message/Validation'
import { HttpClient } from '@angular/common/http'
import { environment } from 'src/environments/environment'
import { showFile } from 'src/app/main/main-body/common/constants'


@Component({
  selector: 'commission-form',
  templateUrl: './commission-form.component.html',
  styleUrls: ['./commission-form.component.scss']
})
export class CommissionFormComponent {

  @Output() done = new EventEmitter()
  @Output() commissionStateChange = new EventEmitter()
  @Output() closed = new EventEmitter()
  @Input() ID: number
  @Input() PID: number
  @Input() formType: string
  @Input() formObj: any
  @Input() controller: string
  @Input() selectedPersonelNF: any
  @Input() personList: any[]

  IsMultiple: boolean = false
  @ViewChild("myElem") MyProp: ElementRef;
  
  canEditState: boolean = false
  getAttrChangeStateComm() { this.service.getAttr(`CommissionChgStateHistory`).subscribe((res: any) => this.canEditState = res.Data.EntityAccess.includes('EditPolicy')) }

  data: any = {}
  getByLastComm() {
    return new Promise((resolve, reject) => {
      this.service.get(`${this.controller}/GetLastComm/${this.PID}/${this.ID}/${this.formType == 'Edit'}`).subscribe((res: any) => {
        if (res) {
          this.data = res.Data
          this.data.Id = 0
          this.data.PID = this.PID
          return resolve(true)
        }
        else {
          this.done.emit(false)
          return reject()
        }
      })
    })
  }

  getById() {
    return new Promise((resolve, reject) => {
      this.service.getById(this.controller, this.ID, this.formType).toPromise().then((res: any) => {
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
    if (this.personList == null || this.personList.length == 0) this.form.controls.PersonIDCollect_Fld.patchValue(null)
    else {
      this.form.controls.PID.patchValue(0)
      this.form.controls.PersonIDCollect_Fld.patchValue(this.personList)
      this.form.controls.FieldChanged_Fld.patchValue(this.fieldChange.toString())
    }
    return new Promise((resolve, reject) => {
      this.service.post(`${this.controller}/Create`, this.form.getRawValue()).toPromise().then((res: any) => {
        if (res && res.IsSuccess) {
          this.data = res.Data
          this.done.emit(this.personList == null || this.personList.length == 0 ? 'single' : 'multi')
          this.IsMultiple = false
          this.fieldChange = null
          resolve(true)
        }
        else {
          reject()
        }
      })
    })


    // this.service.post(this.controller, this.form.getRawValue()).subscribe(_ => this.done.emit(this.personList == null || this.personList.length == 0 ? 'single' : 'multi'))

    // this.IsMultiple = false
    // this.fieldChange = null
  }

  put() { 
    this.service.post(`${this.controller}/Update`, this.form.getRawValue()).subscribe((res: any) => 
      {
        if (res && res.IsSuccess)
          this.done.emit(res.Data)
      }
      ) 
  }

  form: UntypedFormGroup
  showForm: boolean = false
  paramData: { ParamList: [], SumParams: number, PercentSum: number } = { ParamList: null, SumParams: null, PercentSum: null }
  setForm() {
    this.showForm = false
    Validation.form = this.formObj
    this.form = this.formBuilder.group({
      Id: [0],
      PID: [this.PID],
      HireTypeIDDesc: [null],
      HireTypeID: [{ value: null, disabled: Validation.disable('HireTypeID') }, Validation.setValidator('HireTypeID')],
      GradeLicenseIDDesc: [null],
      GradeLicenseID: [{ value: null, disabled: Validation.disable('GradeLicenseID') }, Validation.setValidator('GradeLicenseID')],
      MajorSubjectIDDesc: [null],
      MajorSubjectID: [{ value: null, disabled: Validation.disable('MajorSubjectID') }, Validation.setValidator('MajorSubjectID')],
      OrgIDDesc: [null],
      OrgID: [{ value: null, disabled: Validation.disable('OrgID') }, Validation.setValidator('OrgID')],
      ResidentUnitIDDesc: [null],
      ResidentUnitID: [{ value: null, disabled: Validation.disable('ResidentUnitID') }, Validation.setValidator('ResidentUnitID')],
      OstanIDDesc: [null],
      OstanID: [{ value: null, disabled: Validation.disable('OstanID') }, Validation.setValidator('OstanID')],
      CityIDDesc: [null],
      CityID: [{ value: null, disabled: Validation.disable('CityID') }, Validation.setValidator('CityID')],
      VillageIDDesc: [null],
      VillageID: [{ value: null, disabled: Validation.disable('VillageID') }, Validation.setValidator('VillageID')],
      PostIDDesc: [null],
      PostID: [{ value: null, disabled: Validation.disable('PostID') }, Validation.setValidator('PostID')],
      PostEjraIDDesc: [null],
      PostEjraID: [{ value: null, disabled: Validation.disable('PostEjraID') }, Validation.setValidator('PostEjraID')],
      WorkHistory: [{ value: null, disabled: Validation.disable('WorkHistory') }, Validation.setValidator('WorkHistory')],
      BimehHistory: [{ value: null, disabled: Validation.disable('BimehHistory') }, Validation.setValidator('BimehHistory')],
      Date_Register: [{ value: null, disabled: Validation.disable('Date_Register') }, Validation.setValidator('Date_Register')],
      Date_Exe: [{ value: null, disabled: Validation.disable('Date_Exe') }, Validation.setValidator('Date_Exe')],
      Cont_StartDate: [{ value: null, disabled: Validation.disable('Cont_StartDate') }, Validation.setValidator('Cont_StartDate')],
      Cont_FinishDate: [{ value: null, disabled: Validation.disable('Cont_FinishDate') }, Validation.setValidator('Cont_FinishDate')],
      GroupTotal: [{ value: null, disabled: Validation.disable('GroupTotal') }, Validation.setValidator('GroupTotal')],
      CommissionDesc: [{ value: null, disabled: Validation.disable('CommissionDesc') }, Validation.setValidator('CommissionDesc')],
      SanavatIDDesc: [null],
      SanavatID: [{ value: null, disabled: Validation.disable('SanavatID') }, Validation.setValidator('SanavatID')],
      GradeIDDesc: [null],
      GradeID: [{ value: null, disabled: Validation.disable('GradeID') }, Validation.setValidator('GradeID')],
      HireStageIDDesc: [null],
      HireStageID: [{ value: null, disabled: Validation.disable('HireStageID') }, Validation.setValidator('HireStageID')],
      HireStateIDDesc: [null],
      HireStateID: [{ value: null, disabled: Validation.disable('HireStateID') }, Validation.setValidator('HireStateID')],
      HireStatusFrom: [{ value: null, disabled: Validation.disable('HireStatusFrom') }, Validation.setValidator('HireStatusFrom')],
      HireStatusTo: [{ value: null, disabled: Validation.disable('HireStatusTo') }, Validation.setValidator('HireStatusTo')],
      HokmNo: [{ value: null, disabled: Validation.disable('HokmNo') }, Validation.setValidator('HokmNo')],
      MarriedIDDesc: [null],
      MarriedID: [{ value: null, disabled: Validation.disable('MarriedID') }, Validation.setValidator('MarriedID')],
      SumPayeh: [{ value: null, disabled: Validation.disable('SumPayeh') }, Validation.setValidator('SumPayeh')],
      NewSumPayeh: [{ value: null, disabled: Validation.disable('NewSumPayeh') }, Validation.setValidator('NewSumPayeh')],
      NewGradeIDDesc: [null],
      NewGradeID: [{ value: null, disabled: Validation.disable('NewGradeID') }, Validation.setValidator('NewGradeID')],
      PercentSum: [{ value: null, disabled: Validation.disable('PercentSum') }, Validation.setValidator('PercentSum')],
      LastMsrt: [{ value: null, disabled: Validation.disable('LastMsrt') }, Validation.setValidator('LastMsrt')],
      SumParams: [{ value: null, disabled: Validation.disable('SumParams') }, Validation.setValidator('SumParams')],
      GradeKhIDDesc: [null],
      GradeKhID: [{ value: null, disabled: Validation.disable('GradeKhID') }, Validation.setValidator('GradeKhID')],
      EmzaDate: [{ value: null, disabled: Validation.disable('EmzaDate') }, Validation.setValidator('EmzaDate')],
      SignerPIDDesc: [null],
      SignerPID: [{ value: null, disabled: Validation.disable('SignerPID') }, Validation.setValidator('SignerPID')],
      NewMChild: [{ value: null, disabled: Validation.disable('NewMChild') }, Validation.setValidator('NewMChild')],
      RuleStateDesc_Fld: [null],
      RuleState_Fld: [{ value: null, disabled: Validation.disable('RuleState_Fld') }, Validation.setValidator('RuleState_Fld')],
      IsPayroll: [{ value: true, disabled: Validation.disable('IsPayroll') }, Validation.setValidator('IsPayroll')],
      CommParam: [null],
      HokmIDDesc: [null],
      HokmID: [{ value: null, disabled: Validation.disable('HokmID') }, Validation.setValidator('HokmID')],
      CommStatusIDDesc: [null],
      CommStatusID: [{ value: null, disabled: Validation.disable('CommStatusID') }, Validation.setValidator('CommStatusID')],
      JobName: [{ value: null, disabled: Validation.disable('JobName') }, Validation.setValidator('JobName')],
      CatMajorName: [{ value: null, disabled: Validation.disable('CatMajorName') }, Validation.setValidator('CatMajorName')],

      PersonIDCollect_Fld: [null],
      FieldChanged_Fld: [null],
      FormType:[{value: this.formType}]
    })
    this.form.patchValue(this.data)
    this.cityUrl = `city/${this.data.OstanID}`
    this.villageUrl = `city/${this.data.CityID}`
    this.showParam = false
    this.paramData.SumParams = this.data.SumParams
    this.paramData.ParamList = this.data.CommParam
    this.paramData.PercentSum = this.data.PercentSum
    setTimeout(() => this.showParam = true)
    setTimeout(() => this.showForm = true)
    this.changeOrgId()
    if (!this.IsMultiple)
      setTimeout(() => {
        this.MyProp.nativeElement.scrollIntoView({ behavior: "smooth", block: "start" });    
      }, 250); 
  }

  fieldChange: string[] = []
  feizi: boolean = true
  changeCheckbox(enabled: boolean, fieldName: string) {
    if (!this.formObj[fieldName]) return // || this.formObj[fieldName].type == 'date'
    if (this.formObj[fieldName].disableInput && this.IsMultiple)
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

  showParam: boolean = false

  save() {
    if (this.form.invalid && !this.IsMultiple) return this.controlService.isSubmitted = true

    if (this.formType == 'Add') return this.post()

    if (this.formType == 'Edit') this.put()
  }

  close() {
    this.closed.emit()
  }

  showTreeModal: boolean = false
  onShowCostCenterModal() {
    this.showTreeModal = true
  }

  clearOrg() {
    this.form.controls.OrgID.patchValue(null)
    this.form.controls.OrgIDDesc.patchValue(null)
  }

  closedTreeModal() { this.showTreeModal = false }

  nodeSelected(node) {
    if (node.Id) {
      this.form.controls.OrgID.patchValue(node.Id)
      this.form.controls.OrgIDDesc.patchValue(node.name)
    }
    this.showTreeModal = false
    this.changeOrgId()
  }

  postUrl: string = ''
  changeOrgId() {
    if (this.form.controls.OrgID.value) {
      this.form.controls.PostID.enable()
      this.postUrl = `*Post/GetComboNew/${this.form.controls.OrgID.value}`
    }
    else {
      this.form.controls.PostID.patchValue(null)
      this.form.controls.PostID.disable()
    }
  }

  cityUrl: string = null
  cityList = []
  changeOstan(id) {
    this.cityUrl = `city/${id}`
    this.form.controls.CityID.patchValue(null)
    this.form.controls.CityIDDesc.patchValue(null)
    this.form.controls.VillageID.patchValue(null)
    this.form.controls.VillageIDDesc.patchValue(null)
  }

  villageUrl: string = null
  changeCity(id) {
    this.villageUrl = `city/${id}`
    this.form.controls.VillageID.patchValue(null)
    this.form.controls.VillageIDDesc.patchValue(null)
  }

  onShowRuleState() { this.showCommissionStatus = true }

  showCommissionStatus: boolean = false
  closedCommissionStatus() {
    this.showCommissionStatus = false
  }

  statusSelected(event) {
    this.form.controls.RuleState_Fld.patchValue(event.Id)
    this.form.controls.RuleStateDesc_Fld.patchValue(event.CodeDesc_Fld)
    this.showCommissionStatus = false
  }

  chnageHireType(id) {
    this.service.get(`${this.controller}/GetParamByHireType/${id}`).subscribe((res: any) => {
      this.paramData.ParamList = res.Data
      this.form.controls.CommParam.patchValue(res.Data)
    })
  }

  doneCommissionState() {
    this.commissionStateChange.emit()
    this.getById()
    this.showCommissionStatus = false
  }

  showInputCommDesc: boolean = false
  onClickCommDesc() { this.showInputCommDesc = true }

  async buildForm() {
    if (this.personList != null && this.personList.length > 0) 
    {
      this.IsMultiple = true
      this.PID = 0
    }
    if ((this.formType == 'View' || this.formType == 'Edit') && !this.IsMultiple) {
      await this.getById()
      this.getAttrChangeStateComm()
    }
    else if (this.formType == 'Add' && !this.IsMultiple) await this.getByLastComm()
    this.setForm()
    this.IsMultiple ? Object.keys(this.form.controls).forEach(a => this.changeCheckbox(false, a)) : null
  }

  async onPrintView(e) {
    let file = (await this.http.post(`${environment.API_URL}${this.controller}/GetHokmImage`, this.ID.toString()).toPromise()) as any;
    if (file.Data.Item2 == false)
        this.toastr.error(file.Data.Item3);
    else
      showFile(file.Data.Item1[0].FileData);
  }  
  constructor(private http: HttpClient, private controlService: ControlMessageService, private service: GridFormService, private formBuilder: UntypedFormBuilder, private toastr: ToastrService) { }

  activeTabIndex: number = 0
  ngOnChanges(UpdatedValue: any): void { this.buildForm() }

}

