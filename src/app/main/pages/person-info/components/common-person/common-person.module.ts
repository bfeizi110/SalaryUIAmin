import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GeneralPersonInfoComponent } from './general-info/general-person-info.component';
import { CardexPersonComponent } from './cardex/cardex-person.component';
import { CustomFormModule } from 'src/app/main/main-body/common/custom-form/custom-form.module';
import { MatExpansionModule } from '@angular/material/expansion';
import { CustomAgGridModule } from 'src/app/main/main-body/common/custom-ag-grid/custom-ag-grid.module';


@NgModule({
  imports: [
    CommonModule,
    CustomFormModule,
    MatExpansionModule,
    CustomAgGridModule
  ],
  declarations: [
    GeneralPersonInfoComponent,
    CardexPersonComponent
  ],
  exports: [
    GeneralPersonInfoComponent,
    CardexPersonComponent
  ]
})
export class CommonPersonModule { }
