import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { PaymentHistoryComponent } from './payment-history/payment-history.component'
import { ChangeStatusHistoryComponent } from './change-status-history/change-status-history.component'
import { CommissionComponent } from './body/commission.component'
import { CommissionFormComponent } from './form/commission-form.component'
import { CommissionParameterComponent } from './commission-parameter/commission-parameter.component'
import { SelectPersonnelModule } from 'src/app/main/main-body/common/select-personnel/select-personnel.module'
import { CustomAgGridModule } from 'src/app/main/main-body/common/custom-ag-grid/custom-ag-grid.module'
import { CustomFormModule } from 'src/app/main/main-body/common/custom-form/custom-form.module'
import { TreeModalModule } from 'src/app/main/main-body/common/tree-modal/tree-modal.module'
import { CommissionStateModule } from '../commission-state/commission-state.module'
import { CustomModalModule } from 'src/app/main/main-body/common/custom-modal/custom-modal.module'
import { NgxMaskModule } from 'ngx-mask'

@NgModule({
  imports: [
    CommonModule,
    CustomAgGridModule,
    CustomFormModule,
    TreeModalModule,
    CommissionStateModule,
    SelectPersonnelModule,
    CustomModalModule,
    NgxMaskModule
  ],
  declarations: [
    PaymentHistoryComponent,
    ChangeStatusHistoryComponent,
    CommissionComponent,
    CommissionFormComponent,
    CommissionParameterComponent
  ],
})
export class CommissionModule { }
