import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms'

import { ControlMessageService } from 'src/app/main/main-body/common/custom-form/control-message/control-message.service'
import { Validation } from 'src/app/main/main-body/common/custom-form/control-message/Validation'
import { ModalOptions } from 'src/app/main/main-body/common/custom-modal/modal-options.interface'
import { GridFormService } from 'src/app/main/main-body/common/grid-form.service'

const Controller = 'OtherDetail'

@Component({
  selector: 'other-detail-form',
  templateUrl: './other-detail-form.component.html',
  styleUrls: ['./other-detail-form.component.scss']
})

export class OtherDetailFormComponent implements OnInit {

  @Output() done = new EventEmitter()
  @Output() closed = new EventEmitter()
  @Input() ID: number
  @Input() formType: string
  @Input() formObj: any
  @Input() groupId: number

  data: any = {}
  get() {
    this.service.getById(Controller, this.ID, this.formType).toPromise().then((res: any) => {
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
  setForm() {
    Validation.form = this.formObj
    this.form = this.formBuilder.group({
      Id: [0],
      ParentIDDesc: [null],
      ParentID: [{ value: this.groupId, disabled: Validation.disable('ParentID') }, Validation.setValidator('ParentID')],
      CodeDesc_Fld: [{ value: null, disabled: Validation.disable('CodeDesc_Fld') }, Validation.setValidator('CodeDesc_Fld')],
      KICode: [{ value: null, disabled: Validation.disable('KICode') }, Validation.setValidator('KICode')],
      HesIDCode: [{ value: null, disabled: Validation.disable('HesIDCode') }, Validation.setValidator('HesIDCode')],
      SortOrder: [{ value: null, disabled: Validation.disable('SortOrder') }, Validation.setValidator('SortOrder')],
      PayFractionType_Fld: [{ value: null, disabled: Validation.disable('PayFractionType_Fld') }, Validation.setValidator('PayFractionType_Fld')],
      PayFractionTypeDesc_Fld: [null],
      FormType:[{value: this.formType}]
    })
    this.formType != 'Add' ? this.form.patchValue(this.data) : null
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

  ngOnInit(): void {
    this.formType != 'Add' ? this.get() : this.setForm()
    this.modalOptions = {
      formType: this.formType,
      modatTitle: 'اطلاعات متفرقه',
      saveCallback: this.save.bind(this),
      hideCallback: this.close.bind(this),
    }
  }

}
