import { Component, Input, OnInit } from '@angular/core'
import { AuthService } from '../providers/auth.service'
import { OidcAuthService } from '../providers/OidcAuthService'

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss']
})
export class LogoutComponent implements OnInit {

  constructor(private authService: AuthService,private oidcAuthService :OidcAuthService) { }

  logout() { this.authService.logout(0, '').subscribe(_ => this.authService.logoutAfter(), _ => this.authService.logoutAfter()) }

  ngOnInit(): void {
    this.logout()
    // localStorage.EAS == '100732' ? this.oidcAuthService.signoutRedirect() : this.authService.logout(0)
  }

}