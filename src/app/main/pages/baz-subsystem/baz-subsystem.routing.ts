import { Routes, RouterModule } from '@angular/router'
import { CommissionComponent } from '../commission-info/components/commission/body/commission.component'
import { PersonComponent } from '../person-info/components/person/grid/person.component'
import { PersonInsureInfoComponent } from '../person-info/components/person-insure-info/body/person-insure-info.component'
import { PersonDebtInfoComponent } from '../person-info/components/person-debt-info/body/person-debt-info.component'
import { PersonSavingInfoComponent } from '../person-info/components/person-saving-info/body/person-saving-info.component'
import { PersonMostamarInfoComponent } from '../current-month-info/components/person-mostamar-info/body/person-mostamar-info.component'
import { HistoryChildComponent } from '../person-info/components/history-child/body/history-child.component'

export const routes: Routes = [
  { path: 'bazperson', component: PersonComponent },
  { path: 'movperson', component: PersonComponent },
  { path: 'commission', component: CommissionComponent },
  { path: 'insure-info', component: PersonInsureInfoComponent },
  { path: 'person-debt-info', component: PersonDebtInfoComponent },
  { path: 'person-saving-info', component: PersonSavingInfoComponent },
  { path: 'personnel-mostamar-info', component: PersonMostamarInfoComponent },
  { path: 'historychild', component: HistoryChildComponent }
]

export const BazSubsystemRouting = RouterModule.forChild(routes)
