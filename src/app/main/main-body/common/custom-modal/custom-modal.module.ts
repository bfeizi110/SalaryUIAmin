import { NgxSmartModalModule, NgxSmartModalService } from 'ngx-smart-modal'
import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { CustomModalComponent } from './custom-modal.component'
import { MatButtonModule } from '@angular/material/button'



@NgModule({
  declarations: [
    CustomModalComponent
  ],
  imports: [
    CommonModule,
    NgxSmartModalModule.forChild(),
    MatButtonModule
  ],
  providers: [
    NgxSmartModalService
  ],
  exports: [
    CustomModalComponent
  ]
})
export class CustomModalModule { }
