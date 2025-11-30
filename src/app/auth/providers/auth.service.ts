import { Router } from '@angular/router'
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { SessionStorageClass } from 'src/app/common/scripts/localStorage'
import { environment } from 'src/environments/environment'
import { ToastrService } from 'ngx-toastr'
import { UserManager } from 'oidc-client'
import { OidcAuthService } from './OidcAuthService'

@Injectable()
export class AuthService {
  year
  month
  userManager: UserManager;
  canCallRefreshService = false

  refreshToken(body) {
    let headers: any = new HttpHeaders({
      'Content-Type': 'application/json',
      authorization: this.token,
    })
    headers = { headers: headers }
    this.wantToRefresh = false
    this.canCallRefreshService = true
    return this.http.post(`${environment.API_URL}Users/Token/Refresh`, body, headers)
  }


  GetSSOHeader(json: boolean = true): HttpHeaders {
    let headers = new HttpHeaders();
    headers = headers.set('Authorization',this.SSOtoken);
    return headers;
  }


  setAuthDataToSessionStorage(data) {
    this.year = data.LastYear
    this.month = data.LastMonth
    sessionStorage.setItem('Token', data.access_token && data.access_token != '' ? `Bearer ${data.access_token}` : '')
    sessionStorage.setItem('ExpireToken', JSON.stringify(new Date(new Date().valueOf() + data.expires_in * 1000)))
    sessionStorage.setItem('OwnerPID', data.Pid)
    sessionStorage.setItem('OwnerUserId', data.UserID)
    sessionStorage.setItem('Year_Fld', data.LastYear)
    sessionStorage.setItem('Month_Fld', data.LastMonth)
    sessionStorage.setItem('HeaderMessage', data.HeaderMessage)
    sessionStorage.setItem('SSOToken', data.sso_token)
    sessionStorage.setItem('LastSuccessLoginDate', data.LastSuccessLoginDate)
    sessionStorage.setItem('LastSuccessLoginTime', data.LastSuccessLoginTime)
    sessionStorage.setItem('LastUnSuccessLoginDate', data.LastUnSuccessLoginDate)
    sessionStorage.setItem('LastUnSuccessLoginTime', data.LastUnSuccessLoginTime)
    sessionStorage.setItem('LastUnSuccessLoginDesc', data.LastUnSuccessLoginDesc)
  }

  sessionStorageClass = new SessionStorageClass()
  wantToRefresh: boolean = false

  get token(): string { return sessionStorage.getItem('Token') }
  get SSOtoken(): string { return sessionStorage.getItem('SSOToken') }

  get expired(): any { return +JSON.parse(sessionStorage.ExpireToken) }

  isTokenExpired(): boolean { 
    return this.expired < new Date().valueOf() 
  }

  login(body) { return this.http.post(`${environment.API_URL}Users/token`, body) }
  
  LoginFromUniversitySTS(body) { return this.http.post(`${environment.API_URL}Users/LoginFromUniversitySTS`,body) }

  getAppInfo() { return this.http.get(`${environment.API_URL}Users/GetAppInfo`) }

  SetSmsCode(body) { 
    return this.http.post(`${environment.API_URL}Users/SetSmsCode`, body) 
  }
  
  CheckSmsCode(username, code) { return this.http.get(`${environment.API_URL}Users/CheckSmsCode/${username}/${code}`) }

  Check2FACode(username, code) { return this.http.get(`${environment.API_URL}Users/Check2FACode/${username}/${code}`) }

  ChangePasswordForgot(body) { return this.http.post(`${environment.API_URL}Users/ChangePasswordForgot`, body) }

  ChangePassword(body) { return this.http.post(`${environment.API_URL}Users/ChangePassword`, body) }

  refreshCapcha() { return this.http.post(`${environment.API_URL}Users/RefreshCaptcha`, null) }

  getYear() { return this.http.get(`${environment.API_URL}YearMonth/GetYear`) }

  getMonth(id) { return this.http.get(`${environment.API_URL}YearMonth/GetMonth/${id}`) }

  logout(LogoutType: number, LogoutMessage: string) { 
    let body ={ParentID: LogoutType, SelectWqInp:LogoutMessage, UserID: sessionStorage.getItem('OwnerUserId')}
    return this.http.post(`${environment.API_URL}Users/Logout`, body) 
  }
  SSOlogout(address) { return this.http.get(address, { headers: this.GetSSOHeader() }) }


  logoutAfter() {
    var stsLogoutAddress=sessionStorage.getItem("stsLogoutAddress");
    if(stsLogoutAddress && sessionStorage.getItem('EAS') == '100733'){
      try {
        var externalWindow = window.open(stsLogoutAddress,'', 'width=700,height=700');
        this.SSOlogout(stsLogoutAddress).subscribe()
      } catch (error) {
      }
      sessionStorage.clear()
      setTimeout(() => { 
        externalWindow.close()}, 10000);
        this.router.navigateByUrl('/auth')
    }
  else{
    if (sessionStorage.getItem('EAS') == '100732') 
      { 
        this.oidcAuthService.signoutRedirect() 
      }
    else
    {
      sessionStorage.clear()
      this.router.navigateByUrl('/auth')
    }
  }
    
  }

  routeToKartabl() {
    this.router.navigateByUrl('main/kartable')
  }
  addSessionStorage(items) { this.sessionStorageClass.setItems(items) }

  private ConvertToLowerCase(data) {
    var key, keys = Object.keys(data)
    var n = keys.length
    var newobj = {}
    while (n--) {
      key = keys[n]
      newobj[key.toLowerCase()] = data[key]
    }
    return newobj
  }



  generateLocalToken(nid: string) { return this.http.post(`${environment.API_URL}Oidc/AuthCenter`, (typeof nid == 'number' ? JSON.parse(nid) : parseInt(nid))) }

  getParamMap(btnLoginType: string) { return this.http.get(`${environment.API_URL}token/Uni/ParamMap/${btnLoginType}`) }

  getToken(btnLoginType: string, code: string) { return this.http.get(`${environment.API_URL}token/Uni/${btnLoginType}/${code}`) }

  constructor(private http: HttpClient, private router: Router, private toastr: ToastrService, private oidcAuthService : OidcAuthService) { }

}
