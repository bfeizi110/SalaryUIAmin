import { OidcAuthService } from './../providers/OidcAuthService';
import { AuthService } from '../providers/auth.service'
import { ElementRef, Component, OnInit, ViewChild, EventEmitter, Output, Renderer2 } from '@angular/core'
import { UntypedFormBuilder, Validators, NgForm } from '@angular/forms'
import { Validation } from 'src/app/main/main-body/common/custom-form/control-message/Validation'
import { ToastrService } from 'ngx-toastr'
import { ActivatedRoute } from '@angular/router'
import { Subscription } from "rxjs";
import { timer } from "rxjs";
import { Router } from '@angular/router';
import { Constant } from "../../main/main-body/common/constants";
import {Title} from "@angular/platform-browser";
import { CookieService } from 'ngx-cookie-service'
import { EncryptionService } from '../providers/rsahelper.service';
import { Console } from 'console';

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {

  @ViewChild('c12FA') c12FA: ElementRef<HTMLInputElement>;
  @ViewChild('c1ChgP') c1ChgP: ElementRef<HTMLInputElement>;
  
  code: string;
  errorFormType2: string;
  errorFormType4: string;
  @Output() done = new EventEmitter()
  modeltopost = new ModelToPost();

  setBgImg() {
    let backgroundImgs = ["auth-background-1.jpg", "auth-background-2.jpg", "auth-background-3.jpg", "auth-background-4.jpg"]
    let backgroundImg = backgroundImgs[Math.floor(Math.random() * backgroundImgs.length)]
    let element = document.getElementsByClassName('right-side')[0] as HTMLElement
    element.style.backgroundImage = `url(../../assets/img/auth/${backgroundImg})`
  }


  form = this.formBuilder.group({
    username: [null, Validators.required],
    password: [null, Validators.required],
    CaptchaData: [null],
    grant_type: [null]
  })

  formpwd = this.formBuilder.group({
    username: [null, Validators.required],
    phone: [null, Validators.required],
    CaptchaData: [null]
  })


  get control() { return this.form.controls }

  getErrorMessage(name) {
    if (name == 'username' && this.control.username.hasError('required')) return 'نام کاربری الزامی است'
    if (name == 'password' && this.control.username.hasError('required')) return 'کلمه عبور الزامی است'
  }
  formType = 1;

  // نمایش فرم فراموشی کلمه عبور
  onShowForgetPassForm() {
    this.setFormType(2);
    this.formpwd.reset()
  }
  private setFormType(type) {
    if (type == 2)
    {
      this.formpwd.reset()
      this.getNewCaptcha(2)
    }

    this.formType = type;
  }

  login(Is2FASms: string, inputCode: string) {
    if (!this.validCaptcha()) return
    sessionStorage.clear()
    // sessionStorage.clear()
    sessionStorage.setItem('EAS', '100731')
    const formData = new FormData()
    formData.append('grant_type', 'password')
    formData.append('password', this.form.controls.password.value)
    formData.append('username', this.form.controls.username.value)
    formData.append('Is2FASms', Is2FASms)
    formData.append('Code', inputCode)
    formData.append('AppCode', this.AppCode)
    formData.append('CaptchaCode', this.CaptchaText)

    let loginreq = new LoginRequest()
    loginreq.grant_type ='password';
    loginreq.password = this.form.controls.password.value;
    loginreq.username = this.form.controls.username.value;
    this.cookieService.deleteAll()

    return new Promise((resolve, reject) => {
      this.authService.login(formData).toPromise().then((res: any) => {
        if (res && res.IsSuccess) 
          {
            this.toastr.clear()
            if (Is2FASms == "False")
            {
              this.authService.setAuthDataToSessionStorage(res.Data)
              if (!res.Data.MustChangePass)
              {
                if (!res.Data.Have2FASms)
                  this.authService.routeToKartabl()
                else
                  this.ready4FACode()
              }
              else
              {
                this.modeltopost.UserId = res.Data.UserID
                this.showMustChangePass()
              }
            }
            else
            {
              this.authService.setAuthDataToSessionStorage(res.Data)
              this.authService.routeToKartabl()
            }

            resolve(true)
          }
        else 
        {
          this.backToLoginForm()
          reject()
        }
      })
    })
  }

  validCaptcha(): boolean {
    if (!this.HasCaptcha) return true
    if (!this.form.getRawValue().CaptchaData) {
      this.toastr.error('کد امنیتی اجباری است', 'خطا')
      return false
    }
    else {
      if (this.form.getRawValue().CaptchaData.toLowerCase() == this.CaptchaText.toLowerCase()) return true
      else 
      {
        this.toastr.error('کد امنیتی اشتباه است', 'خطا')
        this.HasCaptcha ? this.getNewCaptcha(1) : null
      }
    }
  }

  validCaptchaSms(): boolean {
    if (!this.formpwd.getRawValue().CaptchaData) {
      this.toastr.error('کد امنیتی اجباری است', 'خطا')
      return false
    }
    else {
      if (this.formpwd.getRawValue().CaptchaData.toLowerCase() == this.CaptchaTextSms.toLowerCase()) return true
      else 
      {
        this.toastr.error('کد امنیتی اشتباه است', 'خطا')
        this.getNewCaptcha(2) 
      }
    }
  }


  AppTitle: string
  AppVersionBackend: string
  logoSrc: string
  HasCaptcha: boolean = false
  CaptchaImage: string
  CaptchaText: string
  showSmallSpinner: boolean = true
  AuthenticationType: string = ''
  SystemName: string = ''
  CaptchaImageSms: string
  CaptchaTextSms: string
  AutButtonTitleBam: string
  AutButtonTitleCenter: string
  AppCode: string
  getAppInfo() {
    this.authService.getAppInfo().subscribe((res: any) => {
      this.showSmallSpinner = false
      this.AppTitle = res.Data.AppTitle
      this.AppVersionBackend = res.Data.AppVersion
      this.logoSrc = res.Data.Logo
      this.CaptchaImage = res.Data.CaptchaImage
      this.HasCaptcha = res.Data.HaveCaptcha
      this.AppCode = res.Data.AppCode
      this.AutButtonTitleBam = !res.Data.AutButtonTitleBam ? 'ورود سامانه احراز هویت بام' : res.Data.AutButtonTitleBam
      this.AutButtonTitleCenter = !res.Data.AutButtonTitleCenter ? 'ورود با احراز هویت مرکزی' : res.Data.AutButtonTitleCenter
      if (this.HasCaptcha)
      {
        this.CaptchaText = this.CaptchaImage.substring(100, 102) + this.CaptchaImage.substring(202, 204) + this.CaptchaImage.substring(304, 306)
        this.CaptchaImage = this.CaptchaImage.slice(0, 100) + this.CaptchaImage.slice(102, 202) + this.CaptchaImage.slice(204, 304) + this.CaptchaImage.substring(306)
      }
      this.AuthenticationType = res.Data.AuthenticationType
      this.SystemName = res.Data.SystemName
      this.titleService.setTitle(this.SystemName);
      if(this.AuthenticationType=="100732")  this.router.navigateByUrl('/auth/sts');
      // 100731 = احراز هویت سامانه  
      // 100732 = احراز هویت مرکزی بام
      // 100733 = احراز هویت مرکزی سازمان
      this.HasCaptcha ? this.form.controls.CaptchaData.setValidators(Validation.required()) : null
    }, _ => {
      sessionStorage.clear()
      // this.getAppInfo()
    })
  }

  getNewCaptcha(type: number) {
    if (type == 1)
      this.form.controls.CaptchaData.patchValue(null)
    if (type == 2)
      this.formpwd.controls.CaptchaData.patchValue(null)

    let CaptchaImg: string 
    let CaptchaTxt: string
    this.authService.refreshCapcha().subscribe((res: any) => { 
      CaptchaImg = res.Data.Item1
      this.AppCode = res.Data.Item2
      CaptchaTxt = CaptchaImg.substring(100, 102) + CaptchaImg.substring(202, 204) + CaptchaImg.substring(304, 306)
      CaptchaImg = CaptchaImg.slice(0, 100) + CaptchaImg.slice(102, 202) + CaptchaImg.slice(204, 304) + CaptchaImg.substring(306)
      if (type == 1)
      {
        this.CaptchaImage = CaptchaImg
        this.CaptchaText = CaptchaTxt
      }
      else
      {
        this.CaptchaImageSms = CaptchaImg
        this.CaptchaTextSms = CaptchaTxt
      }
  })
  }

  loginWithBamSystem() {
    sessionStorage.setItem('EAS', '100732')
    this.oidcAuthService.signinRedirect()
  }

  loginWithLocalSystem() {
    if(sessionStorage["UserManagerSettings"]){
      sessionStorage.setItem('EAS', '100733')
      var setting=JSON.parse(sessionStorage["UserManagerSettings"])
      window.location.href = `${setting.authority}?client_id=${setting.client_id}&redirect_uri=${setting.redirect_uri}&scope=${setting.scope}&response_type=${setting.response_type}&state=9`
    }    
  }

  constructor(private cookieService: CookieService, private authService: AuthService, 
    private formBuilder: UntypedFormBuilder, private toastr: ToastrService, private activatedRoute: ActivatedRoute,
    private oidcAuthService: OidcAuthService, private crypto: EncryptionService, private router:Router, private titleService:Title, private renderer: Renderer2) 
  {
   }

  ngOnInit(): void {
    // this.setBgImg()
    // sessionStorage.clear()
    //  if (this.authService.token && !this.authService.isTokenExpired()) return this.authService.routeToKartabl()
    //  else this.authService.removeSessionStorage()
    this.getAppInfo()
    this.form.reset()
    this.formpwd.reset()

    if (this.activatedRoute.snapshot.params['type'] == 2) {
      sessionStorage.setItem('EAS', '100732')
      this.oidcAuthService.signinRedirect()
    }
  }

// بازگشت به فرم اصلی لاگین
backToLoginForm() {
  this.setFormType(1);
  this.resetInputCode();
  this.setInvalidCode();
  this.resetCounter();
  this.resetCountDown();
  this.HasCaptcha ? this.getNewCaptcha(1) : null
}
private resetInputCode() {
  this.c1 = null;
  this.c2 = null;
  this.c3 = null;
  this.c4 = null;
  this.c5 = null;
  this.c6 = null;

}
private setInvalidCode() {
  this.counterdisplayFA = "کد منقضی شد!";
  this.counterdisplay = "کد منقضی شد!";
}
private resetCounter() {
  this.counter = 180;
  this.counterFA = 120;
}
resetCountDown() {
  if (this.countDown && this.countDown.unsubscribe)
    this.countDown.unsubscribe();
}
resetCountDownFA() {
  if (this.countDownFA && this.countDownFA.unsubscribe)
    this.countDownFA.unsubscribe();
}


// بررسی مجاز بودن شماره همراه
preventInvalidPhone(e) {
  this.errorFormType2 = null;
  let len = this.formpwd.controls.phone.value == null ? 0 : this.formpwd.controls.phone.value.length;
  if (len == 0 && e.which == 48) {
    this.formpwd.controls.phone.patchValue(null);
    return false;
  }
}

// بررسی فعال بودن دکمه ارسال کد به همراه
isDisabeSendCodeToPhone() {
  return this.formType != 2 || this.formpwd.controls.phone.value == null || this.formpwd.controls.phone.value.length < 10 || this.formpwd.controls.username.value == null || this.formpwd.controls.username.value.length < 1 || this.formpwd.controls.CaptchaData.value == null || this.formpwd.controls.CaptchaData.value.length < 6;
}

// ارسال پیامک از طریق اینتر
onEnterPhone() {
  this.sendCodeToPhone();
}

countDownFA: Subscription;
counterFA = 120;
counterdisplayFA : string =''
tickFA = 1000;
timeEndedFA = false;
// ورود کد دو عاملی
async ready4FACode() {
  this.resetInputCode();
  this.setFormType(6);
  setCountDown(this);
  setTimeout(() => {
    this.c12FA.nativeElement.focus()
  }, 200);

  return;
  function setCountDown($this: any) {
    $this.resetCounter();
    $this.resetCountDownFA();
    $this.countDownFA = timer(0, $this.tickFA).subscribe(() => {
      if ($this.counterFA > 0) 
      {
        --$this.counterFA;
        $this.counterdisplayFA = transform($this.counterFA) ;
      }
      else {
        $this.setInvalidCode();
        $this.resetCountDownFA();
        $this.timeEndedFA = true
      }
    });
  }
  
  function transform(value: number): string {
    const minutes: number = Math.floor(value / 60);
    return minutes + ':' + (value - minutes * 60);
}  
}

countDown: Subscription;
counter = 180;
counterdisplay : string =''
tick = 1000;
// ارسال کد به همراه
async sendCodeToPhone() {
this.resetInputCode();
if (!this.validCaptchaSms()) return

// this.c1ChgP.nativeElement.focus()

  const formData = new FormData()
  formData.append('FldString1', this.formpwd.controls.username.value)
  formData.append('FldString2', this.formpwd.controls.phone.value)

await new Promise((resolve, reject) => { this.authService
  .SetSmsCode(formData)
  .toPromise().then((res: any) => {
    if (!res) 
    {
      this.done.emit(false)
      reject()
    }
    else 
    {
      this.setFormType(3);
      this.modeltopost.UserId = res.Data
      setCountDown(this);
      resolve(true)
    }
  })}) ;

return;

  function setCountDown($this: any) {
    $this.resetCounter();
    $this.resetCountDown();
    $this.countDown = timer(0, $this.tick).subscribe(() => {
      if ($this.counter > 0) 
      {
        --$this.counter;
        $this.counterdisplay = transform($this.counter) ;
      }
      else {
        $this.setInvalidCode();
        $this.resetCountDown();
      }
    });
  }
  
  function transform(value: number): string {
    const minutes: number = Math.floor(value / 60);
    return minutes + ':' + (value - minutes * 60);
}  
}

c1: string;
c2: string;
c3: string;
c4: string;
c5: string;
c6: string;
@ViewChild("c1Ref") c1Ref: ElementRef;
@ViewChild("c2Ref") c2Ref: ElementRef;
@ViewChild("c3Ref") c3Ref: ElementRef;
@ViewChild("c4Ref") c4Ref: ElementRef;
@ViewChild("c5Ref") c5Ref: ElementRef;
@ViewChild("c6Ref") c6Ref: ElementRef;
// کد وارد شده توسط کاربر
keyupCode(e, index) {
  if (index == 1) {
    if (e.which != 8) {
      if (this.c1 != null && this.c1 != "") this.c2Ref.nativeElement.focus();
    }
  } else if (index == 2) {
    if (e.which == 8) this.c1Ref.nativeElement.focus();
    else {
      if (this.c2 != null && this.c2 != "") this.c3Ref.nativeElement.focus();
    }
  } else if (index == 3) {
    if (e.which == 8) this.c2Ref.nativeElement.focus();
    else {
      if (this.c3 != null && this.c3 != "") this.c4Ref.nativeElement.focus();
    }
  } else if (index == 4) {
    if (e.which == 8) this.c3Ref.nativeElement.focus();
    else {
      if (this.c4 != null && this.c4 != "") this.c5Ref.nativeElement.focus();
    }
  } else if (index == 5) {
    if (e.which == 8) this.c4Ref.nativeElement.focus();
    else {
      if (this.c5 != null && this.c5 != "") this.c6Ref.nativeElement.focus();
    }
  } else if (index == 6) {
    if (e.which == 8) {
      this.c5Ref.nativeElement.focus();
    } else {
      if (this.c6 != null && this.c6 != "") {
        let code = this.c1 + this.c2 + this.c3 + this.c4 + this.c5 + this.c6;
        if (this.formType == 6)
          this.login("True", code);
        else
          this.showChangePass(code);
      }
    }
  }
}

checkSmsCode(inputCode: string): any {
}


async checkFACode(inputCode: string){
  return await new Promise((resolve, reject) => { this.authService
    .Check2FACode(this.form.controls.username.value, inputCode)
    .toPromise().then((res: any) => {
      if (!res) 
      {
        this.done.emit(false)
        reject()
      }
      else 
      {
        if (res.Data.Item1 == 1)
        {
          this.toastr.error(res.Data.Item2)
          this.resetInputCode()
          setTimeout(() => {
            this.c12FA.nativeElement.focus()
          }, 200);
        }
        if (res.Data.Item1 == 2)
        {
          this.toastr.error(res.Data.Item2)
          this.backToLoginForm()
        }
        if (res.Data.Item1 == 0)
          this.authService.routeToKartabl()
        resolve(true)
      }
    })}) ;
  
}

// نمایش خطا در صورت نامعتبر بودن کد وارد شده
isInValidCode() {
  let inputCode = this.c1 + this.c2 + this.c3 + this.c4 + this.c5 + this.c6;
  let isInValid = inputCode.length == 6 && this.code != inputCode;
  if (!isInValid)
    this.toastr.error('کد وارد شده اشتباه است', 'خطا')  
}

changePwdSecCode: string
// نمایش فرم تغییر کلمه عبور
showChangePass(inputCode: string) {
  this.authService.CheckSmsCode(this.formpwd.controls.username.value, inputCode).toPromise().then((res: any) => {
    if (!res) return false
    else {
      if (this.counter > 0 && res.Data.Out1_Fld) {
        this.changePwdSecCode = inputCode
        this.setFormType(4);
        this.resetInputCode();
        this.resetCounter();
        this.resetCountDown();
      }
    }
  })
}

showMustChangePass() {
    this.setFormType(5);
    this.resetInputCode();
}

showMust2FA() {
  this.setFormType(6);
  this.resetInputCode();
}

@ViewChild("changePassForm") changePassForm: NgForm;
// تغییر کلمه عبور
async changePass() {
  if (this.isEmptyPass()) {
    this.toastr.error('کلمه عبور جدید و تکرار کلمه عبور جدید را لطفا وارد کنید', 'خطا')
    return;
  }
  if (this.modeltopost.Password != this.modeltopost.ConfirmPassword) {
    this.toastr.error('کلمه عبور و تکرار آن یکسان نیست', 'خطا')
    return;
  }
  
  if (this.formType == 5){
    const formdata = {UserId: this.modeltopost.UserId, Password: this.modeltopost.Password, ConfirmPassword: this.modeltopost.ConfirmPassword, OldPassword: this.form.controls.password.value }
    return await new Promise((resolve, reject) => { this.authService
      .ChangePassword(formdata)
      .toPromise().then((res: any) => {
        if (!res) 
        {
          this.done.emit(false)
          reject()
        }
        else 
        {
          this.backToLoginForm();
          resolve(true)
        }
      })}) ;
    }
  else
  {
    const formData = new FormData()
    formData.append('UserId', this.modeltopost.UserId)
    formData.append('Password', this.modeltopost.Password)
    formData.append('ConfirmPassword', this.modeltopost.ConfirmPassword)
    formData.append('SecurityCode', this.changePwdSecCode)
      return await new Promise((resolve, reject) => { this.authService
      .ChangePasswordForgot(formData)
      .toPromise().then((res: any) => {
        if (!res) 
        {
          this.done.emit(false)
          reject()
        }
        else 
        {
          this.backToLoginForm();
          resolve(true)
        }
      })}) ;
    }
}

private isEmptyPass() {
  return (
    (this.modeltopost.Password == null ||this.modeltopost.Password == "" || this.modeltopost.ConfirmPassword == null || this.modeltopost.ConfirmPassword == "")
  );
}

resetError() {
  this.errorFormType4 = null;
}

}

export class ModelToPost {
  UserId : any ;
  Password : string;
  ConfirmPassword : string;
}

export class LoginRequest{
  grant_type: string;
  password: string;
  username: string;

}