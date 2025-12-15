import { Component, EventEmitter, Input, Output } from '@angular/core'
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms'

import { ControlMessageService } from 'src/app/main/main-body/common/custom-form/control-message/control-message.service'
import { Validation } from 'src/app/main/main-body/common/custom-form/control-message/Validation'
import { ModalOptions } from 'src/app/main/main-body/common/custom-modal/modal-options.interface'
import { GridFormService } from 'src/app/main/main-body/common/grid-form.service'

const Controller = 'PersonMissionInfo'

@Component({
  selector: 'person-mission-info-detail-form',
  templateUrl: './person-mission-info-detail-form.component.html',
  styleUrls: ['./person-mission-info-detail-form.component.scss']
})
export class PersonMissionInfoDetailFormComponent {

  @Output() done = new EventEmitter()
  @Output() closed = new EventEmitter()
  @Input() recordSelected: any
  @Input() recordIndex: number
  @Input() parentId: number
  @Input() formType: string
  @Input() formObj: any
  @Input() rowData: any

  payTypeList = []
  async getPayType() {
    if (this.payTypeList.length == 0)
      return new Promise(resolve => {
        this.service.getCombo('OtherDetail/10076').subscribe((res: any) => {
          this.payTypeList = res.Data
          return resolve(true)
        })
      })
  }

  post() {
    this.rowData = this.rowData.filter(a => a.Id != 0)
    this.rowData.push({ Id: 1, ParentID_Fld: 0, PayType_Fld: this.form.getRawValue().PayType_Fld, PayTypeDesc_Fld: this.payTypeList.filter(a => a.Id == this.form.value.PayType_Fld)[0].CodeDesc_Fld, Price_Fld: this.form.getRawValue().Price_Fld })
    this.done.emit(this.rowData)
  }

  put() {
    this.rowData = this.rowData.filter(a => a.Id != 0)
    this.recordSelected = { id: this.form.getRawValue().Id, ParentID_Fld: this.recordSelected.Id, PayType_Fld: this.form.getRawValue().PayType_Fld, PayTypeDesc_Fld: this.form.getRawValue().PayTypeDesc_Fld, Price_Fld: this.form.getRawValue().Price_Fld }
    this.rowData[this.recordIndex] = this.recordSelected
    this.done.emit(this.rowData)
  }

  form: UntypedFormGroup
  setForm() {
    Validation.form = this.formObj
    this.form = this.formBuilder.group({
      Id: [0],
      ParentID_Fld: [this.parentId],
      PayTypeDesc_Fld: [null],
      PayType_Fld: [{ value: null, disabled: Validation.disable('PayType_Fld') }, Validation.setValidator('PayType_Fld')],
      Price_Fld: [{ value: null, disabled: Validation.disable('Price_Fld') }, Validation.setValidator('Price_Fld')],
      FormType:[{value: this.formType}]
    })
    if (this.formType != 'Add') {
      this.form.patchValue(this.recordSelected)
      this.recordSelected.PayTypeDesc_Fld = this.payTypeList.filter(a => a.Id == this.form.value.PayType_Fld)[0].CodeDesc_Fld
    }
    else this.recordSelected = { PayTypeDesc_Fld: null }
    this.showModal = true
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

  async ngOnChanges(UpdatedValue: string) {
    await this.getPayType()
    this.setForm()
    this.modalOptions = {
      formType: this.formType,
      modatTitle: 'اطلاعات جزءی ماموریت',
      saveCallback: this.save.bind(this),
      hideCallback: this.close.bind(this),
    }
  }

}
