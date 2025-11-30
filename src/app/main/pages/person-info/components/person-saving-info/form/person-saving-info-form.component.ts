import { Component, Output, EventEmitter, Input, ViewChild, ElementRef } from '@angular/core'
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms'
import { ControlMessageService } from 'src/app/main/main-body/common/custom-form/control-message/control-message.service'
import { GridFormService } from 'src/app/main/main-body/common/grid-form.service'
import { Validation } from 'src/app/main/main-body/common/custom-form/control-message/Validation'
import { Month_Fld, Year_Fld } from 'src/app/main/pages/global-attr'
import { NgbCalendarPersian } from '@ng-bootstrap/ng-bootstrap'

const Controller = 'PersonSavingInfo'

@Component({
  selector: 'person-saving-info-form',
  templateUrl: './person-saving-info-form.component.html',
  styleUrls: ['./person-saving-info-form.component.scss']
})
export class PersonSavingInfoFormComponent {

  @Output() done = new EventEmitter()
  @Output() closed = new EventEmitter()
  @Output() saveCodeChange = new EventEmitter()
  @Input() saveCode: number
  @Input() ID: number
  @Input() formType: string
  @Input() formObj: any
  @Input() PID: number
  @Input() personList: any[]
  @Input() idList: any[]
  @Input() selectedPersonelNF: any
  
  @ViewChild("myElem") MyProp: ElementRef;
  
  saveCodeList = []
  getSaveCode() {
    return new Promise(resolve => {
      this.service.getCombo('Saving').toPromise().then((res: any) => {
        this.saveCodeList = res.Data
        return resolve(true)
      })
    })
  }

  data: any = {}
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

  post() {
    this.form.patchValue({ Id: 0 })
    if (this.personList.length == 0) this.form.controls.PersonIDCollect_Fld.patchValue(null)
    else {
      this.form.controls.PersonID_Fld.patchValue(0)
      this.form.controls.PersonIDCollect_Fld.patchValue(this.personList)
    }
    this.service.post(`${Controller}/Create`, this.form.getRawValue()).subscribe(_ => this.done.emit(this.personList.length == 0 ? 'single' : 'multi'))
  }

  put() {
    if (this.idList.length == 0) {
      this.form.controls.IDCollect_Fld.patchValue(null)
      this.service.post(`${Controller}/Update`, this.form.getRawValue()).subscribe(_ => this.done.emit('single'))
    }
    else {
      this.form.controls.Id.patchValue(0)
      this.form.controls.PersonID_Fld.patchValue(0)
      this.form.controls.IDCollect_Fld.patchValue(this.idList)
      let model = this.form.getRawValue()
      model.FieldChanged_Fld = this.fieldChange.toString()
      this.service.post(`${Controller}/UpdateAll`, model).subscribe(_ => this.done.emit('multi'))
    }
  }

  form: UntypedFormGroup
  showForm: boolean = false
  setForm() {
    Validation.form = this.formObj
    this.form = this.formBuilder.group({
      Id: [0],
      Year_Fld: [Year_Fld],
      Month_Fld: [Month_Fld],
      PersonID_Fld: [this.PID],
      SaveCodeDesc_Fld: [null],
      SaveCode_Fld: [{ value: null, disabled: Validation.disable('SaveCode_Fld') }, Validation.setValidator('SaveCode_Fld')],
      EmployeePrice_Fld: [{ value: null, disabled: Validation.disable('EmployeePrice_Fld') }, Validation.setValidator('EmployeePrice_Fld')],
      EmployeePriceJari_Fld: [{ value: null, disabled: Validation.disable('EmployeePriceJari_Fld') }, Validation.setValidator('EmployeePriceJari_Fld')],
      EmployeePriceDaraei_Fld: [{ value: null, disabled: Validation.disable('EmployeePriceDaraei_Fld') }, Validation.setValidator('EmployeePriceDaraei_Fld')],
      ManagerPrice_Fld: [{ value: null, disabled: Validation.disable('ManagerPrice_Fld') }, Validation.setValidator('ManagerPrice_Fld')],
      ManagerPriceJari_Fld: [{ value: null, disabled: Validation.disable('ManagerPriceJari_Fld') }, Validation.setValidator('ManagerPriceJari_Fld')],
      ManagerPriceDaraei_Fld: [{ value: null, disabled: Validation.disable('ManagerPriceDaraei_Fld') }, Validation.setValidator('ManagerPriceDaraei_Fld')],
      SumSaving_Fld: [{ value: null, disabled: Validation.disable('SumSaving_Fld') }, Validation.setValidator('SumSaving_Fld')],
      SumSavingCop_Fld: [{ value: null, disabled: Validation.disable('SumSavingCop_Fld') }, Validation.setValidator('SumSavingCop_Fld')],
      SumSavingEmp_Fld: [{ value: null, disabled: Validation.disable('SumSavingEmp_Fld') }, Validation.setValidator('SumSavingEmp_Fld')],
      EmployeeAccountNumber_Fld: [{ value: null, disabled: Validation.disable('EmployeeAccountNumber_Fld') }, Validation.setValidator('EmployeeAccountNumber_Fld')],
      ManagerAccountNumber_Fld: [{ value: null, disabled: Validation.disable('ManagerAccountNumber_Fld') }, Validation.setValidator('ManagerAccountNumber_Fld')],
      DateFirstPay_Fld: [{ value: null, disabled: Validation.disable('DateFirstPay_Fld') }, Validation.setValidator('DateFirstPay_Fld')],
      EmployeeTopicNumber_Fld: [{ value: null, disabled: Validation.disable('EmployeeTopicNumber_Fld') }, Validation.setValidator('EmployeeTopicNumber_Fld')],
      ManagerTopicNumber_Fld: [{ value: null, disabled: Validation.disable('ManagerTopicNumber_Fld') }, Validation.setValidator('ManagerTopicNumber_Fld')],
      BankCodeDesc_Fld: [null],
      BankCode_Fld: [{ value: null, disabled: Validation.disable('BankCode_Fld') }, Validation.setValidator('BankCode_Fld')],
      StopCalculate_Fld: [{ value: null, disabled: Validation.disable('StopCalculate_Fld') }, Validation.setValidator('StopCalculate_Fld')],
      CalculateFlag_Fld: [{ value: null, disabled: Validation.disable('CalculateFlag_Fld') }, Validation.setValidator('CalculateFlag_Fld')],
      ForDarai_Fld: [{ value: null, disabled: Validation.disable('ForDarai_Fld') }, Validation.setValidator('ForDarai_Fld')],
      KasrEmpJari_Fld: [{ value: null, disabled: Validation.disable('KasrEmpJari_Fld') }, Validation.setValidator('KasrEmpJari_Fld')],
      NoTax_Fld: [{ value: null, disabled: Validation.disable('NoTax_Fld') }, Validation.setValidator('NoTax_Fld')],
      NotCalculate_Fld: [{ value: null, disabled: Validation.disable('NotCalculate_Fld') }, Validation.setValidator('NotCalculate_Fld')],
      RId_Fld: [{ value: null, disabled: Validation.disable('RId_Fld') }, Validation.setValidator('RId_Fld')],
      Desc_Fld: [{ value: null, disabled: Validation.disable('Desc_Fld') }, Validation.setValidator('Desc_Fld')],
      PersonIDCollect_Fld: [null],
      IDCollect_Fld: [null],
      FormType:[{value: this.formType}]
    })
    var t =  this.calendar.getToday()
    this.form.controls.DateFirstPay_Fld.patchValue(t.year + '/' + t.month.toString().padStart(2,'0') + '/' + t.day.toString().padStart(2,'0'))
  }

  save() {
    if (this.form.invalid) return this.controlService.isSubmitted = true

    if (this.formType == 'Add') return this.post()

    if (this.formType == 'Edit') this.put()
  }

  close() {
    this.closed.emit()
  }

  changeSaving(NotPatch: boolean) {
    this.saveCode = this.form.controls.SaveCode_Fld.value
    this.saveCodeChange.emit(this.saveCode)
    this.service.getById('Saving', this.saveCode, 'View').subscribe((res: any) => {
      const data = res.Data
      if (!NotPatch)
        this.form.patchValue({ ForDarai_Fld: data.ForDarai_Fld, KasrEmpJari_Fld: data.KasrEmpJari_Fld, NoTax_Fld: data.NoTax_Fld })
      
      this.form.controls.EmployeePrice_Fld.setValidators([Validation.required()]) 
      this.form.controls.EmployeePrice_Fld.enable()

      if (data.SavingType_fld == true) 
      {
        this.form.controls.ManagerPrice_Fld.clearValidators()
        this.form.controls.ManagerPrice_Fld.disable()

        this.form.controls.EmployeePrice_Fld.clearValidators()
        this.form.controls.EmployeePrice_Fld.disable()

      }
      else
      {
        if (data.IsCopPrice_Fld == true) {
          this.form.controls.ManagerPrice_Fld.setValidators([Validation.required()]) 
          this.form.controls.ManagerPrice_Fld.enable()
          }
        else 
        {
          this.form.controls.ManagerPrice_Fld.setValue(null)
          this.form.controls.ManagerPrice_Fld.clearValidators()
          this.form.controls.ManagerPrice_Fld.disable()
        }
      }
    })
  }

  multiEdit: boolean = false
  async buildForm() {
    await this.getSaveCode()
    this.idList.length > 0 ? this.multiEdit = true : this.multiEdit = false
    if (this.personList.length > 0 || this.idList.length > 0) {
      this.setForm()
      this.multiEdit ? Object.keys(this.form.controls).forEach(a => this.changeCheckbox(false, a)) : null
      if (this.formType == 'Edit') this.form.controls.IDCollect_Fld.patchValue(this.idList)
    }
    else {
      if (this.formType != 'Add') {
        await this.getById()
        this.setForm()
        this.form.patchValue(this.data)
        this.saveCode = this.data.SaveCode_Fld
        this.changeSaving(true);
      }
      else {
        this.setForm()
        if (this.saveCode) {
          this.form.controls.SaveCode_Fld.patchValue(this.saveCode)
          this.form.controls.SaveCodeDesc_Fld.patchValue(this.saveCodeList.find(a => a.Id == this.saveCode).CodeDesc_Fld)
          this.data.SaveCodeDesc_Fld = this.form.controls.SaveCodeDesc_Fld.value
          this.changeSaving(false);
        }
      }
    }
    this.showForm = true
    setTimeout(() => {
      this.MyProp.nativeElement.scrollIntoView({ behavior: "smooth", block: "start" });    
    }, 250); 
  }

  fieldChange: string[] = []
  changeCheckbox(enabled: boolean, fieldName: string) {
    if (!this.formObj[fieldName]) return // || this.formObj[fieldName].type == 'date'
    if (this.formObj[fieldName].disableInput && this.multiEdit)
      this.formObj[fieldName].ishidden = true

    if (enabled && !this.formObj[fieldName].disableInput) {
      this.form.controls[fieldName].enable()
      this.fieldChange.push(fieldName)
    }
    else {
      this.form.controls[fieldName].disable()
      this.fieldChange = this.fieldChange.filter(a => a != fieldName)
    }
  }

  constructor(private calendar: NgbCalendarPersian,private controlService: ControlMessageService, private service: GridFormService, private formBuilder: UntypedFormBuilder) { }

  ngOnChanges(UpdatedValue: any): void { Object.keys(UpdatedValue).length >= 1 ? this.buildForm() : null }
}
