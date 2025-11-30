
import { Component, OnInit } from '@angular/core'
import { AlertClass } from 'src/app/main/main-body/common/alert/alert-functions'
import { CustomGridOption } from 'src/app/main/main-body/common/custom-ag-grid/interfaces/ag-grid-option.interface'
import { GridFormService } from 'src/app/main/main-body/common/grid-form.service'
import { NgxSpinnerService } from 'ngx-spinner'
import { CityAttr, setCityAttr } from 'src/app/main/pages/global-attr'

const Controller = 'City'
@Component({
  templateUrl: './city.component.html',
  styleUrls: ['./city.component.scss']
})

export class CityComponent implements OnInit {

  showState: boolean = false
  countryId: number
  changeCountry(id) {
    this.showForm = false
    this.showState = false
    this.showGrid = false
    this.countryId = id
    setTimeout(() => {
      this.showState = true
      this.service.scrollToElement("state")
    })
  }

  stateId: number
  changeState(id) {
    this.showGrid = false
    this.stateId = id
    this.getSelect()
  }

  showGrid: boolean = false
  showCountry: boolean = false
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

  formObj: any
  getAttr() {
    this.showGrid = false
    !CityAttr
      ? this.service.getAttr(Controller).subscribe((res: any) => this.setAttr(res.Data, 'toLocal'))
      : this.setAttr(CityAttr)
  }

  setAttr(attr, type?) {
    this.gridOption.columnDefs = attr
    this.formObj = attr
    type == 'toLocal' ? setCityAttr(attr) : null
    this.showCountry = true
  }

  getSelect() {
    this.showGrid = false
    this.service.getSelect(Controller, this.stateId).subscribe((res: any) => {
      this.gridOption.rowData = res.Data
      this.showGrid = true
      setTimeout(() => {
        this.service.scrollToElement("city")
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

  submited(newData) {
    this.closeForm()
    if (!newData) return
    this.showGrid = false
    this.gridOption.rowData = newData
    setTimeout(() => this.showGrid = true, 100)
  }

  closeForm() {
    this.formType = ''
    this.showForm = false
  }

  constructor(private NgxSpinnerService: NgxSpinnerService, private service: GridFormService) { }

  ngOnInit(): void {
    this.getAttr()
  }

}
