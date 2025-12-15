import { Validation } from '../../../../../main-body/common/custom-form/control-message/Validation'

import { Component, Output, EventEmitter, Input } from '@angular/core'
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms'
import { ControlMessageService } from 'src/app/main/main-body/common/custom-form/control-message/control-message.service'
import { GridFormService } from 'src/app/main/main-body/common/grid-form.service'

const Controller = 'DaraeiSetting'

@Component({
  selector: 'daraei-setting-form',
  templateUrl: './daraei-setting-form.component.html',
  styleUrls: ['./daraei-setting-form.component.scss']
})

export class DaraeiSettingFormComponent {

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

  post() {
    this.form.patchValue({ Id: 0 })
    this.service.post(`${Controller}/Create`, this.form.getRawValue()).subscribe((res: any) => this.done.emit(res.Data))
  }

  put() { this.service.post(`${Controller}/Update`, this.form.getRawValue()).subscribe((res: any) => this.done.emit(res.Data)) }

  form: UntypedFormGroup
  showForm: boolean = false
  setForm() {
    Validation.form = this.formObj
    this.form = this.formBuilder.group({
      Id: [null],
      CodeDesc_Fld: [{ value: null, disabled: Validation.disable('CodeDesc_Fld') }, Validation.setValidator('CodeDesc_Fld')],
      DaraiBankID_Fld: [{ value: null, disabled: Validation.disable('DaraiBankID_Fld') }, Validation.setValidator('DaraiBankID_Fld')],
      DaraiBankIDDesc_Fld: [null],
      AccountNo_Fld: [{ value: null, disabled: Validation.disable('AccountNo_Fld') }, Validation.setValidator('AccountNo_Fld')],
      EtebarYear_Fld: [{ value: null, disabled: Validation.disable('EtebarYear_Fld') }, Validation.setValidator('EtebarYear_Fld')],
      RadifBudget_Fld: [{ value: null, disabled: Validation.disable('RadifBudget_Fld') }, Validation.setValidator('RadifBudget_Fld')],
      State_Fld: [{ value: null, disabled: Validation.disable('State_Fld') }, Validation.setValidator('State_Fld')],
      Township_Fld: [{ value: null, disabled: Validation.disable('Township_Fld') }, Validation.setValidator('Township_Fld')],
      PayUser_Fld: [{ value: null, disabled: Validation.disable('PayUser_Fld') }, Validation.setValidator('PayUser_Fld')],
      PayManager_Fld: [{ value: null, disabled: Validation.disable('PayManager_Fld') }, Validation.setValidator('PayManager_Fld')],
      MaliManager_Fld: [{ value: null, disabled: Validation.disable('MaliManager_Fld') }, Validation.setValidator('MaliManager_Fld')],
      AccTax_Fld: [{ value: null, disabled: Validation.disable('AccTax_Fld') }, Validation.setValidator('AccTax_Fld')],
      AccBaznesh_Fld: [{ value: null, disabled: Validation.disable('AccBaznesh_Fld') }, Validation.setValidator('AccBaznesh_Fld')],
      AccKhadamat_Fld: [{ value: null, disabled: Validation.disable('AccKhadamat_Fld') }, Validation.setValidator('AccKhadamat_Fld')],
      AccTamin_Fld: [{ value: null, disabled: Validation.disable('AccTamin_Fld') }, Validation.setValidator('AccTamin_Fld')],
      AccSayer_Fld: [{ value: null, disabled: Validation.disable('AccSayer_Fld') }, Validation.setValidator('AccSayer_Fld')],
      InActive_Fld: [{ value: null, disabled: Validation.disable('InActive_Fld') }, Validation.setValidator('InActive_Fld')],
      NationalCodeOffice_Fld: [{ value: null, disabled: Validation.disable('NationalCodeOffice_Fld') }, Validation.setValidator('NationalCodeOffice_Fld')],
      FormType:[{value: this.formType}]
    })
    this.formType != 'Add' ? this.form.patchValue(this.data) : null
    this.showForm = true
  }

  save() {
    if (this.form.invalid) return this.controlService.isSubmitted = true

    if (this.formType == 'Add') return this.post()

    if (this.formType == 'Edit') this.put()
  }

  close() {
    this.closed.emit()
  }

  constructor(private controlService: ControlMessageService, private service: GridFormService, private formBuilder: UntypedFormBuilder) { }

  ngOnChanges(UpdatedValue: string): void { this.formType != 'Add' ? this.get() : this.setForm() }

}
