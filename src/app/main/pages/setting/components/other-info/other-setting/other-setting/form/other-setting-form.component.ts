import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms'
import { DomSanitizer } from '@angular/platform-browser'
import { ToastrService } from 'ngx-toastr'
import { LoaderService } from 'src/app/common/loader/loader.service'

import { ControlMessageService } from 'src/app/main/main-body/common/custom-form/control-message/control-message.service'
import { Validation } from 'src/app/main/main-body/common/custom-form/control-message/Validation'
import { ModalOptions } from 'src/app/main/main-body/common/custom-modal/modal-options.interface'
import { GridFormService } from 'src/app/main/main-body/common/grid-form.service'

const Controller = 'OtherSetting'

@Component({
  selector: 'other-setting-form',
  templateUrl: './other-setting-form.component.html',
  styleUrls: ['./other-setting-form.component.scss']
})
export class OtherSettingFormComponent implements OnInit {

  @Output() done = new EventEmitter()
  @Output() closed = new EventEmitter()
  @Input() ID: number
  @Input() formType: string
  @Input() formObj: any
  @Input() CodeDesc_Fld: string

  data: any = {}
  get() {
    this.service.getById(Controller, this.ID, this.formType).toPromise().then((res: any) => {
      if (!res || !res.Data) return this.done.emit(false)
      else {
        this.data = res.Data
        this.setForm()
        this.switchValueField()
      }
    })
  }

  showCostCenter: boolean = false
  isMultiCostCenter: boolean = false
  switchValueField() {
    switch (this.data.Type_Fld) {
      case 100161:
        this.formObj.Value_Fld.type = 'string'
        this.showValue = true
        break;
      case 100162:
        this.formObj.Value_Fld.type = 'combo'
        this.data.Value_Fld = +this.data.Value_Fld
        this.form.controls.Value_Fld.patchValue(this.data.Value_Fld)
        //!changing ? this.comboDesc = this.data.ComboData.filter(a => a.Id = +this.form.controls.Value_Fld.value)[0].CodeDesc_Fld : null
        this.showComboValue = true
        break;
      case 100163:
        this.formObj.Value_Fld.type = 'multiCombo'
        if (this.form.controls.Value_Fld.value) this.form.controls.Value_Fld.patchValue(this.form.controls.Value_Fld.value.split(',').map(i => (i)))
        this.showMultiComboValue = true
        break;
      case 100164:
        this.formObj.Value_Fld.type = 'date'
        this.showValue = true
        break;
      case 100165:
        this.formObj.Value_Fld.type = 'bool'
        this.form.controls.Value_Fld.value == '1' ? this.form.controls.Value_Fld.setValue(true) : this.form.controls.Value_Fld.setValue(false)
        this.showValue = true
        break;
      case 100166:
        this.showInputPhoto = true
        break;
      case 100167:
        this.showCostCenter = true
        this.isMultiCostCenter = false
        break;
      case 100168:
        this.showCostCenter = true
        this.isMultiCostCenter = true
        break;
      case 100169:
        this.formObj.Value_Fld.type = 'textArea'
        this.showValue = true
        break;
      }
    this.showModal = true
  }

  showInputPhoto: boolean = false
  imgChange(event) {
    if (event.target.files && event.target.files.length > 0) {
      this.loaderService.show()
      var file = event.target.files[0]
      var ext = file.name.split('.')[1]
      var extType = file.type
      let maxSize = 500000

      if (!extType.match(/image\/*/)) {
        this.toastr.error('فرمت اشتباه است', 'خطا')
        this.form.controls.Photo_Fld.patchValue(null)
        return this.loaderService.hide()
      }

      if (file.size < maxSize) {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        return reader.onload = _event => {
          this.form.controls.Photo_Fld.patchValue(reader.result)
          this.loaderService.hide()
        }
      }
      else {
        this.toastr.error('سایز فایل انتخابی می بایست کوچکتر از ۵۰ کیلوبایت باشد', 'خطا')
        this.form.controls.Photo_Fld.patchValue(null)
        this.loaderService.hide()
      }
    }
  }

  put(fakeFormValue) { this.service.post(`${Controller}/Update`, fakeFormValue).subscribe((res: any) => this.done.emit(res.Data)) }

  form: UntypedFormGroup
  setForm() {
    Validation.form = this.formObj
    this.form = this.formBuilder.group({
      Id: [this.ID],
      Year_Fld: [null],
      Month_Fld: [null],
      OtherSettingDefine_Fld: [null],
      CodeDesc_Fld: [{ value: null, disabled: Validation.disable('CodeDesc_Fld') }, Validation.setValidator('CodeDesc_Fld')],
      Type_Fld: [null],
      ValueDesc_Fld: [null],
      Value_Fld: [{ value: null, disabled: Validation.disable('Value_Fld') }, Validation.setValidator('Value_Fld')],
      Photo_Fld: [{ value: null, disabled: Validation.disable('Photo_Fld') }, Validation.setValidator('Photo_Fld')],
      FormType:[{value: this.formType}]
    })
    this.form.patchValue(this.data)
    this.form.controls.CodeDesc_Fld.patchValue(this.CodeDesc_Fld)
  }

  save() {
    let fakeFormValue = { ...this.form.value }
    this.data.Type_Fld == 100163 ? this.fixMultiCombo(fakeFormValue) : null

    if (this.form.invalid) return this.controlService.isSubmitted = true

    if (this.formType == 'Edit') this.put(fakeFormValue)
  }

  fixMultiCombo(form) { if (form.Value_Fld) form.Value_Fld = form.Value_Fld.toString() }

  showModal: boolean = false
  close() {
    this.showModal = false
    this.closed.emit()
  }

  showCostCenterModal: boolean = false
  onShowCostCenterModal() {
    this.showCostCenterModal = true
  }

  clearCostCenter() {
    this.form.controls.Value_Fld.patchValue(null)
  }

  nodeSelected(obj) {
    if (obj.ids) {
      this.form.controls.Value_Fld.setValue(obj.ids)
      this.form.controls.ValueDesc_Fld.setValue(obj.names)
    }
    else {
      this.form.controls.Value_Fld.patchValue(obj.Id)
      this.form.controls.ValueDesc_Fld.patchValue(obj.name)
    }
    this.showCostCenterModal = false
  }

  closedCostCenterModal() { this.showCostCenterModal = false }

  showValue: boolean = false
  showComboValue: boolean = false
  showMultiComboValue: boolean = false
  typeId: number

  modalOptions: ModalOptions

  constructor(private controlService: ControlMessageService, private service: GridFormService, private formBuilder: UntypedFormBuilder, private toastr: ToastrService, private loaderService: LoaderService) { }

  ngOnInit(): void {
    this.formObj.CodeDesc_Fld = {
      Group: null,
      Relation: null,
      cboquery: null,
      disableInput: true,
      field: "CodeDesc_Fld",
      headerName: "عنوان",
      hidenValue: false,
      ishidden: false,
      range: 0,
      require: false,
      type: "string",
      viewChild: false
    }
    this.get()
    this.modalOptions = {
      formType: this.formType, modatTitle: 'مقداردهی به تنظیمات', maxWidth: 900,
      saveCallback: this.save.bind(this),
      hideCallback: this.close.bind(this)
    }
  }

}
