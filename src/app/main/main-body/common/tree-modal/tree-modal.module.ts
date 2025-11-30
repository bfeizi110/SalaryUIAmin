import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { TreeModalComponent } from './tree-modal.component'
import { CustomModalModule } from '../custom-modal/custom-modal.module'
import { MatButtonModule } from '@angular/material/button'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatInputModule } from '@angular/material/input'
import { MatSelectModule } from '@angular/material/select'
import { MatTreeModule } from '@angular/material/tree'
import { MatCheckboxModule } from '@angular/material/checkbox'
import { FormsModule } from '@angular/forms'

@NgModule({
  imports: [
    CommonModule,
    CustomModalModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatTreeModule,
    MatCheckboxModule,
    FormsModule
  ],
  declarations: [
    TreeModalComponent
  ],
  exports: [
    TreeModalComponent
  ]
})
export class TreeModalModule { }
