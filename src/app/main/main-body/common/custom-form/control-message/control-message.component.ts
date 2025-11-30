import { ControlMessageService } from './control-message.service'

import { Component, Input } from '@angular/core'
import { UntypedFormControl } from '@angular/forms'
import { Validation } from './Validation'

@Component({
  selector: 'control-message',
  templateUrl: './control-message.component.html',
  styleUrls: ['./control-message.component.scss']
})

export class ControlMessagesComponent {
  @Input() control: UntypedFormControl
  @Input() IsSubmitted: boolean
  @Input() label: string;

  ngOnChanges(UpdatedValue: string): void {
    this.service.isSubmitted = false
    this.findError()

    if (!this.control) console.log(this.label)
    this.control.valueChanges.subscribe(_ => this.findError())
  }

  ngOnDestroy(): void {
    this.service.controls = []
    this.service.labels = []
  }

  constructor(public service: ControlMessageService) { }

  message: string = ''

  findError() {
    if (!this.control?.errors) {
      this.service.controls = this.service.controls.filter(a => a != this.control)
      this.service.labels = this.service.labels.filter(a => a != this.label)
      return this.message = null
    }

    for (let propertyName in this.control.errors) if (this.control.errors.hasOwnProperty(propertyName)) this.message = Validation.getValidatorErrorMessage(this.label, propertyName, this.control.errors[propertyName])
    this.service.controls.push(this.control)
    this.service.labels.push(this.label)
  }

}
