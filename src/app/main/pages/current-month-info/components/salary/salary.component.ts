import { Component, OnInit } from '@angular/core'
import { CustomGridOption } from 'src/app/main/main-body/common/custom-ag-grid/interfaces/ag-grid-option.interface'
import { GridFormService } from 'src/app/main/main-body/common/grid-form.service'
import { DetailFractionAttr, DetailFractionMashmoolAttr, DetailPayAttr, DetailPayMashmoolAttr, SalaryAttr, setDetailFractionAttr, setDetailFractionMashmoolAttr, setDetailPayAttr, setDetailPayMashmoolAttr, setSalaryAttr } from '../../../global-attr'
import * as signalR from "@microsoft/signalr"
import { environment } from 'src/environments/environment'
import { ContextMenuService } from 'src/app/main/main-body/common/context-menu.service'
//import { THIS_EXPR } from '@angular/compiler/src/output/output_ast'
import { AlertClass } from 'src/app/main/main-body/common/alert/alert-functions'

const Controller = 'Salary'

@Component({
  templateUrl: './salary.component.html',
  styleUrls: ['./salary.component.scss']
})
export class SalaryComponent implements OnInit {

  personName: string
  showPerson: boolean = false
  personData

  onShowPerson() {
    this.showPerson = true
  }

  personObj: any
  onSelectMultiplePersonnel(data) {
    let selectedList = []
    this.showPerson = false
    data.ids.forEach(id => {
      let selected = data.personData.filter(a => a.Id == id)[0]
      selectedList.push(`${selected.Name} ${selected.Family}`)
    })
    this.personObj = { ids: data.ids, names: selectedList }
  }

  onSelectPersonnel(data) {
    this.showPerson = false
    this.personObj = { ids: [data.Id], names: [`${data.Name} ${data.Family}`] }
  }

  calculate() { this.service.get(`${Controller}/CalcSalary`).subscribe(res => console.log(res)) }

  //////////////////////////////////////////////CALCSALARYSELECT/////////////////////////////////////////////////
  gridOptionCalcSalary = <CustomGridOption>{}

  rowSelectedList = []
  rowSelected(event) { this.rowSelectedList.includes(event.data) ? this.rowSelectedList = this.rowSelectedList.filter(a => a != event.data) : this.rowSelectedList.push(event.data) }

  showSelectPerson: boolean = false
  attrDto
  async onFilter(body?) {
    body ? this.attrDto = body : null
    if (!this.formObj) {
      await this.getAttrCalcSalary()
      this.getSelectCalcSalary()
    }
  }

  formObj: any
  showGridCalcSalary: boolean = false
  getAttrCalcSalary() {
    return new Promise(resolve => {
      this.showGridCalcSalary = false
      this.service.get(`${Controller}/CalcSalarySelectAttribute`).subscribe((res: any) => {
        this.setAttrCalcSalary(res.Data)
        return resolve(true)
      })
    })
  }

  setAttrCalcSalary(attr) {
    attr.EntityAttribute.Message_Fld.wrapText = true
    attr.EntityAttribute.Message_Fld.rowHeight = 400
    this.gridOptionCalcSalary.columnDefs = attr
    this.formObj = attr.EntityAttribute
  }

  getSelectCalcSalary() {
    return new Promise(resolve => {
      this.showGridCalcSalary = false
      this.service.get(`${Controller}/CalcSalarySelect`).subscribe((res: any) => {
        this.gridOptionCalcSalary.rowData = res.Data
        this.showGridCalcSalary = true
        // if (this.setPID)
        // setTimeout(() => {
        //   this.startSignalR()        
        // }, 1000); 
        //   this.service.scrollToElement('commission-grid')
        return resolve(true)
      })
    })
  }

  //////////////////////////////////////////////GROUP/////////////////////////////////////////////////
  gridOptionGroup = <CustomGridOption>{
    controllerName: Controller,
    rowClicked: this.selectGroup.bind(this)
  }

  groupId: number
  selectGroup(event) {
    this.showGridDetailFractionMashmool = false
    this.showGridDetailPayMashmool = false
    this.showGridSalary = false
    this.groupId = event.data.PersonID_Fld
    this.setAttrSalary()
  }

  showGridGroup: boolean = false
  getAttrGroup() {
    this.showGridGroup = false
    !SalaryAttr
      ? this.service.get(`${Controller}/GetSalaryAttribute`).subscribe((res: any) => this.setAttrSalaryAndGroup(res.Data, 'toLocal'))
      : this.setAttrSalaryAndGroup(SalaryAttr)
  }

  setAttrSalaryAndGroup(attr, type?) {
    this.gridOptionGroup.columnDefs = attr
    type == 'toLocal' ? setSalaryAttr(attr) : null
    this.getSelectGroup()
  }

  getSelectGroup() {
    this.showGridGroup = false
    this.service.get(`${Controller}/GetSelectGroup/null`).subscribe((res: any) => {
      this.gridOptionGroup.rowData = res.Data
      this.showGridGroup = true
    })
  }

  //////////////////////////////////////////////SALARY/////////////////////////////////////////////////
  gridOptionSalary = <CustomGridOption>{
    controllerName: Controller,
    rowClicked: this.getChilds.bind(this)
  }

  getChilds(event) {
    this.showGridDetailFractionMashmool = false
    this.showGridDetailPayMashmool = false
    this.SalaryId = event.data.Id
    this.getAttrDetailPay()
    this.getAttrDetailFraction()
  }

  showGridSalary: boolean = false
  setAttrSalary() {
    this.showGridSalary = false
    this.gridOptionSalary.columnDefs = this.gridOptionGroup.columnDefs
    this.getSelectSalary()
  }

  getSelectSalary() {
    this.showGridSalary = false
    this.service.get(`${Controller}/GetSelectSalary/${this.groupId}`).subscribe((res: any) => {
      this.gridOptionSalary.rowData = res.Data
      this.showGridSalary = true
    })
  }

  //////////////////////////////////////////////PAY/////////////////////////////////////////////////
  gridOptionDetailPay = <CustomGridOption>{
    controllerName: Controller,
    rowClicked: this.getAttrDetailPayMashmool.bind(this)
  }

  showGridDetailPay: boolean = false
  SalaryId: number
  getAttrDetailPay() {
    this.showGridDetailPay = false
    !DetailPayAttr
      ? this.service.get(`${Controller}/GetSalaryDetailPayAttribute`).subscribe((res: any) => this.setAttrDetailPay(res.Data, 'toLocal'))
      : this.setAttrDetailPay(DetailPayAttr)
  }

  setAttrDetailPay(attr, type?) {
    this.gridOptionDetailPay.columnDefs = attr
    type == 'toLocal' ? setDetailPayAttr(attr) : null
    this.getDetailPaySelect()
  }

  getDetailPaySelect() {
    this.showGridDetailPay = false
    this.service.get(`${Controller}/GetSelectSalaryDetailPay/${this.SalaryId}`).subscribe((res: any) => {
      this.gridOptionDetailPay.rowData = res.Data
      this.showGridDetailPay = true
    })
  }

  //////////////////////////////////////////////PAY MASHMOOL/////////////////////////////////////////////////
  gridOptionDetailPayMashmool = <CustomGridOption>{ controllerName: Controller }

  showGridDetailPayMashmool: boolean = false
  PayId: number
  getAttrDetailPayMashmool(event) {
    this.PayId = event.data.Id
    this.showGridDetailPayMashmool = false
    !DetailPayMashmoolAttr
      ? this.service.get(`${Controller}/GetSalaryDetailPayMashmoolAttribute`).subscribe((res: any) => this.setAttrDetailPayMashmool(res.Data, 'toLocal'))
      : this.setAttrDetailPayMashmool(DetailPayMashmoolAttr)
  }

  setAttrDetailPayMashmool(attr, type?) {
    this.gridOptionDetailPayMashmool.columnDefs = attr
    type == 'toLocal' ? setDetailPayMashmoolAttr(attr) : null
    this.getDetailPayMashmool()
  }

  getDetailPayMashmool() {
    this.showGridDetailPayMashmool = false
    this.service.get(`${Controller}/GetSelectSalaryDetailPayMashmool/${this.PayId}`).subscribe((res: any) => {
      this.gridOptionDetailPayMashmool.rowData = res.Data
      this.showGridDetailPayMashmool = true
    })
  }

  //////////////////////////////////////////////FRACTION/////////////////////////////////////////////////
  gridOptionDetailFraction = <CustomGridOption>{
    controllerName: Controller,
    rowClicked: this.getAttrDetailFractionMashmool.bind(this)
  }

  showGridDetailFraction: boolean = false
  getAttrDetailFraction() {
    this.showGridDetailFraction = false
    !DetailFractionAttr
      ? this.service.get(`${Controller}/GetSalaryDetailFractionAttribute`).subscribe((res: any) => this.setAttrDetailFraction(res.Data, 'toLocal'))
      : this.setAttrDetailFraction(DetailFractionAttr)
  }

  setAttrDetailFraction(attr, type?) {
    this.gridOptionDetailFraction.columnDefs = attr
    type == 'toLocal' ? setDetailFractionAttr(attr) : null
    this.getDetailFractionSelect()
  }

  getDetailFractionSelect() {
    this.showGridDetailFraction = false
    this.service.get(`${Controller}/GetSelectSalaryDetailFraction/${this.SalaryId}`).subscribe((res: any) => {
      this.gridOptionDetailFraction.rowData = res.Data
      this.showGridDetailFraction = true
    })
  }

  //////////////////////////////////////////////FRACTION MASHMOOL/////////////////////////////////////////////////
  gridOptionDetailFractionMashmool = <CustomGridOption>{ controllerName: Controller }

  FractionId: number
  showGridDetailFractionMashmool: boolean = false
  getAttrDetailFractionMashmool(event) {
    this.FractionId = event.data.Id
    this.showGridDetailFractionMashmool = false
    !DetailFractionMashmoolAttr
      ? this.service.get(`${Controller}/GetSalaryDetailFractionMashmoolAttribute`).subscribe((res: any) => this.setAttrDetailFractionMashmool(res.Data, 'toLocal'))
      : this.setAttrDetailFractionMashmool(DetailFractionMashmoolAttr)
  }

  setAttrDetailFractionMashmool(attr, type?) {
    this.gridOptionDetailFractionMashmool.columnDefs = attr
    type == 'toLocal' ? setDetailFractionMashmoolAttr(attr) : null
    this.getDetailFractionMashmoolSelect()
  }

  getDetailFractionMashmoolSelect() {
    this.showGridDetailFractionMashmool = false
    this.service.get(`${Controller}/GetSelectSalaryDetailFractionMashmool/${this.FractionId}`).subscribe((res: any) => {
      this.gridOptionDetailFractionMashmool.rowData = res.Data
      this.showGridDetailFractionMashmool = true
    })
  }

  hubConnectionPower: boolean = false
  startRequest() {
    let text: string = `مطمئن به محاسبه حقوق هستید؟`
    AlertClass.questionAlert({ text: text }, _ => {
      if (this.hubConnection.state != signalR.HubConnectionState.Connected )
      {
        this.startConnection()  
        this.startListenner()
      }

    // this.startConnection()  
    // this.startListenner()

    this.hubConnectionPower = true
    this.service.post(`${Controller}/CalcSalary`, this.attrDto).subscribe((res: any) => {
      this.signalRChange = false
      clearInterval(0)
      this.hubConnectionPower = false
    }, _ => {
      this.signalRChange = false
      clearInterval(0)
      this.hubConnectionPower = false
    })
    })

  }

  hubConnection: signalR.HubConnection

  startConnection() {
    this.hubConnection = new signalR.HubConnectionBuilder().withUrl(`${environment.API_URL.replace('/api/v1/', '')}/NotificationHub`, { skipNegotiation: true, transport: signalR.HttpTransportType.WebSockets }).build()
    this.hubConnection.start().then(() => console.log('Connection started')).catch(err => console.log('Error while starting connection: ' + err))
  }

  startListenner() {
    setInterval(() => { this.signalRChange = true }, 1000)
    this.sumTime = 0
    this.hubConnection.on('CalcSalary', (data) => {
      this.fixRowData(data)
      this.sumTime = this.sumTime + data.calcTime_Fld
    })
  }

  signalRChange: boolean = false
  sumTime: number
  userName: string
  fixRowData(row) {
    this.gridOptionCalcSalary.rowData.map(element => {
      if (element.Id == row.id) {
        element.CalcTime_Fld = row.calcTime_Fld
        element.Message_Fld = row.message_Fld
        element.Status_Fld = row.status_Fld
        element.Message_Fld = row.message_Fld
        this.userName = row.userName_Fld
        // this.hubConnectionPower = true
      }
      this.signalRChange = false
    })
  }

  async startSignalR() {
    this.sumTime = 0
    this.signalRChange = true
    this.gridOptionCalcSalary.rowData.map(a => { a.Message_Fld = null, a.Status_Fld = false, a.CalcTime_Fld = null })
    this.signalRChange = false
    this.startRequest()
  }

  constructor(private service: GridFormService, private contextMenuService: ContextMenuService) { }

  setPID: number
  ngOnInit(): void {
    this.setPID = this.contextMenuService.id
    this.setPID ? this.showPerson = true : null
    this.startConnection()
    this.startListenner()
  }
  ngOnCahnges(UpdatedValue: string): void {
    this.setPID = this.contextMenuService.id
    this.setPID ? this.showPerson = true : null
  }


  ngOnDestroy() {
    this.hubConnection.off('CalcSalary')
  }

}
