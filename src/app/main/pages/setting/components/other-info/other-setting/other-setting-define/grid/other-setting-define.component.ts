
import { Component, Input, OnInit } from '@angular/core'
import { AlertClass } from 'src/app/main/main-body/common/alert/alert-functions'
import { CustomGridOption } from 'src/app/main/main-body/common/custom-ag-grid/interfaces/ag-grid-option.interface'
import { GridFormService } from 'src/app/main/main-body/common/grid-form.service'
import { OtherSettingAttr, OtherSettingDefineAttr, setOtherSettingAttr, setOtherSettingDefineAttr } from 'src/app/main/pages/global-attr'

const Controller = 'OtherSettingDefine'

@Component({
  selector: 'other-setting-define',
  templateUrl: './other-setting-define.component.html',
  styleUrls: ['./other-setting-define.component.scss']
})
export class OtherSettingDefineComponent implements OnInit {

  getAttrOtherSetting() {
    this.showGrid = false
    !OtherSettingAttr
      ? this.service.getAttr(Controller).subscribe((res: any) => this.setAttr(res.Data, 'toLocal'))
      : this.setAttr(OtherSettingAttr)
  }

  canSetValue: boolean = false
  otherSettingFormObj
  setAttrOtherSetting(attr, type?) {
    this.otherSettingFormObj = attr
    this.canSetValue = attr.EntityAccess.includes('EditPolicy')
    type == 'toLocal' ? setOtherSettingAttr(attr) : null
  }

  @Input() otherSettingGroupId: number

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

  showValueButton: boolean = false
  parentId: number
  onRowClicked(event) {
    this.canSetValue ? this.showValueButton = true : this.showValueButton = false
    this.parentId = event.data.Id
  }

  showOtherSettingForm: boolean = false
  openOtherSetting() {
    this.showOtherSettingForm = true
  }

  getAttr() {
    this.showGrid = false
    !OtherSettingDefineAttr
      ? this.service.getAttr(Controller).subscribe((res: any) => this.setAttr(res.Data, 'toLocal'))
      : this.setAttr(OtherSettingDefineAttr)
  }

  setAttr(attr, type?) {
    this.gridOption.columnDefs = attr
    this.formObj = attr.EntityAttribute
    type == 'toLocal' ? setOtherSettingDefineAttr(attr) : null
    this.getSelect()
  }

  formObj: any
  getSelect() {
    const year = sessionStorage.getItem('Year_Fld')
    const month = sessionStorage.getItem('Month_Fld')

    this.showGrid = false
    this.service.getSelect(Controller, this.otherSettingGroupId).subscribe((res: any) => {
      this.gridOption.rowData = res.Data
      this.showGrid = true
      setTimeout(() => {
        this.service.scrollToElement('custom-aggrid')
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

  constructor(private service: GridFormService) { }

  ngOnInit(): void { this.getAttr() }

}
