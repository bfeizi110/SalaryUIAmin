import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { CustomAgGridModule } from 'src/app/main/main-body/common/custom-ag-grid/custom-ag-grid.module';
import { CustomFormModule } from 'src/app/main/main-body/common/custom-form/custom-form.module';
import { CustomModalModule } from 'src/app/main/main-body/common/custom-modal/custom-modal.module';
import { CostCenterInfoRouting } from './cost-center-info.routing';
import { MatTreeModule } from '@angular/material/tree';
import { CostCenterComponent } from './cost-center/grid/cost-center.component';
import { CostCenterFormComponent } from './cost-center/form/cost-center-form.component';
import { CostCenterGroupComponent } from './cost-center-group/grid/cost-center-group.component';
import { CostCenterGroupFormComponent } from './cost-center-group/form/cost-center-group-form.component';
import { PayProgramComponent } from './pay-program/grid/pay-program.component';
import { PayProgramFormComponent } from './pay-program/form/pay-program-form.component';
import { CostCenterTreeComponent } from './cost-center-group/tree/tree/body/cost-center-tree.component';
import { CostCenterTreeFormComponent } from './cost-center-group/tree/tree/form/cost-center-tree-form.component';
import { CostCenterBankComponent } from './cost-center-group/tree/bank/grid/cost-center-bank.component';
import { CostCenterBankFormComponent } from './cost-center-group/tree/bank/form/cost-center-bank-form.component';
import { CostCenterUnitComponent } from './cost-center-group/tree/unit/grid/cost-center-unit.component';
import { CostCenterUnitFormComponent } from './cost-center-group/tree/unit/form/cost-center-unit-form.component';
import { TreeModalModule } from 'src/app/main/main-body/common/tree-modal/tree-modal.module';


@NgModule({
  declarations: [
    PayProgramComponent,
    PayProgramFormComponent,
    CostCenterComponent,
    CostCenterFormComponent,
    CostCenterGroupComponent,
    CostCenterGroupFormComponent,
    CostCenterTreeComponent,
    CostCenterTreeFormComponent,
    CostCenterBankComponent,
    CostCenterBankFormComponent,
    CostCenterUnitComponent,
    CostCenterUnitFormComponent
  ],
  imports: [
    CommonModule,
    CostCenterInfoRouting,
    CustomAgGridModule,
    CustomFormModule,
    CustomModalModule,
    MatTreeModule,
    TreeModalModule
  ]
})

export class CostCenterInfoModule { }
