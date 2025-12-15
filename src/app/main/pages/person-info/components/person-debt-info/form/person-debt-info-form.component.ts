
import { Component, Output, EventEmitter, Input } from '@angular/core'
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms'
import { ControlMessageService } from 'src/app/main/main-body/common/custom-form/control-message/control-message.service'
import { GridFormService } from 'src/app/main/main-body/common/grid-form.service'
import { Validation } from 'src/app/main/main-body/common/custom-form/control-message/Validation'
import { Month_Fld, PID, Year_Fld } from 'src/app/main/pages/global-attr'
import { ToastrService } from 'ngx-toastr'
import { NgbCalendarPersian } from '@ng-bootstrap/ng-bootstrap'

const Controller = 'PersonDebtInfo'

@Component({
  selector: 'person-debt-info-form',
  templateUrl: './person-debt-info-form.component.html',
  styleUrls: ['./person-debt-info-form.component.scss'],
})

export class PersonDebtInfoFormComponent {

  @Output() done = new EventEmitter()
  @Output() closed = new EventEmitter()
  @Output() debtCodeChange = new EventEmitter()
  @Input() debtCode: number
  @Input() ID: number
  @Input() formType: string
  @Input() formObj: any
  @Input() PID: number
  @Input() personList: any[]
  @Input() idList: any[]
  @Input() selectedPersonelNF: any
  
  debtCodeList = []
  async getDebtCode() {
    return new Promise(resolve => {
      this.service.getSelect("Debt","false").toPromise().then((res: any) => {
        this.debtCodeList = res.Data
        return resolve(true)
      })
    })
  }

  clearCostCenter() {
    this.form.controls.CostCenter_Fld.patchValue(null)
    this.form.controls.CostCenterDesc_Fld.patchValue(null)
  }

  async getDebt() {
    return new Promise((resolve, reject) => {
      this.service.getById(Controller, this.data.DebtCode_Fld, 'View').toPromise().then((res: any) => {
        if (res) {
          this.form.patchValue(res.Data)
          resolve(true)
        }
        else {
          this.done.emit(false)
          reject()
        }
      })
    })
  }

  data: any = {}
  async getById() {
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

  async GetBeforeEdit() {
    return new Promise(resolve => {
      this.service.get(`${Controller}/GetBeforeEdit/${this.ID}`).subscribe((res: any) => {
        this.data = res.Data
        return resolve(true)
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
      DebtCodeDesc_Fld: [null],
      DebtCode_Fld: [{ value: null, disabled: Validation.disable('DebtCode_Fld') }, Validation.setValidator('DebtCode_Fld')],
      DebtPrice_Fld: [{ value: null, disabled: Validation.disable('DebtPrice_Fld') }, Validation.setValidator('DebtPrice_Fld')],
      FirstPrice_Fld: [{ value: null, disabled: Validation.disable('FirstPrice_Fld') }, Validation.setValidator('FirstPrice_Fld')],
      NextPrice_Fld: [{ value: null, disabled: Validation.disable('NextPrice_Fld') }, Validation.setValidator('NextPrice_Fld')],
      FullpartNumber_Fld: [{ value: null, disabled: Validation.disable('FullpartNumber_Fld') }, Validation.setValidator('FullpartNumber_Fld')],
      PartNumber_Fld: [{ value: null, disabled: Validation.disable('PartNumber_Fld') }, Validation.setValidator('PartNumber_Fld')],
      Remain_Fld: [{ value: null, disabled: Validation.disable('Remain_Fld') }, Validation.setValidator('Remain_Fld')],
      DebtNumber_Fld: [{ value: null, disabled: Validation.disable('DebtNumber_Fld') }, Validation.setValidator('DebtNumber_Fld')],
      DebtDate_Fld: [{ value: null, disabled: Validation.disable('DebtDate_Fld') }, Validation.setValidator('DebtDate_Fld')],
      StopCalculate_Fld: [{ value: null, disabled: Validation.disable('StopCalculate_Fld') }, Validation.setValidator('StopCalculate_Fld')],
      CalculateFlag_Fld: [{ value: null, disabled: Validation.disable('CalculateFlag_Fld') }, Validation.setValidator('CalculateFlag_Fld')],
      ContinueslyFlag_Fld: [{ value: null, disabled: Validation.disable('ContinueslyFlag_Fld') }, Validation.setValidator('ContinueslyFlag_Fld')],
      CalculatePrice_Fld: [{ value: null, disabled: Validation.disable('CalculatePrice_Fld') }, Validation.setValidator('CalculatePrice_Fld')],
      DebtPlaceDesc_Fld: [null],
      DebtPlace_Fld: [{ value: null, disabled: Validation.disable('DebtPlace_Fld') }, Validation.setValidator('DebtPlace_Fld')],
      Sarfasl: [{ value: null, disabled: Validation.disable('Sarfasl') }, Validation.setValidator('Sarfasl')],
      ForDarai_Fld: [{ value: null, disabled: Validation.disable('ForDarai_Fld') }, Validation.setValidator('ForDarai_Fld')],
      kn: [{ value: null, disabled: Validation.disable('kn') }, Validation.setValidator('kn')],
      Baz_Fld: [{ value: null, disabled: Validation.disable('Baz_Fld') }, Validation.setValidator('Baz_Fld')],
      NotCalculate_Fld: [{ value: null, disabled: Validation.disable('NotCalculate_Fld') }, Validation.setValidator('NotCalculate_Fld')],
      Bazneshastegi_Fld: [{ value: null, disabled: Validation.disable('Bazneshastegi_Fld') }, Validation.setValidator('Bazneshastegi_Fld')],
      BazneshastegiType_Fld: [{ value: null, disabled: Validation.disable('BazneshastegiType_Fld') }, Validation.setValidator('BazneshastegiType_Fld')],
      BazneshastegiTypeDesc_Fld: [null],
      NoTax_Fld: [{ value: null, disabled: Validation.disable('NoTax_Fld') }, Validation.setValidator('NoTax_Fld')],
      NoTaxType_Fld: [{ value: null, disabled: Validation.disable('NoTaxType_Fld') }, Validation.setValidator('NoTaxType_Fld')],
      NoTaxTypeDesc_Fld: [null],
      NoTaxPrice_Fld: [{ value: null, disabled: Validation.disable('NoTaxPrice_Fld') }, Validation.setValidator('NoTaxPrice_Fld')],
      KasrDigit_Fld: [{ value: null, disabled: Validation.disable('KasrDigit_Fld') }, Validation.setValidator('KasrDigit_Fld')],
      NoDigit_Fld: [{ value: null, disabled: Validation.disable('NoDigit_Fld') }, Validation.setValidator('NoDigit_Fld')],
      CalculatePriceJari_Fld: [{ value: null, disabled: Validation.disable('CalculatePriceJari_Fld') }, Validation.setValidator('CalculatePriceJari_Fld')],
      CalculatePriceDaraei_Fld: [{ value: null, disabled: Validation.disable('CalculatePriceDaraei_Fld') }, Validation.setValidator('CalculatePriceDaraei_Fld')],
      KasrOrder_Fld: [{ value: null, disabled: Validation.disable('KasrOrder_Fld') }, Validation.setValidator('KasrOrder_Fld')],
      FirstMonth_Fld: [{ value: null, disabled: Validation.disable('FirstMonth_Fld') }, Validation.setValidator('FirstMonth_Fld')],
      Zamen_Fld: [{ value: null, disabled: Validation.disable('Zamen_Fld') }, Validation.setValidator('Zamen_Fld')],
      NotMainDebt_Fld: [{ value: null, disabled: Validation.disable('NotMainDebt_Fld') }, Validation.setValidator('NotMainDebt_Fld')],
      CostCenterDesc_Fld: [null],
      CostCenter_Fld: [{ value: null, disabled: Validation.disable('CostCenter_Fld') }, Validation.setValidator('CostCenter_Fld')],
      Tax_Fld: [{ value: null, disabled: Validation.disable('Tax_Fld') }, Validation.setValidator('Tax_Fld')],
      TaxYear_Fld: [{ value: null, disabled: Validation.disable('TaxYear_Fld') }, Validation.setValidator('TaxYear_Fld')],
      ParentID_Fld: [{ value: null, disabled: Validation.disable('ParentID_Fld') }, Validation.setValidator('ParentID_Fld')],
      CalcDebt_Fld: [{ value: null, disabled: Validation.disable('CalcDebt_Fld') }, Validation.setValidator('CalcDebt_Fld')],
      DebtDay_Fld: [{ value: null, disabled: Validation.disable('DebtDay_Fld') }, Validation.setValidator('DebtDay_Fld')],
      DebtHour_Fld: [{ value: null, disabled: Validation.disable('DebtHour_Fld') }, Validation.setValidator('DebtHour_Fld')],
      DebtMin_Fld: [{ value: null, disabled: Validation.disable('DebtMin_Fld') }, Validation.setValidator('DebtMin_Fld')],
      CalcDebtChg_Fld: [{ value: null, disabled: Validation.disable('CalcDebtChg_Fld') }, Validation.setValidator('CalcDebtChg_Fld')],
      DailyID_Fld: [{ value: null, disabled: Validation.disable('DailyID_Fld') }, Validation.setValidator('DailyID_Fld')],
      RID_Fld: [{ value: null, disabled: Validation.disable('RID_Fld') }, Validation.setValidator('RID_Fld')],
      PrevID_Fld: [{ value: null, disabled: Validation.disable('PrevID_Fld') }, Validation.setValidator('PrevID_Fld')],
      EffectiveYear_Fld: [{ value: null, disabled: Validation.disable('EffectiveYear_Fld') }, Validation.setValidator('EffectiveYear_Fld')],
      EffectiveMonth_Fld: [{ value: null, disabled: Validation.disable('EffectiveMonth_Fld') }, Validation.setValidator('EffectiveMonth_Fld')],
      PersonIDCollect_Fld: [null],
      IDCollect_Fld: [null],
      FormType:[{value: this.formType}]
    })
    var t =  this.calendar.getToday()
    this.form.controls.DebtDate_Fld.patchValue(t.year + '/' + t.month.toString().padStart(2,'0') + '/' + t.day.toString().padStart(2,'0'))
  }

  async changeDebt() {
    this.debtCode = this.form.controls.DebtCode_Fld.value
    this.debtCodeChange.emit(this.debtCode)
    this.service.getById('Debt', this.debtCode, 'View').subscribe((res: any) => {
      const data = res.Data
      this.form.patchValue({ Baz_Fld: data.Baz_Fld, ContinueslyFlag_Fld: data.ContinueslyFlag_Fld, NoTax_Fld: data.NoTax_Fld,  NoTaxType_Fld: data.NoTaxType_Fld,  NoTaxTypeDesc_Fld: data.NoTaxTypeDesc_Fld, Bazneshastegi_Fld: data.Bazneshastegi_Fld, FirstMonth_Fld: data.FirstMonth_Fld,
        Tax_Fld: data.Tax_Fld, CalcDebt_Fld: data.CalcDebt_Fld, })
      this.data.NoTaxTypeDesc_Fld = this.form.controls.NoTaxTypeDesc_Fld.value
    })
  }

  save() {
    if (this.form.invalid) return this.controlService.isSubmitted = true

    if (this.formType == 'Add') return this.post()

    if (this.formType == 'Edit') this.put()
  }

  close() {
    this.closed.emit()
  }

  showCostCenterModal: boolean = false
  onShowCostCenterModal() {
    this.showCostCenterModal = true
  }

  closedCostCenterModal() { this.showCostCenterModal = false }

  nodeSelected(node) {
    if (node.Id) {
      this.form.controls.CostCenter_Fld.patchValue(node.Id)
      this.form.controls.CostCenterDesc_Fld.patchValue(node.name)
    }
    this.showCostCenterModal = false
  }

  miniCalc = new MiniCalc()
  playerName : any
  onMiniCalc(Type: number,event: any) {
    
    if (this.formType == 'Add' || (Number(this.form.controls.DebtPrice_Fld.value) == Number(this.form.controls.Remain_Fld.value) && this.formType == 'Edit'))
    {
      if (Type == 1 )
      {
        this.form.controls.DebtPrice_Fld.value && event.target.value && this.form.controls.DebtPrice_Fld.value != 0 && Number(event.target.value) != 0 ? this.form.controls.FirstPrice_Fld.patchValue(Math.floor(Number(this.form.controls.DebtPrice_Fld.value)/Number(event.target.value.replace(',','')))) : null
        this.form.controls.FirstPrice_Fld.value ? this.form.controls.NextPrice_Fld.patchValue(this.form.controls.FirstPrice_Fld.value) : null
        this.form.controls.DebtPrice_Fld.value ? this.form.controls.Remain_Fld.patchValue(this.form.controls.DebtPrice_Fld.value) : null
        this.form.controls.PartNumber_Fld.patchValue(0)
      }
      if (Type == 2)
      {
        if (event.target.value && this.form.controls.FirstPrice_Fld.value && Number(event.target.value.replace(',','')) != 0)
        { 
          let fPrice = Math.floor((Number(this.form.controls.DebtPrice_Fld.value)- Number(this.form.controls.FirstPrice_Fld.value))/ (Number(this.form.controls.FullpartNumber_Fld.value)-1)) 
          if (fPrice < 0) 
            {
              fPrice = 0
              this.form.controls.Remain_Fld.patchValue(0)
            }
          this.form.controls.NextPrice_Fld.patchValue(fPrice) 
        }
      }
    }
  }

  multiEdit: boolean = false
  async buildForm() {
    await this.getDebtCode()
    this.idList.length > 0 ? this.multiEdit = true : this.multiEdit = false
    if (this.personList.length > 0 || this.idList.length > 0) {
      this.fieldChange = []
      this.setForm()
      this.multiEdit ? Object.keys(this.form.controls).forEach(a => this.changeCheckbox(false, a)) : null
      if (this.formType == 'Edit') this.form.controls.IDCollect_Fld.patchValue(this.idList)
    }
    else {
      if (this.formType != 'Add') {
        await this.getById()
        this.setForm()
        this.form.patchValue(this.data)
        this.debtCode = this.data.DebtCode_Fld
      }
      else {
        this.setForm()
        if (this.debtCode) {
          this.form.controls.DebtCode_Fld.patchValue(this.debtCode)
          this.form.controls.DebtCodeDesc_Fld.patchValue(this.debtCodeList.find(a => a.Id == this.debtCode).CodeDesc_Fld)
          this.data.DebtCodeDesc_Fld = this.form.controls.DebtCodeDesc_Fld.value
          await this.changeDebt();
        }
        await this.setCostCenter()
        this.miniCalc = new MiniCalc()
      }
    }
    this.showForm = true
    setTimeout(() => {
      this.service.scrollToElement('form')
    }, 200); 
  }

  async setCostCenter() {
    return await new Promise((resolve, reject) => {
      this.service.getById('Person', this.PID, 'View').toPromise().then((res: any) => {
        if (res) {
          this.form.controls.CostCenter_Fld.patchValue(res.Data.CostCenterID)
          this.form.controls.CostCenterDesc_Fld.patchValue(res.Data.CostCenterIDDesc)
          resolve(true)
        }
        else {
          this.done.emit(false)
          reject()
        }
      })
    })
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


  constructor(private calendar: NgbCalendarPersian, private controlService: ControlMessageService, private service: GridFormService, private formBuilder: UntypedFormBuilder, private toastr: ToastrService) { }

  ngOnChanges(UpdatedValue: any): void { Object.keys(UpdatedValue).length >= 1 ? this.buildForm() : null }

}

class MiniCalc {
  FieldChanged_Fld: 'FullpartNumber_Fld' | 'DebtPrice_Fld' | 'PartNumber_Fld' | 'FirstPrice_Fld' | 'NextPrice_Fld' = null
  DebtPrice_Fld: number = null
  FirstPrice_Fld: number = null
  NextPrice_Fld: number = null
  FullpartNumber_Fld: number = null
  PartNumber_Fld: number = null
  Remain_Fld: number = null
  ContinueslyFlag_Fld: boolean = null
}