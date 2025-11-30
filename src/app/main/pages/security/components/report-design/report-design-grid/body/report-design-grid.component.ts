import { Component, Input } from '@angular/core'
import { AlertClass } from 'src/app/main/main-body/common/alert/alert-functions'
import { CustomGridOption } from 'src/app/main/main-body/common/custom-ag-grid/interfaces/ag-grid-option.interface'
import { GridFormService } from 'src/app/main/main-body/common/grid-form.service'
import { ReportDesignGridAttr, setReportDesignGridAttr } from 'src/app/main/pages/global-attr'

const Controller = 'ReportDesignGrid'

@Component({
  selector: 'report-design-grid',
  templateUrl: './report-design-grid.component.html',
  styleUrls: ['./report-design-grid.component.scss']
})
export class ReportDesignGridComponent {

  @Input() parentId: number

  showGrid: boolean = false

  showFormc: boolean = false
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

  formObj: any
  getAttr() {
    this.showGrid = false
    let Attr = ReportDesignGridAttr()
    !Attr
      ? this.service.getAttr(Controller).subscribe((res: any) => this.setAttr(res.Data, 'toLocal'))
      : this.setAttr(Attr)
  }

  setAttr(attr, type?) {
    this.gridOption.columnDefs = attr
    this.formObj = attr.EntityAttribute
    type == 'toLocal' ? setReportDesignGridAttr(attr) : null
    this.getSelect()
  }

  getSelect() {
    this.showGrid = false
    this.service.getSelect(Controller, this.parentId).subscribe((res: any) => {
      this.gridOption.rowData = res.Data
      this.showGrid = true
      setTimeout(() => {
        this.service.scrollToElement('report-grid')
      }, 200); 
    })
  }

  add() {
    this.showFormc = true
    this.formType = 'Add'
  }

  ID
  edit(event) {
    this.ID = event.rowData.Id
    this.showFormc = true
    this.formType = 'Edit'
  }

  view(event) {
    this.ID = event.data.Id
    this.showFormc = true
    this.formType = 'View'
  }

  delete(event) {
    AlertClass.deleteAlert(_ => {
      this.service.delete(Controller, event.rowData.Id).subscribe((res: any) => {
        this.showGrid = false
        this.showFormc = false
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
    this.showFormc = false
  }

  constructor(private service: GridFormService) { }

  ngOnChanges(UpdatedValue: string): void { this.getAttr() }

}
