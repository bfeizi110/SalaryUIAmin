import { Routes, RouterModule } from '@angular/router'
import { KartableComponent } from './components/kartable/kartable.component'
import { PersonRequestFormComponent } from './components/request/form/person-request-form.component'

export const routes: Routes = [
  { path: '', component: KartableComponent },
  { path: '', component: PersonRequestFormComponent }
]

export const KartableRouting = RouterModule.forChild(routes)
