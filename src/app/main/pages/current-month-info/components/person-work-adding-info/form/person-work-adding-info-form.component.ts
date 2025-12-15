import { Component, Output, EventEmitter, Input } from '@angular/core'
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms'
import { ControlMessageService } from 'src/app/main/main-body/common/custom-form/control-message/control-message.service'
import { GridFormService } from 'src/app/main/main-body/common/grid-form.service'
import { Validation } from 'src/app/main/main-body/common/custom-form/control-message/Validation'
import { PersonWorkAddingInfoFormAttr, setPersonWorkAddingInfoFormAttr, Year_Fld, Month_Fld } from '../../../../global-attr'

const Controller = 'PersonWorkAddingInfo'

@Component({
  selector: 'person-work-adding-info-form',
  templateUrl: './person-work-adding-info-form.component.html',
  styleUrls: ['./person-work-adding-info-form.component.scss']
})
export class PersonWorkAddingInfoFormComponent {

  @Output() done = new EventEmitter()
  @Input() formType: string
  @Input() ID: number
  @Input() selectedPersonListString: string
  @Input() accesses
  @Input() selectedPersonelNF: any
  
  showListNoForm: boolean = false
  lastAddList: number = 0

  onAddList(idx: number){
    this.showListNoForm = true
    this.lastAddList = idx
  }

  submitedListNo(newData) {
    if (this.lastAddList != 0)
    {
      this.form.controls[`WorkAddingListDesc${this.lastAddList}_Fld`].patchValue(newData[0].CodeDesc_Fld)  
      this.form.controls[`WorkAddingList${this.lastAddList}_Fld`].patchValue(newData[0].Id)
      this.data[`WorkAddingListDesc${this.lastAddList}_Fld`] = newData[0].CodeDesc_Fld
    }
    this.closeFormListNo()
  }

  closeFormListNo() {
    this.showListNoForm = false
  }

  onGetLastList(idx: number){
    this.service.getByIdSimple('ListNo/GetLastNo', Controller).toPromise().then((res: any) => {
      if (!res || !res.Data) return this.done.emit(false)
      else {

        this.form.controls[`WorkAddingListDesc${idx}_Fld`].patchValue(res.Data.CodeDesc_Fld)  
        this.form.controls[`WorkAddingList${idx}_Fld`].patchValue(res.Data.Id)
        this.data[`WorkAddingListDesc${idx}_Fld`] = res.Data.CodeDesc_Fld

      }
    })

  }
  data: any = {}
  getById() {
    return new Promise((resolve,reject) => {
      this.service.getByIdSimple(`${Controller}/GetSelect`, this.ID).subscribe((res: any) => {
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

  getAttr() {
    return new Promise(resolve => {
      if (!PersonWorkAddingInfoFormAttr) {
        this.service.getAttr(Controller).subscribe((res: any) => {
          this.setAttr(res.Data, 'toLocal')
          return resolve(true)
        })
      }
      else {
        this.setAttr(PersonWorkAddingInfoFormAttr)
        return resolve(true)
      }
    })
  }

  formObj: any
  setAttr(attr, type?) {
    this.formObj = attr.EntityAttribute
    this.accesses = attr.EntityAccess
    type == 'toLocal' ? setPersonWorkAddingInfoFormAttr(attr) : null
  }

  put() {
    let body
    this.selectedPersonListString.split(',').length > 1 ? body = this.fakeFormValue : body = this.form.getRawValue()
    body.Year_Fld = Year_Fld
    body.Month_Fld = Month_Fld
    this.service.post(`${Controller}/Update`, body).subscribe(_ => {
      let id
      this.selectedPersonListString.split(',').length > 0 ? id = this.selectedPersonListString.split(',')[0] : id = this.form.getRawValue().PersonID_Fld
      this.done.emit(this.selectedPersonListString)
    })
  }

  form: UntypedFormGroup
  showForm: boolean = false
  setForm() {
    Validation.form = this.formObj
    this.form = this.formBuilder.group({
      Id: [this.ID],
      Year_Fld: [Year_Fld],
      Month_Fld: [Month_Fld],
      PersonID_Fld: [this.ID],
      WorkAdding5_Fld: [{ value: null, disabled: Validation.disable('WorkAdding5_Fld') }, Validation.setValidator('WorkAdding5_Fld')],
      WorkAddingMin5_Fld: [{ value: null, disabled: Validation.disable('WorkAddingMin5_Fld') }, Validation.setValidator('WorkAddingMin5_Fld')],
      PriceWorkAdding5_Fld: [{ value: null, disabled: Validation.disable('PriceWorkAdding5_Fld') }, Validation.setValidator('PriceWorkAdding5_Fld')],
      RateWorkAdding5_Fld: [{ value: null, disabled: Validation.disable('RateWorkAdding5_Fld') }, Validation.setValidator('RateWorkAdding5_Fld')],
      WorkAddingListDesc5_Fld: [null],
      WorkAddingList5_Fld: [{ value: null, disabled: Validation.disable('WorkAddingList5_Fld') }, Validation.setValidator('WorkAddingList5_Fld')],
      WorkAddingFinalPrice5_Fld: [{ value: null, disabled: Validation.disable('WorkAddingFinalPrice5_Fld') }, Validation.setValidator('WorkAddingFinalPrice5_Fld')],
      WorkAdding6_Fld: [{ value: null, disabled: Validation.disable('WorkAdding6_Fld') }, Validation.setValidator('WorkAdding6_Fld')],
      WorkAddingMin6_Fld: [{ value: null, disabled: Validation.disable('WorkAddingMin6_Fld') }, Validation.setValidator('WorkAddingMin6_Fld')],
      PriceWorkAdding6_Fld: [{ value: null, disabled: Validation.disable('PriceWorkAdding6_Fld') }, Validation.setValidator('PriceWorkAdding6_Fld')],
      RateWorkAdding6_Fld: [{ value: null, disabled: Validation.disable('RateWorkAdding6_Fld') }, Validation.setValidator('RateWorkAdding6_Fld')],
      WorkAddingListDesc6_Fld: [null],
      WorkAddingList6_Fld: [{ value: null, disabled: Validation.disable('WorkAddingList6_Fld') }, Validation.setValidator('WorkAddingList6_Fld')],
      WorkAddingFinalPrice6_Fld: [{ value: null, disabled: Validation.disable('WorkAddingFinalPrice6_Fld') }, Validation.setValidator('WorkAddingFinalPrice6_Fld')],
      WorkAdding7_Fld: [{ value: null, disabled: Validation.disable('WorkAdding7_Fld') }, Validation.setValidator('WorkAdding7_Fld')],
      WorkAddingMin7_Fld: [{ value: null, disabled: Validation.disable('WorkAddingMin7_Fld') }, Validation.setValidator('WorkAddingMin7_Fld')],
      PriceWorkAdding7_Fld: [{ value: null, disabled: Validation.disable('PriceWorkAdding7_Fld') }, Validation.setValidator('PriceWorkAdding7_Fld')],
      RateWorkAdding7_Fld: [{ value: null, disabled: Validation.disable('RateWorkAdding7_Fld') }, Validation.setValidator('RateWorkAdding7_Fld')],
      WorkAddingListDesc7_Fld: [null],
      WorkAddingList7_Fld: [{ value: null, disabled: Validation.disable('WorkAddingList7_Fld') }, Validation.setValidator('WorkAddingList7_Fld')],
      WorkAddingFinalPrice7_Fld: [{ value: null, disabled: Validation.disable('WorkAddingFinalPrice7_Fld') }, Validation.setValidator('WorkAddingFinalPrice7_Fld')],
      WorkAdding8_Fld: [{ value: null, disabled: Validation.disable('WorkAdding8_Fld') }, Validation.setValidator('WorkAdding8_Fld')],
      WorkAddingMin8_Fld: [{ value: null, disabled: Validation.disable('WorkAddingMin8_Fld') }, Validation.setValidator('WorkAddingMin8_Fld')],
      PriceWorkAdding8_Fld: [{ value: null, disabled: Validation.disable('PriceWorkAdding8_Fld') }, Validation.setValidator('PriceWorkAdding8_Fld')],
      RateWorkAdding8_Fld: [{ value: null, disabled: Validation.disable('RateWorkAdding8_Fld') }, Validation.setValidator('RateWorkAdding8_Fld')],
      WorkAddingListDesc8_Fld: [null],
      WorkAddingList8_Fld: [{ value: null, disabled: Validation.disable('WorkAddingList8_Fld') }, Validation.setValidator('WorkAddingList8_Fld')],
      WorkAddingFinalPrice8_Fld: [{ value: null, disabled: Validation.disable('WorkAddingFinalPrice8_Fld') }, Validation.setValidator('WorkAddingFinalPrice8_Fld')],
      WorkAdding9_Fld: [{ value: null, disabled: Validation.disable('WorkAdding9_Fld') }, Validation.setValidator('WorkAdding9_Fld')],
      WorkAddingMin9_Fld: [{ value: null, disabled: Validation.disable('WorkAddingMin9_Fld') }, Validation.setValidator('WorkAddingMin9_Fld')],
      PriceWorkAdding9_Fld: [{ value: null, disabled: Validation.disable('PriceWorkAdding9_Fld') }, Validation.setValidator('PriceWorkAdding9_Fld')],
      RateWorkAdding9_Fld: [{ value: null, disabled: Validation.disable('RateWorkAdding9_Fld') }, Validation.setValidator('RateWorkAdding9_Fld')],
      WorkAddingListDesc9_Fld: [null],
      WorkAddingList9_Fld: [{ value: null, disabled: Validation.disable('WorkAddingList9_Fld') }, Validation.setValidator('WorkAddingList9_Fld')],
      WorkAddingFinalPrice9_Fld: [{ value: null, disabled: Validation.disable('WorkAddingFinalPrice9_Fld') }, Validation.setValidator('WorkAddingFinalPrice9_Fld')],
      WorkAdding10_Fld: [{ value: null, disabled: Validation.disable('WorkAdding10_Fld') }, Validation.setValidator('WorkAdding10_Fld')],
      WorkAddingMin10_Fld: [{ value: null, disabled: Validation.disable('WorkAddingMin10_Fld') }, Validation.setValidator('WorkAddingMin10_Fld')],
      PriceWorkAdding10_Fld: [{ value: null, disabled: Validation.disable('PriceWorkAdding10_Fld') }, Validation.setValidator('PriceWorkAdding10_Fld')],
      RateWorkAdding10_Fld: [{ value: null, disabled: Validation.disable('RateWorkAdding10_Fld') }, Validation.setValidator('RateWorkAdding10_Fld')],
      WorkAddingListDesc10_Fld: [null],
      WorkAddingList10_Fld: [{ value: null, disabled: Validation.disable('WorkAddingList10_Fld') }, Validation.setValidator('WorkAddingList10_Fld')],
      WorkAddingFinalPrice10_Fld: [{ value: null, disabled: Validation.disable('WorkAddingFinalPrice10_Fld') }, Validation.setValidator('WorkAddingFinalPrice10_Fld')],
      WorkAdding11_Fld: [{ value: null, disabled: Validation.disable('WorkAdding11_Fld') }, Validation.setValidator('WorkAdding11_Fld')],
      WorkAddingMin11_Fld: [{ value: null, disabled: Validation.disable('WorkAddingMin11_Fld') }, Validation.setValidator('WorkAddingMin11_Fld')],
      PriceWorkAdding11_Fld: [{ value: null, disabled: Validation.disable('PriceWorkAdding11_Fld') }, Validation.setValidator('PriceWorkAdding11_Fld')],
      RateWorkAdding11_Fld: [{ value: null, disabled: Validation.disable('RateWorkAdding11_Fld') }, Validation.setValidator('RateWorkAdding11_Fld')],
      WorkAddingListDesc11_Fld: [null],
      WorkAddingList11_Fld: [{ value: null, disabled: Validation.disable('WorkAddingList11_Fld') }, Validation.setValidator('WorkAddingList11_Fld')],
      WorkAddingFinalPrice11_Fld: [{ value: null, disabled: Validation.disable('WorkAddingFinalPrice11_Fld') }, Validation.setValidator('WorkAddingFinalPrice11_Fld')],
      FormType:[{value: this.formType}]
    })
    if (!this.selectedPersonListString) this.form.patchValue(this.data)
    else {
      this.form.reset()
      this.form.controls.Year_Fld.patchValue(Year_Fld)
      this.form.controls.Month_Fld.patchValue(Month_Fld)
      this.form.controls.Id.patchValue(1)
      this.form.controls.PersonID_Fld.patchValue(this.ID)
    }
    this.showForm = true
    // setTimeout(() => {
    //   this.service.scrollToElement('form')
    // }, 200); 
  }

  fakeFormValue
  save() {
    if (this.form.invalid) return this.controlService.isSubmitted = true
    if (this.selectedPersonListString && this.selectedPersonListString.split(',').length > 1) {
      this.fakeFormValue = this.form.getRawValue()
      for (let property in this.fakeFormValue) if (this.fakeFormValue[property] == null) this.fakeFormValue[property] = '-1'
      //this.form.controls.Id.patchValue(0)
      this.form.controls.PersonID_Fld.patchValue(this.selectedPersonListString)
      this.fakeFormValue.PersonID_Fld = this.form.controls.PersonID_Fld.value
      this.fakeFormValue.Id = 0
    }
    else if (this.selectedPersonListString.split(',').length == 1) this.selectedPersonListString = ''
    /* else this.form.controls.PersonID_Fld.patchValue(0) */
    this.put()
  }

  async buildForm() {
    await this.getAttr()
    if (this.selectedPersonListString && this.selectedPersonListString.split(',').length > 0)
      this.setForm()
    else {
      await this.getById()
      this.setForm()
    }
  }

  constructor(private controlService: ControlMessageService, private service: GridFormService, private formBuilder: UntypedFormBuilder) { }

  ngOnChanges(UpdatedValue: string): void { this.buildForm() }
}
