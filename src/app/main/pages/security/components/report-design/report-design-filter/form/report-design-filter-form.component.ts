import { Component, Output, EventEmitter, Input } from '@angular/core'
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms'
import { ControlMessageService } from 'src/app/main/main-body/common/custom-form/control-message/control-message.service'
import { GridFormService } from 'src/app/main/main-body/common/grid-form.service'
import { Validation } from 'src/app/main/main-body/common/custom-form/control-message/Validation'

const Controller = 'ReportDesignFilter'

@Component({
  selector: 'report-design-filter-form',
  templateUrl: './report-design-filter-form.component.html',
  styleUrls: ['./report-design-filter-form.component.scss']
})
export class ReportDesignFilterFormComponent {

  @Output() done = new EventEmitter()
  @Output() closed = new EventEmitter()
  @Input() ID: number
  @Input() parentId: number
  @Input() formType: string
  @Input() formObj: any

  selectedItemColor
  data: any = {}
  getById() {
    return new Promise((resolve, reject) => {
      this.service.getById(Controller, this.ID, this.formType).toPromise().then((res: any) => {
        if (res && res.Data) {
          this.data = res.Data
          this.selectedItemColor = res.Data.BackColor_Fld
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

changeUseFilter() {
    this.form.controls.InputType_Fld.clearValidators()
    this.form.controls.FilterID_Fld.clearValidators()

   if (this.form.controls.UseFilterID_Fld.value) {
      this.form.controls.FilterID_Fld.setValidators(Validation.required())
    }
    else {
      this.form.controls.InputType_Fld.setValidators(Validation.required())
      this.form.controls.FilterInputTypeTitle_Fld.setValidators(Validation.required())
    } 
    this.form.controls.FilterID_Fld.updateValueAndValidity()
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
      ParentID_Fld: [this.parentId],
      UseFilterID_Fld: [{ value: null, disabled: Validation.disable('UseFilterID_Fld') }, Validation.setValidator('UseFilterID_Fld')],
      InputType_Fld: [{ value: null, disabled: Validation.disable('InputType_Fld') }, Validation.setValidator('InputType_Fld')],
      InputTypeDesc_Fld: [null],
      Query_Fld: [{ value: null, disabled: Validation.disable('Query_Fld') }, Validation.setValidator('Query_Fld')],
      MultiSelect_Fld: [{ value: null, disabled: Validation.disable('MultiSelect_Fld') }, Validation.setValidator('MultiSelect_Fld')],
      HaveGroup_Fld: [{ value: null, disabled: Validation.disable('HaveGroup_Fld') }, Validation.setValidator('HaveGroup_Fld')],
      FilterID_Fld: [{ value: null, disabled: Validation.disable('FilterID_Fld') }, Validation.setValidator('FilterID_Fld')],
      FilterIDDesc_Fld: [null],
      Order_Fld: [{ value: null, disabled: Validation.disable('Order_Fld') }, Validation.setValidator('Order_Fld')],
      BackColor_Fld: [{ value: null, disabled: Validation.disable('BackColor_Fld') }, Validation.setValidator('BackColor_Fld')],
      NothingByDefault_Fld: [{ value: null, disabled: Validation.disable('NothingByDefault_Fld') }, Validation.setValidator('NothingByDefault_Fld')],
      FilterInputTypeTitle_Fld: [{ value: null, disabled: Validation.disable('FilterInputTypeTitle_Fld') }, Validation.setValidator('FilterInputTypeTitle_Fld')],
      ReportDesignFilterWhereDto: [[]],
      FormType:[{value: this.formType}]
    })
  }

  save() {
    if (this.form.invalid) return this.controlService.isSubmitted = true

    let fakeFormValue = { ...this.form.getRawValue() }
    let fakeWhereArray = fakeFormValue.ReportDesignFilterWhereDto
    for (let index = 0; index < fakeWhereArray.length; index++) if (fakeWhereArray[index].Value_Fld && fakeWhereArray[index].Value_Fld.length > 0) fakeWhereArray[index].Value_Fld = fakeWhereArray[index].Value_Fld.toString()
    this.form.controls.ReportDesignFilterWhereDto.patchValue(fakeWhereArray)

    if (this.formType == 'Add') return this.post(fakeFormValue)

    if (this.formType == 'Edit') this.put(fakeFormValue)
  }

  close() { this.closed.emit() }

  whereChange(whereValue) {
    this.data.ReportDesignFilterWhereDto = whereValue
    this.form.controls.ReportDesignFilterWhereDto.patchValue(whereValue)
  }

  filterList = []
  filtelValue: any
  async getFilterList() {
    return new Promise(resolve => {
      if (this.filterList.length == 0) {
        this.service.get(`ReportDesignFilter/GetFilterCombo/null`).subscribe((res: any) => {
          this.filterList = res.Data
          return resolve(true)
        })
      }
      else return resolve(true)
    })
  }

  showWhereFrame: boolean = false
  changeFilter(items) {
    this.data.ReportDesignFilterWhereDto = []
    let idList = []
    items.forEach(e => idList.push(e.Id))
    this.form.controls.FilterID_Fld.patchValue(idList.toString())
    if (items.length == 1) items[0].CodeDescEn_Fld ? this.showWhereFrame = true : null
    else this.showWhereFrame = false
  }

  async buildForm() {
    await this.getFilterList()
    if (this.formType != 'Add') {
      await this.getById()
      this.setForm()
      this.form.patchValue(this.data)
      this.changeUseFilter()
      this.form.controls.Order_Fld.patchValue(this.data.Order_Fld)
      if (this.data.ReportDesignFilterWhereDto.length > 0) for (let index = 0; index < this.data.ReportDesignFilterWhereDto.length; index++) if (this.data.ReportDesignFilterWhereDto[index].comboDto) this.data.ReportDesignFilterWhereDto[index].Value_Fld = this.data.ReportDesignFilterWhereDto[index].Value_Fld.split(',').map(i => Number(i))
      this.filtelValue = [this.filterList.filter(a => a.Id.toString() == this.data.FilterID_Fld.toString())[0]]
      if (this.filtelValue.length == 1) this.showWhereFrame = true
      else this.showWhereFrame = false
      this.showForm = true
    }
    else {
      this.setForm()
      this.filtelValue = null
      this.showWhereFrame = false
      this.showForm = true
      setTimeout(() => {
        this.service.scrollToElement('form')
      }, 200); 
    }
  }

  constructor(private controlService: ControlMessageService, private service: GridFormService, private formBuilder: UntypedFormBuilder) { }

  ngOnChanges(UpdatedValue: string): void { this.buildForm() }

}
