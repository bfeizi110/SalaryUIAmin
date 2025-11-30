import { Component, Output, EventEmitter, Input } from '@angular/core'
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms'
import { ControlMessageService } from 'src/app/main/main-body/common/custom-form/control-message/control-message.service'
import { GridFormService } from 'src/app/main/main-body/common/grid-form.service'
import { Validation } from 'src/app/main/main-body/common/custom-form/control-message/Validation'

const Controller = 'MissionDefine'

@Component({
  selector: 'mission-define-form',
  templateUrl: './mission-define-form.component.html',
  styleUrls: ['./mission-define-form.component.scss']
})
export class MissionDefineFormComponent {

  @Output() done = new EventEmitter()
  @Output() closed = new EventEmitter()
  @Input() ID: number
  @Input() formType: string
  @Input() formObj: any

  data: any = {}
  get() {
    this.service.getById(Controller, this.ID, this.formType).toPromise().then((res: any) => {
      if (!res || !res.Data) return this.done.emit(false)
      else {
        this.data = res.Data
        this.setForm()
      }
    })
  }

  post() { this.service.post(`${Controller}/Create`, this.form.getRawValue()).subscribe((res: any) => { res && res.IsSuccess ? this.done.emit(res.Data) : null })}

  put() { this.service.post(`${Controller}/Update`, this.form.getRawValue()).subscribe((res: any) => { res && res.IsSuccess ? this.done.emit(res.Data) : null })}

  form: UntypedFormGroup
  showForm: boolean = false
  setForm() {
    Validation.form = this.formObj
    this.form = this.formBuilder.group({
      Id: [0],
      Code_Fld: [{ value: null, disabled: Validation.disable('Code_Fld') }, Validation.setValidator('Code_Fld')],
      MissionHour_T1Divideby_Fld: [{ value: null, disabled: Validation.disable('MissionHour_T1Divideby_Fld') }, Validation.setValidator('MissionHour_T1Divideby_Fld')],
      MissionParamNo_T1Divideby_Fld: [{ value: null, disabled: Validation.disable('MissionParamNo_T1Divideby_Fld') }, Validation.setValidator('MissionParamNo_T1Divideby_Fld')],
      MissionParam_T1Divideby_Fld: [{ value: null, disabled: Validation.disable('MissionParam_T1Divideby_Fld') }, Validation.setValidator('MissionParam_T1Divideby_Fld')],
      MissionWaterParam_T1Divideby_Fld: [{ value: null, disabled: Validation.disable('MissionWaterParam_T1Divideby_Fld') }, Validation.setValidator('MissionWaterParam_T1Divideby_Fld')],
      MissionWaterParamNo_T1Divideby_Fld: [{ value: null, disabled: Validation.disable('MissionWaterParamNo_T1Divideby_Fld') }, Validation.setValidator('MissionWaterParamNo_T1Divideby_Fld')],
      CodeDesc_Fld: [{ value: null, disabled: Validation.disable('CodeDesc_Fld') }, Validation.setValidator('CodeDesc_Fld')],
      MissionMax: [{ value: null, disabled: Validation.disable('MissionMax') }, Validation.setValidator('MissionMax')],
      MissionMaxParamNo: [{ value: null, disabled: Validation.disable('MissionMaxParamNo') }, Validation.setValidator('MissionMaxParamNo')],
      MissionMaxHour: [{ value: null, disabled: Validation.disable('MissionMaxHour') }, Validation.setValidator('MissionMaxHour')],
      MissionMaxDay: [{ value: null, disabled: Validation.disable('MissionMaxDay') }, Validation.setValidator('MissionMaxDay')],
      MissionParamDesc_Fld: [null],
      MissionParam_Fld: [{ value: null, disabled: Validation.disable('MissionParam_Fld') }, Validation.setValidator('MissionParam_Fld')],
      MissionParamNoDesc_Fld: [null],
      MissionParamNo_Fld: [{ value: null, disabled: Validation.disable('MissionParamNo_Fld') }, Validation.setValidator('MissionParamNo_Fld')],
      Year_Fld: [null],
      Month_Fld: [null],
      MissionParamHourDesc_Fld: [null],
      MissionParamHour_Fld: [{ value: null, disabled: Validation.disable('MissionParamHour_Fld') }, Validation.setValidator('MissionParamHour_Fld')],
      MissionWaterParam_Fld: [{ value: null, disabled: Validation.disable('MissionWaterParam_Fld') }, Validation.setValidator('MissionWaterParam_Fld')],
      MissionWaterParamNo_Fld: [{ value: null, disabled: Validation.disable('MissionWaterParamNo_Fld') }, Validation.setValidator('MissionWaterParamNo_Fld')],
      FormType:[{value: this.formType}]
    })
    this.formType != 'Add' ? this.form.patchValue(this.data) : null
    this.showForm = true
  }

  save() {
    this.form.controls.Month_Fld.patchValue(sessionStorage.getItem('Month_Fld'))
    this.form.controls.Year_Fld.patchValue(sessionStorage.getItem('Year_Fld'))

    if (this.form.invalid) return this.controlService.isSubmitted = true

    if (this.formType == 'Add') return this.post()

    if (this.formType == 'Edit') this.put()
  }

  close() { this.closed.emit() }

  constructor(private controlService: ControlMessageService, private service: GridFormService, private formBuilder: UntypedFormBuilder) { }

  ngOnChanges(UpdatedValue: string): void { this.formType != 'Add' ? this.get() : this.setForm() }

}
