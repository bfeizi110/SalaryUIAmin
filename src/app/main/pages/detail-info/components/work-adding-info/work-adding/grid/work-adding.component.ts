import { Component, OnInit } from '@angular/core'

import { AlertClass } from 'src/app/main/main-body/common/alert/alert-functions'
import { CustomGridOption } from 'src/app/main/main-body/common/custom-ag-grid/interfaces/ag-grid-option.interface'
import { GridFormService } from 'src/app/main/main-body/common/grid-form.service'
import { setWorkAddingAttr, WorkAddingAttr } from '../../../../../global-attr'

const Controller = 'WorkAdding'

@Component({
  templateUrl: './work-adding.component.html',
  styleUrls: ['./work-adding.component.scss']
})

export class WorkAddingComponent {

  hireTypeList = []
  clickCombo() { this.hireTypeList.length == 0 ? this.service.getCombo('HireType').subscribe((res: any) => this.hireTypeList = res.Data) : null }

  refreshCombo() {
    this.hireTypeList = []
    this.clickCombo()
  }

  hireTypeId: number
  showGrid: boolean = false
  hireTypeChange(id) {
    this.showForm = false
    this.showGrid = false
    this.hireTypeId = id
    this.getAttr()
  }

  showForm: boolean = false
  formType: string = ''
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
    rowClicked: this.view.bind(this)
  }

  formObj: any
  getAttr() {
    !WorkAddingAttr
      ? this.service.getAttr(Controller).subscribe((res: any) => this.setAttr(res.Data, 'toLocal'))
      : this.setAttr(WorkAddingAttr)
  }

  setAttr(attr, type?) {
    this.gridOption.columnDefs = attr
    this.formObj = attr.EntityAttribute
    type == 'toLocal' ? setWorkAddingAttr(attr) : null
    this.getSelect()
  }

  getSelect() {
    this.showGrid = false
    this.service.getSelect(Controller, this.hireTypeId).subscribe((res: any) => {
      this.gridOption.rowData = res.Data
      this.showGrid = true
    })
  }

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

  closeForm() {
    this.formType = ''
    this.showForm = false
  }

  constructor(private service: GridFormService) { }

}
