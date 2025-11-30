import { Component, Output, EventEmitter, Input } from '@angular/core'
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms'
import { ControlMessageService } from 'src/app/main/main-body/common/custom-form/control-message/control-message.service'
import { GridFormService } from 'src/app/main/main-body/common/grid-form.service'
import { Validation } from 'src/app/main/main-body/common/custom-form/control-message/Validation'
import { CustomGridOption } from 'src/app/main/main-body/common/custom-ag-grid/interfaces/ag-grid-option.interface'

const Controller = 'CoveredBase'

@Component({
  selector: 'covered-base-form',
  templateUrl: './covered-base-form.component.html',
  styleUrls: ['./covered-base-form.component.scss']
})
export class CoveredBaseFormComponent {

  @Output() done = new EventEmitter()
  @Output() closed = new EventEmitter()
  @Input() ID: number
  @Input() formType: string
  @Input() attr: any
  @Input() hireId: number

  data: any = {}
  preData: any = {}
  get() {
    this.service.getById(Controller, this.ID, this.formType).toPromise().then((res: any) => {
      if (!res || !res.Data) return this.done.emit(false)
      else {
        this.preData = res.Data
        this.gridOptionIncluded.rowData = res.Data.CoveredParameter
        this.showGridIncluded = true
        this.getNotCoverdParameter()
      }
    })
  }

  ar
  getNotCoverdParameter() {
    this.showGridNotIncluded = false
    !this.ID ? this.ID = 0 : null
    this.service.get(`${Controller}/GetNotCoverdParameter/${this.hireId}/${this.ID}`).subscribe((res: any) => {
      this.gridOptionNotIncluded.rowData = res.Data
      this.ar = { ...res.Data[0] }
      this.ar.Id = 0
      this.gridOptionIncluded.rowData = [this.ar]
      this.showGridNotIncluded = true
      this.setForm()
    })
  }

  post() {
    this.form.patchValue({ Id: 0 })
    this.model.Id = 0
    this.service.post(`${Controller}/Create`, this.model).subscribe((res: any) => this.done.emit(res.Data))
  }

  put() { this.service.post(`${Controller}/Update`, this.model).subscribe((res: any) => this.done.emit(res.Data)) }

  form: UntypedFormGroup
  showForm: boolean = false
  formObj: any
  setForm() {
    Validation.form = this.formObj
    this.form = this.formBuilder.group({
      Id: [null],
      HireType_Fld: [this.hireId],
      CoveredTypeDesc_Fld: [null],
      CoveredType_Fld: [{ value: null, disabled: Validation.disable('CoveredType_Fld') }, Validation.setValidator('CoveredType_Fld')],
      FormulaBase_Fld: [{ value: false, disabled: Validation.disable('FormulaBase_Fld') }, Validation.setValidator('FormulaBase_Fld')],
      FormulaIDDesc_Fld: [null],
      FormulaID_Fld: [{ value: null, disabled: true }, Validation.setValidator('FormulaID_Fld'), Validation.setValidator('FormulaID_Fld')],
      CoveredParameter: [null],
      StringFactor_Fld: [{ value: null, disabled: Validation.disable('StringFactor_Fld') }, Validation.setValidator('StringFactor_Fld'), Validation.setValidator('StringFactor_Fld')],
      FormType:[{value: this.formType}]
    })
    if (this.formType != 'Add') {
      this.data = this.preData
      this.form.patchValue(this.data)
      let CoveredParameter: any = this.form.controls.CoveredParameter.value
      CoveredParameter && CoveredParameter.length > 0 ? this.gridOptionIncluded.rowData = CoveredParameter : null
    }
    this.changeFormulaBase()
    this.showForm = true
    this.showGrids = true
    this.showGridIncluded = true
    this.showGridNotIncluded = true
    setTimeout(() => { this.service.scrollToElement('form') }, 300)
  }

  model = {
    HireType_Fld: null,
    CoveredType_Fld: null,
    FormulaBase_Fld: null,
    CoveredParameter: null,
    CoveredFormula: null,
    StringFactor_Fld: null,
    Id: 0,
    FormulaID_Fld: null
  }

  save() {
    if (this.form.invalid) return this.controlService.isSubmitted = true
    this.form.controls.CoveredParameter.setValue(this.gridOptionIncluded.rowData)

    this.model.HireType_Fld = this.form.controls.HireType_Fld.value
    this.model.CoveredType_Fld = this.form.controls.CoveredType_Fld.value
    this.model.FormulaBase_Fld = this.form.controls.FormulaBase_Fld.value
    this.model.CoveredParameter = this.form.controls.CoveredParameter.value
    this.model.Id = this.form.controls.Id.value
    this.model.FormulaID_Fld = this.form.controls.FormulaID_Fld.value
    this.model.StringFactor_Fld = this.form.controls.StringFactor_Fld.value

    if (this.formType == 'Add') return this.post()

    if (this.formType == 'Edit') this.put()
  }

  showGrids: boolean = false
  showGridNotIncluded: boolean = false
  showGridIncluded: boolean = false
  selectedRowCheckboxDataIncluded = []
  selectedRowCheckboxDataNotIncluded = []

  gridOptionIncluded = <CustomGridOption>{}
  gridOptionNotIncluded = <CustomGridOption>{}
  setGrid() {
    this.showGridIncluded = false
    this.showGridNotIncluded = false
    if (this.formType != 'View') {
      this.gridOptionIncluded = <CustomGridOption>{ checkboxSelection: true, rowSelected: this.rowSelectedIncluded.bind(this) }
      this.gridOptionNotIncluded = <CustomGridOption>{ checkboxSelection: true, rowSelected: this.rowSelectedNotIncluded.bind(this) }
    }
    else {
      this.gridOptionIncluded = <CustomGridOption>{checkboxSelection: false}
      this.gridOptionNotIncluded = <CustomGridOption>{checkboxSelection: false}
    }
    this.formObj = this.attr.EntityAttribute
    this.gridOptionIncluded.columnDefs = this.attr
    this.gridOptionNotIncluded.columnDefs = this.attr
  }

  selectedIncludedList = []
  rowSelectedIncluded(event) { this.selectedIncludedList.includes(event.data) ? this.selectedIncludedList = this.selectedIncludedList.filter(a => a != event.data) : this.selectedIncludedList.push(event.data) }

  selectedNotIncludedList = []
  rowSelectedNotIncluded(event) { this.selectedNotIncludedList.includes(event.data) ? this.selectedNotIncludedList = this.selectedNotIncludedList.filter(a => a != event.data) : this.selectedNotIncludedList.push(event.data) }

  addInclude() {
    this.hideGrids()
    this.gridOptionIncluded.rowData[0].Id != undefined && this.gridOptionIncluded.rowData[0].Id == 0 ? this.gridOptionIncluded.rowData = [] : null
    this.selectedNotIncludedList.forEach(a => {
      this.gridOptionIncluded.rowData.push(a)
      this.gridOptionNotIncluded.rowData = this.gridOptionNotIncluded.rowData.filter(b => b != a)
    })
    this.selectedNotIncludedList = []
    if (this.gridOptionNotIncluded.rowData.length == 0) 
      {
        this.ar = { }
        this.ar.Id = 0
        this.ar.ParameterDesc_Fld = null
        this.gridOptionNotIncluded.rowData.push(this.ar) 
      }
    setTimeout(() => {
      this.showGridIncluded = true
      this.showGridNotIncluded = true
    })
  }

  removeInclude() {
    this.hideGrids()
    this.gridOptionNotIncluded.rowData[0].Id != undefined && this.gridOptionNotIncluded.rowData[0].Id == 0 ? this.gridOptionNotIncluded.rowData = [] : null
    this.selectedIncludedList.forEach(a => {
      this.gridOptionNotIncluded.rowData.push(a)
      this.gridOptionIncluded.rowData = this.gridOptionIncluded.rowData.filter(b => b != a)
    })
    this.selectedIncludedList = []
    if (this.gridOptionIncluded.rowData.length == 0) 
      {
        this.ar = { }
        this.ar.Id = 0
        this.ar.ParameterDesc_Fld = null
        this.gridOptionIncluded.rowData.push(this.ar) 
      }
    setTimeout(() => {
      this.showGridIncluded = true
      this.showGridNotIncluded = true
    })
  }

  showFormula: boolean = true
  changeFormulaBase() {
    this.showFormula = false
    if (this.form.controls.FormulaBase_Fld.value) {
      this.form.controls.FormulaID_Fld.setValidators([Validation.required()])
      this.form.controls.FormulaID_Fld.enable()
    }
    else {
      this.form.controls.FormulaID_Fld.disable()
      //this.form.controls.FormulaID_Fld.setValidators([Validation.required()])
    }
    setTimeout(() => this.showFormula = true)
  }

  hideGrids() {
    this.showGridIncluded = false
    this.showGridNotIncluded = false
  }

  close() { this.closed.emit() }

  constructor(private controlService: ControlMessageService, private service: GridFormService, private formBuilder: UntypedFormBuilder) { }

  ngOnChanges(UpdatedValue: string): void {
    this.form?.reset()
    this.data = {}
    this.showGrids = false
    this.setGrid()
    this.formType == 'Add' ? this.getNotCoverdParameter() : this.get()
  }

}
