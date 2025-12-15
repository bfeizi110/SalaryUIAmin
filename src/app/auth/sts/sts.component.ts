import { Component, OnInit } from '@angular/core';
import { AuthService } from '../providers/auth.service';
import { OidcAuthService } from '../providers/OidcAuthService';
@Component({
  selector: 'sts',
  templateUrl: './sts.component.html',
})

export class stsComponent implements OnInit{

  //#region سازنده و فرم لود
  constructor(private authService: AuthService,private oidcAuthService: OidcAuthService) { }
  IsAppError:boolean=false;
  AppError:string=''
  ngOnInit(): void {
    sessionStorage.setItem('EAS', '100732')
    if (this.oidcAuthService.isLoggedIn())
      this.login(this.oidcAuthService.getToken())      
    else
      this.oidcAuthService.signinRedirect(); 
  }
  //#endregion


  //#region Validate
  login(token) {
    const formData = new FormData()
    formData.append('grant_type', 'password')
    formData.append('password',token)
    formData.append('username', "")
    this.authService.login(formData).subscribe((res: any) => {
      this.authService.setAuthDataToSessionStorage(res.Data)
      this.authService.routeToKartabl()
    })
  }
  //#endregion
}