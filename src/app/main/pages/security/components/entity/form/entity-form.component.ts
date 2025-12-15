import { Component, Output, EventEmitter, Input } from '@angular/core'
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms'
import { ControlMessageService } from 'src/app/main/main-body/common/custom-form/control-message/control-message.service'
import { GridFormService } from 'src/app/main/main-body/common/grid-form.service'
import { Validation } from 'src/app/main/main-body/common/custom-form/control-message/Validation'
import { ModalOptions } from 'src/app/main/main-body/common/custom-modal/modal-options.interface'

const Controller = 'Entity'

@Component({
  selector: 'entity-form',
  templateUrl: './entity-form.component.html',
  styleUrls: ['./entity-form.component.scss']
})
export class EntityFormComponent {

  @Output() done = new EventEmitter()
  @Output() closed = new EventEmitter()
  @Input() ID: number
  @Input() formType: string
  @Input() formObj: any
  
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

  post(fakeFormValue) { 
    this.service.post(`${Controller}/Create`, fakeFormValue).subscribe((res: any) => this.done.emit(res.Data)) 
  }

  put(fakeFormValue) { 
    this.service.post(`${Controller}/Update`, fakeFormValue).subscribe((res: any) => this.done.emit(res.Data)) 
  }

  form: UntypedFormGroup
  showModal: boolean = false
  setForm() {
    Validation.form = this.formObj
    this.form = this.formBuilder.group({
      Id: [0],
      CodeDesc_Fld: [{ value: null, disabled: Validation.disable('CodeDesc_Fld') }, Validation.setValidator('CodeDesc_Fld')],
      CodeDescFarsi_Fld: [{ value: null, disabled: Validation.disable('CodeDescFarsi_Fld') }, Validation.setValidator('CodeDescFarsi_Fld')],
      DisplayType_Fld: [{ value: null, disabled: Validation.disable('DisplayType_Fld') }, Validation.setValidator('DisplayType_Fld')],
      PrimaryKeyFields_Fld: [{ value: null, disabled: Validation.disable('PrimaryKeyFields_Fld') }, Validation.setValidator('PrimaryKeyFields_Fld')],
      IsTransfer_Fld: [{ value: null, disabled: Validation.disable('IsTransfer_Fld') }, Validation.setValidator('IsTransfer_Fld')],
      TransferOrder_Fld: [{ value: null, disabled: Validation.disable('TransferOrder_Fld') }, Validation.setValidator('TransferOrder_Fld')],
      UniqueFields_Fld: [{ value: null, disabled: Validation.disable('UniqueFields_Fld') }, Validation.setValidator('UniqueFields_Fld')],
      IsManual_Fld: [{ value: null, disabled: Validation.disable('IsManual_Fld') }, Validation.setValidator('IsManual_Fld')],
      IsPersonID_Fld: [{ value: null, disabled: Validation.disable('IsPersonID_Fld') }, Validation.setValidator('IsPersonID_Fld')],
      UniqueFieldsDesc_Fld: [null],
      FormType:[{value: this.formType}],
      InputTypeDesc_Fld: [null],
    })
    if (this.formType != 'Add')
    {
      this.form.patchValue(this.data)
      if (this.form.controls.DisplayType_Fld.value) 
        this.form.controls.DisplayType_Fld.patchValue(this.form.controls.DisplayType_Fld.value.split(',').map(i => Number(i)))
      if (this.form.controls.PrimaryKeyFields_Fld.value) 
        this.form.controls.PrimaryKeyFields_Fld.patchValue(this.form.controls.PrimaryKeyFields_Fld.value.split(',').map(i => Number(i)))
    }

     this.getCombos() 
    this.showModal = true
  }

  getCombos() {
    this.DisplayTypeArray.length == 0 ? this.getDisplayType() : null
    this.PrimaryKeyFieldsArray.length == 0 ? this.getPrimaryKeyFields() : null
  }

  DisplayTypeArray = []
  PrimaryKeyFieldsArray = []

  getDisplayType() { this.service.getCombo('OtherDetail/10092').subscribe((res: any) => this.DisplayTypeArray = res.Data) }

  getPrimaryKeyFields() { this.service.getCombo(`*EntityProperty/GetRequireProperty/${this.form.controls.CodeDesc_Fld.value}`).subscribe((res: any) => this.PrimaryKeyFieldsArray = res.Data) }

  save() {
    let fakeFormValue = { ...this.form.getRawValue() }
    if (fakeFormValue.DisplayType_Fld) fakeFormValue.DisplayType_Fld = fakeFormValue.DisplayType_Fld.toString()
    if (fakeFormValue.PrimaryKeyFields_Fld) fakeFormValue.PrimaryKeyFields_Fld = fakeFormValue.PrimaryKeyFields_Fld.toString()
    if (this.form.invalid) return this.controlService.isSubmitted = true

    if (this.formType == 'Add') return this.post(fakeFormValue)

    if (this.formType == 'Edit') this.put(fakeFormValue)
  }

  modalOptions: ModalOptions

  close() {
    this.showModal = false
    this.closed.emit()
  }

  constructor(private controlService: ControlMessageService, private service: GridFormService, private formBuilder: UntypedFormBuilder) { }

  ngOnChanges(UpdatedValue: string): void {
    this.formType != 'Add' ? this.get() : this.setForm()
    this.modalOptions = {
      formType: this.formType,
      modatTitle: 'اطلاعات',
      saveCallback: this.save.bind(this),
      hideCallback: this.close.bind(this),
      maxWidth: 654
    }
  }

}
