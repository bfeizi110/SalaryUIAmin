import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { ControlMessagesComponent } from './control-message.component'
import { MatFormFieldModule } from '@angular/material/form-field';
import { ControlMessageService } from './control-message.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule
  ],
  declarations: [
    ControlMessagesComponent
  ],
  providers: [
    ControlMessageService
  ],
  exports: [
    ControlMessagesComponent
  ]
})
export class ControlMessagesModule { }
