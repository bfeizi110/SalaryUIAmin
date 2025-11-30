import { Component, Input } from '@angular/core'
import { CustomGridOption } from 'src/app/main/main-body/common/custom-ag-grid/interfaces/ag-grid-option.interface'
import { GridFormService } from 'src/app/main/main-body/common/grid-form.service'
import { CommissionStateAttr, setCommissionStateAttr } from '../../../../global-attr'

const Controller = 'CommissionChgStateHistory'

@Component({
  selector: 'change-status-history',
  templateUrl: './change-status-history.component.html',
  styleUrls: ['./change-status-history.component.scss']
})
export class ChangeStatusHistoryComponent {

  @Input() PID: number
  @Input() ID: number

  gridOption = <CustomGridOption>{}

  formObj: any
  showGrid: boolean = false
  getAttr() {
    this.showGrid = false
    !CommissionStateAttr
      ? this.service.getAttr(Controller).subscribe((res: any) => this.setAttr(res.Data, 'toLocal'))
      : this.setAttr(CommissionStateAttr)
  }

  accesses = []
  setAttr(attr, type?) {
    this.gridOption.columnDefs = attr
    this.formObj = attr.EntityAttribute
    this.accesses = attr.EntityAccess
    type == 'toLocal' ? setCommissionStateAttr(attr) : null
    this.getSelect()
  }

  getSelect() {
    this.showGrid = false
    this.service.getSelect(Controller, this.ID).subscribe((res: any) => {
      this.gridOption.rowData = res.Data
      this.showGrid = true
    })
  }

  constructor(private service: GridFormService) { }

  ngOnChanges(UpdatedValue: any): void {
    this.getAttr()
  }

}
