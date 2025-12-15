import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './components/dashboard.component';

export const routes: Routes = [
  { path: '', component: DashboardComponent },
]

export const DashboardRouting = RouterModule.forChild(routes)
