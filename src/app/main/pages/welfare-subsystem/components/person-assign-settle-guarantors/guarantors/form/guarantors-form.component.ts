import { Component, Output, EventEmitter, Input } from '@angular/core'
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms'
import { ControlMessageService } from 'src/app/main/main-body/common/custom-form/control-message/control-message.service'
import { GridFormService } from 'src/app/main/main-body/common/grid-form.service'
import { Validation } from 'src/app/main/main-body/common/custom-form/control-message/Validation'

const Controller = 'Guarantors'

@Component({
  selector: 'guarantors-form',
  templateUrl: './guarantors-form.component.html',
  styleUrls: ['./guarantors-form.component.scss']
})
export class GuarantorsFormComponent {

  @Output() done = new EventEmitter()
  @Output() closed = new EventEmitter()
  @Input() ID: number
  @Input() ParentID: number
  @Input() formType: string
  @Input() formObj: any

  clearPerson() {
    this.form.controls.GuarantorPersonID_Fld.patchValue(null)
    this.form.controls.GuarantorPersonIDDesc_Fld.patchValue(null)
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

  post() { this.service.post(`${Controller}/Create`, this.form.getRawValue()).subscribe((res: any) => { res && res.IsSuccess ? this.done.emit(res.Data) : null }) }

  put() { this.service.post(`${Controller}/Update`, this.form.getRawValue()).subscribe((res: any) => { res && res.IsSuccess ? this.done.emit(res.Data) : null }) }

  form: UntypedFormGroup
  showForm: boolean = false
  setForm() {
    Validation.form = this.formObj
    this.form = this.formBuilder.group({
      Id: [0],
      PersonID_Fld: [1],
      ParentId_Fld: [this.ParentID],
      GuarantorPersonIDDesc_Fld: [null],
      GuarantorPersonID_Fld: [{ value: null, disabled: Validation.disable('GuarantorPersonID_Fld') }, Validation.setValidator('GuarantorPersonID_Fld')],
      GuaranteeDate_Fld: [{ value: null, disabled: Validation.disable('GuaranteeDate_Fld') }, Validation.setValidator('GuaranteeDate_Fld')],
      RelationDesc_Fld: [null],
      Relation_Fld: [{ value: null, disabled: Validation.disable('Relation_Fld') }, Validation.setValidator('Relation_Fld')],
      Active_Fld: [{ value: null, disabled: Validation.disable('Active_Fld') }, Validation.setValidator('Active_Fld')],
      Amount_Fld: [{ value: null, disabled: Validation.disable('Amount_Fld') }, Validation.setValidator('Amount_Fld')],
      IsImport_Fld: [{ value: null, disabled: Validation.disable('IsImport_Fld') }, Validation.setValidator('IsImport_Fld')],
      IsAutoDebt_Fld: [{ value: null, disabled: Validation.disable('IsAutoDebt_Fld') }, Validation.setValidator('IsAutoDebt_Fld')],
      FormType:[{value: this.formType}]
    })
    this.formType != 'Add' ? this.form.patchValue(this.data) : null
    this.showForm = true
    setTimeout(() => {
      this.service.scrollToElement('form')
    }, 200); 
  }

  save() {
    if (this.form.invalid) return this.controlService.isSubmitted = true

    if (this.formType == 'Add') return this.post()

    if (this.formType == 'Edit') this.put()
  }

  close() { this.closed.emit() }

  showPersonnelModal: boolean = false
  onShowSelectPersonnelModal() {
    this.showPersonnelModal = true
  }

  onSelectPersonnel(data) {
    this.showPersonnelModal = false
    this.form.controls.GuarantorPersonIDDesc_Fld.patchValue(`${data.Name}${data.Family}`)
    this.form.controls.GuarantorPersonID_Fld.patchValue(data.Id)
  }

  closeSelectPersonnelModal() {
    this.showPersonnelModal = false
  }

  constructor(private controlService: ControlMessageService, private service: GridFormService, private formBuilder: UntypedFormBuilder) { }

  ngOnChanges(UpdatedValue: string): void { this.formType != 'Add' ? this.get() : this.setForm() }

}
