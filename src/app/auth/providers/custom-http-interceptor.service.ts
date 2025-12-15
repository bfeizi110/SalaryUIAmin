import { LoaderService } from '../../common/loader/loader.service'
import { AuthService } from './auth.service'
import { Injectable } from '@angular/core'
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse, HttpResponse } from '@angular/common/http'
import { catchError, map } from 'rxjs/operators'
import { Observable } from 'rxjs'
import { ToastrService } from 'ngx-toastr'
import { Router } from '@angular/router'
import { environment } from 'src/environments/environment'
import { EncryptionService } from "./rsahelper.service";
import { throwError } from 'rxjs'

@Injectable()
export class CustomHttpInterceptor implements HttpInterceptor {
  constructor(private router: Router, private loaderService: LoaderService, private authService: AuthService, private toastr: ToastrService, private crypto: EncryptionService) { }

  removeRequest(req: HttpRequest<any>) {
    const i = this.loaderService.requests.indexOf(req.url)
    if (i >= 0) {
      this.loaderService.requests.splice(i, 1)
    }
    this.loaderService.isLoading.next(this.loaderService.requests.length > 0)
  }

  addRequest(req: HttpRequest<any>) {
    this.loaderService.requests.push(req.url)
    this.loaderService.isLoading.next(true)
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let isTokenExpired: boolean = false
    if (request.url.lastIndexOf(environment.API_URL) == -1) {
      return next.handle(request)
    }

    if (this.router.url.includes('dashboard')
      || (request.url.includes('/Salary/CalcSalary') && request.method == 'POST')
      || request.url.includes('GetAppInfo')
      || request.url.includes('GetAppInfo')
      || request.url.includes('/Token/Refresh')
      || request.url.includes('/Sms/CheckSmsStatus')
      // || request.url.includes('Form')
      || request.url.includes('/Kartable/GetPersonFishPureStatistics')
      || (request.url.includes('/Sms') && request.method == 'GET')
      || (request.url.includes('/Logout') && request.method == 'POST')) null
    else
    {
      this.addRequest(request)
    }

    const token: string = this.authService.token

    if (request.url.lastIndexOf('/Users/GetAppInfo' + 1) == -1 && token) {
      if (request.body instanceof FormData)
        request = request.clone({ setHeaders: { authorization: token } })
      else
        request = request.clone({ setHeaders: { authorization: token, 'Content-Type': 'application/json-patch+json' } })

      isTokenExpired = this.authService.isTokenExpired()
    }

    if (token && isTokenExpired && !this.authService.canCallRefreshService)
      this.authService.wantToRefresh = true


    if (token && isTokenExpired && this.authService.wantToRefresh) {
      let body = { Token: this.authService.token.replace('Bearer ', ''), Year_Fld: this.authService.year, Month_Fld: this.authService.month }
      this.authService.refreshToken(body).subscribe((res: any) => {
        if (res.Data) {
          this.authService.setAuthDataToSessionStorage(res.Data)
          this.authService.wantToRefresh = true
          this.authService.canCallRefreshService = true
          this.removeRequest(request)
          return
        }
      },
        _ => {
          this.authService.wantToRefresh = true
          this.authService.canCallRefreshService = true
          this.authService.logoutAfter()
          this.removeRequest(request)
        }
      )
      this.authService.wantToRefresh = false
      this.authService.canCallRefreshService = false
      this.authService.logoutAfter()
      this.removeRequest(request)
    }

    if (request.body && !(request.body instanceof FormData) && request.body != "")
      (request as any).body = this.crypto.encrypt(JSON.stringify(request.body));

    return next.handle(request).pipe(map((event: HttpEvent<any>) => {
      if (event instanceof HttpResponse) {
        const IsSuccess: boolean = event?.body?.IsSuccess
        const StatusCode: number = event?.body?.StatusCode
        if (IsSuccess && event.body.Message && (request.method == 'POST' || request.method == 'PUT' || request.method == 'DELETE') && (request.url.search('Users/token') == -1 
          && request.url.search('Users/Token/Refresh') == -1 && request.url.search('GetSelect') == -1)) 
          this.toastr.success(event.body.Message.split(' |').join(','), 'موفق', { disableTimeOut: true}) 
        // else
        //   this.toastr.clear()

          this.removeRequest(request)
        if (!IsSuccess) {
          if (StatusCode == 30 || StatusCode == 36 || StatusCode == 37 || StatusCode == 38 || StatusCode == 39 || StatusCode == 40) {
            this.toastr.error(event.body.Message, 'خطا', { disableTimeOut: true})
            this.authService.logout(1,event.body.Message).subscribe(_ => this.authService.logoutAfter(), _ => this.authService.logoutAfter())
          }
          if (event?.body && event?.body?.Message)
            this.toastr.error(event.body.Message, 'خطا', { disableTimeOut: true})
        }
      }
      return event;
    }),
    catchError(error => {
      this.handleError(error, request)
      this.removeRequest(request); // Ensure loader is stopped on error
      return throwError(error);
    })
  );
  }

  handleError(err: HttpErrorResponse, request: HttpRequest<any>): Observable<any> {
    this.removeRequest(request)
    if ((err.status === 500 && !err.error) || err.status === 404 || err.status === 0 || err.status === undefined) {
      this.toastr.error('ارتباط با کامپیوتر مرکزی مقدور نیست', '',
        {
          // timeOut: 5000,
          tapToDismiss: true,
          // extendedTimeOut: 100000,
          disableTimeOut: true
        });
      // if (err.status === 404) window.location.reload();
      return throwError(err)
    }
    if (err.error && err.error.StatusCode && err.error.StatusCode == 30) {
      this.toastr.error(err.error.Message, 'خطا', { disableTimeOut: true})
      this.authService.logout(1,err.error.Message).subscribe(_ => this.authService.logoutAfter(), _ => this.authService.logoutAfter())
    }
    // err.status === 500 || err.status === 400 ? err.error && err.error.Message ? this.toastr.error(err.error.Message, 'خطا') : window.location.reload() : null
    if (err.status === 500 || err.status === 400 && err.error && err.error.Message)
      this.toastr.error(err.error.Message, 'خطا', { disableTimeOut: true})
    return throwError(err)
  }

}
