import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OtherInfoRouting } from './other-info.routing';
import { OtherSettingComponent } from './other-setting/other-setting/body/other-setting.component'
import { OtherSettingFormComponent } from './other-setting/other-setting/form/other-setting-form.component'
import { OtherDetailComponent } from './other-detail/other-detail/body/other-detail.component'
import { OtherDetailFormComponent } from './other-detail/other-detail/form/other-detail-form.component'
import { OtherGroupComponent } from './other-detail/other-group/grid/other-group.component'
import { OtherGroupFormComponent } from './other-detail/other-group/form/other-group-form.component'
import { CustomFormModule } from 'src/app/main/main-body/common/custom-form/custom-form.module'
import { CustomAgGridModule } from 'src/app/main/main-body/common/custom-ag-grid/custom-ag-grid.module'
import { CustomModalModule } from 'src/app/main/main-body/common/custom-modal/custom-modal.module'
import { OtherSettingDefineFormComponent } from './other-setting/other-setting-define/form/other-setting-define-form.component'
import { OtherSettingDefineComponent } from './other-setting/other-setting-define/grid/other-setting-define.component'
import { OtherSettingGroupComponent } from './other-setting-group/grid/other-setting-group.component'
import { OtherSettingGroupFormComponent } from './other-setting-group/form/other-setting-group-form.component'
import { TreeModalModule } from 'src/app/main/main-body/common/tree-modal/tree-modal.module';


@NgModule({
  declarations: [
    OtherSettingComponent,
    OtherSettingFormComponent,
    OtherDetailComponent,
    OtherDetailFormComponent,
    OtherGroupComponent,
    OtherGroupFormComponent,
    OtherSettingDefineComponent,
    OtherSettingDefineFormComponent,
    OtherSettingGroupComponent,
    OtherSettingGroupFormComponent
  ],
  imports: [
    CommonModule,
    OtherInfoRouting,
    CustomAgGridModule,
    CustomFormModule,
    CustomModalModule,
    TreeModalModule
  ]
})
export class OtherInfoModule { }
