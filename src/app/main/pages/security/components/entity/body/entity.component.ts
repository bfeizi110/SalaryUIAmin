import { Component, OnInit } from '@angular/core'
import { AlertClass } from 'src/app/main/main-body/common/alert/alert-functions'
import { CustomGridOption } from 'src/app/main/main-body/common/custom-ag-grid/interfaces/ag-grid-option.interface'
import { GridFormService } from 'src/app/main/main-body/common/grid-form.service'
import { EntityAttr, setEntityAttr } from 'src/app/main/pages/global-attr'

const Controller = 'Entity'

@Component({
  templateUrl: './entity.component.html',
  styleUrls: ['./entity.component.scss']
})
export class EntityComponent implements OnInit {

  showGrid:boolean = false
  showGridContent:boolean = false
  showForm: boolean = false
  showDetailField: boolean = true
  showDetailIndex: boolean = false
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
    rowClicked: this.view.bind(this)
  }
  gridOptionContent = <CustomGridOption>{
    controllerName: Controller,
  }
  formObj: any
  getAttr() {
    this.showGrid = false
    let Attr = EntityAttr()
    !Attr
      ? this.service.getAttr(Controller).subscribe((res: any) => this.setAttr(res.Data, 'toLocal'))
      : this.setAttr(Attr)
  }


  setAttr(attr, type?) {
    this.gridOption.columnDefs = attr
    this.formObj = attr.EntityAttribute
    type == 'toLocal' ? setEntityAttr(attr) : null
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
  EntityName: string
  view(event) {
    this.showDetail = false
    this.showDetailField = false
    this.EntityName = event.data.CodeDesc_Fld
    setTimeout(() =>{ this.showDetail = true; this.showDetailField = true}, 200)
    this.formType = 'View'
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
    this.changeTab(0)
    if (!newData) return
    this.showGrid = false
    this.gridOption.rowData = newData
    setTimeout(() => this.showGrid = true, 100)
  }

  changeTab(idx: number) {
    this.showDetailField = false
    this.showDetailIndex = false
    this.showGridContent = false
    this.formType = ''
    this.showForm = false
    if (idx == 0)
      this.showDetailField = true
    if (idx == 1)
      this.showDetailIndex = true
    if (idx == 2)
    {
      this.service.get(`${Controller}/ShowContent/${this.EntityName}`).subscribe((res: any) => {
        this.gridOptionContent.columnDefs = res.Data.Item2
        this.gridOptionContent.rowData = res.Data.Item1
        setTimeout(() => {
          this.showGridContent = true
        }, 200); 
      })
    }

  }

  closeForm() {
    this.formType = ''
    this.showForm = false
  }
  constructor(private service: GridFormService) { }

  ngOnInit(): void { this.getAttr() }

}
