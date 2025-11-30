import { Component, EventEmitter, Input, Output } from '@angular/core'
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms'

import { ControlMessageService } from 'src/app/main/main-body/common/custom-form/control-message/control-message.service'
import { Validation } from 'src/app/main/main-body/common/custom-form/control-message/Validation'
import { ModalOptions } from 'src/app/main/main-body/common/custom-modal/modal-options.interface'
import { GridFormService } from 'src/app/main/main-body/common/grid-form.service'

const Controller = 'EntityPropertyIndex'

@Component({
  selector: 'entity-property-index-form',
  templateUrl: './entity-property-index-form.component.html',
  styleUrls: ['./entity-property-index-form.component.scss']
})
export class EntityPropertyIndexFormComponent {

  @Output() done = new EventEmitter()
  @Output() closed = new EventEmitter()
  @Input() ID: number
  @Input() EntityName: string
  @Input() formType: string
  @Input() formObj: any

  fieldList = []
  getField() { this.fieldList.length == 0 ? this.service.getCombo(`*EntityProperty/GetComboNew/${this.EntityName}`).subscribe((res: any) => this.fieldList = res.Data) : null }

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

  post(fakeFormValue) { this.service.post(`${Controller}/Create`, fakeFormValue).subscribe((res: any) => this.done.emit(res.Data)) }

  put(fakeFormValue) { this.service.post(`${Controller}/Update`, fakeFormValue).subscribe((res: any) => this.done.emit(res.Data)) }

  form: UntypedFormGroup
  showForm: boolean = false
  setForm() {
    Validation.form = this.formObj
    this.form = this.formBuilder.group({
      Id: [0],
      EntityName_Fld: [this.EntityName],
      IndexPropertiesName_Fld: [{ value: null, disabled: Validation.disable('IndexPropertiesName_Fld') }, Validation.setValidator('IndexPropertiesName_Fld')],
      IndexIncludePropertiesName_Fld: [{ value: null, disabled: Validation.disable('IndexIncludePropertiesName_Fld') }, Validation.setValidator('IndexIncludePropertiesName_Fld')],
      IdxName_Fld: [{ value: null, disabled: Validation.disable('IdxName_Fld') }, Validation.setValidator('IdxName_Fld')],
      IsUniqueIndex_Fld: [{ value: null, disabled: Validation.disable('IsUniqueIndex_Fld') }, Validation.setValidator('IsUniqueIndex_Fld')],
      FormType:[{value: this.formType}]
    })
    if (this.formType != 'Add')
    {
      this.form.patchValue(this.data)
      this.getFieldCode()
    }  
    this.getField()
    this.showForm = true
    setTimeout(() => {
      this.service.scrollToElement('form')
    }, 200); 
  }

  getFieldCode(){
    if (this.form.controls.IndexPropertiesName_Fld.value) this.form.controls.IndexPropertiesName_Fld.patchValue(this.form.controls.IndexPropertiesName_Fld.value.split(',').map(i => Number(i))) 
    if (this.form.controls.IndexIncludePropertiesName_Fld.value) this.form.controls.IndexIncludePropertiesName_Fld.patchValue(this.form.controls.IndexIncludePropertiesName_Fld.value.split(',').map(i => Number(i))) 
  }
  fixFieldCode(form) 
  { 
    if (form.IndexPropertiesName_Fld) form.IndexPropertiesName_Fld = form.IndexPropertiesName_Fld.toString() 
    if (form.IndexIncludePropertiesName_Fld) form.IndexIncludePropertiesName_Fld = form.IndexIncludePropertiesName_Fld.toString() 
  }

  save() {
    let fakeFormValue = { ...this.form.getRawValue() }
    this.fixFieldCode(fakeFormValue)

    if (this.form.invalid) return this.controlService.isSubmitted = true

    if (this.formType == 'Add') return this.post(fakeFormValue)

    if (this.formType == 'Edit') this.put(fakeFormValue)
  }

  close() {
    this.closed.emit()
  }
  
  modalOptions: ModalOptions

  constructor(private controlService: ControlMessageService, private service: GridFormService, private formBuilder: UntypedFormBuilder) { }

  ngOnChanges(UpdatedValue: string): void 
  { 
    this.formType != 'Add' ? this.get() : this.setForm() 
    this.modalOptions = {
      formType: this.formType,
      modatTitle: 'جزئیات اطلاعات',
      saveCallback: this.save.bind(this),
      hideCallback: this.close.bind(this),
      maxWidth: 654
    }
  }

}
