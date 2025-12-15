import { NgxMaskModule } from 'ngx-mask'
import { FormsModule } from '@angular/forms'
import { NgbModule } from '@ng-bootstrap/ng-bootstrap'
import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { ReactiveFormsModule } from '@angular/forms'
import { DatePickerPersianComponent } from './persian/date-picker-persian.component'
import { DatePickerGeorgianComponent } from './gregorian/date-picker-georgian.component'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatInputModule } from '@angular/material/input'
import { MatButtonModule } from '@angular/material/button'
import { ControlMessagesModule } from '../control-message/control-message.module'
import { SharedModule } from './persian/sheard.model'
import { MatIconModule } from '@angular/material/icon'

@NgModule({
  imports: [
    CommonModule,
    NgbModule,
    FormsModule,
    NgxMaskModule.forRoot(),
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    ControlMessagesModule,
    SharedModule,


  ],
  declarations: [
    DatePickerPersianComponent,
    DatePickerGeorgianComponent
  ],
  exports: [
    DatePickerPersianComponent,
    DatePickerGeorgianComponent,
  ],
})
export class DatePickerModule { }
