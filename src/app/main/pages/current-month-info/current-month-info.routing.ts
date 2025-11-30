import { Routes, RouterModule } from '@angular/router'
import { PersonMonthInfoComponent } from './components/person-month-info/body/person-month-info.component'
import { PersonWorkAddingInfoComponent } from './components/person-work-adding-info/grid/person-work-adding-info.component'
import { PersonMostamarInfoComponent } from './components/person-mostamar-info/body/person-mostamar-info.component'
import { SalaryComponent } from './components/salary/salary.component'
import { PersonMissionInfoComponent } from './components/person-mission-info/body/person-mission-info.component'
import { PersonCaseInfoComponent } from './components/person-case-info/body/person-case-info.component'
import { SmsComponent } from './components/sms/sms.component'
import { AcceptComponent } from './components/accept/accept.component'

export const routes: Routes = [
  { path: 'personnel-month-info', component: PersonMonthInfoComponent },
  { path: 'personnel-work-adding-info', component: PersonWorkAddingInfoComponent },
  { path: 'personnel-mostamar-info', component: PersonMostamarInfoComponent },
  { path: 'salary', component: SalaryComponent },
  { path: 'personnel-mission-info', component: PersonMissionInfoComponent },
  { path: 'personnel-case-info', component: PersonCaseInfoComponent },
  { path: 'sms', component: SmsComponent },
  { path: 'Accept', component: AcceptComponent },
]

export const CurrentMonthInfoRouting = RouterModule.forChild(routes)