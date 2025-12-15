import { stsComponent } from './sts/sts.component';
import { LoginComponent } from './login/login.component'
import { Routes, RouterModule } from '@angular/router'
import { LogoutComponent } from './logout/logout.component'
import { AuthCallbackComponent } from './auth-callback/auth-callback.component'
import { SilentRefreshComponent } from './silent-refresh/silent-refresh.component'
import { uswComponent } from './usw/usw.component';
import { charComponent } from './char/char.component';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'login/:type', component: LoginComponent },
  { path: 'auth-callback', component: AuthCallbackComponent },
  { path: 'sts', component: stsComponent },
  { path: 'usw', component: uswComponent },
  { path: 'auth-callback/:code/:scope/:state/:session_state', component: AuthCallbackComponent },
  { path: 'logout', component: LogoutComponent },
  { path: 'silent-refresh', component: SilentRefreshComponent },
  { path: 'char', component: charComponent }
  
]

export const AuthRouting = RouterModule.forChild(routes)
