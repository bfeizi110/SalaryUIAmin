import { Component } from '@angular/core';

import { AlertClass } from 'src/app/main/main-body/common/alert/alert-functions'
import { ContextMenuService } from 'src/app/main/main-body/common/context-menu.service';
import { CustomGridOption } from 'src/app/main/main-body/common/custom-ag-grid/interfaces/ag-grid-option.interface'
import { GridFormService } from 'src/app/main/main-body/common/grid-form.service'
import { PersonMissionInfoAttr, setPersonMissionInfoAttr } from '../../../../global-attr'

const Controller = 'PersonMissionInfo'

@Component({
  templateUrl: './person-mission-info.component.html',
  styleUrls: ['./person-mission-info.component.scss']
})
export class PersonMissionInfoComponent {

  Controller = Controller
  showThisYearMission: boolean = false
  filterDto: any
  showSelectPerson: boolean = false
  personData = []
  showGrid: boolean = false
  setPID: number
  currentTab:number = 0
  selectedPersonelNF: any
  
  async onFilter(dto) {
    this.showGrid = false
    !this.formObj ? await this.getAttr() : null
    this.filterDto = dto
    this.service.post(`Person/GetFilterSelect`, dto).subscribe((res: any) => {
      this.personData = res.Data
      this.showSelectPerson = true
      let id = this.contextMenuService.id
      if (id) {
        this.setPID = id
        this.onSelectPersonnel(id)
      }
    })
    if (this.currentTab == 2)
      this.getSelectThisYear()
  }

  PID: number
  async onSelectPersonnel(id) {
    this.PID = id
    this.cardexOptions.PID = id
    this.getSelect()
    this.selectedPersonList = []
    this.showGrid = false
    this.showForm = false
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
  gridOptionThisYear = <CustomGridOption>{
  }

  formObj: any
  getAttr() {
    return new Promise(resolve => {
      this.showGrid = false
      if (!PersonMissionInfoAttr) {
        this.service.getAttr(Controller).subscribe((res: any) => {
          this.setAttr(res.Data, 'toLocal')
          return resolve(true)
        })
      }
      else {
        this.setAttr(PersonMissionInfoAttr)
        return resolve(true)
      }
    })
  }

  multiSelectPersonnel: boolean = false
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
    this.cardexOptions = { Controller: Controller, columnDefs: attr }
    type == 'toLocal' ? setPersonMissionInfoAttr(attr) : null
  }

  getSelect() {
    this.showGrid = false
    this.service.getSelect(`${Controller}`,`${this.PID}`).subscribe((res: any) => {
      this.gridOption.rowData = res.Data
      this.showGrid = true
      setTimeout(() => {
        this.service.scrollToElement('person-mission-tab')
      }, 200); 
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

  showGeneralPerson: boolean = true
  submited(type) {
    this.closeForm(3)
    if (!type) return
    if (type == 'multi') {
      this.showSelectPerson = false
      this.showGeneralPerson = false
      setTimeout(() => {
        this.showSelectPerson = true
        this.showGeneralPerson = true
      })
    }
    else this.getSelect()
  }

  closeForm(event: any) {
    this.selectedIdList = []
    this.selectedPersonList = []
    this.formType = ''
    this.showForm = false
    this.currentTab = event.index
    if (this.currentTab == 2)
    {
      this.getSelectThisYear()
    }
  }

  async getSelectThisYear() {
    this.showThisYearMission = false
    !this.formThisYearObj ? await this.getThisYearAttr() : null
    this.service.post(Controller + `/GetSelectAllSumThisYear`, this.filterDto).subscribe((res: any) => {
      this.gridOptionThisYear.rowData = res.Data
      this.showThisYearMission = true
    })
  }

  formThisYearObj: any
  getThisYearAttr() {
    return new Promise(resolve => {
        this.service.get(Controller + '/GetAttributeSelectAllSumThisYear').subscribe((res: any) => {
          this.gridOptionThisYear.columnDefs = res.Data
          this.formThisYearObj = res.Data.EntityAttribute
                return resolve(true)
        })
    })
  }

  cardexOptions

  constructor(private service: GridFormService, private contextMenuService: ContextMenuService) { }
}
