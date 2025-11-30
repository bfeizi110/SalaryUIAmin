import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { WalfareSubsystemRouting } from './welfare-subsystem.routing'
import { CustomAgGridModule } from '../../main-body/common/custom-ag-grid/custom-ag-grid.module'
import { CustomFormModule } from '../../main-body/common/custom-form/custom-form.module'
import { CustomModalModule } from '../../main-body/common/custom-modal/custom-modal.module'
import { SelectPersonnelModule } from '../../main-body/common/select-personnel/select-personnel.module'
import { GridFormService } from '../../main-body/common/grid-form.service'
import { TreeModalModule } from '../../main-body/common/tree-modal/tree-modal.module'
import { PersonAssignSettleGuarantorsComponent } from './components/person-assign-settle-guarantors/body/person-assign-settle-guarantors.component'
import { PersonAssignDebtFormComponent } from './components/person-assign-settle-guarantors/form/person-assign-debt-form.component'
import { GuarantorsComponent } from './components/person-assign-settle-guarantors/guarantors/grid/guarantors.component'
import { GuarantorsFormComponent } from './components/person-assign-settle-guarantors/guarantors/form/guarantors-form.component'
import { SettleDebtComponent } from './components/person-assign-settle-guarantors/settle-debt/grid/settle-debt.component'
import { SettleDebtFormComponent } from './components/person-assign-settle-guarantors/settle-debt/form/settle-debt-form.component'
import { PersonAssignIncreaseSavingComponent } from './components/person-assign-increase-saving/body/person-assign-increase-saving.component'
import { PersonAssignSavingFormComponent } from './components/person-assign-increase-saving/form/person-assign-saving-form.component'
import { IncreaseSavingFormComponent } from './components/person-assign-increase-saving/increase-saving/form/increase-saving-form.component'
import { IncreaseSavingComponent } from './components/person-assign-increase-saving/increase-saving/grid/increase-saving.component'

@NgModule({
  imports: [
    CommonModule,
    WalfareSubsystemRouting,
    CustomAgGridModule,
    CustomFormModule,
    CustomModalModule,
    SelectPersonnelModule,
    TreeModalModule
  ],
  declarations: [
    PersonAssignSettleGuarantorsComponent,
    PersonAssignDebtFormComponent,
    GuarantorsComponent,
    GuarantorsFormComponent,
    SettleDebtComponent,
    SettleDebtFormComponent,
    PersonAssignIncreaseSavingComponent,
    IncreaseSavingComponent,
    PersonAssignSavingFormComponent,
    IncreaseSavingFormComponent
  ],
  providers: [
    GridFormService
  ]
})

export class WelfareSubsystemModule { }
