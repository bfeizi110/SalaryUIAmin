import { Component, OnInit } from '@angular/core'

import { AlertClass } from 'src/app/main/main-body/common/alert/alert-functions'
import { CustomGridOption } from 'src/app/main/main-body/common/custom-ag-grid/interfaces/ag-grid-option.interface'
import { GridFormService } from 'src/app/main/main-body/common/grid-form.service'
import { setTaxAttr, TaxAttr } from 'src/app/main/pages/global-attr'

const Controller = 'Tax'

@Component({
  templateUrl: './tax.component.html',
  styleUrls: ['./tax.component.scss']
})

export class TaxComponent implements OnInit {

  showTaxBaseTable: boolean = false
  showTaxBaseTableDetail: boolean = false

  tabChange(index) {
    if (index == 0) this.showTaxBaseTable = true
    else this.getAttr()
  }

  taxBaseTable_Code: number
  rowClicked(code_fld) {
    this.showTaxBaseTableDetail = false
    this.taxBaseTable_Code = code_fld
    setTimeout(() => {
      this.showTaxBaseTableDetail = true
      setTimeout(() => this.service.scrollToElement('tax-base-table-detail'), 100)
    })
  }

  showGrid: boolean = false

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

  getAttr() {
    this.showGrid = false
    !TaxAttr
      ? this.service.getAttr(Controller).subscribe((res: any) => this.setAttr(res.Data, 'toLocal'))
      : this.setAttr(TaxAttr)
  }

  setAttr(attr, type?) {
    this.gridOption.columnDefs = attr
    this.formObj = attr.EntityAttribute
    type == 'toLocal' ? setTaxAttr(attr) : null
    this.getSelect()
  }

  formObj: any
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

  ngOnInit(): void {
    this.showTaxBaseTable = true
  }

}
