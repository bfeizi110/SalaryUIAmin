import { Component, OnInit } from '@angular/core'
import { AlertClass } from 'src/app/main/main-body/common/alert/alert-functions'
import { CustomGridOption } from 'src/app/main/main-body/common/custom-ag-grid/interfaces/ag-grid-option.interface'
import { GridFormService } from 'src/app/main/main-body/common/grid-form.service'
import { CoveredBaseAttr, setCoveredBaseAttr } from 'src/app/main/pages/global-attr'

const Controller = 'CoveredBase'

@Component({
  templateUrl: './covered-base.component.html',
  styleUrls: ['./covered-base.component.scss']
})
export class CoveredBaseComponent implements OnInit {

  hireTypeList = []
  clickCombo() { this.hireTypeList.length == 0 ? this.service.getCombo('HireType').subscribe((res: any) => this.hireTypeList = res.Data) : null }

  refreshCombo() {
    this.hireTypeList = []
    this.clickCombo()
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
    rowClicked: this.view.bind(this)
  }

  hireId: number
  showGrid: boolean
  hireTypeChange(id) {
    this.showForm = false
    this.showGrid = false
    this.hireId = id
    this.service.getSelect(`${Controller}`,`${this.hireId}`).subscribe((res: any) => {
      this.gridOption.rowData = res.Data
      this.getAttr()
    })
  }

  attr: any
  getAttr() {
    this.showGrid = false
    !CoveredBaseAttr
      ? this.service.getAttr(Controller).subscribe((res: any) => this.setAttr(res.Data, 'toLocal'))
      : this.setAttr(CoveredBaseAttr)
  }


  setAttr(attr, type?) {
    this.gridOption.columnDefs = attr
    this.attr = attr
    type == 'toLocal' ? setCoveredBaseAttr(attr) : null
    this.showGrid = true
  }

  showForm: boolean = false
  formType: string = ''
  add() {
    this.ID = 0
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
    delete this.attr.EntityAttribute.Parameter_Fld.checkboxSelection
    delete this.attr.EntityAttribute.Parameter_Fld.headerCheckboxSelection
    delete this.attr.EntityAttribute.Parameter_Fld.headerCheckboxSelectionFilteredOnly
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

  ngOnInit(): void { }

}
