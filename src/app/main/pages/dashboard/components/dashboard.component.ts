import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewEncapsulation } from '@angular/core'
import { GridFormService } from 'src/app/main/main-body/common/grid-form.service';

//declare var Stimulsoft: any;

@Component({
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {

  stimulsoftData: any
  showStimulViewer: boolean = false
  getReport() {
    this.service.post('ReportDesignView/NewViewStimul', { Id: 14, Tafkik: "" }).subscribe((res: any) => {
      this.stimulsoftData = res.Data
      this.showStimulViewer = true
    })
  }

  ngOnInit() {
    this.getReport()
    this.service.currentMessageReport.subscribe((res: any) => {
      if (res == 'dashboard') {
        /* this.showStimulViewer = false
        setTimeout(() => {
          this.showStimulViewer = true
        }, 500) */
      }
    })
  }

  constructor(private service: GridFormService) { }

}
