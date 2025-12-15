import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { DebtInfoRouting } from './debt-info.routing'
import { DebtComponent } from './debt/grid/debt.component'
import { DebtFormComponent } from './debt/form/debt-form.component'
import { DebtFormulaComponent } from './debt-formula/grid/debt-formula.component'
import { DebtFormulaFormComponent } from './debt-formula/form/debt-formula-form.component'
import { DebtPlaceComponent } from './debt-place/grid/debt-place.component'
import { DebtPlaceFormComponent } from './debt-place/form/debt-place-form.component'
import { DebtSettingComponent } from './debt-setting/debt-setting.component'
import { CustomAgGridModule } from 'src/app/main/main-body/common/custom-ag-grid/custom-ag-grid.module'
import { CustomFormModule } from 'src/app/main/main-body/common/custom-form/custom-form.module'
import { CustomModalModule } from 'src/app/main/main-body/common/custom-modal/custom-modal.module'

@NgModule({
  declarations: [
    DebtComponent,
    DebtFormComponent,
    DebtFormulaComponent,
    DebtFormulaFormComponent,
    DebtPlaceComponent,
    DebtPlaceFormComponent,
    DebtSettingComponent,
  ],
  imports: [
    CommonModule,
    DebtInfoRouting,
    CustomAgGridModule,
    CustomFormModule,
    CustomModalModule,
  ]
})
export class DebtInfoModule { }
