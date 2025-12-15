import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms'

import { ControlMessageService } from 'src/app/main/main-body/common/custom-form/control-message/control-message.service'
import { Validation } from 'src/app/main/main-body/common/custom-form/control-message/Validation'
import { ModalOptions } from 'src/app/main/main-body/common/custom-modal/modal-options.interface'
import { GridFormService } from 'src/app/main/main-body/common/grid-form.service'

const Controller = 'JobCategory'

@Component({
  selector: 'job-category-form',
  templateUrl: './job-category-form.component.html',
  styleUrls: ['./job-category-form.component.scss']
})
export class JobCategoryFormComponent implements OnInit {

  @Output() done = new EventEmitter()
  @Output() closed = new EventEmitter()
  @Input() ID: number
  @Input() formType: string
  @Input() formObj: any

  getAttr(): Promise<any> {
    return new Promise(resolve => {
      if (this.ID)
        this.service.getAttrById(Controller, this.ID).subscribe((res: any) => {
          this.formObj = res.Data.EntityAttribute
          return resolve(true)
        })
      else
        this.service.getAttr(Controller).subscribe((res: any) => {
          this.formObj = res.Data.EntityAttribute
          return resolve(true)
        })
    })
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

  post() {
    this.form.patchValue({ Id: 0 })
    this.service.post(`${Controller}/Create`, this.form.getRawValue()).subscribe((res: any) => {
      this.done.emit(res.Data)
    })
  }

  put() { this.service.post(`${Controller}/Update`, this.form.getRawValue()).subscribe((res: any) => this.done.emit(res.Data)) }

  form: UntypedFormGroup
  setForm() {
    Validation.form = this.formObj
    this.form = this.formBuilder.group({
      Id: [null],
      CodeDesc_Fld: [{ value: null, disabled: Validation.disable('CodeDesc_Fld') }, Validation.setValidator('CodeDesc_Fld')],
      IsPayroll: [{ value: true, disabled: Validation.disable('IsPayroll') }, Validation.setValidator('BIsPayrollank_Fld')],
      TaxCatType1403Desc_Fld: [null],
      TaxCatType1403_Fld: [{ value: null, disabled: Validation.disable('TaxCatType1403_Fld') }, Validation.setValidator('TaxCatType1403_Fld')],
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

  ngOnInit(): void {
    this.getAttr()
    this.formType != 'Add' ? this.get() : this.setForm()
    this.modalOptions = {
      formType: this.formType,
      modatTitle: 'رسته شغلی',
      saveCallback: this.save.bind(this),
      hideCallback: this.close.bind(this),
    }
  }

}
