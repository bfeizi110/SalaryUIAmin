import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output } from '@angular/core'
import { of } from 'rxjs'
import { delay } from 'rxjs/operators'
import { CustomGridOption } from 'src/app/main/main-body/common/custom-ag-grid/interfaces/ag-grid-option.interface'
import { ModalOptions } from 'src/app/main/main-body/common/custom-modal/modal-options.interface'
import { GridFormService } from 'src/app/main/main-body/common/grid-form.service'
import { getFlowAttr,  setFlowAttr } from 'src/app/main/pages/global-attr'

const Controller = 'PersonHghRequest'

@Component({
  selector: 'request-flow',
  templateUrl: './request-flow.component.html',
  styleUrls: ['./request-flow.component.scss']
})

export class RquestFlowComponent implements AfterViewInit {

  @Output() closed = new EventEmitter()
  @Input() RequestId: any

  gridFlowOption = <CustomGridOption>{}
  showFlow: boolean = false

  async getSelectFlow() {
    let FlowAttr = getFlowAttr()
    !FlowAttr
      ? this.service.get(`${Controller}/GetAttributeFlow`).subscribe((res: any) => this.setAttrFlow(res.Data, 'toLocal'))
      : await this.setAttrFlow(FlowAttr, '')
  }

  async setAttrFlow(attr, type) {
    this.gridFlowOption.columnDefs = attr
    type == 'toLocal' ? setFlowAttr(attr) : null
    return await new Promise((resolve, reject) => {
      this.service.get(`${Controller}/GetFlow/${this.RequestId}`).toPromise().then((res: any) => {
        if (res)
        {
          this.gridFlowOption.rowData = res.Data
          this.showFlow = true;
          resolve(true);
        }
        else
          reject();
      })
    })
  
  }

  close() {
    this.showFlow = false
    this.closed.emit() 
  }

  modalOptions: ModalOptions={
    formType: 'ّFlow',
    modatTitle: 'گردش درخواست',
    hideCallback: this.close.bind(this),
  }

  constructor(private service: GridFormService) { 
  }

  ngAfterViewInit(): void {
    this.getSelectFlow()
  }

}
