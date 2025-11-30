import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'

import { AlertClass } from 'src/app/main/main-body/common/alert/alert-functions'
import { CustomGridOption } from 'src/app/main/main-body/common/custom-ag-grid/interfaces/ag-grid-option.interface'
import { GridFormService } from 'src/app/main/main-body/common/grid-form.service'

@Component({
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.scss']
})

export class PersonComponent implements OnInit {

  controller: string

  showForm: boolean = false
  formType: string = ''
  Id: number
  selectedPersonelNF: any

  add() {
    this.ID = null
    this.showForm = true
    this.formType = 'Add'
  }

  edit(id) {
    this.ID = id
    this.showForm = true
    this.formType = 'Edit'
  }

  movPerson = { id: null, name: null }
  view(data) {
    this.ID = data.Id
    if (this.controller == 'PersonMov') {
      this.movPerson.id = data.Id
      this.movPerson.name = `${data.Name} ${data.Family}`
      return this.getSelect()
    }
    else {
      this.movPerson = null
      this.showForm = true
      this.formType = 'View'
    }
  }

  delete(id) {
    AlertClass.deleteAlert(_ => {
      this.service.delete(this.controller, id).subscribe((res: any) => {
        this.showPersonnel = false
        this.showForm = false
        this.newData = res.Data
        setTimeout(() => this.showPersonnel = true)
      })
    })
  }

  addMov(item) {
    this.ID = null
    this.showForm = true
    this.formType = 'Add'
    this.selectedPersonelNF= ''
  }

  editMov(item) {
    this.ID = item.rowData.Id
    this.showForm = true
    this.formType = 'Edit'
  }

  viewMov(item) {
    this.ID = item.data.Id
    this.showForm = true
    this.formType = 'View'
    this.selectedPersonelNF= `${item.data.Name} ${item.data.Family} -- ${item.data.PID}`
  }

  deleteMov(event) {
    AlertClass.deleteAlert(_ => {
      this.service.delete(this.controller, event.rowData.Id).subscribe((res: any) => {
        this.showPersonnel = false
        this.showForm = false
        this.newData = res.Data
        setTimeout(() => this.showPersonnel = true)
      })
    })
  }

  gridOption = <CustomGridOption>{
    actions: [
      {
        label: 'Edit',
        callback: this.editMov.bind(this),
      },
      {
        label: 'Delete',
        callback: this.deleteMov.bind(this)
      },
      {
        label: 'Add',
        callback: this.addMov.bind(this),
      }
    ],
    rowClicked: this.viewMov.bind(this)
  }

  formObj: any
  cardexOptions
  formObjChange(event) {
    this.formObj = event
    this.gridOption.columnDefs = event
  }

  filterDto
  onFilterSelectPersonnel(event) {
    this.filterDto = event
  }

  ID: number
  showPersonnel: boolean = false
  newData = []
  submited(newData) {
    this.closeForm()
    if (!newData) return
    this.showPersonnel = false
    this.newData = newData
    setTimeout(() => this.showPersonnel = true)
  }

  closeForm() {
    this.formType = ''
    this.showForm = false
  }

  showGrid: boolean = false
  getSelect() {
    this.showGrid = false
    this.service.getSelect(this.controller, this.ID).subscribe((res: any) => {
      this.gridOption.rowData = res.Data
      this.showGrid = true
    })
  }

  attr: any

  gridOptionStatus = <CustomGridOption>{}
  showGridOptionStatus: boolean = false
  setGridStatus() {
    this.showGridOptionStatus = false
    this.service.get(`${this.controller}/GetPrsInfoKardex`).subscribe((res: any) => {
      let data = res.Data
      this.gridOptionStatus.rowData = data.Item1
      this.gridOptionStatus.columnDefs = data.Item2
      this.showGridOptionStatus = true
    })
  }

  pathUrl: string
  constructor(private service: GridFormService, router: Router) {
    this.pathUrl = router.url
    if (this.pathUrl.includes('tadris-subsystem')) {
      this.controller = 'PersonTadris'
    }
    else if (this.pathUrl.includes('bazperson')) this.controller = 'PersonBaz'
    else if (this.pathUrl.includes('movperson')) this.controller = 'PersonMov'
    else this.controller = 'Person'
    this.gridOption.controllerName = this.controller
  }

  ngOnInit(): void { this.showPersonnel = true }

}
