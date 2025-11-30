import { Component, EventEmitter, Input, Output } from '@angular/core'
import { AlertClass } from 'src/app/main/main-body/common/alert/alert-functions'
import { GridFormService } from 'src/app/main/main-body/common/grid-form.service'

const Controller = 'PersonHghRequest'

@Component({
  selector: 'form-comments',
  templateUrl: './form-comments.component.html',
  styleUrls: ['./form-comments.component.scss']
})
export class FormCommentsComponent {

  @Output() done = new EventEmitter()
  @Output() closed = new EventEmitter()
  @Output() getdone = new EventEmitter()
  @Input() ID: number
  @Input() FormType: string
  @Input() DynamicFormType: number
  @Input() FormID: number

  RequestsComment: any = []
  showRequestComment: boolean = false
  showNewCommentForm = false;
  NewCommentDesc: string

  editComment(comment) {
    comment.isEditMode = true;
    comment.OriginalDesc_Fld = comment.Desc_Fld;
  }
  cancelEdit(comment) {
    comment.Desc_Fld = comment.OriginalDesc_Fld ;
    comment.isEditMode = false;
  }
  saveComment(comment, newDesc) {
    comment.Desc_Fld = newDesc;

    this.service.post(`${Controller}/UpdateRequestComment`, {Id: comment.Id, RequestID_Fld: this.ID, Desc_Fld: comment.Desc_Fld, UserAccess_Fld: '', DynamicFormType_Fld: this.DynamicFormType, FormID_Fld: this.FormID}).toPromise()

    comment.isEditMode = false;
  }
  
  addComment(LID: number){
      if (LID = -1)
        LID = this.ID
      this.showRequestComment = false
      this.showNewCommentForm = false
      this.service.post(`${Controller}/CreateRequestComment`,{ Id: 0, RequestID_Fld: LID, Desc_Fld: this.NewCommentDesc, UserAccess_Fld: '', DynamicFormType_Fld: this.DynamicFormType, FormID_Fld: this.FormID}).toPromise().then((res: any) => {
        if (!res || !res.Data) return this.done.emit(false)
        else {
          this.RequestsComment = res.Data
          this.showRequestComment = true
          this.NewCommentDesc = ''
        }
      })
  }
  deleteComment(Id){
    AlertClass.deleteAlert(_ => {
      this.showRequestComment = false
      this.service.get(`${Controller}/DeleteRequestComment/${Id}`).toPromise().then((res: any) => {
        if (!res || !res.Data) return this.done.emit(false)
        else {
          this.RequestsComment = res.Data
          this.showRequestComment = true
        }
      })
    })
  }

  get() {
    this.service.get(`${Controller}/GetSelectRequestComment/${this.ID}/${this.FormID}`).toPromise().then((res: any) => {
      if (!res) {
        this.getdone.emit()        
        this.done.emit(false)
        return
      }
      else {
        this.RequestsComment = res.Data
        this.showRequestComment = true
        this.getdone.emit()
      }
    })
  }

  constructor(private service: GridFormService) { }

  ngOnInit(): void {

    if (this.FormType != 'Add')
      this.get()
   else
   {
     this.showRequestComment = true
     this.showNewCommentForm = true
   }

  }

}
