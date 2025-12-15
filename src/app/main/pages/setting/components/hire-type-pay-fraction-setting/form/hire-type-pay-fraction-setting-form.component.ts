import { Component, EventEmitter, Input, Output } from '@angular/core'
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms'
import { promise } from 'protractor'

import { ControlMessageService } from 'src/app/main/main-body/common/custom-form/control-message/control-message.service'
import { Validation } from 'src/app/main/main-body/common/custom-form/control-message/Validation'
import { ModalOptions } from 'src/app/main/main-body/common/custom-modal/modal-options.interface'
import { GridFormService } from 'src/app/main/main-body/common/grid-form.service'
import { Month_Fld, Year_Fld } from '../../../../global-attr'

const Controller = 'HireTypePayFractionSetting'

@Component({
  selector: 'jaridaraei-setting-form',
  templateUrl: './hire-type-pay-fraction-setting-form.component.html',
  styleUrls: ['./hire-type-pay-fraction-setting-form.component.scss']
})
export class HireTypePayFractionSettingFormComponent {

  @Output() done = new EventEmitter()
  @Output() closed = new EventEmitter()
  @Input() ID: number
  @Input() formType: string
  @Input() formObj: any

  data: any = {}
  isAdd: boolean = false
  getById() {
    return new Promise((resolve, reject) => {
      this.service.getById(Controller, this.ID, this.formType).toPromise().then((res: any) => {
        if (res && res.Data) {
          this.data = res.Data
          resolve(true)
        }
        else {
          this.done.emit(false)
          reject()
        }
      })
    })
  }

  post(form) { 
    new Promise((resolve, reject) => {
      this.service.post(`${Controller}/Create`, form).toPromise().then((res: any) => {
        if (res) {
        this.done.emit(res.Data)
        resolve(true)
        }
        else {
          this.done.emit(false)
          reject() ;
        }
      } ) 
    }) 
    
  }

  put(form) { this.service.post(`${Controller}/Update`, form).subscribe((res: any) => this.done.emit(res.Data)) }

  form: UntypedFormGroup
  setForm() {
    Validation.form = this.formObj
    this.form = this.formBuilder.group({
      Id: [0],
      Year_Fld: [Year_Fld],
      Month_Fld: [Month_Fld],
      HireTypes_Fld: [{ value: null, disabled: Validation.disable('HireType_Fld') }, Validation.setValidator('HireType_Fld')],
      ItemCodes_Fld: [{ value: null, disabled: Validation.disable('ItemCode_Fld') }, Validation.setValidator('ItemCode_Fld')],
      HireTypeDesc_Fld: [null],
      HireType_Fld: [{ value: null, disabled: Validation.disable('HireType_Fld') }, Validation.setValidator('HireType_Fld')],
      TypeCodeDesc_Fld: [null],
      TypeCode_Fld: [{ value: null, disabled: Validation.disable('TypeCode_Fld') }, Validation.setValidator('TypeCode_Fld')],
      ItemCodeDesc_Fld: [null],
      ItemCode_Fld: [{ value: null, disabled: Validation.disable('ItemCode_Fld') }, Validation.setValidator('ItemCode_Fld')],
      ListNoDesc_Fld: [null],
      ListNo_Fld: [{ value: null, disabled: Validation.disable('ListNo_Fld') }, Validation.setValidator('ListNo_Fld')],
      Emp_Fld: [{ value: null, disabled: Validation.disable('Emp_Fld') }, Validation.setValidator('Emp_Fld')],
      Cop_Fld: [{ value: null, disabled: Validation.disable('Cop_Fld') }, Validation.setValidator('Cop_Fld')],
      CatDesc_Fld: [null],
      Cat_Fld: [{ value: null, disabled: Validation.disable('Cat_Fld') }, Validation.setValidator('Cat_Fld')],
      PayCodesID: [{ value: null, disabled: Validation.disable('PayCodeID') }, Validation.setValidator('PayCodeID')],
      PayCodeIDDesc: [null],
      PayCodeID: [{ value: null, disabled: Validation.disable('PayCodeID') }, Validation.setValidator('PayCodeID')],
      FormType:[{value: this.formType}]
    })
    this.formType != 'Add' ? this.form.patchValue(this.data) : null
    this.form.controls.HireType_Fld.value ? this.form.controls.HireTypes_Fld.patchValue(Number(this.form.controls.HireType_Fld.value)) : null
    this.form.controls.ItemCode_Fld.value ? this.form.controls.ItemCodes_Fld.patchValue(Number(this.form.controls.ItemCode_Fld.value)) : null
    this.form.controls.PayCodeID.value ? this.form.controls.PayCodesID.patchValue(Number(this.form.controls.PayCodeID.value)) : null
    this.changeEmpCop()
  }

  save() {
    let fakeFormValue = { ...this.form.getRawValue() }
    if (this.formType == 'Add')
    {
      this.form.controls.HireType_Fld.patchValue(0)
      this.form.controls.ItemCode_Fld.patchValue(0)
      fakeFormValue.HireTypes_Fld  ? fakeFormValue.HireTypes_Fld = fakeFormValue.HireTypes_Fld.toString() : null
      fakeFormValue.HireType_Fld = 0 
      fakeFormValue.ItemCodes_Fld  ? fakeFormValue.ItemCodes_Fld = fakeFormValue.ItemCodes_Fld.toString() : null
      fakeFormValue.ItemCode_Fld = 0 
      fakeFormValue.PayCodesID  ? fakeFormValue.PayCodesID = fakeFormValue.PayCodesID.toString() : null
    }
    if (this.formType == 'Edit')
    {
      this.form.controls.HireType_Fld.patchValue(Number(fakeFormValue.HireTypes_Fld))
      this.form.controls.ItemCode_Fld.patchValue(Number(fakeFormValue.ItemCodes_Fld))      
      fakeFormValue.HireTypes_Fld  ? fakeFormValue.HireTypes_Fld = fakeFormValue.HireTypes_Fld.toString() : null
      fakeFormValue.HireType_Fld = Number(fakeFormValue.HireTypes_Fld)
      fakeFormValue.ItemCodes_Fld  ? fakeFormValue.ItemCodes_Fld = fakeFormValue.ItemCodes_Fld.toString() : null
      fakeFormValue.ItemCode_Fld = Number(fakeFormValue.ItemCodes_Fld) 
      fakeFormValue.PayCodesID  ? fakeFormValue.PayCodesID = fakeFormValue.PayCodesID.toString() : null
    }
    
    if (this.form.invalid) return this.controlService.isSubmitted = true

    if (this.formType == 'Add') return this.post(fakeFormValue)

    if (this.formType == 'Edit') this.put(fakeFormValue)
  }

  showModal: boolean = false
  close() {
    this.showModal = false
    this.closed.emit()
  }

  comboArrayTypeCode = []
  async getTypeCodeCombo() {
    return await new Promise(resolve => {
      this.service.get('HireTypePayFractionSetting/GetComboTypeCode').subscribe((res: any) => {
        let data = res.Data
        this.comboArrayTypeCode = data.map(({ FldInt1: Id, FldString1: CodeDesc_Fld, FldInt2: HaveEmpCop }) => ({ Id, CodeDesc_Fld, HaveEmpCop }))
        return resolve(true)
      })
    })
  }

  itemList: []
  changeTypeCode(isOnInit?) {
    if (this.form.controls.TypeCode_Fld.value && this.form.controls.HireTypes_Fld.value) {
      var itemCodeUrl = `${Controller}/GetComboItemCode/${this.form.controls.TypeCode_Fld.value}/${this.form.controls.HireTypes_Fld.value}`
      this.service.get(itemCodeUrl).subscribe((res:any) => {
        let data = res.Data
        this.itemList = data
      })
      this.form.controls.ItemCode_Fld.enable()
    }
    else this.form.controls.ItemCode_Fld.disable()
    if (this.form.controls.TypeCode_Fld.value) {
      if (this.comboArrayTypeCode.filter(a => a.Id == this.form.controls.TypeCode_Fld.value)[0].HaveEmpCop == 1) {
        this.form.controls.Emp_Fld.enable()
        this.form.controls.Cop_Fld.enable()
      }
      else {
        this.form.controls.Emp_Fld.disable()
        this.form.controls.Cop_Fld.disable()
        if (this.formType == 'Add' || this.formType == 'Edit')        
        {
          this.form.controls.Emp_Fld.setValue(false)
          this.form.controls.Cop_Fld.setValue(false)
        }
      }
    }

    else {
      this.form.controls.Emp_Fld.disable()
      this.form.controls.Cop_Fld.disable()
      if (this.formType == 'Add' || this.formType == 'Edit')        
      {
        this.form.controls.Emp_Fld.setValue(false)
        this.form.controls.Cop_Fld.setValue(false)
      }
}

    if (isOnInit) return
    this.data.ItemCodeDesc_Fld = null
    this.form.controls.ItemCodeDesc_Fld.patchValue(null)
    this.form.controls.ItemCode_Fld.patchValue(null)
  }

  hireTypeChange() {
    if (this.form.controls.TypeCode_Fld.value && this.form.controls.HireTypes_Fld.value) {
      var itemCodeUrl = `${Controller}/GetComboItemCode/${this.form.controls.TypeCode_Fld.value}/${this.form.controls.HireTypes_Fld.value}`
      this.service.get(itemCodeUrl).subscribe((res:any) => {
        let data = res.Data
        this.itemList = data
      })
      this.form.controls.ItemCode_Fld.enable()
    }
    else this.form.controls.ItemCode_Fld.disable()
    this.data.ItemCodeDesc_Fld = null
    this.form.controls.ItemCodeDesc_Fld.patchValue(null)
    this.form.controls.ItemCode_Fld.patchValue(null)
  }

  changeEmpCop() {
    // if (this.form.controls.Emp_Fld.value || this.form.controls.Cop_Fld.value) {
    //   this.form.controls.Cat_Fld.disable()
    //   this.form.controls.Cat_Fld.patchValue(null)
    // }
    // else this.form.controls.Cat_Fld.enable()
  }

  modalOptions: ModalOptions

  async buildForm() {
    await this.getEmp()
    await this.getPay()
    await this.getTypeCodeCombo()
    if (this.formType != 'Add') {
      await this.getById()
      this.setForm()
      this.changeTypeCode(true)
      this.isAdd = false
    }
    else {
      this.setForm()
      this.form.controls.ItemCode_Fld.disable()
      this.isAdd = true
    }
    this.showModal = true
  }

  empList = []
  payList = []
  async getEmp() { this.empList.length == 0 ? await this.service.getCombo('HireType').subscribe((res: any) => this.empList = res.Data) : null }
  async getPay() { this.payList.length == 0 ? await this.service.getCombo('PayProgram').subscribe((res: any) => this.payList = res.Data) : null }

  constructor(private controlService: ControlMessageService, private service: GridFormService, private formBuilder: UntypedFormBuilder) { }

  ngOnChanges(UpdatedValue: string): void {
    this.modalOptions = {
      formType: this.formType,
      modatTitle: 'تنظیمات انتقال به جاری و خزانه',
      saveCallback: this.save.bind(this),
      hideCallback: this.close.bind(this),
    }
    this.buildForm()
  }

}
