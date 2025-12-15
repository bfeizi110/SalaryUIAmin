import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WorkAddingInfoRouting } from './work-adding-info.routing';
import { WorkAddingComponent } from './work-adding/grid/work-adding.component';
import { WorkAddingFormComponent } from './work-adding/form/work-adding-form.component';
import { WorkAddingDefineComponent } from './work-adding-define/grid/work-adding-define.component';
import { WorkAddingDefineFormComponent } from './work-adding-define/form/work-adding-define-form.component';
import { CustomAgGridModule } from 'src/app/main/main-body/common/custom-ag-grid/custom-ag-grid.module';
import { CustomFormModule } from 'src/app/main/main-body/common/custom-form/custom-form.module';
import { CustomModalModule } from 'src/app/main/main-body/common/custom-modal/custom-modal.module';


@NgModule({
  declarations: [
    WorkAddingComponent,
    WorkAddingFormComponent,
    WorkAddingDefineComponent,
    WorkAddingDefineFormComponent
  ],
  imports: [
    CommonModule,
    WorkAddingInfoRouting,
    CustomAgGridModule,
    CustomFormModule,
    CustomModalModule,
  ]
})
export class WorkAddingInfoModule { }
