import { Routes, RouterModule } from '@angular/router'
import { WorkAddingDefineComponent } from './work-adding-define/grid/work-adding-define.component'
import { WorkAddingComponent } from './work-adding/grid/work-adding.component'

export const routes: Routes = [
  { path: 'work-adding', component: WorkAddingComponent },
  { path: 'work-adding-define', component: WorkAddingDefineComponent }
]

export const WorkAddingInfoRouting = RouterModule.forChild(routes)
