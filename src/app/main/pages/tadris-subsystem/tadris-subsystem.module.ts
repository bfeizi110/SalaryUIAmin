import { CommonPersonModule } from './../person-info/components/common-person/common-person.module';
import { PersonInfoModule } from './../person-info/person-info.module';
import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { TadrisSubsystemRouting } from './tadris-subsystem.routing'
import { TadrisFractionTypeComponent } from './components/tadris-fraction-type/grid/tadris-fraction-type.component'
import { TadrisFractionTypeFormComponent } from './components/tadris-fraction-type/form/tadris-fraction-type-form.component'
import { CustomAgGridModule } from '../../main-body/common/custom-ag-grid/custom-ag-grid.module'
import { CustomModalModule } from '../../main-body/common/custom-modal/custom-modal.module'
import { CustomFormModule } from '../../main-body/common/custom-form/custom-form.module';
import { TadrisPayTypeComponent } from './components/tadris-pay-type/grid/tadris-pay-type.component'
import { TadrisPayTypeFormComponent } from './components/tadris-pay-type/form/tadris-pay-type-form.component';
import { TadrisComponent } from './components/tadris/body/tadris.component'
import { TadrisFormComponent } from './components/tadris/form/tadris-form.component'
import { SelectPersonnelModule } from '../../main-body/common/select-personnel/select-personnel.module'
import { CommissionSelectionModule } from '../backpay-subsystem/components/backpay-detail/commission-selection/commission-selection.module'
import { TreeModalModule } from '../../main-body/common/tree-modal/tree-modal.module';
import { TadrisFractionComponent } from './components/tadris/form/tadris-fraction/grid/tadris-fraction.component'
import { TadrisPayComponent } from './components/tadris/form/tadris-pay/grid/tadris-pay.component'
import { TadrisFractionFormComponent } from './components/tadris/form/tadris-fraction/form/tadris-fraction-form.component'
import { TadrisPayFormComponent } from './components/tadris/form/tadris-pay/form/tadris-pay-form.component'
import { DetailInfoModule } from '../detail-info/detail-info.module';

@NgModule({
  imports: [
    CommonModule,
    TadrisSubsystemRouting,
    CustomAgGridModule,
    CustomModalModule,
    CustomFormModule,
    SelectPersonnelModule,
    CommissionSelectionModule,
    TreeModalModule,
    PersonInfoModule,
    CommonPersonModule,
    DetailInfoModule,
  ],
  declarations: [
    TadrisFractionTypeComponent,
    TadrisFractionTypeFormComponent,
    TadrisPayTypeComponent,
    TadrisPayTypeFormComponent,
    TadrisComponent,
    TadrisFormComponent,
    TadrisFractionComponent,
    TadrisPayComponent,
    TadrisFractionFormComponent,
    TadrisPayFormComponent,
   
  ],
})
export class TadrisSubsystemModule { }
