import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core'
import { ModalOptions } from 'src/app/main/main-body/common/custom-modal/modal-options.interface'
import { GridFormService } from 'src/app/main/main-body/common/grid-form.service'

const Controller = 'CommissionChgStateHistory'

@Component({
  selector: 'commission-state-form',
  templateUrl: './commission-state-form.component.html',
  styleUrls: ['./commission-state-form.component.scss']
})
export class CommissionStateFormComponent implements OnInit {

  @Input() ComIDList
  @Output() done = new EventEmitter()
  @Output() closed = new EventEmitter()
  @Input() type: string
  @Input() stateId: number

  comboArray = []
  getCombo() {
    this.comboArray.length == 0 ? this.service.get(`${Controller}/getcombo`).subscribe((res: any) => {
      this.comboArray = res.Data
      if (this.stateId) this.NewStatus = this.comboArray.filter(a => a.Id == this.stateId)[0]
    }) : null
  }

  refreshCombo() {
    this.comboArray = []
    this.getCombo()
  }

  NewStatus
  save() { this.type == 'isCommission' ? this.service.post(`CommissionChgStateHistory/SetStatus`, { HokmID: this.ComIDList.toString(), NewStatus: this.NewStatus.Id }).subscribe(_ => this.done.emit()) : this.service.post(`${Controller}/SetStatus`, { HokmID: this.ComIDList.toString(), NewStatus: this.NewStatus.Id }).subscribe(_ => this.done.emit()) }

  showModal: boolean = false
  close() {
    this.showModal = false
    this.closed.emit()
  }

  constructor(private service: GridFormService) { }

  modalOptions: ModalOptions

  ngOnInit(): void {
    this.getCombo()
    this.modalOptions = {
      formType: '',
      modatTitle: 'تغییر وضعیت حکم / احکام',
      saveCallback: this.save.bind(this),
      hideCallback: this.close.bind(this),
    }
    this.showModal = true
  }

}
