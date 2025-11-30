import { Component, OnInit } from '@angular/core'
import { AlertClass } from 'src/app/main/main-body/common/alert/alert-functions'
import { CustomGridOption } from 'src/app/main/main-body/common/custom-ag-grid/interfaces/ag-grid-option.interface'
import { GridFormService } from 'src/app/main/main-body/common/grid-form.service'
import { FormAttr, setFormAttr } from 'src/app/main/pages/global-attr'

const Controller = 'Form'

@Component({
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {

  showGrid:boolean = false
  showForm: boolean = false
  formType: string = ''
  MasterID: number 
  MasterType: number

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
    rowClicked: this.viewDetail.bind(this),
    rowDoubleClicked: this.view.bind(this),
  }

  formObj: any
  getAttr() {
    this.showGrid = false
    !FormAttr
      ? this.service.getAttr(Controller).subscribe((res: any) => this.setAttr(res.Data, 'toLocal'))
      : this.setAttr(FormAttr)
  }


  setAttr(attr, type?) {
    this.gridOption.columnDefs = attr
    this.formObj = attr.EntityAttribute
    type == 'toLocal' ? setFormAttr(attr) : null
    this.getSelect()
  }

  getSelect() {
    this.showGrid = false
    this.service.getSelect(Controller, null).subscribe((res: any) => {
      this.gridOption.rowData = res.Data
      this.showGrid = true
    })
  }

  add() {
    this.showForm = true
    this.formType = 'Add'
    this.showDetail = false
  }

  ID
  edit(event) {
    this.ID = event.rowData.Id
    this.showForm = true
    this.formType = 'Edit'
    this.showDetail = false
  }

  showDetail: boolean = false
  showDetailSetting: boolean = false
  EntityName: string
  DynamicFormType: number
  TabCount:  number
  viewDetail(event) {
    this.showDetail = false
    this.EntityName = event.data.EntityName_Fld
    this.DynamicFormType = event.data.FormType_Fld
    this.ID = event.data.Id
    this.MasterID = event.data.MasterFormID_Fld
    this.MasterType = event.data.MasterFormType_Fld
    this.TabCount = event.data.TabCount_Fld
    
    setTimeout(() => {
      this.showDetail = true      
    }, 200); 
    this.formType = 'View'
  }
  view(event) {
    this.ID = event.data.Id
    this.showDetail = false
    this.formType = 'View'
    this.showForm = true
  }
  delete(event) {
    AlertClass.deleteAlert(_ => {
      this.service.delete(Controller, event.rowData.Id).subscribe((res: any) => {
        this.showGrid = false
        this.showForm = false
        this.showDetail = false
        this.gridOption.rowData = res.Data
        setTimeout(() => this.showGrid = true, 400)
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
