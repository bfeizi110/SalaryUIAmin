import { Month_Fld, Year_Fld } from '../../../../../global-attr'
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms'

import { ControlMessageService } from 'src/app/main/main-body/common/custom-form/control-message/control-message.service'
import { Validation } from 'src/app/main/main-body/common/custom-form/control-message/Validation'
import { GridFormService } from 'src/app/main/main-body/common/grid-form.service'

const Controller = 'Insure'

@Component({
  selector: 'insure-form',
  templateUrl: './insure-form.component.html',
  styleUrls: ['./insure-form.component.scss']
})
export class InsureFormComponent {

  @Output() done = new EventEmitter()
  @Output() closed = new EventEmitter()
  @Input() ID: number
  @Input() formType: string
  @Input() formObj: any
  @Input() typeInsId

  showOtherFields: boolean = false

  data: any = {}
  getById() {
    this.service.getById(Controller, this.ID, this.formType).toPromise().then((res: any) => {
      if (!res || !res.Data) return this.done.emit(false)
      else {
        this.data = res.Data
        this.setForm()
      }
    })
  }

  getAttrByType(id?) {
    id ? this.typeInsId = id : null
    this.service.getAttrById(Controller, this.typeInsId).subscribe((res: any) => {
      this.formObj = res.Data.EntityAttribute
      this.formType != 'Add' ? this.getById() : this.setForm()
    })
  }

  post() {
    this.form.patchValue({ Id: 0 })
    this.service.post(`${Controller}/Create`, this.form.getRawValue()).subscribe((res: any) => this.done.emit(res.Data))
  }

  put() { this.service.post(`${Controller}/Update`, this.form.getRawValue()).subscribe((res: any) => this.done.emit(res.Data)) }

  form: UntypedFormGroup
  setForm() {
    Validation.form = this.formObj
    this.formType == "Add" ? this.form.reset() : null
    this.form = this.formBuilder.group({
      Id: [null],
      Code_Fld: [null],
      CodeDesc_Fld: [{ value: null, disabled: Validation.disable('CodeDesc_Fld') }, Validation.setValidator('CodeDesc_Fld')],
      TypeInsure_Fld: [{ value: this.typeInsId }, Validation.setValidator('TypeInsure_Fld')],
      TypeInsureDesc_Fld: [null],
      Year_Fld: [Year_Fld],
      Month_Fld: [Month_Fld],
      NewInsureType_Fld: [{ value: null, disabled: Validation.disable('NewInsureType_Fld') }, Validation.setValidator('NewInsureType_Fld')],
      InsureParam1_Fld: [{ value: null, disabled: Validation.disable('InsureParam1_Fld') }, Validation.setValidator('InsureParam1_Fld')],
      InsureParam2_Fld: [{ value: null, disabled: Validation.disable('InsureParam2_Fld') }, Validation.setValidator('InsureParam2_Fld')],
      InsureParam3_Fld: [{ value: null, disabled: Validation.disable('InsureParam3_Fld') }, Validation.setValidator('InsureParam3_Fld')],
      InsureParam4_Fld: [{ value: null, disabled: Validation.disable('InsureParam4_Fld') }, Validation.setValidator('InsureParam4_Fld')],
      InsureParam5_Fld: [{ value: null, disabled: Validation.disable('InsureParam5_Fld') }, Validation.setValidator('InsureParam5_Fld')],
      InsureParam6_Fld: [{ value: null, disabled: Validation.disable('InsureParam6_Fld') }, Validation.setValidator('InsureParam6_Fld')],
      IsBaz_Fld: [{ value: null, disabled: Validation.disable('IsBaz_Fld') }, Validation.setValidator('IsBaz_Fld')],
      MoafParam1_Fld: [{ value: null, disabled: Validation.disable('MoafParam1_Fld') }, Validation.setValidator('MoafParam1_Fld')],
      MoafParam2_Fld: [{ value: null, disabled: Validation.disable('MoafParam2_Fld') }, Validation.setValidator('MoafParam2_Fld')],
      MoafParam3_Fld: [{ value: null, disabled: Validation.disable('MoafParam3_Fld') }, Validation.setValidator('MoafParam3_Fld')],
      MoafParam4_Fld: [{ value: null, disabled: Validation.disable('MoafParam4_Fld') }, Validation.setValidator('MoafParam4_Fld')],
      MashmoolTypeDesc_Fld: [null],
      MashmoolType_Fld: [{ value: null, disabled: Validation.disable('MashmoolType_Fld') }, Validation.setValidator('MashmoolType_Fld')],
      NoTransfer_Fld: [{ value: null, disabled: Validation.disable('NoTransfer_Fld') }, Validation.setValidator('NoTransfer_Fld')],
      MashParam1_Fld: [{ value: null, disabled: Validation.disable('MashParam1_Fld') }, Validation.setValidator('MashParam1_Fld')],
      MashParam2_Fld: [{ value: null, disabled: Validation.disable('MashParam2_Fld') }, Validation.setValidator('MashParam2_Fld')],
      MashParam3_Fld: [{ value: null, disabled: Validation.disable('MashParam3_Fld') }, Validation.setValidator('MashParam3_Fld')],
      MashParam4_Fld: [{ value: null, disabled: Validation.disable('MashParam4_Fld') }, Validation.setValidator('MashParam4_Fld')],
      MashParam5_Fld: [{ value: null, disabled: Validation.disable('MashParam5_Fld') }, Validation.setValidator('MashParam5_Fld')],
      MashParam6_Fld: [{ value: null, disabled: Validation.disable('MashParam6_Fld') }, Validation.setValidator('MashParam6_Fld')],
      Vat_Fld: [{ value: null, disabled: Validation.disable('Vat_Fld') }, Validation.setValidator('Vat_Fld')],
      TopPrice_Fld: [{ value: null, disabled: Validation.disable('TopPrice_Fld') }, Validation.setValidator('TopPrice_Fld')],
      InsureParam3_State_Fld: [{ value: null, disabled: Validation.disable('InsureParam3_State_Fld') }, Validation.setValidator('InsureParam3_State_Fld')],
      InsureParam3_Employer_Fld: [{ value: null, disabled: Validation.disable('InsureParam3_Employer_Fld') }, Validation.setValidator('InsureParam3_Employer_Fld')],
      CalcBackPay_Fld: [{ value: null, disabled: Validation.disable('CalcBackPay_Fld') }, Validation.setValidator('CalcBackPay_Fld')],
      MainInsureCode_Fld: [{ value: null, disabled: Validation.disable('MainInsureCode_Fld') }, Validation.setValidator('MainInsureCode_Fld')],
      NewFormulaID_Fld: [{ value: null, disabled: Validation.disable('NewFormulaID_Fld') }, Validation.setValidator('NewFormulaID_Fld')],
      DownPrice_Fld: [{ value: null, disabled: Validation.disable('DownPrice_Fld') }, Validation.setValidator('DownPrice_Fld')],
      AllToDaraei_Fld: [{ value: null, disabled: Validation.disable('AllToDaraei_Fld') }, Validation.setValidator('AllToDaraei_Fld')],
      FormType:[{value: this.formType}]
    })
    this.showTypeIns = false
    this.getInsCombo = false
    this.form.controls.Id.patchValue(this.ID)
    setTimeout(() => {
      if (this.formType == 'Add')  this.getInsCombo = true
       this.form.controls.TypeInsure_Fld.patchValue(null)
       this.form.controls.TypeInsure_Fld.setValidators([Validators.required])
      this.showTypeIns = true
      setTimeout(() => this.form.controls.TypeInsure_Fld.patchValue(this.typeInsId))
      this.form.patchValue(this.data)
      this.showOtherFields = true
      setTimeout(() => {
        this.service.scrollToElement("form")
      }, 200); 
    })
  }

  getInsCombo: boolean = false

  showTypeIns: boolean = false

  TypeInsureChange(id) { this.getAttrByType(id) }

  save() {
    if (this.form.invalid) return this.controlService.isSubmitted = true
    if (this.formType == 'Add') return this.post()

    if (this.formType == 'Edit') this.put()
  }

  close() {
    this.closed.emit()
  }

  constructor(private controlService: ControlMessageService, private service: GridFormService, private formBuilder: UntypedFormBuilder) { }

  ngOnChanges(UpdatedValue: string): void {
    this.form?.reset()
    this.data = {}
    if (this.formType == 'Add') {
      this.showOtherFields = false
      this.showTypeIns = true
      Validation.form = this.formObj
      this.form = this.formBuilder.group({
        TypeInsure_Fld: [{ value: null, disabled: Validation.disable('TypeInsure_Fld') }, Validation.setValidator('TypeInsure_Fld')],
        FormType:[{value: this.formType}]
      })
    }
    else {
      this.showTypeIns = false
      this.getAttrByType()
    }
  }

}
