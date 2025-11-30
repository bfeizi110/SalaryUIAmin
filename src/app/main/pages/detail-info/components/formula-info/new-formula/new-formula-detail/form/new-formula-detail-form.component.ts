import { Component, Output, EventEmitter, Input } from '@angular/core'
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms'
import { ControlMessageService } from 'src/app/main/main-body/common/custom-form/control-message/control-message.service'
import { GridFormService } from 'src/app/main/main-body/common/grid-form.service'
import { Validation } from 'src/app/main/main-body/common/custom-form/control-message/Validation'
import { ModalOptions } from 'src/app/main/main-body/common/custom-modal/modal-options.interface'

const Controller = 'NewFormulaDetail'

@Component({
  selector: 'new-formula-detail-form',
  templateUrl: './new-formula-detail-form.component.html',
  styleUrls: ['./new-formula-detail-form.component.scss']
})
export class NewFormulaDetailFormComponent {

  @Output() done = new EventEmitter()
  @Output() closed = new EventEmitter()
  @Input() ID: number
  @Input() formType: string
  @Input() formObj: any
  @Input() newFormulaId: number

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
  setForm() {
    Validation.form = this.formObj
    this.form = this.formBuilder.group({
      Id: [0],
      FormulaCode_Fld: [this.newFormulaId],
      InputName_Fld: [{ value: null, disabled: Validation.disable('InputName_Fld') }, Validation.setValidator('InputName_Fld')],
      TypeDesc_Fld: [null],
      Type_Fld: [{ value: null, disabled: Validation.disable('Type_Fld') }, Validation.setValidator('Type_Fld')],
      SystemTypeDesc_Fld: [null],
      SystemType_Fld: [{ value: null, disabled: Validation.disable('SystemType_Fld') }, Validation.setValidator('SystemType_Fld')],
      FieldNameFarsi_Fld: [null],
      FieldName_Fld: [{ value: null, disabled: Validation.disable('FieldName_Fld') }, Validation.setValidator('FieldName_Fld')],
      FormNameFarsi_Fld: [null],
      FormName_Fld: [{ value: null, disabled: Validation.disable('FormName_Fld') }, Validation.setValidator('FormName_Fld')],
      Order_Fld: [{ value: null, disabled: Validation.disable('Order_Fld') }, Validation.setValidator('Order_Fld')],
      FixValue_Fld: [{ value: null, disabled: Validation.disable('FixValue_Fld') }, Validation.setValidator('FixValue_Fld')],
      FormType:[{value: this.formType}]
    })
    this.formType != 'Add' ? this.form.patchValue(this.data) : null
    this.changeType()
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

  EntityPropertyUrl: string = ''
  changeEntity() {
    this.EntityPropertyUrl = `*EntityProperty/GetComboNew/${this.form.controls.FormName_Fld.value}`
    this.form.controls.FieldName_Fld.patchValue(null)
  }

  changeType() {
    this.formObj.SystemTypeDesc_Fld.ishidden = true
    this.formObj.FormNameFarsi_Fld.ishidden = true
    this.formObj.FieldNameFarsi_Fld.ishidden = true
    this.formObj.FixValue_Fld.ishidden = true
    if (this.form.controls.Type_Fld.value == 100422) { //مقادیر سیستمی
      this.form.controls.SystemType_Fld.enable()
      this.form.controls.SystemType_Fld.setValidators([Validation.required()])
      this.form.controls.FormName_Fld.disable()
      this.form.controls.FormName_Fld.clearValidators()
      this.form.controls.FormName_Fld.patchValue(null)
      this.form.controls.FieldName_Fld.disable()
      this.form.controls.FieldName_Fld.patchValue(null)
      this.form.controls.FieldName_Fld.clearValidators()
      this.form.controls.FixValue_Fld.clearValidators()
      this.form.controls.FixValue_Fld.patchValue(null)
      this.form.controls.FixValue_Fld.disable()
    }
    else if (this.form.controls.Type_Fld.value == 100421) { //انتقال از فرم
      this.form.controls.SystemType_Fld.disable()
      this.form.controls.SystemType_Fld.clearValidators()
      this.form.controls.SystemType_Fld.patchValue(null)
      this.form.controls.FormName_Fld.enable()
      this.form.controls.FormName_Fld.setValidators([Validation.required()])
      this.form.controls.FieldName_Fld.enable()
      this.form.controls.FieldName_Fld.setValidators([Validation.required()])
      this.form.controls.FixValue_Fld.clearValidators()
      this.form.controls.FixValue_Fld.patchValue(null)
      this.form.controls.FixValue_Fld.disable()
    }

    if (this.form.controls.Type_Fld.value == 100423) {
      this.form.controls.FixValue_Fld.enable()
      this.form.controls.FixValue_Fld.setValidators([Validation.required()])
      this.form.controls.SystemType_Fld.disable()
      this.form.controls.SystemType_Fld.clearValidators()
      this.form.controls.SystemType_Fld.patchValue(null)
      this.form.controls.FormName_Fld.disable()
      this.form.controls.FormName_Fld.clearValidators()
      this.form.controls.FormName_Fld.patchValue(null)
      this.form.controls.FieldName_Fld.disable()
      this.form.controls.FieldName_Fld.patchValue(null)
      this.form.controls.FieldName_Fld.clearValidators()
    }

    setTimeout(() => {
      this.formObj.SystemTypeDesc_Fld.ishidden = false
      this.formObj.FormNameFarsi_Fld.ishidden = false
      this.formObj.FieldNameFarsi_Fld.ishidden = false
      this.formObj.FixValue_Fld.ishidden = false
    })
  }

  modalOptions: ModalOptions

  constructor(private controlService: ControlMessageService, private service: GridFormService, private formBuilder: UntypedFormBuilder) { }

  ngOnChanges(UpdatedValue: string): void {
    this.formType != 'Add' ? this.get() : this.setForm()
    this.modalOptions = {
      formType: this.formType,
      modatTitle: 'پارامترهای ورودی فرمولهای محاسباتی',
      saveCallback: this.save.bind(this),
      hideCallback: this.close.bind(this),
    }
  }

}
