import { Component, Output, EventEmitter, Input } from '@angular/core'
import { FormBuilder, FormGroup } from '@angular/forms'
import { ControlMessageService } from 'src/app/main/main-body/common/custom-form/control-message/control-message.service'
import { GridFormService } from 'src/app/main/main-body/common/grid-form.service'
import { Validation } from 'src/app/main/main-body/common/custom-form/control-message/Validation'
import { ToastrService } from 'ngx-toastr'
import { CustomGridOption } from 'src/app/main/main-body/common/custom-ag-grid/interfaces/ag-grid-option.interface'

@Component({
  selector: 'person-form',
  templateUrl: './person-form.component.html',
  styleUrls: ['./person-form.component.scss']
})
export class PersonFormComponent {

  @Output() done = new EventEmitter()
  @Output() closed = new EventEmitter()
  @Input() ID: number
  @Input() formType: string
  @Input() formObj: any
  @Input() controller: string
  @Input() movPerson: any
  @Input() selectedPersonelNF: any

  getAttr(): Promise<any> {
    return new Promise(resolve => {
      if (this.ID)
        this.service.getAttrById(this.controller, this.ID).subscribe((res: any) => {
          this.formObj = res.Data.EntityAttribute
          return resolve(true)
        })
      else
        this.service.getAttr(this.controller).subscribe((res: any) => {
          this.formObj = res.Data.EntityAttribute
          return resolve(true)
        })
    })
  }

  data: any = {}
  getById() {
    let promise = new Promise((resolve, reject) => {
      this.service.get(`${this.controller}/${this.ID}/${this.formType == 'Edit'}`).toPromise().then((res: any) => {
        if (res && res.Data) {
          this.data = res.Data
          resolve(true)
        }
        else {
          this.done.emit(false)
          reject()
        }
      }).catch(e => e)
    })
    return promise
  }

  post() { this.service.post(`${this.controller}/Create`, this.form.getRawValue()).subscribe((res: any) => { res && res.IsSuccess ? this.done.emit(res.Data) : null })}

  put() { this.service.post(`${this.controller}/Update`, this.form.getRawValue()).subscribe((res: any) => { res && res.IsSuccess ? this.done.emit(res.Data) : null })}

  form: FormGroup
  showForm: boolean = false
  setForm() {
    Validation.form = this.formObj
    const addType: boolean = this.formType == 'Add'
    this.form = this.formBuilder.group({
      Id: [0],
      PID: [{ value: null, disabled: Validation.disable('PID') }, Validation.setValidator('PID')],
      NationalNO: [{ value: null, disabled: Validation.disable('NationalNO') }, Validation.setValidator('NationalNO')],
      ParvandehNo: [{ value: null, disabled: Validation.disable('ParvandehNo') }, Validation.setValidator('ParvandehNo')],
      Mostakhdemi: [{ value: null, disabled: Validation.disable('Mostakhdemi') }, Validation.setValidator('Mostakhdemi')],
      SalaryCode: [{ value: null, disabled: Validation.disable('SalaryCode') }, Validation.setValidator('SalaryCode')],
      Kid: [{ value: null, disabled: Validation.disable('Kid') }, Validation.setValidator('Kid')],
      Name: [{ value: null, disabled: Validation.disable('Name') }, Validation.setValidator('Name')],
      Family: [{ value: null, disabled: Validation.disable('Family') }, Validation.setValidator('Family')],
      EName: [{ value: null, disabled: Validation.disable('EName') }, Validation.setValidator('EName')],
      EFamily: [{ value: null, disabled: Validation.disable('EFamily') }, Validation.setValidator('EFamily')],
      FatherName: [{ value: null, disabled: Validation.disable('FatherName') }, Validation.setValidator('FatherName')],
      GenderIDDesc: [null],
      GenderID: [{ value: null, disabled: Validation.disable('GenderID') }, Validation.setValidator('GenderID')],
      CertificateNo: [{ value: null, disabled: Validation.disable('CertificateNo') }, Validation.setValidator('CertificateNo')],
      CertificateSerial: [{ value: null, disabled: Validation.disable('CertificateSerial') }, Validation.setValidator('CertificateSerial')],
      BirthDate: [{ value: null, disabled: Validation.disable('BirthDate') }, Validation.setValidator('BirthDate')],
      BirthCountryIDDesc: [null],
      BirthCountryID: [{ value: null, disabled: Validation.disable('BirthCountryID') }, Validation.setValidator('BirthCountryID')],
      BirthOstanIDDesc: [null],
      BirthOstanID: [{ value: null, disabled: Validation.disable('BirthOstanID') }, Validation.setValidator('BirthOstanID')],
      BirthCityIDDesc: [null],
      BirthCityID: [{ value: null, disabled: Validation.disable('BirthCityID') }, Validation.setValidator('BirthCityID')],
      RegisterPlace_CountryIDDesc: [null],
      RegisterPlace_CountryID: [{ value: null, disabled: Validation.disable('RegisterPlace_CountryID') }, Validation.setValidator('RegisterPlace_CountryID')],
      RegisterPlace_StateIDDesc: [null],
      RegisterPlace_StateID: [{ value: null, disabled: Validation.disable('RegisterPlace_StateID') }, Validation.setValidator('RegisterPlace_StateID')],
      RegisterPlace_CityIDDesc: [null],
      RegisterPlace_CityID: [{ value: null, disabled: Validation.disable('RegisterPlace_CityID') }, Validation.setValidator('RegisterPlace_CityID')],
      MarriedID: [{ value: null, disabled: Validation.disable('MarriedID') }, Validation.setValidator('MarriedID')],
      MarriedIDDesc: [null],
      EmpIDDesc: [null],
      Sar: [{ value: null, disabled: Validation.disable('Sar') }, Validation.setValidator('Sar')],
      DateSar: [{ value: null, disabled: addType || Validation.disable('DateSar') }, Validation.setValidator('DateSar')],
      Children: [{ value: null, disabled: Validation.disable('Children') }, Validation.setValidator('Children')],
      ChildrenMashmool: [{ value: null, disabled: Validation.disable('ChildrenMashmool') }, Validation.setValidator('ChildrenMashmool')],
      InSupports: [{ value: null, disabled: Validation.disable('InSupports') }, Validation.setValidator('InSupports')],
      Age: [{ value: null, disabled: Validation.disable('Age') }, Validation.setValidator('Age')],
      Morakhasi: [{ value: null, disabled: Validation.disable('Morakhasi') }, Validation.setValidator('Morakhasi')],
      MorakhasiDate: [{ value: null, disabled: addType || Validation.disable('MorakhasiDate') }, Validation.setValidator('MorakhasiDate')],
      EnlistIDDesc: [null],
      EnlistID: [{ value: null, disabled: Validation.disable('EnlistID') }, Validation.setValidator('EnlistID')],
      IsarStatusID: [{ value: null, disabled: Validation.disable('IsarStatusID') }, Validation.setValidator('IsarStatusID')],
      IsarRelateID: [{ value: null, disabled: Validation.disable('IsarRelateID') }, Validation.setValidator('IsarRelateID')],
      JanbazPercent: [{ value: null, disabled: Validation.disable('JanbazPercent') }, Validation.setValidator('JanbazPercent')],
      RazmandehPeriodMon: [{ value: null, disabled: Validation.disable('RazmandehPeriodMon') }, Validation.setValidator('RazmandehPeriodMon')],
      RazmandehPeriodDay: [{ value: null, disabled: Validation.disable('RazmandehPeriodDay') }, Validation.setValidator('RazmandehPeriodDay')],
      RazmandehPeriodMonTotal: [{ value: null, disabled: Validation.disable('RazmandehPeriodMonTotal') }, Validation.setValidator('RazmandehPeriodMonTotal')],
      RazmandehPeriodDayTotal: [{ value: null, disabled: Validation.disable('RazmandehPeriodDayTotal') }, Validation.setValidator('RazmandehPeriodDayTotal')],
      AzadehPeriodMon: [{ value: null, disabled: Validation.disable('AzadehPeriodMon') }, Validation.setValidator('AzadehPeriodMon')],
      AzadehPeriodDay: [{ value: null, disabled: Validation.disable('AzadehPeriodDay') }, Validation.setValidator('AzadehPeriodDay')],
      Type_cutpayDesc: [null],
      Type_cutpay: [{ value: null, disabled: addType || Validation.disable('Type_cutpay') }, Validation.setValidator('Type_cutpay')],
      CutPayToDate: [{ value: null, disabled: addType || Validation.disable('CutPayToDate') }, Validation.setValidator('CutPayToDate')],
      NoEzafTreshold: [{ value: null, disabled: Validation.disable('NoEzafTreshold') }, Validation.setValidator('NoEzafTreshold')],
      EntranceDate: [{ value: null, disabled: Validation.disable('EntranceDate') }, Validation.setValidator('EntranceDate')],
      CutPayDateAtOffice: [{ value: null, disabled: Validation.disable('CutPayDateAtOffice') }, Validation.setValidator('CutPayDateAtOffice')],
      ChgEmpDate: [{ value: null, disabled: Validation.disable('ChgEmpDate') }, Validation.setValidator('ChgEmpDate')],
      WorkHistoryNotRasmi: [{ value: null, disabled: Validation.disable('WorkHistoryNotRasmi') }, Validation.setValidator('WorkHistoryNotRasmi')],
      EnListDate: [{ value: null, disabled: Validation.disable('EnListDate') }, Validation.setValidator('EnListDate')],
      BimehNo: [{ value: null, disabled: Validation.disable('BimehNo') }, Validation.setValidator('BimehNo')],
      PasCode: [{ value: null, disabled: Validation.disable('PasCode') }, Validation.setValidator('PasCode')],
      Job_CodeIDDesc: [null],
      Job_CodeID: [{ value: null, disabled: Validation.disable('Job_CodeID') }, Validation.setValidator('Job_CodeID')],
      MorakhasiDay: [{ value: null, disabled: Validation.disable('MorakhasiDay') }, Validation.setValidator('MorakhasiDay')],
      MorakhasiHour: [{ value: null, disabled: Validation.disable('MorakhasiHour') }, Validation.setValidator('MorakhasiHour')],
      Occupation: [{ value: null, disabled: Validation.disable('Occupation') }, Validation.setValidator('Occupation')],
      ConsortNationalCode: [{ value: null, disabled: Validation.disable('ConsortNationalCode') }, Validation.setValidator('ConsortNationalCode')],
      HireTypeHghIDDesc: [null],
      HireTypeHghID: [{ value: null, disabled: Validation.disable('HireTypeHghID') }, Validation.setValidator('HireTypeHghID')],
      PayCodeIDDesc: [null],
      PayCodeID: [{ value: null, disabled: Validation.disable('PayCodeID') }, Validation.setValidator('PayCodeID')],
      CostCenterIDDesc: [null],
      CostCenterID: [{ value: null, disabled: Validation.disable('CostCenterID') }, Validation.setValidator('CostCenterID')],
      NewCostCenterIDDesc: [null],
      NewCostCenterID: [{ value: null, disabled: Validation.disable('NewCostCenterID') }, Validation.setValidator('NewCostCenterID')],
      AccountNumber: [{ value: null, disabled: Validation.disable('AccountNumber') }, Validation.setValidator('AccountNumber')],
      NationalAccountNumber: [{ value: null, disabled: Validation.disable('NationalAccountNumber') }, Validation.setValidator('NationalAccountNumber')],
      ShabaAccountNumber: [{ value: null, disabled: Validation.disable('ShabaAccountNumber') }, Validation.setValidator('ShabaAccountNumber')],
      ShabaNew: [{ value: null, disabled: Validation.disable('ShabaNew') }, Validation.setValidator('ShabaNew')],
      Bank1IDDesc: [null],
      Bank1ID: [{ value: null, disabled: Validation.disable('Bank1ID') }, Validation.setValidator('Bank1ID')],
      Bank2IDDesc: [null],
      Bank2ID: [{ value: null, disabled: Validation.disable('Bank2ID') }, Validation.setValidator('Bank2ID')],
      Bank3IDDesc: [null],
      Bank3ID: [{ value: null, disabled: Validation.disable('Bank3ID') }, Validation.setValidator('Bank3ID')],
      Bank4IDDesc: [null],
      Bank4ID: [{ value: null, disabled: Validation.disable('Bank4ID') }, Validation.setValidator('Bank4ID')],
      Shaba1: [{ value: null, disabled: Validation.disable('Shaba1') }, Validation.setValidator('Shaba1')],
      Shaba2: [{ value: null, disabled: Validation.disable('Shaba2') }, Validation.setValidator('Shaba2')],
      Shaba3: [{ value: null, disabled: Validation.disable('Shaba3') }, Validation.setValidator('Shaba3')],
      Shaba4: [{ value: null, disabled: Validation.disable('Shaba4') }, Validation.setValidator('Shaba4')],
      ActiveAcntIDDesc: [null],
      ActiveAcntID: [{ value: null, disabled: Validation.disable('ActiveAcntID') }, Validation.setValidator('ActiveAcntID')],
      BankCtrl: [{ value: null, disabled: Validation.disable('BankCtrl') }, Validation.setValidator('BankCtrl')],
      BaseInsureDesc: [null],
      BaseInsure: [{ value: null, disabled: Validation.disable('BaseInsure') }, Validation.setValidator('BaseInsure')],
      FreeOfTaxTypeIDDesc: [null],
      FreeOfTaxTypeID: [{ value: null, disabled: Validation.disable('FreeOfTaxTypeID') }, Validation.setValidator('FreeOfTaxTypeID')],
      Nowitness: [{ value: null, disabled: Validation.disable('Nowitness') }, Validation.setValidator('Nowitness')],
      NoCheckLoan: [{ value: null, disabled: Validation.disable('NoCheckLoan') }, Validation.setValidator('NoCheckLoan')],
      SanadHgh: [{ value: null, disabled: Validation.disable('SanadHgh') }, Validation.setValidator('SanadHgh')],
      BazBankCode: [{ value: null, disabled: Validation.disable('BazBankCode') }, Validation.setValidator('BazBankCode')],
      BazBankDesc: [{ value: null, disabled: Validation.disable('BazBankDesc') }, Validation.setValidator('BazBankDesc')],
      BazAccountNumber: [{ value: null, disabled: Validation.disable('BazAccountNumber') }, Validation.setValidator('BazAccountNumber')],
      BazDate: [{ value: null, disabled: Validation.disable('BazDate') }, Validation.setValidator('BazDate')],
      AzmayeshDate: [{ value: null, disabled: Validation.disable('AzmayeshDate') }, Validation.setValidator('AzmayeshDate')],
      DieDate: [{ value: null, disabled: Validation.disable('DieDate') }, Validation.setValidator('DieDate')],
      KolDaftar: [{ value: null, disabled: Validation.disable('KolDaftar') }, Validation.setValidator('KolDaftar')],
      HghRate: [{ value: null, disabled: Validation.disable('HghRate') }, Validation.setValidator('HghRate')],
      HghRadif: [{ value: null, disabled: Validation.disable('HghRadif') }, Validation.setValidator('HghRadif')],
      HghNesbatDesc: [null],
      HghNesbat: [{ value: null, disabled: Validation.disable('HghNesbat') }, Validation.setValidator('HghNesbat')],
      DiePIDDesc: [null],
      DiePID: [{ value: null, disabled: Validation.disable('DiePID') }, Validation.setValidator('DiePID')],
      Mobile: [{ value: null, disabled: Validation.disable('Mobile') }, Validation.setValidator('Mobile')],
      HomeAddress: [{ value: null, disabled: Validation.disable('HomeAddress') }, Validation.setValidator('HomeAddress')],
      HomeTel: [{ value: null, disabled: Validation.disable('HomeTel') }, Validation.setValidator('HomeTel')],
      PostCode: [{ value: null, disabled: Validation.disable('PostCode') }, Validation.setValidator('PostCode')],
      KarAddress: [{ value: null, disabled: Validation.disable('KarAddress') }, Validation.setValidator('KarAddress')],
      KarTel: [{ value: null, disabled: Validation.disable('KarTel') }, Validation.setValidator('KarTel')],
      Message: [{ value: null, disabled: Validation.disable('Message') }, Validation.setValidator('Message')],
      IsPayroll: [{ value: true, disabled: Validation.disable('IsPayroll') }, Validation.setValidator('IsPayroll')],
      BimehTypeIDDesc: [null],
      BimehTypeID: [{ value: true, disabled: Validation.disable('BimehTypeID') }, Validation.setValidator('BimehTypeID')],
      TaxAgentFrom_Fld: [{ value: true, disabled: Validation.disable('TaxAgentFrom_Fld') }, Validation.setValidator('TaxAgentFrom_Fld')],
      F1AgentFrom_Fld: [{ value: true, disabled: Validation.disable('F1AgentFrom_Fld') }, Validation.setValidator('F1AgentFrom_Fld')],
      IsTadris: [{ value: true, disabled: Validation.disable('IsTadris') }, Validation.setValidator('IsTadris')],
      IsBaz: [{ value: true, disabled: Validation.disable('IsBaz') }, Validation.setValidator('IsBaz')],
      IsMov: [{ value: true, disabled: Validation.disable('IsMov') }, Validation.setValidator('IsMov')],
      TaxBaseTableDesc_Fld: [null],
      TaxBaseTable_Fld: [{ value: true, disabled: Validation.disable('TaxBaseTable_Fld') }, Validation.setValidator('TaxBaseTable_Fld')],
      HireGroupDesc_Fld: [null],
      HireGroup_Fld: [{ value: true, disabled: Validation.disable('HireGroup_Fld') }, Validation.setValidator('HireGroup_Fld')],
      Email: [{ value: true, disabled: Validation.disable('Email') }, Validation.setValidator('Email')],

      FormType:[{value: this.formType}]
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

  birthOstanUrl: string
  birthCityUrl: string
  changeBirthCountry(id) {
    this.birthOstanUrl = `city/${id}`
    this.form.controls.BirthOstanID.patchValue(null)
    this.form.controls.BirthOstanIDDesc.patchValue(null)
    this.form.controls.BirthCityID.patchValue(null)
    this.form.controls.BirthCityIDDesc.patchValue(null)
  }

  changeBirthOstan(id) {
    this.birthCityUrl = `city/${id}`
    this.form.controls.BirthCityID.patchValue(null)
    this.form.controls.BirthCityIDDesc.patchValue(null)
  }

  registerOstanUrl: string = null
  registerCityUrl: string
  changeRegisterCountry(id) {
    this.registerOstanUrl = `city/${id}`
    this.form.controls.RegisterPlace_StateID.patchValue(null)
    this.form.controls.RegisterPlace_StateIDDesc.patchValue(null)
    this.form.controls.RegisterPlace_CityID.patchValue(null)
    this.form.controls.RegisterPlace_CityIDDesc.patchValue(null)
  }

  changeRegisterOstan(id) {
    this.registerCityUrl = `city/${id}`
    this.form.controls.RegisterPlace_CityID.patchValue(null)
    this.form.controls.RegisterPlace_CityIDDesc.patchValue(null)
  }

  showCostCenterModal: boolean = false
  activeCostCenterTreeName: string
  onShowCostCenterModal(fieldName) {
    this.activeCostCenterTreeName = fieldName
    this.showCostCenterModal = true
  }

  nodeSelected(node) {
    this.form.controls.CostCenterID.patchValue(node.Id)
    this.form.controls.CostCenterIDDesc.patchValue(node.name)
    this.showCostCenterModal = false
  }

  changeSar(bool) { bool ? this.form.controls.DateSar.enable() : this.form.controls.DateSar.disable() }

  closedCostCenterModal() { this.showCostCenterModal = false }

  dieArray = []
  IsarRelateList: any
  IsarStatusList: any

  async buildForm() {
    this.formObj = null
    this.data = {}
    if (this.formType != 'Add') {
      await this.getById()
      await this.getAttr()
      this.setForm()
      this.birthOstanUrl = `city/${this.data.BirthCountryID}`
      this.birthCityUrl = `city/${this.data.BirthOstanID}`
      this.registerOstanUrl = `city/${this.data.RegisterPlace_CountryID}`
      this.registerCityUrl = `city/${this.data.RegisterPlace_StateID}`
      this.form.patchValue(this.data)
      this.changeSar(this.form.controls.Sar.value)
      this.showForm = true
      setTimeout(() => {
        this.service.scrollToElement('form')
      }, 200); 
    }
    else {
      await this.getAttr()
      this.setForm()
      this.form.reset()
      this.form.controls.Id.patchValue(0)
      this.form.controls.FormType.patchValue(this.formType)
      this.showForm = true
      setTimeout(() => {
        this.service.scrollToElement('form')
      }, 200); 
    }
    if (this.movPerson) {
      this.data.DiePIDDesc = this.movPerson.name
      this.data.DiePID = this.movPerson.id
      this.dieArray = [{ id: this.data.DiePID, CodeDesc_Fld: this.data.DiePIDDesc }]
      this.form.controls.DiePID.patchValue(this.data.DiePID)
    }

    this.service.getCombo(`OtherDetail/3978`).toPromise().then((res: any) => {
      this.IsarStatusList = res.Data
      if (this.formType != 'Add')
        this.form.controls.IsarStatusID.value ? this.form.controls.IsarStatusID.patchValue(this.form.controls.IsarStatusID.value.split(',').map(i => Number(i))) : null 
    })
    this.service.getCombo(`OtherDetail/3979`).toPromise().then((res: any) => {
      this.IsarRelateList = res.Data
      if (this.formType != 'Add')
        this.form.controls.IsarRelateID.value ? this.form.controls.IsarRelateID.patchValue(this.form.controls.IsarRelateID.value.split(',').map(i => Number(i))) : null 
    })
  }

  clearCostCenter() {
    this.form.controls.CostCenterID.patchValue(null)
    this.form.controls.CostCenterIDDesc.patchValue(null)
  }

  constructor(private controlService: ControlMessageService, private service: GridFormService, private formBuilder: FormBuilder, private toastr: ToastrService) { }

  ngOnChanges(UpdatedValue: string): void { this.buildForm() }

}
