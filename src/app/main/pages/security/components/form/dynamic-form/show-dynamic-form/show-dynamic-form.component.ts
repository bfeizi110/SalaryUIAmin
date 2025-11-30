import { Component, EventEmitter, OnInit, Input, Output } from '@angular/core'
import { GridFormService } from 'src/app/main/main-body/common/grid-form.service'

const Controller = 'Form'
@Component({
  selector: 'show-dynamic-form',
  templateUrl: './show-dynamic-form.component.html',
  styleUrls: ['./show-dynamic-form.component.scss']
})
export class ShowDynamicFormComponent implements OnInit {
  @Input() FormID: number
  @Input() DynamicFormType: number
  @Output() clicked = new EventEmitter()

  constructor(private service: GridFormService) { }
  Id: number

  rowclicked(newData:any)
  {
    this.clicked.emit(newData)
  }

  async ngOnInit() { 
    this.Id = +sessionStorage.getItem('formId')
  }
}
