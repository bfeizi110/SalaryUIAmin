import { Component, Output, EventEmitter, Input, OnInit, ViewChild } from '@angular/core'
import { UntypedFormGroup } from '@angular/forms'
import { GridFormService } from 'src/app/main/main-body/common/grid-form.service'
import { FormCommentsComponent } from 'src/app/main/pages/security/components/form/form-comments/form-comments.component'

@Component({
  selector: 'person-request-form',
  templateUrl: './person-request-form.component.html',
  styleUrls: ['./person-request-form.component.scss'],
})

export class PersonRequestFormComponent implements OnInit {

  @Output() done = new EventEmitter()
  @Output() closed = new EventEmitter()
  @Input() FormID: number
  @Input() formType: string
  @Input() ID: number
  @Input() WorkFlowID: number
  @Input() WorkFlowDetailID: number
  @Input() RequestEntryInfo: any
  @Output() buttonListDone = new EventEmitter()
  @ViewChild(FormCommentsComponent) commentComponent!: FormCommentsComponent;
  
  DynamicFormType: number = 100955
  form: UntypedFormGroup
  formObj: any

  Button1: any =  { code: 1, codeDesc: 'Test1', bgcolor: 'red', color: 'white', class:'close-button'}
  Button2: any =  { code: 2, codeDesc: 'Test2', bgcolor: 'blue', color: 'white', class:'close-button'}
  ButtonList: any[] =[]

  clickButtonList(code: number){
    console.log(code)
  }

  closeForm() {
    this.closed.emit()
  }  

  async buildForm() {

    // this.ButtonList.push(this.Button1)
    // this.ButtonList.push(this.Button2)
  }

  submited(newData:any) {
    this.done.emit(newData)

    this.closeForm()
  }

  
  constructor(private service: GridFormService) { }

  ngOnInit(): void { this.buildForm()}

}
