import { Component, OnInit } from '@angular/core'
import { AlertClass } from 'src/app/main/main-body/common/alert/alert-functions'
import { ContextMenuService } from 'src/app/main/main-body/common/context-menu.service'
import { CustomGridOption } from 'src/app/main/main-body/common/custom-ag-grid/interfaces/ag-grid-option.interface'
import { GridFormService } from 'src/app/main/main-body/common/grid-form.service'
import { PersonAssignDebtAttr, setPersonAssignDebtAttr } from '../../../../global-attr'

const Controller = 'PersonAssignSettleGuarantors'

@Component({
  templateUrl: './person-assign-settle-guarantors.component.html',
  styleUrls: ['./person-assign-settle-guarantors.component.scss']
})
export class PersonAssignSettleGuarantorsComponent {

  Controller = Controller
  filterDto: any
  showSelectPerson: boolean = false
  PID: number
  showGeneralPerson: boolean = false
  personCollapse: boolean = false
  personData = []
  showGrid: boolean = false
  openCloseGeneralPanel: boolean = false
  filterByClick: boolean = false
  setPID: number
  async onFilter(body) {
    !this.formObj ? await this.getAttr() : null
    this.filterByClick = body.byClick
    this.service.post(`Person/GetFilterSelect`, body).subscribe((res: any) => {
      this.personCollapse = false
      this.personData = res.Data
      this.filterDto = body
      this.showSelectPerson = true
      this.showGeneralPerson = true
      this.filterByClick ? this.openCloseGeneralPanel = true : null
      let id = this.contextMenuService.id
      if (id) {
        this.setPID = id
        this.onSelectPersonnel(id)
      }
    })
  }

  async onSelectPersonnel(id) {
    this.PID = id
    this.getSelect()
  }

  showFormPersonAssignDebt: boolean = false
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
    controllerName: 'PersonAssignDebt',
    rowClicked: this.view.bind(this)
  }

  formObj: any
  getAttr() {
    return new Promise(resolve => {
      this.showGrid = false
      if (!PersonAssignDebtAttr) {
        this.service.getAttr('PersonAssignDebt').subscribe((res: any) => {
          this.setAttr(res.Data, 'toLocal')
          return resolve(true)
        })
      }
      else {
        this.setAttr(PersonAssignDebtAttr)
        return resolve(true)
      }
    })
  }

  setAttr(attr, type?) {
    this.gridOption.columnDefs = attr
    this.formObj = attr.EntityAttribute
    type == 'toLocal' ? setPersonAssignDebtAttr(attr) : null
  }

  getSelect() {
    this.showGrid = false
    this.service.getSelect('PersonAssignDebt', this.PID).subscribe((res: any) => {
      this.gridOption.rowData = res.Data
      this.showGrid = true
      setTimeout(() => {
        this.service.scrollToElement('person-assing-settle-guarantors')
      }, 200); 
    })
  }

  formType: string = ''
  showTab: boolean = false
  add() {
    this.showTab = true
    this.formType = 'Add'
  }

  ID
  edit(event) {
    this.ID = event.rowData.Id
    this.showTab = true
    this.formType = 'Edit'
  }

  view(event) {
    this.ID = event.data.Id
    this.showTab = true
    this.formType = 'View'
  }

  delete(event) {
    AlertClass.deleteAlert(_ => {
      this.service.delete('PersonAssignDebt', event.rowData.Id).subscribe((res: any) => {
        this.showGrid = false
        this.showTab = false
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
    this.showTab = false
  }

  closeTab() {
    this.formType = ''
    this.showTab = false
  }

  constructor(private service: GridFormService, private contextMenuService: ContextMenuService) { }

}
