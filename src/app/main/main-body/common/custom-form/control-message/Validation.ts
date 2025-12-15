import { Validators } from "@angular/forms";
export class Validation {
  static getValidatorErrorMessage(caption: string = ' فیلد', validatorName: string, validatorValue?: any) {
    let config = {
      'required': caption + ' اجباری است. ',
      'invalidDate': 'فرمت تاریخ اشتباه است.',
      'pattern': 'الگو اشتباه میباشد',
      'invalidDecimal': 'فقط عدد (اعشاری)  مجاز است.',
      'invalidTinyInt': ' عدد بین 0-255 وارد کنید. ',
      'invalidMonth': ' عدد وارد شده صحیح نیست. ',
      'invalidDay': ' عدد وارد شده صحیح نیست. ',
      'invalidPercent': ' عدد وارد شده صحیح نیست. ',
      'invalidNationalCode': 'کد ملی اشتباه است.',
      'invalidLenght': '',
      'invalidEmailAddress': 'فرمت پست الکترونیک اشتباه است.',
      'invalidPassword': 'Invalid password. Password must be at least 6 characters long, and contain a number.',
      'maxlength': `حداکثر کاراکتر مجاز برای ${caption} ${validatorValue.requiredLength} میباشد.`,
      'minlength': `حدااقل کاراکتر مجاز برای ${caption} ${validatorValue.requiredLength} میباشد.`,
      'max': `حداکثر عدد مجاز  ${validatorValue.requiredLength} میباشد.`,
      'min': `حداقل عدد مجاز ${validatorValue.requiredLength} میباشد.`,
      'bachelorDegree': 'مقطع تحصیلی با سابقه همخوانی ندارد',
      'sanavatDegree': 'مقطع تحصیلی با سنوات همخوانی ندارد'
    }
    return config[validatorName];
  }

  static emailValidator(control) {
    // RFC 2822 compliant regex
    if (!control.value)
      return null;
    if (control.value.match(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/)) {
      return null;
    } else {
      return { 'invalidEmailAddress': true };
    }
  }

  static passwordValidator(control) {
    if (!control.value)
      return null;
    // {6,100}           - Assert password is between 6 and 100 characters
    // (?=.*[0-9])       - Assert a string has at least one number
    if (control.value.match(/^(?=.*[0-9])[a-zA-Z0-9!@#$%^&*]{6,100}$/)) {
      return null;
    } else {
      return { 'invalidPassword': true };
    }
  }

  static dateValidator(control) {
    if (!control.value) return null

    if (control.value && typeof control.value == 'string') {
      if (control.value.match(/^(13|14)\d\d[/](0[1-9]|1[012])[/](0[1-9]|[12][0-9]|3[01])$/))
        return null

      else return { 'invalidDate': true };

    }

  }

  static gregorianDateValidator(control) {
    if (!control.value)
      return null;

    if (control.value && typeof control.value == 'string') {
      if (control.value.match(/^(19|20)\d\d[/](0[1-9]|1[012])[/](0[1-9]|[12][0-9]|3[01])$/)) {
        return null;
      }
      else {
        return { 'invalidDate': true };
      }
    }

  }
  static decimalValidator(field) {
    if (!Validation.form[field]?.value || Validation.form[field]?.value.toString().match(/[+-]?([0-9]*[.])?[0-9]+/)) {
      return null;
    } else {
      return { 'invalidDecimal': true };
    }
  }

  static tinyIntValidator(control) {
    if (!control.value || (control.value >= 0 && control.value <= 255)) {
      return null;
    } else {
      return { 'invalidTinyInt': true };
    }
  }

  static lenghtValidator(control) {
    if (!control.value) {//|| control.value.length==lenght) {
      return null;
    } else {
      return { 'invalidLenght': true };
    }
  }

  static MonthValidator(control) {
    if (!control.value || control.value <= 12) {//|| control.value.length==lenght) {
      return null;
    } else {
      return { 'invalidMonth': true };
    }
  }

  static DayValidator(control) {
    if (!control.value || control.value <= 31) {//|| control.value.length==lenght) {
      return null;
    } else {
      return { 'invalidDay': true };
    }
  }

  static PercentValidator(control) {
    if (!control.value || control.value <= 100) {//|| control.value.length==lenght) {
      return null;
    } else {
      return { 'invalidPercent': true };
    }
  }


  static NationalCodeValidator(control) {
    if (!control.value)
      return null;

    let nationalCode = control.value

    if (nationalCode.length != 10 || parseInt(nationalCode, 10) == 0) return null;

    nationalCode = ('0000' + nationalCode).substr(nationalCode.length + 4 - 10);
    if (parseInt(nationalCode.substr(3, 6), 10) == 0)
      return { 'invalidNationalCode': true };
    var c = parseInt(nationalCode.substr(9, 1), 10), s = 0;
    for (var i = 0; i < 9; i++)
      s += parseInt(nationalCode.substr(i, 1), 10) * (10 - i);
    s = s % 11;
    let returnValue = (s < 2 && c == s) || (s >= 2 && c == (11 - s));

    if (!returnValue) return { 'invalidNationalCode': true }

    else return null;
  }

  static form

  static required() { return Validators.required }

  static disable(field) { if (Validation.form[field]?.disableInput) return true; else return false }

  static defaultvalue(field) { return (Validation.form[field]?.defaultvalue ? Validation.form[field]?.defaultvalue : null) }

  /*   static form
  
    static require(field) { if (Validation.form[field]?.require) return Validators.required }
  
    static required() { return Validators.required }
  
    static disable(field) { if (Validation.form[field]?.disableInput) return true; else return false }
  
    static minLen(field) { if (Validation.form[field]?.range && !Validation.form[field]?.range?.includes('-')) return Validators.minLength(+Validation.form[field].range) }
   */
  static setRange(range, field) {
    let min, max
    if (range.includes('-')) {
      range = range.split('-')
      if (this.form[field].type == 'string') {
        min = Validators.minLength(+range[0])
        max = Validators.maxLength(+range[1])
      }
      else {
        Validators.min(+range[0])
        Validators.max(+range[1])
      }
      return [max, min]
    }

    else return Validators.maxLength(+range)
  }

  static setRequire() { return Validators.required }

  static setValidator(field) {
    const validationArray = []
    Validation.form[field]?.require ? validationArray.push(this.setRequire()) : null
    let range: string | any = Validation.form[field]?.range
    if (range) {
      const setRange = this.setRange(range, field)
      setRange ? Array.isArray(setRange) ? validationArray.push(setRange[0], setRange[1]) : validationArray.push(setRange) : null
    }
    return Validators.compose(validationArray)
  }

  static CalculateDiffer2Date(StartDate, EndDate, returType) {
    var SYear, SMonth, SDay, EYear, EMonth, EDay, Year, Month, Day
    SYear = parseInt(StartDate.substring(0, 4))
    SMonth = parseInt(StartDate.substring(5, 7))
    SDay = parseInt(StartDate.substring(8, 10))

    EYear = parseInt(EndDate.substring(0, 4))
    EMonth = parseInt(EndDate.substring(5, 7))
    EDay = parseInt(EndDate.substring(8, 10))

    Year = EYear - SYear

    if (EDay < SDay) {
      Day = EDay - SDay + 30
      EMonth = EMonth - 1
    }
    else {
      Day = EDay - SDay;
    }
    if (EMonth < SMonth) {
      Year = Year - 1
      Month = EMonth - SMonth + 12;
    }
    else {
      Month = EMonth - SMonth;
    }


    if (Day > 29) {
      Day = (Day) % 30
      Month = Month + 1
    }
    else {
      Day = (Day)
    }

    if (Month > 11) {
      Month = (Month) % 12
      Year = Year + 1
    }
    else {
      Month = (Month)
    }


    var YT, MT, DT

    if (Year < 10)
      YT = (Year) * 365
    else
      YT = (Year) * 365


    if (Month < 10)
      MT = Month * 30
    else
      MT = Month * 30

    if (Day < 10)
      DT = Day
    else
      DT = Day
    var daysCount = YT + MT + DT


    var differCollection = new Array({ Year, Month, Day })
    if (returType == 'D') {
      differCollection[0].Day = daysCount;
    }
    else if (returType == 'Y') {
      differCollection[0].Year = Math.floor(daysCount / 365);
    }

    else if (returType == 'YM') {
      differCollection[0].Year = Math.floor(daysCount / 365);
      differCollection[0].Month = Math.floor((daysCount % 365) / 30);
    }
    else if (returType == 'MD') {
      differCollection[0].Month = Math.floor(daysCount / 30);
      differCollection[0].Day = Math.floor((daysCount % 30));
    }
    else if (returType == 'YMD') {
      differCollection[0].Year = Math.floor(daysCount / 365);
      differCollection[0].Month = Math.floor((daysCount % 365) / 30);
      differCollection[0].Day = Math.floor((daysCount % 365) % 30);
    }
    return differCollection[0];
  }

}
