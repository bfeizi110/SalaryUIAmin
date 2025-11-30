import { Component, HostListener } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { GridFormService } from '../../../grid-form.service';
import { Action } from '../../interfaces/action.interface';

@Component({
  selector: 'app-button-renderer',
  templateUrl: './button-renderer.component.html',
  styleUrls: ['./button-renderer.component.scss']
})
export class ButtonRendererComponent implements ICellRendererAngularComp {

  showDotIcon: boolean = false

  params
  label: string
  actions = []
  actionAccess = []
  component: string = ''

  agInit(params): void {
    //this.component = params.component
    this.params = params
    this.actions = this.params.actions
    this.actionAccess = this.params.actionAccess
    this.showAction()
  }

  editAction: Action
  deleteAction: Action
  printAction: Action
  orgTreeAction: Action
  costCenterTreeAction: Action
  accessAction: Action
  referAction: Action
  flowAction: Action
  cancelReferAction: Action
  cancelRequestAction: Action
  rejectAction: Action
  referBackAction: Action

  showAction() {
    this.actionAccess.includes("EditPolicy") ? this.editAction = this.actions.filter(a => a.label == "Edit")[0] : this.editAction = null

    this.actionAccess.includes("DeletePolicy") ? this.deleteAction = this.actions.filter(a => a.label == "Delete")[0] : this.deleteAction = null

    this.actionAccess.includes("PrintPolicy") ? this.printAction = this.actions.filter(a => a.label == "Print")[0] : this.printAction = null

    this.orgTreeAction = this.actions.filter(a => a.label == "OrgTree")[0]

    this.costCenterTreeAction = this.actions.filter(a => a.label == "CostCenterTree")[0]

    this.accessAction = this.actions.filter(a => a.label == "Access")[0]

    this.actionAccess.includes("ReferPolicy") ? this.referAction = this.actions.filter(a => a.label == "Refer")[0] : this.referAction = null

    this.actionAccess.includes("ReferBackPolicy") ? this.referBackAction = this.actions.filter(a => a.label == "ReferBack")[0] : this.referBackAction = null

    this.actionAccess.includes("RejectPolicy") ? this.rejectAction = this.actions.filter(a => a.label == "Reject")[0] : this.rejectAction = null

    this.actionAccess.includes("FlowPolicy") ? this.flowAction = this.actions.filter(a => a.label == "Flow")[0] : this.flowAction  = null

    this.actionAccess.includes("CancelReferPolicy") ? this.cancelReferAction = this.actions.filter(a => a.label == "CancelRefer")[0] : this.cancelReferAction  = null

    this.actionAccess.includes("CancelRequestPolicy") ? this.cancelRequestAction = this.actions.filter(a => a.label == "CancelRequest")[0] : this.cancelRequestAction  = null
  }

  @HostListener('mouseenter')
  mouseenter() {
    this.showDotIcon = true
  }

  @HostListener('mouseleave')
  mouseleave() {
    this.showDotIcon = false
  }

  onClick(item, $event) { item.callback({ event: $event, rowData: this.params.node.data }) }

  miniLog: string
  getMiniLog() {
    !this.miniLog ?
      this.service.getMiniLog(this.params.miniLogUrl ?? (this.params.controllerName.includes('/') ? `${this.params.controllerName}` : `${this.params.controllerName}/GetMiniLog`), this.params.node.data.Id).subscribe((res: any) => {
        const data = res.Data
        this.miniLog = `نام کاربر: ${data.CreateUserID}\nتاریخ ایجاد: ${data.CreateDateTime}\nتاریخ آخرین تغییر: ${data.LastUpdateDateTime}\nنام کاربر آخرین تغییر: ${data.LastUpdateUserID}`
      })
      : null
  }

  showLog: boolean = false
  onShowLog() { this.showLog = true }

  onCloseLog() { this.showLog = false }

  refresh() { return true }

  constructor(private service: GridFormService) { }

}
