import { Routes, RouterModule } from '@angular/router'
import { CaseComponent } from './case/grid/case.component'
import { FractionComponent } from './fraction/grid/fraction.component'
import { MostamarComponent } from './mostamar/grid/mostamar.component'

export const routes: Routes = [
  { path: 'case', component: CaseComponent },
  { path: 'mostamar', component: MostamarComponent },
  { path: 'fraction', component: FractionComponent }
]

export const CaseInfoRouting = RouterModule.forChild(routes)
