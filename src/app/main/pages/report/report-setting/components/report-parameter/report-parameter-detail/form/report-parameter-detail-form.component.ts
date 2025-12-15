import { Component, EventEmitter, Input, Output } from '@angular/core'
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms'
import { ToastrService } from 'ngx-toastr'
import { AlertClass } from 'src/app/main/main-body/common/alert/alert-functions'

import { ControlMessageService } from 'src/app/main/main-body/common/custom-form/control-message/control-message.service'
import { Validation } from 'src/app/main/main-body/common/custom-form/control-message/Validation'
import { ModalOptions } from 'src/app/main/main-body/common/custom-modal/modal-options.interface'
import { GridFormService } from 'src/app/main/main-body/common/grid-form.service'
import { Month_Fld, Year_Fld } from 'src/app/main/pages/global-attr'

const Controller = 'ReportParameterDetail'

@Component({
  selector: 'report-parameter-detail-form',
  templateUrl: './report-parameter-detail-form.component.html',
  styleUrls: ['./report-parameter-detail-form.component.scss']
})
export class ReportParameterDetailFormComponent {

  @Output() done = new EventEmitter()
  @Output() closed = new EventEmitter()
  @Input() ID: number
  @Input() reportParameterId: number
  @Input() reportParameterCode: number
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

  paramUrl: string
  changeHireType() {
    if (this.form.controls.HireType_Fld.value) {
      this.paramUrl = `*HireTypeParam/GetCombo/${this.form.controls.HireType_Fld.value}`
      this.form.controls.ParamID_Fld.enable()
    }
    else this.form.controls.ParamID_Fld.disable()
  }

  post() { 
    this.service.post(`${Controller}/GetParamUsed`, this.form.getRawValue()).toPromise().then((res: any) => {
      if (res.Data.IDCollect_Fld && res.Data.IDCollect_Fld != 0)
      {
        let text: string = `پارامتر انتخاب شده قبلا استفاده شده است، آیا مطمئن به ایجاد آن هستید؟`
        AlertClass.questionAlert({ text: text }, _ => {this.service.post(Controller, this.form.getRawValue()).subscribe((res: any) => this.done.emit(res.Data))} )
      }
      else
        this.service.post(`${Controller}/Create`, this.form.getRawValue()).subscribe((res: any) => { res && res.IsSuccess ? this.done.emit(res.Data) : null })
    })
  }

  put() { 
    this.service.post(`${Controller}/GetParamUsed`, this.form.getRawValue()).toPromise().then((res: any) => {
      if (res.Data.IDCollect_Fld && res.Data.IDCollect_Fld != 0)
      {
        let text: string = `پارامتر انتخاب شده قبلا استفاده شده است، آیا مطمئن به ایجاد آن هستید؟`
        AlertClass.questionAlert({ text: text }, _ => {this.service.post(`${Controller}/Update`, this.form.getRawValue()).subscribe((res: any) => this.done.emit(res.Data))} )
      }
      else
        this.service.post(`${Controller}/Update`, this.form.getRawValue()).subscribe((res: any) => { res && res.IsSuccess ? this.done.emit(res.Data) : null })
    })
  }

  form: UntypedFormGroup
  setForm() {
    Validation.form = this.formObj
    this.form = this.formBuilder.group({
      Id: [0],
      Year_Fld: [Year_Fld],
      Month_Fld: [Month_Fld],
      ParentCode_Fld: [null],
      HireTypeDesc_Fld: [null],
      HireType_Fld: [{ value: null, disabled: Validation.disable('HireType_Fld') }, Validation.setValidator('HireType_Fld')],
      ParamIDDesc_Fld: [null],
      ParamID_Fld: [{ value: null, disabled: Validation.disable('ParamID_Fld') }, Validation.setValidator('ParamID_Fld')],
      FormType:[{value: this.formType}]
    })
    if (this.formType != 'Add') {
      this.form.controls.ParentCode_Fld.patchValue(this.reportParameterId)
      this.form.patchValue(this.data)
    }
    else
      this.form.controls.ParentCode_Fld.patchValue(this.reportParameterCode)

    this.changeHireType()
    this.showModal = true
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

  constructor(private controlService: ControlMessageService, private service: GridFormService, private formBuilder: UntypedFormBuilder, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.formType != 'Add' ? this.get() : this.setForm()
    this.modalOptions = {
      formType: this.formType,
      modatTitle: 'پارامتر',
      saveCallback: this.save.bind(this),
      hideCallback: this.close.bind(this),
      maxWidth: 650
    }
  }

}
