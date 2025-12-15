import { RouterModule, Routes } from '@angular/router'
import { CoveredBaseComponent } from './covered-base/grid/covered-base.component'
import { HireStateComponent } from './hire-state/grid/hire-state.component'
import { HireTypeParamComponent } from './hire-type-param/body/hire-type-param.component'
import { HireTypeComponent } from './hire-type/body/hire-type.component'
import { ParameterComponent } from './parameter/grid/parameter.component'
import { HireStageComponent } from './hire-stage/grid/hire-stage.component'

export const routes: Routes = [
  { path: 'hire-type', component: HireTypeComponent },
  { path: 'hire-type-param', component: HireTypeParamComponent },
  { path: 'parameter', component: ParameterComponent },
  { path: 'hire-state', component: HireStateComponent },
  { path: 'hire-stage', component: HireStageComponent },
  { path: 'covered-base', component: CoveredBaseComponent },
]

export const HireInfoRouting = RouterModule.forChild(routes)
