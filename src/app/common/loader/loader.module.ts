import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoaderComponent } from './loader.component';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner'
import { LoaderService } from './loader.service';


@NgModule({
  declarations: [
    LoaderComponent
  ],
  imports: [
    CommonModule,
    NgxSpinnerModule
  ],
  exports: [
    LoaderComponent,
    NgxSpinnerModule
  ],
  providers: [
    NgxSpinnerService,
    LoaderService
  ]
})
export class LoaderModule { }
