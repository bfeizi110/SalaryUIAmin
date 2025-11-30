import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms'

import { ControlMessageService } from 'src/app/main/main-body/common/custom-form/control-message/control-message.service'
import { Validation } from 'src/app/main/main-body/common/custom-form/control-message/Validation'
import { ModalOptions } from 'src/app/main/main-body/common/custom-modal/modal-options.interface'
import { GridFormService } from 'src/app/main/main-body/common/grid-form.service'

const Controller = 'OtherSettingDefine'

@Component({
  selector: 'other-setting-define-form',
  templateUrl: './other-setting-define-form.component.html',
  styleUrls: ['./other-setting-define-form.component.scss']
})

export class OtherSettingDefineFormComponent implements OnInit {

  @Output() done = new EventEmitter()
  @Output() closed = new EventEmitter()
  @Input() ID: number
  @Input() formType: string
  @Input() formObj: any
  @Input() otherSettingGroupId: number

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

  post() { this.service.post(`${Controller}/Create`, this.form.getRawValue()).subscribe((res: any) => { res && res.IsSuccess ? this.done.emit(res.Data) : null }) }

  put() { this.service.post(`${Controller}/Update`, this.form.getRawValue()).subscribe((res: any) => { res && res.IsSuccess ? this.done.emit(res.Data) : null }) }

  form: UntypedFormGroup
  setForm() {
    Validation.form = this.formObj
    this.form = this.formBuilder.group({
      Id: [0],
      OtherSettingGroup_Fld: [this.otherSettingGroupId],
      Code_Fld: [{ value: null, disabled: Validation.disable('Code_Fld') }, Validation.setValidator('Code_Fld')],
      CodeDesc_Fld: [{ value: null, disabled: Validation.disable('CodeDesc_Fld') }, Validation.setValidator('CodeDesc_Fld')],
      CodeDescEnglish_Fld: [{ value: null, disabled: Validation.disable('CodeDescEnglish_Fld') }, Validation.setValidator('CodeDescEnglish_Fld')],
      TypeDesc_Fld: [null],
      Type_Fld: [{ value: null, disabled: Validation.disable('Type_Fld') }, Validation.setValidator('Type_Fld')],
      Query_Fld: [{ value: null, disabled: Validation.disable('Query_Fld') }, Validation.setValidator('Query_Fld')],
      FormType:[{value: this.formType}]
    })
    this.formType != 'Add' ? this.form.patchValue(this.data) : null
    this.changeType()
    this.showModal = true
  }

  changeType() {
    let typeid = this.form.controls.Type_Fld.value
    this.formObj.Query_Fld.ishidden = true
    switch (typeid) {
      case 100162:
        this.form.controls.Query_Fld.enable()
        this.form.controls.Query_Fld.setValidators(Validation.required())
        break;
      case 100163:
        this.form.controls.Query_Fld.enable()
        this.form.controls.Query_Fld.setValidators(Validation.required())
        break;
      default:
        this.form.controls.Query_Fld.disable()
        this.form.controls.Query_Fld.clearValidators()
        this.form.controls.Query_Fld.patchValue(null)
    }
    setTimeout(() => this.formObj.Query_Fld.ishidden = false)
  }

  save() {
    if (this.form.invalid) return this.controlService.isSubmitted = true

    if (this.formType == 'Add') return this.post()

    if (this.formType == 'Edit') this.put()
  }

  showModal: boolean = false
  close() {
    this.showModal = false
    this.closed.emit()
  }

  modalOptions: ModalOptions

  constructor(private controlService: ControlMessageService, private service: GridFormService, private formBuilder: UntypedFormBuilder) { }

  ngOnInit(): void {
    this.formType != 'Add' ? this.get() : this.setForm()
    this.modalOptions = {
      formType: this.formType, modatTitle: 'جزئیات تنظیمات متفرقه',
      saveCallback: this.save.bind(this),
      hideCallback: this.close.bind(this)
    }
  }

}
