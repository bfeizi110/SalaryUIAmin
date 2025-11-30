import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core'
import { FormBuilder, FormGroup } from '@angular/forms'
import { of } from 'rxjs'
import { delay } from 'rxjs/operators'
import { CustomGridOption } from 'src/app/main/main-body/common/custom-ag-grid/interfaces/ag-grid-option.interface'

import { ControlMessageService } from 'src/app/main/main-body/common/custom-form/control-message/control-message.service'
import { Validation } from 'src/app/main/main-body/common/custom-form/control-message/Validation'
import { GridFormService } from 'src/app/main/main-body/common/grid-form.service'
import { setWorkFlowFormDetailAccessAttr, setWorkFlowRoleAccessAttr, setWorkFlowUserAccessAttr, WorkFlowFormDetailAccessAttr, WorkFlowRoleAccessAttr, WorkFlowUserAccessAttr } from 'src/app/main/pages/global-attr'

const Controller = 'WorkFlowDetails'
const UserAccessController = 'WorkFlowDetailsUserAccess'
const RoleAccessController = 'WorkFlowDetailsRoleAccess'
const FormDetailAccessController = 'WorkFlowDetailsFormDetailsAccess'

@Component({
  selector: 'workflow-details-form',
  templateUrl: './workflow-details-form.component.html',
  styleUrls: ['./workflow-details-form.component.scss']
})
export class WorkFlowDetailsFormComponent {

  @Output() done = new EventEmitter()
  @Output() closed = new EventEmitter()
  @Input() ID: number
  @Input() WorkFlowID: number
  @Input() formType: string
  @Input() formObj: any

  @ViewChild("myElem") MyProp: ElementRef;
  
  comboList = [{Id: 1, CodeDesc_Fld: 'کاربر'},{Id: 2, CodeDesc_Fld:'گروه کاربری'}]
  showGridAccess: boolean = false
  showFDetailGridAccess: boolean = false
  showGridNotAccess: boolean = false
  showFDetailGridNotAccess: boolean = false
  showGrids: boolean = false
  showFDetailGrids: boolean = false
  comboId: number
  gridOptionAccess = <CustomGridOption>{ checkboxSelection: true, rowSelected: this.rowSelectedAccess.bind(this) }
  gridOptionNotAccess = <CustomGridOption>{ checkboxSelection: true, rowSelected: this.rowSelectedNotAccess.bind(this) }
  gridOptionFDetailAccess = <CustomGridOption>{ checkboxSelection: true, rowSelected: this.rowSelectedFDetailAccess.bind(this) }
  gridOptionFDetailNotAccess = <CustomGridOption>{ checkboxSelection: true, rowSelected: this.rowSelectedFDetailNotAccess.bind(this) }
  comboUrl: string

  async comboChange(id) {
    this.selectedAcccessList = []
    this.selectedNotAcccessList = []
    this.closeGrids()
    this.comboId = id
    await this.getAccessAttr()
  }

  getSelect() {
    this.selectedAcccessList = []
    this.selectedNotAcccessList = []
    this.getSelectAccess(this.comboId)
    this.getSelectNotAccess(this.comboId)
  }

  getSelectFDetail() {
    this.closeFDetailGrids()
    this.getFDetailAccessAttr()
    this.selectedFDetailAcccessList = []
    this.selectedFDetailNotAcccessList = []
  }

  closeFDetailGrids() {
    this.showFDetailGridAccess = false
    this.showFDetailGridNotAccess = false
    this.showFDetailGrids = false
  }

  closeGrids() {
    this.showGridAccess = false
    this.showGridNotAccess = false
    this.showGrids = false
  }

  openGrids() { this.showGrids = true }

  getSelectAccess(type: number) {
    let url: string
    url = type == 1 ? `${UserAccessController}` : `${RoleAccessController}`
    this.service.getSelect(url, this.ID).subscribe((res: any) => {
      this.gridOptionAccess.rowData = res.Data
      of(null).pipe(
        delay(0)
      ).subscribe(() => {
        this.openGrids()
        this.showGridAccess = true
      });   
    })
  }

  getSelectNotAccess(type: number) {
    let url: string
    url = type == 1 ? `${UserAccessController}/GetSelectNotAccess` : `${RoleAccessController}/GetSelectNotAccess`
    this.service.getByIdSimple(url, this.ID).subscribe((res: any) => {
      this.gridOptionNotAccess.rowData = res.Data
      of(null).pipe(
        delay(0)
      ).subscribe(() => {
        this.openGrids()
        this.showGridNotAccess = true
      });   
    })
  }

  getSelectFDetailAccess() {
    this.service.getByIdSimple(`${FormDetailAccessController}/GetSelectAccess`, this.ID).subscribe((res: any) => {
      this.gridOptionFDetailAccess.rowData = res.Data
      of(null).pipe(
        delay(0)
      ).subscribe(() => {
        this.showFDetailGridAccess = true
        });      
    })
  }

  getSelectFDetailNotAccess() {
    this.service.getByIdSimple(`${FormDetailAccessController}/GetSelectNotAccess`, this.ID).subscribe((res: any) => {
      this.gridOptionFDetailNotAccess.rowData = res.Data
      of(null).pipe(
        delay(0)
      ).subscribe(() => {
        this.showFDetailGridNotAccess = true
        });   
    })
  }  
  selectedAcccessList = []
  rowSelectedAccess(event) { this.selectedAcccessList.includes(event.data) ? this.selectedAcccessList = this.selectedAcccessList.filter(a => a != event.data) : this.selectedAcccessList.push(event.data) }

  selectedNotAcccessList = []
  rowSelectedNotAccess(event) { this.selectedNotAcccessList.includes(event.data) ? this.selectedNotAcccessList = this.selectedNotAcccessList.filter(a => a != event.data) : this.selectedNotAcccessList.push(event.data) }

  selectedFDetailAcccessList = []
  rowSelectedFDetailAccess(event) { this.selectedFDetailAcccessList.includes(event.data) ? this.selectedFDetailAcccessList = this.selectedFDetailAcccessList.filter(a => a != event.data) : this.selectedFDetailAcccessList.push(event.data) }

  selectedFDetailNotAcccessList = []
  rowSelectedFDetailNotAccess(event) { this.selectedFDetailNotAcccessList.includes(event.data) ? this.selectedFDetailNotAcccessList = this.selectedFDetailNotAcccessList.filter(a => a != event.data) : this.selectedFDetailNotAcccessList.push(event.data) }

  model: { WorkFlowDetailID_Fld: number, ClaimStr?: string, RoleID_Fld: number, UserID_Fld: number}
  addAccess() {
    if (this.selectedNotAcccessList.length == 0) return
    let ClaimStr = []
    this.selectedNotAcccessList.forEach(e => ClaimStr.push(e.Id))
    this.model = { ClaimStr: ClaimStr.toString(), WorkFlowDetailID_Fld: this.ID, RoleID_Fld: 0, UserID_Fld: 0 } 
    this.service.post( this.comboId == 1 ? `${UserAccessController}/CreateAll` : `${RoleAccessController}/CreateAll`, this.model).subscribe(_ => this.getAccessAttr())
  }

  removeAccess() {
    if (this.selectedAcccessList.length == 0) return
    let ids = []
    this.selectedAcccessList.forEach(e => ids.push(e.Id))
    this.service.deleteByBody(this.comboId == 1 ? `${UserAccessController}/DeleteAll` : `${RoleAccessController}/DeleteAll`, { Id: ids.toString() }).subscribe(_ => this.getAccessAttr())
  }

  addFDetailAccess() {
    if (this.selectedFDetailNotAcccessList.length == 0) return
    this.service.post(`${FormDetailAccessController}/CreateAll` , this.selectedFDetailNotAcccessList).subscribe(_ => this.getSelectFDetail())
  }

  removeFDetailAccess() {
    if (this.selectedFDetailAcccessList.length == 0) return
    let ids = []
    this.selectedFDetailAcccessList.forEach(e => ids.push(e.Id))
    this.service.deleteByBody(`${FormDetailAccessController}/DeleteAll` , { Id: ids.toString() }).subscribe(_ => this.getSelectFDetail())
  }

  tabIndex: number
  tabChanged($event){
    this.tabIndex = $event.index
  }

  data: any = {}
  getById() {
    let promise = new Promise((resolve, reject) => {
      this.service.get(`${Controller}/${this.ID}/${this.formType == 'Edit'}`).toPromise().then((res: any) => {
        if (res && res.Data) {
          this.data = res.Data
          this.data.ReferBackToWorkFlowDetailID_Fld ? this.data.ReferBackToWorkFlowDetailID_Fld = this.data.ReferBackToWorkFlowDetailID_Fld.split(',').map(i => Number(i)) : null
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

  fixNotificationType(form) { if (form.NotificationTypes_Fld) form.NotificationTypes_Fld = form.NotificationTypes_Fld.toString() }
  getNotificationType() { if (this.form.controls.NotificationTypes_Fld.value) this.form.controls.NotificationTypes_Fld.patchValue(this.form.controls.NotificationTypes_Fld.value.split(',').map(i => Number(i))) }

  fixSlackGroup(form) { if (form.SlackGroupID_Fld) form.SlackGroupID_Fld = form.SlackGroupID_Fld.toString() }
  getSlackGroup() { if (this.form.controls.SlackGroupID_Fld.value) this.form.controls.SlackGroupID_Fld.patchValue(this.form.controls.SlackGroupID_Fld.value.split(',').map(i => Number(i))) }

  fixUserID(form) { 
    if (form.SmsUserID_Fld) form.SmsUserID_Fld = form.SmsUserID_Fld.toString() 
    if (form.EmailUserID_Fld) form.EmailUserID_Fld = form.EmailUserID_Fld.toString() 
    if (form.SlackUserID_Fld) form.SlackUserID_Fld = form.SlackUserID_Fld.toString() 
  }
  getUserID() { 
    if (this.form.controls.SmsUserID_Fld.value) this.form.controls.SmsUserID_Fld.patchValue(this.form.controls.SmsUserID_Fld.value.split(',').map(i => Number(i))) 
    if (this.form.controls.EmailUserID_Fld.value) this.form.controls.EmailUserID_Fld.patchValue(this.form.controls.EmailUserID_Fld.value.split(',').map(i => Number(i))) 
    if (this.form.controls.SlackUserID_Fld.value) this.form.controls.SlackUserID_Fld.patchValue(this.form.controls.SlackUserID_Fld.value.split(',').map(i => Number(i))) 
  }


  post(fakeFormValue) {
    this.service.post(`${Controller}/Create`, fakeFormValue).subscribe((res: any) => this.done.emit(res.Data)) 
  }

  put(fakeFormValue) {this.service.post(`${Controller}/Update`, fakeFormValue).subscribe((res: any) => this.done.emit(res.Data)) }

  form: FormGroup
  setForm() {
    Validation.form = this.formObj
    this.form = this.formBuilder.group({
      Id: [0],
      WorkFlowID_Fld: [this.WorkFlowID],
      CodeDesc_Fld: [{ value: null, disabled: Validation.disable('CodeDesc_Fld') }, Validation.setValidator('CodeDesc_Fld')],
      StartWorkFlow_Fld: [{ value: null, disabled: Validation.disable('StartWorkFlow_Fld') }, Validation.setValidator('StartWorkFlow_Fld')],
      EndWorkFlow_Fld: [{ value: null, disabled: Validation.disable('EndWorkFlow_Fld') }, Validation.setValidator('EndWorkFlow_Fld')],
      AllUsersAccess_Fld: [{ value: null, disabled: Validation.disable('AllUsersAccess_Fld') }, Validation.setValidator('AllUsersAccess_Fld')],
      RejectToWorkFlowDetailID_Fld: [{ value: null, disabled: Validation.disable('RejectToWorkFlowDetailID_Fld') }, Validation.setValidator('RejectToWorkFlowDetailID_Fld')],
      RejectToWorkFlowDetailIDDesc_Fld: [null],
      CanCancelByCreator_Fld: [{ value: null, disabled: Validation.disable('CanCancelByCreator_Fld') }, Validation.setValidator('CanCancelByCreator_Fld')],
      CanReferBack_Fld: [{ value: null, disabled: Validation.disable('CanReferBack_Fld') }, Validation.setValidator('CanReferBack_Fld')],
      ReferBackToWorkFlowDetailID_Fld: [{ value: null, disabled: Validation.disable('ReferBackToWorkFlowDetailID_Fld') }, Validation.setValidator('ReferBackToWorkFlowDetailID_Fld')],
      HasNotification_Fld: [{ value: null, disabled: Validation.disable('HasNotification_Fld') }, Validation.setValidator('HasNotification_Fld')],
      NotificationTypes_Fld: [{ value: null, disabled: Validation.disable('NotificationTypes_Fld') }, Validation.setValidator('NotificationTypes_Fld')],
      SlackGroupID_Fld: [{ value: null, disabled: Validation.disable('SlackGroupID_Fld') }, Validation.setValidator('SlackGroupID_Fld')],
      SlackUserID_Fld: [{ value: null, disabled: Validation.disable('SlackUserID_Fld') }, Validation.setValidator('SlackUserID_Fld')],
      SmsUserID_Fld: [{ value: null, disabled: Validation.disable('SmsUserID_Fld') }, Validation.setValidator('SmsUserID_Fld')],
      EmailUserID_Fld: [{ value: null, disabled: Validation.disable('EmailUserID_Fld') }, Validation.setValidator('EmailUserID_Fld')],
      FormType:[{value: this.formType}]

    })
  }

  notificationList = []
  getNotificationList() { this.notificationList.length == 0 ? this.service.getCombo('OtherDetail/10127').subscribe((res: any) => this.notificationList = res.Data) : null }
 
  slackList = []
  getSlackGroupList() { this.slackList.length == 0 ? this.service.getCombo('SlackGroup').subscribe((res: any) => this.slackList = res.Data) : null }

  UserList = []
  smsUserList = []
  emailUserList = []
  slackUserList = []
  getUserList() { 
    if (this.UserList.length == 0) {
      this.service.getCombo('*Users/GetSmsEmailOtherUserList/1').subscribe((res: any) => {
        this.UserList = res.Data
        this.smsUserList = res.Data.filter(a => a.HaveSms)
        this.emailUserList = res.Data.filter(a => a.HaveEmail)
        this.slackUserList = res.Data.filter(a => a.HaveSlack)
      })
    } 
  }
  save() {
    
    if (this.formType == 'Add') this.form.patchValue({ Id: 0 })
    let fakeFormValue = { ...this.form.getRawValue() }

    this.fixNotificationType(fakeFormValue)
    this.fixSlackGroup(fakeFormValue)
    this.fixUserID(fakeFormValue)

    if (fakeFormValue.ReferBackToWorkFlowDetailID_Fld) fakeFormValue.ReferBackToWorkFlowDetailID_Fld = fakeFormValue.ReferBackToWorkFlowDetailID_Fld.toString()

    if (this.form.invalid) return this.controlService.isSubmitted = true

    if (this.formType == 'Add') return this.post(fakeFormValue)

    if (this.formType == 'Edit') this.put(fakeFormValue)
  }

  close() {
    this.closed.emit()
  }

  setAccessAttr(attr, type?) {
    this.gridOptionAccess.columnDefs  = attr
    this.gridOptionNotAccess.columnDefs  = attr

    type == 'toLocal' ? this.comboId == 1 ? setWorkFlowUserAccessAttr(attr) : setWorkFlowRoleAccessAttr(attr) : null
    this.getSelect()
  }
  
  getAccessAttr() {
    this.closeGrids()
    let Attr = this.comboId == 1 ? WorkFlowUserAccessAttr() : WorkFlowRoleAccessAttr()
    !Attr 
    ? this.service.getAttr(this.comboId == 1 ? UserAccessController : RoleAccessController).subscribe((res: any) => this.setAccessAttr(res.Data, 'toLocal'))
    : this.setAccessAttr(Attr)
  }

  setFDetailAccessAttr(attr, type?) {
    this.gridOptionFDetailAccess.columnDefs  = attr
    this.gridOptionFDetailNotAccess.columnDefs  = attr

    type == 'toLocal' ? setWorkFlowFormDetailAccessAttr(attr) : null
    this.showFDetailGrids = true
    this.getSelectFDetailAccess()
    this.getSelectFDetailNotAccess()

  }

  getFDetailAccessAttr() {
    let Attr = WorkFlowFormDetailAccessAttr()
    !Attr 
    ? this.service.getAttr(FormDetailAccessController).subscribe((res: any) => this.setFDetailAccessAttr(res.Data, 'toLocal'))
    : this.setFDetailAccessAttr(Attr)
  }

  showForm: boolean = false
  multiEdit: boolean = false
  workflowdetailList: any

  async buildForm() {
    this.setForm()
    if (this.formType != 'Add') {
      await this.getById()
      this.getSelectFDetail()
      this.form.patchValue(this.data)
      this.getNotificationType()
      this.getSlackGroup()
      this.getUserID()
      this.comboUrl = `WorkFlowDetails/${this.WorkFlowID}/${this.data.Id}`
    }
    else
      this.comboUrl = `WorkFlowDetails/${this.WorkFlowID}/0`

    this.service.getCombo(this.comboUrl).toPromise().then((res: any) => {
      this.workflowdetailList = res.Data
    })
  
    this.getNotificationList()
    this.getSlackGroupList()
    this.getUserList()
    this.showForm = true
    setTimeout(() => {
      this.MyProp.nativeElement.scrollIntoView({ behavior: "smooth", block: "start" });    
    }, 250); 
  }

  constructor(private controlService: ControlMessageService, private service: GridFormService, private formBuilder: FormBuilder) { }

  ngOnChanges(UpdatedValue: any): void {  this.buildForm()  }

}
