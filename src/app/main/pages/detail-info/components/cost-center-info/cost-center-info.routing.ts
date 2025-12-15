import { Routes, RouterModule } from '@angular/router'
import { CostCenterGroupComponent } from './cost-center-group/grid/cost-center-group.component'
import { CostCenterComponent } from './cost-center/grid/cost-center.component'
import { PayProgramComponent } from './pay-program/grid/pay-program.component'

export const routes: Routes = [
  { path: 'pay-program', component: PayProgramComponent },
  { path: 'cost-center', component: CostCenterComponent },
  { path: 'cost-center-group', component: CostCenterGroupComponent }
]

export const CostCenterInfoRouting = RouterModule.forChild(routes)
