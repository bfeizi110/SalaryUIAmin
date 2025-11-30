import { Injectable } from '@angular/core';
import { NgbDatepickerI18n, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { TranslationWidth } from '@angular/common';


@Injectable()
export class PersianDatePickerService extends NgbDatepickerI18n {

override getWeekdayLabel(weekday: number, width?: TranslationWidth): string {
  switch (width) {
    case 2:
      return WEEKDAYS_LONG[weekday - 1];
    case 3:
    case 0:
    default:
      return WEEKDAYS_SHORT[weekday - 1];
  }
}

  override getMonthShortName(month: number): string {
    return MONTHS[month - 1];
  }

  override getMonthFullName(month: number): string {
    return MONTHS[month - 1];
  }

  override getDayAriaLabel(date: NgbDateStruct): string {
    return `${date.year}/${this.getMonthFullName(date.month)}/${date.day}`;
  }
}

const WEEKDAYS_SHORT = ['د', 'س', 'چ', 'پ', 'ج', 'ش', 'ی'];
const WEEKDAYS_LONG = [
  'دوشنبه',
  'سه‌شنبه',
  'چهارشنبه',
  'پنجشنبه',
  'جمعه',
  'شنبه',
  'یکشنبه'
];

const MONTHS = [
  'فروردین', 'اردیبهشت', 'خرداد', 'تیر',
  'مرداد', 'شهریور', 'مهر', 'آبان',
  'آذر', 'دی', 'بهمن', 'اسفند'
];
