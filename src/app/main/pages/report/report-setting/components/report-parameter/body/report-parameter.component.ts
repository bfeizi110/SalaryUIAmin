import { Component } from '@angular/core'
import { AlertClass } from 'src/app/main/main-body/common/alert/alert-functions'
import { CustomGridOption } from 'src/app/main/main-body/common/custom-ag-grid/interfaces/ag-grid-option.interface'
import { GridFormService } from 'src/app/main/main-body/common/grid-form.service'
import { ReportParameterAttr, setReportParameterAttr } from 'src/app/main/pages/global-attr'

const Controller = 'ReportParameter'

@Component({
  templateUrl: './report-parameter.component.html',
  styleUrls: ['./report-parameter.component.scss']
})

export class ReportParameterComponent {

  comboList = []
  clickCombo() { this.comboList.length == 0 ? this.service.getCombo('OtherDetail/10055/100551,100552,100553,100554').subscribe((res: any) => this.comboList = res.Data) : null }

  refreshCombo() {
    this.comboList = []
    this.clickCombo()
  }

  typeId: number
  showGrid: boolean
  comboChange(id) {
    this.showForm = false
    this.showGrid = false
    this.typeId = id
    this.getAttr()
  }

  showForm: boolean = false
  formType: string = ''
  gridOption = <CustomGridOption>{
    actions: [
      {
        label: 'Add',
        callback: this.add.bind(this)
      },
      {
        label: 'Edit',
        callback: this.edit.bind(this)
      },
      {
        label: 'Delete',
        callback: this.delete.bind(this)
      }
    ],
    controllerName: Controller,
    rowClicked: this.rowClicked.bind(this)
  }

  add() {
    this.showForm = true
    this.formType = 'Add'
  }

  showReportParameterDetail: boolean = false
  reportParameterCode: number
  rowClicked(event) {
    this.reportParameterCode = event.data.Code_Fld
    this.reportParameterId = event.data.Id
    this.showReportParameterDetail = true
  }

  formObj: any
  getAttr() {
    let Attr = ReportParameterAttr()
    !Attr
      ? this.service.getAttr(Controller).subscribe((res: any) => this.setAttr(res.Data, 'toLocal'))
      : this.setAttr(Attr)
  }

  setAttr(attr, type?) {
    this.gridOption.columnDefs = attr
    this.formObj = attr.EntityAttribute
    type == 'toLocal' ? setReportParameterAttr(attr) : null
    this.getSelect()
  }

  getSelect() {
    this.showGrid = false
    this.service.getSelect(Controller, this.typeId).subscribe((res: any) => {
      this.gridOption.rowData = res.Data
      this.showGrid = true
    })
  }

  ID
  reportParameterId
  edit(event) {
    this.reportParameterId = event.rowData.Id
    this.ID = event.rowData.Id
    this.showForm = true
    this.formType = 'Edit'
  }

  delete(event) {
    AlertClass.deleteAlert(_ => {
      this.service.delete(Controller, event.rowData.Id).subscribe((res: any) => {
        this.showGrid = false
        this.showForm = false
        this.showReportParameterDetail = false
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

  constructor(private service: GridFormService) { }

}
