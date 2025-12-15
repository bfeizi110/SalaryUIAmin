import { Component, Input } from '@angular/core'
import { CustomGridOption } from 'src/app/main/main-body/common/custom-ag-grid/interfaces/ag-grid-option.interface'
import { GridFormService } from 'src/app/main/main-body/common/grid-form.service'
import { SalaryCommissionBackPayAttr, SalaryCommissionPayAttr, setSalaryCommissionBackPayAttr, setSalaryCommissionPayAttr } from '../../../../global-attr'

const Controller = 'BackPayDetail'

@Component({
  selector: 'payment-history',
  templateUrl: './payment-history.component.html',
  styleUrls: ['./payment-history.component.scss']
})

export class PaymentHistoryComponent {

  @Input() ID: number
  @Input() PID: number

  gridOptionPay = <CustomGridOption>{ controllerName: Controller }

  showGridPay: boolean = false
  formObjPay: any
  getAttrPay() {
    this.showGridPay = false
    !SalaryCommissionPayAttr
      ? this.service.get(`${Controller}/GetSalaryCommissionPayListAttribute`).subscribe((res: any) => this.setAttrSalary(res.Data, 'toLocal'))
      : this.setAttrSalary(SalaryCommissionPayAttr)
  }

  setAttrSalary(attr, type?) {
    this.gridOptionPay.columnDefs = attr
    this.formObjPay = attr.EntityAttribute
    type == 'toLocal' ? setSalaryCommissionPayAttr(attr) : null
    this.getSelectPay()
  }

  getSelectPay() {
    this.showGridPay = false
    this.service.get(`${Controller}/GetSalaryCommissionPayList/${this.PID}/${this.ID}`).subscribe((res: any) => {
      this.gridOptionPay.rowData = res.Data
      this.showGridPay = true
    })
  }

  gridOptionBackPay = <CustomGridOption>{ controllerName: Controller }

  showGridBackPay: boolean = false
  formObjBackPay: any
  getAttrBackPay() {
    this.showGridBackPay = false
    !SalaryCommissionBackPayAttr
      ? this.service.get(`${Controller}/GetBackPayCommissionPayAttribute`).subscribe((res: any) => this.setAttrBackPay(res.Data, 'toLocal'))
      : this.setAttrBackPay(SalaryCommissionBackPayAttr)
  }

  setAttrBackPay(attr, type?) {
    this.gridOptionBackPay.columnDefs = attr
    this.formObjBackPay = attr.EntityAttribute
    type == 'toLocal' ? setSalaryCommissionBackPayAttr(attr) : null
    this.getSelectBackPay()
  }

  getSelectBackPay() {
    this.showGridBackPay = false
    this.service.get(`${Controller}/GetBackPayCommissionPay/${this.PID}/${this.ID}`).subscribe((res: any) => {
      this.gridOptionBackPay.rowData = res.Data
      this.showGridBackPay = true
    })
  }

  constructor(private service: GridFormService) { }

  ngOnChanges(UpdatedValue: string): void {
    this.getAttrPay()
    this.getAttrBackPay()
  }

}
