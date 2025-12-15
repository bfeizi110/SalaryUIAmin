import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { User, UserManager, UserManagerSettings } from 'oidc-client';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OidcAuthService {
  constructor(private router: Router, private httpClient: HttpClient) {
    if(this.userManager) return
    if(sessionStorage["UserManagerSettings"]){
      var setting=JSON.parse(sessionStorage["UserManagerSettings"])
      this.userManager = new UserManager(setting);  
      this.loadUser();
      this.listenSilentRenewError();
      this.listenUserSignout();
    }
  }

  userManager: UserManager;
  user: User;

  getUserManagerSettings() {return this.httpClient.get(`${environment.API_URL}Oidc/usermanagersettings`)};


  // مقدار دهی اولیه UserManager
  setUserManagerSettings = async () => {
  if (this.userManager == null) {
      try{
        var data= await this.getUserManagerSettings().toPromise() as any;
        data=data.Data
        var settings:UserManagerSettings={
          authority:data.authority,
          client_id:data.client_id,
          client_secret:data.client_secret,
          redirect_uri:`${window.location.origin}${data.redirect_uri}`,
          response_type:data.response_type,
          scope:data.scope,
          loadUserInfo:data.loaduserinfo,
          filterProtocolClaims:data.filterprotocolclaims,
          post_logout_redirect_uri:`${window.location.origin}${data.post_logout_redirect_uri}`,
          automaticSilentRenew:data.automaticsilentrenew,
          silent_redirect_uri:`${window.location.origin}${data.silent_redirect_uri}`,
          clockSkew: 7200
      }    
        this.userManager = new UserManager(settings);
        sessionStorage.setItem('UserManagerSettings',JSON.stringify(settings))
        sessionStorage.setItem('stsLogoutAddress',data.stsLogoutAddress)
        this.loadUser();
        this.listenSilentRenewError();
        this.listenUserSignout();
      }
      catch {

      } 
      }
  }

  // لاگین اولیه - دریافت کد
  async signinRedirect() {
    await this.setUserManagerSettings()
    this.userManager.signinRedirect();
  }

  // لاگین
  signinRedirectCallback() {
    this.userManager.signinRedirectCallback()
      .then(user => {
        this.user = user;
        this.router.navigateByUrl('/auth/sts');
      });
  }

  // دریافت توکن
  getToken() {return this.user == null ? '' :this.user.access_token}

  // آیا کاربر لاگین هست
  isLoggedIn() {
    return this.user != null && this.user.access_token && !this.user.expired;
  }

  listenSilentRenewError() {
    this.userManager.events.addSilentRenewError((error) => {
      alert(error.message);
    });
  }

  // گوش دادن به خروج
  listenUserSignout() {
    this.userManager.events.addUserSignedOut(() => {
      this.userManager.signoutRedirect()
        .then(resp => {
          console.log('Success');
        })
        .catch(err => {
          console.log(err);
        });
    });
  }

  // مقداردهی User
  loadUser() {
    this.userManager.getUser()
      .then((user) => {
        this.user = user
      });
  }
  signinSilentCallback() {
    this.userManager.signinSilentCallback();
  }
  // خروج
  signoutRedirect() {
    this.userManager.signoutRedirect();
  }

  signoutRedirectCallback() {
    this.userManager.signoutRedirectCallback()
      .then(() => { this.userManager.removeUser() })
      .then(() => { this.user = null; });
  
  }
}
