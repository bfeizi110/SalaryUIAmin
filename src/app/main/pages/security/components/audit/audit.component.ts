import { Component, OnInit } from '@angular/core'
import { CustomGridOption } from 'src/app/main/main-body/common/custom-ag-grid/interfaces/ag-grid-option.interface'
import { GridFormService } from 'src/app/main/main-body/common/grid-form.service'
import { AuditAttr, AuditPropAttr, setAuditAttr, setAuditPropAttr } from '../../../global-attr'
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms'
import { Validation } from 'src/app/main/main-body/common/custom-form/control-message/Validation'

const Controller = 'Audit'

@Component({
  templateUrl: './audit.component.html',
  styleUrls: ['./audit.component.scss']
})
export class AuditComponent implements OnInit {

  gridOption = <CustomGridOption>{
    controllerName: Controller,
    rowClicked: this.onRowClicked.bind(this),
  }

  gridOptionProp = <CustomGridOption>{}

  showGridProp: boolean = false
  parentId: number
  onRowClicked(event) {
    this.parentId = event.data.Id
    this.showGridProp = false
    this.getAttrProp()
  }

  formObj: any
  showGrid: boolean = false
  getAttr() {
    this.showGrid = false
    !AuditAttr
      ? this.service.getAttr(Controller).subscribe((res: any) => this.setAttr(res.Data, 'toLocal'))
      : this.setAttr(AuditAttr)
  }

  setAttr(attr, type?) {
    this.gridOption.columnDefs = attr
    this.formObj = attr.EntityAttribute
    type == 'toLocal' ? setAuditAttr(attr) : null
    this.setForm()
  }

  getAttrProp() {
    this.showGridProp = false
    !AuditPropAttr
      ? this.service.get(`${Controller}/GetAttributeProperty`).subscribe((res: any) => this.setAttrProp(res.Data, 'toLocal'))
      : this.setAttrProp(AuditPropAttr)
  }

  setAttrProp(attr, type?) {
    this.gridOptionProp.columnDefs = attr
    type == 'toLocal' ? setAuditPropAttr(attr) : null
    this.getSelectProp()
  }

  getSelectProp() {
    this.service.getByIdSimple(Controller, this.parentId).subscribe((res: any) => {
      this.gridOptionProp.rowData = res.Data
      this.showGridProp = true
    })
  }

  form: UntypedFormGroup
  setForm() {
    Validation.form = this.formObj
    this.form = this.formBuilder.group({
      PersonID: [{ value: null, disabled: Validation.disable('PersonID') }, Validation.setValidator('PersonID')],
      FromDate: [{ value: null, disabled: Validation.disable('FromDate') }, Validation.setValidator('FromDate')],
      ToDate: [{ value: null, disabled: Validation.disable('ToDate') }, Validation.setValidator('ToDate')],
      EntitySetName: [{ value: null, disabled: Validation.disable('EntitySetName') }, Validation.setValidator('EntitySetName')],
      State: [{ value: null, disabled: Validation.disable('State') }, Validation.setValidator('State')],
      FormType:[{value: ''}]
    })
    this.showForm = true
  }

  onSelectPersonnel(PID) { this.form.controls.PersonID.patchValue(PID) }

  entityArray = []
  getEntity() { this.entityArray.length == 0 ? this.service.get('Entity/GetComboNew/100922').subscribe((res: any) => this.entityArray = res.Data) : null }

  stateArray = []
  getState() { this.stateArray.length == 0 ? this.service.getCombo('OtherDetail/10080').subscribe((res: any) => this.stateArray = res.Data) : null }

  showForm: boolean = false

  filter() {
    this.showGrid = false
    let fakeFormValue = { ...this.form.getRawValue() }
    this.fixMultiCombo(fakeFormValue)
    this.service.post(`${Controller}/GetAuditLogByFilter`, fakeFormValue).subscribe((res: any) => {
      this.gridOption.rowData = res.Data
      this.showGrid = true
    })
  }

  fixMultiCombo(form) {
    if (form.State) form.State = form.State.toString()
    if (form.EntitySetName) form.EntitySetName = form.EntitySetName.toString()
  }

  refresh() {
    this.form.patchValue({ FromDate: null, ToDate: null, EntitySetName: null, State: null })
    this.showGrid = false
  }

  showSelectPerson: boolean = true
  clearPerson() {
    this.showSelectPerson = false
    this.form.controls.PersonID.patchValue(null)
    setTimeout(() => this.showSelectPerson = true)
  }

  constructor(private service: GridFormService, private formBuilder: UntypedFormBuilder) { }

  ngOnInit(): void {
    this.getAttr()
    this.getEntity()
    this.getState()
  }

}
