import { Component, Output, EventEmitter, Input } from '@angular/core'
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms'
import { ControlMessageService } from 'src/app/main/main-body/common/custom-form/control-message/control-message.service'
import { GridFormService } from 'src/app/main/main-body/common/grid-form.service'
import { Validation } from 'src/app/main/main-body/common/custom-form/control-message/Validation'

const Controller = 'BankBranch'

@Component({
  selector: 'bank-branch-form',
  templateUrl: './bank-branch-form.component.html',
  styleUrls: ['./bank-branch-form.component.scss']
})
export class BankBranchFormComponent {

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
      BankDesc_Fld: [null],
      Bank_Fld: [{ value: null, disabled: Validation.disable('Bank_Fld') }, Validation.setValidator('Bank_Fld')],
      CodeDesc_Fld: [{ value: null, disabled: Validation.disable('CodeDesc_Fld') }, Validation.setValidator('CodeDesc_Fld')],
      BranchCode_Fld: [{ value: null, disabled: Validation.disable('BranchCode_Fld') }, Validation.setValidator('BranchCode_Fld')],
      DiskCounter_Fld: [{ value: null, disabled: Validation.disable('DiskCounter_Fld') }, Validation.setValidator('DiskCounter_Fld')],
      OrganBankiCode_Fld: [{ value: null, disabled: Validation.disable('OrganBankiCode_Fld') }, Validation.setValidator('OrganBankiCode_Fld')],
      AccountLen_Fld: [{ value: null, disabled: Validation.disable('AccountLen_Fld') }, Validation.setValidator('AccountLen_Fld')],
      Addr_Fld: [{ value: null, disabled: Validation.disable('Addr_Fld') }, Validation.setValidator('Addr_Fld')],
      TelNo1_Fld: [{ value: null, disabled: Validation.disable('TelNo1_Fld') }, Validation.setValidator('TelNo1_Fld')],
      TelNo2_Fld: [{ value: null, disabled: Validation.disable('TelNo2_Fld') }, Validation.setValidator('TelNo2_Fld')],
      MainAccountCode_Fld: [{ value: null, disabled: Validation.disable('MainAccountCode_Fld') }, Validation.setValidator('MainAccountCode_Fld')],
      InActive_Fld: [{ value: null, disabled: Validation.disable('InActive_Fld') }, Validation.setValidator('InActive_Fld')],
      FormType:[{value: this.formType}]
    })
    this.formType != 'Add' ? this.form.patchValue(this.data) : null
    this.showForm = true
    setTimeout(() => {
      this.service.scrollToElement("form")
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
