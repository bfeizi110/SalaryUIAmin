import { Component, EventEmitter, OnInit, Output } from '@angular/core'
import { AlertClass } from 'src/app/main/main-body/common/alert/alert-functions'
import { CustomGridOption } from 'src/app/main/main-body/common/custom-ag-grid/interfaces/ag-grid-option.interface'
import { GridFormService } from 'src/app/main/main-body/common/grid-form.service'
import { NgxSpinnerService } from 'ngx-spinner'
import { OtherGroupAttr, setOtherGroupAttr } from 'src/app/main/pages/global-attr'

const Controller = 'OtherGroup'

@Component({
  selector: 'other-group',
  templateUrl: './other-group.component.html',
  styleUrls: ['./other-group.component.scss']
})
export class OtherGroupComponent implements OnInit {

  @Output() groupClicked = new EventEmitter()

  showGrid: boolean = false

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
    rowClicked: this.rowClicked.bind(this)
  }

  rowClicked(event) { this.groupClicked.emit(event.data.Id) }

  formObj: any
  getAttr() {
    this.showGrid = false
    this.service.getAttr(Controller).subscribe((res: any) => this.setAttr(res.Data, ''))
  }

  setAttr(attr, type?) {
    this.gridOption.columnDefs = attr
    this.formObj = attr.EntityAttribute
    this.getSelect()
  }

  getSelect() {
    this.showGrid = false
    this.service.getSelect(Controller).subscribe((res: any) => {
      this.gridOption.rowData = res.Data
      setTimeout(() => {
        this.showGrid = true        
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
