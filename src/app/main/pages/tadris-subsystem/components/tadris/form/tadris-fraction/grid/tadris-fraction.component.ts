import { Component, EventEmitter, Input, Output } from '@angular/core'
import { CustomGridOption } from 'src/app/main/main-body/common/custom-ag-grid/interfaces/ag-grid-option.interface'
import { GridFormService } from 'src/app/main/main-body/common/grid-form.service'
import { TadrisFractionAttr, setTadrisFractionAttr } from 'src/app/main/pages/global-attr'

const Controller = 'Tadris'

@Component({
  selector: 'tadris-fraction',
  templateUrl: './tadris-fraction.component.html',
  styleUrls: ['./tadris-fraction.component.scss']
})
export class TadrisFractionComponent {

  @Input() parentId: number
  @Input() rowData: any
  @Input() formTypeParent: string
  @Output() submitedOnGrid = new EventEmitter()

  showGrid: boolean = false

  showForm: boolean = false
  formType: string = ''
  actions: any[] = [
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
  gridOption = <CustomGridOption>{ controllerName: null, rowClicked: this.view.bind(this) }

  formObj: any
  getAttr() {
    this.showGrid = false
    let Attr = TadrisFractionAttr()
    !Attr
      ? this.service.get(`${Controller}/GetAttributeTadrisDetailFraction`).subscribe((res: any) => this.setAttr(res.Data, 'toLocal'))
      : this.setAttr(Attr)
  }

  setAttr(attr, type?) {
    this.gridOption.columnDefs = attr
    !this.rowData || this.formTypeParent == 'Add' ? this.gridOption.rowData = [{ Id: 0, TadrisFractionTypeDesc_Fld: null, Price_Fld: null }] : this.gridOption.rowData = this.rowData
    this.formObj = attr.EntityAttribute
    type == 'toLocal' ? setTadrisFractionAttr(attr) : null
    setTimeout(() => this.showGrid = true, 100)
  }

  add() {
    this.data = {}
    this.showForm = true
    this.formType = 'Add'
  }

  data: any
  edit(event) {
    this.data = event.rowData
    this.showForm = true
    this.formType = 'Edit'
  }

  view(event) {
    this.data = event.data
    this.showForm = true
    this.formType = 'View'
  }

  delete(event) {
    this.showGrid = false
    this.gridOption.rowData = this.gridOption.rowData.filter(a => a != event.rowData)
    this.gridOption.rowData.length == 0 ? this.gridOption.rowData = [{ Id: 0, TadrisFractionTypeDesc_Fld: null, Price_Fld: null }] : null
    this.showForm = false
    this.submited({ formType: this.formType, data: this.rowData })
    setTimeout(() => this.showGrid = true, 100)
  }

  submited(emitItem) {
    this.closeForm()
    this.showGrid = false
    if (emitItem.formType == 'Add') {
      this.gridOption.rowData[0].Id == 0 ? this.gridOption.rowData = this.gridOption.rowData.filter(b => b.Id != 0) : null
      this.gridOption.rowData.push(emitItem.data)
    }
    else this.gridOption.rowData.forEach((a, index) => this.gridOption.rowData[index].Id == emitItem.data.Id ? this.gridOption.rowData[index] = emitItem.data : null)
    this.submitedOnGrid.emit(this.gridOption.rowData)
    setTimeout(() => this.showGrid = true, 100)
  }

  closeForm() {
    this.formType = ''
    this.showForm = false
  }

  constructor(private service: GridFormService) { }

  ngOnChanges(UpdatedValue: string): void {
    this.showGrid = false
    this.formTypeParent == 'View' ? this.gridOption.actions = null : this.gridOption.actions = this.actions
    this.getAttr()
  }

}
