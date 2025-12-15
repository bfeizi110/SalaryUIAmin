import { Component, EventEmitter, Input, Output } from '@angular/core'
import { GridFormService } from 'src/app/main/main-body/common/grid-form.service'
import { ListNoAttr, setListNoAttr } from 'src/app/main/pages/global-attr'

const Controller = 'ListNo'

@Component({
  selector: 'list-no-form-direct',
  templateUrl: './list-no-form-direct.component.html',
  styleUrls: ['./list-no-form-direct.component.scss']
})
export class ListNoFormDirectComponent {

  @Output() done = new EventEmitter()
  @Output() closed = new EventEmitter()

  formObj: any
  showForm: boolean = false
  submited($event){
    this.done.emit($event) 
  }

  closeForm(){
    this.showForm = false
    this.closed.emit()
  }

  getAttr() {
    let Attr = ListNoAttr()
    !Attr
      ? this.service.getAttr(Controller).subscribe((res: any) => this.setAttr(res.Data, 'toLocal'))
      : this.setAttr(Attr)
    this.showForm = true
  }

  setAttr(attr, type?) {
    this.formObj = attr.EntityAttribute
    type == 'toLocal' ? setListNoAttr(attr) : null
  }

  constructor(private service: GridFormService) { }

  ngOnInit(): void { this.getAttr() }
}
