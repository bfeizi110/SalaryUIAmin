import { Component, OnInit } from '@angular/core'
import { AlertClass } from 'src/app/main/main-body/common/alert/alert-functions'
import { CustomGridOption } from 'src/app/main/main-body/common/custom-ag-grid/interfaces/ag-grid-option.interface'
import { GridFormService } from 'src/app/main/main-body/common/grid-form.service'
import { JariDaraeiSettingAttr, setJariDaraeiSettingAttr } from 'src/app/main/pages/global-attr'
import { ToastrService } from 'ngx-toastr'

const Controller = 'HireTypePayFractionSetting'

@Component({
  templateUrl: './hire-type-pay-fraction-setting.component.html',
  styleUrls: ['./hire-type-pay-fraction-setting.component.scss']
})
export class HireTypePayFractionSettingComponent implements OnInit {

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
      },
      {
        label: 'Add',
        callback: this.add.bind(this)
      }
    ],
    controllerName: Controller,
    checkboxSelection: true, 
    rowSelected: this.rowSelected.bind(this),   
    rowClicked: this.view.bind(this)
  }

  selectedItemList = []
  rowSelected(event) { this.selectedItemList.includes(event.data.Id) ? this.selectedItemList = this.selectedItemList.filter(a => a != event.data.Id) : this.selectedItemList.push(event.data.Id) }

  deleteall() {
    if (!this.canDelete) this.toastr.error('شما به حذف این بخش دسترسی ندارید', 'خطا')
    AlertClass.deleteAlert(_ => this.service.deleteByBody(`HireTypePayFractionSetting/DeleteAll`, { IDCollect_Fld: this.selectedItemList.toString() }).subscribe(_ => {this.getSelect();   this.selectedItemList = []}))
  }

  formObj: any
  canDelete: boolean
  getAttr() {
    let Attr = JariDaraeiSettingAttr()
    !Attr
      ? this.service.getAttr(Controller).subscribe((res: any) => this.setAttr(res.Data, 'toLocal'))
      : this.setAttr(Attr)
  }

  setAttr(attr, type?) {
    this.gridOption.columnDefs = attr
    this.formObj = attr.EntityAttribute
    type == 'toLocal' ? setJariDaraeiSettingAttr(attr) : null
    let accesses: string[] = attr.EntityAccess
    this.canDelete = accesses.includes('DeletePolicy')
    this.getSelect()
  }

  showGrid: boolean = false
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

  constructor(private service: GridFormService, private toastr: ToastrService) { }

  ngOnInit(): void { this.getAttr() }

}
