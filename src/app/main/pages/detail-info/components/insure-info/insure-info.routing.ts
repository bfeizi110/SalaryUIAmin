import { Routes, RouterModule } from '@angular/router'
import { InsureJobComponent } from './insure-job/grid/insure-job.component'
import { InsureComponent } from './insure/grid/insure.component'
import { TaminBaseComponent } from './tamin-base/grid/tamin-base.component'

export const routes: Routes = [
  { path: 'tamin-base', component: TaminBaseComponent },
  { path: 'insure', component: InsureComponent },
  { path: 'insure-job', component: InsureJobComponent }
]

export const InsureInfoRouting = RouterModule.forChild(routes)
