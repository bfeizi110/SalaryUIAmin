import { Component, EventEmitter, OnInit, Output } from '@angular/core'
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms'
import { ModalOptions } from '../../common/custom-modal/modal-options.interface'
import { GridFormService } from '../../common/grid-form.service'

const Controller = 'Users'

@Component({
  selector: 'change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {

  @Output() closed = new EventEmitter()

  showModal: boolean = false
  form: UntypedFormGroup
  setForm() {
    this.form = this.formBuilder.group({
      UserId: [sessionStorage.getItem('OwnerUserId')],
      OldPassword: [null, [Validators.required]],
      ConfirmPassword: [null, [Validators.required]],
      Password: [null, [Validators.required]],
      FormType:[]
    })
    this.showModal = true
  }

  modalOptions: ModalOptions = {
    formType: 'Add',
    modatTitle: 'تغییر کلمه عبور',
    saveCallback: this.post.bind(this),
    hideCallback: this.close.bind(this),
    notchangemodaltitle: true
  }

  post() {
    this.form.patchValue({ Id: 0 })
    this.service.post(`${Controller}/ChangePassword`, this.form.getRawValue()).subscribe((res: any) => this.closed.emit())
  }

  close() { this.closed.emit() }

  constructor(private service: GridFormService, private formBuilder: UntypedFormBuilder) { }

  ngOnInit(): void { this.setForm() }

}
