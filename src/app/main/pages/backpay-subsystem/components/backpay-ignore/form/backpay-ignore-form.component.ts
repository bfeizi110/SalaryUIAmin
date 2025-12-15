import { Component, EventEmitter, Input, Output } from '@angular/core'
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms'

import { ControlMessageService } from 'src/app/main/main-body/common/custom-form/control-message/control-message.service'
import { Validation } from 'src/app/main/main-body/common/custom-form/control-message/Validation'
import { ModalOptions } from 'src/app/main/main-body/common/custom-modal/modal-options.interface'
import { GridFormService } from 'src/app/main/main-body/common/grid-form.service'
import { Month_Fld, Year_Fld } from '../../../../global-attr'

const Controller = 'BackPayIgnore'

@Component({
  selector: 'backpay-ignore-form',
  templateUrl: './backpay-ignore-form.component.html',
  styleUrls: ['./backpay-ignore-form.component.scss']
})
export class BackpayIgnoreFormComponent {

  @Output() done = new EventEmitter()
  @Output() closed = new EventEmitter()
  @Input() ID: number
  @Input() formType: string
  @Input() formObj: any
  @Input() BankId: number

  clearPerson() {
    this.form.controls.PersonID_Fld.patchValue(null)
    this.personName = null
  }

  data: any = {}
  getById() {
    return new Promise((resolve, reject) => {
      this.service.getById(Controller, this.ID, this.formType).toPromise().then((res: any) => {
        if (res && res.Data) {
          this.data = res.Data
          this.personName = this.data.NameFamily_Fld
          this.setForm()
          resolve(true)
        }
        else {
          this.done.emit(false)
          reject()
        }
      })
    })
  }

  post() {
    this.form.patchValue({ Id: 0 })
    this.service.post(`${Controller}/Create`, this.form.getRawValue()).subscribe((res: any) => this.done.emit(res.Data))
  }

  put() { this.service.post(`${Controller}/Update`, this.form.getRawValue()).subscribe((res: any) => this.done.emit(res.Data)) }

  form: UntypedFormGroup
  setForm() {
    Validation.form = this.formObj
    this.form = this.formBuilder.group({
      Id: [0],
      Year_Fld: [Year_Fld],
      Month_Fld: [Month_Fld],
      PersonID_Fld: [{ value: null, disabled: Validation.disable('PersonID_Fld') }, Validation.setValidator('PersonID_Fld')],
      Desc_Fld: [{ value: null, disabled: Validation.disable('Desc_Fld') }, Validation.setValidator('Desc_Fld')],
      PersonIDCollect_Fld: [null],
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

  personName: string
  showPerson: boolean = false
  onShowPerson() {
    this.showPerson = true
  }

  onSelectPersonnel(person) {
    this.selectedPersonList = []
    this.form.controls.PersonID_Fld.patchValue(person.Id)
    this.form.controls.PersonIDCollect_Fld.patchValue(null)
    this.showPerson = false
  }

  selectedPersonList = []
  rowSelectedList(obj) {
    this.selectedPersonList = obj.ids
    let namesArray = []
    obj.personData.forEach(person => obj.ids.forEach(id => id == person.Id ? namesArray.push(person.Name + ' ' + person.Family) : null))
    this.form.controls.PersonIDCollect_Fld.patchValue(obj.ids.toString())
    this.form.controls.PersonID_Fld.patchValue(0)
    this.personName = namesArray.join()
    this.showPerson = false
  }

  constructor(private controlService: ControlMessageService, private service: GridFormService, private formBuilder: UntypedFormBuilder) { }

  ngOnChanges(UpdatedValue: string): void {
    this.formType != 'Add' ? this.getById() : this.setForm()
    this.modalOptions = {
      formType: this.formType,
      modatTitle: 'عدم دریافت تفاوت',
      saveCallback: this.save.bind(this),
      hideCallback: this.close.bind(this)
    }
  }

}
