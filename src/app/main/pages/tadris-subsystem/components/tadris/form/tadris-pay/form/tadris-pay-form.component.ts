import { Component, EventEmitter, Input, Output } from '@angular/core'
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms'

import { ControlMessageService } from 'src/app/main/main-body/common/custom-form/control-message/control-message.service'
import { Validation } from 'src/app/main/main-body/common/custom-form/control-message/Validation'
import { ModalOptions } from 'src/app/main/main-body/common/custom-modal/modal-options.interface'
import { GridFormService } from 'src/app/main/main-body/common/grid-form.service'
import { TadrisPayLocal, setTadrisPayLocal } from 'src/app/main/pages/global-attr'

const Controller = 'Tadris'

@Component({
  selector: 'tadris-pay-form',
  templateUrl: './tadris-pay-form.component.html',
  styleUrls: ['./tadris-pay-form.component.scss']
})
export class TadrisPayFormComponent {

  @Output() done = new EventEmitter()
  @Output() closed = new EventEmitter()
  @Input() data: any
  @Input() parentId: number
  @Input() formType: string
  @Input() formObj: any

  PayTypeList = []
  getPayTypeList() {
    new Promise(resolve => {
      this.service.getCombo("TadrisPayType").toPromise().then((res: any) => {
        this.PayTypeList = res.Data
        let PayType: any = TadrisPayLocal()
        if (this.formType == 'Add' && PayType) 
        {
          this.form.controls.TadrisPayType_Fld.patchValue(PayType.PayType)
          this.form.controls.TadrisPayTypeDesc_Fld.patchValue(this.PayTypeList.find(a => a.Id == PayType.PayType).CodeDesc_Fld)
          this.data.TadrisPayTypeDesc_Fld = this.form.controls.TadrisPayTypeDesc_Fld.value
        }
      })
    })
  }

  form: UntypedFormGroup
  setForm() {
    Validation.form = this.formObj
    this.form = this.formBuilder.group({
      Id: [1],
      ParentID_Fld: [this.parentId],
      TadrisPayTypeDesc_Fld: [null],
      TadrisPayType_Fld: [{ value: null, disabled: Validation.disable('TadrisPayType_Fld') }, Validation.setValidator('TadrisPayType_Fld')],
      Vahed_Fld: [{ value: null, disabled: Validation.disable('Vahed_Fld') }, Validation.setValidator('Vahed_Fld')],
      Hour_Fld: [{ value: null, disabled: Validation.disable('Hour_Fld') }, Validation.setValidator('Hour_Fld')],
      ManualRate_Fld: [{ value: null, disabled: Validation.disable('ManualRate_Fld') }, Validation.setValidator('ManualRate_Fld')],
      FormType:[{value: this.formType}]
    })
    this.formType != 'Add' ? this.form.patchValue(this.data) : this.form.controls.ParentID_Fld.patchValue(0)
    this.getPayTypeList()
    this.showModal = true
  }
  PayTypeChanged(event:any){
    if (this.PayTypeList.length != 0) this.data.TadrisPayTypeDesc_Fld = this.PayTypeList.find(a => a.Id == event).CodeDesc_Fld
  }

  save() {
    if (this.form.invalid) return this.controlService.isSubmitted = true
    setTadrisPayLocal({PayType : this.form.controls.TadrisPayType_Fld.value})
    this.form.controls.TadrisPayTypeDesc_Fld.patchValue(this.data.TadrisPayTypeDesc_Fld)
    this.done.emit({ formType: this.formType, data: this.form.getRawValue() })
  }

  showModal: boolean = false
  close() {
    this.showModal = false
    this.closed.emit()
  }

  modalOptions: ModalOptions

  constructor(private controlService: ControlMessageService, private service: GridFormService, private formBuilder: UntypedFormBuilder) { }

  ngOnChanges(UpdatedValue: string): void {
    this.formType == 'Add' ? this.data = {} : null
    this.setForm()
    this.modalOptions = {
      formType: this.formType,
      modatTitle: 'حق التدریس',
      saveCallback: this.save.bind(this),
      hideCallback: this.close.bind(this),
    }
  }

}
