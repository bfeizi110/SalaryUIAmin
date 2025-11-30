import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { SecurityRouting } from './security.routing'
import { CustomFormModule } from '../../main-body/common/custom-form/custom-form.module'
import { CustomModalModule } from '../../main-body/common/custom-modal/custom-modal.module'
import { GridFormService } from '../../main-body/common/grid-form.service'
import { MenuComponent } from './components/menu/grid/menu.component'
import { FaqComponent } from './components/faq/grid/faq.component'
import { FaqFormComponent } from './components/faq/form/faq-form.component'
import { MenuFormComponent } from './components/menu/form/menu-form.component'
import { CustomAgGridModule } from '../../main-body/common/custom-ag-grid/custom-ag-grid.module'
import { AuditComponent } from './components/audit/audit.component'
import { SelectPersonnelModule } from '../../main-body/common/select-personnel/select-personnel.module'
import { SelectUserModule } from '../../main-body/common/select-user/select-user.module'
import { GroupAccessComponent } from './components/group-access/body/group-access.component'
import { GroupAccessFormComponent } from './components/group-access/form/group-access-form.component'
import { UserAccessComponent } from './components/user-access/body/user-access.component'
import { UserAccessFormComponent } from './components/user-access/form/user-access-form.component'
import { TreeModalModule } from '../../main-body/common/tree-modal/tree-modal.module'
import { ApiLogComponent } from './components/api-log/api-log.component'
import { ErrorComponent } from './components/error/error.component'
import { YearMonthComponent } from './components/year-month/year-month.component'
import { AccessGridsComponent } from './components/access-grids/access-grids.component'
import { MyInfoModule } from '../../main-body/navbar/my-info/my-info.module'
import { ReportDesignComponent } from './components/report-design/body/report-design.component'
import { ReportDesignFormComponent } from './components/report-design/form/report-design-form.component'
import { ReportDesignFilterComponent } from './components/report-design/report-design-filter/body/report-design-filter.component'
import { ReportDesignFilterFormComponent } from './components/report-design/report-design-filter/form/report-design-filter-form.component'
import { EntityPropertyComponent } from './components/entity-property/body/entity-property.component'
import { EntityPropertyFormComponent } from './components/entity-property/form/entity-property-form.component'
import { ReportDesignFileComponent } from './components/report-design/report-design-file/body/report-design-file.component'
import { ReportDesignFileFormComponent } from './components/report-design/report-design-file/form/report-design-file-form.component'
import { ReportDesignStimulComponent } from './components/report-design/report-design-stimul/body/report-design-stimul.component'
import { ReportDesignStimulFormComponent } from './components/report-design/report-design-stimul/form/report-design-stimul-form.component'
import { ReportDesignGridComponent } from './components/report-design/report-design-grid/body/report-design-grid.component'
import { ReportDesignGridFormComponent } from './components/report-design/report-design-grid/form/report-design-grid-form.component'
import { WhereComponent } from './components/report-design/report-design-filter/where/where.component'
import { CloseInfoComponent } from './components/close-info/close-info.component'
import { CloseListComponent } from './components/close-list/close-list.component'
import { ImportComponent } from './components/import/import.component';
import { BackupComponent } from './components/backup/grid/backup.component'
import { BackupFormComponent } from './components/backup/form/backup-form.component'
// import { NgWizardModule, NgWizardConfig, THEME } from 'ng-wizard'
import { EntityComponent } from './components/entity/body/entity.component'
import { EntityFormComponent } from './components/entity/form/entity-form.component'
import { EntityMPropertyComponent } from './components/entity/entitym-property/grid/entitym-property.component'
import { EntityMPropertyFormComponent } from './components/entity/entitym-property/form/entitym-property-form.component'
import { EntityPropertyIndexComponent } from './components/entity/entity-property-index/grid/entity-property-index.component'
import { EntityPropertyIndexFormComponent } from './components/entity/entity-property-index/form/entity-property-index-form.component'
import { FormComponent } from './components/form/body/form.component'
import { FormFormComponent } from './components/form/form/form-form.component'
import { FormDetailsComponent } from './components/form/form-details/grid/form-details.component'
import { FormDetailsFormComponent } from './components/form/form-details/form/form-details-form.component'
import { FormDetailsNewComponent } from './components/form/form-detailsnew/grid/form-detailsnew.component'
import { FormDetailsNewFormComponent } from './components/form/form-detailsnew/form/form-detailsnew-form.component'
import { DynamicFormFormComponent } from './components/form/dynamic-form/form/generateform/dynamic-form-form.component'
import { DynamicFormComponent } from './components/form/dynamic-form/grid/dynamic-form.component'
import { DynamicFormType1Component } from './components/form/dynamic-form/formtop-type1/dynamic-form-type1.component'
import { DynamicShowFormTypeComponent } from './components/form/dynamic-form/form/showformtype/dynamic-showformtype.component'
import { ColorPickerModule } from 'ngx-color-picker';
import { ShowDynamicFormComponent } from './components/form/dynamic-form/show-dynamic-form/show-dynamic-form.component'
import { FormSettingsComponent } from './components/form/form-settings/grid/form-settings.component'
import { FormSettingsFormComponent } from './components/form/form-settings/form/form-settings-form.component'
import { FormDesignComponent } from './components/form/form-design/form-design.component'
import { FormFilterComponent } from './components/form/dynamic-form/form-filter/form-filter.component'

import { FormSettingFiltersComponent } from './components/form/form-setting-filters/grid/form-setting-filters.component'
import { FormSettingFiltersFormComponent } from './components/form/form-setting-filters/form/form-setting-filters-form.component'

import { WorkFlowComponent } from './components/workflow/body/workflow.component'
import { WorkFlowFormComponent } from './components/workflow/form/workflow-form.component'
import { WorkFlowDetailsComponent } from './components/workflow/workflow-details/grid/workflow-details.component'
import { WorkFlowDetailsFormComponent } from './components/workflow/workflow-details/form/workflow-details-form.component'
import { WorkFlowDetailsReferComponent } from './components/workflow/workflow-details/workflow-details-refer/grid/workflow-details-refer.component'
import { WorkFlowDetailsReferFormComponent } from './components/workflow/workflow-details/workflow-details-refer/form/workflow-details-refer-form.component'
import { FormCommentsComponent } from './components/form/form-comments/form-comments.component'
import { FormMasterDetailsComponent } from './components/form/form-master-details/body/form-master-details.component'
import { FormMasterDetailsFormComponent } from './components/form/form-master-details/form/form-master-details-form.component'
// const ngWizardConfig: NgWizardConfig = {
//   theme: THEME.dots
// }

@NgModule({
  imports: [
    CommonModule,
    SecurityRouting,
    CustomFormModule,
    CustomModalModule,
    CustomAgGridModule,
    SelectPersonnelModule,
    SelectUserModule,
    TreeModalModule,
    MyInfoModule,
    ColorPickerModule,
    // NgWizardModule.forRoot(ngWizardConfig)
  ],
  declarations: [
    MenuComponent,
    MenuFormComponent,
    FaqComponent,
    FaqFormComponent,
    AuditComponent,
    GroupAccessComponent,
    GroupAccessFormComponent,
    AccessGridsComponent,
    UserAccessComponent,
    UserAccessFormComponent,
    ApiLogComponent,
    ErrorComponent,
    YearMonthComponent,
    ReportDesignComponent,
    ReportDesignFormComponent,
    ReportDesignFilterComponent,
    ReportDesignFilterFormComponent,
    EntityPropertyComponent,
    EntityPropertyFormComponent,
    ReportDesignFileComponent,
    ReportDesignFileFormComponent,
    ReportDesignStimulComponent,
    ReportDesignStimulFormComponent,
    ReportDesignGridComponent,
    ReportDesignGridFormComponent,
    WhereComponent,
    CloseInfoComponent,
    CloseListComponent,
    ImportComponent,
    BackupComponent,
    BackupFormComponent,
    EntityComponent,
    EntityFormComponent,
    EntityMPropertyComponent,
    EntityMPropertyFormComponent,
    EntityPropertyIndexComponent,
    EntityPropertyIndexFormComponent,
    FormComponent,
    FormMasterDetailsComponent,
    FormMasterDetailsFormComponent,
    FormFormComponent,
    FormDetailsComponent,
    FormDetailsFormComponent,
    FormDetailsNewComponent,
    FormDetailsNewFormComponent,
    FormSettingsComponent,
    FormSettingsFormComponent,
    FormSettingFiltersComponent,
    FormSettingFiltersFormComponent,
    FormCommentsComponent,
    FormFilterComponent,
    DynamicFormFormComponent,
    DynamicFormComponent,
    DynamicFormType1Component,
    DynamicShowFormTypeComponent,
    ShowDynamicFormComponent,
    WorkFlowComponent,
    WorkFlowFormComponent,
    WorkFlowDetailsComponent,
    WorkFlowDetailsFormComponent,
    WorkFlowDetailsReferComponent,
    WorkFlowDetailsReferFormComponent,
    FormDesignComponent,
  ],
  providers: [
    GridFormService
  ],
  exports: [
    DynamicFormType1Component,
    FaqComponent,
    FaqFormComponent,
    FormCommentsComponent
  ]

})
export class SecurityModule { }
