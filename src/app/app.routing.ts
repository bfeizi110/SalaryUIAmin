import { Routes, RouterModule } from '@angular/router';
import { AuthGuardService } from './auth/providers/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: '/auth/login', pathMatch: 'full' },
  { path: 'auth', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule) },
  { path: 'main', loadChildren: () => import('./main/main.module').then(m => m.MainModule), canActivate: [AuthGuardService] },
]

export const AppRouting = RouterModule.forRoot(routes, {
    initialNavigation: 'enabledBlocking'
})
