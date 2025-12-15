import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { CurrentMonthInfoRouting } from './current-month-info.routing'
import { CustomAgGridModule } from '../../main-body/common/custom-ag-grid/custom-ag-grid.module'
import { CustomFormModule } from '../../main-body/common/custom-form/custom-form.module'
import { CustomModalModule } from '../../main-body/common/custom-modal/custom-modal.module'
import { SelectPersonnelModule } from '../../main-body/common/select-personnel/select-personnel.module'
import { GridFormService } from '../../main-body/common/grid-form.service'
import { PersonMonthInfoComponent } from './components/person-month-info/body/person-month-info.component'
import { PersonMonthInfoFormComponent } from './components/person-month-info/form/person-month-info-form.component'
import { PersonWorkAddingInfoComponent } from './components/person-work-adding-info/grid/person-work-adding-info.component'
import { PersonWorkAddingInfoFormComponent } from './components/person-work-adding-info/form/person-work-adding-info-form.component'
import { PersonMostamarInfoComponent } from './components/person-mostamar-info/body/person-mostamar-info.component'
import { PersonMostamarInfoFormComponent } from './components/person-mostamar-info/form/person-mostamar-info-form.component'
import { SalaryComponent } from './components/salary/salary.component'
import { PersonMissionInfoComponent } from './components/person-mission-info/body/person-mission-info.component'
import { PersonMissionInfoFormComponent } from './components/person-mission-info/form/person-mission-info-form.component'
import { TreeModalModule } from '../../main-body/common/tree-modal/tree-modal.module'
import { PersonCaseInfoComponent } from './components/person-case-info/body/person-case-info.component'
import { PersonCaseInfoFormComponent } from './components/person-case-info/form/person-case-info-form.component'
import { CommonPersonModule } from '../person-info/components/common-person/common-person.module'
import { SmsComponent } from './components/sms/sms.component'
import { AcceptComponent } from './components/accept/accept.component'
import { PersonMissionInfoDetailComponent } from './components/person-mission-info/person-mission-info-detail/body/person-mission-info-detail.component'
import { PersonMissionInfoDetailFormComponent } from './components/person-mission-info/person-mission-info-detail/form/person-mission-info-detail-form.component'
import { CommissionSelectionModule } from '../backpay-subsystem/components/backpay-detail/commission-selection/commission-selection.module'
import { DetailInfoModule } from '../detail-info/detail-info.module'

@NgModule({
  imports: [
    CommonModule,
    CurrentMonthInfoRouting,
    CustomAgGridModule,
    CustomFormModule,
    CustomModalModule,
    SelectPersonnelModule,
    CommonPersonModule,
    TreeModalModule,
    CommissionSelectionModule,
    DetailInfoModule
  ],
  declarations: [
    PersonMonthInfoComponent,
    PersonMonthInfoFormComponent,
    PersonWorkAddingInfoComponent,
    PersonWorkAddingInfoFormComponent,
    PersonMostamarInfoComponent,
    PersonMostamarInfoFormComponent,
    SalaryComponent,
    PersonMissionInfoComponent,
    PersonMissionInfoFormComponent,
    PersonCaseInfoComponent,
    PersonCaseInfoFormComponent,
    SmsComponent,
    AcceptComponent,
    PersonMissionInfoDetailComponent,
    PersonMissionInfoDetailFormComponent,
  ],
  providers: [
    GridFormService
  ]
})
export class CurrentMonthInfoModule { }
