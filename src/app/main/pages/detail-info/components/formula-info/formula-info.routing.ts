import { Routes, RouterModule } from '@angular/router'
import { MissionComponent } from './mission/mission/body/mission.component'
import { NewFormulaComponent } from './new-formula/body/new-formula.component'

export const routes: Routes = [
  { path: 'new-formula', component: NewFormulaComponent },
  { path: 'mission', component: MissionComponent }
]

export const FormulaInfoRouting = RouterModule.forChild(routes)
