import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'
import { FormBuilder, FormGroup } from '@angular/forms'
import { ToastrService } from 'ngx-toastr'

import { ControlMessageService } from 'src/app/main/main-body/common/custom-form/control-message/control-message.service'
import { Validation } from 'src/app/main/main-body/common/custom-form/control-message/Validation'
import { GridFormService } from 'src/app/main/main-body/common/grid-form.service'

const Controller = 'Users'

@Component({
  selector: 'user-access-form',
  templateUrl: './user-access-form.component.html',
  styleUrls: ['./user-access-form.component.scss']
})
export class UserAccessFormComponent {

  @Output() done = new EventEmitter()
  @Output() closed = new EventEmitter()
  @Input() ID: number
  @Input() formType: string
  @Input() formObj: any
  @Input() idList: string

  showForm: boolean = false
  clearPerson() {
    this.form.controls.PersonId.patchValue(null)
    this.personName = null
  }

  data: any = {}
  get() {
    this.service.getById(Controller, this.ID, this.formType).subscribe((res: any) => {
      this.data = res.Data
      this.personName = this.data.PersonIdDesc
      this.setForm()
    })
  }

  post() { this.service.post(`${Controller}/Create`, this.fakeFormValue).subscribe((res: any) => { res && res.IsSuccess ? this.done.emit(res.Data) : null }) }

  put() { 
    this.service.post(`${Controller}${this.formType == 'Multi' ? '/UpdateAll' : '/Update'}` , this.fakeFormValue).subscribe((res: any) => { res && res.IsSuccess ? this.done.emit(res.Data) : null }) 
  }

  multiEdit: boolean = false
  form: FormGroup
  setForm() {
    Validation.form = this.formObj
    this.form = this.formBuilder.group({
      Id: [0],
      UserName: [{ value: null, disabled: Validation.disable('UserName') }, Validation.setValidator('UserName')],
      NormalizedName: [null],
      InActive: [{ value: null, disabled: Validation.disable('InActive') }, Validation.setValidator('InActive')],
      PersonId: [{ value: null, disabled: Validation.disable('PersonId') }, Validation.setValidator('PersonId')],
      PasswordHash: [{ value: null, disabled: Validation.disable('PasswordHash') }, Validation.setValidator('PasswordHash')],
      PersonFullName: [{ value: null, disabled: Validation.disable('PersonFullName') }, Validation.setValidator('PersonFullName')],
      RoleId: [{ value: null, disabled: Validation.disable('RoleId') }, Validation.setValidator('RoleId')],
      ChangePassImmediate_Fld: [{ value: null, disabled: Validation.disable('ChangePassImmediate_Fld') }, Validation.setValidator('ChangePassImmediate_Fld')],
      TwoFactorEnabled: [{ value: null, disabled: Validation.disable('TwoFactorEnabled') }, Validation.setValidator('TwoFactorEnabled')],
      AccessIPAddresses_Fld: [{ value: null, disabled: Validation.disable('AccessIPAddresses_Fld') }, Validation.setValidator('AccessIPAddresses_Fld')],
      SlackAddress_Fld: [{ value: null, disabled: Validation.disable('SlackAddress_Fld') }, Validation.setValidator('SlackAddress_Fld')],

      HasntAnyPersonID_Fld: [{ value: null, disabled: Validation.disable('HasntAnyPersonID_Fld') }, Validation.setValidator('HasntAnyPersonID_Fld')],
      UserTitle: [{ value: null, disabled: Validation.disable('UserTitle') }, Validation.setValidator('UserTitle')],
      PhoneNumber: [{ value: null, disabled: Validation.disable('PhoneNumber') }, Validation.setValidator('PhoneNumber')],
      Email: [{ value: null, disabled: Validation.disable('Email') }, Validation.setValidator('Email')],
      NationalNO: [{ value: null, disabled: Validation.disable('NationalNO') }, Validation.setValidator('NationalNO')],
      OrgID: [{ value: null, disabled: Validation.disable('OrgID') }, Validation.setValidator('OrgID')],
      OrgIDDesc: [null],
      PostID: [{ value: null, disabled: Validation.disable('PostID') }, Validation.setValidator('PostID')],
      PostIDDesc: [null],
      
      IDCollect_Fld : [null],
      FormType:[{value: this.formType}]
    })
    if (this.formType != 'Add' && this.formType != 'Multi') {
      this.form.patchValue(this.data)
      this.getRoleId()
    }
    this.changeHasntAnyField()
    this.showForm = true
    setTimeout(() => {
      this.service.scrollToElement("form")
    }, 200); 
    this.idList && this.idList.length > 0 ? this.multiEdit = true : this.multiEdit = false

    this.multiEdit ? Object.keys(this.form.controls).forEach(a => this.changeCheckbox(false, a)) : null
    if (this.formType == 'Edit' || this.formType == 'Multi') this.form.controls.IDCollect_Fld.patchValue(this.idList)  
  }

changeHasntAnyField() {
    this.form.controls.UserTitle.clearValidators()
    this.form.controls.PhoneNumber.clearValidators()
    this.form.controls.Email.clearValidators()
    this.form.controls.NationalNO.clearValidators()

   if (this.form.controls.HasntAnyPersonID_Fld.value) {
      this.form.controls.UserTitle.setValidators(Validation.required())
      this.form.controls.PhoneNumber.setValidators(Validation.required())
      this.form.controls.Email.setValidators(Validation.required())
      this.form.controls.NationalNO.setValidators(Validation.required())
    }
    this.form.controls.UserTitle.updateValueAndValidity()
    this.form.controls.PhoneNumber.updateValueAndValidity()
    this.form.controls.Email.updateValueAndValidity()
    this.form.controls.NationalNO.updateValueAndValidity()
  }
  
  fieldChange: string[] = []
  changeCheckbox(enabled: boolean, fieldName: string) {
    if (enabled && !this.formObj[fieldName].disableInput) {
      this.form.controls[fieldName].enable()
      this.fieldChange.push(fieldName)
    }
    else {
      this.form.controls[fieldName].disable()
      this.fieldChange = this.fieldChange.filter(a => a != fieldName)
    }
  }

  fakeFormValue: any
  save() {
    if (this.formType == 'Edit') !this.form.getRawValue().PasswordHash ? this.form.controls.PasswordHash.patchValue('-*-') : null

    if (this.form.invalid) return this.controlService.isSubmitted = true

    this.fakeFormValue = { ...this.form.getRawValue() }
    this.fixRoleId(this.fakeFormValue)
    this.fakeFormValue.FieldChanged_Fld = this.fieldChange.toString()

    if (this.formType == 'Add') return this.post()

    if (this.formType == 'Edit' || this.formType == 'Multi') this.put()
  }

  getRoleId() {
    if (this.form.controls.RoleId.value) {
      this.form.controls.RoleId.value.replace(this.form.controls.RoleId.value[this.form.controls.RoleId.value.length - 1], '')
      this.form.controls.RoleId.patchValue(this.form.controls.RoleId.value.split(',').map(i => Number(i)))
    }
  }

  fixRoleId(form) { if (form.RoleId) form.RoleId = form.RoleId.toString() }

  close() {
    this.closed.emit()
  }

  showPerson: boolean = false
  onShowPerson() {
    this.showPerson = true
  }

  personName: string
  onSelectPersonnel(data) {
    this.form.controls.PersonId.setValue(data.Id)
    this.personName = `${data.Name} ${data.Family}`
    this.showPerson = false
  }

  roleList = []
  getRole() { this.service.get('Group/GetCombo/null').subscribe((res: any) => this.roleList = res.Data) }

  constructor(private toasrt: ToastrService, private controlService: ControlMessageService, private service: GridFormService, private formBuilder: FormBuilder) { }

  ngOnChanges(UpdatedValue: string): void { 
    if (this.roleList.length == 0) this.getRole()
    this.formType != 'Add' && this.formType != 'Multi' ? this.get() : this.setForm() 
  }

}
