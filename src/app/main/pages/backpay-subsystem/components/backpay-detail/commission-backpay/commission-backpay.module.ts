import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { CommissionBackpayComponent } from './commission-backpay.component'
import { CustomModalModule } from 'src/app/main/main-body/common/custom-modal/custom-modal.module'
import { CustomAgGridModule } from 'src/app/main/main-body/common/custom-ag-grid/custom-ag-grid.module'

@NgModule({
  imports: [
    CommonModule,
    CustomModalModule,
    CustomAgGridModule
  ],
  declarations: [
    CommissionBackpayComponent
  ],
  exports: [CommissionBackpayComponent]
})
export class CommissionBackpayModule { }
