import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { ReportSettingInfoRouting } from './report-setting.routing'
import { CustomFormModule } from 'src/app/main/main-body/common/custom-form/custom-form.module'
import { CustomModalModule } from 'src/app/main/main-body/common/custom-modal/custom-modal.module'
import { ReportParameterComponent } from './components/report-parameter/body/report-parameter.component'
import { ReportParameterFormComponent } from './components/report-parameter/form/report-parameter-form.component'
import { ReportParameterDetailComponent } from './components/report-parameter/report-parameter-detail/grid/report-parameter-detail.component'
import { ReportParameterDetailFormComponent } from './components/report-parameter/report-parameter-detail/form/report-parameter-detail-form.component'
import { CustomAgGridModule } from 'src/app/main/main-body/common/custom-ag-grid/custom-ag-grid.module'
import { HghlistFileSettingComponent } from './components/hghlist-file-setting/grid/hghlist-file-setting.component'
import { HghlistFileSettingFormComponent } from './components/hghlist-file-setting/form/hghlist-file-setting-form.component'
import { HghlistFileSettingNewComponent } from './components/hghlist-file-settingnew/grid/hghlist-file-settingnew.component'
import { HghlistFileSettingNewStep1FormComponent } from './components/hghlist-file-settingnew/form/hghlist-file-settingnewstep1/hghlist-file-settingnewstep1-form.component'
import { HghlistFileSettingNewStep2FormComponent } from './components/hghlist-file-settingnew/form/hghlist-file-settingnewstep2/hghlist-file-settingnewstep2-form.component'
import { Tabsareh21SettingComponent } from './components/tabsareh21-setting/grid/tabsareh21-setting.component'
import { Tabsareh21SettingFormComponent } from './components/tabsareh21-setting/form/tabsareh21-setting-form.component'
import { HghlistFileSetting29Component } from './components/hghlist-file-setting29/hghlist-file-setting29.component'

@NgModule({
  imports: [
    CommonModule,
    ReportSettingInfoRouting,
    CustomFormModule,
    CustomModalModule,
    CustomAgGridModule
  ],
  declarations: [
    ReportParameterComponent,
    ReportParameterFormComponent,
    ReportParameterDetailComponent,
    ReportParameterDetailFormComponent,
    HghlistFileSettingComponent,
    HghlistFileSettingFormComponent,
    HghlistFileSettingNewComponent,
    HghlistFileSettingNewStep2FormComponent,
    HghlistFileSettingNewStep1FormComponent,
    Tabsareh21SettingComponent,
    Tabsareh21SettingFormComponent,
    HghlistFileSetting29Component,
  ]
})
export class ReportSettingModule { }
