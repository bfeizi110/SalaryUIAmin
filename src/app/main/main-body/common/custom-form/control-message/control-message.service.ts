import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Validation } from './Validation';

@Injectable()
export class ControlMessageService {

  submitted
  message: string
  messages = []
  labels: string[] = []
  set isSubmitted(val: boolean) {
    //aa ? this.toastr.error('عملیات با خطا مواجه شد') : null
    this.submitted = val
    if (this.submitted) {
      outer_loop:
      for (let i = 0; i < this.controls.length; i++) {
        const control = this.controls[i]
        for (let propertyName in control.errors) {
          if (control.errors.hasOwnProperty(propertyName)) {
            this.message = Validation.getValidatorErrorMessage(this.labels[i], propertyName, control.errors[propertyName])
            this.toastr.error(this.message, 'خطا')
            break outer_loop
          }
        }
      }
    }
  }

  controls = []

  constructor(private toastr: ToastrService) { }
}
