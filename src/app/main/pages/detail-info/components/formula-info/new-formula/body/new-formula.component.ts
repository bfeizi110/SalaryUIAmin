import { Component, OnInit } from '@angular/core'

import { AlertClass } from 'src/app/main/main-body/common/alert/alert-functions'
import { CustomGridOption } from 'src/app/main/main-body/common/custom-ag-grid/interfaces/ag-grid-option.interface'
import { GridFormService } from 'src/app/main/main-body/common/grid-form.service'
import { NewFormulaAttr, setNewFormulaAttr } from '../../../../../global-attr'

const Controller = 'NewFormula'

@Component({
  templateUrl: './new-formula.component.html',
  styleUrls: ['./new-formula.component.scss']
})

export class NewFormulaComponent implements OnInit {

  showGrid: boolean = false

  showForm: boolean = false
  formType: string = ''
  gridOption = <CustomGridOption>{
    actions: [
      {
        label: 'Edit',
        callback: this.edit.bind(this)
      },
      {
        label: 'Delete',
        callback: this.delete.bind(this)
      },
      {
        label: 'Add',
        callback: this.add.bind(this)
      }
    ],
    controllerName: Controller,
    rowClicked: this.rowClicked.bind(this)
  }

  newFormulaId: number
  showNewFormula = false
  rowClicked(event) {
    this.newFormulaId = event.data.Code_Fld
    this.showNewFormula = true
  }

  formObj: any
  getAttr() {
    this.showGrid = false
    !NewFormulaAttr
      ? this.service.getAttr(Controller).subscribe((res: any) => this.setAttr(res.Data, 'toLocal'))
      : this.setAttr(NewFormulaAttr)
  }

  setAttr(attr, type?) {
    this.gridOption.columnDefs = attr
    this.formObj = attr.EntityAttribute
    type == 'toLocal' ? setNewFormulaAttr(attr) : null
    this.getSelect()
  }

  getSelect() {
    this.showGrid = false
    this.service.getSelect(Controller).subscribe((res: any) => {
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
    this.newFormulaId = event.rowData.Code_Fld
    this.ID = event.rowData.Id
    this.showForm = true
    this.formType = 'Edit'
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

  ngOnInit(): void {
    this.getAttr()
  }


}
