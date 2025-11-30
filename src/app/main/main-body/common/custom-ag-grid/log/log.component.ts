import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'
import { ModalOptions } from '../../custom-modal/modal-options.interface'
import { GridFormService } from './../../grid-form.service'
import { AuditAttr, AuditPropAttr, setAuditAttr, setAuditPropAttr } from 'src/app/main/pages/global-attr'
import { CustomGridOption } from '../interfaces/ag-grid-option.interface'

const Controller = 'Audit'

@Component({
  selector: 'log',
  templateUrl: './log.component.html',
  styleUrls: ['./log.component.scss']
})
export class LogComponent implements OnInit {

  @Input() ID: number
  @Input() tableName: number

  @Output() closed = new EventEmitter()

  gridOptionAudit = <CustomGridOption>{
    controllerName: Controller,
    rowClicked: this.onRowClicked.bind(this)
  }

  showGridProp: boolean = false
  onRowClicked(event) {
    this.ParentID = event.data.Id
    this.showGridProp = false
    this.getAuditPropAttr()
  }

  showGridAudit: boolean
  showModal: boolean = false
  getAuditAttr() {
    this.showGridAudit = false
    !AuditAttr
      ? this.service.getAttr(Controller).subscribe((res: any) => this.setAuditAttr(res.Data, 'toLocal'))
      : this.setAuditAttr(AuditAttr)
  }

  setAuditAttr(attr, type?) {
    this.gridOptionAudit.columnDefs = attr
    type == 'toLocal' ? setAuditAttr(attr) : null
    this.getSelectAudit()
  }

  getSelectAudit() {
    this.showGridAudit = false
    this.service.get(`${Controller}/Entity/${this.tableName}/${this.ID}`).subscribe((res: any) => {
      this.gridOptionAudit.rowData = res.Data
      this.showModal = true
      this.showGridAudit = true
    })
  }

  gridOptionAuditProp = <CustomGridOption>{
    controllerName: Controller
  }

  showGridAuditProp: boolean
  ParentID: number
  getAuditPropAttr() {
    this.showGridAuditProp = false
    !AuditPropAttr
      ? this.service.get(`${Controller}/GetAttributeProperty`).subscribe((res: any) => this.setAuditPropAttr(res.Data, 'toLocal'))
      : this.setAuditPropAttr(AuditPropAttr)
  }

  setAuditPropAttr(attr, type?) {
    this.gridOptionAuditProp.columnDefs = attr
    type == 'toLocal' ? setAuditPropAttr(attr) : null
    this.getSelectAuditProp()
  }

  getSelectAuditProp() {
    this.showGridAuditProp = false
    this.service.get(`${Controller}/${this.ParentID}`).subscribe((res: any) => {
      this.gridOptionAuditProp.rowData = res.Data
      this.showGridAuditProp = true
    })
  }

  modalOptions: ModalOptions = {
    modatTitle: 'مشاهده کامل رویدادها',
    hideCallback: this.onCloseLog.bind(this),
    maxWidth: 1000
  }

  onCloseLog() { this.closed.emit() }

  constructor(private service: GridFormService) { }

  ngOnInit(): void {
    this.getAuditAttr()
  }

}
