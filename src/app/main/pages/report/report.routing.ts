import { Routes, RouterModule } from '@angular/router'
import { AuthGuardService } from 'src/app/auth/providers/auth.guard'
import { DebtReportComponent } from './components/debt-report/debt-report.component'
import { ReportDesignViewComponent } from './components/report-design-view/report-design-view.component'
import { TaminFileComponent } from './components/tamin-file/body/tamin-file.component'

export const routes: Routes = [
  { path: 'debt-report', component: DebtReportComponent },
  { path: 'report-design-view/:id', component: ReportDesignViewComponent },
  { path: 'tamin-file', component: TaminFileComponent },
  { path: 'report-setting', loadChildren: () => import('./report-setting/report-setting.module').then(m => m.ReportSettingModule), canActivate: [AuthGuardService] },
]

export const ReportRouting = RouterModule.forChild(routes)
