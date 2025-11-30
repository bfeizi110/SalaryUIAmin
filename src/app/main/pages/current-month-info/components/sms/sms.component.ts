import { Component } from '@angular/core'
import { AlertClass } from 'src/app/main/main-body/common/alert/alert-functions'
import { CustomGridOption } from 'src/app/main/main-body/common/custom-ag-grid/interfaces/ag-grid-option.interface'
import { GridFormService } from 'src/app/main/main-body/common/grid-form.service'
import { SendSmsAttr, setSendSmsAttr, SmsCardexAttr, setSmsCardexAttr, SentSmsAttr, setSentSmsAttr } from '../../../global-attr'

const Controller = 'Sms'

@Component({
  templateUrl: './sms.component.html',
  styleUrls: ['./sms.component.scss']
})
export class SmsComponent {

  Controller: string = Controller

  smsList = []
  clickCombo() { this.smsList.length == 0 ? this.service.getCombo('SmsSaved').subscribe((res: any) => this.smsList = res.Data) : null }

  refreshCombo() {
    this.smsList = []
    this.clickCombo()
  }

  smsId: number
  showGridSend: boolean
  save() {
    this.showGridSend = false
    this.dto.Id = this.smsId
    this.selectedSendSms ? this.dto.PersonID = this.selectedSendSms.toString() : null
    this.service.post(`${Controller}/SendSmsPhase1`, this.dto).toPromise().then((res: any) => {
      if (res)
      {
        this.smsId = null
        this.gridOptionSend.rowData = res.Data
        this.showGridSend = true
        this.selectedSendSms = []
      }
      this.dto.PersonID = null
    })
  }

  send() {
    this.showGridReady = false
    this.dto.IDCollect_Fld = this.selectedReady.toString() 
    this.service.post(`${Controller}/SendSmsFinal`, this.dto).subscribe((res: any) => {
      this.gridOptionReady.rowData = res.Data
      this.showGridReady = true
      this.selectedReady = []
      })
  }  
  personData = []
  filterDto: any
  showSelectPerson: boolean = false

  dto: any
  async onFilter(dto) {
    this.dto = dto
    if (this.tabIndexChild == 0) {
      await this.getAttrSend()
      this.getSelectSend()
    }
    if (this.tabIndexChild == 1) {
      await this.getAttrSend()
      this.getSelectReady()
    }
    if (this.tabIndexChild == 2) {
      await this.getAttrSent()
      this.getSelectSent()
    }
  }

  onFilterWithoutFilterButton(dto) { this.dto = dto }

  gridOptionSend = <CustomGridOption>{ 
    controllerName: Controller ,
    checkboxSelection: true,
    rowSelected: this.rowSelectedSend.bind(this),
  }
  gridOptionSent = <CustomGridOption>{
    controllerName: Controller,
    checkboxSelection: true,
    rowSelected: this.rowSelectedSent.bind(this),
  }
  gridOptionReady = <CustomGridOption>{
    controllerName: Controller,
    checkboxSelection: true,
    rowSelected: this.rowSelectedReady.bind(this),
  }

  selectedSendSms = []
  selectedSentSms = []
  selectedReady = []
  rowSelectedSent(event) { this.selectedSentSms.includes(event.data.Id) ? this.selectedSentSms = this.selectedSentSms.filter(a => a != event.data.Id) : this.selectedSentSms.push(event.data.Id) }
  rowSelectedSend(event) { this.selectedSendSms.includes(event.data.Id) ? this.selectedSendSms = this.selectedSendSms.filter(a => a != event.data.Id) : this.selectedSendSms.push(event.data.Id) }
  rowSelectedReady(event) { this.selectedReady.includes(event.data.Id) ? this.selectedReady = this.selectedReady.filter(a => a != event.data.Id) : this.selectedReady.push(event.data.Id) }

  delete() {
    AlertClass.deleteAlert(_ => {
      this.service.deleteByBody(`${Controller}/DeleteSentAll`, { IDCollect_Fld: this.selectedReady.toString() }).subscribe((res: any) => {
        this.selectedReady = []
        this.getSelectReady()
      })
    })
  }

  formObjSend: any
  getAttrSend() {
    let Attr = SendSmsAttr()
    return new Promise(resolve => {
      if (!Attr) {
        this.service.get(`${Controller}/GetSelect4SendAttribute`).subscribe((res: any) => {
          this.setSendAttr(res.Data, 'toLocal')
          return resolve(true)
        })
      }
      else {
        this.setSendAttr(Attr, null)
        return resolve(true)
      }
    })
  }

  cardexOptions
  setSendAttr(attr, type) {
    this.gridOptionSend.columnDefs = attr
    this.formObjSend = attr.EntityAttribute
    type == 'toLocal' ? setSendSmsAttr(attr) : null
  }

  formObjSent: any
  getAttrSent() {
    let Attr = SentSmsAttr()
    return new Promise(resolve => {
      if (!Attr) {
        this.service.get(`${Controller}/GetSelectSmsSentAttribute`).subscribe((res: any) => {
          this.setSentAttr(res.Data, 'toLocal')
          return resolve(true)
        })
      }
      else {
        this.setSentAttr(Attr, null)
        return resolve(true)
      }
    })
  }

  setSentAttr(attr, type) {
    this.gridOptionSent.columnDefs = attr
    this.formObjSent = attr.EntityAttribute
    type == 'toLocal' ? setSentSmsAttr(attr) : null
  }

  getAttrReady() {
    let Attr = SentSmsAttr()
    return new Promise(resolve => {
      if (!Attr) {
        this.service.get(`${Controller}/GetSelectSmsSentAttribute`).subscribe((res: any) => {
          this.setReadyAttr(res.Data, 'toLocal')
          return resolve(true)
        })
      }
      else {
        this.setReadyAttr(Attr, null)
        return resolve(true)
      }
    })
  }

  setReadyAttr(attr, type) {
    this.gridOptionReady.columnDefs = attr
    this.formObjSent = attr.EntityAttribute
    type == 'toLocal' ? setSentSmsAttr(attr) : null
  }  


  tabIndexParent: number = 0
  async selectedParentTabChange(e) {
    this.tabIndexChild = 0
    this.tabIndexParent = e.index
    if (this.tabIndexParent == 1) await this.setCardex(); else this.showGridSend = true
    this.cardexOptions.PID = null
  }

  tabIndexChild: number = 0
  async selectedChildTabChange(e) {
    this.selectedSentSms = []
    this.selectedReady = []
    this.selectedSendSms = []
    this.tabIndexChild = e.index
    if (this.tabIndexChild == 0)
    {
      this.getSelectSend()
    }
    if (this.tabIndexChild == 1)
    {
      await this.getAttrReady()
      this.getSelectReady()
    }
    if (this.tabIndexChild == 2) 
    {
      await this.getAttrSent()
      this.getSelectSent()
    }
  }

  async setCardex() {
    await this.getAttrCardex()
    this.cardexOptions = {
      Controller: Controller,
      columnDefs: this.gridOptionSend.columnDefs,
    }
  }

  formObjCardex: any
  getAttrCardex() {
    let Attr = SmsCardexAttr()
    return new Promise(resolve => {
      if (!Attr) {
        this.service.get(`${Controller}/GetKardexAttribute`).subscribe((res: any) => {
          this.setAttrCardex(res.Data, 'toLocal')
          return resolve(true)
        })
      }
      else {
        this.setAttrCardex(Attr, null)
        return resolve(true)
      }
    })
  }

  setAttrCardex(attr, type) {
    this.gridOptionSend.columnDefs = attr
    this.formObjSend = attr.EntityAttribute
    type == 'toLocal' ? setSmsCardexAttr(attr) : null
  }

  getSelectSend() {
    this.showGridSend = false
    this.service.post(`${Controller}/GetSelect4Send`, this.dto).subscribe((res: any) => {
      this.gridOptionSend.rowData = res.Data
      this.showGridSend = true
    })
  }

  showGridSent: boolean = false
  getSelectSent() {
    this.showGridSent = false
    this.service.post(`${Controller}/SentSms`, this.dto).subscribe((res: any) => {
      this.gridOptionSent.rowData = res.Data
      this.showGridSent = true
    })
  }

  showGridReady: boolean = false
  getSelectReady() {
    this.showGridReady = false
    this.service.post(`${Controller}/GetReady4Send`, this.dto).subscribe((res: any) => {
      this.gridOptionReady.rowData = res.Data
      this.showGridReady = true
    })
  }
  
  rowClickedPerson(id) {
    this.cardexOptions.PID = null
    setTimeout(() => this.cardexOptions.PID = id)
  }

  reSend() {
    this.service.post(`${Controller}/ReSendSms`, { IDCollect_Fld: this.selectedSentSms.toString() }).subscribe(_ => {
      this.selectedSentSms = []
      this.getSelectSent()
    })
  }

  checkSms: boolean = false
  checkSmsStatus() {
    this.checkSms = true
    this.service.post(`${Controller}/CheckSmsStatus`, this.dto).subscribe(_ => {
      this.selectedSentSms = []
      this.getSelectSent()
      this.checkSms = false
    })
  }

  showPerson: boolean = false
  onShowPerson() {
    this.showPerson = true
  }

  personObj: any
  onSelectPersonnel(data) {
    let selectedList = []
    this.showPerson = false
    data.ids.forEach(id => {
      let selected = data.personData.filter(a => a.Id == id)[0]
      selectedList.push(`${selected.Name} -- ${selected.Family}`)
    })
    this.personObj = { ids: data.ids, names: selectedList }
    this.showPerson = false
  }

  constructor(private service: GridFormService) { }

}
