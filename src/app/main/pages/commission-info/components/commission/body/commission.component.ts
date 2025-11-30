import { Component } from '@angular/core'
import { Router } from '@angular/router'
import { AlertClass } from 'src/app/main/main-body/common/alert/alert-functions'
import { ContextMenuService } from 'src/app/main/main-body/common/context-menu.service'
import { CustomGridOption } from 'src/app/main/main-body/common/custom-ag-grid/interfaces/ag-grid-option.interface'
import { GridFormService } from 'src/app/main/main-body/common/grid-form.service'


@Component({
  templateUrl: './commission.component.html',
  styleUrls: ['./commission.component.scss']
})
export class CommissionComponent {

  controller: string
  showGrid: boolean = false
  showSelectPerson: boolean = false
  personData = []
  setPID: number
  selectedPersonelNF: any
  
  async onFilter(body) {
    !this.formObj ? await this.getAttr() : null
    this.service.post(this.controller == 'CommissionBaz' ? 'PersonBaz/GetFilterSelectBazMov' : `Person/GetFilterSelect`, body).subscribe((res: any) => {
      this.personData = res.Data
      this.showSelectPerson = true
      let id = this.contextMenuService.id
      if (id) {
        this.setPID = id
        this.onSelectPersonnel(id)
      }
      // else this.toastr.error('فرد وجود ندارد', 'حطا')
    })
  }

  PID: number
  onSelectPersonnel(id) {
    this.PID = id
    this.ID = null
    this.formType = ''
    this.getSelect()
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
      // other grid options ...
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

  view(event) {
    this.ID = event.data.Id
    this.showForm = true
    this.formType = 'View'
  }

  selectedPersonList = []
  async rowSelectedList(idArray) {
    this.selectedPersonelNF = null
    this.selectedPersonList = null
    if (idArray.length == 0) {
      this.showForm = false 
      return
    }
    this.formType = 'Add'
    if (idArray.length == 1) this.showForm = false
    this.selectedPersonList = idArray.toString()
    if (idArray.length == 1) 
      {
        this.showForm = true
        this.showGrid = false
      }
  }

  formObj: any
  canEdit: boolean = false
  canDelete: boolean = false
  canAdd: boolean = false
  getAttr() {
    return new Promise(resolve => {
      this.showGrid = false
      this.service.getAttr(this.controller).subscribe((res: any) => {

        let accesses: string[] = res.Data.EntityAccess
        this.canEdit = accesses.includes('EditPolicy')
        this.canDelete = accesses.includes('DeletePolicy')
        this.canAdd = accesses.includes('AddPolicy')

        this.setAttr(res.Data)
        return resolve(true)
      })
    })
  }

  setAttr(attr) {
    this.gridOption.columnDefs = attr
    this.formObj = attr.EntityAttribute
  }

  getSelect() {
    this.showGrid = false
    this.service.getSelect(`${this.controller}`,`${this.PID}`).subscribe((res: any) => {
      this.gridOption.rowData = res.Data
      this.showGrid = true
      setTimeout(() => {
        this.service.scrollToElement('commission-grid')
      }, 200); 
    })
  }

  add() {
    this.showForm = true
    this.formType = 'Add'
    this.gridOption.rowData.length == 0 ? this.ID = null : null
  }

  ID = null
  edit(event) {
    this.ID = event.rowData.Id
    this.showForm = true
    this.formType = 'Edit'
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

  submited(type) {
    this.closeForm()
    if (!type) return
    if (type == 'multi') {
      this.showSelectPerson = false
      this.showGrid = false
      setTimeout(() => {
        this.showSelectPerson = true
        // this.showGrid = true
      })
    }
    else this.getSelect()
    this.selectedPersonList = null
  }


  // submited(newData) {
  //   this.closeForm()
  //   if (!newData) return
  //   this.showGrid = false
  //   this.gridOption.rowData = newData
  //   setTimeout(() => this.showGrid = true, 100)
  // }

  closeForm() {
    this.formType = ''
    this.showForm = false
  }

  pathUrl: string
  constructor(private service: GridFormService, private contextMenuService: ContextMenuService, router: Router) {
    this.pathUrl = router.url
    if (router.url.includes('tadris-subsystem')) this.controller = 'TadrisCommission'
    else if (this.pathUrl.includes('baz-subsystem')) this.controller = 'CommissionBaz'
    else this.controller = 'Commission'
    this.gridOption.controllerName = this.controller
  }

}
