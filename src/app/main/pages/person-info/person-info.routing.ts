import { PersonPayInfoComponent } from './components/person-pay-info/body/person-pay-info.component';
import { Routes, RouterModule } from '@angular/router'
import { PersonComponent } from './components/person/grid/person.component'
import { PersonDebtInfoComponent } from './components/person-debt-info/body/person-debt-info.component'
import { PersonInsureInfoComponent } from './components/person-insure-info/body/person-insure-info.component'
import { PersonSavingInfoComponent } from './components/person-saving-info/body/person-saving-info.component'
import { HistoryChildComponent } from './components/history-child/body/history-child.component'
import { PersonHghWitnessComponent } from './components/person-hghwitness/body/person-hghwitness.component'
import { HghWitnessBListComponent } from './components/hghwitnessblist/hghwitnessblist/hghwitnessblist.component'

export const routes: Routes = [
  { path: 'person', component: PersonComponent },
  { path: 'person-debt-info', component: PersonDebtInfoComponent },
  { path: 'person-insure-info', component: PersonInsureInfoComponent },
  { path: 'person-saving-info', component: PersonSavingInfoComponent },
  { path: 'person-hghwitness', component: PersonHghWitnessComponent },
  { path: 'hghwitnessblist', component: HghWitnessBListComponent },
  { path: 'historychild', component: HistoryChildComponent },
  { path: 'person-pay-info', component: PersonPayInfoComponent },
]

export const PersonInfoRouting = RouterModule.forChild(routes)
