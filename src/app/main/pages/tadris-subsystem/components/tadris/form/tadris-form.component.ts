import { Component, Output, EventEmitter, Input } from '@angular/core'
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms'
import { ControlMessageService } from 'src/app/main/main-body/common/custom-form/control-message/control-message.service'
import { GridFormService } from 'src/app/main/main-body/common/grid-form.service'
import { Validation } from 'src/app/main/main-body/common/custom-form/control-message/Validation'
import { HttpClient } from '@angular/common/http'
import { environment } from 'src/environments/environment'

const Controller = 'Tadris'
class ITermEdu{
  Term? : any
  TermDesc?: any
  Edu?: any
  EduDesc?: any    
}

@Component({
  selector: 'tadris-form',
  templateUrl: './tadris-form.component.html',
  styleUrls: ['./tadris-form.component.scss']
})
export class TadrisFormComponent {

  @Output() done = new EventEmitter()
  @Output() closed = new EventEmitter()
  @Output() TermEduChanged = new EventEmitter()
  @Input() ID: number
  @Input() PID: number
  @Input() formType: string
  @Input() formObj: any
  @Input() personList: any[]
  @Input() idList: any[]
  @Input() selectedPersonelNF: any
  @Input() TermEdu: any
  
  data: any = {}
  rowDataPayTadris = []
  rowDataFractionTadris = []
  TermDesc: string
  EduDesc: string

  showListNoForm: boolean = false
  
  onAddList(){
    this.showListNoForm = false
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
  
  ChangeComboDesc(event: any, Type: string){
    Type == 'Term' ?  this.TermDesc = event : this.EduDesc = event
  }
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
    if (this.personList.length == 0) this.form.controls.PersonIDCollect_Fld.patchValue(this.form.controls.PersonID_Fld.value)
    else {
      this.form.controls.PersonID_Fld.patchValue(0)
      this.form.controls.PersonIDCollect_Fld.patchValue(this.personList)
    }
    let TermEdu: ITermEdu = {
      Term : this.form.controls.Term_Fld.value, 
      Edu : this.form.controls.EduYear_Fld.value,
      TermDesc: this.TermDesc, 
      EduDesc: this.EduDesc, 
    }

    this.service.post(`${Controller}/Create`, this.form.getRawValue()).subscribe((res: any) => this.done.emit(this.personList.length == 0 ? 'single' : 'multi')) 
    this.TermEduChanged.emit(TermEdu)
  }

  put() { this.service.post(`${Controller}/Update`, this.form.getRawValue()).subscribe((res: any) => { res && res.IsSuccess ? this.done.emit(res.Data) : null }) }

  form: UntypedFormGroup
  showForm: boolean = false
  async setForm() {
    let WeekInTerm = (await this.http.get(`${environment.API_URL}${Controller}/GetWeekInTerm`).toPromise()) as any;

    !this.TermEdu ?  this.TermEdu = {Edu : null, Term: null, EduDesc: null, TermDesc: null} : null
    if (this.formType == 'Add' )
    {
      if (this.TermEdu.TermDesc) {this.data.TermDesc_Fld = this.TermEdu.TermDesc 
        this.TermDesc = this.TermEdu.TermDesc}
      if (this.TermEdu.EduDesc) {this.data.EduYearDesc_Fld = this.TermEdu.EduDesc
        this.EduDesc = this.TermEdu.EduDesc}
    }
        

    Validation.form = this.formObj
    this.form = this.formBuilder.group({
      Id: [0],
      PersonID_Fld: [this.PID],
      SabtDate_Fld: [{ value: null, disabled: Validation.disable('SabtDate_Fld') }, Validation.setValidator('SabtDate_Fld')],
      NoDesc_Fld: [null],
      No_Fld: [{ value: null, disabled: Validation.disable('No_Fld') }, Validation.setValidator('No_Fld')],
      TermDesc_Fld: [null],
      Term_Fld: [{ value: this.TermEdu.Term, disabled: Validation.disable('Term_Fld') }, Validation.setValidator('Term_Fld')],
      EduYearDesc_Fld: [null],
      EduYear_Fld: [{ value: this.TermEdu.Edu, disabled: Validation.disable('EduYear_Fld') }, Validation.setValidator('EduYear_Fld')],
      FromDate_Fld: [{ value: null, disabled: Validation.disable('FromDate_Fld') }, Validation.setValidator('FromDate_Fld')],
      ToDate_Fld: [{ value: null, disabled: Validation.disable('ToDate_Fld') }, Validation.setValidator('ToDate_Fld')],
      CostcenterDesc_Fld: [null],
      Costcenter_Fld: [{ value: null, disabled: Validation.disable('Costcenter_Fld') }, Validation.setValidator('Costcenter_Fld')],
      TermWeekNum_Fld: [{ value: WeekInTerm.Data, disabled: Validation.disable('TermWeekNum_Fld') }, Validation.setValidator('TermWeekNum_Fld')],
      RuleIDDesc_Fld: [null],
      RuleID_Fld: [{ value: null, disabled: Validation.disable('RuleID_Fld') }, Validation.setValidator('RuleID_Fld')],
      Distance_Fld: [{ value: null, disabled: Validation.disable('Distance_Fld') }, Validation.setValidator('Distance_Fld')],
      DistanceZarib_Fld: [{ value: null, disabled: Validation.disable('DistanceZarib_Fld') }, Validation.setValidator('DistanceZarib_Fld')],
      ElseZarib_Fld: [{ value: null, disabled: Validation.disable('ElseZarib_Fld') }, Validation.setValidator('ElseZarib_Fld')],
      Desc_Fld: [{ value: null, disabled: Validation.disable('Desc_Fld') }, Validation.setValidator('Desc_Fld')],
      TadrisDetail: [null],
      TadrisDetailFraction: [null],
      StudentNames_Fld: [{ value: null, disabled: Validation.disable('StudentNames_Fld') }, Validation.setValidator('StudentNames_Fld')],
      PersonIDCollect_Fld: [null],
      IDCollect_Fld: [null],
      FormType:[{value: this.formType}]
    })
    this.formType != 'Add' ? this.form.patchValue(this.data) : null

    this.changeDistance()
    this.showForm = true
  }

  changeDistance() { 
    this.form.controls.Distance_Fld.value ? this.form.controls.DistanceZarib_Fld.enable() : this.form.controls.DistanceZarib_Fld.disable() 
    // setTimeout(() => { this.service.scrollToElement("form") }, 200)
  }

  save() {
    if (this.form.invalid) return this.controlService.isSubmitted = true

    !this.form.controls.TadrisDetail.value || this.form.controls.TadrisDetail.value[0].Id == 0 ? this.form.controls.TadrisDetail.patchValue([]) : null
    !this.form.controls.TadrisDetailFraction.value || this.form.controls.TadrisDetailFraction.value[0].Id == 0 ? this.form.controls.TadrisDetailFraction.patchValue([]) : null

    if (this.formType == 'Add') return this.post()

    if (this.formType == 'Edit') this.put()
  }

  close() { this.closed.emit() }

  showCommission: boolean = false
  onShowCommissionBackPay() { this.showCommission = true }

  closeCommission() { this.showCommission = false }

  commissionChanged(commission) {
    this.closeCommission()
    this.form.controls.RuleID_Fld.patchValue(commission.Id)
    this.form.controls.RuleIDDesc_Fld.patchValue(commission.HokmIDDesc)
  }

  clearHkm() {
    this.form.controls.RuleID_Fld.patchValue(null)
    this.form.controls.RuleIDDesc_Fld.patchValue(null)
  }

  showTreeModal: boolean = false
  onShowCostCenterModal() { this.showTreeModal = true }

  clearCost() {
    this.form.controls.Costcenter_Fld.patchValue(null)
    this.form.controls.CostcenterDesc_Fld.patchValue(null)
  }

  nodeSelected(node) {
    if (node.Id) {
      this.form.controls.Costcenter_Fld.patchValue(node.Id)
      this.form.controls.CostcenterDesc_Fld.patchValue(node.name)
    }
    this.showTreeModal = false
  }

  emitedFraction(list) {
    this.form.controls.TadrisDetailFraction.patchValue(list)
  }

  emitedPay(list) {
    this.form.controls.TadrisDetail.patchValue(list)
  }

  multiEdit: boolean = false
  async buildForm() {
    this.idList.length > 0 ? this.multiEdit = true : this.multiEdit = false

    if (this.personList.length > 0 || this.idList.length > 0) {
      this.fieldChange = []
      this.setForm()
      this.multiEdit ? Object.keys(this.form.controls).forEach(a => this.changeCheckbox(false, a)) : null
      if (this.formType == 'Edit') this.form.controls.IDCollect_Fld.patchValue(this.idList)
    }
    else
    {
      if (this.formType != 'Add')  await this.getById()
        this.setForm()
    }

    setTimeout(() => {
      this.service.scrollToElement('tadris-form')
    }, 800); 
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

  constructor(private http: HttpClient, private controlService: ControlMessageService, private service: GridFormService, private formBuilder: UntypedFormBuilder) { }

  ngOnChanges(UpdatedValue: string): void { 
    this.buildForm() 
  }

}
