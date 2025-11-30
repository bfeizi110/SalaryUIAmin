import { Component, Output, EventEmitter, Input } from '@angular/core'
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms'
import { ControlMessageService } from 'src/app/main/main-body/common/custom-form/control-message/control-message.service'
import { GridFormService } from 'src/app/main/main-body/common/grid-form.service'
import { Validation } from 'src/app/main/main-body/common/custom-form/control-message/Validation'
import { Month_Fld, Year_Fld } from 'src/app/main/pages/global-attr'

const Controller = 'PersonMostamar'

@Component({
  selector: 'person-mostamar-info-form',
  templateUrl: './person-mostamar-info-form.component.html',
  styleUrls: ['./person-mostamar-info-form.component.scss']
})
export class PersonMostamarInfoFormComponent {

  @Output() done = new EventEmitter()
  @Output() closed = new EventEmitter()
  @Input() ID: number
  @Input() PID: number
  @Input() formType: string
  @Input() formObj: any
  @Input() personList: any[]
  @Input() idList: any[]
  @Input() selectedPersonelNF: any
  
  data: any = {}
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
    this.service.post(`${Controller}/Create`, this.form.getRawValue()).subscribe(_ => this.done.emit(this.personList.length == 0 ? 'single' : 'multi'))
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
      MostamarCodeDesc_Fld: [null],
      MostamarCode_Fld: [{ value: null, disabled: Validation.disable('MostamarCode_Fld') }, Validation.setValidator('MostamarCode_Fld')],
      NoDesc_Fld: [null],
      No_Fld: [{ value: null, disabled: Validation.disable('No_Fld') }, Validation.setValidator('No_Fld')],
      StartDate_fld: [{ value: null, disabled: Validation.disable('StartDate_Fld') }, Validation.setValidator('StartDate_fld')],
      EndDate_Fld: [{ value: null, disabled: Validation.disable('EndDate_Fld') }, Validation.setValidator('EndDate_Fld')],
      Price_Fld: [{ value: null, disabled: Validation.disable('Price_Fld') }, Validation.setValidator('Price_Fld')],
      PriceOfThisMonth_Fld: [{ value: null, disabled: Validation.disable('PriceOfThisMonth_Fld') }, Validation.setValidator('PriceOfThisMonth_Fld')],
      DayOfThisMonth_Fld: [{ value: null, disabled: Validation.disable('DayOfThisMonth_Fld') }, Validation.setValidator('DayOfThisMonth_Fld')],
      DayOfMonthInfo_Fld: [{ value: null, disabled: Validation.disable('DayOfMonthInfo_Fld') }, Validation.setValidator('DayOfMonthInfo_Fld')],
      NoActive_Fld: [{ value: null, disabled: Validation.disable('NoActive_Fld') }, Validation.setValidator('NoActive_Fld')],
      NoActiveSystem_Fld: [{ value: null, disabled: Validation.disable('NoActiveSystem_Fld') }, Validation.setValidator('NoActiveSystem_Fld')],
      PersonIDCollect_Fld: [null],
      IDCollect_Fld: [null],
      FormType:[{value: this.formType}],
    })
  }

  save() {
    if (this.form.invalid) return this.controlService.isSubmitted = true

    if (this.formType == 'Add') return this.post()

    if (this.formType == 'Edit') this.put()
  }

  close() { this.closed.emit() }

  multiEdit: boolean = false
  async buildForm() {
    this.idList.length > 0 ? this.multiEdit = true : this.multiEdit = false
    if (this.personList.length > 0 || this.idList.length > 0) {
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
    setTimeout(() => {
      this.service.scrollToElement('form')
    }, 200); 
  }

  fieldChange: string[] = []
  changeCheckbox(enabled: boolean, fieldName: string) {
    if (!this.formObj[fieldName]) return // || this.formObj[fieldName].type == 'date'
    if (this.formObj[fieldName].disableInput && this.multiEdit)
      this.formObj[fieldName].ishidden = true

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
