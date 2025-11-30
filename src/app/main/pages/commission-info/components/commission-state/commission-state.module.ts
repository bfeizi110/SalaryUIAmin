import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { CommissionStateComponent } from './body/commission-state.component'
import { CommissionStateFormComponent } from './form/commission-state-form.component'
import { SelectPersonnelModule } from 'src/app/main/main-body/common/select-personnel/select-personnel.module'
import { CustomFormModule } from 'src/app/main/main-body/common/custom-form/custom-form.module'
import { CustomAgGridModule } from 'src/app/main/main-body/common/custom-ag-grid/custom-ag-grid.module'
import { CustomModalModule } from 'src/app/main/main-body/common/custom-modal/custom-modal.module'

@NgModule({
  imports: [
    CommonModule,
    CustomFormModule,
    CustomAgGridModule,
    SelectPersonnelModule,
    CustomModalModule
  ],
  declarations: [
    CommissionStateComponent,
    CommissionStateFormComponent
  ],
  exports: [CommissionStateFormComponent]
})
export class CommissionStateModule { }
