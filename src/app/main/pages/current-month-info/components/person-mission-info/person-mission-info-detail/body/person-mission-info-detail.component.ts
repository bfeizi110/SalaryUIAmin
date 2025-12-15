import { Component, EventEmitter, Input, Output } from '@angular/core'
import { AlertClass } from 'src/app/main/main-body/common/alert/alert-functions'
import { CustomGridOption } from 'src/app/main/main-body/common/custom-ag-grid/interfaces/ag-grid-option.interface'
import { GridFormService } from 'src/app/main/main-body/common/grid-form.service'
import { PersonMissionInfoDetailAttr, setPersonMissionInfoDetailAttr } from 'src/app/main/pages/global-attr'

const Controller = 'PersonMissionInfo'

@Component({
  selector: 'person-mission-info-detail',
  templateUrl: './person-mission-info-detail.component.html',
  styleUrls: ['./person-mission-info-detail.component.scss']
})
export class PersonMissionInfoDetailComponent {

  @Input() formTypeParent: string
  @Input() parentId: number
  @Input() data: any
  @Output() detailChange = new EventEmitter()
  showGrid: boolean = false

  showForm: boolean = false
  formType: string = ''
  gridOption = <CustomGridOption>{ 
    controllerName: Controller,
    rowClicked: this.view.bind(this)
   }

  formObj: any
  getAttr() {
    this.showGrid = false
    !PersonMissionInfoDetailAttr
      ? this.service.get(`${Controller}/GetAttributeDetaill`).subscribe((res: any) => this.setAttr(res.Data, 'toLocal'))
      : this.setAttr(PersonMissionInfoDetailAttr)
  }

  setAttr(attr, type?) {
    this.gridOption.columnDefs = attr
    this.formObj = attr.EntityAttribute
    type == 'toLocal' ? setPersonMissionInfoDetailAttr(attr) : null
    this.getSelect()
  }

  getSelect() {
    if (this.formTypeParent == 'Add' || !this.data)
      this.gridOption.rowData = [{ ParentID_Fld: 0, PayType_Fld: 0, PayTypeDesc_Fld: "", Price_Fld: 0, Id: 0 }]
    else {
      if (this.data.PersonMissionInfoDetail.length == 0) this.gridOption.rowData = [{ ParentID_Fld: 0, PayType_Fld: 0, PayTypeDesc_Fld: "", Price_Fld: 0, Id: 0 }]
      else this.gridOption.rowData = this.data.PersonMissionInfoDetail
    } 
    this.showGrid = true
  }

  add() {
    this.showForm = true
    this.formType = 'Add'
  }

  recordIndex: number
  recordSelected: any
  edit(event) {
    this.recordSelected = event.rowData
    this.recordIndex = this.gridOption.rowData.findIndex(a => a == this.recordSelected)
    this.showForm = true
    this.formType = 'Edit'
  }

  view(event) {
    this.recordSelected = event.data
    this.showForm = true
    this.formType = 'View'
  }

  delete(event) {
    AlertClass.deleteAlert(_ => {
      this.gridOption.rowData = this.gridOption.rowData.filter(a => a != event.rowData)
      this.gridOption.rowData.length == 0 ? this.gridOption.rowData = [{ ParentID_Fld: 0, PayType_Fld: 0, PayTypeDesc_Fld: "", Price_Fld: 0, Id: 0 }] : null
      this.showGrid = false
      this.showForm = false
      this.detailChange.emit(this.gridOption.rowData)
      setTimeout(() => this.showGrid = true, 100)
    })
  }

  submited(newData) {
    this.closeForm()
    this.showGrid = false
    this.gridOption.rowData = newData
    this.detailChange.emit(newData)
    setTimeout(() => this.showGrid = true, 100)
  }

  closeForm() {
    this.formTypeParent = ''
    this.showForm = false
  }

  constructor(private service: GridFormService) { }

  ngOnChanges(UpdatedValue: string) {
    this.getAttr()
    if (this.formTypeParent == 'View') this.gridOption.actions = []
    else this.gridOption.actions = [
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
    ]
  }

}
