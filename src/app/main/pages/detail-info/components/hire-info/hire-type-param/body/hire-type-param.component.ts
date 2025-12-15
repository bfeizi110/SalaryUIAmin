import { Component, OnInit } from '@angular/core'
import { UntypedFormGroup } from '@angular/forms'

import { AlertClass } from 'src/app/main/main-body/common/alert/alert-functions'
import { CustomGridOption } from 'src/app/main/main-body/common/custom-ag-grid/interfaces/ag-grid-option.interface'
import { GridFormService } from 'src/app/main/main-body/common/grid-form.service'
import { HireTypeParamAttr, setHireTypeParamAttr } from 'src/app/main/pages/global-attr'

const Controller = 'HireTypeParam'
@Component({
  templateUrl: './hire-type-param.component.html',
  styleUrls: ['./hire-type-param.component.scss']
})

export class HireTypeParamComponent implements OnInit {

  showGrid: boolean = false

  showForm: boolean = false
  formType: string = ''

  comboList = []
  clickCombo() { this.comboList.length == 0 ? this.service.getCombo('HireType').subscribe((res: any) => this.comboList = res.Data) : null }

  refreshCombo() {
    this.comboList = []
    this.clickCombo()
  }

  hireId: number
  hireTypeChange() {
    this.showGrid = false
    this.showFormSetting = false
    this.service.getSelect(Controller, this.hireId).subscribe((res: any) => {
      this.gridOption.rowData = res.Data
      this.showGrid = true
    })
  }

  gridOption = <CustomGridOption>{
    actions: [
      {
        label: 'Edit',
        callback: this.edit.bind(this),
      },
      {
        label: 'Delete',
        callback: this.delete.bind(this)
      },
      {
        label: 'Add',
        callback: this.add.bind(this),
      }
    ],
    controllerName: Controller,
    rowClicked: this.rowClicked.bind(this)
  }

  rowClicked(event) {
    this.ID = event.data.Id
    this.showFormSetting = true
  }

  formObj: any
  getAttr() {
    this.showGrid = false
    !HireTypeParamAttr
      ? this.service.getAttr(Controller).subscribe((res: any) => this.setAttr(res.Data, 'toLocal'))
      : this.setAttr(HireTypeParamAttr)
  }

  setAttr(attr, type?) {
    this.gridOption.columnDefs = attr
    this.formObj = attr.EntityAttribute
    type == 'toLocal' ? setHireTypeParamAttr(attr) : null
  }

  form: UntypedFormGroup
  showCombo: boolean = false

  add() {
    this.showForm = true
    this.formType = 'Add'
  }

  ID
  edit(event) {
    this.ID = event.rowData.Id
    this.showForm = true
    this.formType = 'Edit'
  }

  view(event) {
    this.ID = event.data.Id
    this.showForm = true
    this.formType = 'View'
  }

  delete(event) {
    AlertClass.deleteAlert(_ => {
      this.service.delete(Controller, event.rowData.Id).subscribe((res: any) => {
        this.showGrid = false
        this.showForm = false
        this.gridOption.rowData = res.Data
        setTimeout(() => this.showGrid = true, 100)
      })
    })
  }

  submited(newData) {
    this.closeForm()
    if (!newData) return
    this.showGrid = false
    this.gridOption.rowData = newData
    setTimeout(() => this.showGrid = true, 100)
  }

  submitedSetting() {
    this.closeForm()
    this.showFormSetting = false
    this.hireTypeChange()
  }

  closeForm() {
    this.formType = ''
    this.showForm = false
  }

  showFormSetting: boolean = false
  closeFormSetting() {
    this.showFormSetting = false
  }

  constructor(private service: GridFormService) { }

  ngOnInit(): void { this.getAttr() }

}
