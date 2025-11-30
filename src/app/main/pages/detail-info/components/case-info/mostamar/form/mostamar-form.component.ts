import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms'

import { ControlMessageService } from 'src/app/main/main-body/common/custom-form/control-message/control-message.service'
import { Validation } from 'src/app/main/main-body/common/custom-form/control-message/Validation'
import { ModalOptions } from 'src/app/main/main-body/common/custom-modal/modal-options.interface'
import { GridFormService } from 'src/app/main/main-body/common/grid-form.service'

const Controller = 'Mostamar'

@Component({
  selector: 'mostamar-form',
  templateUrl: './mostamar-form.component.html',
  styleUrls: ['./mostamar-form.component.scss']
})

export class MostamarFormComponent implements OnInit {

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
    fakeFormValue.Id = 0
    this.service.post(`${Controller}/Create`, fakeFormValue).subscribe((res: any) => this.done.emit(res.Data))
  }

  put(fakeFormValue) { this.service.post(`${Controller}/Update`, fakeFormValue).subscribe((res: any) => this.done.emit(res.Data)) }

  form: UntypedFormGroup
  setForm() {
    Validation.form = this.formObj
    this.form = this.formBuilder.group({
      Id: [null],
      CodeDesc_Fld: [{ value: null, disabled: Validation.disable('CodeDesc_Fld') }, Validation.setValidator('CodeDesc_Fld')],
      NoTax_Fld: [{ value: null, disabled: Validation.disable('NoTax_Fld') }, Validation.setValidator('NoTax_Fld')],
      CalcInsure_Fld: [{ value: null, disabled: Validation.disable('CalcInsure_Fld') }, Validation.setValidator('CalcInsure_Fld')],
      FixPrice_Fld: [{ value: null, disabled: Validation.disable('FixPrice_Fld') }, Validation.setValidator('FixPrice_Fld')],
      FormulaDesc_Fld: [null],
      Formula_Fld: [{ value: null, disabled: Validation.disable('Formula_Fld') }, Validation.setValidator('Formula_Fld')],
      InsureCode_Fld: [{ value: null, disabled: Validation.disable('InsureCode_Fld') }, Validation.setValidator('InsureCode_Fld')],
      TaxPayTypeDesc_Fld: [null],
      TaxPayType_Fld: [{ value: null, disabled: Validation.disable('TaxPayType_Fld') }, Validation.setValidator('TaxPayType_Fld')],
      TaxPayType1403Desc_Fld: [null],
      TaxPayType1403_Fld: [{ value: null, disabled: Validation.disable('TaxPayType1403_Fld') }, Validation.setValidator('TaxPayType1403_Fld')],
      TaxBaseTableDesc_Fld: [null],
      TaxBaseTable_Fld: [{ value: null, disabled: Validation.disable('TaxBaseTable_Fld') }, Validation.setValidator('TaxBaseTable_Fld')],
      FormType:[{value: this.formType}]
    })
    this.formType != 'Add' ? this.form.patchValue(this.data) : null
    this.changeCalcInsure()
    this.getInsureCode()
    this.showModal = true
  }

  fixInsureCode(form) { form.InsureCode_Fld ? form.InsureCode_Fld = form.InsureCode_Fld.toString() : null }

  getInsureCode() { this.form.controls.InsureCode_Fld.value ? this.form.controls.InsureCode_Fld.patchValue(this.form.controls.InsureCode_Fld.value.split(',').map(i => Number(i))) : null }

  save() {
    if (this.form.invalid) return this.controlService.isSubmitted = true

    let fakeFormValue = { ...this.form.getRawValue() }
    this.fixInsureCode(fakeFormValue)

    if (this.formType == 'Add') return this.post(fakeFormValue)

    if (this.formType == 'Edit') this.put(fakeFormValue)
  }

  showModal: boolean = false
  close() {
    this.showModal = false
    this.closed.emit()
  }

  changeCalcInsure() {
    this.formObj.InsureCode_Fld.ishidden = true
    if (this.form.controls.CalcInsure_Fld.value) {
      this.form.controls.InsureCode_Fld.enable()
      this.form.controls.InsureCode_Fld.setValidators([Validation.required()])
      this.insureList.length == 0 ? this.getInsure() : null
    }
    else {
      this.form.controls.InsureCode_Fld.disable()
      this.form.controls.InsureCode_Fld.setValue(null)
      this.form.controls.InsureCode_Fld.clearValidators()
    }
    setTimeout(() => this.formObj.InsureCode_Fld.ishidden = false)
  }

  insureList = []
  getInsure() { this.service.getCombo('Insure').subscribe((res: any) => this.insureList = res.Data) }

  modalOptions: ModalOptions

  constructor(private controlService: ControlMessageService, private service: GridFormService, private formBuilder: UntypedFormBuilder) { }

  ngOnInit(): void {
    this.getInsure()
    this.formType != 'Add' ? this.get() : this.setForm()
    this.modalOptions = {
      formType: this.formType,
      modatTitle: 'پرداخت مستمر',
      saveCallback: this.save.bind(this),
      hideCallback: this.close.bind(this),
    }
  }

}
