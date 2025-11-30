import { Component, Input, OnInit } from '@angular/core'
import { AppVersion } from '../../../../src/environments/version';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  currentDate: Date = new Date()
  @Input() AppVersionBackend: string

  today = new Date()

  AppVersionFrontend: string = AppVersion;

  constructor() { }

  ngOnInit(): void {
  }

}
