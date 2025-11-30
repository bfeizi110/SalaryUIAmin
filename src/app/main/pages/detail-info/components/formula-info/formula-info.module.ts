import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { FormulaInfoRouting } from './formula-info.routing'
import { NewFormulaComponent } from './new-formula/body/new-formula.component'
import { NewFormulaFormComponent } from './new-formula/form/new-formula-form.component'
import { MissionComponent } from './mission/mission/body/mission.component'
import { MissionFormComponent } from './mission/mission/form/mission-form.component'
import { MissionDefineComponent } from './mission/mission-define/grid/mission-define.component'
import { MissionDefineFormComponent } from './mission/mission-define/form/mission-define-form.component'
import { CustomAgGridModule } from 'src/app/main/main-body/common/custom-ag-grid/custom-ag-grid.module'
import { CustomFormModule } from 'src/app/main/main-body/common/custom-form/custom-form.module'
import { CustomModalModule } from 'src/app/main/main-body/common/custom-modal/custom-modal.module'
import { NewFormulaDetailComponent } from './new-formula/new-formula-detail/grid/new-formula-detail.component'
import { NewFormulaDetailFormComponent } from './new-formula/new-formula-detail/form/new-formula-detail-form.component'


@NgModule({
  declarations: [
    NewFormulaComponent,
    NewFormulaFormComponent,
    MissionComponent,
    MissionFormComponent,
    MissionDefineComponent,
    MissionDefineFormComponent,
    NewFormulaDetailComponent,
    NewFormulaDetailFormComponent
  ],
  imports: [
    CommonModule,
    FormulaInfoRouting,
    CustomAgGridModule,
    CustomFormModule,
    CustomModalModule
  ]
})
export class FormulaInfoModule { }
