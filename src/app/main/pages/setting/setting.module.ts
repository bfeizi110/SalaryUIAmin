import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { SettingRouting } from './setting.routing'
import { CustomFormModule } from '../../main-body/common/custom-form/custom-form.module'
import { CustomModalModule } from '../../main-body/common/custom-modal/custom-modal.module'
import { CustomAgGridModule } from '../../main-body/common/custom-ag-grid/custom-ag-grid.module'
import { SecurityModule } from '../security/security.module'

import { DaraeiSettingComponent } from './components/daraei-setting/grid/daraei-setting.component'
import { ImportSettingComponent } from './components/import-setting/body/import-setting.component'
import { ImportSettingFormComponent } from './components/import-setting/form/import-setting-form.component'
import { ImportDetailComponent } from './components/import-setting/import-setting-detail/grid/import-setting-detail.component'
import { PersonMonthHistorySettingComponent } from './components/person-month-history-setting/grid/person-month-history-setting.component'
import { PersonMonthHistorySettingFormComponent } from './components/person-month-history-setting/form/person-month-history-setting-form.component'
import { ExemptSettingComponent } from './components/exempt-setting/grid/exempt-setting.component'
import { ExemptSettingFormComponent } from './components/exempt-setting/form/exempt-setting-form.component'
import { DaraeiSettingFormComponent } from './components/daraei-setting/form/daraei-setting-form.component'
import { DashboardSettingComponent } from './components/dashboard-setting/dashboard-setting.component'
import { SalaryCalcSettingComponent } from '../security/components/salary-calc-setting/grid/salary-calc-setting.component'
import { ImportSettingDetailFormComponent } from './components/import-setting/import-setting-detail/form/import-setting-detail-form.component'
import { SalaryCalcSettingFormComponent } from '../security/components/salary-calc-setting/form/salary-calc-setting-form.component'


@NgModule({
  imports: [
    CommonModule,
    SettingRouting,
    CustomAgGridModule,
    CustomFormModule,
    CustomModalModule,
    SecurityModule
  ],
  declarations: [
    DaraeiSettingComponent,
    DaraeiSettingFormComponent,
    ImportSettingComponent,
    ImportSettingFormComponent,
    ImportDetailComponent,
    ImportSettingDetailFormComponent,
    PersonMonthHistorySettingComponent,
    PersonMonthHistorySettingFormComponent,
    ExemptSettingComponent,
    ExemptSettingFormComponent,
    DashboardSettingComponent,
    SalaryCalcSettingComponent,
    SalaryCalcSettingFormComponent,
  ]
})
export class SettingModule { }
