import { Component, OnInit } from '@angular/core'
import { AlertClass } from 'src/app/main/main-body/common/alert/alert-functions'
import { ContextMenuService } from 'src/app/main/main-body/common/context-menu.service'
import { CustomGridOption } from 'src/app/main/main-body/common/custom-ag-grid/interfaces/ag-grid-option.interface'
import { GridFormService } from 'src/app/main/main-body/common/grid-form.service'
import { PersonAssignSavingAttr, setPersonAssignSavingAttr } from '../../../../global-attr'

const Controller = 'PersonAssignIncreaseSaving'

@Component({
  templateUrl: './person-assign-increase-saving.component.html',
  styleUrls: ['./person-assign-increase-saving.component.scss']
})
export class PersonAssignIncreaseSavingComponent implements OnInit {

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
    controllerName: 'PersonAssignSaving',
    rowClicked: this.view.bind(this)
  }

  formObj: any
  getAttr() {
    return new Promise(resolve => {
      this.showGrid = false
      if (!PersonAssignSavingAttr) {
        this.service.getAttr('PersonAssignSaving').subscribe((res: any) => {
          this.setAttr(res.Data, 'toLocal')
          return resolve(true)
        })
      }
      else {
        this.setAttr(PersonAssignSavingAttr)
        return resolve(true)
      }
    })
  }

  setAttr(attr, type?) {
    this.gridOption.columnDefs = attr
    this.formObj = attr.EntityAttribute
    type == 'toLocal' ? setPersonAssignSavingAttr(attr) : null
  }

  getSelect() {
    this.showGrid = false
    this.service.getSelect('PersonAssignSaving', this.PID).subscribe((res: any) => {
      this.gridOption.rowData = res.Data
      this.showGrid = true
      setTimeout(() => {
        this.service.scrollToElement('person-assign-increase-saving')
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
      this.service.delete('PersonAssignSaving', event.rowData.Id).subscribe((res: any) => {
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

  ngOnInit(): void {
  }

}
