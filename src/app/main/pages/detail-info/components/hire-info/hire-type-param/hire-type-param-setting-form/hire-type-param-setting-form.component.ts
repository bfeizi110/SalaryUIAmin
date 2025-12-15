import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core'
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms'
import { ControlMessageService } from 'src/app/main/main-body/common/custom-form/control-message/control-message.service'
import { GridFormService } from 'src/app/main/main-body/common/grid-form.service'
import { Validation } from 'src/app/main/main-body/common/custom-form/control-message/Validation'
import { HireTypeParamSettingAttr, Month_Fld, setHireTypeParamSettingAttr, Year_Fld } from 'src/app/main/pages/global-attr'
import { ModalOptions } from 'src/app/main/main-body/common/custom-modal/modal-options.interface'

const Controller = 'HireTypeParamSetting'

@Component({
  selector: 'hire-type-param-setting-form',
  templateUrl: './hire-type-param-setting-form.component.html',
  styleUrls: ['./hire-type-param-setting-form.component.scss']
})
export class HireTypeParamSettingFormComponent implements OnInit {

  @Output() closed = new EventEmitter()
  @Output() done = new EventEmitter()

  @Input() paramId: number

  formObj: any
  getAttr() {
    !HireTypeParamSettingAttr
      ? this.service.getAttr(Controller).subscribe((res: any) => this.setAttr(res.Data, 'toLocal'))
      : this.setAttr(HireTypeParamSettingAttr)
  }

  setAttr(attr, type?) {
    this.checkAccess(attr)
    this.formObj = attr.EntityAttribute
    type == 'toLocal' ? setHireTypeParamSettingAttr(attr) : null
    this.getById()
  }

  EditPolicy: boolean = false
  checkAccess(attr) { attr.EntityAccess.includes('EditPolicy') ? this.EditPolicy = true : null }

  data: any = {}
  formType: string = ''
  getById() {
    this.service.getById(Controller, this.paramId, 'View').toPromise().then((res: any) => {
      if (!res || !res.Data) return this.done.emit(false)
      else {
        this.data = res.Data
        this.setForm()
      }
    })
  }

  put() { this.service.post(`${Controller}/Update`, this.form.getRawValue()).subscribe(_ => this.done.emit()) }

  form: UntypedFormGroup
  setForm() {
    Validation.form = this.formObj
    this.form = this.formBuilder.group({
      Id: [0],
      Year_Fld: [Year_Fld],
      Month_Fld: [Month_Fld],
      ParamID_Fld: [this.paramId],
      InJari_Fld: [{ value: null, disabled: Validation.disable('InJari_Fld') }, Validation.setValidator('InJari_Fld')],
      NotCalcBPay_Fld: [{ value: null, disabled: Validation.disable('NotCalcBPay_Fld') }, Validation.setValidator('NotCalcBPay_Fld')],
      InActive_Fld: [{ value: null, disabled: Validation.disable('InActive_Fld') }, Validation.setValidator('InActive_Fld')],
      SayerM_Fld: [{ value: null, disabled: Validation.disable('SayerM_Fld') }, Validation.setValidator('SayerM_Fld')],
      SayerMDesc_Fld: [null],
      ParamStatusDesc_Fld: [null],
      ParamStatus_Fld: [{ value: null, disabled: Validation.disable('ParamStatus_Fld') }, Validation.setValidator('ParamStatus_Fld')],
      ParamGroupIDDesc_Fld: [null],
      ParamGroupID_Fld: [{ value: null, disabled: Validation.disable('ParamGroupID_Fld') }, Validation.setValidator('ParamGroupID_Fld')],
      TaxPayType1403Desc_Fld: [null],
      TaxPayType1403_Fld: [{ value: null, disabled: Validation.disable('TaxPayType1403_Fld') }, Validation.setValidator('TaxPayType1403_Fld')],
      FormType:[{value: this.formType}]
    })
    this.form.patchValue(this.data)
    !this.form.value.Year_Fld ? this.form.controls.Year_Fld.patchValue(Year_Fld) : null
    !this.form.value.Month_Fld ? this.form.controls.Month_Fld.patchValue(Month_Fld) : null
    !this.form.value.ParamID_Fld ? this.form.controls.ParamID_Fld.patchValue(this.paramId) : null
    this.EditPolicy ? Object.assign(this.modalOptions, { saveCallback: this.save.bind(this) }) : null
    this.showModal = true
  }

  save() {
    if (this.form.invalid) return this.controlService.isSubmitted = true
    this.put()
  }

  showModal: boolean = false
  close() {
    this.showModal = false
    this.closed.emit()
  }

  modalOptions: ModalOptions

  constructor(private controlService: ControlMessageService, private service: GridFormService, private formBuilder: UntypedFormBuilder) { }

  ngOnInit(): void {
    this.getAttr()
    this.modalOptions = {
      formType: this.formType,
      modatTitle: 'تنظیمات اطلاعات پارامترهای مربوط به هر استخدام',
      hideCallback: this.close.bind(this)
    }
  }

}
