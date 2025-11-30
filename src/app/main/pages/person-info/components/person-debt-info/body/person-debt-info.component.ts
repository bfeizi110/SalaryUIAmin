import { Component } from '@angular/core'
import { Router } from '@angular/router'

import { AlertClass } from 'src/app/main/main-body/common/alert/alert-functions'
import { ContextMenuService } from 'src/app/main/main-body/common/context-menu.service'
import { CustomGridOption } from 'src/app/main/main-body/common/custom-ag-grid/interfaces/ag-grid-option.interface'
import { GridFormService } from 'src/app/main/main-body/common/grid-form.service'
import { PersonDebtInfoAttr, setPersonDebtInfoAttr } from 'src/app/main/pages/global-attr'

@Component({
  templateUrl: './person-debt-info.component.html',
  styleUrls: ['./person-debt-info.component.scss']
})

export class PersonDebtInfoComponent {

  debtCode: number

  filterDto: any
  showSelectPerson: boolean = false
  personData = []
  showGrid: boolean = false
  setPID: number
  selectedPersonelNF: any
  
  async onFilter(dto) {
    this.showGrid = false
    !this.formObj ? await this.getAttr() : null
    this.service.post(this.controller == 'PersonDebtInfoBaz' ? 'PersonBaz/GetFilterSelectBazMov' : `Person/GetFilterSelect`, dto).subscribe((res: any) => {
      this.personData = res.Data
      this.filterDto = dto
      this.showSelectPerson = true
      let id = this.contextMenuService.id
      if (id) {
        this.setPID = id
        this.onSelectPersonnel(id)
      }
      //   else this.toastr.error('فرد وجود ندارد', 'حطا')
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
      let Attr = PersonDebtInfoAttr()
      if (!Attr) {
        this.showGrid = false
        this.service.getAttr(this.controller).subscribe((res: any) => {
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

  cardexOptions: any = {}
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

    this.cardexOptions = {
      Controller: this.controller,
      ComboType: 'Debt',
      ComboTitle: 'انتخاب وام',
      columnDefs: attr
    }
    type == 'toLocal' ? setPersonDebtInfoAttr(attr) : null
  }

  getSelect() {
    this.showGrid = false
    this.service.getSelect(this.controller, this.PID).subscribe((res: any) => {
      this.gridOption.rowData = res.Data
      this.showGrid = true
      setTimeout(() => {
        this.service.scrollToElement('person-debt-tab')
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

  closeForm() {
    this.selectedIdList = []
    this.selectedPersonList = []
    this.formType = ''
    this.showForm = false
  }

  pathUrl: string
  controller: string
  constructor(private service: GridFormService, private contextMenuService: ContextMenuService, router: Router) {
    this.pathUrl = router.url
    if (this.pathUrl.includes('baz-subsystem')) this.controller = 'PersonDebtInfoBaz'
    else this.controller = 'PersonDebtInfo'
    this.gridOption.controllerName = this.controller
  }

}
