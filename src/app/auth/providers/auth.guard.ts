import { AuthService } from './auth.service'
import { Injectable } from '@angular/core'

import { ToastrService } from 'ngx-toastr'

@Injectable()
export class AuthGuardService  {
  constructor(private toastr: ToastrService, private authService: AuthService) { }

  canActivate(): boolean {
    const token: string = this.authService.token

    if (!token) {
      // this.toastr.error('555555555', 'خطا')
      this.authService.logout(3, 'خروج از سامانه بدلیل غیر مجاز بودن مهر امنیتی').subscribe(_ => this.authService.logoutAfter(), _ => this.authService.logoutAfter())
      return false
    }

    if (this.authService.isTokenExpired()) 
    {
      // this.toastr.error('6666666666666', 'خطا')
      let body = { Token: this.authService.token.replace('Bearer ', ''), Year_Fld: this.authService.year, Month_Fld: this.authService.month }
      this.authService.refreshToken(body).subscribe((res: any) => {
        if (res.Valid) {
          this.authService.setAuthDataToSessionStorage(res.Data)
          this.authService.wantToRefresh = false
          return true
        }
      },
        _ => {
          this.authService.wantToRefresh = false
          this.authService.logout(2,'خروج از سامانه بدلیل انقضای زمان کار با سامانه').subscribe(_ => this.authService.logoutAfter(), _ => this.authService.logoutAfter())
        }
      )
    }

    return true
  }
}
