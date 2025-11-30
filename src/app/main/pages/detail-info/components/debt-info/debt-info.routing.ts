import { DebtSettingComponent } from './debt-setting/debt-setting.component';
import { DebtPlaceComponent } from './debt-place/grid/debt-place.component';
import { DebtFormulaComponent } from './debt-formula/grid/debt-formula.component';
import { DebtComponent } from './debt/grid/debt.component';
import { Routes, RouterModule } from '@angular/router'

export const routes: Routes = [
  { path: 'debt', component: DebtComponent },
  { path: 'debt-formula', component: DebtFormulaComponent },
  { path: 'debt-place', component: DebtPlaceComponent },
  { path: 'debt-setting', component: DebtSettingComponent }
]

export const DebtInfoRouting = RouterModule.forChild(routes)
