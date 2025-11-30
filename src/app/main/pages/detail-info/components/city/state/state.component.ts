
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'
import { AlertClass } from 'src/app/main/main-body/common/alert/alert-functions'
import { CustomGridOption } from 'src/app/main/main-body/common/custom-ag-grid/interfaces/ag-grid-option.interface'
import { GridFormService } from 'src/app/main/main-body/common/grid-form.service'
import { NgxSpinnerService } from 'ngx-spinner'

const Controller = 'City'
@Component({
  selector: 'state',
  templateUrl: './state.component.html',
  styleUrls: ['./state.component.scss']
})
export class StateComponent implements OnInit {

  @Output() changeState = new EventEmitter()
  @Input() formObj: any
  @Input() countryId: number

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
    rowClicked: this.clicked.bind(this)
  }

  clicked(event) { this.changeState.emit(event.data.Id) }

  getSelect() {
    this.showGrid = false
    this.service.getSelect(Controller, this.countryId).subscribe((res: any) => {
      this.gridOption.rowData = res.Data
      this.showGrid = true
    })
  }

  add() {
    this.showForm = true
    this.formType = 'Add'
  }

  ID
  stateId
  edit(event) {
    this.ID = event.rowData.Id
    this.stateId = event.rowData.ParentID
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
    this.gridOption.columnDefs = this.formObj
    this.getSelect()
  }

}
