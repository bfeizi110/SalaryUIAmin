
import { Component, Output, EventEmitter, Input } from '@angular/core'
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms'
import { ControlMessageService } from 'src/app/main/main-body/common/custom-form/control-message/control-message.service'
import { GridFormService } from 'src/app/main/main-body/common/grid-form.service'
import { Validation } from 'src/app/main/main-body/common/custom-form/control-message/Validation'
import { ToastrService } from 'ngx-toastr'
import { NgbCalendarPersian } from '@ng-bootstrap/ng-bootstrap'
import { ModalOptions } from 'src/app/main/main-body/common/custom-modal/modal-options.interface'
import { CustomGridOption } from 'src/app/main/main-body/common/custom-ag-grid/interfaces/ag-grid-option.interface'
import { resolve } from 'dns'

const Controller = 'PersonHghWitness'

@Component({
  selector: 'person-hghwitness-form',
  templateUrl: './person-hghwitness-form.component.html',
  styleUrls: ['./person-hghwitness-form.component.scss'],
})

export class PersonHghWitnessFormComponent {

  @Output() done = new EventEmitter()
  @Output() closed = new EventEmitter()
  @Output() HghWitnessTypeChange = new EventEmitter()
  @Input() HghWitnessType: number
  @Input() ID: number
  @Input() formType: string
  @Input() formObj: any
  @Input() PID: number
  @Input() personList: any[]
  @Input() idList: any[]
  @Input() selectedPersonelNF: any
  
  showPerson: boolean = false
  onShowPerson(){
    this.showPerson = true
  }
  onSelectPersonnel(data) {
    new Promise(resolve => {
      this.service.get(`Person/GetFieldValue/${data.Id}/FatherName`).toPromise().then((res: any) => {
        this.form.controls.ZamenFatherName_Fld.setValue(res.Data)
        return resolve(true)
      })
    })
    new Promise(resolve => {
      this.service.get(`Person/GetFieldValue/${data.Id}/NationalNo`).toPromise().then((res: any) => {
        this.form.controls.ZamenNationalNO_Fld.setValue(res.Data)
        return resolve(true)
      })
    })
    this.form.controls.NameFamily_Fld.setValue(`${data.Name} ${data.Family}`)
    this.form.controls.PersonIDWitness_Fld.setValue(data.Id)
  }

  showModal:boolean = false
  onPrintView(){
    this.getSelectModal()
  }

  HghWitnessTypeList = []
  getHghWitnessType() {
    return new Promise(resolve => {
      this.service.getCombo("*OtherDetail/GetCombo/10087").toPromise().then((res: any) => {
        this.HghWitnessTypeList = res.Data
        return resolve(true)
      })
    })
  }
  
  HghWitnessPrice: any
  getHghWitnessPrice() {
    return new Promise(resolve => {
      this.service.getByIdSimple(Controller + "/GetPersonPrice", this.PID).toPromise().then((res: any) => {
        this.HghWitnessPrice = res.Data
        this.form.controls.LastHokmPrice_Fld.patchValue(this.HghWitnessPrice.LastHokmPrice_Fld)
        this.form.controls.LastPurePrice_Fld.patchValue(this.HghWitnessPrice.LastPurePrice_Fld)
        this.form.controls.LastPureYear_Fld.patchValue(this.HghWitnessPrice.LastPureYear_Fld)
        this.form.controls.LastPureMonth_Fld.patchValue(this.HghWitnessPrice.LastPureMonth_Fld)
        this.form.controls.TopDebtPrice_Fld.patchValue(this.HghWitnessPrice.TopDebtPrice_Fld)
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
      PersonID_Fld: [this.PID],
      HghWitnessTypeDesc_Fld: [null],
      HghWitnessType_Fld: [{ value: null, disabled: Validation.disable('HghWitnessType_Fld') }, Validation.setValidator('HghWitnessType_Fld')],
      RequestDate_Fld: [{ value: null, disabled: Validation.disable('RequestDate_Fld') }, Validation.setValidator('RequestDate_Fld')],
      LetterNo_Fld: [{ value: null, disabled: Validation.disable('LetterNo_Fld') }, Validation.setValidator('LetterNo_Fld')],
      LastHokmPrice_Fld: [{ value: null, disabled: Validation.disable('LastHokmPrice_Fld') }, Validation.setValidator('LastHokmPrice_Fld')],
      LastPurePrice_Fld: [{ value: null, disabled: Validation.disable('LastPurePrice_Fld') }, Validation.setValidator('LastPurePrice_Fld')],
      LastPureYear_Fld: [{ value: null, disabled: Validation.disable('LastPureYear_Fld') }, Validation.setValidator('LastPureYear_Fld')],
      LastPureMonth_Fld: [{ value: null, disabled: Validation.disable('LastPureMonth_Fld') }, Validation.setValidator('LastPureMonth_Fld')],
      WitnessTo_Fld: [{ value: null, disabled: Validation.disable('WitnessTo_Fld') }, Validation.setValidator('WitnessTo_Fld')],
      BankBranch_Fld: [{ value: null, disabled: Validation.disable('BankBranch_Fld') }, Validation.setValidator('BankBranch_Fld')],
      HghStatus_Fld: [{ value: null, disabled: Validation.disable('HghStatus_Fld') }, Validation.setValidator('HghStatus_Fld')],
      HghStatusDesc_Fld: [null],
      PersonIDWitness_Fld: [{ value: null, disabled: Validation.disable('PersonIDWitness_Fld') }, Validation.setValidator('PersonIDWitness_Fld')],
      NameFamily_Fld: [{ value: null, disabled: Validation.disable('NameFamily_Fld') }, Validation.setValidator('NameFamily_Fld')],
      Equ_Fld: [{ value: null, disabled: Validation.disable('Equ_Fld') }, Validation.setValidator('Equ_Fld')],
      EquDate_Fld: [{ value: null, disabled: Validation.disable('EquDate_Fld') }, Validation.setValidator('EquDate_Fld')],
      Desc_Fld: [{ value: null, disabled: Validation.disable('Desc_Fld') }, Validation.setValidator('Desc_Fld')],
      DescElse_Fld: [{ value: null, disabled: Validation.disable('DescElse_Fld') }, Validation.setValidator('DescElse_Fld')],
      MaxDebt_Fld: [{ value: null, disabled: Validation.disable('MaxDebt_Fld') }, Validation.setValidator('MaxDebt_Fld')],
      ZamenRelation_Fld: [{ value: null, disabled: Validation.disable('ZamenRelation_Fld') }, Validation.setValidator('ZamenRelation_Fld')],
      ZamenFatherName_Fld: [{ value: null, disabled: Validation.disable('ZamenFatherName_Fld') }, Validation.setValidator('ZamenFatherName_Fld')],
      ZamenNationalNO_Fld: [{ value: null, disabled: Validation.disable('ZamenNationalNO_Fld') }, Validation.setValidator('ZamenNationalNO_Fld')],
      TopDebtPrice_Fld: [{ value: null, disabled: Validation.disable('TopDebtPrice_Fld') }, Validation.setValidator('TopDebtPrice_Fld')],
      ExtraPriceDebt_Fld: [{ value: null, disabled: Validation.disable('ExtraPriceDebt_Fld') }, Validation.setValidator('ExtraPriceDebt_Fld')],

      PersonIDCollect_Fld: [null],
      IDCollect_Fld: [null],
      FormType:[{value: this.formType}]
    })
    var t =  this.calendar.getToday()
    this.form.controls.RequestDate_Fld.patchValue(t.year + '/' + t.month.toString().padStart(2,'0') + '/' + t.day.toString().padStart(2,'0'))
  }

  async changeHghWitnessType() {
    this.HghWitnessType = this.form.controls.HghWitnessType_Fld.value
    this.HghWitnessTypeChange.emit(this.HghWitnessType)
    // this.service.getById('Debt', this.debtCode, 'View').subscribe((res: any) => {
    //   const data = res.Data
    //   this.form.patchValue({ Baz_Fld: data.Baz_Fld, ContinueslyFlag_Fld: data.ContinueslyFlag_Fld, NoTax_Fld: data.NoTax_Fld,  Bazneshastegi_Fld: data.Bazneshastegi_Fld, FirstMonth_Fld: data.FirstMonth_Fld,
    //     Tax_Fld: data.Tax_Fld, CalcDebt_Fld: data.CalcDebt_Fld, })
    // })
  }

  stimulsoftData: any
  showReport: boolean = false
  reportUrl: string
  report() {
    if (this.modalGridID)
    {
      this.showReport = false
      this.service.get(`${Controller}/NewViewStimul/${this.modalGridID}/${this.ID}`).subscribe((res: any) => {
        this.stimulsoftData = res.Data.Item2
        this.modalOptions.modatTitle = res.Data.Item4
        this.showReport = true
      })
      // this.reportUrl = `${Controller}/NewViewStimul/${this.modalGridID}/${this.form.controls.PersonID_Fld.value}`
    }
  }

  save() {
    if (this.form.invalid) return this.controlService.isSubmitted = true

    if (this.formType == 'Add') return this.post()

    if (this.formType == 'Edit') this.put()
  }
    
  close() {
    this.closed.emit()
  }

  playerName : any
  modalOptions: ModalOptions

  multiEdit: boolean = false
  async buildForm() {
    await this.getHghWitnessType()
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
        this.HghWitnessType = this.data.HghWitnessType_Fld
      }
      else {
        this.setForm()
        this.getHghWitnessPrice();
        if (this.HghWitnessType) {
          this.form.controls.HghWitnessType_Fld.patchValue(this.HghWitnessType)
          this.form.controls.HghWitnessTypeDesc_Fld.patchValue(this.HghWitnessTypeList.find(a => a.Id == this.HghWitnessType).CodeDesc_Fld)
          this.data.HghWitnessTypeDesc_Fld = this.form.controls.HghWitnessTypeDesc_Fld.value
          this.changeHghWitnessType();
        }
      }
    }
    this.showForm = true
    setTimeout(() => {
      this.service.scrollToElement('form-person-hghwitness')
    }, 200); 
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
 
  closeModal() {
    this.showModal = false
    // this.closed.emit()
  }
  constructor(private calendar: NgbCalendarPersian, private controlService: ControlMessageService, private service: GridFormService, private formBuilder: UntypedFormBuilder, private toastr: ToastrService) { 
    this.modalOptions = {
      formType: 'Report',
      modatTitle: 'گواهی حقوق و ضمانت',
      saveCallback: this.report.bind(this),
      hideCallback: this.closeModal.bind(this),
      modalId: 'HghWitness' 
    }    
  this.getModalAttr()
  }

  ngOnChanges(UpdatedValue: any): void { 
    Object.keys(UpdatedValue).length >= 1 ? this.buildForm() : null 
  }

  gridOption = <CustomGridOption>{ 
    rowClicked: this.view.bind(this)
  }

  modalGridID: number
  view(event) {
    this.modalGridID = event.data.Id
  }

  getModalAttr() {
    this.service.getAttr('HghWitnessFiles').subscribe((res: any) => {
          this.setModalAttr(res.Data)
      })
  }

  setModalAttr(attr) {
    this.gridOption.columnDefs = attr
  }

  getSelectModal() {
    this.service.getByIdSimple('HghWitnessFiles/GetComboTypes', this.form.controls.HghWitnessType_Fld.value).subscribe((res: any) => {
      this.gridOption.rowData = res.Data
      this.showModal = true 
    })
  }

}
