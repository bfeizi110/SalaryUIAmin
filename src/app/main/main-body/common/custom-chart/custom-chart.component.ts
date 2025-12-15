import { Component, Input, OnInit } from '@angular/core'
import { ChartOptions } from 'chart.js'
import { ChartOptionInterface } from './chart-option.interface';
//import * as pluginDataLabels from 'chartjs-plugin-datalabels'

@Component({
  selector: 'custom-chart',
  templateUrl: './custom-chart.component.html',
  styleUrls: ['./custom-chart.component.scss']
})
export class CustomChartComponent implements OnInit {

  @Input() option: ChartOptionInterface

  // Pie
  public pieChartOptions: ChartOptions = {
    responsive: true,
    legend: {
      position: 'top',
    },
    plugins: {
      datalabels: {
        formatter: (value, ctx) => {
          const label = ctx.chart.data.labels[ctx.dataIndex];
          return label;
        },
      },
    }
  };

  public pieChartLegend = true;
  //public pieChartPlugins = [pluginDataLabels];

  // events
  public chartClicked({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

  public chartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

  changeLabels(): void {
    const words = ['hen', 'variable', 'embryo', 'instal', 'pleasant', 'physical', 'bomber', 'army', 'add', 'film',
      'conductor', 'comfortable', 'flourish', 'establish', 'circumstance', 'chimney', 'crack', 'hall', 'energy',
      'treat', 'window', 'shareholder', 'division', 'disk', 'temptation', 'chord', 'left', 'hospital', 'beef',
      'patrol', 'satisfied', 'academy', 'acceptance', 'ivory', 'aquarium', 'building', 'store', 'replace', 'language',
      'redeem', 'honest', 'intention', 'silk', 'opera', 'sleep', 'innocent', 'ignore', 'suite', 'applaud', 'funny'];
    const randomWord = () => words[Math.trunc(Math.random() * words.length)];
    this.option.labels = Array.apply(null, { length: 3 }).map(_ => randomWord());
  }

  addSlice(): void {
    this.option.labels.push(['Line 1', 'Line 2', 'Line 3']);
    this.option.data.push(400);
    this.option.colors[0].backgroundColor.push('rgba(196,79,244,0.3)');
  }

  removeSlice(): void {
    this.option.labels.pop();
    this.option.data.pop();
    this.option.colors[0].backgroundColor.pop();
  }

  changeLegendPosition(): void {
    this.pieChartOptions.legend.position = this.pieChartOptions.legend.position === 'left' ? 'top' : 'left';
  }

  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {

  }

}
