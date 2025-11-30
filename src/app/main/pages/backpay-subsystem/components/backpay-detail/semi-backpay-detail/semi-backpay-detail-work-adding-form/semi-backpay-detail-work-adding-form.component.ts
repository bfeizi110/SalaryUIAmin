import { Component, EventEmitter, Input, Output } from '@angular/core'
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms'

import { ControlMessageService } from 'src/app/main/main-body/common/custom-form/control-message/control-message.service'
import { Validation } from 'src/app/main/main-body/common/custom-form/control-message/Validation'
import { ModalOptions } from 'src/app/main/main-body/common/custom-modal/modal-options.interface'
import { GridFormService } from 'src/app/main/main-body/common/grid-form.service'

const Controller = 'BackpayDetail'

@Component({
  selector: 'semi-backpay-detail-work-adding-form',
  templateUrl: './semi-backpay-detail-work-adding-form.component.html',
  styleUrls: ['./semi-backpay-detail-work-adding-form.component.scss']
})
export class SemiBackpayDetailWorkAddingFormComponent {

  @Output() done = new EventEmitter()
  @Output() closed = new EventEmitter()
  @Input() data: any
  @Input() PID: number
  @Input() parentId: number
  @Input() formObj: any
  @Input() IsMultiple: boolean

  put() { 
    let array = []
    this.formArray.forEach(a => array.push(a.getRawValue()))
    if (!this.IsMultiple)
      this.service.post(`${Controller}/UpdateWorkAddingManual`, array).subscribe((res: any) => this.done.emit(res.Data)) 
    else
    {
      this.data.DaraeiPrice_Fld = this.form.controls.DaraeiPrice_Fld.value
      this.data.JariPrice_Fld = this.form.controls.JariPrice_Fld.value
      this.done.emit(this.data)
    }
  }

  formArray: UntypedFormGroup[] = []
  form: UntypedFormGroup
  setForm() {
    Validation.form = this.formObj
    this.form = this.formBuilder.group({
      Id: [null],
      ParentId_Fld: [this.parentId],
      PersonId_Fld: [this.PID],
      ParamDesc_Fld: [{ value: null, disabled: Validation.disable('ParamDesc_Fld') }, Validation.setValidator('ParamDesc_Fld')],
      JariPrice_Fld: [{ value: null, disabled: Validation.disable('JariPrice_Fld') }, Validation.setValidator('JariPrice_Fld')],
      DaraeiPrice_Fld: [{ value: null, disabled: Validation.disable('DaraeiPrice_Fld') }, Validation.setValidator('DaraeiPrice_Fld')],
      JariId: [null],
      KolID: [null],
      SDaraeiID: [null],
      SJariId: [null],
      DaraeiID: [null],
      PayCode_Fld: [null],
      ParamType_Fld: [null],
      ItemCode_Fld: [null],
      FormType:[{value: 'Edit'}]

    })
    this.form.patchValue(this.data)
    this.formArray.push(this.form)
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
    this.modalOptions = {
      formType: 'Edit',
      modatTitle: ' پارامتر اضافه کار',
      saveCallback: this.save.bind(this),
      hideCallback: this.close.bind(this),
    }
    this.setForm()
  }

}
