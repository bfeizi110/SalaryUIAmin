import { Routes, RouterModule } from '@angular/router'
import { PersonComponent } from '../person-info/components/person/grid/person.component'
import { CommissionComponent } from '../commission-info/components/commission/body/commission.component'
import { PersonInsureInfoComponent } from '../person-info/components/person-insure-info/body/person-insure-info.component'
import { TadrisFractionTypeComponent } from './components/tadris-fraction-type/grid/tadris-fraction-type.component'
import { TadrisPayTypeComponent } from './components/tadris-pay-type/grid/tadris-pay-type.component'
import { TadrisComponent } from './components/tadris/body/tadris.component'

export const routes: Routes = [
  { path: 'person', component: PersonComponent },
  { path: 'commission', component: CommissionComponent },
  { path: 'insureinfo', component: PersonInsureInfoComponent },
  { path: 'tadris-fractiontype', component: TadrisFractionTypeComponent },
  { path: 'tadris-paytype', component: TadrisPayTypeComponent },
  { path: 'tadris', component: TadrisComponent },
]

export const TadrisSubsystemRouting = RouterModule.forChild(routes)
