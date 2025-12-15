import { Component, OnInit } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { ToastrService } from 'ngx-toastr'
import { AuthService } from '../providers/auth.service'
import { OidcAuthService } from '../providers/OidcAuthService'

@Component({
  selector: 'app-auth-callback',
  templateUrl: './auth-callback.component.html',
  styleUrls: ['./auth-callback.component.scss']
})
export class AuthCallbackComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router, private activatedRoute: ActivatedRoute, private toastr: ToastrService,private oidcAuthService: OidcAuthService) { }


  ngOnInit() {
    if (sessionStorage.getItem('EAS') == '100733')
      this.activatedRoute.queryParams.subscribe(params => { console.log(params['code']); this.LoginFromUniversitySTS(params['code']) })
    else
      this.oidcAuthService.signinRedirectCallback();
  }

  LoginFromUniversitySTS(code) {
    const formData = new FormData()
    formData.append('code', code)
    this.authService.LoginFromUniversitySTS(formData).subscribe((res: any) => {
      this.authService.setAuthDataToSessionStorage(res.Data)
      this.authService.routeToKartabl()
    })
  }
}