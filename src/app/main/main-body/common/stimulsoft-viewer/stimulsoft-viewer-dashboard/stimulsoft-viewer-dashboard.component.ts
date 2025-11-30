import { Component, EventEmitter, Input, Output } from '@angular/core'
import { ToastrService } from 'ngx-toastr'
import { LoaderService } from 'src/app/common/loader/loader.service'
import { GridFormService } from '../../grid-form.service'

declare var Stimulsoft: any
@Component({
  selector: 'stimulsoft-viewer-dashboard',
  templateUrl: './stimulsoft-viewer-dashboard.component.html',
  styleUrls: ['./stimulsoft-viewer-dashboard.component.scss']
})
export class StimulsoftViewerDashboardComponent {

  @Input() data: any
  @Input() controller: string
  @Output() emitter = new EventEmitter()

  constructor(private service: GridFormService, private toastr: ToastrService, private loader: LoaderService) { }

  options: any
  report: any
  viewer: any
  initialStimulsoft() {
    this.loader.show()
    if (typeof Stimulsoft != 'undefined')
      setTimeout(() => { this.trigger() }, 1);
    else
      this.service.loadScript('/assets/Report.js').subscribe(_ => { this.trigger() })
  }

  trigger() {
    this.viewer = new Stimulsoft.Viewer.StiViewer(null, "StiViewer", false)
    Stimulsoft.Base.StiLicense.key = "6vJhGtLLLz2GNviWmUTrhSqnOItdDwjBylQzQcAOiHl2AD0gPVknKsaW0un+3PuM6TTcPMUAWEURKXNso0e5OFPaZYasFtsxNoDemsFOXbvf7SIcnyAkFX/4u37NTfx7g+0IqLXw6QIPolr1PvCSZz8Z5wjBNakeCVozGGOiuCOQDy60XNqfbgrOjxgQ5y/u54K4g7R/xuWmpdx5OMAbUbcy3WbhPCbJJYTI5Hg8C/gsbHSnC2EeOCuyA9ImrNyjsUHkLEh9y4WoRw7lRIc1x+dli8jSJxt9C+NYVUIqK7MEeCmmVyFEGN8mNnqZp4vTe98kxAr4dWSmhcQahHGuFBhKQLlVOdlJ/OT+WPX1zS2UmnkTrxun+FWpCC5bLDlwhlslxtyaN9pV3sRLO6KXM88ZkefRrH21DdR+4j79HA7VLTAsebI79t9nMgmXJ5hB1JKcJMUAgWpxT7C7JUGcWCPIG10NuCd9XQ7H4ykQ4Ve6J2LuNo9SbvP6jPwdfQJB6fJBnKg4mtNuLMlQ4pnXDc+wJmqgw25NfHpFmrZYACZOtLEJoPtMWxxwDzZEYYfT"
    Stimulsoft.Base.Localization.StiLocalization.setLocalizationFile("assets/localization/fa.xml", true)
    if (this.data.Item1) {
      this.report = Stimulsoft.Report.StiReport.createNewDashboard()
      this.data.Item3.forEach(element => {
        let dtName = element.DtName_Fld
        var dataSet = new Stimulsoft.System.Data.DataSet("data")
        dataSet.readJson(JSON.stringify(element.Json_Fld))
        this.report.regData(dtName, dtName, dataSet)
        this.report.loadFile(`assets/dashboard/${this.data.Item2}`)
        if (!this.report._reportVersion) return this.toastr.error(`فایل ${this.data.Item2} یافت نشد`, ` خطا`)
      })
    }
    else {
      this.report = new Stimulsoft.Report.StiReport()
      this.report.loadDocument(this.data.Item2)
    }
    this.viewer.report = this.report
    /* setTimeout(() => { if (document.getElementById('viewer')) this.viewer.renderHtml('viewer') }, 500) */
    setTimeout(() => {
      if (document.getElementById('viewer1')) {
        this.viewer.renderHtml('viewer1')
        this.service.tag = document.getElementById('viewer1')
        this.loader.hide()
        //sessionStorage.setItem('tag', this.tag)
      }
    }, 500)
  }
  tag

  listenFromReport() {
    this.service.currentMessageReport.subscribe((res: any) => {
      if (res == 'dashboard') {

        let StiViewerReportPanel = document.getElementById('StiViewerReportPanel')
        //  let viewerx = StiViewerReportPanel.parentElement.parentElement.parentElement

        if (this.flag) {
          let tag: any = document.getElementById('viewer2')
          tag = this.service.tag
          this.viewer.renderHtml('viewer2')
          this.flag = false
          this.service.tag = document.getElementById('viewer2')
        }

        else {
          let tag: any = document.getElementById('viewer1')
          tag = this.service.tag
          this.viewer.renderHtml('viewer1')
          this.flag = true
          this.service.tag = document.getElementById('viewer1')
        }

        setTimeout(() => { StiViewerReportPanel.style.display = 'none' }, 400)
      }
    })
  }

  flag: boolean = true
  ngOnChanges(UpdatedValue: any) {
    this.initialStimulsoft()

    this.listenFromReport()
  }
}
