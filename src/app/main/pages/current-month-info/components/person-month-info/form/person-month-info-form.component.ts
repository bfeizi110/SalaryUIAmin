import { Component, Output, EventEmitter, Input } from '@angular/core'
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms'
import { ControlMessageService } from 'src/app/main/main-body/common/custom-form/control-message/control-message.service'
import { GridFormService } from 'src/app/main/main-body/common/grid-form.service'
import { Validation } from 'src/app/main/main-body/common/custom-form/control-message/Validation'
import { Month_Fld, Year_Fld } from '../../../../global-attr'

const Controller = 'PersonMonthInfo'

@Component({
  selector: 'person-month-info-form',
  templateUrl: './person-month-info-form.component.html',
  styleUrls: ['./person-month-info-form.component.scss']
})
export class PersonMonthInfoFormComponent {

  @Output() done = new EventEmitter()
  @Input() formType: string
  @Input() formObj: any
  @Input() ID: number
  @Input() selectedPersonListString: string
  @Input() accesses
  @Input() selectedPersonelNF: any
  
  showListNoForm: boolean = false
  
  onAddList(){
    this.showListNoForm = true
  }

  submitedListNo(newData) {

    this.form.controls.StepDesc_Fld.patchValue(newData[0].CodeDesc_Fld)
    this.form.controls.Step.patchValue(newData[0].Id)
    this.data.StepDesc_Fld = newData[0].CodeDesc_Fld

    this.closeFormListNo()
  }

  closeFormListNo() {
    this.showListNoForm = false
  }

  onGetLastList(){
    this.service.getByIdSimple('ListNo/GetLastNo', Controller).toPromise().then((res: any) => {
      if (!res || !res.Data) return this.done.emit(false)
      else {
        this.form.controls.StepDesc_Fld.patchValue(res.Data.CodeDesc_Fld)
        this.form.controls.Step.patchValue(res.Data.Id)
        this.data.StepDesc_Fld = res.Data.CodeDesc_Fld
      }
    })

  }

  data: any = {}
  get() {
    if (this.ID)
    {
      this.service.getByIdSimple(Controller, this.ID).toPromise().then((res: any) => {
        if (!res || !res.Data) return this.done.emit(false)
        else {
          this.data = res.Data
          this.setForm()
        }
      })
    }
  }

  put() {
    let body
    this.selectedPersonListString.length > 1 ? body = this.fakeFormValue : body = this.form.getRawValue()
    this.service.post(`${Controller}/Update`, body).subscribe(_ => {
      this.get()
      if (this.selectedPersonListString.length > 1) this.done.emit()
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
      MonthInfoID_Fld: [this.ID],
      DailyEarning_Fld: [{ value: null, disabled: Validation.disable('DailyEarning_Fld') }, Validation.setValidator('DailyEarning_Fld')],
      StepDesc_Fld: [null],
      Step: [{ value: null, disabled: Validation.disable('Step') }, Validation.setValidator('Step')],
      FractionDay_Fld: [{ value: null, disabled: Validation.disable('FractionDay_Fld') }, Validation.setValidator('FractionDay_Fld')],
      Fraction_Fld: [{ value: null, disabled: Validation.disable('Fraction_Fld') }, Validation.setValidator('Fraction_Fld')],
      FractionMin_Fld: [{ value: null, disabled: Validation.disable('FractionMin_Fld') }, Validation.setValidator('FractionMin_Fld')],
      WorkAdding1_Fld: [{ value: null, disabled: Validation.disable('WorkAdding1_Fld') }, Validation.setValidator('WorkAdding1_Fld')],
      WorkAddingMin1_Fld: [{ value: null, disabled: Validation.disable('WorkAddingMin1_Fld') }, Validation.setValidator('WorkAddingMin1_Fld')],
      PriceWorkAdding1_Fld: [{ value: null, disabled: Validation.disable('PriceWorkAdding1_Fld') }, Validation.setValidator('PriceWorkAdding1_Fld')],
      RateWorkAdding1_Fld: [{ value: null, disabled: Validation.disable('RateWorkAdding1_Fld') }, Validation.setValidator('RateWorkAdding1_Fld')],
      WorkAdding2_Fld: [{ value: null, disabled: Validation.disable('WorkAdding2_Fld') }, Validation.setValidator('WorkAdding2_Fld')],
      WorkAddingMin2_Fld: [{ value: null, disabled: Validation.disable('WorkAddingMin2_Fld') }, Validation.setValidator('WorkAddingMin2_Fld')],
      PriceWorkAdding2_Fld: [{ value: null, disabled: Validation.disable('PriceWorkAdding2_Fld') }, Validation.setValidator('PriceWorkAdding2_Fld')],
      RateWorkAdding2_Fld: [{ value: null, disabled: Validation.disable('RateWorkAdding2_Fld') }, Validation.setValidator('RateWorkAdding2_Fld')],
      WorkAdding3_Fld: [{ value: null, disabled: Validation.disable('WorkAdding3_Fld') }, Validation.setValidator('WorkAdding3_Fld')],
      WorkAddingMin3_Fld: [{ value: null, disabled: Validation.disable('WorkAddingMin3_Fld') }, Validation.setValidator('WorkAddingMin3_Fld')],
      PriceWorkAdding3_Fld: [{ value: null, disabled: Validation.disable('PriceWorkAdding3_Fld') }, Validation.setValidator('PriceWorkAdding3_Fld')],
      RateWorkAdding3_Fld: [{ value: null, disabled: Validation.disable('RateWorkAdding3_Fld') }, Validation.setValidator('RateWorkAdding3_Fld')],
      WorkAdding4_Fld: [{ value: null, disabled: Validation.disable('WorkAdding4_Fld') }, Validation.setValidator('WorkAdding4_Fld')],
      WorkAddingMin4_Fld: [{ value: null, disabled: Validation.disable('WorkAddingMin4_Fld') }, Validation.setValidator('WorkAddingMin4_Fld')],
      PriceWorkAdding4_Fld: [{ value: null, disabled: Validation.disable('PriceWorkAdding4_Fld') }, Validation.setValidator('PriceWorkAdding4_Fld')],
      RateWorkAdding4_Fld: [{ value: null, disabled: Validation.disable('RateWorkAdding4_Fld') }, Validation.setValidator('RateWorkAdding4_Fld')],
      HokmPercent_Fld: [{ value: null, disabled: Validation.disable('HokmPercent_Fld') }, Validation.setValidator('HokmPercent_Fld')],
      P1: [{ value: null, disabled: Validation.disable('P1') }, Validation.setValidator('P1')],
      DPDesc1: [null],
      DP1: [{ value: null, disabled: Validation.disable('DP1') }, Validation.setValidator('DP1')],
      P2: [{ value: null, disabled: Validation.disable('P2') }, Validation.setValidator('P2')],
      DPDesc2: [null],
      DP2: [{ value: null, disabled: Validation.disable('DP2') }, Validation.setValidator('DP2')],
      P3: [{ value: null, disabled: Validation.disable('P3') }, Validation.setValidator('P3')],
      DPDesc3: [null],
      DP3: [{ value: null, disabled: Validation.disable('DP3') }, Validation.setValidator('DP3')],
      P4: [{ value: null, disabled: Validation.disable('P4') }, Validation.setValidator('P4')],
      DPDesc4: [null],
      DP4: [{ value: null, disabled: Validation.disable('DP4') }, Validation.setValidator('DP4')],
      P5: [{ value: null, disabled: Validation.disable('P5') }, Validation.setValidator('P5')],
      DPDesc5: [null],
      DP5: [{ value: null, disabled: Validation.disable('DP5') }, Validation.setValidator('DP5')],
      P6: [{ value: null, disabled: Validation.disable('P6') }, Validation.setValidator('P6')],
      DPDesc6: [null],
      DP6: [{ value: null, disabled: Validation.disable('DP6') }, Validation.setValidator('DP6')],
      P7: [{ value: null, disabled: Validation.disable('P7') }, Validation.setValidator('P7')],
      DPDesc7: [null],
      DP7: [{ value: null, disabled: Validation.disable('DP7') }, Validation.setValidator('DP7')],
      P8: [{ value: null, disabled: Validation.disable('P8') }, Validation.setValidator('P8')],
      DPDesc8: [null],
      DP8: [{ value: null, disabled: Validation.disable('DP8') }, Validation.setValidator('DP8')],
      K1: [{ value: null, disabled: Validation.disable('K1') }, Validation.setValidator('K1')],
      DKDesc1: [null],
      DK1: [{ value: null, disabled: Validation.disable('DK1') }, Validation.setValidator('DK1')],
      K2: [{ value: null, disabled: Validation.disable('K2') }, Validation.setValidator('K2')],
      DKDesc2: [null],
      DK2: [{ value: null, disabled: Validation.disable('DK2') }, Validation.setValidator('DK2')],
      K3: [{ value: null, disabled: Validation.disable('K3') }, Validation.setValidator('K3')],
      DKDesc3: [null],
      DK3: [{ value: null, disabled: Validation.disable('DK3') }, Validation.setValidator('DK3')],
      K4: [{ value: null, disabled: Validation.disable('K4') }, Validation.setValidator('K4')],
      DKDesc4: [null],
      DK4: [{ value: null, disabled: Validation.disable('DK4') }, Validation.setValidator('DK4')],
      K5: [{ value: null, disabled: Validation.disable('K5') }, Validation.setValidator('K5')],
      DKDesc5: [null],
      DK5: [{ value: null, disabled: Validation.disable('DK5') }, Validation.setValidator('DK5')],
      K6: [{ value: null, disabled: Validation.disable('K6') }, Validation.setValidator('K6')],
      DKDesc6: [null],
      DK6: [{ value: null, disabled: Validation.disable('DK6') }, Validation.setValidator('DK6')],
      K7: [{ value: null, disabled: Validation.disable('K7') }, Validation.setValidator('K7')],
      DKDesc7: [null],
      DK7: [{ value: null, disabled: Validation.disable('DK7') }, Validation.setValidator('DK7')],
      K8: [{ value: null, disabled: Validation.disable('K8') }, Validation.setValidator('K8')],
      DK8: [{ value: null, disabled: Validation.disable('DK8') }, Validation.setValidator('DK8')],
      Days1: [{ value: null, disabled: Validation.disable('Days1') }, Validation.setValidator('Days1')],
      PayElse1: [{ value: null, disabled: Validation.disable('PayElse1') }, Validation.setValidator('PayElse1')],
      PayElseDesc1: [null],
      PayElsePrice1: [{ value: null, disabled: Validation.disable('PayElsePrice1') }, Validation.setValidator('PayElsePrice1')],
      Days2: [{ value: null, disabled: Validation.disable('Days2') }, Validation.setValidator('Days2')],
      PayElse2: [{ value: null, disabled: Validation.disable('PayElse2') }, Validation.setValidator('PayElse2')],
      PayElseDesc2: [null],
      PayElsePrice2: [{ value: null, disabled: Validation.disable('PayElsePrice2') }, Validation.setValidator('PayElsePrice2')],
      Days3: [{ value: null, disabled: Validation.disable('Days3') }, Validation.setValidator('Days3')],
      PayElse3: [{ value: null, disabled: Validation.disable('PayElse3') }, Validation.setValidator('PayElse3')],
      PayElseDesc3: [null],
      PayElsePrice3: [{ value: null, disabled: Validation.disable('PayElsePrice3') }, Validation.setValidator('PayElsePrice3')],
      Days4: [{ value: null, disabled: Validation.disable('Days4') }, Validation.setValidator('Days4')],
      PayElse4: [{ value: null, disabled: Validation.disable('PayElse4') }, Validation.setValidator('PayElse4')],
      PayElseDesc4: [null],
      PayElsePrice4: [{ value: null, disabled: Validation.disable('PayElsePrice4') }, Validation.setValidator('PayElsePrice4')],
      FormType:[{value: this.formType}]
    })
    if (this.selectedPersonListString.length == 0) this.form.patchValue(this.data)
    else {
      this.form.reset()
      this.form.controls.Id.patchValue(this.ID)
      this.form.controls.Year_Fld.patchValue(Year_Fld)
      this.form.controls.Month_Fld.patchValue(Month_Fld)
    }
    this.showForm = true
    // setTimeout(() => this.service.scrollToElement('form'), 100)
  }

  fakeFormValue
  save() {
    if (this.form.invalid) return this.controlService.isSubmitted = true
    if (this.selectedPersonListString.length > 1) {
      this.fakeFormValue = this.form.getRawValue()
      for (let property in this.fakeFormValue) if (this.fakeFormValue[property] == null) this.fakeFormValue[property] = '-1'
      this.form.controls.MonthInfoID_Fld.patchValue(this.selectedPersonListString)
      this.fakeFormValue.MonthInfoID_Fld = this.form.controls.MonthInfoID_Fld.value
    }
    else if (this.selectedPersonListString.length == 1) this.selectedPersonListString = ''
    else this.form.controls.MonthInfoID_Fld.patchValue(0)
    this.put()
  }

  constructor(private controlService: ControlMessageService, private service: GridFormService, private formBuilder: UntypedFormBuilder) { }

  ngOnChanges(UpdatedValue: string): void { this.selectedPersonListString != '' ? this.setForm() : this.get() }

}
