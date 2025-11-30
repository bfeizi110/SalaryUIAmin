import { Component, Output, EventEmitter, Input } from '@angular/core'
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms'
import { ControlMessageService } from 'src/app/main/main-body/common/custom-form/control-message/control-message.service'
import { GridFormService } from 'src/app/main/main-body/common/grid-form.service'
import { Validation } from 'src/app/main/main-body/common/custom-form/control-message/Validation'

const Controller = 'SettleDebt'

@Component({
  selector: 'settle-debt-form',
  templateUrl: './settle-debt-form.component.html',
  styleUrls: ['./settle-debt-form.component.scss']
})
export class SettleDebtFormComponent {

  @Output() done = new EventEmitter()
  @Output() closed = new EventEmitter()
  @Input() ID: number
  @Input() formType: string
  @Input() formObj: any
  @Input() ParentID: number

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
      Id: [null],
      ParentId_Fld: [this.ParentID],
      PayDate_Fld: [{ value: null, disabled: Validation.disable('PayDate_Fld') }, Validation.setValidator('PayDate_Fld')],
      PayPrice_Fld: [{ value: null, disabled: Validation.disable('DescPayPrice_Fld_Fld') }, Validation.setValidator('DescPayPrice_Fld_Fld')],
      PayTypeDesc_Fld: [null],
      PayType_Fld: [{ value: null, disabled: Validation.disable('PayType_Fld') }, Validation.setValidator('PayType_Fld')],
      PayReasonDesc_Fld: [null],
      PayReason_Fld: [{ value: null, disabled: Validation.disable('PayReason_Fld') }, Validation.setValidator('PayReason_Fld')],
      DocDate_Fld: [{ value: null, disabled: Validation.disable('DocDate_Fld') }, Validation.setValidator('DocDate_Fld')],
      AccountNumber_Fld: [{ value: null, disabled: Validation.disable('AccountNumber_Fld') }, Validation.setValidator('AccountNumber_Fld')],
      Desc_Fld: [{ value: null, disabled: Validation.disable('Desc_Fld') }, Validation.setValidator('Desc_Fld')],
      IsUsed_Fld: [{ value: null, disabled: Validation.disable('IsUsed_Fld') }, Validation.setValidator('IsUsed_Fld')],
      IsUsedYear_Fld: [{ value: null, disabled: Validation.disable('IsUsedYear_Fld') }, Validation.setValidator('IsUsedYear_Fld')],
      IsUsedMonth_Fld: [{ value: null, disabled: Validation.disable('IsUsedMonth_Fld') }, Validation.setValidator('IsUsedMonth_Fld')],
      Remain_Fld: [{ value: null, disabled: Validation.disable('Remain_Fld') }, Validation.setValidator('Remain_Fld')],
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

  constructor(private controlService: ControlMessageService, private service: GridFormService, private formBuilder: UntypedFormBuilder) { }

  ngOnChanges(UpdatedValue: string): void { this.formType != 'Add' ? this.get() : this.setForm() }

}
