import { Routes, RouterModule } from '@angular/router'
import { HghlistFileSettingComponent } from './components/hghlist-file-setting/grid/hghlist-file-setting.component'
import { HghlistFileSettingNewComponent } from './components/hghlist-file-settingnew/grid/hghlist-file-settingnew.component'
import { ReportParameterComponent } from './components/report-parameter/body/report-parameter.component'
import { Tabsareh21SettingComponent } from './components/tabsareh21-setting/grid/tabsareh21-setting.component'
import { HghlistFileSetting29Component } from './components/hghlist-file-setting29/hghlist-file-setting29.component'

export const routes: Routes = [
  { path: 'report-parameter', component: ReportParameterComponent },
  { path: 'hghlist-file-setting', component: HghlistFileSettingComponent },
  { path: 'hghlist-file-settingnew', component: HghlistFileSettingNewComponent },
  { path: 'tabsareh21-setting', component: Tabsareh21SettingComponent },
  { path: 'hghlist-file-setting29', component: HghlistFileSetting29Component },
]

export const ReportSettingInfoRouting = RouterModule.forChild(routes)
