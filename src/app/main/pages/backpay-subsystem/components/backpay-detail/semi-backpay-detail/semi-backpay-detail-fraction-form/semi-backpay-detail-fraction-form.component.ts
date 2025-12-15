import { Component, EventEmitter, Input, Output } from '@angular/core'
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms'

import { ControlMessageService } from 'src/app/main/main-body/common/custom-form/control-message/control-message.service'
import { Validation } from 'src/app/main/main-body/common/custom-form/control-message/Validation'
import { ModalOptions } from 'src/app/main/main-body/common/custom-modal/modal-options.interface'
import { GridFormService } from 'src/app/main/main-body/common/grid-form.service'

const Controller = 'BackpayDetail'

@Component({
  selector: 'semi-backpay-detail-fraction-form',
  templateUrl: './semi-backpay-detail-fraction-form.component.html',
  styleUrls: ['./semi-backpay-detail-fraction-form.component.scss']
})
export class SemiBackpayDetailFractionFormComponent {

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
      this.service.post(`${Controller}/UpdateFractionManual`, array).subscribe((res: any) => this.done.emit(res.Data))
    else
    {
      if (Array.isArray(this.data))
        this.data.forEach((a, index) => {
          a.DaraeiCopPrice_Fld = array[index].DaraeiCopPrice_Fld
          a.JariCopPrice_Fld = array[index].JariCopPrice_Fld
          a.DaraeiEmpPrice_Fld = array[index].DaraeiEmpPrice_Fld
          a.JariEmpPrice_Fld = array[index].JariEmpPrice_Fld
          a.DaraeiStatePrice_Fld = array[index].DaraeiStatePrice_Fld
          a.JariStatePrice_Fld = array[index].JariStatePrice_Fld
          a.DaraeiMPrice_Fld = array[index].DaraeiMPrice_Fld
          a.JariMPrice_Fld = array[index].JariMPrice_Fld
          });
      else
      {
        this.data.DaraeiCopPrice_Fld = array[0].DaraeiCopPrice_Fld
        this.data.JariCopPrice_Fld = array[0].JariCopPrice_Fld
        this.data.DaraeiEmpPrice_Fld = array[0].DaraeiEmpPrice_Fld
        this.data.JariEmpPrice_Fld = array[0].JariEmpPrice_Fld
        this.data.DaraeiStatePrice_Fld = array[0].DaraeiStatePrice_Fld
        this.data.JariStatePrice_Fld = array[0].JariStatePrice_Fld
        this.data.DaraeiMPrice_Fld = array[0].DaraeiMPrice_Fld
        this.data.JariMPrice_Fld = array[0].JariMPrice_Fld
        }
      this.done.emit(this.data)
    }
  }

  formArray: UntypedFormGroup[] = []
  setForm(data) {
    Validation.form = this.formObj
    let form = this.formBuilder.group({
      Id: [null],
      ParentId_Fld: [this.parentId],
      PersonId_Fld: [this.PID],
      ParamDesc_Fld: [{ value: null, disabled: Validation.disable('ParamDesc_Fld') }, Validation.setValidator('ParamDesc_Fld')],
      DaraeiCopPrice_Fld: [{ value: null, disabled: Validation.disable('DaraeiCopPrice_Fld') }, Validation.setValidator('DaraeiCopPrice_Fld')],
      DaraeiEmpPrice_Fld: [{ value: null, disabled: Validation.disable('DaraeiEmpPrice_Fld') }, Validation.setValidator('DaraeiEmpPrice_Fld')],
      DaraeiStatePrice_Fld: [{ value: null, disabled: Validation.disable('DaraeiStatePrice_Fld') }, Validation.setValidator('DaraeiStatePrice_Fld')],
      JariCopPrice_Fld: [{ value: null, disabled: Validation.disable('JariCopPrice_Fld') }, Validation.setValidator('JariCopPrice_Fld')],
      JariEmpPrice_Fld: [{ value: null, disabled: Validation.disable('JariEmpPrice_Fld') }, Validation.setValidator('JariEmpPrice_Fld')],
      JariStatePrice_Fld: [{ value: null, disabled: Validation.disable('JariStatePrice_Fld') }, Validation.setValidator('JariStatePrice_Fld')],
      DaraeiMPrice_Fld: [{ value: null, disabled: Validation.disable('DaraeiMPrice_Fld') }, Validation.setValidator('DaraeiMPrice_Fld')],
      JariMPrice_Fld: [{ value: null, disabled: Validation.disable('JariMPrice_Fld') }, Validation.setValidator('JariMPrice_Fld')],
      JariId: [null],
      DaraeiID: [null],
      KolID: [null],
      SJariId: [null],
      SDaraeiID: [null],
      ItemSubCode_Fld: [null],
      TypeMain_Fld: [null],
      PayCode_Fld: [null],
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
      modatTitle: 'کسور',
      saveCallback: this.save.bind(this),
      hideCallback: this.close.bind(this),
    }
    Array.isArray(this.data) ? this.data.forEach(a => this.setForm(a)) : this.setForm(this.data)
    this.showModal = true
  }

}
