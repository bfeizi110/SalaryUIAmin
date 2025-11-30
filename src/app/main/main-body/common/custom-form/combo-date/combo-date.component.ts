import { Component, OnInit, Input } from '@angular/core';
import * as moment from 'jalali-moment';

@Component({
  selector: 'combo-date',
  templateUrl: './combo-date.component.html',
  styleUrls: ['./combo-date.component.css']
})
export class ComboDateComponent implements OnInit {
  ShowItem: boolean = false;
  countingyear: number[] = [];
  countingmonth: string[] = ['فروردین','اردیبهشت','خرداد','تیر','مرداد','شهریور','مهر','آبان','آذر','دی','بهمن','اسفند'];
  i: number = 0;
  StartDate: number = 0;
  EndDate: number = 0;
  todayJalaliyear = moment().locale('fa').format('YYYY');
  finaldateyear: number = 1401;
  finaldatemonth: string = 'شهریور';
  constructor() {

  }
  ngOnInit(): void {
    for (let index = this.StartDate; index <= this.EndDate; index++) {
      this.countingyear[this.i] = index;
      this.i++;
    }
  }
  showgrid(): void {
    this.ShowItem = !this.ShowItem;
  }
}
