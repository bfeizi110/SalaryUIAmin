import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { PersonComponent } from './grid/person.component'
import { PersonFormComponent } from './form/person-form.component'
import { SelectPersonnelModule } from 'src/app/main/main-body/common/select-personnel/select-personnel.module'
import { CustomFormModule } from 'src/app/main/main-body/common/custom-form/custom-form.module'
import { PersonCostCenter2Component } from './person-cost-center2/grid/person-cost-center2.component'
import { PersonCostCenter2FormComponent } from './person-cost-center2/form/person-cost-center2-form.component'
import { PersonMonthHistoryComponent } from './person-month-history/grid/person-month-history.component'
import { PersonMonthHistoryFormComponent } from './person-month-history/form/person-month-history-form.component'
import { TreeModalModule } from 'src/app/main/main-body/common/tree-modal/tree-modal.module'
import { CustomAgGridModule } from 'src/app/main/main-body/common/custom-ag-grid/custom-ag-grid.module'
import { CustomModalModule } from 'src/app/main/main-body/common/custom-modal/custom-modal.module'
import { CommonPersonModule } from '../common-person/common-person.module';
import { SummaryOfThePastSituationComponent } from './summary-of-the-past-situation/summary-of-the-past-situation.component'

@NgModule({
  imports: [
    CommonModule,
    SelectPersonnelModule,
    CustomFormModule,
    CustomModalModule,
    TreeModalModule,
    CustomAgGridModule,
    CommonPersonModule
  ],
  declarations: [
    PersonComponent,
    PersonFormComponent,
    PersonCostCenter2Component,
    PersonCostCenter2FormComponent,
    PersonMonthHistoryComponent,
    PersonMonthHistoryFormComponent,
    SummaryOfThePastSituationComponent,
  ]
})
export class PersonModule { }
