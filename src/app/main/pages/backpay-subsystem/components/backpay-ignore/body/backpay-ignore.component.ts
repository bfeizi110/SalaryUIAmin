import { Component, OnInit } from '@angular/core'
import { AlertClass } from 'src/app/main/main-body/common/alert/alert-functions'
import { CustomGridOption } from 'src/app/main/main-body/common/custom-ag-grid/interfaces/ag-grid-option.interface'
import { GridFormService } from 'src/app/main/main-body/common/grid-form.service'
import { BackPayIgnore, setBackPayIgnore } from 'src/app/main/pages/global-attr'

const Controller = 'BackPayIgnore'

@Component({
  templateUrl: './backpay-ignore.component.html',
  styleUrls: ['./backpay-ignore.component.scss']
})
export class BackpayIgnoreComponent implements OnInit {

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
    rowClicked: this.view.bind(this),
    checkboxSelection: true, rowSelected: this.rowSelected.bind(this)
  }

  selectedList = []
  rowSelected(event) { this.selectedList.includes(event.data.Id) ? this.selectedList = this.selectedList.filter(a => a != event.data.Id) : this.selectedList.push(event.data.Id) }

  formObj: any
  getAttr() {
    !BackPayIgnore
      ? this.service.getAttr(Controller).subscribe((res: any) => this.setAttr(res.Data, 'toLocal'))
      : this.setAttr(BackPayIgnore)
  }

  setAttr(attr, type?) {
    this.gridOption.columnDefs = attr
    this.formObj = attr.EntityAttribute
    type == 'toLocal' ? setBackPayIgnore(attr) : null
    this.getSelect()
  }

  showGrid: boolean = false
  getSelect() {
    this.selectedList = []
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

  deleteAll() { AlertClass.deleteAlert(_ => this.service.deleteByBody(`${Controller}/DeleteAll`, { IDCollect_Fld: this.selectedList.toString() }).subscribe(_ => this.getSelect())) }

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

  ngOnInit(): void { this.getAttr() }

  constructor(private service: GridFormService) { }

}
