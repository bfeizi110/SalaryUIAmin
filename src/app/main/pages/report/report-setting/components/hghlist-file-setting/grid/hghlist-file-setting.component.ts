import { Component } from '@angular/core'
import { AlertClass } from 'src/app/main/main-body/common/alert/alert-functions'
import { CustomGridOption } from 'src/app/main/main-body/common/custom-ag-grid/interfaces/ag-grid-option.interface'
import { GridFormService } from 'src/app/main/main-body/common/grid-form.service'
import { HghListFileSettingAttr, setHghListFileSettingAttr } from 'src/app/main/pages/global-attr'

const Controller = 'HghListFileSetting'

@Component({
  templateUrl: './hghlist-file-setting.component.html',
  styleUrls: ['./hghlist-file-setting.component.scss']
})
export class HghlistFileSettingComponent {

  emgGroupList = []
  clickCombo() { this.emgGroupList.length == 0 ? this.service.getCombo('OtherDetail/10065').subscribe((res: any) => this.emgGroupList = res.Data) : null }

  refreshCombo() {
    this.emgGroupList = []
    this.clickCombo()
  }

  EmpGroup_Fld: number
  showGrid: boolean
  emgGroupChange(id) {
    this.showForm = false
    this.showGrid = false
    this.EmpGroup_Fld = id
    this.getAttr()
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
      }
    ],
    controllerName: Controller,
    rowClicked: this.view.bind(this)
  }

  formObj: any
  getAttr() {
    let Attr = HghListFileSettingAttr()
    !Attr
      ? this.service.getAttr(Controller).subscribe((res: any) => this.setAttr(res.Data, 'toLocal'))
      : this.setAttr(Attr)
  }

  setAttr(attr, type?) {
    this.gridOption.columnDefs = attr
    this.formObj = attr.EntityAttribute
    type == 'toLocal' ? setHghListFileSettingAttr(attr) : null
    this.getSelect()
  }

  getSelect() {
    this.showGrid = false
    this.service.getSelect(Controller, this.EmpGroup_Fld).subscribe((res: any) => {
      this.gridOption.rowData = res.Data
      this.showGrid = true
    })
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

  constructor(private service: GridFormService) { }

}
