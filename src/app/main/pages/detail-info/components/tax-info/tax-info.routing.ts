import { Routes, RouterModule } from '@angular/router'
import { TaxBaseComponent } from './tax-base/grid/tax-base.component'
import { TaxComponent } from './tax/tax/body/tax.component'

export const routes: Routes = [
  { path: 'tax', component: TaxComponent },
  { path: 'tax-base', component: TaxBaseComponent }
]

export const TaxInfoRouting = RouterModule.forChild(routes)
