import { Component, OnInit } from '@angular/core'
import { AlertClass } from 'src/app/main/main-body/common/alert/alert-functions'
import { CustomGridOption } from 'src/app/main/main-body/common/custom-ag-grid/interfaces/ag-grid-option.interface'
import { GridFormService } from 'src/app/main/main-body/common/grid-form.service'
import { GroupAccessAttr, setGroupAccessAttr } from 'src/app/main/pages/global-attr'

const Controller = 'Group'

@Component({
  templateUrl: './group-access.component.html',
  styleUrls: ['./group-access.component.scss']
})
export class GroupAccessComponent implements OnInit {

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
      },
      {
        label: 'Access',
        callback: this.access.bind(this),
      }
    ],
    controllerName: Controller,
    rowClicked: this.view.bind(this)
  }

  formObj: any
  getAttr() {
    this.showGrid = false
    !GroupAccessAttr
      ? this.service.get(`${Controller}/GetRoleAttribute`).subscribe((res: any) => this.setAttr(res.Data, 'toLocal'))
      : this.setAttr(GroupAccessAttr)
  }

  setAttr(attr, type?) {
    this.gridOption.columnDefs = attr
    this.formObj = attr.EntityAttribute
    type == 'toLocal' ? setGroupAccessAttr(attr) : null
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

  edit(event) {
    this.ID = event.rowData.Id
    this.showForm = true
    this.formType = 'Edit'
  }

  ID: number
  view(event) {
    this.showForm = false
    this.ID = event.data.Id
    this.formType = 'View'
    setTimeout(() => {
      this.showForm = true
    }, 200); 
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
    this.showForm = false
    this.option.RoleId = event.rowData.Id
    this.showAccesses = true
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

  closeAccess() {
    this.showAccesses = false
  }

  option = {
    UserGroupType: 'GroupType',
    FromController: 'Group',
    Controller: 'AccessGroup',
    RoleId: null
  }

  constructor(private service: GridFormService) { }

  ngOnInit(): void { this.getAttr() }

}
