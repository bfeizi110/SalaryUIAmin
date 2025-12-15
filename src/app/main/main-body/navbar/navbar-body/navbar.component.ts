import { Component, OnInit, Input, EventEmitter } from '@angular/core'
import { Router } from '@angular/router'
import * as $ from 'jquery'
import { AuthService } from 'src/app/auth/providers/auth.service'
import { GridFormService } from 'src/app/main/main-body/common/grid-form.service'


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})

export class NavbarComponent implements OnInit {

  @Input() formObj: any

  showYearMonth: boolean = false
  yearMonthOpen() { this.showYearMonth = true }

  yearMonthClose() { this.showYearMonth = false }

  showMyInfo: boolean = false
  myInfoOpen() { this.showMyInfo = true }

  myInfoClose() { this.showMyInfo = false }

  showChangePassword: boolean = false
  changePasswordOpen() { this.showChangePassword = true }

  ChangePasswordClose() { this.showChangePassword = false }

  openCustomizer() { $('.customizer').toggleClass('open') }

  logout() { this.router.navigateByUrl('auth/logout') }

  constructor(private service: GridFormService, private authService: AuthService, private router: Router) { }

  HeaderMessage: string = ''
  smscredit : any = 0 
  smscreditaccess = false 
  sms = false
  async getsmscredit() {
    this.sms = false
    this.smscreditaccess = false
    await new Promise(resolve => {
      this.service.get('Sms').toPromise().then((res: any) => {
        this.formObj = res.Data
        return resolve(true)
      })
    })
    if (this.formObj)
    {
      this.smscredit = this.formObj.Item1
      this.smscreditaccess = this.formObj.Item2
      this.sms = true
    }
  }

  ngOnInit(): void {
    this.HeaderMessage = sessionStorage.HeaderMessage
    this.getsmscredit();
    $('.customizer').removeClass('open')
  }

}