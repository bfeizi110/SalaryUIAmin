import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { BankInfoRouting } from './bank-info.routing'
import { CustomAgGridModule } from 'src/app/main/main-body/common/custom-ag-grid/custom-ag-grid.module';
import { CustomFormModule } from 'src/app/main/main-body/common/custom-form/custom-form.module';
import { CustomModalModule } from 'src/app/main/main-body/common/custom-modal/custom-modal.module';
import { BankBranchFormComponent } from './bank-branch/form/bank-branch-form.component';
import { BankBranchComponent } from './bank-branch/grid/bank-branch.component';
import { BankFormatFormComponent } from './bank-format/form/bank-format-form.component';
import { BankFormatComponent } from './bank-format/grid/bank-format.component';

@NgModule({
  declarations: [
    BankBranchComponent,
    BankBranchFormComponent,
    BankFormatComponent,
    BankFormatFormComponent
  ],
  imports: [
    CommonModule,
    BankInfoRouting,
    CustomAgGridModule,
    CustomFormModule,
    CustomModalModule,
  ]
})

export class BankInfoModule { }
