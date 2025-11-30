import { Component, Output, EventEmitter, Input } from '@angular/core'
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms'
import { ControlMessageService } from 'src/app/main/main-body/common/custom-form/control-message/control-message.service'
import { GridFormService } from 'src/app/main/main-body/common/grid-form.service'
import { Validation } from 'src/app/main/main-body/common/custom-form/control-message/Validation'

// const Controller = 'HistoryChild'

@Component({
  selector: 'history-child-form',
  templateUrl: './history-child-form.component.html',
  styleUrls: ['./history-child-form.component.scss']
})
export class HistoryChildFormComponent {

  @Output() done = new EventEmitter()
  @Output() closed = new EventEmitter()
  @Input() ID: number
  @Input() formType: string
  @Input() formObj: any
  @Input() PID: number
  @Input() idList: any[]
  @Input() controller: string
  @Input() selectedPersonelNF: any
  
  data: any = {}
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

  post() { this.service.post(`${this.controller}/Create`, this.form.getRawValue()).subscribe(_ => this.done.emit(_)) }

  put() {
    if (this.idList.length == 0) this.service.post(`${this.controller}/Update`, this.form.getRawValue()).subscribe(_ => this.done.emit('single'))
    else {
      this.form.controls.Id.patchValue(0)
      this.form.controls.Pid.patchValue(0)
      this.form.controls.IDCollect_Fld.patchValue(this.idList)
      let model = this.form.getRawValue()
      model.FieldChanged_Fld = this.fieldChange.toString()
      this.service.post(`${this.controller}/UpdateAll`, model).subscribe(_ => this.done.emit('multi'))
    }
  }

  form: UntypedFormGroup
  showForm: boolean = false
  setForm() {
    Validation.form = this.formObj
    this.form = this.formBuilder.group({
      Id: [0],
      Pid: [this.PID],
      Name: [{ value: null, disabled: Validation.disable('Name') }, Validation.setValidator('Name')],
      Family: [{ value: null, disabled: Validation.disable('Family') }, Validation.setValidator('Family')],
      GenderIDDesc: [null],
      GenderID: [{ value: null, disabled: Validation.disable('GenderID') }, Validation.setValidator('GenderID')],
      CertificateNo: [{ value: null, disabled: Validation.disable('CertificateNo') }, Validation.setValidator('CertificateNo')],
      BirthDate: [{ value: null, disabled: Validation.disable('BirthDate') }, Validation.setValidator('BirthDate')],
      BimehNo: [{ value: null, disabled: Validation.disable('BimehNo') }, Validation.setValidator('BimehNo')],
      NationalNO: [{ value: null, disabled: Validation.disable('NationalNO') }, Validation.setValidator('NationalNO')],
      BirthPlace_CountryIDDesc: [null],
      BirthPlace_CountryID: [{ value: null, disabled: Validation.disable('BirthPlace_CountryID') }, Validation.setValidator('BirthPlace_CountryID')],
      BirthPlace_StateIDDesc: [null],
      BirthPlace_StateID: [{ value: null, disabled: Validation.disable('BirthPlace_StateID') }, Validation.setValidator('BirthPlace_StateID')],
      BirthPlace_CityIDDesc: [null],
      BirthPlace_CityID: [{ value: null, disabled: Validation.disable('BirthPlace_CityID') }, Validation.setValidator('BirthPlace_CityID')],
      RegisterPlace_CountryIDDesc: [null],
      RegisterPlace_CountryID: [{ value: null, disabled: Validation.disable('RegisterPlace_CountryID') }, Validation.setValidator('RegisterPlace_CountryID')],
      RegisterPlace_StateIDDesc: [null],
      RegisterPlace_StateID: [{ value: null, disabled: Validation.disable('RegisterPlace_StateID') }, Validation.setValidator('RegisterPlace_StateID')],
      RegisterPlace_CityIDDesc: [null],
      RegisterPlace_CityID: [{ value: null, disabled: Validation.disable('RegisterPlace_CityID') }, Validation.setValidator('RegisterPlace_CityID')],
      MarriedIDDesc: [null],
      MarriedID: [{ value: null, disabled: Validation.disable('MarriedID') }, Validation.setValidator('MarriedID')],
      MarriedDate: [{ value: null, disabled: Validation.disable('MarriedDate') }, Validation.setValidator('MarriedDate')],
      Age: [{ value: null, disabled: Validation.disable('Age') }, Validation.setValidator('Age')],
      Eshteghal: [{ value: null, disabled: Validation.disable('Eshteghal') }, Validation.setValidator('Eshteghal')],
      EduStartDate: [{ value: null, disabled: Validation.disable('EduStartDate') }, Validation.setValidator('EduStartDate')],
      EduEndDate: [{ value: null, disabled: Validation.disable('EduEndDate') }, Validation.setValidator('EduEndDate')],
      Insure_Code: [{ value: null, disabled: Validation.disable('Insure_Code') }, Validation.setValidator('Insure_Code')],
      InsureIDDesc: [null],
      InsureID: [{ value: null, disabled: Validation.disable('InsureID') }, Validation.setValidator('InsureID')],
      Malol: [{ value: null, disabled: Validation.disable('Malol') }, Validation.setValidator('Malol')],
      MalolDate: [{ value: null, disabled: Validation.disable('MalolDate') }, Validation.setValidator('MalolDate')],
      Dead: [{ value: null, disabled: Validation.disable('Dead') }, Validation.setValidator('Dead')],
      DeadDate: [{ value: null, disabled: Validation.disable('DeadDate') }, Validation.setValidator('DeadDate')],
      HasJob: [{ value: null, disabled: Validation.disable('HasJob') }, Validation.setValidator('HasJob')],
      HasJobDate: [{ value: null, disabled: Validation.disable('HasJobDate') }, Validation.setValidator('HasJobDate')],
      RelationIDDesc: [null],
      RelationID: [{ value: null, disabled: Validation.disable('RelationID') }, Validation.setValidator('RelationID')],
      GradeLicenseIDDesc: [null],
      GradeLicenseID: [{ value: null, disabled: Validation.disable('GradeLicenseID') }, Validation.setValidator('GradeLicenseID')],
      IsPayroll: [{ value: null, disabled: Validation.disable('IsPayroll') }, Validation.setValidator('IsPayroll')],
      Mashmol: [{ value: null, disabled: Validation.disable('Mashmol') }, Validation.setValidator('Mashmol')],
      PersonIDCollect_Fld: [null],
      IDCollect_Fld: [null],
      FormType:[{value: this.formType}]
    })
  }

  save() {
    if (this.form.invalid) return this.controlService.isSubmitted = true

    if (this.formType == 'Add') return this.post()

    if (this.formType == 'Edit') this.put()
  }

  close() {
    this.closed.emit()
  }

  birthOstanUrl: string
  birthCityUrl: string
  changeBirthCountry(id) {
    this.birthOstanUrl = `city/${id}`
    this.form.controls.BirthOstanID.patchValue(null)
    this.form.controls.BirthOstanIDDesc.patchValue(null)
    this.form.controls.BirthPlace_CityID.patchValue(null)
    this.form.controls.BirthPlace_CityIDDesc.patchValue(null)
  }

  changeBirthOstan(id) {
    this.birthCityUrl = `city/${id}`
    this.form.controls.BirthPlace_CityID.patchValue(null)
    this.form.controls.BirthPlace_CityIDDesc.patchValue(null)
  }

  registerOstanUrl: string = null
  registerCityUrl: string
  changeRegisterCountry(id) {
    this.registerOstanUrl = `city/${id}`
    this.form.controls.RegisterPlace_StateID.patchValue(null)
    this.form.controls.RegisterPlace_StateIDDesc.patchValue(null)
    this.form.controls.RegisterPlace_CityID.patchValue(null)
    this.form.controls.RegisterPlace_CityIDDesc.patchValue(null)
  }

  changeRegisterOstan(id) {
    this.registerCityUrl = `city/${id}`
    this.form.controls.RegisterPlace_CityID.patchValue(null)
    this.form.controls.RegisterPlace_CityIDDesc.patchValue(null)
  }

  multiEdit: boolean = false
  async buildForm() {
    this.idList.length > 0 ? this.multiEdit = true : this.multiEdit = false
    if (this.idList.length > 0) {
      this.fieldChange = []
      this.setForm()
      this.multiEdit ? Object.keys(this.form.controls).forEach(a => this.changeCheckbox(false, a)) : null
      if (this.formType == 'Edit') this.form.controls.IDCollect_Fld.patchValue(this.idList)
    }
    else {
      if (this.formType != 'Add') {
        await this.getById()
        this.setForm()
        this.form.patchValue(this.data)
      }
      else this.setForm()
    }
    this.showForm = true
    setTimeout(() => { this.service.scrollToElement('form') }, 100)
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

  constructor(private controlService: ControlMessageService, private service: GridFormService, private formBuilder: UntypedFormBuilder) { }

  ngOnChanges(UpdatedValue: string): void { this.buildForm() }

}
