import { Component, EventEmitter, Input, Output } from '@angular/core'
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms'

import { ControlMessageService } from 'src/app/main/main-body/common/custom-form/control-message/control-message.service'
import { Validation } from 'src/app/main/main-body/common/custom-form/control-message/Validation'
import { ModalOptions } from 'src/app/main/main-body/common/custom-modal/modal-options.interface'
import { GridFormService } from 'src/app/main/main-body/common/grid-form.service'

const Controller = 'HghListFileSettingNew'
@Component({
  selector: 'hghlist-file-settingnewstep2-form',
  templateUrl: './hghlist-file-settingnewstep2-form.component.html',
  styleUrls: ['./hghlist-file-settingnewstep2-form.component.scss']
})
export class HghlistFileSettingNewStep2FormComponent {

  @Output() done = new EventEmitter()
  @Output() closed = new EventEmitter()
  @Input() ID: number[]
  @Input() formType: string
  @Input() formObj: any
  @Input() EmpGroup_Fld: number
  @Input() IsMadeh29_Fld: number

  EmpGroupCodeList = []
  getEmpGroupCode() {
    return new Promise(resolve => {
      this.service.getCombo(`*${Controller}/GetCombo/${this.EmpGroup_Fld}/${this.IsMadeh29_Fld}`).toPromise().then((res: any) => {
        this.EmpGroupCodeList = res.Data
        return resolve(true)
      })
    })
  }
  data: any = {}
  get() {
    this.service.getByIdSimple(Controller, this.ID[0]).toPromise().then((res: any) => {
      if (!res || !res.Data) return this.done.emit(false)
      else {
        this.data = res.Data
        this.setForm()
      }
    })
  }

  put() {
    let Uri = ''
    if (this.formType =='Edit')
      Uri = `${Controller}/Update`
    else
    {
      this.form.controls.Id.patchValue(0)
      this.form.controls.IDCollect_Fld.patchValue(this.ID.toString())
      Uri = `${Controller}/UpdateAll`
    }
  
    this.service.post(Uri, this.form.getRawValue()).subscribe((res: any) => this.done.emit(res.Data)) 

  }

  form: UntypedFormGroup
  setForm() {
    Validation.form = this.formObj
    this.form = this.formBuilder.group({
      Id: [0],
      IDCollect_Fld: [null],
      EmpGroup_Fld: [this.EmpGroup_Fld],
      IsMadeh29_Fld: [this.IsMadeh29_Fld],
      NotShow_Fld: [{ value: null, disabled: Validation.disable('NotShow_Fld') }, Validation.setValidator('NotShow_Fld')],
      ColName_Fld: [{ value: null, disabled: Validation.disable('ColName_Fld') }, Validation.setValidator('ColName_Fld')],
      PayFractionGroup_Fld: [{ value: null, disabled: Validation.disable('PayFractionGroup_Fld') }, Validation.setValidator('PayFractionGroup_Fld')],
      PayFractionGroupDesc_Fld: [null],
      FormType:[{value: this.formType}]
    })
    this.formType !='MEdit' ? this.form.patchValue(this.data) : null
    this.showModal = true
  }

  save() {
    if (this.form.invalid) return this.controlService.isSubmitted = true
    this.put()
  }

  showModal: boolean = false
  close() {
    this.showModal = false
    this.closed.emit()
  }

  modalOptions: ModalOptions

  constructor(private controlService: ControlMessageService, private service: GridFormService, private formBuilder: UntypedFormBuilder) { }

  ngOnChanges(UpdatedValue: string): void {
    this.getEmpGroupCode()
    this.formType !='MEdit' ? this.get() : this.setForm()
    this.modalOptions = {
      formType: this.formType,
      modatTitle: this.IsMadeh29_Fld == 1 ? 'تنظیم فایل ماده 29' : 'تنظیم فایل حقوق و مزایای جدید' ,
      saveCallback: this.save.bind(this),
      hideCallback: this.close.bind(this),
    }
  }

}
