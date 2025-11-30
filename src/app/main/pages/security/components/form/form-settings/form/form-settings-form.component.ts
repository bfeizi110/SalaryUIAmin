import { Component, EventEmitter, Input, Output } from '@angular/core'
import { FormBuilder, FormGroup } from '@angular/forms'

import { ControlMessageService } from 'src/app/main/main-body/common/custom-form/control-message/control-message.service'
import { Validation } from 'src/app/main/main-body/common/custom-form/control-message/Validation'
import { ModalOptions } from 'src/app/main/main-body/common/custom-modal/modal-options.interface'
import { GridFormService } from 'src/app/main/main-body/common/grid-form.service'

const Controller = 'FormSettings'

@Component({
  selector: 'form-settings-form',
  templateUrl: './form-settings-form.component.html',
  styleUrls: ['./form-settings-form.component.scss']
})
export class FormSettingsFormComponent {

  @Output() done = new EventEmitter()
  @Output() closed = new EventEmitter()
  @Input() FormID: number
  @Input() ID: number
  @Input() formType: string
  @Input() formObj: any
  @Input() EntityName: string
  @Input() DynamicFormType: number

  data: any = {}
  EntityPropertyList: any
  OrderList: any
  MessageDesc_Fld: any
  get() {
    this.service.getById(Controller, this.ID, this.formType).toPromise().then((res: any) => {
      if (!res || !res.Data) return this.done.emit(false)
      else {
        this.data = res.Data
        this.setForm()
      }
    })
  }

  put(fakeFormValue) { this.service.post(`${Controller}/Update`, fakeFormValue).subscribe((res: any) => this.done.emit(res.Data)) }
  
  post(fakeFormValue) { 
    this.service.post(`${Controller}/Create`, fakeFormValue).subscribe((res: any) => this.done.emit(res.Data)) 
  }
  form: FormGroup
  setForm() {
    Validation.form = this.formObj
    this.form = this.formBuilder.group({
      Id: [0],
      FormID_Fld: [this.FormID],
      Type_Fld: [{ value: null, disabled: Validation.disable('Type_Fld') }, Validation.setValidator('Type_Fld')],
      TypeDesc_Fld: [null],
      FormulaDesc_Fld: [{ value: null, disabled: Validation.disable('FormulaDesc_Fld') }, Validation.setValidator('FormulaDesc_Fld')],
      Message_Fld: [{ value: null, disabled: Validation.disable('Message_Fld') }, Validation.setValidator('Message_Fld')],
      HasNotification_Fld: [{ value: null, disabled: Validation.disable('HasNotification_Fld') }, Validation.setValidator('HasNotification_Fld')],
      NotificationTypes_Fld: [{ value: null, disabled: Validation.disable('NotificationTypes_Fld') }, Validation.setValidator('NotificationTypes_Fld')],
      SlackGroupID_Fld: [{ value: null, disabled: Validation.disable('SlackGroupID_Fld') }, Validation.setValidator('SlackGroupID_Fld')],
      SlackUserID_Fld: [{ value: null, disabled: Validation.disable('SlackUserID_Fld') }, Validation.setValidator('SlackUserID_Fld')],
      SmsUserID_Fld: [{ value: null, disabled: Validation.disable('SmsUserID_Fld') }, Validation.setValidator('SmsUserID_Fld')],
      EmailUserID_Fld: [{ value: null, disabled: Validation.disable('EmailUserID_Fld') }, Validation.setValidator('EmailUserID_Fld')],

      FormType:[{value: this.formType}]

    })

    if (this.formType != 'Add') {
      this.form.patchValue(this.data) 
      this.getNotificationType()
      this.getSlackGroup()
      this.getUserID()
    }
    this.service.getCombo(`*EntityProperty/GetComboNew/${this.EntityName}`).toPromise().then((res: any) => {
      this.EntityPropertyList = res.Data
      if (this.form.controls.Type_Fld.value == 101216 && this.formType != 'Add')
        this.form.controls.FormulaDesc_Fld.value ? this.form.controls.FormulaDesc_Fld.patchValue(this.form.controls.FormulaDesc_Fld.value.split(',').map(i => Number(i))) : null 
    })
    this.service.getCombo(`OtherDetail/10122`).toPromise().then((res: any) => {
      this.OrderList = res.Data
      if (this.form.controls.Type_Fld.value == 101216 && this.formType != 'Add')
        this.MessageDesc_Fld = this.form.controls.Message_Fld.value ? this.OrderList.find(p => p.Id == this.form.controls.Message_Fld.value)?.CodeDesc_Fld : null 
    })

    this.getNotificationList()
    this.getSlackGroupList(this.form.controls.Type_Fld.value == 101217 ? "2" : "0")
    this.getUserList(this.form.controls.Type_Fld.value == 101217 ? "2" : "0")
    this.showModal = true
  }

  changeType(e){
    this.getSlackGroupList(this.form.controls.Type_Fld.value == 101217 ? "2" : "0")
    this.getUserList(this.form.controls.Type_Fld.value == 101217 ? "2" : "0")
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


  notificationList = []
  getNotificationList() { this.notificationList.length == 0 ? this.service.getCombo('OtherDetail/10127').subscribe((res: any) => this.notificationList = res.Data) : null }
 
  slackList = []
  getSlackGroupList(slackType) { this.service.getCombo('SlackGroup').subscribe((res: any) => this.slackList = res.Data)}

  UserList = []
  smsUserList = []
  emailUserList = []
  slackUserList = []
  getUserList(userType) { 
    if (this.UserList.length == 0) {
      this.service.getCombo(`*Users/GetSmsEmailOtherUserList/${userType}`).subscribe((res: any) => {
        this.UserList = res.Data
        this.smsUserList = res.Data.filter(a => a.HaveSms)
        this.emailUserList = res.Data.filter(a => a.HaveEmail)
        this.slackUserList = res.Data.filter(a => a.HaveSlack)
      })
    } 
  }

  save() {
    if ((this.form.controls.Type_Fld.value >= 101211 && this.form.controls.Type_Fld.value <= 101216) || this.form.controls.Type_Fld.value == 101218 || this.form.controls.Type_Fld.value == 101219)
    {
      this.form.controls.FormulaDesc_Fld.setValidators(Validation.required())
      this.form.controls.FormulaDesc_Fld.updateValueAndValidity()
    }
    else
    {
      this.form.controls.FormulaDesc_Fld.clearValidators() 
      this.form.controls.FormulaDesc_Fld.updateValueAndValidity()
    }

    if (this.form.invalid) return this.controlService.isSubmitted = true
    let fakeFormValue = { ...this.form.getRawValue() }
    fakeFormValue.FormulaDesc_Fld ? fakeFormValue.FormulaDesc_Fld = fakeFormValue.FormulaDesc_Fld.toString() : null

    if (!(this.form.controls.Type_Fld.value >= 1012110 && this.form.controls.Type_Fld.value <= 1012112))
    {
      this.form.controls.NotificationTypes_Fld.patchValue(null)
      this.form.controls.SlackGroupID_Fld.patchValue(null)
      this.form.controls.SlackUserID_Fld.patchValue(null)
      this.form.controls.SmsUserID_Fld.patchValue(null)
      this.form.controls.EmailUserID_Fld.patchValue(null)
    }

    this.fixNotificationType(fakeFormValue)
    this.fixSlackGroup(fakeFormValue)
    this.fixUserID(fakeFormValue)

    if (this.formType == 'Add') return this.post(fakeFormValue)

    if (this.formType == 'Edit') this.put(fakeFormValue)
  }

  showModal: boolean = false
  close() {
    this.showModal = false
    this.closed.emit()
  }

  modalOptions: ModalOptions

  constructor(private controlService: ControlMessageService, private service: GridFormService, private formBuilder: FormBuilder) { }

  ngOnChanges(UpdatedValue: string): void {
    this.formType != 'Add' ? this.get() : this.setForm()
    this.modalOptions = {
      formType: this.formType,
      modatTitle: 'مشخصات تنظیم فرم',
      saveCallback: this.save.bind(this),
      hideCallback: this.close.bind(this),
    }
  }

}
