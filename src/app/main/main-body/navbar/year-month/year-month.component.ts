import { Component, EventEmitter, OnInit, Output } from '@angular/core'
import { Router } from '@angular/router'
import { AuthService } from 'src/app/auth/providers/auth.service'
import { setYear_Fld, setMonth_Fld } from 'src/app/main/pages/global-attr'
import { AlertClass } from '../../common/alert/alert-functions'
import { ModalOptions } from '../../common/custom-modal/modal-options.interface'

@Component({
  selector: 'year-month',
  templateUrl: './year-month.component.html',
  styleUrls: ['./year-month.component.scss']
})

export class YearMonthComponent implements OnInit {

  @Output() closed = new EventEmitter()
  @Output() menuEmitted = new EventEmitter()

  yearList = []
  getYear() {
    this.service.getYear().subscribe((res: any) => {
      this.yearList = res.Data
      this.showModal = true
    }, _ => this.closed.emit())
  }

  selectedYear: number
  monthList = []
  getMonth(year, flag?) {
    flag ? this.selectedMonth = null : null
    this.service.getMonth(year).subscribe((res: any) => this.monthList = res.Data)
  }

  selectedMonth: number
  changeYear(month) {
    this.selectedMonth = month
  }

  save() {
    let text: string = `شما برای تغییر سال و ماه, نیاز به تایید کردن دارید; بعد از تایید, صفحه به روز خواهد شد`
    AlertClass.questionAlert({ text: text }, _ => {
      this.clearAttribute()
      setYear_Fld(this.selectedYear)
      setMonth_Fld(this.selectedMonth)
      this.authService.wantToRefresh = true
      this.refreshToken()
    })
  }

  clearAttribute() {
    let keys: string[] = Object.keys(sessionStorage)
    let attrKeys: string[] = []
    keys.forEach(key => key.toLocaleLowerCase().includes('attr') ? attrKeys.push(key) : null)
    attrKeys.forEach(key => sessionStorage.removeItem(key))
  }

  refreshToken() {
    let body = { Token: this.authService.token.replace('Bearer ', ''), Year_Fld: this.selectedYear, Month_Fld: this.selectedMonth }
    this.authService.refreshToken(body).subscribe((res: any) => {
      this.authService.setAuthDataToSessionStorage(res.Data)
      this.router.navigateByUrl('dashboard')
      setTimeout(() => { window.location.reload() })
    })
  }

  close() { this.closed.emit() }

  modalOptions: ModalOptions = {
    modatTitle: 'انتخاب سال و ماه',
    saveCallback: this.save.bind(this),
    hideCallback: this.close.bind(this),
    hideCloseButton: true
  }

  showModal: boolean = false

  constructor(private service: AuthService, private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.selectedYear = JSON.parse(sessionStorage.getItem("Year_Fld"))
    this.selectedMonth = JSON.parse(sessionStorage.getItem("Month_Fld"))
    this.getYear()
    this.getMonth(this.selectedYear, false)
  }

}

