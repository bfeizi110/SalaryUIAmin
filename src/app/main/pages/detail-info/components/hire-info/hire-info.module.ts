import { HireTypeComponent } from './hire-type/body/hire-type.component'
import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { HireInfoRouting } from './hire-info.routing'
import { HireTypeFormComponent } from './hire-type/form/hire-type-form.component'
import { ParameterComponent } from './parameter/grid/parameter.component'
import { ParameterFormComponent } from './parameter/form/parameter-form.component'
import { CustomAgGridModule } from 'src/app/main/main-body/common/custom-ag-grid/custom-ag-grid.module'
import { CustomFormModule } from 'src/app/main/main-body/common/custom-form/custom-form.module'
import { CustomModalModule } from 'src/app/main/main-body/common/custom-modal/custom-modal.module'
import { HireTypeParamComponent } from './hire-type-param/body/hire-type-param.component'
import { HireTypeParamFormComponent } from './hire-type-param/form/hire-type-param-form.component'
import { HireStateComponent } from './hire-state/grid/hire-state.component'
import { HireStateFormComponent } from './hire-state/form/hire-state-form.component'
import { HireStageComponent } from './hire-stage/grid/hire-stage.component'
import { HireStageFormComponent } from './hire-stage/form/hire-stage-form.component'
import { CoveredBaseComponent } from './covered-base/grid/covered-base.component'
import { CoveredBaseFormComponent } from './covered-base/form/covered-base-form.component'
import { HireTypeSettingFormComponent } from './hire-type/hire-type-setting-form/hire-type-setting-form.component'
import { HireTypeParamSettingFormComponent } from './hire-type-param/hire-type-param-setting-form/hire-type-param-setting-form.component'


@NgModule({
  declarations: [
    HireTypeComponent,
    HireTypeFormComponent,
    HireTypeParamComponent,
    HireTypeParamFormComponent,
    ParameterComponent,
    ParameterFormComponent,
    HireStateComponent,
    HireStateFormComponent,
    HireStageComponent,
    HireStageFormComponent,
    CoveredBaseComponent,
    CoveredBaseFormComponent,
    HireTypeSettingFormComponent,
    HireTypeParamSettingFormComponent
  ],
  imports: [
    CommonModule,
    HireInfoRouting,
    CustomAgGridModule,
    CustomFormModule,
    CustomModalModule,
  ]
})
export class HireInfoModule { }
