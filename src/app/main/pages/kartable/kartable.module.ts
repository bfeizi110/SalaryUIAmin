import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common'
import { KartableComponent } from './components/kartable/kartable.component'
import { KartableRouting } from './kartable.routing'
import { CustomAgGridModule } from '../../main-body/common/custom-ag-grid/custom-ag-grid.module'
import { CustomFormModule } from '../../main-body/common/custom-form/custom-form.module'
import { CustomModalModule } from '../../main-body/common/custom-modal/custom-modal.module'
import { StimulsoftViewerModule } from '../../main-body/common/stimulsoft-viewer/stimulsoft-viewer.module';
import { ChartsModule} from 'ng2-charts';
import { SelectPersonnelModule } from '../../main-body/common/select-personnel/select-personnel.module'
import { PersonRequestFormComponent } from './components/request/form/person-request-form.component'
import { SecurityModule } from '../security/security.module'
import { RquestReferFormComponent } from './components/refer/form/request-refer-form.component'
import { MatTreeModule } from '@angular/material/tree';
import { RequestTreeComponent } from './components/request/tree/request-tree.component';
import { RquestFlowComponent } from './components/flow/request-flow.component'

@NgModule({
  imports: [
    CommonModule,
    KartableRouting,
    CustomAgGridModule,
    CustomFormModule,
    CustomModalModule,
    StimulsoftViewerModule,
    ChartsModule,
    SelectPersonnelModule,
    SecurityModule,
    MatTreeModule
  ],
  declarations: [
    KartableComponent,
    PersonRequestFormComponent,
    RquestReferFormComponent,
    RequestTreeComponent,
    RquestFlowComponent,
  ],
  exports:[
    RequestTreeComponent
  ]
})
export class KartableModule {



 }
