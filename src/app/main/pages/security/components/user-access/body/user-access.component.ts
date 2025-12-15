import { GridOptions } from 'ag-grid-community';
import { Component, EventEmitter, OnInit, Output } from '@angular/core'
import { AlertClass } from 'src/app/main/main-body/common/alert/alert-functions'
import { CustomGridOption } from 'src/app/main/main-body/common/custom-ag-grid/interfaces/ag-grid-option.interface'
import { GridFormService } from 'src/app/main/main-body/common/grid-form.service'
import { UserAccessAttr, setUserAccessAttr } from 'src/app/main/pages/global-attr'

const Controller = 'Users'

@Component({
  templateUrl: './user-access.component.html',
  styleUrls: ['./user-access.component.scss']
})
export class UserAccessComponent implements OnInit {


  @Output() deselectAll = new EventEmitter()
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
      },
      {
        label: 'Access',
        callback: this.access.bind(this)
      }
    ],
    controllerName: Controller,
    checkboxSelection: true,
    rowClicked: this.view.bind(this),
    rowSelected: this.rowSelected.bind(this)
  }

  selectedList = []
  selected: string
  rowSelected(event) { 
    this.showForm = false
    this.selectedList.includes(event.data.Id) ? this.selectedList = this.selectedList.filter(a => a != event.data.Id) : this.selectedList.push(event.data.Id) 
    this.selected = this.selectedList.toString()
    
    if (this.selectedList && this.selectedList.length !=0)
    {
      this.formType =  'Multi' 
      this.showForm = true
    }
    else 
      this.formType = 'View'
  }

  formObj: any
  getAttr() {
    this.showGrid = false
    let Attr = UserAccessAttr()
    !Attr
      ? this.service.getAttr(`${Controller}`).subscribe((res: any) => this.setAttr(res.Data, 'toLocal'))
      : this.setAttr(Attr)
  }

  setAttr(attr, type?) {
    this.gridOption.columnDefs = attr
    this.formObj = attr.EntityAttribute
    type == 'toLocal' ? setUserAccessAttr(attr) : null
    this.getSelect()
  }

  getSelect() {
    this.showGrid = false
    this.service.getSelect(Controller, null).subscribe((res: any) => {
      this.gridOption.rowData = res.Data
      this.showGrid = true
    })
  }

  add() {
    this.showForm = true
    this.formType = 'Add'
  }

  edit(event) {
    this.ID = event.rowData.Id
    this.showForm = true
    this.formType = 'Edit'
  }

  ID: number
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

  showAccesses: boolean = false
  access(event) {
    this.option.RoleId = event.rowData.Id
    this.showAccesses = true
    this.showForm = false
  }

  submited(newData) {
    this.closeForm()
    if (!newData) return
    this.showGrid = false
    this.selected = ""
    this.selectedList = []
    this.gridOption.rowData = newData
    setTimeout(() => this.showGrid = true, 100)
  }

  closeForm() {
    this.formType = ''
    this.showForm = false
    this.selected = ""
    this.deselectAll.emit();
  }

  closeAccess() {
    this.showAccesses = false
  }

  option = {
    UserGroupType: 'UserType',
    FromController: 'User',
    Controller: 'AccessUser',
    RoleId: null
  }

  constructor(private service: GridFormService) { }

  ngOnInit(): void { this.getAttr() }
}
