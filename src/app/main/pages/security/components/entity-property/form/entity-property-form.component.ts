import { Component, EventEmitter, Input, Output } from '@angular/core'
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms'

import { ControlMessageService } from 'src/app/main/main-body/common/custom-form/control-message/control-message.service'
import { Validation } from 'src/app/main/main-body/common/custom-form/control-message/Validation'
import { ModalOptions } from 'src/app/main/main-body/common/custom-modal/modal-options.interface'
import { GridFormService } from 'src/app/main/main-body/common/grid-form.service'

const Controller = 'EntityProperty'

@Component({
  selector: 'entity-property-form',
  templateUrl: './entity-property-form.component.html',
  styleUrls: ['./entity-property-form.component.scss']
})
export class EntityPropertyFormComponent {

  @Output() done = new EventEmitter()
  @Output() closed = new EventEmitter()
  @Input() ID: number
  @Input() formType: string
  @Input() formObj: any
  @Input() entityEng: string

  data: any = []
  comboArray: any = {}
  ComboUrl: string
  get() {
    this.service.get(`${Controller}/${this.entityEng}/${this.ID}`).subscribe((res: any) => {
      this.data = res.Data
      this.setForm()
    })
  }

  put() { this.service.post(`${Controller}/Update`, this.form.getRawValue()).subscribe((res: any) => this.done.emit(res.Data)) }

  form: UntypedFormGroup
  setForm() {
    Validation.form = this.formObj
    this.form = this.formBuilder.group({
      Id: [null],
      EntityName_Fld: [this.entityEng],
      PropertyName_Fld: [{ value: null, disabled: Validation.disable('PropertyName_Fld') }, Validation.setValidator('PropertyName_Fld')],
      HeaderName_Fld: [{ value: null, disabled: Validation.disable('HeaderName_Fld') }, Validation.setValidator('HeaderName_Fld')],
      Require_Fld: [{ value: null, disabled: Validation.disable('Require_Fld') }, Validation.setValidator('Require_Fld')],
      DisableInput_Fld: [{ value: null, disabled: Validation.disable('DisableInput_Fld') }, Validation.setValidator('DisableInput_Fld')],
      HiddenValue_Fld: [{ value: null, disabled: Validation.disable('HiddenValue_Fld') }, Validation.setValidator('HiddenValue_Fld')],
      IsHidden_Fld: [{ value: null, disabled: Validation.disable('IsHidden_Fld') }, Validation.setValidator('IsHidden_Fld')],
      Range_Fld: [{ value: null, disabled: Validation.disable('Range_Fld') }, Validation.setValidator('Range_Fld')],
      Width_Fld: [{ value: null, disabled: Validation.disable('Width_Fld') }, Validation.setValidator('Width_Fld')],
      ParamID_Fld: [{ value: null, disabled: Validation.disable('ParamID_Fld') }, Validation.setValidator('ParamID_Fld')],
      ShowOrder_Fld: [{ value: null, disabled: Validation.disable('ShowOrder_Fld') }, Validation.setValidator('ShowOrder_Fld')],
      HireTypeID_Fld: [{ value: null, disabled: Validation.disable('HireTypeID_Fld') }, Validation.setValidator('HireTypeID_Fld')],
      IsSystemRequire_Fld: [{ value: null, disabled: Validation.disable('IsSystemRequire_Fld') }, Validation.setValidator('IsSystemRequire_Fld')],
      Type_Fld: [{ value: null, disabled: Validation.disable('Type_Fld') }, Validation.setValidator('Type_Fld')],
      Query_Fld: [{ value: null, disabled: Validation.disable('Query_Fld') }, Validation.setValidator('Query_Fld')],
      DefaultValue_Fld: [{ value: null, disabled: Validation.disable('DefaultValue_Fld') }, Validation.setValidator('DefaultValue_Fld')],
      DefaultValueDesc_Fld: [null],
      
      FormType:[{value: this.formType}]

    })
    if (this.data.Query_Fld != null)
      this.ComboUrl = `*EntityProperty/GetEntityPropertyCombo/${this.entityEng}/${this.data.PropertyName_Fld}`

    this.formType != 'Add' ? this.form.patchValue(this.data) : null
    if (this.form.controls.IsSystemRequire_Fld.value) this.form.controls.Require_Fld.disable({ onlySelf: true})
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

  ngOnChanges(UpdatedValue: string): void {
    this.formType != 'Add' ? this.get() : this.setForm()
    this.modalOptions = {
      formType: this.formType,
      modatTitle: 'فرمت بانک',
      saveCallback: this.save.bind(this),
      hideCallback: this.close.bind(this),
    }
  }

}
