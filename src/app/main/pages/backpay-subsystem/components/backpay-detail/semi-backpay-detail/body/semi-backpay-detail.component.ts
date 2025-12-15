import { Component, EventEmitter, Input, Output } from '@angular/core'
import { LoaderService } from 'src/app/common/loader/loader.service'
import { CustomGridOption } from 'src/app/main/main-body/common/custom-ag-grid/interfaces/ag-grid-option.interface'
import { GridFormService } from 'src/app/main/main-body/common/grid-form.service'
import { BackPayMashmoolAttr, setBackPayMashmoolAttr } from '../../../../../global-attr'

const Controller = 'BackpayDetail'

@Component({
  selector: 'semi-backpay-detail',
  templateUrl: './semi-backpay-detail.component.html',
  styleUrls: ['./semi-backpay-detail.component.scss']
})
export class SemiBackpayDetailComponent {

  @Input() Id: number
  @Input() PID: string
  @Input() backPayType: number
  @Input() IsMultiple: boolean
  @Output() doneParam = new EventEmitter()
  @Output() doneWorkAdding = new EventEmitter()
  @Output() doneFraction = new EventEmitter()

  showTab: boolean = false
  paramTypeId: number = 3
  workAddingTypeId: number = 3
  workAddingId: number = 3

  paramGridUrlAttr: string
  paramGridUrlGetSelect: string
  async comboChange(catId, type) {
    await this.getParam(catId, type)
    await this.getFraction(catId)
    setTimeout(() => this.service.scrollToElement('semibackpay-detail-tab'), 450)
  }

  async getParam(catId, type) {
    switch (type) {
      case 'param':
        if (this.isManual) {
          this.paramGridUrlAttr = `${Controller}/GetBackPayHokmParamManualSelectAttribute`
          this.paramGridUrlGetSelect = `${Controller}/GetSelectDetailParamManual/${this.Id}/${this.PID}`
        }
        else {
          this.paramGridUrlAttr = `${Controller}/GetBackPayHokmParamSelectAttribute`
          this.paramGridUrlGetSelect = `${Controller}/GetSelectDetailParam/${this.Id}/${catId}`
        }
        break
      case 'workaddingtype':
        if (this.isManual) {
          this.paramGridUrlAttr = `${Controller}/BackPayWorkAddingManualSelectAttributeDto`
          this.paramGridUrlGetSelect = `${Controller}/GetSelectDetailWorkAddingManual/${this.Id}/${this.PID}/12`
        }
        else {
          this.paramGridUrlAttr = `${Controller}/BackPayWorkAddingSelectAttributeDto`
          this.paramGridUrlGetSelect = `${Controller}/GetSelectDetailWorkAdding/${this.Id}/${catId}/12`
        }
        break
      case 'workadding':
        if (this.isManual) {
          this.paramGridUrlAttr = `${Controller}/BackPayWorkAddingManualSelectAttributeDto`
          this.paramGridUrlGetSelect = `${Controller}/GetSelectDetailWorkAddingManual/${this.Id}/${this.PID}/10`
        }
        else {
          this.paramGridUrlAttr = `${Controller}/BackPayWorkAddingSelectAttributeDto`
          this.paramGridUrlGetSelect = `${Controller}/GetSelectDetailWorkAdding/${this.Id}/${catId}/10`
        }
        break
    }
    await this.getAttrParam()
    await this.getSelectParam()
  }

  gridOptionFraction = <CustomGridOption>{ controllerName: `${Controller}/GetMiniLogFraction`, rowClicked: this.rowClickedFraction.bind(this) }

  fractionGridUrlAttr: string
  fractioGridUrlGetSelect: string
  async getFraction(catId) {
    this.isManual ? this.fractionGridUrlAttr = `${Controller}/GetBackPayHokmFractionManualSelectAttribute` : this.fractionGridUrlAttr = `${Controller}/GetBackPayHokmFractionSelectAttribute`
    let groupid: number
    if (this.activeTabIndex == 0) groupid = 5
    else if (this.activeTabIndex == 1) groupid = 12
    else groupid = 10

    this.isManual ? this.fractioGridUrlGetSelect = `${Controller}/GetSelectDetailFractionManual/${this.Id}/${this.PID}/${groupid}` : this.fractioGridUrlGetSelect = `${Controller}/GetSelectDetailFraction/${this.Id}/${catId}/${groupid}`
    await this.getAttrFraction()
    await this.getSelectFraction()
  }

  formObjFraction: any
  canEditFraction: boolean = false
  getAttrFraction() {
    return new Promise(resolve => {
      this.service.get(this.fractionGridUrlAttr).subscribe((res: any) => {
        this.gridOptionFraction.columnDefs = res.Data
        this.canEditFraction = res.Data.EntityAccess.includes('EditPolicy')
        this.gridOptionFraction.columnDefs.EntityAttribute.EntityName = 'SalaryDetailFractionTbl'
        this.formObjFraction = res.Data.EntityAttribute
        return resolve(true)
      })
    })
  }

  showGridFraction: boolean = false
  getSelectFraction() {
    return new Promise(resolve => {
      this.showGridFraction = false
      this.service.get(this.fractioGridUrlGetSelect).subscribe((res: any) => {
        this.gridOptionFraction.rowData = res.Data
        this.showGridFraction = true
        return resolve(true)
      })
    })
  }

  gridOptionParam = <CustomGridOption>{ controllerName: `${Controller}/GetMiniLogParam`, rowClicked: this.rowClickedParam.bind(this) }
  showGridParam: boolean = false
  showGridWorkAdding: boolean = false

  data: any
  showFormParam: boolean = false
  showFormParamWorkAdding: boolean = false
  formType: string = ''
  editParam(event) {
    this.data = event.rowData
    this.activeTabIndex == 0 ? this.showFormParam = true : this.showFormParamWorkAdding = true
    this.formType = 'Edit'
  }

  showFormFraction: boolean = false
  editFraction(event) {
    this.data = event.rowData
    this.showFormFraction = true
    this.formType = 'Edit'
  }

  activeAttr: any
  formObjParam: any
  canEditParam: boolean = false
  getAttrParam() {
    return new Promise(resolve => {
      this.service.get(this.paramGridUrlAttr).subscribe((res: any) => {
        this.gridOptionParam.columnDefs = res.Data
        this.canEditParam = res.Data.EntityAccess.includes('EditPolicy')
        this.activeTabIndex == 0 ? this.gridOptionParam.columnDefs.EntityAttribute.EntityName = 'SalaryTbl' : this.gridOptionParam.columnDefs.EntityAttribute.EntityName = 'SalaryDetailPay_Tbl'
        this.formObjParam = res.Data.EntityAttribute
        return resolve(true)
      })
    })
  }

  getSelectParam() {
    return new Promise(resolve => {
      this.showGridParam = false
      this.service.get(this.paramGridUrlGetSelect).subscribe((res: any) => {
        this.gridOptionParam.rowData = res.Data
        this.showGridParam = true
        return resolve(true)
      })
    })
  }

  gridOptionMashmool = <CustomGridOption>{ controllerName: Controller }

  modalOptions = {
    //formType: this.formType,
    modatTitle: 'مشمول',
    //saveCallback: this.save.bind(this),
    hideCallback: this.closeModalMashmool.bind(this),
    maxWidth: 1000
  }

  closeModalMashmool() {
    this.showModalMashmool = false
  }

  showModalMashmool: boolean = false
  async rowClickedParam(event) {
    if (this.isManual) return
    await this.getAttrMashmool()
    this.getSelectPayMashmool(event.data.OldSID, event.data.NewSID)
  }

  async rowClickedFraction(event) {
    if (this.isManual) return
    await this.getAttrMashmool()
    this.getSelectFractionMashmool(event.data.OldSID, event.data.NewSID)
  }

  getAttrMashmool() {
    return new Promise(resolve => {
      let Attr = BackPayMashmoolAttr()
      if (!Attr) {
        this.service.get(`${Controller}/GetBackPayHokmParamSelectAttribute`).subscribe((res: any) => {
          this.setAttrMashmool(res.Data, 'toLocal')
          return resolve(true)
        })
      }
      else {
        this.setAttrMashmool(Attr)
        return resolve(true)
      }
    })
  }

  setAttrMashmool(attr, type?) {
    this.gridOptionMashmool.columnDefs = attr
    type == 'toLocal' ? setBackPayMashmoolAttr(attr) : null
  }

  getSelectFractionMashmool(oldVal, newVal) {
    this.showModalMashmool = false
    this.service.get(`${Controller}/GetSelectDetailFractionMashmool/${oldVal}/${newVal}`).subscribe((res: any) => {
      this.gridOptionMashmool.rowData = res.Data
      this.showModalMashmool = true
    })
  }

  getSelectPayMashmool(oldVal, newVal) {
    this.showModalMashmool = false
    this.service.get(`${Controller}/GetSelectDetailPayMashmool/${oldVal}/${newVal}`).subscribe((res: any) => {
      this.gridOptionMashmool.rowData = res.Data
      this.showModalMashmool = true
    })
  }

  activeTabIndex: number = 0
  changeTab(i) {
    this.showGridParam = false
    this.showGridFraction = false
    this.showGridWorkAdding = false
    this.activeTabIndex = i
    switch (i) {
      case 0:
        this.gridOptionParam.controllerName = `${Controller}/GetMiniLogParam`
        this.comboChange(this.paramTypeId, 'param')
        break
      case 1:
        this.gridOptionParam.controllerName = `${Controller}/GetMiniLogWorkAdding`
        this.comboChange(this.workAddingTypeId, 'workaddingtype')
        break
      case 2:
        this.gridOptionParam.controllerName = `${Controller}/GetMiniLogWorkAdding`
        this.comboChange(this.workAddingId, 'workadding')
        break
    }
  }

  comboAray = [{ Id: 1, CodeDesc_Fld: 'جاری' }, { Id: 2, CodeDesc_Fld: 'خزانه' }, { Id: 3, CodeDesc_Fld: 'کلی' }]

  submitedParam(newData) {
    this.closeFormParam()
    this.showGridParam = false
    if (!this.IsMultiple) this.gridOptionParam.rowData = newData
    setTimeout(() => this.showGridParam = true)
    this.doneParam.emit(this.gridOptionParam.rowData)
  }

  closeFormParam() {
    this.showFormParam = false
    this.formType = ''
  }

  submitedWorkAdding(newData) {
    this.closeFormParamWorkAdding()
    this.showGridWorkAdding = false
    if (!this.IsMultiple) this.gridOptionParam.rowData = newData
    setTimeout(() => this.showGridWorkAdding = true)
    this.doneWorkAdding.emit(this.gridOptionParam.rowData)
  }

  closeFormParamWorkAdding() {
    this.showFormParamWorkAdding = false
    this.formType = ''
  }

  submitedFraction(newData) {
    this.closeFormFraction()
    this.showGridFraction = false
    if (!this.IsMultiple) this.gridOptionFraction.rowData = newData
    setTimeout(() => this.showGridFraction = true)
    this.doneFraction.emit(this.gridOptionFraction.rowData)
  }

  closeFormFraction() {
    this.showFormFraction = false
    this.formType = ''
  }

  editAllParams() {
    this.activeTabIndex == 0 ? this.showFormParam = true : this.showFormParamWorkAdding = true
    this.data = this.gridOptionParam.rowData
    this.formType = 'Edit'
    this.showFormParam = true
  }

  editAllFraction() {
    this.data = this.gridOptionFraction.rowData
    this.formType = 'Edit'
    this.showFormFraction = true
  }

  constructor(private service: GridFormService, private loader: LoaderService) { }

  isManual: boolean = false
  async ngOnChanges(UpdatedValue: string) {
    this.backPayType == 100203 ? this.isManual = true : this.isManual = false
    if (this.isManual) {
      this.gridOptionParam.actions = [{ label: 'Edit', callback: this.editParam.bind(this) }]
      this.gridOptionFraction.actions = [{ label: 'Edit', callback: this.editFraction.bind(this) }]
    }
    else {
      this.gridOptionParam.actions = null
      this.gridOptionFraction.actions = null
    }
    this.showTab = false
    this.showGridFraction = false
    this.showGridParam = false
    this.showGridWorkAdding = false
    setTimeout(() => {
      this.showTab = true
      this.comboChange(this.paramTypeId, 'param')
    })
  }

}