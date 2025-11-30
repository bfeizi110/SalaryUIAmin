import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TaxInfoRouting } from './tax-info.routing';
import { TaxComponent } from './tax/tax/body/tax.component';
import { TaxFormComponent } from './tax/tax/form/tax-form.component';
import { TaxBaseComponent } from './tax-base/grid/tax-base.component';
import { TaxBaseFormComponent } from './tax-base/form/tax-base-form.component';
import { TaxBaseTableComponent } from './tax/tax-base-table/grid/tax-base-table.component';
import { TaxBaseTableFormComponent } from './tax/tax-base-table/form/tax-base-table-form.component';
import { TaxBaseTableDetailComponent } from './tax/tax-base-table-detail/grid/tax-base-table-detail.component';
import { TaxBaseTableDetailFormComponent } from './tax/tax-base-table-detail/form/tax-base-table-detail-form.component';
import { CustomAgGridModule } from 'src/app/main/main-body/common/custom-ag-grid/custom-ag-grid.module';
import { CustomFormModule } from 'src/app/main/main-body/common/custom-form/custom-form.module';
import { CustomModalModule } from 'src/app/main/main-body/common/custom-modal/custom-modal.module';


@NgModule({
  declarations: [
    TaxComponent,
    TaxFormComponent,
    TaxBaseComponent,
    TaxBaseFormComponent,
    TaxBaseTableComponent,
    TaxBaseTableFormComponent,
    TaxBaseTableDetailComponent,
    TaxBaseTableDetailFormComponent
  ],
  imports: [
    CommonModule,
    TaxInfoRouting,
    CustomAgGridModule,
    CustomFormModule,
    CustomModalModule,
  ]
})
export class TaxInfoModule { }
