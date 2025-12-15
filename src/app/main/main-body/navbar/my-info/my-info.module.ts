import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { CustomAgGridModule } from '../../common/custom-ag-grid/custom-ag-grid.module'
import { FilterUserAccessComponent } from './filter-user-access/filter-user-access.component'
import { MyInfoComponent } from './body/my-info.component'
import { CustomFormModule } from '../../common/custom-form/custom-form.module'
import { CustomModalModule } from '../../common/custom-modal/custom-modal.module'


@NgModule({
  declarations: [
    MyInfoComponent,
    FilterUserAccessComponent
  ],
  imports: [
    CommonModule,
    CustomAgGridModule,
    CustomFormModule,
    CustomModalModule
  ],
  exports: [
    MyInfoComponent,
    FilterUserAccessComponent
  ]
})
export class MyInfoModule { }
