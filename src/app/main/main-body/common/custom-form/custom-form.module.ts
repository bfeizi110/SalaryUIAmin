import { NgModule } from '@angular/core'
import { CommonModule, DecimalPipe } from '@angular/common'
import { MatButtonModule } from '@angular/material/button'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatInputModule } from '@angular/material/input'
import { MatTabsModule } from '@angular/material/tabs'
import { CustomInputComponent } from './custom-input/custom-input.component'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { ControlMessagesModule } from './control-message/control-message.module'
import { MatCheckboxModule } from '@angular/material/checkbox'
import { MatRadioModule } from '@angular/material/radio'
import { MatSelectModule } from '@angular/material/select'
import { DatePickerModule } from './date-picker/date-picker.module'
import { MatCardModule } from '@angular/material/card'
import { NgxMaskModule } from 'ngx-mask'
import { MatIconModule } from '@angular/material/icon'
import { MatFilterComponent } from './mat-filter/mat-filter.component';
import { DynamicFormComponent } from './dynamic-form/dynamic-form.component'
import { MatAutocompleteModule } from '@angular/material/autocomplete'
import { MultiSelectComponent } from './multiselect/multiselect.component'
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { FileUploadComponent } from './file-upload/file-upload.component';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
const MATERIALS = [
  MatFormFieldModule,
  MatCheckboxModule,
  MatInputModule,
  MatButtonModule,
  MatTabsModule,
  MatRadioModule,
  MatSelectModule,
  MatCardModule,
  MatIconModule,
  MatAutocompleteModule,
  NgxMatSelectSearchModule,
  NgxMaterialTimepickerModule,
  MatDatepickerModule,
  MatNativeDateModule,
]

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ControlMessagesModule,
    DatePickerModule,
    NgxMaskModule,
    MATERIALS
  ],
  declarations: [
    CustomInputComponent,
    MatFilterComponent,
    DynamicFormComponent,
    MultiSelectComponent,
    FileUploadComponent,
  ],
  providers: [
    DecimalPipe
  ],
  exports: [
    CustomInputComponent,
    FileUploadComponent,
    DatePickerModule,
    MatFilterComponent,
    FormsModule,
    ReactiveFormsModule,
    MultiSelectComponent,
    MATERIALS

  ]
})
export class CustomFormModule { }
