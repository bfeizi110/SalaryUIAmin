import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaminBaseComponent } from './tamin-base/grid/tamin-base.component';
import { TaminBaseFormComponent } from './tamin-base/form/tamin-base-form.component';
import { InsureComponent } from './insure/grid/insure.component';
import { InsureFormComponent } from './insure/form/insure-form.component';
import { InsureJobComponent } from './insure-job/grid/insure-job.component';
import { InsureJobFormComponent } from './insure-job/form/insure-job-form.component';
import { CustomAgGridModule } from 'src/app/main/main-body/common/custom-ag-grid/custom-ag-grid.module';
import { CustomFormModule } from 'src/app/main/main-body/common/custom-form/custom-form.module';
import { CustomModalModule } from 'src/app/main/main-body/common/custom-modal/custom-modal.module';
import { InsureInfoRouting } from './insure-info.routing';

@NgModule({
  declarations: [
    TaminBaseComponent,
    TaminBaseFormComponent,
    InsureComponent,
    InsureFormComponent,
    InsureJobComponent,
    InsureJobFormComponent
  ],
  imports: [
    CommonModule,
    InsureInfoRouting,
    CustomAgGridModule,
    CustomFormModule,
    CustomModalModule,
  ]
})
export class InsureInfoModule { }
