import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { PersonInfoRouting } from './person-info.routing'
import { CustomAgGridModule } from '../../main-body/common/custom-ag-grid/custom-ag-grid.module'
import { CustomFormModule } from '../../main-body/common/custom-form/custom-form.module'
import { CustomModalModule } from '../../main-body/common/custom-modal/custom-modal.module'
import { GridFormService } from '../../main-body/common/grid-form.service'
import { SelectPersonnelModule } from '../../main-body/common/select-personnel/select-personnel.module'
import { PersonDebtInfoComponent } from './components/person-debt-info/body/person-debt-info.component'
import { PersonDebtInfoFormComponent } from './components/person-debt-info/form/person-debt-info-form.component'
import { PersonSavingInfoComponent } from './components/person-saving-info/body/person-saving-info.component'
import { PersonSavingInfoFormComponent } from './components/person-saving-info/form/person-saving-info-form.component'
import { PersonModule } from './components/person/person.module'
import { PersonInsureInfoModule } from './components/person-insure-info/person-insure-info.module'
import { CommonPersonModule } from './components/common-person/common-person.module';
import { HistoryChildComponent } from './components/history-child/body/history-child.component'
import { HistoryChildFormComponent } from './components/history-child/form/history-child-form.component'
import { TreeModalModule } from '../../main-body/common/tree-modal/tree-modal.module'
import { NgbCalendarPersian } from '@ng-bootstrap/ng-bootstrap'
import { PersonHghWitnessComponent } from './components/person-hghwitness/body/person-hghwitness.component'
import { PersonHghWitnessFormComponent } from './components/person-hghwitness/form/person-hghwitness-form.component'
import { StimulsoftViewerModule } from '../../main-body/common/stimulsoft-viewer/stimulsoft-viewer.module';
import { HghWitnessBListComponent } from './components/hghwitnessblist/hghwitnessblist/hghwitnessblist.component'
import { HghWitnessBListFormComponent } from './components/hghwitnessblist/hghwitnessblist-form/hghwitnessblist-form.component'
import { PersonPayInfoComponent } from './components/person-pay-info/body/person-pay-info.component'

@NgModule({
  imports: [
    CommonModule,
    PersonInfoRouting,
    CustomAgGridModule,
    CustomFormModule,
    CustomModalModule,
    SelectPersonnelModule,
    PersonModule,
    PersonInsureInfoModule,
    CommonPersonModule,
    TreeModalModule,
    StimulsoftViewerModule
  ],
  declarations: [
    PersonHghWitnessComponent,
    PersonHghWitnessFormComponent,
    HghWitnessBListComponent,
    HghWitnessBListFormComponent,
    PersonDebtInfoComponent,
    PersonDebtInfoFormComponent,
    PersonSavingInfoComponent,
    PersonSavingInfoFormComponent,
    HistoryChildComponent,
    HistoryChildFormComponent,
    PersonPayInfoComponent,
  ],
  providers: [
    GridFormService,
    NgbCalendarPersian 
  ]
})
export class PersonInfoModule { }
