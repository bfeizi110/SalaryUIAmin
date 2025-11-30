import { Component, Output, EventEmitter, Input } from '@angular/core'
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms'
import { ControlMessageService } from 'src/app/main/main-body/common/custom-form/control-message/control-message.service'
import { GridFormService } from 'src/app/main/main-body/common/grid-form.service'
import { Validation } from 'src/app/main/main-body/common/custom-form/control-message/Validation'

const Controller = 'FormSettingFilters'

@Component({
  selector: 'form-setting-filters-form',
  templateUrl: './form-setting-filters-form.component.html',
  styleUrls: ['./form-setting-filters-form.component.scss']
})
export class FormSettingFiltersFormComponent {

  @Output() done = new EventEmitter()
  @Output() closed = new EventEmitter()
  @Input() ID: number
  @Input() FormID: number
  @Input() formType: string
  @Input() formObj: any
  @Input() EntityName: string

  selectedItemColor
  data: any = {}
  getById() {
    return new Promise((resolve, reject) => {
      this.service.getById(Controller, this.ID, this.formType).toPromise().then((res: any) => {
        if (res && res.Data) {
          this.data = res.Data
          this.selectedItemColor = res.Data.BackColor_Fld
          this.showForm = true
          resolve(true)
        }
        else {
          this.done.emit(false)
          reject()
        }
      })
    })
  }

  changeElementColor(event)
  {
    this.form.controls.BackColor_Fld.patchValue(event)
  }

changeUseField() {
    this.form.controls.InputType_Fld.clearValidators()
    this.form.controls.EntityPropertyID_Fld.clearValidators()

   if (this.form.controls.UseField_Fld.value) {
      this.form.controls.EntityPropertyID_Fld.setValidators(Validation.required())
    }
    else {
      this.form.controls.InputType_Fld.setValidators(Validation.required())
      this.form.controls.FilterInputTypeTitle_Fld.setValidators(Validation.required())
    } 
    this.form.controls.EntityPropertyID_Fld.updateValueAndValidity()
    this.form.controls.InputType_Fld.updateValueAndValidity()
  }

  post(fakeFormValue) { this.service.post(`${Controller}/Create`, fakeFormValue).subscribe((res: any) => this.done.emit(res.Data)) }

  put(fakeFormValue) { this.service.post(`${Controller}/Update`, fakeFormValue).subscribe((res: any) => this.done.emit(res.Data)) }

  form: UntypedFormGroup
  showForm: boolean = false
  setForm() {
    Validation.form = this.formObj
    this.form = this.formBuilder.group({
      Id: [0],
      FormID_Fld: [this.FormID],
      UseField_Fld: [{ value: null, disabled: Validation.disable('UseField_Fld') }, Validation.setValidator('UseField_Fld')],
      EntityPropertyID_Fld: [{ value: null, disabled: Validation.disable('EntityPropertyID_Fld') }, Validation.setValidator('EntityPropertyID_Fld')],
      EntityPropertyIDDesc_Fld: [null],
      FilterInputTypeTitle_Fld: [{ value: null, disabled: Validation.disable('FilterInputTypeTitle_Fld') }, Validation.setValidator('FilterInputTypeTitle_Fld')],
      InputType_Fld: [{ value: null, disabled: Validation.disable('InputType_Fld') }, Validation.setValidator('InputType_Fld')],
      InputTypeDesc_Fld: [null],
      Query_Fld: [{ value: null, disabled: Validation.disable('Query_Fld') }, Validation.setValidator('Query_Fld')],
      Order_Fld: [{ value: null, disabled: Validation.disable('Order_Fld') }, Validation.setValidator('Order_Fld')],
      BackColor_Fld: [{ value: null, disabled: Validation.disable('BackColor_Fld') }, Validation.setValidator('BackColor_Fld')],
      MultiSelect_Fld: [{ value: null, disabled: Validation.disable('MultiSelect_Fld') }, Validation.setValidator('MultiSelect_Fld')],
      Condition_Fld: [{ value: null, disabled: Validation.disable('Condition_Fld') }, Validation.setValidator('Condition_Fld')],
      Operator_Fld: [{ value: null, disabled: Validation.disable('Operator_Fld') }, Validation.setValidator('Operator_Fld')],
      OperatorDesc_Fld: [null],
      FormType:[{value: this.formType}]
    })
  }

  save() {
    if (this.form.invalid) return this.controlService.isSubmitted = true

   if (this.form.controls.UseField_Fld.value) {
      this.form.controls.FilterInputTypeTitle_Fld.patchValue(null)
      this.form.controls.InputType_Fld.patchValue(null)
      this.form.controls.Query_Fld.patchValue(null)
      this.form.controls.MultiSelect_Fld.patchValue(null)
    }
    else {
      this.form.controls.EntityPropertyID_Fld.patchValue(null)
    } 

    let fakeFormValue = { ...this.form.getRawValue() }

    if (this.formType == 'Add') return this.post(fakeFormValue)

    if (this.formType == 'Edit') this.put(fakeFormValue)
  }

  close() { this.closed.emit() }

  changeFilter(items) {
    this.data.ReportDesignFilterWhereDto = []
    let idList = []
    items.forEach(e => idList.push(e.Id))
    this.form.controls.FilterID_Fld.patchValue(idList.toString())
  }

  async buildForm() {
    if (this.formType != 'Add') {
      await this.getById()
      this.setForm()
      this.form.patchValue(this.data)
      this.changeUseField()
      this.form.controls.Order_Fld.patchValue(this.data.Order_Fld)
    }
    else {
      this.setForm()
      this.showForm = true
      setTimeout(() => {
        this.service.scrollToElement('form')
      }, 200); 
    }
  }

  constructor(private controlService: ControlMessageService, private service: GridFormService, private formBuilder: UntypedFormBuilder) { }

  ngOnChanges(UpdatedValue: string): void { this.buildForm() }

}
