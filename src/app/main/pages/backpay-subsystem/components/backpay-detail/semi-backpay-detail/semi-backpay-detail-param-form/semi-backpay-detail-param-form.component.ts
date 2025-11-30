import { Component, EventEmitter, Input, Output } from '@angular/core'
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms'

import { ControlMessageService } from 'src/app/main/main-body/common/custom-form/control-message/control-message.service'
import { Validation } from 'src/app/main/main-body/common/custom-form/control-message/Validation'
import { ModalOptions } from 'src/app/main/main-body/common/custom-modal/modal-options.interface'
import { GridFormService } from 'src/app/main/main-body/common/grid-form.service'

const Controller = 'BackpayDetail'

@Component({
  selector: 'semi-backpay-detail-param-form',
  templateUrl: './semi-backpay-detail-param-form.component.html',
  styleUrls: ['./semi-backpay-detail-param-form.component.scss']
})
export class SemiBackpayDetailParamFormComponent {

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
      this.service.post(`${Controller}/UpdateParamManual`, array).subscribe((res: any) => this.done.emit(res.Data))
    else
    {
      if (Array.isArray(this.data))
        this.data.forEach((a, index) => {
          a.DaraeiPrice_Fld = array[index].DaraeiPrice_Fld
        });
      else
      {
        this.data.DaraeiPrice_Fld = array[0].DaraeiPrice_Fld
        this.data.JariPrice_Fld = array[0].JariPrice_Fld
      }
      this.done.emit(this.data)
    }
  }

  formArray: UntypedFormGroup[] = []
  setForm(data) {
    Validation.form = this.formObj
    let form: UntypedFormGroup = this.formBuilder.group({
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
      ItemCode_Fld: [null],
      FormType:[{value: 'Edit'}]
    })
    form.patchValue(data)
    this.formArray.push(form)
  }

  save() {
    if (this.formArray.find(a => a.invalid)) return this.controlService.isSubmitted = true

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
      modatTitle: 'پارامتر',
      saveCallback: this.save.bind(this),
      hideCallback: this.close.bind(this),
    }

    if (Array.isArray(this.data)) {
      this.data = this.data.filter(a => a.Id != -999)
      this.data.forEach(a => this.setForm(a))
    }
    else this.setForm(this.data)
    this.showModal = true
  }

}
