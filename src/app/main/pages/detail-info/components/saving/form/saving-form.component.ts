import { Component, EventEmitter, Input, Output } from '@angular/core'
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms'

import { ControlMessageService } from 'src/app/main/main-body/common/custom-form/control-message/control-message.service'
import { Validation } from 'src/app/main/main-body/common/custom-form/control-message/Validation'
import { GridFormService } from 'src/app/main/main-body/common/grid-form.service'

const Controller = 'Saving'

@Component({
  selector: 'saving-form',
  templateUrl: './saving-form.component.html',
  styleUrls: ['./saving-form.component.scss']
})

export class SavingFormComponent {

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
        this.data.EmpCodes_Fld ? this.data.EmpCodes_Fld = this.data.EmpCodes_Fld.split(',').map(i => Number(i)) : null
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
      CodeDesc_Fld: [{ value: null, disabled: Validation.disable('CodeDesc_Fld') }, Validation.setValidator('CodeDesc_Fld')],
      SavingType_fld: [{ value: null, disabled: Validation.disable('SavingType_fld') }, Validation.setValidator('SavingType_fld')],
      DKarfarma: [{ value: null, disabled: Validation.disable('DKarfarma') }, Validation.setValidator('DKarfarma')],
      DKarmand: [{ value: null, disabled: Validation.disable('DKarmand') }, Validation.setValidator('DKarmand')],
      MashmoolTypeDesc_Fld: [null],
      MashmoolType_Fld: [{ value: null, disabled: Validation.disable('MashmoolType_Fld') }, Validation.setValidator('MashmoolType_Fld')],
      EmpCodes_Fld: [{ value: null, disabled: Validation.disable('EmpCodes_Fld') }, Validation.setValidator('EmpCodes_Fld')],
      NotShowInFish_Fld: [{ value: null, disabled: Validation.disable('NotShowInFish_Fld') }, Validation.setValidator('NotShowInFish_Fld')],
      RefahSaving_Fld: [{ value: null, disabled: Validation.disable('RefahSaving_Fld') }, Validation.setValidator('RefahSaving_Fld')],
      IsCopPrice_Fld: [{ value: null, disabled: Validation.disable('IsCopPrice_Fld') }, Validation.setValidator('IsCopPrice_Fld')],
      NoTax_Fld: [{ value: null, disabled: Validation.disable('NoTax_Fld') }, Validation.setValidator('NoTax_Fld')],
      FormType:[{value: this.formType}]
    })
    this.formType != 'Add' ? this.form.patchValue(this.data) : null
    this.showForm = true
    this.changeSavingType()
    setTimeout(() => {
      this.service.scrollToElement("form")
    }, 200); 
  }

  empList = []
  getEmp() { this.empList.length == 0 ? this.service.getCombo('HireType').subscribe((res: any) => this.empList = res.Data) : null }

  save() {
    if (this.form.invalid) return this.controlService.isSubmitted = true

    let fakeFormValue = { ...this.form.getRawValue() }
    this.toString(fakeFormValue)

    if (this.formType == 'Add') return this.post(fakeFormValue)

    if (this.formType == 'Edit') this.put(fakeFormValue)
  }

  close() {
    this.closed.emit()
  }

  toString(fakeFormValue) { if (fakeFormValue.EmpCodes_Fld) fakeFormValue.EmpCodes_Fld = fakeFormValue.EmpCodes_Fld.toString() }

  changeSavingType() {
    if (this.form.controls.SavingType_fld.value) {
      this.form.controls.DKarfarma.enable()
      this.form.controls.DKarmand.enable()
      this.form.controls.MashmoolType_Fld.enable()
    }
    else {
      this.form.controls.DKarfarma.disable()
      this.form.controls.DKarfarma.patchValue(null)
      this.form.controls.DKarmand.disable()
      this.form.controls.DKarmand.patchValue(null)
      this.form.controls.MashmoolType_Fld.disable()
      this.form.controls.MashmoolType_Fld.patchValue(null)
    }
  }

  async buildForm() {
    this.getEmp()
    this.formType != 'Add' ? this.get() : this.setForm()
  }

  constructor(private controlService: ControlMessageService, private service: GridFormService, private formBuilder: UntypedFormBuilder) { }

  ngOnChanges(UpdatedValue: string): void { this.buildForm() }

}
