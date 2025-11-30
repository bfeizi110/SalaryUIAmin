import { Component, OnInit } from '@angular/core';
import { AuthService } from '../providers/auth.service';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'char',
  templateUrl: '../sts/sts.component.html',
})

export class charComponent implements OnInit {

  //#region سازنده و فرم لود
  constructor(private authService: AuthService, private activatedRoute: ActivatedRoute) { }
  IsAppError: boolean = false;
  AppError: string = ''
  ngOnInit(): void {
    var key = ""
    this.activatedRoute.queryParams.subscribe(params => key = params['Key'])
    this.authService.logout(0, '').subscribe(_ => {
      sessionStorage.clear()
      this.login(key);
    })
  }
  //#endregion

  //#region Validate
  login(key) {
    const formData = new FormData()
    formData.append('grant_type', 'password')
    formData.append('password', key)
    formData.append('username', "LoginByCharmahalBakhtiariSSO")
    this.authService.login(formData).subscribe((res: any) => {
      this.authService.setAuthDataToSessionStorage(res.Data)
      this.authService.routeToKartabl()
    })
  }
  //#endregion
}