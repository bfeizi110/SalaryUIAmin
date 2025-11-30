import { Routes, RouterModule } from '@angular/router'
import { BackpayDetailComponent } from './components/backpay-detail/body/backpay-detail.component'
import { BackpayIgnoreComponent } from './components/backpay-ignore/body/backpay-ignore.component'
import { BackPayInsureComponent } from './components/backpay-insure/body/backpay-insure.component'

export const routes: Routes = [
  { path: 'semi-backpay', component: BackpayDetailComponent },
  { path: 'backpay-ignore', component: BackpayIgnoreComponent },
  { path: 'backpay-insure', component: BackPayInsureComponent }
]

export const BackpaySubsystemRouting = RouterModule.forChild(routes)
