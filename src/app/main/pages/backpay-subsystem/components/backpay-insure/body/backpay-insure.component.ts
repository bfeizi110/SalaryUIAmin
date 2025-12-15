import { Component } from '@angular/core';

import { AlertClass } from 'src/app/main/main-body/common/alert/alert-functions'
import { ContextMenuService } from 'src/app/main/main-body/common/context-menu.service';
import { CustomGridOption } from 'src/app/main/main-body/common/custom-ag-grid/interfaces/ag-grid-option.interface'
import { GridFormService } from 'src/app/main/main-body/common/grid-form.service'
import { BackPayInsureAttr, setBackPayInsureAttr } from 'src/app/main/pages/global-attr'

const Controller = 'BackPayInsure'

@Component({
  templateUrl: './backpay-insure.component.html',
  styleUrls: ['./backpay-insure.component.scss']
})

export class BackPayInsureComponent {

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
      this.showForm = true
    }
    this.showDetail = false
  }

  showForm: boolean = false
  formType: string = ''
  gridOption = <CustomGridOption>{
    actions: [
      {
        label: 'Delete',
        callback: this.delete.bind(this)
      },
    ],
    controllerName: Controller,
    rowDoubleClicked: this.view.bind(this),
    rowClicked: this.rowClicked.bind(this)
  }

  semiBackpaySelectedId: number
  showDetail: boolean = false
  rowClicked(event) {
    this.semiBackpaySelectedId = event.data.Id
    this.showDetail = true
    this.showForm = false
  }

  formObj: any
  getAttr() {
    return new Promise(resolve => {
      let Attr = BackPayInsureAttr()
      if (!Attr) {
        this.service.getAttr(Controller).subscribe((res: any) => {
          this.setAttr(res.Data, 'toLocal')
          return resolve(true)
        })
      }
      else {
        this.setAttr(Attr)
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
    type == 'toLocal' ? setBackPayInsureAttr(attr) : null
  }

  getSelect() {
    this.showGrid = false
    this.service.getByIdSimple(`${Controller}/GetSelect`,`${this.PID}`).subscribe((res: any) => {
      this.gridOption.rowData = res.Data
      this.showGrid = true
      setTimeout(() => {
        this.service.scrollToElement('backpayinsure-tab')        
      }, 200);
    })
  }

  ID: number

  view(event) {
    this.ID = event.data.Id
    this.showDetail = false
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
      })
    }
    else this.getSelect()
  }

  mainTabChange() {
    this.showDetail = false
    this.closeForm()
  }

  closeForm() {
    this.selectedPersonList = []
    this.formType = ''
    this.showForm = false
  }

  constructor(private service: GridFormService, private contextMenuService: ContextMenuService) { }

}
