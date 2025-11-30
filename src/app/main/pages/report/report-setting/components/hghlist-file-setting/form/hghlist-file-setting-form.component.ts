import { Component, EventEmitter, Input, Output } from '@angular/core'
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms'

import { ControlMessageService } from 'src/app/main/main-body/common/custom-form/control-message/control-message.service'
import { Validation } from 'src/app/main/main-body/common/custom-form/control-message/Validation'
import { ModalOptions } from 'src/app/main/main-body/common/custom-modal/modal-options.interface'
import { GridFormService } from 'src/app/main/main-body/common/grid-form.service'

const Controller = 'HghListFileSetting'

@Component({
  selector: 'hghlist-file-setting-form',
  templateUrl: './hghlist-file-setting-form.component.html',
  styleUrls: ['./hghlist-file-setting-form.component.scss']
})
export class HghlistFileSettingFormComponent {

  @Output() done = new EventEmitter()
  @Output() closed = new EventEmitter()
  @Input() ID: number
  @Input() formType: string
  @Input() formObj: any
  @Input() EmpGroup_Fld: number

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

  put() { this.service.post(`${Controller}/Update`, this.form.getRawValue()).subscribe((res: any) => this.done.emit(res.Data)) }

  form: UntypedFormGroup
  setForm() {
    Validation.form = this.formObj
    this.form = this.formBuilder.group({
      Id: [0],
      EmpGroup_Fld: [this.EmpGroup_Fld],
      ColName_Fld: [{ value: null, disabled: Validation.disable('ColName_Fld') }, Validation.setValidator('ColName_Fld')],
      ColShowName_Fld: [{ value: null, disabled: Validation.disable('ColShowName_Fld') }, Validation.setValidator('ColShowName_Fld')],
      Order_Fld: [{ value: null, disabled: Validation.disable('Order_Fld') }, Validation.setValidator('Order_Fld')],
      NotShow_Fld: [{ value: null, disabled: Validation.disable('NotShow_Fld') }, Validation.setValidator('NotShow_Fld')],
      FormType:[{value: this.formType}]
    })
    this.formType != 'Add' ? this.form.patchValue(this.data) : null
    this.showModal = true
  }

  save() {
    if (this.form.invalid) return this.controlService.isSubmitted = true

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
      modatTitle: 'تنظیم فایل حقوق و مزایا',
      saveCallback: this.save.bind(this),
      hideCallback: this.close.bind(this),
    }
  }

}
