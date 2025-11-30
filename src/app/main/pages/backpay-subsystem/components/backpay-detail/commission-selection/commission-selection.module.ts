import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { CommissionSelectionComponent } from './commission-selection.component'
import { CustomModalModule } from 'src/app/main/main-body/common/custom-modal/custom-modal.module'
import { CustomAgGridModule } from 'src/app/main/main-body/common/custom-ag-grid/custom-ag-grid.module'

@NgModule({
  imports: [
    CommonModule,
    CustomModalModule,
    CustomAgGridModule
  ],
  declarations: [CommissionSelectionComponent],
  exports: [CommissionSelectionComponent]
})
export class CommissionSelectionModule { }
