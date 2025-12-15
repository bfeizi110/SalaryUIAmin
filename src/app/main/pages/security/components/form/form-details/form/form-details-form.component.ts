import { Component, EventEmitter, Input, Output } from '@angular/core'
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms'

import { ControlMessageService } from 'src/app/main/main-body/common/custom-form/control-message/control-message.service'
import { Validation } from 'src/app/main/main-body/common/custom-form/control-message/Validation'
import { ModalOptions } from 'src/app/main/main-body/common/custom-modal/modal-options.interface'
import { GridFormService } from 'src/app/main/main-body/common/grid-form.service'

const Controller = 'FormDetails'

@Component({
  selector: 'form-details-form',
  templateUrl: './form-details-form.component.html',
  styleUrls: ['./form-details-form.component.scss']
})
export class FormDetailsFormComponent {

  @Output() done = new EventEmitter()
  @Output() closed = new EventEmitter()
  @Input() FormID: number
  @Input() ID: number
  @Input() formType: string
  @Input() formObj: any
  @Input() EntityName: string
  @Input() DynamicFormType: number
  @Input() TabCount: number
  data: any = {}
  isPerson: boolean = false;
  ComboUrl: string = ''
  EntityPropertyCombo = []
  fieldType: string = ''
  get() {
    this.service.getById(Controller, this.ID, this.formType).toPromise().then((res: any) => {
      const data = res?.body?.Data || res?.Data;
      if (data?.DefaultValue_Fld == "BAMPERSONID")
        this.isPerson = true
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
  EntityPropertyUri: string
  setForm() {
    Validation.form = this.formObj
    this.form = this.formBuilder.group({
      Id: [0],
      FormID_Fld: [this.FormID],
      EntityPropertyID_Fld: [{ value: null, disabled: Validation.disable('EntityPropertyID_Fld') }, Validation.setValidator('EntityPropertyID_Fld')],
      EntityPropertyIDDesc_Fld: [null],
      ShowFormSize_Fld: [{ value: null, disabled: Validation.disable('ShowFormSize_Fld') }, Validation.setValidator('ShowFormSize_Fld')],

      DisableInput_Fld: [{ value: null, disabled: Validation.disable('DisableInput_Fld') }, Validation.setValidator('DisableInput_Fld')],
      HiddenValue_Fld: [{ value: null, disabled: Validation.disable('HiddenValue_Fld') }, Validation.setValidator('HiddenValue_Fld')],
      IsHidden_Fld: [{ value: null, disabled: Validation.disable('IsHidden_Fld') }, Validation.setValidator('IsHidden_Fld')],
      ShowInGrid_Fld: [{ value: null, disabled: Validation.disable('ShowInGrid_Fld') }, Validation.setValidator('ShowInGrid_Fld')],
      Range_Fld: [{ value: null, disabled: Validation.disable('Range_Fld') }, Validation.setValidator('Range_Fld')],
      ShowGridSize_Fld: [{ value: null, disabled: Validation.disable('ShowGridSize_Fld') }, Validation.setValidator('ShowGridSize_Fld')],
      ShowOrder_Fld: [{ value: null, disabled: Validation.disable('ShowOrder_Fld') }, Validation.setValidator('ShowOrder_Fld')],
      Query_Fld: [{ value: null, disabled: Validation.disable('Query_Fld') }, Validation.setValidator('Query_Fld')],
      DefaultValue_Fld: [{ value: null, disabled: Validation.disable('DefaultValue_Fld') }, Validation.setValidator('DefaultValue_Fld')],
      DefaultValueDesc_Fld: [null],
      Group_Fld: [{ value: null, disabled: Validation.disable('Group_Fld') }, Validation.setValidator('Group_Fld')],
      ImageButtonDesc_Fld: [{ value: null, disabled: Validation.disable('ImageButtonDesc_Fld') }, Validation.setValidator('ImageButtonDesc_Fld')],
      ShowOrderInGrid_Fld: [{ value: null, disabled: Validation.disable('ShowOrderInGrid_Fld') }, Validation.setValidator('ShowOrderInGrid_Fld')],
      TabNo_Fld: [{ value: null, disabled: Validation.disable('TabNo_Fld') }, Validation.setValidator('TabNo_Fld')],

      RequireInRelate_Fld: [{ value: null, disabled: Validation.disable('RequireInRelate_Fld') }, Validation.setValidator('RequireInRelate_Fld')],
      EntityPropertyRelateIDRequireInRelate_Fld: [{ value: null, disabled: Validation.disable('EntityPropertyRelateIDRequireInRelate_Fld') }, Validation.setValidator('EntityPropertyRelateIDRequireInRelate_Fld')],
      EntityPropertyRelateIDDescRequireInRelate_Fld: [null],
      EntityPropertyRelateValueRequireInRelate_Fld: [{ value: null, disabled: Validation.disable('EntityPropertyRelateValueRequireInRelate_Fld') }, Validation.setValidator('EntityPropertyRelateValueRequireInRelate_Fld')],
      EntityPropertyRelateValueDescRequireInRelate_Fld: [null],
      EntityPropertyRelateTypeRequireInRelate_Fld: [null],
      EntityPropertyRelateComboRequireInRelate_Fld: [null],

      HiddenInRelate_Fld: [{ value: null, disabled: Validation.disable('HiddenInRelate_Fld') }, Validation.setValidator('HiddenInRelate_Fld')],
      EntityPropertyRelateIDHiddenInRelate_Fld: [{ value: null, disabled: Validation.disable('EntityPropertyRelateIDHiddenInRelate_Fld') }, Validation.setValidator('EntityPropertyRelateIDHiddenInRelate_Fld')],
      EntityPropertyRelateIDDescHiddenInRelate_Fld: [null],
      EntityPropertyRelateValueHiddenInRelate_Fld: [{ value: null, disabled: Validation.disable('EntityPropertyRelateValueHiddenInRelate_Fld') }, Validation.setValidator('EntityPropertyRelateValueHiddenInRelate_Fld')],
      EntityPropertyRelateValueDescHiddenInRelate_Fld: [null],
      EntityPropertyRelateTypeHiddenInRelate_Fld: [null],
      EntityPropertyRelateComboHiddenInRelate_Fld: [null],

      Type_Fld: [101201],
      TypeDesc_Fld: [null],

      Ltr_Fld: [{ value: null, disabled: Validation.disable('Ltr_Fld') }, Validation.setValidator('Ltr_Fld')],
      MultiLineText_Fld: [{ value: null, disabled: Validation.disable('MultiLineText_Fld') }, Validation.setValidator('MultiLineText_Fld')],
      MultiLineTextNo_Fld: [{ value: null, disabled: Validation.disable('MultiLineTextNo_Fld') }, Validation.setValidator('MultiLineTextNo_Fld')],

      FormType: [{ value: this.formType }]

    })
    if (this.data.Query_Fld)
      this.ComboUrl = `*EntityProperty/GetEntityPropertyByIDCombo/${this.data.EntityPropertyID_Fld}`

    if (this.data.EntityPropertyRelateComboRequireInRelate_Fld)
      this.ComboRelateRequireUrl = `*EntityProperty/GetEntityPropertyByIDCombo/${this.data.EntityPropertyRelateIDRequireInRelate_Fld}`

    if (this.data.EntityPropertyRelateComboHiddenInRelate_Fld)
      this.ComboRelateHiddenUrl = `*EntityProperty/GetEntityPropertyByIDCombo/${this.data.EntityPropertyRelateIDHiddenInRelate_Fld}`

    this.formType != 'Add' ? this.form.patchValue(this.data) : null
    this.changeType()
    this.changeRelateType("Require")
    this.changeRelateType("Hidden")
    this.EntityPropertyUri = `*EntityProperty/GetComboNew/${this.EntityName}`
    this.service.getCombo(this.EntityPropertyUri).toPromise().then((res: any) => {
      this.EntityPropertyCombo = res.Data
      if (this.formType != 'Add') this.changeEProperty(this.data.EntityPropertyID_Fld)
    })
    this.showModal = true
    this.changeDynamicFormType()
  }
  changeDynamicFormType() {
    if (this.DynamicFormType == 100953)
    {
        this.form.controls.ShowOrderInGrid_Fld.setValidators(Validation.required())
        this.form.controls.ShowOrder_Fld.clearValidators()
        this.form.controls.ShowInGrid_Fld.patchValue(true)
        this.form.controls.ShowInGrid_Fld.disable()
    }
  }

  changeRelateType(Type: string) {
    if (Type == "Require")
      if (this.form.controls.RequireInRelate_Fld.value) {
        this.form.controls.EntityPropertyRelateIDRequireInRelate_Fld.setValidators(Validation.required())
        this.form.controls.EntityPropertyRelateIDRequireInRelate_Fld.updateValueAndValidity()
        this.formObj.EntityPropertyRelateIDRequireInRelate_Fld ? this.formObj.EntityPropertyRelateIDRequireInRelate_Fld.require = true : null
      }
      else {
        this.form.controls.EntityPropertyRelateIDRequireInRelate_Fld.clearValidators()
        this.form.controls.EntityPropertyRelateIDRequireInRelate_Fld.updateValueAndValidity()
        this.formObj.EntityPropertyRelateIDRequireInRelate_Fld ? this.formObj.EntityPropertyRelateIDRequireInRelate_Fld.require = false : null
      }
    if (Type == "Hidden")
      if (this.form.controls.HiddenInRelate_Fld.value) {
        this.form.controls.EntityPropertyRelateIDHiddenInRelate_Fld.setValidators(Validation.required())
        this.form.controls.EntityPropertyRelateIDHiddenInRelate_Fld.updateValueAndValidity()
        this.formObj.EntityPropertyRelateIDHiddenInRelate_Fld ? this.formObj.EntityPropertyRelateIDHiddenInRelate_Fld.require = true : null
      }
      else {
        this.form.controls.EntityPropertyRelateIDHiddenInRelate_Fld.clearValidators()
        this.form.controls.EntityPropertyRelateIDHiddenInRelate_Fld.updateValueAndValidity()
        this.formObj.EntityPropertyRelateIDHiddenInRelate_Fld ? this.formObj.EntityPropertyRelateIDHiddenInRelate_Fld.require = false : null
      }
  }

  ComboRelateRequireUrl
  ComboRelateHiddenUrl
  changeRelate(Type: string) {
    if (Type == "Require" && this.form.controls.EntityPropertyRelateIDRequireInRelate_Fld.value)
      this.service.getByIdSimple(`EntityProperty/${this.EntityName}`, this.form.controls.EntityPropertyRelateIDRequireInRelate_Fld.value).toPromise().then((res: any) => {
        this.form.controls.EntityPropertyRelateTypeRequireInRelate_Fld.patchValue(res.Data.IsDate_Fld ? "date" : res.Data.Type_Fld)
        this.form.controls.EntityPropertyRelateComboRequireInRelate_Fld.patchValue(res.Data.Query_Fld)
        if (this.form.controls.EntityPropertyRelateComboRequireInRelate_Fld.value)
          this.ComboRelateRequireUrl = `*EntityProperty/GetEntityPropertyByIDCombo/${this.form.controls.EntityPropertyRelateIDRequireInRelate_Fld.value}`
      })
    if (Type == "Hidden" && this.form.controls.EntityPropertyRelateIDHiddenInRelate_Fld.value)
      this.service.getByIdSimple(`EntityProperty/${this.EntityName}`, this.form.controls.EntityPropertyRelateIDHiddenInRelate_Fld.value).toPromise().then((res: any) => {
        this.form.controls.EntityPropertyRelateTypeHiddenInRelate_Fld.patchValue(res.Data.IsDate_Fld ? "date" : res.Data.Type_Fld)
        this.form.controls.EntityPropertyRelateComboHiddenInRelate_Fld.patchValue(res.Data.Query_Fld)
        if (this.form.controls.EntityPropertyRelateComboHiddenInRelate_Fld.value)
          this.ComboRelateHiddenUrl = `*EntityProperty/GetEntityPropertyByIDCombo/${this.form.controls.EntityPropertyRelateIDHiddenInRelate_Fld.value}`
      })
  }
  changeEProperty(prop) {
    let Query = this.EntityPropertyCombo.find(p => p.Id == prop)?.Query_Fld;
    Query ? this.ComboUrl = `*EntityProperty/GetEntityPropertyByIDCombo/${prop}` : this.ComboUrl = ``
    this.fieldType = this.EntityPropertyCombo.find(p => p.Id == prop)?.Type_Fld;
  }

  changeType() {
    if (this.form.controls.Type_Fld.value != 101201) {
      this.form.controls.EntityPropertyID_Fld.clearValidators()
      this.formObj.EntityPropertyID_Fld ? this.formObj.EntityPropertyID_Fld.require = false : null
      this.formObj.EntityPropertyIDDesc_Fld ? this.formObj.EntityPropertyIDDesc_Fld.require = false : null
      this.form.controls.EntityPropertyID_Fld.updateValueAndValidity()
      this.form.controls.ShowFormSize_Fld.clearValidators()
      this.form.controls.ShowFormSize_Fld.updateValueAndValidity();
      this.formObj.ShowFormSize_Fld ? this.formObj.ShowFormSize_Fld.require = false : null
      this.form.controls.EntityPropertyID_Fld.patchValue(null)
      this.form.controls.ShowFormSize_Fld.patchValue(null)
    }
    else {
      this.form.controls.EntityPropertyID_Fld.setValidators(Validation.required())
      this.form.controls.EntityPropertyID_Fld.updateValueAndValidity()
      this.formObj.EntityPropertyID_Fld ? this.formObj.EntityPropertyID_Fld.require = true : null
      this.formObj.EntityPropertyIDDesc_Fld ? this.formObj.EntityPropertyIDDesc_Fld.require = true : null
      // this.formObj.ShowFormSize_Fld ? this.formObj.ShowFormSize_Fld.require = true : null 
      // this.form.controls.ShowFormSize_Fld.setValidators(Validation.required())
      // this.form.controls.ShowFormSize_Fld.updateValueAndValidity();
    }
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

  ngOnChanges(UpdatedValue: string): void {
    this.formType != 'Add' ? this.get() : this.setForm()
    this.modalOptions = {
      formType: this.formType,
      modatTitle: 'مشخصات جزء فرم',
      saveCallback: this.save.bind(this),
      hideCallback: this.close.bind(this),
    }
  }

  ChangePrsValue(event) { event.checked ? this.form.controls.DefaultValue_Fld.setValue("BAMPERSONID") : this.form.controls.DefaultValue_Fld.setValue(null) }
}
