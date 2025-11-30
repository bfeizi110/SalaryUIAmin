import { Component, OnInit } from '@angular/core'
import { AlertClass } from 'src/app/main/main-body/common/alert/alert-functions'
import { CustomGridOption } from 'src/app/main/main-body/common/custom-ag-grid/interfaces/ag-grid-option.interface'
import { GridFormService } from 'src/app/main/main-body/common/grid-form.service'
import { EntityPropertyAttr, setEntityPropertyAttr } from 'src/app/main/pages/global-attr'

const Controller = 'EntityProperty'

@Component({
  templateUrl: './entity-property.component.html',
  styleUrls: ['./entity-property.component.scss']
})
export class EntityPropertyComponent implements OnInit {

  reset() { this.service.post(`${Controller}/ReturnToBase`, { Id: 1, CodeDesc_Fld: this.entityValueList.Id}).subscribe(_ => _) }

  entityList = []
  getCombo() { this.entityList.length == 0 ? this.service.get('Entity/GetComboNew/100922').subscribe((res: any) => this.entityList = res.Data) : null }

  refreshCombo() {
    this.entityList = []
    this.getCombo()
  }

  entityId: number
  entityValueList: any
  showGrid: boolean
  entityChange(item) {
    this.showForm = false
    this.showGrid = false
    this.entityId = this.entityValueList.Id.toString()
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
    let Attr = EntityPropertyAttr()
    !Attr
      ? this.service.getAttr(Controller).subscribe((res: any) => this.setAttr(res.Data, 'toLocal'))
      : this.setAttr(Attr)
  }

  setAttr(attr, type?) {
    this.gridOption.columnDefs = attr
    this.formObj = attr.EntityAttribute
    type == 'toLocal' ? setEntityPropertyAttr(attr) : null
    this.getSelect()
  }

  getSelect() {
    this.showGrid = false
    this.service.getSelect(Controller, this.entityValueList.Id.toString()).subscribe((res: any) => {
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

  ngOnInit(): void { this.getCombo() }

  constructor(private service: GridFormService) { }

}
