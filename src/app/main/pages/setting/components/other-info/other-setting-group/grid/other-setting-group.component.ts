
import { Component, OnInit } from '@angular/core'
import { AlertClass } from 'src/app/main/main-body/common/alert/alert-functions'
import { CustomGridOption } from 'src/app/main/main-body/common/custom-ag-grid/interfaces/ag-grid-option.interface'
import { GridFormService } from 'src/app/main/main-body/common/grid-form.service'
import { OtherSettingGroupAttr, setOtherSettingGroupAttr } from 'src/app/main/pages/global-attr'

const Controller = 'OtherSettingGroup'

@Component({
  templateUrl: './other-setting-group.component.html',
  styleUrls: ['./other-setting-group.component.scss']
})

export class OtherSettingGroupComponent implements OnInit {

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
    rowClicked: this.onRowClicked.bind(this)
  }

  getAttr() {
    this.showGrid = false
    !OtherSettingGroupAttr
      ? this.service.getAttr(Controller).subscribe((res: any) => this.setAttr(res.Data, 'toLocal'))
      : this.setAttr(OtherSettingGroupAttr)
  }

  setAttr(attr, type?) {
    this.gridOption.columnDefs = attr
    this.formObj = attr.EntityAttribute
    type == 'toLocal' ? setOtherSettingGroupAttr(attr) : null
    this.getSelect()
  }

  formObj: any
  getSelect() {
    this.showGrid = false
    this.service.getSelect(Controller).subscribe((res: any) => {
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

  delete(event) {
    this.formType = 'Delete'
    AlertClass.deleteAlert(_ => {
      this.service.delete(Controller, event.rowData.Id).subscribe((res: any) => {
        this.showGrid = false
        this.showForm = false
        this.showOtherSettingDefine = false
        this.gridOption.rowData = res.Data
        this.formType = ''
        setTimeout(() => this.showGrid = true, 100)
      })
    }), _ => this.formType = ''
  }

  showOtherSettingDefine: boolean = false
  otherSettingGroupId: number
  onRowClicked(event) {
    this.showOtherSettingDefine = false
    this.otherSettingGroupId = event.data.Id
    setTimeout(() => {
      this.showOtherSettingDefine = true
      this.service.scrollToElement('other-setting-define')
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

  ngOnInit(): void {
    this.getAttr()
  }

}
