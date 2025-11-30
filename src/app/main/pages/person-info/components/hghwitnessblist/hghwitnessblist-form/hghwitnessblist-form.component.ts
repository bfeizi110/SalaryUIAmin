import { Component, EventEmitter, Input, Output } from '@angular/core'
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms'

import { ControlMessageService } from 'src/app/main/main-body/common/custom-form/control-message/control-message.service'
import { Validation } from 'src/app/main/main-body/common/custom-form/control-message/Validation'
import { ModalOptions } from 'src/app/main/main-body/common/custom-modal/modal-options.interface'
import { GridFormService } from 'src/app/main/main-body/common/grid-form.service'

const Controller = 'HghWitnessBList'

@Component({
  selector: 'hghwitnessblist-form',
  templateUrl: './hghwitnessblist-form.component.html',
  styleUrls: ['./hghwitnessblist-form.component.scss']
})
export class HghWitnessBListFormComponent {

  @Output() done = new EventEmitter()
  @Output() closed = new EventEmitter()
  @Input() ID: number
  @Input() formType: string
  @Input() formObj: any

  personName: string 
  clearPerson() {
    this.form.controls.PersonID_Fld.patchValue(null)
    this.personName = null
  }
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
      PersonID_Fld: [{ value: null, disabled: Validation.disable('PersonID_Fld') }, Validation.setValidator('PersonID_Fld')],
      StartDateBList_Fld: [{ value: null, disabled: Validation.disable('StartDateBList_Fld') }, Validation.setValidator('StartDateBList_Fld')],
      FinishDateBList_Fld: [{ value: null, disabled: Validation.disable('FinishDateBList_Fld') }, Validation.setValidator('FinishDateBList_Fld')],
      Desc_Fld: [{ value: null, disabled: Validation.disable('Desc_Fld') }, Validation.setValidator('Desc_Fld')],
      PersonIDCollect_Fld: [],
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

  ngOnChanges(UpdatedValue: string): void {
    this.formType != 'Add' ? this.get() : this.setForm()
    this.modalOptions = {
      formType: this.formType,
      modatTitle: 'لیست سیاه گواهی حقوق و ضمانت',
      saveCallback: this.save.bind(this),
      hideCallback: this.close.bind(this),
    }
  }

}
