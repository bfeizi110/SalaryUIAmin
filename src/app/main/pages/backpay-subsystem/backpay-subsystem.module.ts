import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { BackpaySubsystemRouting } from './backpay-subsystem.routing'
import { BackpayIgnoreComponent } from './components/backpay-ignore/body/backpay-ignore.component'
import { BackpayIgnoreFormComponent } from './components/backpay-ignore/form/backpay-ignore-form.component'
import { CustomAgGridModule } from '../../main-body/common/custom-ag-grid/custom-ag-grid.module'
import { CustomFormModule } from '../../main-body/common/custom-form/custom-form.module'
import { CustomModalModule } from '../../main-body/common/custom-modal/custom-modal.module'
import { SelectPersonnelModule } from '../../main-body/common/select-personnel/select-personnel.module'
import { CommonPersonModule } from '../person-info/components/common-person/common-person.module'
import { BackpayDetailComponent } from './components/backpay-detail/body/backpay-detail.component'
import { BackpayDetailFormComponent } from './components/backpay-detail/form/backpay-detail-form.component'
import { SemiBackpayDetailComponent } from './components/backpay-detail/semi-backpay-detail/body/semi-backpay-detail.component'
import { SemiBackpayDetailParamFormComponent } from './components/backpay-detail/semi-backpay-detail/semi-backpay-detail-param-form/semi-backpay-detail-param-form.component';
import { SemiBackpayDetailFractionFormComponent } from './components/backpay-detail/semi-backpay-detail/semi-backpay-detail-fraction-form/semi-backpay-detail-fraction-form.component';
import { SemiBackpayDetailWorkAddingFormComponent } from './components/backpay-detail/semi-backpay-detail/semi-backpay-detail-work-adding-form/semi-backpay-detail-work-adding-form.component'
import { CommissionSelectionModule } from './components/backpay-detail/commission-selection/commission-selection.module'
import { BackPayInsureComponent } from './components/backpay-insure/body/backpay-insure.component'
import { BackPayInsureFormComponent } from './components/backpay-insure/form/backpay-insure-form.component'
import { BackPayInsureDetailComponent } from './components/backpay-insure/detail/body/backpay-insure-detail.component'
import { DetailInfoModule } from '../detail-info/detail-info.module'

@NgModule({
  imports: [
    CommonModule,
    BackpaySubsystemRouting,
    CustomAgGridModule,
    CustomFormModule,
    CustomModalModule,
    SelectPersonnelModule,
    CommonPersonModule,
    CommissionSelectionModule,
    DetailInfoModule
  ],
  declarations: [
    BackpayIgnoreComponent,
    BackpayIgnoreFormComponent,
    BackpayDetailComponent,
    BackpayDetailFormComponent,
    SemiBackpayDetailComponent,
    SemiBackpayDetailParamFormComponent,
    SemiBackpayDetailFractionFormComponent,
    SemiBackpayDetailWorkAddingFormComponent,
    BackPayInsureComponent,
    BackPayInsureFormComponent,
    BackPayInsureDetailComponent
  ]
})
export class BackpaySubsystemModule { }
