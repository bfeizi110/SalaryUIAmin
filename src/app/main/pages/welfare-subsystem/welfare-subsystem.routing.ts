import { Routes, RouterModule } from '@angular/router'
import { PersonAssignSettleGuarantorsComponent } from './components/person-assign-settle-guarantors/body/person-assign-settle-guarantors.component'
import { PersonAssignIncreaseSavingComponent } from './components/person-assign-increase-saving/body/person-assign-increase-saving.component'

export const routes: Routes = [
  { path: 'person-assign-settle-guarantors', component: PersonAssignSettleGuarantorsComponent },
  { path: 'person-assign-increase-saving', component: PersonAssignIncreaseSavingComponent }
]

export const WalfareSubsystemRouting = RouterModule.forChild(routes)
