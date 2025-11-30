import { Component, EventEmitter, Input, Output } from '@angular/core'
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms'

import { ControlMessageService } from 'src/app/main/main-body/common/custom-form/control-message/control-message.service'
import { Validation } from 'src/app/main/main-body/common/custom-form/control-message/Validation'
import { ModalOptions } from 'src/app/main/main-body/common/custom-modal/modal-options.interface'

@Component({
  selector: 'tadris-fraction-form',
  templateUrl: './tadris-fraction-form.component.html',
  styleUrls: ['./tadris-fraction-form.component.scss']
})
export class TadrisFractionFormComponent {

  @Output() done = new EventEmitter()
  @Output() closed = new EventEmitter()
  @Input() data: any
  @Input() parentId: number
  @Input() formType: string
  @Input() formObj: any

  form: UntypedFormGroup
  setForm() {
    Validation.form = this.formObj
    this.form = this.formBuilder.group({
      Id: [1],
      ParentID_Fld: [this.parentId],
      TadrisFractionTypeDesc_Fld: [null],
      TadrisFractionType_Fld: [{ value: null, disabled: Validation.disable('TadrisFractionType_Fld') }, Validation.setValidator('TadrisFractionType_Fld')],
      Price_Fld: [{ value: null, disabled: Validation.disable('Price_Fld') }, Validation.setValidator('Price_Fld')],
      FormType:[{value: this.formType}]
    })
    this.formType != 'Add' ? this.form.patchValue(this.data) : this.form.controls.ParentID_Fld.patchValue(0)
    this.showModal = true
  }

  ChangeCombo($event){
    this.form.controls.TadrisFractionTypeDesc_Fld.patchValue($event)
  }
  save() {
    if (this.form.invalid) return this.controlService.isSubmitted = true

    this.done.emit({ formType: this.formType, data: this.form.getRawValue() })
  }

  showModal: boolean = false
  close() {
    this.showModal = false
    this.closed.emit()
  }

  modalOptions: ModalOptions

  constructor(private controlService: ControlMessageService, private formBuilder: UntypedFormBuilder) { }

  ngOnChanges(UpdatedValue: string): void {
    this.setForm()
    this.modalOptions = {
      formType: this.formType,
      modatTitle: 'کسورات حق التدریس',
      saveCallback: this.save.bind(this),
      hideCallback: this.close.bind(this),
    }
  }

}
