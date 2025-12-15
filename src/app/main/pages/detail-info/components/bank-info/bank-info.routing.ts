import { Routes, RouterModule } from '@angular/router'
import { BankBranchComponent } from './bank-branch/grid/bank-branch.component'
import { BankFormatComponent } from './bank-format/grid/bank-format.component'

export const routes: Routes = [
  { path: 'bank-branch', component: BankBranchComponent },
  { path: 'bank-format', component: BankFormatComponent }
]

export const BankInfoRouting = RouterModule.forChild(routes)
