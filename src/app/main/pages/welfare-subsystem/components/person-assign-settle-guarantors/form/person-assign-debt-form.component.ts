import { Component, Output, EventEmitter, Input } from '@angular/core'
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms'
import { ControlMessageService } from 'src/app/main/main-body/common/custom-form/control-message/control-message.service'
import { GridFormService } from 'src/app/main/main-body/common/grid-form.service'
import { Validation } from 'src/app/main/main-body/common/custom-form/control-message/Validation'

const Controller = 'PersonAssignDebt'

@Component({
  selector: 'person-assign-debt-form',
  templateUrl: './person-assign-debt-form.component.html',
  styleUrls: ['./person-assign-debt-form.component.scss']
})
export class PersonAssignDebtFormComponent {

  @Output() done = new EventEmitter()
  @Output() closed = new EventEmitter()
  @Input() ID: number
  @Input() PID: number
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

  post() { this.service.post(`${Controller}/Create`, this.form.getRawValue()).subscribe((res: any) => { res && res.IsSuccess ? this.done.emit(res.Data) : null }) }

  put() { this.service.post(`${Controller}/Update`, this.form.getRawValue()).subscribe((res: any) => { res && res.IsSuccess ? this.done.emit(res.Data) : null }) }

  form: UntypedFormGroup
  showForm: boolean = false
  setForm() {
    Validation.form = this.formObj
    this.form = this.formBuilder.group({
      Id: [null],
      PersonID_Fld: [this.PID],
      DebtCodeDesc_Fld: [null],
      DebtCode_Fld: [{ value: null, disabled: Validation.disable('DebtCode_Fld') }, Validation.setValidator('DebtCode_Fld')],
      RequestDate_Fld: [{ value: null, disabled: Validation.disable('RequestDate_Fld') }, Validation.setValidator('RequestDate_Fld')],
      DebtDate_Fld: [{ value: null, disabled: Validation.disable('DebtDate_Fld') }, Validation.setValidator('DebtDate_Fld')],
      RequestPrice_Fld: [{ value: null, disabled: Validation.disable('RequestPrice_Fld') }, Validation.setValidator('RequestPrice_Fld')],
      OfferPrice_Fld: [{ value: null, disabled: Validation.disable('OfferPrice_Fld') }, Validation.setValidator('OfferPrice_Fld')],
      RefahBenefitPrice_Fld: [{ value: null, disabled: Validation.disable('RefahBenefitPrice_Fld') }, Validation.setValidator('RefahBenefitPrice_Fld')],
      BenefitPrice_Fld: [{ value: null, disabled: Validation.disable('BenefitPrice_Fld') }, Validation.setValidator('BenefitPrice_Fld')],
      DebtPrice_Fld: [{ value: null, disabled: Validation.disable('DebtPrice_Fld') }, Validation.setValidator('DebtPrice_Fld')],
      FullpartNumber_Fld: [{ value: null, disabled: Validation.disable('FullpartNumber_Fld') }, Validation.setValidator('FullpartNumber_Fld')],
      FirstPrice_Fld: [{ value: null, disabled: Validation.disable('FirstPrice_Fld') }, Validation.setValidator('FirstPrice_Fld')],
      NextPrice_Fld: [{ value: null, disabled: Validation.disable('NextPrice_Fld') }, Validation.setValidator('NextPrice_Fld')],
      RemainPrice_Fld: [{ value: null, disabled: Validation.disable('RemainPrice_Fld') }, Validation.setValidator('RemainPrice_Fld')],
      DebtNumber_Fld: [{ value: null, disabled: Validation.disable('DebtNumber_Fld') }, Validation.setValidator('DebtNumber_Fld')],
      Sarfasl: [{ value: null, disabled: Validation.disable('Sarfasl') }, Validation.setValidator('Sarfasl')],
      Desc_Fld: [{ value: null, disabled: Validation.disable('Desc_Fld') }, Validation.setValidator('Desc_Fld')],
      IsImport_Fld: [{ value: null, disabled: Validation.disable('IsImport_Fld') }, Validation.setValidator('IsImport_Fld')],
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

  constructor(private controlService: ControlMessageService, private service: GridFormService, private formBuilder: UntypedFormBuilder) { }

  ngOnChanges(UpdatedValue: string): void { this.formType != 'Add' ? this.get() : this.setForm() }

}
