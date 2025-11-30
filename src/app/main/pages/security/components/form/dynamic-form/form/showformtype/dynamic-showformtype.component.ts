import { Component, EventEmitter, Input, Output, OnChanges } from '@angular/core'
import { ModalOptions } from 'src/app/main/main-body/common/custom-modal/modal-options.interface'
import { of } from 'rxjs';
import { delay } from 'rxjs/operators';
@Component({
  selector: 'dynamic-showfromtype',
  templateUrl: './dynamic-showformtype.component.html',
  styleUrls: ['./dynamic-showformtype.component.scss']
})
export class DynamicShowFormTypeComponent implements OnChanges{

  @Output() done = new EventEmitter()
  @Output() closed = new EventEmitter()
  @Output() buttonListDone = new EventEmitter()
  @Input() ID: number
  @Input() FormID: number
  @Input() DynamicFormType: number
  @Input() FormType: string
  @Input() formObj: any
  @Input() formTabAttr: any
  @Input() ParentFormID: string 
  @Input() ParentID: string 
  @Input() MainFormID: number
  @Input() RequestEntryInfo: any
  @Input() WorkFlowID: any
  @Input() MasterDetailID: number
  @Input() ButtonList: any[]  
  showForm: boolean = false
  closeForm() {
    this.showForm = false
    this.closed.emit()
  }
  submited(newdata:any) {
    this.closeForm()
    this.done.emit(newdata)
  }

  clickButtonList(code: number){
    this.buttonListDone.emit(code)
  }

  modalOptions: ModalOptions
  constructor() { }

  ngOnChanges(): void {
    this.showForm = false
    of(null).pipe(
      delay(0)
    ).subscribe(() => {
      this.showForm = true;
    });

    this.modalOptions = {
    formType: this.FormType,
    modatTitle: 'مشخصات فرم',
    // saveCallback: this.save.bind(this),
    hideCallback: this.closeForm.bind(this),
    }
  }

}
