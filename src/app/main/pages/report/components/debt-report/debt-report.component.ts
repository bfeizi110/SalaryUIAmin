import { Component, OnInit } from '@angular/core'
import { CustomGridOption } from 'src/app/main/main-body/common/custom-ag-grid/interfaces/ag-grid-option.interface'
import { GridFormService } from 'src/app/main/main-body/common/grid-form.service'
import { DebtReportAttr, setDebtReportAttr } from '../../../global-attr'

const Controller = 'PersonDebtInfo'

@Component({
  templateUrl: './debt-report.component.html',
  styleUrls: ['./debt-report.component.scss']
})

export class DebtReportComponent implements OnInit {

  showGrid: boolean = false
  gridOption = <CustomGridOption>{ controllerName: Controller }

  formObj: any
  getAttr() {
    this.showGrid = false
    let Attr = DebtReportAttr()
    !Attr
      ? this.service.get(`${Controller}/GetAttributeReport`).subscribe((res: any) => this.setAttr(res.Data, 'toLocal'))
      : this.setAttr(Attr)
  }

  setAttr(attr, type?) {
    this.gridOption.columnDefs = attr
    this.gridOption.columnDefs.EntityAttribute.DebtCodeDesc_Fld.rowGroup = true
    this.gridOption.columnDefs.EntityAttribute.DebtCodeDesc_Fld.hide = true
    //this.gridOption.columnDefs.EntityAttribute.Name.enablePivot = true
    //this.gridOption.columnDefs.EntityAttribute.Name.rowGroup = true
    //this.gridOption.columnDefs.EntityAttribute.Name.hide = true
    this.formObj = attr.EntityAttribute
    type == 'toLocal' ? setDebtReportAttr(attr) : null
    this.getSelect()
  }

  getSelect() {
    this.showGrid = false
    this.service.get(`${Controller}/Report`).subscribe((res: any) => {
      this.gridOption.rowData = [res.Data[0]]
      this.showGrid = true
    })
  }

  constructor(private service: GridFormService) { }

  ngOnInit(): void { this.getAttr() }

}
