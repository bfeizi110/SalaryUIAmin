import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AlertClass } from 'src/app/main/main-body/common/alert/alert-functions'
import { ContextMenuService } from 'src/app/main/main-body/common/context-menu.service'
import { CustomGridOption } from 'src/app/main/main-body/common/custom-ag-grid/interfaces/ag-grid-option.interface'
import { GridFormService } from 'src/app/main/main-body/common/grid-form.service'
import { HistoryChildAttr, setHistoryChildAttr } from '../../../../global-attr'

@Component({
  templateUrl: './history-child.component.html',
  styleUrls: ['./history-child.component.scss']
})
export class HistoryChildComponent {

  filterDto: any
  showSelectPerson: boolean = false
  personData = []
  showGrid: boolean = false
  setPID: number
  selectedPersonelNF: any
  
  async onFilter(dto) {
    this.showGrid = false
    !this.formObj ? await this.getAttr() : null
    this.service.post(this.controller == 'HistoryChildBaz' ? 'PersonBaz/GetFilterSelectBazMov' : `Person/GetFilterSelect`, dto).subscribe((res: any) => {
      this.personData = res.Data
      this.filterDto = dto
      this.showSelectPerson = true
      let id = this.contextMenuService.id
      if (id) {
        this.setPID = id
        this.onSelectPersonnel(id)
      }
    })
  }

  PID: number
  async onSelectPersonnel(id) {
    this.PID = id
    this.getSelect()
    this.selectedPersonList = []
    this.showGrid = false
    this.showForm = false
  }

  onSelectPersonnelDetail(id) {
    this.PID = id
    this.ID = null
    this.formType = ''
    this.getSelect()
    this.showForm = false
  }

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
    rowClicked: this.view.bind(this)
  }

  formObj: any
  getAttr() {
    return new Promise(resolve => {
      if (!HistoryChildAttr) {
        this.showGrid = false
        this.service.getAttr(this.controller).subscribe((res: any) => {
          this.setAttr(res.Data, 'toLocal')
          return resolve(true)
        })
      }
      else {
        this.setAttr(HistoryChildAttr)
        return resolve(true)
      }
    })
  }

  canEdit: boolean = false
  canDelete: boolean = false
  canAdd: boolean = false
  setAttr(attr, type?) {
    this.gridOption.columnDefs = attr
    this.formObj = attr.EntityAttribute
    let accesses: string[] = attr.EntityAccess
    this.canEdit = accesses.includes('EditPolicy')
    this.canDelete = accesses.includes('DeletePolicy')
    this.canAdd = accesses.includes('AddPolicy')
    type == 'toLocal' ? setHistoryChildAttr(attr) : null
  }

  getSelect() {
    this.showGrid = false
    this.service.getSelect(this.controller, this.PID).subscribe((res: any) => {
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

  selectedIdList = []
  onMultiEdit(ids) {
    this.selectedIdList = ids.toString()
    if (ids.length > 0) {
      this.formType = 'Edit'
      this.showForm = true
    }
  }

  selectedPersonList = []
  async rowSelectedList(idArray) {
    this.showForm = false
    this.selectedPersonList = idArray.toString()
    if (idArray.length > 0) {
      this.showGrid = false
      this.formType = 'Add'
      this.showForm = true
    }
  }

  view(event) {
    this.ID = event.data.Id
    this.showForm = true
    this.formType = 'View'
  }

  delete(event) {
    AlertClass.deleteAlert(_ => {
      this.service.delete(this.controller, event.rowData.Id).subscribe((res: any) => {
        this.showGrid = false
        this.showForm = false
        this.gridOption.rowData = res.Data
        setTimeout(() => this.showGrid = true, 100)
      })
    })
  }

  showGeneralPerson: boolean = true
  showGeneralTab: boolean = true
  submited(type) {
    this.closeForm()
    if (type == 'multi') {
      this.showGeneralTab = false
      setTimeout(() => this.showGeneralTab = true)
    }
    else this.getSelect()
  }

  closeForm() {
    this.selectedIdList = []
    this.selectedPersonList = []
    this.formType = ''
    this.showForm = false
  }

  controller: string
  pathUrl: string
  constructor(private service: GridFormService, private contextMenuService: ContextMenuService, router: Router) {
    this.pathUrl = router.url
    if (this.pathUrl.includes('baz-subsystem')) this.controller = 'HistoryChildBaz'
    else this.controller = 'HistoryChild'
    this.gridOption.controllerName = this.controller
  }
}
