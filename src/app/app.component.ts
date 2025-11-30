import { Component, OnInit, HostListener } from '@angular/core'
import { OidcAuthService } from './auth/providers/OidcAuthService'
import { Subject } from 'rxjs';
import { LicenseManager } from 'ag-grid-enterprise';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {
  userActivity;
  userInactive: Subject<any> = new Subject();

  constructor(private oidcAuthService: OidcAuthService) { 
    this.setTimeout();
    this.userInactive.subscribe(() => console.log('user has been inactive for 3s'));    
  }
  async ngOnInit() { 
    LicenseManager.setLicenseKey("DownloadDevTools_COM_NDEwMjM1ODQwMDAwMA==9ad48a3770fd3752296c91fd87af461e");    
  }

  setTimeout() {
    this.userActivity = setTimeout(() => this.userInactive.next(undefined), 3000);
  }

  @HostListener('window:mousemove') refreshUserState() {
    clearTimeout(this.userActivity);
    this.setTimeout();
  }
}
