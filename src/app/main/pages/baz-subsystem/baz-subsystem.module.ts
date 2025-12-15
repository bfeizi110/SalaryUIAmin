import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { BazSubsystemRouting } from './baz-subsystem.routing'
import { CustomAgGridModule } from '../../main-body/common/custom-ag-grid/custom-ag-grid.module'
import { SelectPersonnelModule } from '../../main-body/common/select-personnel/select-personnel.module'
import { CustomFormModule } from '../../main-body/common/custom-form/custom-form.module'
import { NgbCalendarPersian } from '@ng-bootstrap/ng-bootstrap'


@NgModule({
  imports: [
    CommonModule,
    BazSubsystemRouting,
    CustomAgGridModule,
    CustomFormModule,
    SelectPersonnelModule,
  ],
  declarations: [
  ],
  providers: [
    NgbCalendarPersian 
  ]  
})
export class BazSubsystemModule { }
