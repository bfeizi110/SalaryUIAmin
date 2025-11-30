import { stsComponent } from './sts/sts.component';
import { CommonModule } from '@angular/common'
import { RouterModule } from '@angular/router'
import { LoginComponent } from './login/login.component'
import { NgModule } from '@angular/core'
import { AuthRouting } from './auth.routing'
import { MatButtonModule } from '@angular/material/button'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatInputModule } from '@angular/material/input'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { FooterComponent } from './footer/footer.component'
import { AuthCallbackComponent } from './auth-callback/auth-callback.component'
import { SilentRefreshComponent } from './silent-refresh/silent-refresh.component'
import { LogoutComponent } from './logout/logout.component'
import { MatAutocompleteModule } from '@angular/material/autocomplete'
import { uswComponent } from './usw/usw.component';
import { charComponent } from './char/char.component';

const MATERIALS = [
  MatFormFieldModule,
  MatInputModule,
  MatButtonModule,
  MatAutocompleteModule
]

@NgModule({
  declarations: [
    LoginComponent,
    FooterComponent,
    AuthCallbackComponent,
    SilentRefreshComponent,
    LogoutComponent,
    stsComponent,
    uswComponent,
    charComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    AuthRouting,
    FormsModule,
    ReactiveFormsModule,
    MATERIALS
  ]
})
export class AuthModule { }
