import { Component, OnInit } from '@angular/core';
import { OidcAuthService } from '../providers/OidcAuthService';

@Component({
  selector: 'app-silent-refresh',
  templateUrl: './silent-refresh.component.html',
  styleUrls: ['./silent-refresh.component.scss']
})
export class SilentRefreshComponent implements OnInit {

  constructor(private oidcAuthService: OidcAuthService) { }

  ngOnInit(): void {
    this.oidcAuthService.signinSilentCallback();
  }

}