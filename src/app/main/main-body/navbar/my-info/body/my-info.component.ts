import { Component, EventEmitter, OnInit, Output } from '@angular/core'
import { ModalOptions } from '../../../common/custom-modal/modal-options.interface'

@Component({
  selector: 'my-info',
  templateUrl: './my-info.component.html',
  styleUrls: ['./my-info.component.scss']
})
export class MyInfoComponent implements OnInit {

  @Output() closed = new EventEmitter()

  modalOptions: ModalOptions = {
    modatTitle: 'اطلاعات من',
    hideCallback: this.close.bind(this),
    maxWidth: 800
  }

  showModal: boolean = false
  close() { this.closed.emit() }

  constructor() { }

  ngOnInit(): void { }

}
