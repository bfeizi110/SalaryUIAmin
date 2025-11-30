import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { CaseInfoRouting } from './case-info.routing'
import { CaseComponent } from './case/grid/case.component'
import { CaseFormComponent } from './case/form/case-form.component'
import { MostamarComponent } from './mostamar/grid/mostamar.component'
import { MostamarFormComponent } from './mostamar/form/mostamar-form.component'
import { CustomAgGridModule } from 'src/app/main/main-body/common/custom-ag-grid/custom-ag-grid.module'
import { CustomFormModule } from 'src/app/main/main-body/common/custom-form/custom-form.module'
import { CustomModalModule } from 'src/app/main/main-body/common/custom-modal/custom-modal.module'
import { FractionComponent } from './fraction/grid/fraction.component'
import { FractionFormComponent } from './fraction/form/fraction-form.component'


@NgModule({
  declarations: [
    CaseComponent,
    CaseFormComponent,
    MostamarComponent,
    MostamarFormComponent,
    FractionComponent,
    FractionFormComponent
  ],
  imports: [
    CommonModule,
    CaseInfoRouting,
    CustomAgGridModule,
    CustomFormModule,
    CustomModalModule
  ]
})
export class CaseInfoModule { }
