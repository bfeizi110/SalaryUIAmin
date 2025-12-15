import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms'

import { ControlMessageService } from 'src/app/main/main-body/common/custom-form/control-message/control-message.service'
import { Validation } from 'src/app/main/main-body/common/custom-form/control-message/Validation'
import { ModalOptions } from 'src/app/main/main-body/common/custom-modal/modal-options.interface'
import { GridFormService } from 'src/app/main/main-body/common/grid-form.service'

const Controller = 'GradeLicense'

@Component({
  selector: 'grade-license-form',
  templateUrl: './grade-license-form.component.html',
  styleUrls: ['./grade-license-form.component.scss']
})

export class GradeLicenseFormComponent implements OnInit {

  @Output() done = new EventEmitter()
  @Output() closed = new EventEmitter()
  @Input() ID: number
  @Input() formType: string

  formObj: any
  getAttr() {
    this.showModal = false
    this.service.getAttr(Controller).subscribe((res: any) => {
      this.formObj = res.Data.EntityAttribute
      this.ID ? this.get() : this.setForm()
    })
  }

  getAttrById() {
    this.service.getAttrById(Controller, this.ID).toPromise().then((res: any) => {
      this.formObj = res.Data.EntityAttribute
      this.ID ? this.get() : this.setForm()
    })
  }

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

  post() { this.service.post(`${Controller}/Create`, this.form.getRawValue()).subscribe((res: any) => { res && res.IsSuccess ? this.done.emit(res.Data) : null })}

  put() { this.service.post(`${Controller}/Update`, this.form.getRawValue()).subscribe((res: any) => { res && res.IsSuccess ? this.done.emit(res.Data) : null })}

  form: UntypedFormGroup
  setForm() {
    Validation.form = this.formObj
    this.form = this.formBuilder.group({
      Id: [0],
      CodeDesc_Fld: [{ value: null, disabled: Validation.disable('CodeDesc_Fld') }, Validation.setValidator('CodeDesc_Fld')],
      LicenseIDDesc: [null],
      LicenseID: [{ value: null, disabled: Validation.disable('LicenseID') }, Validation.setValidator('LicenseID')],
      LicenseID1Desc: [null],
      License1ID: [{ value: null, disabled: Validation.disable('License1ID') }, Validation.setValidator('License1ID')],
      LicenseID2Desc: [null],
      License2ID: [{ value: null, disabled: Validation.disable('License2ID') }, Validation.setValidator('License2ID')],
      HesIDCode: [{ value: null, disabled: Validation.disable('HesIDCode') }, Validation.setValidator('HesIDCode')],
      IsPayroll: [{ value: true, disabled: Validation.disable('IsPayroll') }, Validation.setValidator('IsPayroll')],
      LicenseID401Desc: [null],
      License401ID: [{ value: true, disabled: Validation.disable('License401ID') }, Validation.setValidator('License401ID')],
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
    this.formType == 'Add' ? this.getAttr() : this.getAttrById()
    this.modalOptions = {
      formType: this.formType,
      modatTitle: 'مدرک تحصیلی',
      saveCallback: this.save.bind(this),
      hideCallback: this.close.bind(this),
    }
  }

}
