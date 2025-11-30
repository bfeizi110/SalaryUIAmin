import { Component, OnInit } from '@angular/core'
import { AlertClass } from 'src/app/main/main-body/common/alert/alert-functions'
import { ContextMenuService } from 'src/app/main/main-body/common/context-menu.service'
import { CustomGridOption } from 'src/app/main/main-body/common/custom-ag-grid/interfaces/ag-grid-option.interface'
import { GridFormService } from 'src/app/main/main-body/common/grid-form.service'
import { PersonCaseAttr, setPersonCaseAttr } from '../../../../global-attr'

const Controller = 'PersonCaseInfo'

@Component({
  templateUrl: './person-case-info.component.html',
  styleUrls: ['./person-case-info.component.scss']
})

export class PersonCaseInfoComponent implements OnInit {

  Controller = Controller
  filterDto: any
  showSelectPerson: boolean = false
  personData = []
  showGrid: boolean = false
  setPID: number
  selectedPersonelNF: any
  
  async onFilter(dto) {
    this.showGrid = false
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
    this.cardexOptions.PID = this.PID
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
    rowClicked: this.view.bind(this)
  }

  formObj: any
  getAttr() {
    return new Promise(resolve => {
      let Attr = PersonCaseAttr()
      if (!Attr) {
        this.service.getAttr(Controller).subscribe((res: any) => {
          this.setAttr(res.Data, 'toLocal')
          return resolve(true)
        })
      }
      else {
        this.setAttr(Attr, null)
        return resolve(true)
      }
    })
  }

  cardexOptions
  canEdit: boolean = false
  canDelete: boolean = false
  canAdd: boolean = false
  setAttr(attr, type) {
    this.gridOption.columnDefs = attr

    let accesses: string[] = attr.EntityAccess
    this.canEdit = accesses.includes('EditPolicy')
    this.canDelete = accesses.includes('DeletePolicy')
    this.canAdd = accesses.includes('AddPolicy')

    this.formObj = attr.EntityAttribute
    this.cardexOptions = {
      Controller: Controller,
      ComboTitle: 'نوع پرداخت مستمر',
      columnDefs: attr
    }
    type == 'toLocal' ? setPersonCaseAttr(attr) : null
  }

  getSelect() {
    this.showGrid = false
    this.service.getSelect(Controller, this.PID).subscribe((res: any) => {
      this.gridOption.rowData = res.Data
      this.showGrid = true
      setTimeout(() => {
        this.service.scrollToElement('person-case-tab')
      }, 200); 
    })
  }

  formType: string = ''
  add() {
    const formObjBackup = { ...this.formObj }
    this.formObj = {}
    this.formType = 'Add'
    this.formObj = formObjBackup
    this.showForm = true
  }

  ID
  caseKindId: number
  caseCode: number
  edit(event) {
    this.ID = event.rowData.Id
    this.caseKindId = event.rowData.Casekind_Fld
    this.caseCode = event.rowData.CaseCode_Fld
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
    this.caseKindId = event.data.Casekind_Fld
    this.caseCode = event.data.CaseCode_Fld
    this.showForm = true
    this.formType = 'View'
  }

  showForm: boolean = false
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

  closeForm() {
    this.selectedIdList = []
    this.selectedPersonList = []
    this.formType = ''
    this.showForm = false
  }

  constructor(private service: GridFormService, private contextMenuService: ContextMenuService) { }

  ngOnInit(): void { }

}
