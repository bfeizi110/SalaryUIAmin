import { MainComponent } from './main-body/body/main.component'
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardService } from '../auth/providers/auth.guard';

export const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      {
        path: 'dashboard', loadChildren: () => import('./pages/dashboard/dashboard.module').then(m => m.DashboardModule),
        canActivate: [AuthGuardService]
      },
      {
        path: 'kartable', loadChildren: () => import('./pages/kartable/kartable.module').then(m => m.KartableModule),
        canActivate: [AuthGuardService]
      },
      {
        path: 'chart-info', loadChildren: () => import('./pages/chart-info/chart-info.module').then(m => m.ChartInfoModule),
        canActivate: [AuthGuardService]
      },
      {
        path: 'detail-info', loadChildren: () => import('./pages/detail-info/detail-info.module').then(m => m.DetailInfoModule),
        canActivate: [AuthGuardService]
      },
      {
        path: 'person-info', loadChildren: () => import('./pages/person-info/person-info.module').then(m => m.PersonInfoModule),
        canActivate: [AuthGuardService]
      },
      {
        path: 'current-month-info', loadChildren: () => import('./pages/current-month-info/current-month-info.module').then(m => m.CurrentMonthInfoModule),
        canActivate: [AuthGuardService]
      },
      {
        path: 'commission-info', loadChildren: () => import('./pages/commission-info/commission-info.module').then(m => m.CommissionInfoModule),
        canActivate: [AuthGuardService]
      },
      {
        path: 'security', loadChildren: () => import('./pages/security/security.module').then(m => m.SecurityModule),
        canActivate: [AuthGuardService]
      },
      {
        path: 'setting', loadChildren: () => import('./pages/setting/setting.module').then(m => m.SettingModule),
        canActivate: [AuthGuardService]
      },
      {
        path: 'welfare-subsystem', loadChildren: () => import('./pages/welfare-subsystem/welfare-subsystem.module').then(m => m.WelfareSubsystemModule),
        canActivate: [AuthGuardService]
      },
      {
        path: 'backpay-subsystem', loadChildren: () => import('./pages/backpay-subsystem/backpay-subsystem.module').then(m => m.BackpaySubsystemModule),
        canActivate: [AuthGuardService]
      },
      {
        path: 'tadris-subsystem', loadChildren: () => import('./pages/tadris-subsystem/tadris-subsystem.module').then(m => m.TadrisSubsystemModule),
        canActivate: [AuthGuardService]
      },
      {
        path: 'baz-subsystem', loadChildren: () => import('./pages/baz-subsystem/baz-subsystem.module').then(m => m.BazSubsystemModule),
        canActivate: [AuthGuardService]
      },
      {
        path: 'report', loadChildren: () => import('./pages/report/report.module').then(m => m.ReportModule),
        canActivate: [AuthGuardService]
      }
    ]
  }
]

export const MainRouting = RouterModule.forChild(routes)
