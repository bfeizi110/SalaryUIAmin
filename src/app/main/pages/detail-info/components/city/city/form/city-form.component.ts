import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms'

import { ControlMessageService } from 'src/app/main/main-body/common/custom-form/control-message/control-message.service'
import { Validation } from 'src/app/main/main-body/common/custom-form/control-message/Validation'
import { ModalOptions } from 'src/app/main/main-body/common/custom-modal/modal-options.interface'
import { GridFormService } from 'src/app/main/main-body/common/grid-form.service'

const Controller = 'City'
@Component({
  selector: 'city-form',
  templateUrl: './city-form.component.html',
  styleUrls: ['./city-form.component.scss']
})

export class CityFormComponent {

  @Output() done = new EventEmitter()
  @Output() closed = new EventEmitter()
  @Input() ID: number
  @Input() formType: string
  @Input() formObj: any
  @Input() cityType: 1 | 2 | 3
  @Input() parentId: number

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
      }
    })
  }

  post() { this.service.post(`${Controller}/Create`, this.form.getRawValue()).subscribe((res: any) => { res && res.IsSuccess ? this.done.emit(res.Data) : null })}

  put() { this.service.post(`${Controller}/Update`, this.form.getRawValue()).subscribe((res: any) => { res && res.IsSuccess ? this.done.emit(res.Data) : null })}

  form: UntypedFormGroup
  setForm() {
    Validation.form = this.formObj
    this.form = this.formBuilder.group({
      Id: [0],
      ParentID: [null],
      CodeDesc_Fld: [{ value: null, disabled: Validation.disable('CodeDesc_Fld') }, Validation.setValidator('CodeDesc_Fld')],
      Type: [{ value: null, disabled: Validation.disable('Type') }, Validation.setValidator('Type')],
      HesIDCode: [{ value: null, disabled: Validation.disable('HesIDCode') }, Validation.setValidator('HesIDCode')],
      KICode: [{ value: null, disabled: Validation.disable('KICode') }, Validation.setValidator('KICode')],
      IsPayroll: [{ value: true, disabled: Validation.disable('IsPayroll') }, Validation.setValidator('IsPayroll')],
      BadWeatherPercent_Fld: [{ value: true, disabled: Validation.disable('BadWeatherPercent_Fld') }, Validation.setValidator('BadWeatherPercent_Fld')],
      Distance_Fld: [{ value: true, disabled: Validation.disable('Distance_Fld') }, Validation.setValidator('Distance_Fld')],
      TashilatPercent_Fld: [{ value: true, disabled: Validation.disable('TashilatPercent_Fld') }, Validation.setValidator('TashilatPercent_Fld')],
      FormType:[{value: this.formType}]
    })
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

  async buildForm() {
    this.formObj = null
    this.data = {}

    if (this.formType != 'Add') {
      this.get()
      await this.getAttr() 
      this.setForm()

      this.form.patchValue(this.data)
      }
      else
      {
        await this.getAttr()
        this.setForm()
        this.form.reset()
        this.form.controls.Id.patchValue(0)
        this.form.controls.Type.patchValue(this.cityType)
        this.form.controls.ParentID.patchValue(this.parentId)
        }
     this.showModal = true
    }  
  newFormObj: any
  ngOnChanges(UpdatedValue: string): void {
    this.buildForm()
    this.modalOptions = {
      formType: this.formType,
      modatTitle: 'کشور و استان و شهر',
      saveCallback: this.save.bind(this),
      hideCallback: this.close.bind(this),
    }
  }

}
