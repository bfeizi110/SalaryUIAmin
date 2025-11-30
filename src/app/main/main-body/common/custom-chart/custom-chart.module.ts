import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomChartComponent } from './custom-chart.component';
import { NgChartsModule  } from 'ng2-charts'

@NgModule({
  imports: [
    CommonModule,
    NgChartsModule 
  ],
  declarations: [
    CustomChartComponent
  ],
  exports: [CustomChartComponent]
})
export class CustomChartModule { }
