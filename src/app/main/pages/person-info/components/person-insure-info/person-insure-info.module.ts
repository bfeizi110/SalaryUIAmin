import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { PersonInsureInfoComponent } from './body/person-insure-info.component'
import { PersonInsureInfoFormComponent } from './form/person-insure-info-form.component'
import { CustomAgGridModule } from 'src/app/main/main-body/common/custom-ag-grid/custom-ag-grid.module'
import { CustomFormModule } from 'src/app/main/main-body/common/custom-form/custom-form.module'
import { SelectPersonnelModule } from 'src/app/main/main-body/common/select-personnel/select-personnel.module'
import { CommonPersonModule } from '../common-person/common-person.module'

@NgModule({
  imports: [
    CommonModule,
    CustomAgGridModule,
    CustomFormModule,
    SelectPersonnelModule,
    CommonPersonModule
  ],
  declarations: [
    PersonInsureInfoComponent,
    PersonInsureInfoFormComponent
  ]
})
export class PersonInsureInfoModule { }
