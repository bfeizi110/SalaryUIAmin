
import { Component, Output, EventEmitter, Input, ViewChild, ElementRef } from '@angular/core'
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms'
import { ControlMessageService } from 'src/app/main/main-body/common/custom-form/control-message/control-message.service'
import { GridFormService } from 'src/app/main/main-body/common/grid-form.service'
import { Validation } from 'src/app/main/main-body/common/custom-form/control-message/Validation'
import { Month_Fld, Year_Fld } from 'src/app/main/pages/global-attr'

@Component({
  selector: 'person-insure-info-form',
  templateUrl: './person-insure-info-form.component.html',
  styleUrls: ['./person-insure-info-form.component.scss']
})
export class PersonInsureInfoFormComponent {

  @Output() done = new EventEmitter()
  @Output() closed = new EventEmitter()
  @Output() insureCodeChange = new EventEmitter()
  @Input() insureCode: number
  @Input() ID: number
  @Input() PID: number
  @Input() formType: string
  @Input() formObj: any
  @Input() typeInsId: number
  @Input() personList: any[]
  @Input() idList: any[]
  @Input() controller: string
  @Input() selectedPersonelNF: any
  
  @ViewChild("myElem") MyProp: ElementRef;
  
  insureCodeList = []
  getInsureCode() {
    return new Promise(resolve => {
      this.service.getCombo('*Insure/GetCombo/null').toPromise().then((res: any) => {
        this.insureCodeList = res.Data
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

  getAttrByType(id?) {
    return new Promise(resolve => {
      id ? this.typeInsId = id : null
      this.service.getAttrById(this.controller, this.typeInsId).subscribe((res: any) => {
        this.formObj = res.Data.EntityAttribute
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
    this.service.post(`${this.controller}/Create`, this.form.getRawValue()).subscribe(_ => this.done.emit(this.personList.length == 0 ? 'single' : 'multi'))
  }

  put() {
    if (this.idList.length == 0) {
      this.form.controls.IDCollect_Fld.patchValue(null)
      this.service.post(`${this.controller}/Update`, this.form.getRawValue()).subscribe(_ => this.done.emit('single'))
    }
    else {
      this.form.controls.Id.patchValue(0)
      this.form.controls.PersonID_Fld.patchValue(0)
      this.form.controls.IDCollect_Fld.patchValue(this.idList)
      let model = this.form.getRawValue()
      model.FieldChanged_Fld = this.fieldChange.toString()
      this.service.post(`${this.controller}/UpdateAll`, model).subscribe(_ => this.done.emit('multi'))
    }
  }

  form: UntypedFormGroup
  setForm() {
    Validation.form = this.formObj
    this.form = this.formBuilder.group({
      Id: [0],
      Year_Fld: [Year_Fld],
      Month_Fld: [Month_Fld],
      PersonID_Fld: [this.PID],
      TypeInsure_Fld: [this.typeInsId],
      InsureCodeDesc_Fld: [null],
      InsureCode_Fld: [{ value: null, disabled: Validation.disable('InsureCode_Fld') }, Validation.setValidator('InsureCode_Fld')],
      NonFreeQuantity_Fld: [{ value: null, disabled: Validation.disable('NonFreeQuantity_Fld') }, Validation.setValidator('NonFreeQuantity_Fld')],
      FreeQuantity_Fld: [{ value: null, disabled: Validation.disable('FreeQuantity_Fld') }, Validation.setValidator('FreeQuantity_Fld')],
      ParentsQuantity_Fld: [{ value: null, disabled: Validation.disable('ParentsQuantity_Fld') }, Validation.setValidator('ParentsQuantity_Fld')],
      Janbaz: [{ value: null, disabled: Validation.disable('Janbaz') }, Validation.setValidator('Janbaz')],
      Mazad3: [{ value: null, disabled: Validation.disable('FreeQuantity_Fld') }, Validation.setValidator('FreeQuantity_Fld')],
      Startdate_Fld: [{ value: null, disabled: Validation.disable('Startdate_Fld') }, Validation.setValidator('Startdate_Fld')],
      Enddate_Fld: [{ value: null, disabled: Validation.disable('Enddate_Fld') }, Validation.setValidator('Enddate_Fld')],
      Desc_Fld: [{ value: null, disabled: Validation.disable('Desc_Fld') }, Validation.setValidator('Desc_Fld')],
      StopCalculate_Fld: [{ value: null, disabled: Validation.disable('StopCalculate_Fld') }, Validation.setValidator('StopCalculate_Fld')],
      NotCalcMain_Fld: [{ value: null, disabled: Validation.disable('NotCalcMain_Fld') }, Validation.setValidator('NotCalcMain_Fld')],
      PersonIDCollect_Fld: [null],
      IDCollect_Fld: [null],
      FormType:[{value: this.formType}]
    })
  }

  async insureChange() {
    let id: number = this.form.controls.Id.value
    this.form.controls.InsureCode_Fld.value != '1' || !this.insureCode ? this.insureCode = this.form.controls.InsureCode_Fld.value : null
    this.insureCodeChange.emit(this.insureCode)
    await this.getInsureIdByCode(this.insureCode)
    await this.getInsureData(this.insureId)
    await this.getAttrByType(this.insureData.TypeInsure_Fld)
    this.form.patchValue(this.insureData)
    this.form.controls.InsureCode_Fld.patchValue(this.insureCode)
    this.form.controls.Id.patchValue(id)
  }

  insureId: number
  getInsureIdByCode(insureCodeId) {
    return new Promise(resolve => {
      this.service.getByIdSimple('Insure/GetIdByCode', insureCodeId).subscribe((res: any) => {
        this.insureId = res.Data
        return resolve(true)
      })
    })
  }

  insureData: any
  getInsureData(insureCodeId) {
    return new Promise(resolve => {
      this.service.getById('Insure', insureCodeId, 'View').subscribe((res: any) => {
        this.insureData = res.Data
        return resolve(true)
      })
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

  showForm: boolean = false
  multiEdit: boolean = false
  async buildForm() {
    await this.getInsureCode()
    this.idList.length > 0 ? this.multiEdit = true : this.multiEdit = false
    if (this.personList.length > 0 || this.idList.length > 0) {
      this.setForm()
      this.multiEdit ? Object.keys(this.form.controls).forEach(a => this.changeCheckbox(false, a)) : null
      if (this.formType == 'Edit') this.form.controls.IDCollect_Fld.patchValue(this.idList)
    }
    else {
      if (this.formType != 'Add') {
        await this.getById()
        await this.getAttrByType()
        this.setForm()
        this.form.patchValue(this.data)
        this.insureCode = this.data.InsureCode_Fld
      }
      else {
        this.setForm()
        // this.form.controls.Id.patchValue(0)
        if (this.insureCode) {
          this.form.controls.InsureCode_Fld.patchValue(this.insureCode)
          this.form.controls.InsureCodeDesc_Fld.patchValue(this.insureCodeList.find(a => a.Id == this.insureCode).CodeDesc_Fld)
          this.data.InsureCodeDesc_Fld = this.form.controls.InsureCodeDesc_Fld.value
          await this.insureChange()
        }
      }
    }
    this.showForm = true
    //this.service.scrollToElement('form')
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

  constructor(private controlService: ControlMessageService, private service: GridFormService, private formBuilder: UntypedFormBuilder) { }

  ngOnChanges(UpdatedValue: any): void {  Object.keys(UpdatedValue).length >= 1 ? this.buildForm() : null }

}
