import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomAgGridModule } from '../custom-ag-grid/custom-ag-grid.module';
import { CustomFormModule } from '../custom-form/custom-form.module';
import { CustomModalModule } from '../custom-modal/custom-modal.module';
import { MatExpansionModule } from '@angular/material/expansion';
import { PersonnelFilterComponent } from './personnel-filter/personnel-filter.component';
import { SelectPersonnelComponent } from './grid/select-personnel.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { TreeModalModule } from '../tree-modal/tree-modal.module';

@NgModule({
  imports: [
    CommonModule,
    CustomAgGridModule,
    CustomFormModule,
    CustomModalModule,
    MatExpansionModule,
    TreeModalModule,
    MatTooltipModule
  ],
  declarations: [
    SelectPersonnelComponent,
    PersonnelFilterComponent
  ],
  providers: [
    /* GridFormService */
  ],
  exports: [
    SelectPersonnelComponent,
    MatExpansionModule,
    PersonnelFilterComponent
  ]
})
export class SelectPersonnelModule { }
