import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { DashboardComponent } from './components/dashboard.component'
import { DashboardRouting } from './dashboard.routing'
import { StimulsoftViewerModule } from '../../main-body/common/stimulsoft-viewer/stimulsoft-viewer.module'
@NgModule({
  imports: [
    CommonModule,
    DashboardRouting,
    StimulsoftViewerModule
  ],
  declarations: [
    DashboardComponent
  ]
})
export class DashboardModule { }
