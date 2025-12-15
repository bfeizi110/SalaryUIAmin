import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'
import { CustomGridOption } from 'src/app/main/main-body/common/custom-ag-grid/interfaces/ag-grid-option.interface'
import { ModalOptions } from 'src/app/main/main-body/common/custom-modal/modal-options.interface'
import { GridFormService } from 'src/app/main/main-body/common/grid-form.service'
import { SemiBackPayCommissionAttr, SemiBackPayCommissionPayAttr, SemiBackPaySalaryCommissionPayAttr, setSemiBackPayCommissionAttr, setSemiBackPayCommissionPayAttr, setSemiBackPaySalaryCommissionPayAttr } from '../../../../global-attr'

const Controller = 'BackpayDetail'

@Component({
  selector: 'commission-backpay',
  templateUrl: './commission-backpay.component.html',
  styleUrls: ['./commission-backpay.component.scss']
})
export class CommissionBackpayComponent implements OnInit {

  @Input() PID: number
  @Output() commissionChanged = new EventEmitter()
  @Output() closed = new EventEmitter()


  gridOptionCommission = <CustomGridOption>{ rowClicked: this.clicked.bind(this) }

  commissionSelected: any
  async clicked(event) {
    this.commissionSelected = event.data
    !this.gridOptionSalaryCommissionPay.columnDefs ? await this.getAttrSalaryCommissionPayAttr() : null
    this.getSelectSalaryCommissionPay()
    !this.gridOptionCommissionPay.columnDefs ? await this.getAttrCommissionPayAttr() : null
    this.getSelectCommissionPay()
  }

  getAttrCommission() {
    return new Promise(resolve => {
      let Attr = SemiBackPayCommissionAttr()
      if (!Attr) {
        this.service.get(`${Controller}/GetCommissionListAttribute`).subscribe((res: any) => {
          this.setAttrCommission(res.Data, 'toLocal')
          return resolve(true)
        })
      }
      else {
        this.setAttrCommission(Attr)
        return resolve(true)
      }
    })
  }

  setAttrCommission(attr, type?) {
    this.gridOptionCommission.columnDefs = attr
    type == 'toLocal' ? setSemiBackPayCommissionAttr(attr) : null
    this.getSelectCommission()
  }

  showGridCommission: boolean = false
  getSelectCommission() {
    this.showGridCommission = false
    this.service.get(`${Controller}/GetCommissionList/${this.PID}`).subscribe((res: any) => {
      this.gridOptionCommission.rowData = res.Data
      this.showGridCommission = true
    })
  }

  gridOptionSalaryCommissionPay = <CustomGridOption>{}

  getAttrSalaryCommissionPayAttr() {
    return new Promise(resolve => {
      let Attr = SemiBackPaySalaryCommissionPayAttr()
      if (!Attr) {
        this.service.get(`${Controller}/GetSalaryCommissionPayListAttribute`).subscribe((res: any) => {
          this.setAttrSalaryCommissionPayAttr(res.Data, 'toLocal')
          return resolve(true)
        })
      }
      else {
        this.setAttrSalaryCommissionPayAttr(Attr)
        return resolve(true)
      }
    })
  }

  setAttrSalaryCommissionPayAttr(attr, type?) {
    this.gridOptionSalaryCommissionPay.columnDefs = attr
    type == 'toLocal' ? setSemiBackPaySalaryCommissionPayAttr(attr) : null
    this.getSelectSalaryCommissionPay()
  }

  showGridSalaryCommissionPay: boolean = false
  getSelectSalaryCommissionPay() {
    this.showGridSalaryCommissionPay = false
    this.service.get(`${Controller}/GetSalaryCommissionPayList/${this.PID}/${this.commissionSelected.Id}`).subscribe((res: any) => {
      this.gridOptionSalaryCommissionPay.rowData = res.Data
      this.showGridSalaryCommissionPay = true
    })
  }

  gridOptionCommissionPay = <CustomGridOption>{}

  getAttrCommissionPayAttr() {
    return new Promise(resolve => {
      let Attr = SemiBackPayCommissionPayAttr()
      if (!Attr) {
        this.service.get(`${Controller}/GetBackPayCommissionPayAttribute`).subscribe((res: any) => {
          this.setAttrCommissionPayAttr(res.Data, 'toLocal')
          return resolve(true)
        })
      }
      else {
        this.setAttrCommissionPayAttr(Attr)
        return resolve(true)
      }
    })
  }

  setAttrCommissionPayAttr(attr, type?) {
    this.gridOptionCommissionPay.columnDefs = attr
    type == 'toLocal' ? setSemiBackPayCommissionPayAttr(attr) : null
    this.getSelectCommissionPay()
  }

  showGridCommissionPay: boolean = false
  getSelectCommissionPay() {
    this.showGridCommissionPay = false
    this.service.get(`${Controller}/GetBackPayCommissionPay/${this.PID}/${this.commissionSelected.Id}`).subscribe((res: any) => {
      this.gridOptionCommissionPay.rowData = res.Data
      this.showGridCommissionPay = true
    })
  }

  modalOptions: ModalOptions = {
    //formType: this.formType,
    modatTitle: 'احکام و معوقات',
    saveCallback: this.save.bind(this),
    hideCallback: this.close.bind(this),
    maxWidth: 1070
  }

  save() { this.commissionChanged.emit(this.commissionSelected) }

  close() { this.closed.emit() }

  constructor(private service: GridFormService) { }

  ngOnInit(): void { this.getAttrCommission() }

}
