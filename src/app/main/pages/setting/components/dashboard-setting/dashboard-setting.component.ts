import { GridFormService } from 'src/app/main/main-body/common/grid-form.service'
import { Component, OnInit } from '@angular/core'
import { DashboardAttr, DashboardMenuAttr, DashboardReportAttr, setDashboardAttr, setDashboardMenuAttr, setDashboardReportAttr } from '../../../global-attr'
import { CustomGridOption } from 'src/app/main/main-body/common/custom-ag-grid/interfaces/ag-grid-option.interface'
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms'
import { Validation } from 'src/app/main/main-body/common/custom-form/control-message/Validation'

const Controller = 'DashBoardSetting'

@Component({
  templateUrl: './dashboard-setting.component.html',
  styleUrls: ['./dashboard-setting.component.scss']
})
export class DashboardSettingComponent implements OnInit {

  form: UntypedFormGroup
  setForm() {
    Validation.form = this.formObj
    this.form = this.formBuilder.group({
      Id: [0],
      ShowOnTopRequest_Fld: [false],
      DashBoardSettingMenuDto: [[]],
      DashBoardSettingReportDto: [[]],
      FormType:[{value: ''}]
    })
  }

  gridOptionMenuNotShow = <CustomGridOption>{ controllerName: Controller, rowClicked: this.selectMenuNotShow.bind(this) }
  gridOptionMenuShow = <CustomGridOption>{ controllerName: Controller, rowClicked: this.selectMenuShow.bind(this) }
  gridOptionReportNotShow = <CustomGridOption>{ controllerName: Controller, rowClicked: this.selectReportNotShow.bind(this) }
  gridOptionReportShow = <CustomGridOption>{ controllerName: Controller, rowClicked: this.selectReportShow.bind(this) }

  selectMenuNotShow(event) { this.selectedMenuNotShow = event.data }
  selectMenuShow(event) { this.selectedMenuShow = event.data }
  selectReportNotShow(event) { this.selectedReportNotShow = event.data }
  selectReportShow(event) { this.selectedReportShow = event.data }

  model: any
  showGrids: boolean = false
  data: any
  get() {
    this.showGrids = false
    return new Promise(resolve => {
      this.service.get(Controller).subscribe((res: any) => {
        this.data = res.Data
        this.gridOptionMenuNotShow.rowData = res.Data.DashBoardSettingMenuNotShowDto
        this.gridOptionMenuShow.rowData = res.Data.DashBoardSettingMenuShowDto
        this.gridOptionReportNotShow.rowData = res.Data.DashBoardSettingReportNotShowDto
        this.gridOptionReportShow.rowData = res.Data.DashBoardSettingReportShowDto
        this.getNullRows()
        return resolve(true)
      })
    })
  }

  menuNotShowNullRow
  menuShowNullRow
  reportNotShowNullRow
  reportShowNullRow
  getNullRows() {
    this.gridOptionMenuNotShow.rowData[0].Id == 0 ? this.menuNotShowNullRow = this.gridOptionMenuNotShow.rowData[0] : null
    this.gridOptionMenuShow.rowData[0].Id == 0 ? this.menuShowNullRow = this.gridOptionMenuShow.rowData[0] : null
    this.gridOptionReportNotShow.rowData[0].Id == 0 ? this.reportNotShowNullRow = this.gridOptionMenuNotShow.rowData[0] : null
    this.gridOptionReportShow.rowData[0].Id == 0 ? this.reportShowNullRow = this.gridOptionMenuNotShow.rowData[0] : null
  }

  formObj: any
  getAttr() {
    return new Promise(resolve => {
      let Attr = DashboardAttr()
      if (!Attr)
        this.service.getAttr(Controller).subscribe((res: any) => {
          this.setAttr(res.Data, 'toLocal')
          this.formObj = res.Data.EntityAttribute
          return resolve(true)
        })
      else {
        this.setAttr(Attr)
        return resolve(true)
      }
    })
  }

  canEdit: any
  setAttr(attr, type?) {
    this.canEdit = attr.EntityAccess.includes('EditPolicy')
    this.formObj = attr.EntityAttribute
    type == 'toLocal' ? setDashboardAttr(attr) : null
  }

  formObjMenu: any
  canEditMenu: boolean = false
  getAttrMenu() {
    return new Promise(resolve => {
      let Attr = DashboardMenuAttr()
      if (!Attr)
        this.service.get(`${Controller}/GetAttributeMenu`).subscribe((res: any) => {
          this.setAttrMenu(res.Data, 'toLocal')
          return resolve(true)
        })
      else {
        this.setAttrMenu(Attr)
        return resolve(true)
      }
    })
  }

  setAttrMenu(attr, type?) {
    this.canEditMenu = attr.EntityAccess.includes('EditPolicy')
    this.formObjMenu = attr.EntityAttribute
    this.gridOptionMenuNotShow.columnDefs = attr
    this.gridOptionMenuShow.columnDefs = attr
    type == 'toLocal' ? setDashboardMenuAttr(attr) : null
  }

  canEditReport: boolean = false
  getAttrReport() {
    return new Promise(resolve => {
      let Attr = DashboardReportAttr()
      if (!Attr)
        this.service.get(`${Controller}/GetAttributeReport`).subscribe((res: any) => {
          this.setAttrReport(res.Data, 'toLocal')
          return resolve(true)
        })
      else {
        this.setAttrReport(Attr)
        return resolve(true)
      }
    })
  }

  formObjReport: any
  setAttrReport(attr, type?) {
    this.canEditReport = attr.EntityAccess.includes('EditPolicy')
    this.formObjReport = attr.EntityAttribute
    this.gridOptionReportNotShow.columnDefs = attr
    this.gridOptionReportShow.columnDefs = attr
    type == 'toLocal' ? setDashboardReportAttr(attr) : null
  }

  selectedMenuNotShow: any
  selectedMenuShow: any
  selectedReportNotShow: any
  selectedReportShow: any

  addMenu() {
    if (!this.selectedMenuNotShow) return
    this.showGrids = false
    setTimeout(() => {
      this.gridOptionMenuShow.rowData.push(this.selectedMenuNotShow)
      this.gridOptionMenuNotShow.rowData = this.gridOptionMenuNotShow.rowData.filter(a => a != this.selectedMenuNotShow)
      this.selectedMenuNotShow = null
      this.gridOptionMenuNotShow.rowData.length == 0 ? this.gridOptionMenuNotShow.rowData.push(this.menuShowNullRow) : null
      this.showGrids = true
    })
  }

  removeMenu() {
    if (!this.selectedMenuShow) return
    this.showGrids = false
    setTimeout(() => {
      this.gridOptionMenuShow.rowData.push(this.selectedMenuShow)
      this.gridOptionMenuShow.rowData = this.gridOptionMenuShow.rowData.filter(a => a != this.selectedMenuShow)
      this.selectedMenuShow = null
      this.gridOptionMenuShow.rowData.length == 0 ? this.gridOptionMenuShow.rowData.push(this.menuShowNullRow) : null
      this.showGrids = true
    })
  }

  upMenu() {
    this.showGrids = false
    setTimeout(() => {
      if (this.selectedMenuShow) {
        let activeInex: number = this.gridOptionMenuShow.rowData.indexOf(this.selectedMenuShow)
        let row: any = this.gridOptionMenuShow.rowData[activeInex]
        let preRow: any = this.gridOptionMenuShow.rowData[activeInex - 1]
        let preOrder = this.gridOptionMenuShow.rowData[activeInex - 1].Order_Fld
        let order = this.gridOptionMenuShow.rowData[activeInex].Order_Fld
        this.gridOptionMenuShow.rowData[activeInex - 1] = row
        this.gridOptionMenuShow.rowData[activeInex - 1] = preRow
        this.gridOptionMenuShow.rowData[activeInex - 1].Order_Fld = order
        this.gridOptionMenuShow.rowData[activeInex].Order_Fld = preOrder
        this.selectedMenuShow = null
        this.showGrids = true
      }
    })
  }

  downMenu() {
    this.showGrids = false
    setTimeout(() => {
      if (this.selectedMenuShow) {
        let activeInex: number = this.gridOptionMenuShow.rowData.indexOf(this.selectedMenuShow)
        let row: any = this.gridOptionMenuShow.rowData[activeInex]
        let postRow: any = this.gridOptionMenuShow.rowData[activeInex + 1]
        let postOrder = this.gridOptionMenuShow.rowData[activeInex + 1].Order_Fld
        let order = this.gridOptionMenuShow.rowData[activeInex].Order_Fld
        this.gridOptionMenuShow.rowData[activeInex + 1] = row
        this.gridOptionMenuShow.rowData[activeInex + 1] = postRow
        this.gridOptionMenuShow.rowData[activeInex + 1].Order_Fld = order
        this.gridOptionMenuShow.rowData[activeInex].Order_Fld = postOrder
        this.selectedMenuShow = null
        this.showGrids = true
      }
    })
  }

  addReport() {
    if (!this.selectedReportNotShow) return
    this.showGrids = false
    setTimeout(() => {
      this.gridOptionReportShow.rowData.push(this.selectedReportNotShow)
      this.gridOptionReportNotShow.rowData = this.gridOptionReportNotShow.rowData.filter(a => a != this.selectedReportNotShow)
      this.selectedReportNotShow = null
      this.gridOptionReportShow.rowData[0].Id == 0 ? this.gridOptionReportShow.rowData.splice(0, 1) : null
      setTimeout(() => {
        this.service.scrollToElement('report')
      }, 200); 
      this.showGrids = true
    })
  }

  removeReport() {
    if (!this.selectedReportShow) return
    this.showGrids = false
    setTimeout(() => {
      this.gridOptionReportShow.rowData.push(this.selectedReportShow)
      this.gridOptionReportShow.rowData = this.gridOptionReportShow.rowData.filter(a => a != this.selectedReportShow)
      this.selectedReportShow = null
      this.gridOptionReportShow.rowData.length == 0 ? this.gridOptionReportShow.rowData.push(this.reportShowNullRow) : null
      this.showGrids = true
    })
  }

  upReport() {
    this.showGrids = false
    setTimeout(() => {
      if (this.selectedReportShow) {
        let activeInex: number = this.gridOptionReportShow.rowData.indexOf(this.selectedReportShow)
        let row: any = this.gridOptionReportShow.rowData[activeInex]
        let preRow: any = this.gridOptionReportShow.rowData[activeInex - 1]
        let preOrder = this.gridOptionReportShow.rowData[activeInex - 1].Order_Fld
        let order = this.gridOptionReportShow.rowData[activeInex].Order_Fld
        this.gridOptionReportShow.rowData[activeInex - 1] = row
        this.gridOptionReportShow.rowData[activeInex - 1] = preRow
        this.gridOptionReportShow.rowData[activeInex - 1].Order_Fld = order
        this.gridOptionReportShow.rowData[activeInex].Order_Fld = preOrder
        this.selectedReportShow = null
        setTimeout(() => {
          this.service.scrollToElement('report')
        }, 200); 
        this.showGrids = true
      }
    })
  }

  downReport() {
    this.showGrids = false
    setTimeout(() => {
      if (this.selectedReportShow) {
        let activeInex: number = this.gridOptionReportShow.rowData.indexOf(this.selectedReportShow)
        let row: any = this.gridOptionReportShow.rowData[activeInex]
        let postRow: any = this.gridOptionReportShow.rowData[activeInex + 1]
        let postOrder = this.gridOptionReportShow.rowData[activeInex + 1].Order_Fld
        let order = this.gridOptionReportShow.rowData[activeInex].Order_Fld
        this.gridOptionReportShow.rowData[activeInex + 1] = row
        this.gridOptionReportShow.rowData[activeInex + 1] = postRow
        this.gridOptionReportShow.rowData[activeInex + 1].Order_Fld = order
        this.gridOptionReportShow.rowData[activeInex].Order_Fld = postOrder
        this.selectedReportShow = null
        setTimeout(() => {
          this.service.scrollToElement('report')
        }, 200); 
        this.showGrids = true
      }
    })
  }

  save() {
    this.form.controls.DashBoardSettingMenuDto.patchValue(this.gridOptionMenuShow.rowData)
    this.form.controls.DashBoardSettingReportDto.patchValue(this.gridOptionReportShow.rowData)
    this.service.post(`${Controller}/Update`, this.form.getRawValue()).subscribe(_ => this.refresh())
  }

  async refresh() {
    this.showGrids = false
    await this.get()
    this.setForm()
    this.form.patchValue(this.data)
    this.showGrids = true
  }

  constructor(private service: GridFormService, private formBuilder: UntypedFormBuilder) { }

  async setPage() {
    await this.get()
    await this.getAttr()
    await this.getAttrMenu()
    await this.getAttrReport()
    this.setForm()
    this.form.patchValue(this.data)
    this.showGrids = true
  }

  ngOnInit(): void { this.setPage() }


}
