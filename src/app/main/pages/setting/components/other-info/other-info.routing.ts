import { Routes, RouterModule } from '@angular/router'
import { OtherDetailComponent } from './other-detail/other-detail/body/other-detail.component'
import { OtherSettingComponent } from './other-setting/other-setting/body/other-setting.component'
import { OtherSettingGroupComponent } from './other-setting-group/grid/other-setting-group.component'

export const routes: Routes = [
  { path: 'other-detail', component: OtherDetailComponent },
  { path: 'other-setting', component: OtherSettingComponent },
  { path: 'other-setting-group', component: OtherSettingGroupComponent }
]

export const OtherInfoRouting = RouterModule.forChild(routes)
