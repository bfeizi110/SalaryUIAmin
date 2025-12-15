import { BrowserModule } from '@angular/platform-browser'
import { APP_INITIALIZER, NgModule } from '@angular/core'
import "ag-grid-enterprise";
import { AppComponent } from './app.component'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { AppRouting } from './app.routing'
import { RouterModule } from '@angular/router'
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'
import { CustomHttpInterceptor } from './auth/providers/custom-http-interceptor.service'
import { LoaderService } from './common/loader/loader.service'
import { ToastrModule, ToastrService } from 'ngx-toastr'
import { LoaderModule } from './common/loader/loader.module'
import { AuthService } from './auth/providers/auth.service'
import { AuthGuardService } from './auth/providers/auth.guard'
import { OidcAuthService } from './auth/providers/OidcAuthService'

export function init_app(authService: OidcAuthService) {
  return async () => await authService.setUserManagerSettings();
}

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    AppRouting,
    RouterModule,
    BrowserAnimationsModule,
    HttpClientModule,
    LoaderModule,
    ToastrModule.forRoot({
      disableTimeOut: false,
      // autoDismiss: false,
      positionClass: 'toast-bottom-left',
      closeButton: true,
      maxOpened: 1,
      autoDismiss: true
    }),
  
  ],
  providers: [
    AuthGuardService,
    AuthService,
    LoaderService,
    ToastrService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: CustomHttpInterceptor,
      multi: true,
    },
    OidcAuthService,
    { provide: APP_INITIALIZER, useFactory: init_app, deps: [OidcAuthService], multi: true }
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }

export function getBaseUrl() {
  var base = document.getElementsByTagName('base')[0].href;
  if (base.substring(base.length - 1) == "/") {
    base = base.substring(0, base.length - 1);
  }
  return base;
}