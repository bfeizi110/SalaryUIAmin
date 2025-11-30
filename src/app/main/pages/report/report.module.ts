import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { ReportRouting } from './report.routing'
import { CustomAgGridModule } from '../../main-body/common/custom-ag-grid/custom-ag-grid.module'
import { CustomFormModule } from '../../main-body/common/custom-form/custom-form.module'
import { DebtReportComponent } from './components/debt-report/debt-report.component'
import { SelectPersonnelModule } from '../../main-body/common/select-personnel/select-personnel.module'
import { TreeModalModule } from '../../main-body/common/tree-modal/tree-modal.module'
import { CustomModalModule } from '../../main-body/common/custom-modal/custom-modal.module'
import { ReportDesignViewComponent } from './components/report-design-view/report-design-view.component'
import { MatTooltipModule } from '@angular/material/tooltip'
import { TaminFileComponent } from './components/tamin-file/body/tamin-file.component'
import { TaminFileWorFormComponent } from './components/tamin-file/forms/tamin-file-wor/tamin-file-wor-form.component'
import { TaminFileKarFormComponent } from './components/tamin-file/forms/tamin-file-kar/tamin-file-kar-form.component'
import { StimulsoftViewerModule } from '../../main-body/common/stimulsoft-viewer/stimulsoft-viewer.module'

@NgModule({
  imports: [
    CommonModule,
    ReportRouting,
    CustomAgGridModule,
    CustomFormModule,
    TreeModalModule,
    SelectPersonnelModule,
    CustomModalModule,
    MatTooltipModule,
    CommonModule,
    StimulsoftViewerModule
  ],
  declarations: [
    DebtReportComponent,
    ReportDesignViewComponent,
    TaminFileComponent,
    TaminFileWorFormComponent,
    TaminFileKarFormComponent
  ],
  providers: [
    // GridFormService
  ]
})
export class ReportModule { }
