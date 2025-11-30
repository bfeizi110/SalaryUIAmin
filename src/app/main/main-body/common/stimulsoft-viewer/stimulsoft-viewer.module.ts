import { MatSelectModule } from '@angular/material/select'
import { MatFormFieldModule } from '@angular/material/form-field'
import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { StimulsoftViewerDashboardComponent } from './stimulsoft-viewer-dashboard/stimulsoft-viewer-dashboard.component'
import { CustomModalModule } from '../custom-modal/custom-modal.module'
import { StimulsoftViewerReportRendererComponent } from './stimulsoft-viewer-report/stimulsoft-viewer-report-renderer/stimulsoft-viewer-report-renderer.component'
import { StimulsoftViewerReportComponent } from './stimulsoft-viewer-report/body/stimulsoft-viewer-report.component'

@NgModule({
  imports: [
    CommonModule,
    CustomModalModule,
    MatSelectModule,
    MatFormFieldModule
  ],
  declarations: [
    StimulsoftViewerDashboardComponent,
    StimulsoftViewerReportComponent,
    StimulsoftViewerReportRendererComponent,
  ],
  exports: [
    StimulsoftViewerDashboardComponent,
    StimulsoftViewerReportComponent
  ]
})
export class StimulsoftViewerModule { }
