import { Routes, RouterModule } from '@angular/router'

import { AuthGuardService } from 'src/app/auth/providers/auth.guard'

import { HireTypePayFractionSettingComponent } from './components/hire-type-pay-fraction-setting/grid/hire-type-pay-fraction-setting.component'
import { DaraeiSettingComponent } from './components/daraei-setting/grid/daraei-setting.component'
import { ExemptSettingComponent } from './components/exempt-setting/grid/exempt-setting.component'
import { PersonMonthHistorySettingComponent } from './components/person-month-history-setting/grid/person-month-history-setting.component'
import { DashboardSettingComponent } from './components/dashboard-setting/dashboard-setting.component'
import { ImportSettingComponent } from './components/import-setting/body/import-setting.component'
import { SalaryCalcSettingComponent } from '../security/components/salary-calc-setting/grid/salary-calc-setting.component'

const routes: Routes = [
  { path: 'other-info', loadChildren: () => import('../setting/components/other-info/other-info.module').then(m => m.OtherInfoModule), canActivate: [AuthGuardService] },
  { path: 'jaridaraei-setting', component: HireTypePayFractionSettingComponent },
  { path: 'daraei-setting', component: DaraeiSettingComponent },
  { path: 'exempt-setting', component: ExemptSettingComponent },
  { path: 'PersonMonthHistorySetting', component: PersonMonthHistorySettingComponent },
  { path: 'DashBoardSetting', component: DashboardSettingComponent },
  { path: 'importsetting', component: ImportSettingComponent },
  { path: 'SalaryCalcSetting', component: SalaryCalcSettingComponent }
]

export const SettingRouting = RouterModule.forChild(routes)