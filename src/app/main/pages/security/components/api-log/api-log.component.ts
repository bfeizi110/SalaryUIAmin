import { Component } from '@angular/core'
import { UntypedFormBuilder } from '@angular/forms'
import { AlertClass } from 'src/app/main/main-body/common/alert/alert-functions'
import { CustomGridOption } from 'src/app/main/main-body/common/custom-ag-grid/interfaces/ag-grid-option.interface'
import { Validation } from 'src/app/main/main-body/common/custom-form/control-message/Validation'
import { GridFormService } from 'src/app/main/main-body/common/grid-form.service'
import { ApiLogAccessAttr, ApiLogAttr, setApiLogAccessAttr, setApiLogAttr } from '../../../global-attr'

const Controller = 'ApiLog'

@Component({
  templateUrl: './api-log.component.html',
  styleUrls: ['./api-log.component.scss']
})
export class ApiLogComponent {

  today = new Date().toLocaleDateString('fa-IR', { month: '2-digit', day: '2-digit', year: 'numeric', }).replace(/([۰-۹])/g, token => String.fromCharCode(token.charCodeAt(0) - 1728)).replace('/', '-').replace('/', '-')
  form = this.formBuilder.group({
    FromDate: [this.today, Validation.required()],
    ToDate: [this.today, Validation.required()],
  })

  showGrid: boolean = false

  gridOption = <CustomGridOption>{
    controllerName: Controller,
    rowClicked: this.onRowClicked.bind(this),
    actions: [
      {
        label: 'Delete',
        callback: this.delete.bind(this)
      }
    ]
  }

  async filter() {
    await this.getAttr()
    this.getSelect()
  }

  getAttr() {
    return new Promise(resolve => {
      this.showGrid = false
      let Attr = ApiLogAttr()
      if (!Attr)
        this.service.getAttr(Controller).subscribe((res: any) => {
          this.setAttr(res.Data, 'toLocal')
          return resolve(true)
        })
      else {
        this.setAttr(Attr)
        return resolve(true)
      }
    })
  }

  setAttr(attr, type?) {
    this.gridOption.columnDefs = attr
    type == 'toLocal' ? setApiLogAttr(attr) : null
  }

  rowNumber: number = 10
  getSelect() {
    this.showGrid = false
    this.service.post(`${Controller}/GetSelectAll`, this.form.value).subscribe((res: any) => {
      this.gridOption.rowData = res.Data
      this.gridOption.rowData.length > 10 ? this.rowNumber = 20 : null
      this.showGrid = true
    })
  }

  parentId: number
  onRowClicked(event) {
    this.showGridAccess = false
    this.parentId = event.data.Id
    this.getApiLogDetail()
  }

  logDetailObj = { QueryString: null, RequestBody: null, ResponseBody: null, Id: null }
  showLogDetail: boolean = false
  getApiLogDetail() {
    this.showLogDetail = false
    this.service.getById(Controller, this.parentId, 'View').subscribe((res: any) => {
      this.logDetailObj = res.Data
      this.logDetailObj.ResponseBody = this.cleanString(this.logDetailObj.ResponseBody)
      this.logDetailObj.ResponseBody = JSON.parse(this.logDetailObj.ResponseBody);
      this.logDetailObj.RequestBody = this.cleanString(this.logDetailObj.RequestBody)
      if (this.logDetailObj.RequestBody != '') this.logDetailObj.RequestBody = JSON.parse(this.logDetailObj.RequestBody);
      this.showLogDetail = true
    })
  }

  cleanString(str) {
    str = str.replace('"[', '[');
    str = str.replace(']"', ']');
    str = str.replace('"{', '{');
    str = str.replace('}"', '}');
    str = str.replace('\\', '');
    str = str.replace('\\\\', '');
    
  return str;
}  
  delete(event) {
    AlertClass.deleteAlert(_ => {
      this.service.delete(Controller, event.rowData.Id).subscribe((res: any) => {
        this.showGrid = false
        this.showLogDetail = false
        this.gridOption.rowData = res.Data
        setTimeout(() => this.showGrid = true, 100)
      })
    })
  }

  showGridAccess: boolean = false
  showGridNotAccess: boolean = false
  gridOptionAccess = <CustomGridOption>{ checkboxSelection: true, rowSelected: this.rowSelectedAccess.bind(this) }
  gridOptionNotAccess = <CustomGridOption>{ checkboxSelection: true, rowSelected: this.rowSelectedNotAccess.bind(this) }

  selectedAcccessList = []
  rowSelectedAccess(event) { this.selectedAcccessList.includes(event.data.Id) ? this.selectedAcccessList = this.selectedAcccessList.filter(a => a != event.data.Id) : this.selectedAcccessList.push(event.data.Id) }

  selectedNotAcccessList = []
  rowSelectedNotAccess(event) { this.selectedNotAcccessList.includes(event.data.ControllerName) ? this.selectedNotAcccessList = this.selectedNotAcccessList.filter(a => a != event.data.ControllerName) : this.selectedNotAcccessList.push(event.data.ControllerName) }

  tabChange(i) {
    if (i == 0) return
    this.showLogDetail = false
    this.buildAccessTab()
  }

  async buildAccessTab() {
    this.showGridAccess = false
    this.showGridNotAccess = false
    await this.getAttrAccess()
    await this.getSelectAccess()
    await this.getSelectNotAccess()
    this.showGridAccess = true
    this.showGridNotAccess = true
  }

  getAttrAccess() {
    return new Promise(resolve => {
      let Attr = ApiLogAccessAttr()
      if (!Attr) {
        this.service.getAttr('ApiLogAccess').subscribe((res: any) => {
          this.setAttrAccess(res.Data, 'toLocal')
          return resolve(true)
        })
      }
      else {
        this.setAttrAccess(Attr)
        return resolve(true)
      }
    })
  }

  setAttrAccess(attr, type?) {
    this.gridOptionAccess.columnDefs = attr
    this.gridOptionNotAccess.columnDefs = attr
    type == 'toLocal' ? setApiLogAccessAttr(attr) : null
  }

  getSelectAccess() {
    return new Promise(resolve => {
      this.service.get(`ApiLogAccess/GetInController`).subscribe((res: any) => {
        this.gridOptionAccess.rowData = res.Data
        return resolve(true)
      })
    })
  }

  getSelectNotAccess() {
    return new Promise(resolve => {
      this.service.get(`ApiLogAccess/GetNotInController`).subscribe((res: any) => {
        this.gridOptionNotAccess.rowData = res.Data
        return resolve(true)
      })
    })
  }

  addAccess() {
    if (this.selectedNotAcccessList.length == 0) return
    this.service.post(`ApiLogAccess/AddApiLogController`, { Id: 0, ControllerNameFarsi: "string", ControllerName: this.selectedNotAcccessList.toString() }).subscribe(_ => this.buildAccessTab())
  }

  removeAccess() {
    if (this.selectedAcccessList.length == 0) return
    this.service.deleteByBody(`ApiLogAccess/DeleteApiLogController`, { Id: this.selectedAcccessList.toString() }).subscribe(_ => this.buildAccessTab())
  }

  ngAfterViewInit(): void { this.filter() }

  constructor(private service: GridFormService, private formBuilder: UntypedFormBuilder) { }

}
