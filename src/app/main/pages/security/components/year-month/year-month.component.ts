import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { AlertClass } from 'src/app/main/main-body/common/alert/alert-functions'
import { CustomGridOption } from 'src/app/main/main-body/common/custom-ag-grid/interfaces/ag-grid-option.interface'
import { ModalOptions } from 'src/app/main/main-body/common/custom-modal/modal-options.interface'
import { GridFormService } from 'src/app/main/main-body/common/grid-form.service'
import { setYearMonthAttr, YearMonthAttr } from '../../../global-attr'

const Controller = 'YearMonth'

@Component({
  templateUrl: './year-month.component.html',
  styleUrls: ['./year-month.component.scss']
})

export class YearMonthComponent implements OnInit {

  modalOptions: ModalOptions = { modatTitle: 'تنظیمات ماه و سال', hideButton: true }

  constructor(private service: GridFormService, private router: Router) { }

  add() {
    let text: string = `شما برای ایجاد سال و ماه, نیاز به تایید کردن دارید; بعد از تایید, دوباره باید به برنامه ورود کنید`
    AlertClass.questionAlertCheckBoxInput({ text: text }, (e, value: boolean) => this.service.post(`${Controller}/AddMonth/${value}`, null).subscribe(_ => this.router.navigateByUrl('auth/logout')))
  }

  delete() {
    let text: string = `شما برای حذف سال و ماه, نیاز به تایید کردن دارید; بعد از تایید, دوباره باید به برنامه ورود کنید`
    AlertClass.questionAlert({ text: text }, _ => this.service.deleteWithoutId(`${Controller}/DeleteMonth`).subscribe(_ => this.router.navigateByUrl('auth/logout')))
  }

  gridOption = <CustomGridOption>{ controllerName: Controller }

  formObj: any
  showGrid: boolean = false
  getAttr() {
    this.showGrid = false
    let Attr = YearMonthAttr()
    !Attr
      ? this.service.getAttr(Controller).subscribe((res: any) => this.setAttr(res.Data, 'toLocal'))
      : this.setAttr(Attr)
  }

  setAttr(attr, type?) {
    this.gridOption.columnDefs = attr
    this.formObj = attr.EntityAttribute
    type == 'toLocal' ? setYearMonthAttr(attr) : null
    this.getSelect()
  }

  getSelect() {
    this.showGrid = false
    this.service.get(`${Controller}/GetSelect`).subscribe((res: any) => {
      this.gridOption.rowData = res.Data
      this.showGrid = true
    })
  }

  showModal: boolean = false
  onShowModal() {
    this.showModal = true
  }

  ngOnInit(): void { this.getAttr() }

}
