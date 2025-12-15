import { Component, EventEmitter, Input, Output } from '@angular/core'
import { LoaderService } from 'src/app/common/loader/loader.service'
import { GridFormService } from '../../../grid-form.service'

declare var Stimulsoft: any
@Component({
  selector: 'stimulsoft-viewer-report-renderer',
  templateUrl: './stimulsoft-viewer-report-renderer.component.html',
  styleUrls: ['./stimulsoft-viewer-report-renderer.component.scss']
})
export class StimulsoftViewerReportRendererComponent {

  @Input() data: any
  @Input() controller: string
  @Output() emitter = new EventEmitter()

  constructor(private service: GridFormService, private loaderService: LoaderService) { }

  viewer;
  reportData
  initialStimulsoft() {
    if (typeof Stimulsoft != 'undefined')
      setTimeout(() => { this.trigger() }, 1);
    else
      this.service.loadScript('/assets/Report.js').subscribe(_ => { this.trigger() })
  }


  trigger() {
    Stimulsoft.Base.StiLicense.key = "6vJhGtLLLz2GNviWmUTrhSqnOItdDwjBylQzQcAOiHl2AD0gPVknKsaW0un+3PuM6TTcPMUAWEURKXNso0e5OFPaZYasFtsxNoDemsFOXbvf7SIcnyAkFX/4u37NTfx7g+0IqLXw6QIPolr1PvCSZz8Z5wjBNakeCVozGGOiuCOQDy60XNqfbgrOjxgQ5y/u54K4g7R/xuWmpdx5OMAbUbcy3WbhPCbJJYTI5Hg8C/gsbHSnC2EeOCuyA9ImrNyjsUHkLEh9y4WoRw7lRIc1x+dli8jSJxt9C+NYVUIqK7MEeCmmVyFEGN8mNnqZp4vTe98kxAr4dWSmhcQahHGuFBhKQLlVOdlJ/OT+WPX1zS2UmnkTrxun+FWpCC5bLDlwhlslxtyaN9pV3sRLO6KXM88ZkefRrH21DdR+4j79HA7VLTAsebI79t9nMgmXJ5hB1JKcJMUAgWpxT7C7JUGcWCPIG10NuCd9XQ7H4ykQ4Ve6J2LuNo9SbvP6jPwdfQJB6fJBnKg4mtNuLMlQ4pnXDc+wJmqgw25NfHpFmrZYACZOtLEJoPtMWxxwDzZEYYfT"
    Stimulsoft.Base.Localization.StiLocalization.setLocalizationFile("assets/localization/fa.xml", true)
    var options = new Stimulsoft.Viewer.StiViewerOptions();
    options.appearance.scrollbarsMode = false;
    options.appearance.fullScreenMode = false;
    options.appearance.rightToLeft = true;
    options.appearance.showTooltips = false;
    options.toolbar.showAboutButton = false;
    options.toolbar.showFullScreenButton = true;
    options.toolbar.showButtonCaptions = true;
    options.toolbar.showBookmarksButton = false;
    options.toolbar.showParametersButton = false;
    options.toolbar.showResourcesButton = false;
    options.exports.showExportToDocument = false;
    options.exports.showExportToHtml = false;
    options.exports.showExportToCsv = false;
    options.exports.showExportToText = false;
    options.exports.showExportToOpenDocumentWriter = false;
    options.exports.showExportToOpenDocumentCalc = false;
    options.exports.showExportToPowerPoint = false;
    options.toolbar.showEditorButton = false;
    options.toolbar.showOpenButton = true;
    options.toolbar.printDestination = 2;
    var report = new Stimulsoft.Report.StiReport();
    this.viewer = new Stimulsoft.Viewer.StiViewer(options, "StiViewer", false)
    this.reportData=this.data.Item2
    report.loadDocument(this.data.Item2)
    this.viewer.report = report
    // let viewerTag: any = document.getElementById('viewer')
    //  viewerTag.contentWindow.location.reload(true);
    // if (viewerTag) 
    this.viewer.renderHtml('viewer')
    this.loaderService.hide()
  }
  tag

  flag: boolean = true
  ngOnChanges(UpdatedValue: any): void {
    this.loaderService.show()
    this.initialStimulsoft()
  }
  NewTab(){
    var report = new Stimulsoft.Report.StiReport();
    Stimulsoft.Base.StiLicense.key = "6vJhGtLLLz2GNviWmUTrhSqnOItdDwjBylQzQcAOiHl2AD0gPVknKsaW0un+3PuM6TTcPMUAWEURKXNso0e5OFPaZYasFtsxNoDemsFOXbvf7SIcnyAkFX/4u37NTfx7g+0IqLXw6QIPolr1PvCSZz8Z5wjBNakeCVozGGOiuCOQDy60XNqfbgrOjxgQ5y/u54K4g7R/xuWmpdx5OMAbUbcy3WbhPCbJJYTI5Hg8C/gsbHSnC2EeOCuyA9ImrNyjsUHkLEh9y4WoRw7lRIc1x+dli8jSJxt9C+NYVUIqK7MEeCmmVyFEGN8mNnqZp4vTe98kxAr4dWSmhcQahHGuFBhKQLlVOdlJ/OT+WPX1zS2UmnkTrxun+FWpCC5bLDlwhlslxtyaN9pV3sRLO6KXM88ZkefRrH21DdR+4j79HA7VLTAsebI79t9nMgmXJ5hB1JKcJMUAgWpxT7C7JUGcWCPIG10NuCd9XQ7H4ykQ4Ve6J2LuNo9SbvP6jPwdfQJB6fJBnKg4mtNuLMlQ4pnXDc+wJmqgw25NfHpFmrZYACZOtLEJoPtMWxxwDzZEYYfT"
    report.loadDocument(this.reportData);

    ////////////////Export As Pdf
    report.exportDocumentAsync(function (pdfData) {
        // Create blob data
        var blob = new Blob([new Uint8Array(pdfData)], { type: "application/pdf" });
        // Show the new tab with the blob data
        var fileURL = URL.createObjectURL(blob);
        window.open(fileURL);
    }, Stimulsoft.Report.StiExportFormat.Pdf);
  ////////////////Export As Pdf
  //   report.exportDocumentAsync(function (pdfData) {
  //     var tab = window.open('about:blank', '_blank');
  //     document.body.setAttribute("bgcolor","")
  //     tab.document.write(pdfData); // where 'html' is a variable containing your HTML
  //     tab.document.body.setAttribute("bgcolor","")
  //     tab.document.close(); // to finish loading the page
  // }, Stimulsoft.Report.StiExportFormat.Html);
  }
}
