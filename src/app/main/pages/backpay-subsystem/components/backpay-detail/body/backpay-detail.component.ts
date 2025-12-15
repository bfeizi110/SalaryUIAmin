import { Component } from '@angular/core';

import { AlertClass } from 'src/app/main/main-body/common/alert/alert-functions'
import { ContextMenuService } from 'src/app/main/main-body/common/context-menu.service';
import { CustomGridOption } from 'src/app/main/main-body/common/custom-ag-grid/interfaces/ag-grid-option.interface'
import { GridFormService } from 'src/app/main/main-body/common/grid-form.service'
import { SemiBackPayAttr, setSemiBackPayAttr } from 'src/app/main/pages/global-attr'

const Controller = 'BackpayDetail'

@Component({
  templateUrl: './backpay-detail.component.html',
  styleUrls: ['./backpay-detail.component.scss']
})

export class BackpayDetailComponent {

  Controller = Controller
  filterDto: any
  showSelectPerson: boolean = false
  personData = []
  showGrid: boolean = false
  selectedPersonelNF: any
  setPID: number
  
  async onFilter(dto) {
    !this.formObj ? await this.getAttr() : null
    this.service.post(`Person/GetFilterSelect`, dto).subscribe((res: any) => {
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
    this.cardexOptions.PID = id
    this.getSelect()
    this.selectedPersonList = []
    this.showGrid = false
    this.showForm = false
    this.showDetail = false
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
    this.showDetail = false
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
    controllerName: Controller,
    rowDoubleClicked: this.view.bind(this),
    rowClicked: this.rowClicked.bind(this)
  }

  semiBackpaySelectedId: number
  showDetail: boolean = false
  rowClicked(event) {
    this.semiBackpaySelectedId = event.data.Id
    this.backPayType = event.data.BackPayType_Fld
    this.showDetail = true
    this.showForm = false
  }

  formObj: any
  getAttr() {
    return new Promise(resolve => {
      if (!SemiBackPayAttr) {
        this.service.getAttr(Controller).subscribe((res: any) => {
          this.setAttr(res.Data, 'toLocal')
          return resolve(true)
        })
      }
      else {
        this.setAttr(SemiBackPayAttr)
        return resolve(true)
      }
    })
  }

  cardexOptions
  canEdit: boolean = false
  canDelete: boolean = false
  canAdd: boolean = false
  setAttr(attr, type?) {
    this.gridOption.columnDefs = attr

    let accesses: string[] = attr.EntityAccess
    this.canEdit = accesses.includes('EditPolicy')
    this.canDelete = accesses.includes('DeletePolicy')
    this.canAdd = accesses.includes('AddPolicy')

    this.formObj = attr.EntityAttribute
    this.cardexOptions = { Controller: Controller, columnDefs: attr }
    type == 'toLocal' ? setSemiBackPayAttr(attr) : null
  }

  getSelect() {
    this.showGrid = false
    this.service.getSelect(`${Controller}`,`${this.PID}`).subscribe((res: any) => {
      this.gridOption.rowData = res.Data
      this.showGrid = true
      setTimeout(() => {
        this.service.scrollToElement('semibackpay-tab')        
      }, 200);
    })
  }

  add() {
    this.selectedPersonList = []
    this.showForm = true
    this.showDetail = false
    this.formType = 'Add'
  }

  ID: number
  backPayType: number
  edit(event) {
    this.selectedPersonList = []
    this.ID = event.rowData.Id
    this.showForm = true
    this.showDetail = false
    this.formType = 'Edit'
  }

  selectedIdList = []
  onMultiEdit(ids) {
    this.selectedIdList = ids.toString()
    if (ids.length > 0) {
      this.formType = 'Edit'
      this.showForm = true
    }
    this.showDetail = false
  }

  view(event) {
    this.ID = event.data.Id
    this.showForm = true
    this.showDetail = false
    this.formType = 'View'
  }

  delete(event) {
    AlertClass.deleteAlert(_ => {
      this.service.delete(Controller, event.rowData.Id).subscribe((res: any) => {
        this.showGrid = false
        this.showForm = false
        this.gridOption.rowData = res.Data
        this.selectedPersonList = []
        setTimeout(() => this.showGrid = true, 100)
      })
    })
    this.showDetail = false
  }

  showGeneralPerson: boolean = true
  submited(type) {
    this.closeForm()
    if (type == 'multi') {
      this.showSelectPerson = false
      this.showGeneralPerson = false
      setTimeout(() => {
        this.showSelectPerson = true
        this.showGeneralPerson = true
      }, 100)
    }
    else this.getSelect()
  }

  mainTabChange() {
    this.showDetail = false
    this.closeForm()
  }

  closeForm() {
    this.selectedIdList = []
    this.selectedPersonList = []
    this.formType = ''
    this.showForm = false
  }

  constructor(private service: GridFormService, private contextMenuService: ContextMenuService) { }

}
