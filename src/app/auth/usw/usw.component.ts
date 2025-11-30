import { AfterViewInit, Component, OnInit } from '@angular/core';
import { AuthService } from '../providers/auth.service'
@Component({ selector: 'usw', template: `` })
export class uswComponent implements AfterViewInit {
  constructor(private authService: AuthService) { }
  ngAfterViewInit(): void {
    if (this.authService.token && !this.authService.isTokenExpired()) {
      sessionStorage.setItem('EAS', '100733')
      return this.authService.routeToKartabl()
    }
    else {
      // this.authService.removeSessionStorage()
      if (sessionStorage["UserManagerSettings"]) {
        sessionStorage.setItem('EAS', '100733')
        var setting = JSON.parse(sessionStorage["UserManagerSettings"])
        window.location.href = `${setting.authority}?client_id=${setting.client_id}&redirect_uri=${setting.redirect_uri}&scope=${setting.scope}&response_type=${setting.response_type}&state=9`
      }
    }

  }
}
