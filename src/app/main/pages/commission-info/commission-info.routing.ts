import { Routes, RouterModule } from '@angular/router'
import { CommissionStateComponent } from './components/commission-state/body/commission-state.component'
import { CommissionComponent } from './components/commission/body/commission.component'
import { HokmComponent } from './components/hokm/grid/hokm.component'

export const routes: Routes = [
  { path: 'commission', component: CommissionComponent },
  { path: 'commission/:id', component: CommissionComponent },
  { path: 'hokm', component: HokmComponent },
  { path: 'commission-state', component: CommissionStateComponent }
]

export const CommissionInfoRouting = RouterModule.forChild(routes)
