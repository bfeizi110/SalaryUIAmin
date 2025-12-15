import { Component, EventEmitter, Input, Output } from '@angular/core'
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms'

import { ControlMessageService } from 'src/app/main/main-body/common/custom-form/control-message/control-message.service'
import { Validation } from 'src/app/main/main-body/common/custom-form/control-message/Validation'
import { GridFormService } from 'src/app/main/main-body/common/grid-form.service'

const Controller = 'TaxBase'

@Component({
  selector: 'tax-base-form',
  templateUrl: './tax-base-form.component.html',
  styleUrls: ['./tax-base-form.component.scss']
})

export class TaxBaseFormComponent {

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

  post() { this.service.post(`${Controller}/Create`, this.form.getRawValue()).subscribe((res: any) => { res && res.IsSuccess ? this.done.emit(res.Data) : null })}

  put() { this.service.post(`${Controller}/Update`, this.form.getRawValue()).subscribe((res: any) => { res && res.IsSuccess ? this.done.emit(res.Data) : null })}

  form: UntypedFormGroup
  showForm: boolean = false
  setForm() {
    Validation.form = this.formObj
    this.form = this.formBuilder.group({
      Id: [0],
      CodeDesc_Fld: [{ value: null, disabled: Validation.disable('CodeDesc_Fld') }, Validation.setValidator('CodeDesc_Fld')],
      TaxBranch_Fld: [{ value: null, disabled: Validation.disable('TaxBranch_Fld') }, Validation.setValidator('TaxBranch_Fld')],
      PayTypeDesc_Fld: [null],
      PayType_Fld: [{ value: null, disabled: Validation.disable('PayType_Fld') }, Validation.setValidator('PayType_Fld')],
      PayTypeHghDesc_Fld: [null],
      PayTypeHgh_Fld: [{ value: null, disabled: Validation.disable('PayTypeHgh_Fld') }, Validation.setValidator('PayTypeHgh_Fld')],
      PayFirstName_Fld: [{ value: null, disabled: Validation.disable('PayFirstName_Fld') }, Validation.setValidator('PayFirstName_Fld')],
      PayLastName_Fld: [{ value: null, disabled: Validation.disable('PayLastName_Fld') }, Validation.setValidator('PayLastName_Fld')],
      BranchName_Fld: [{ value: null, disabled: Validation.disable('BranchName_Fld') }, Validation.setValidator('BranchName_Fld')],
      TIN_Fld: [{ value: null, disabled: Validation.disable('TIN_Fld') }, Validation.setValidator('TIN_Fld')],
      PostCode_Fld: [{ value: null, disabled: Validation.disable('PostCode_Fld') }, Validation.setValidator('PostCode_Fld')],
      TelNo_Fld: [{ value: null, disabled: Validation.disable('TelNo_Fld') }, Validation.setValidator('TelNo_Fld')],
      Address_Fld: [{ value: null, disabled: Validation.disable('Address_Fld') }, Validation.setValidator('Address_Fld')],
      OwnerNationalCode1_Fld: [{ value: null, disabled: Validation.disable('OwnerNationalCode1_Fld') }, Validation.setValidator('OwnerNationalCode1_Fld')],
      OwnerName1_Fld: [{ value: null, disabled: Validation.disable('OwnerName1_Fld') }, Validation.setValidator('OwnerName1_Fld')],
      OwnerFamily1_Fld: [{ value: null, disabled: Validation.disable('OwnerFamily1_Fld') }, Validation.setValidator('OwnerFamily1_Fld')],
      OwnerPost1_Fld: [{ value: null, disabled: Validation.disable('OwnerPost1_Fld') }, Validation.setValidator('OwnerPost1_Fld')],
      OwnerNationalCode2_Fld: [{ value: null, disabled: Validation.disable('OwnerNationalCode2_Fld') }, Validation.setValidator('OwnerNationalCode2_Fld')],
      OwnerName2_Fld: [{ value: null, disabled: Validation.disable('OwnerName2_Fld') }, Validation.setValidator('OwnerName2_Fld')],
      OwnerFamily2_Fld: [{ value: null, disabled: Validation.disable('OwnerFamily2_Fld') }, Validation.setValidator('OwnerFamily2_Fld')],
      OwnerPost2_Fld: [{ value: null, disabled: Validation.disable('OwnerPost2_Fld') }, Validation.setValidator('OwnerPost2_Fld')],
      MoafPoorZone_Fld: [{ value: null, disabled: Validation.disable('MoafPoorZone_Fld') }, Validation.setValidator('MoafPoorZone_Fld')],
      Moaf84Yearly_Fld: [{ value: null, disabled: Validation.disable('Moaf84Yearly_Fld') }, Validation.setValidator('Moaf84Yearly_Fld')],
      NameSigner: [{ value: null, disabled: Validation.disable('NameSigner') }, Validation.setValidator('NameSigner')],
      SematSigner: [{ value: null, disabled: Validation.disable('SematSigner') }, Validation.setValidator('SematSigner')],
      TaxZarib_Fld: [{ value: null, disabled: Validation.disable('TaxZarib_Fld') }, Validation.setValidator('TaxZarib_Fld')],
      InActive_Fld: [{ value: null, disabled: Validation.disable('InActive_Fld') }, Validation.setValidator('InActive_Fld')],
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

  close() {
    this.closed.emit()
  }

  constructor(private controlService: ControlMessageService, private service: GridFormService, private formBuilder: UntypedFormBuilder) { }

  ngOnChanges(UpdatedValue: string): void { this.formType != 'Add' ? this.get() : this.setForm() }

}
