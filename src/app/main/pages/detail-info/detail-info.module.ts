import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { DetailInfoRouting } from './detail-info.routing'
import { CustomAgGridModule } from '../../main-body/common/custom-ag-grid/custom-ag-grid.module'
import { CustomFormModule } from '../../main-body/common/custom-form/custom-form.module'
import { CustomModalModule } from '../../main-body/common/custom-modal/custom-modal.module'
import { GridFormService } from '../../main-body/common/grid-form.service'
import { SavingComponent } from './components/saving/grid/saving.component'
import { SavingFormComponent } from './components/saving/form/saving-form.component'
import { OrganizationComponent } from './components/organization/grid/organization.component'
import { OrganizationFormComponent } from './components/organization/form/organization-form.component'
import { CityComponent } from './components/city/city/body/city.component'
import { CityFormComponent } from './components/city/city/form/city-form.component'
import { CountryComponent } from './components/city/country/country.component'
import { StateComponent } from './components/city/state/state.component'
import { MajorSubjectComponent } from './components/major-subject/grid/major-subject.component'
import { MajorSubjectFormComponent } from './components/major-subject/form/major-subject-form.component'
import { GradeLicenseFormComponent } from './components/grade-license/form/grade-license-form.component'
import { GradeLicenseComponent } from './components/grade-license/grid/grade-license.component'
import { HireTypePayFractionSettingComponent } from '../setting/components/hire-type-pay-fraction-setting/grid/hire-type-pay-fraction-setting.component'
import { HireTypePayFractionSettingFormComponent } from '../setting/components/hire-type-pay-fraction-setting/form/hire-type-pay-fraction-setting-form.component'
import { SmsSavedComponent } from './components/sms-saved/grid/sms-saved.component'
import { SmsSavedFormComponent } from './components/sms-saved/form/sms-saved-form.component';
import { ListNoComponent } from './components/list-no/list-no/list-no.component'
import { ListNoFormComponent } from './components/list-no/list-no-form/list-no-form.component'
import { HghWitnessFilesComponent } from './components/hghwitnessfiles/hghwitnessfiles/hghwitnessfiles.component'
import { HghWitnessFilesFormComponent } from './components/hghwitnessfiles/hghwitnessfiles-form/hghwitnessfiles-form.component'
import { YektaStructComponent } from './components/yektastruct/grid/yektastruct.component'
import { YektaStructFormComponent } from './components/yektastruct/form/yektastruct-form.component'
import { ListNoFormDirectComponent } from './components/list-no/list-no-form-direct/list-no-form-direct.component'
import { SlackGroupFormComponent } from './components/slackgroup/slackgroup-form/slackgroup-form.component'
import { SlackGroupComponent } from './components/slackgroup/slackgroup/slackgroup.component'

@NgModule({
  imports: [
    CommonModule,
    DetailInfoRouting,
    CustomAgGridModule,
    CustomFormModule,
    CustomModalModule,
  ],
  declarations: [
    SavingComponent,
    SavingFormComponent,
    OrganizationComponent,
    OrganizationFormComponent,
    CityComponent,
    CityFormComponent,
    CountryComponent,
    StateComponent,
    MajorSubjectComponent,
    MajorSubjectFormComponent,
    GradeLicenseComponent,
    GradeLicenseFormComponent,
    HireTypePayFractionSettingComponent,
    HireTypePayFractionSettingFormComponent,
    SmsSavedComponent,
    SmsSavedFormComponent,
    ListNoComponent,
    ListNoFormComponent,
    ListNoFormDirectComponent,
    HghWitnessFilesComponent,
    HghWitnessFilesFormComponent,
    YektaStructComponent,
    YektaStructFormComponent,
    SlackGroupFormComponent,
    SlackGroupComponent
  ],
  providers: [
    GridFormService
  ],
  exports: [
    ListNoFormDirectComponent
  ]
})
export class DetailInfoModule { }
