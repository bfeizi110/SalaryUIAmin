import { Component } from '@angular/core'
import { Router } from '@angular/router'

import { AlertClass } from 'src/app/main/main-body/common/alert/alert-functions'
import { ContextMenuService } from 'src/app/main/main-body/common/context-menu.service'
import { CustomGridOption } from 'src/app/main/main-body/common/custom-ag-grid/interfaces/ag-grid-option.interface'
import { GridFormService } from 'src/app/main/main-body/common/grid-form.service'

@Component({
  templateUrl: './person-insure-info.component.html',
  styleUrls: ['./person-insure-info.component.scss']
})
export class PersonInsureInfoComponent {
  insureCode: number
  controller: string
  filterDto: any
  showSelectPerson: boolean = false
  personData = []
  showGrid: boolean = false
  selectedPersonelNF: any
  
  setPID: number
  async onFilter(dto) {
    this.showGrid = false
    !this.formObj ? await this.getAttr() : null
    this.service.post(this.controller == 'PersonInsureInfoBaz' ? 'PersonBaz/GetFilterSelectBazMov' : `Person/GetFilterSelect`, dto).subscribe((res: any) => {
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
    this.cardexOptionsCalc.PID = id
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
      this.showGrid = false
      this.service.getAttr(this.controller).subscribe((res: any) => {
        this.gridOption.columnDefs = res.Data

        let accesses: string[] = res.Data.EntityAccess
        this.canEdit = accesses.includes('EditPolicy')
        this.canDelete = accesses.includes('DeletePolicy')
        this.canAdd = accesses.includes('AddPolicy')

        this.formObj = res.Data.EntityAttribute
        !this.cardexOptions ? this.cardexOptions = {
          Controller: this.controller,
          ComboType: `Insure/GetSelectInsurePerson`,
          ComboTitle: 'انتخاب بیمه',
          PID: this.PID,
          IsCalc: false,
          columnDefs: res.Data
        } : null
        !this.cardexOptionsCalc ? this.cardexOptionsCalc = {
          Controller: this.controller,
          ComboType: `Insure/GetSelectInsurePerson`,
          ComboTitle: 'انتخاب بیمه',
          PID: this.PID,
          IsCalc: true,
          columnDefs: res.Data
        } : null

        return resolve(true)
      })
    })
  }

  canEdit: boolean = false
  canDelete: boolean = false
  canAdd: boolean = false
  getSelect() {
    this.showGrid = false
    this.service.getSelect(this.controller, this.PID).subscribe((res: any) => {
      this.gridOption.rowData = res.Data
      this.showGrid = true
      setTimeout(() => {
        this.service.scrollToElement('person-insrure-tab')
      }, 200); 
    })
  }

  add() {
    this.showForm = true
    this.formType = 'Add'
  }

  ID
  typeInsId: number
  edit(event) {
    this.ID = event.rowData.Id
    this.typeInsId = event.rowData.TypeInsure_Fld
    this.formType = 'Edit'
    this.showForm = true
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
    this.typeInsId = event.data.TypeInsure_Fld
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
  submited(type) {
    this.closeForm()
    if (type === false) return
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

  closeForm() {
    this.selectedIdList = []
    this.selectedPersonList = []
    this.formType = ''
    this.showForm = false
  }

  cardexOptions
  cardexOptionsCalc
  pathUrl: string
  constructor(private service: GridFormService, private contextMenuService: ContextMenuService, router: Router) {
    this.pathUrl = router.url
    console.log(this.pathUrl);
    if (router.url.includes('tadris-subsystem')) this.controller = 'PersonInsureInfoTadris'
    else if (this.pathUrl.includes('baz-subsystem')) this.controller = 'PersonInsureInfoBaz'
    else this.controller = 'PersonInsureInfo'
    this.gridOption.controllerName = this.controller
  }
}
