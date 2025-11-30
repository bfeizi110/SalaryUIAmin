import { Component, Input, OnInit } from '@angular/core'
import { AlertClass } from 'src/app/main/main-body/common/alert/alert-functions'
import { CustomGridOption } from 'src/app/main/main-body/common/custom-ag-grid/interfaces/ag-grid-option.interface'
import { GridFormService } from 'src/app/main/main-body/common/grid-form.service'
import { FormMasterDetailsAttr, setFormMasterDetailsAttr } from 'src/app/main/pages/global-attr'

const Controller = 'FormMasterDetails'

@Component({
  selector: 'form-master-details',
  templateUrl: './form-master-details.component.html',
  styleUrls: ['./form-master-details.component.scss']
})
export class FormMasterDetailsComponent implements OnInit {

  @Input() FormID: number
  @Input() MasterID: number
  @Input() MasterType: number
      
  showGrid:boolean = false
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
    rowClicked: this.view.bind(this),
  }

  formObj: any
  getAttr() {
    this.showGrid = false
    !FormMasterDetailsAttr
      ? this.service.getAttr(Controller).subscribe((res: any) => this.setAttr(res.Data, 'toLocal'))
      : this.setAttr(FormMasterDetailsAttr)
  }


  setAttr(attr, type?) {
    this.gridOption.columnDefs = attr
    this.formObj = attr.EntityAttribute
    type == 'toLocal' ? setFormMasterDetailsAttr(attr) : null
    this.getSelect()
  }

  getSelect() {
    this.showGrid = false
    this.service.getSelect(Controller, this.FormID).subscribe((res: any) => {
      this.gridOption.rowData = res.Data
      this.showGrid = true
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
    this.formType = 'View'
    this.showForm = true
  }
  delete(event) {
    AlertClass.deleteAlert(_ => {
      this.service.delete(Controller, event.rowData.Id).subscribe((res: any) => {
        this.showGrid = false
        this.showForm = false
        this.gridOption.rowData = res.Data
        setTimeout(() => this.showGrid = true, 200)
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

  constructor(private service: GridFormService) { }

  ngOnInit(): void { this.getAttr() }

}
