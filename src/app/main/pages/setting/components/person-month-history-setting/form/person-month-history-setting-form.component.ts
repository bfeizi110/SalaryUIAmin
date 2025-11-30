import { Component, Output, EventEmitter, Input } from '@angular/core'
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms'
import { ControlMessageService } from 'src/app/main/main-body/common/custom-form/control-message/control-message.service'
import { GridFormService } from 'src/app/main/main-body/common/grid-form.service'
import { Validation } from 'src/app/main/main-body/common/custom-form/control-message/Validation'

const Controller = 'PersonMonthHistorySetting'

@Component({
  selector: 'person-month-history-setting-form',
  templateUrl: './person-month-history-setting-form.component.html',
  styleUrls: ['./person-month-history-setting-form.component.scss']
})
export class PersonMonthHistorySettingFormComponent {

  @Output() done = new EventEmitter()
  @Output() closed = new EventEmitter()
  @Input() ID: number
  @Input() formType: string
  @Input() formObj: any

  entityList = []
  getEntityList() {
    return new Promise(resolve => {
      if (this.entityList.length == 0) {
        this.service.post(`Entity/GetComboNew`, { CodeDesc_Fld: this.data.FTableName_Fld }).subscribe((res: any) => {
          this.entityList = res.Data
          return resolve(true)
        })
      }
      else return resolve(true)
    })
  }

  data: any = {}
  get() {
    this.service.getByIdSimple(Controller, this.ID).subscribe((res: any) => {
      this.data = res.Data
      this.data.IsFromula_Fld ? this.getEntityList() : null
      this.setForm()
    })
  }

  put() { this.service.post(`${Controller}/Update`, this.form.getRawValue()).subscribe((res: any) => this.done.emit(res.Data)) }

  form: UntypedFormGroup
  showForm: boolean = false
  setForm() {
    Validation.form = this.formObj
    this.form = this.formBuilder.group({
      Id: [0],
      TypeDesc_Fld: [null],
      Type_Fld: [{ value: null, disabled: Validation.disable('Type_Fld') }, Validation.setValidator('Type_Fld')],
      IsFromula_Fld: [{ value: null, disabled: Validation.disable('IsFromula_Fld') }, Validation.setValidator('IsFromula_Fld')],
      FormulaIDDesc_Fld: [null],
      FormulaID_Fld: [{ value: null, disabled: Validation.disable('FormulaID_Fld') }, Validation.setValidator('FormulaID_Fld')],
      PersonMonthHistorySettingWhereDto: [[]],
      FormType:[{value: this.formType}]
    })
    this.formType != 'Add' ? this.form.patchValue(this.data) : null
    this.showForm = true
    this.changeIsFormula()
    setTimeout(() => {
      this.service.scrollToElement("form")
    }, 200); 
  }

  save() {
    if (this.form.invalid) return this.controlService.isSubmitted = true

    let fakeFormValue = { ...this.form.getRawValue() }
    let fakeWhereArray = fakeFormValue.PersonMonthHistorySettingWhereDto
    for (let index = 0; index < fakeWhereArray.length; index++) if (fakeWhereArray[index].Value_Fld && fakeWhereArray[index].Value_Fld.length > 0) fakeWhereArray[index].Value_Fld = fakeWhereArray[index].Value_Fld.toString()
    this.form.controls.PersonMonthHistorySettingWhereDto.patchValue(fakeWhereArray)

    if (this.formType == 'Edit') this.put()
  }

  close() { this.closed.emit() }

  whereChange(whereValue) {
    this.data.PersonMonthHistorySettingWhereDto = whereValue
    this.form.controls.PersonMonthHistorySettingWhereDto.patchValue(whereValue)
  }

  changeIsFormula() {
    //this.data.PersonMonthHistorySettingWhereDto = []
    //this.form.controls.PersonMonthHistorySettingWhereDto.patchValue([])
    this.formObj.FormulaID_Fld.ishidden = true
    if (this.form.getRawValue().IsFromula_Fld) {
      this.form.controls.FormulaID_Fld.enable()
      this.form.controls.FormulaID_Fld.setValidators(Validation.required())
    }
    else {
      this.getEntityList()
      this.form.controls.FormulaID_Fld.disable()
      this.form.controls.FormulaID_Fld.clearValidators()
      this.form.controls.FormulaID_Fld.patchValue(null)
      this.form.controls.FormulaIDDesc_Fld.patchValue(null)
      if (this.data.PersonMonthHistorySettingWhereDto === null) {
        this.data.PersonMonthHistorySettingWhereDto = []
        this.form.controls.PersonMonthHistorySettingWhereDto.patchValue([])
      }
    }
    setTimeout(() => this.formObj.FormulaID_Fld.ishidden = false)
  }

  constructor(private controlService: ControlMessageService, private service: GridFormService, private formBuilder: UntypedFormBuilder) { }

  ngOnChanges(UpdatedValue: string): void { this.formType != 'Add' ? this.get() : this.setForm() }

}
