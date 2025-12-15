import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { CommissionInfoRouting } from './commission-info.routing'
import { CustomAgGridModule } from '../../main-body/common/custom-ag-grid/custom-ag-grid.module'
import { CustomFormModule } from '../../main-body/common/custom-form/custom-form.module'
import { CustomModalModule } from '../../main-body/common/custom-modal/custom-modal.module'
import { HokmComponent } from './components/hokm/grid/hokm.component'
import { HokmFormComponent } from './components/hokm/form/hokm-form.component'
import { CommissionStateModule } from './components/commission-state/commission-state.module'
import { CommissionModule } from './components/commission/commission.module'

@NgModule({
  imports: [
    CommonModule,
    CommissionInfoRouting,
    CustomAgGridModule,
    CustomFormModule,
    CustomModalModule,
    CommissionStateModule,
    CommissionModule
  ],
  declarations: [
    HokmComponent,
    HokmFormComponent
  ]
})
export class CommissionInfoModule { }
