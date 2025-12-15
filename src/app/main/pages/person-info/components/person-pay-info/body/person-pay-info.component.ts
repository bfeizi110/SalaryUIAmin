import { Component, ViewChild } from '@angular/core'
import { Router } from '@angular/router'
import {UntypedFormControl} from '@angular/forms';
import { ContextMenuService } from 'src/app/main/main-body/common/context-menu.service'
import { CustomGridOption } from 'src/app/main/main-body/common/custom-ag-grid/interfaces/ag-grid-option.interface'
import { GridFormService } from 'src/app/main/main-body/common/grid-form.service'
import { PersonPayInfoAttr, PersonPayInfoDetailFractionAttr, PersonPayInfoDetailPayAttr, PersonTaxTadilDetailAttr, setPersonPayInfoAttr, setPersonPayInfoDetailFractionAttr, setPersonPayInfoDetailPayAttr, setPersonTaxTadilDetailAttr } from 'src/app/main/pages/global-attr'

@Component({
  templateUrl: './person-pay-info.component.html',
  styleUrls: ['./person-pay-info.component.scss']
})

export class PersonPayInfoComponent {
  
  toppings = new UntypedFormControl();
  toppingsAll = new UntypedFormControl();
  toppingsTadilAll = new UntypedFormControl();

  showSelectPerson: boolean = false
  filterDto: any
  showGrid: boolean = false
  showGridSelectAll: boolean = false
  showGridTadilSelectAll: boolean = false
  showGridTadilSelectDetail: boolean = false
  urlSelectDetail: string = ''
  setPID: number
  selectedPersonelNF: any
  personData = []
  comboAray = [{ Id: 100321, CodeDesc_Fld: 'جاری' }, { Id: 100322, CodeDesc_Fld: 'خزانه-عمومی' }, { Id: 100324, CodeDesc_Fld: 'خزانه-اختصاصی' }, { Id: 100323, CodeDesc_Fld: 'کلی' }]
  comboMonth = []
  formObj: any
  formObjPay: any
  formObjFraction: any
  formObjTadilDetail: any
  showDetailGridPayAll: boolean = false
  selectedTab: number = 0

  async onFilter(dto) {
    dto.HaveDataThisYear = true
    dto.IsBaz = true
    dto.IsMov = true
    dto.IsTadris = true
    this.showGrid = false
    !this.formObj ? await this.getAttr() : null
    !this.formObjFraction ? await this.getAttrFraction() : null
    !this.formObjPay ? await this.getAttrPay() : null
    !this.formObjTadilDetail ? await this.getAttrTadilDetail() : null
    this.service.post(`Person/GetFilterSelect`, dto).subscribe((res: any) => {
      this.filterDto = dto
      if (this.selectedTab == 1)
      {
        this.MonthIDSelectAll = this.toppingsAll.value && this.toppingsAll.value.toString();
        this.filterDto.MonthHgh = this.MonthIDSelectAll == undefined || !this.MonthIDSelectAll ? 0 : this.MonthIDSelectAll
      }
      if (this.selectedTab == 2)
      {
        this.MonthIDSelectAll = this.toppingsTadilAll.value && this.toppingsTadilAll.value.toString();
        this.filterDto.MonthHgh = this.MonthIDSelectAll == undefined || !this.MonthIDSelectAll ? 0 : this.MonthIDSelectAll
      }
      this.personData = res.Data
      this.showSelectPerson = true
      let id = this.contextMenuService.id
      if (id) {
        this.setPID = id
        this.onSelectPersonnel(id)
      }
    })
  }
  CatType: number = 100323
  CatTypeSelectAll: number = 100323
  MonthID: string 
  MonthIDSelectAll:string 
  comboChangeMonth(event){
    if (!event)
    {
      this.MonthID = this.toppings.value && this.toppings.value.toString();
      this.getSelect()
    }
  }

  selectedTadilRow(event){
    if (event)
    {
      this.showGridTadilSelectDetail = false
      this.service.get(`${this.controller}/GetSelectTadilDetail/${event}`).subscribe((res: any) => {
        this.gridOptionTadilDetail.rowData = res.Data
        setTimeout(() => {
          this.showGridTadilSelectDetail = true
          // this.service.scrollToElement('person-saving-tab')
        }, 200); 
      })
    }
  }
  comboChangeMonthSelectAll(event){
    if (!event)
    {
      this.filterDto.PersonID = ""
      this.MonthIDSelectAll = this.toppingsAll.value && this.toppingsAll.value.toString();
      this.showGridSelectAll = false
      this.filterDto.MonthHgh = this.MonthIDSelectAll == undefined || !this.MonthIDSelectAll ? 0 : this.MonthIDSelectAll
      setTimeout(() => {
        this.showGridSelectAll = true
      }, 200);
    }
  }

  comboChangeMonthTadilSelectAll(event){
    if (!event)
    {
      this.filterDto.PersonID = ""
      this.MonthIDSelectAll = this.toppingsTadilAll.value && this.toppingsTadilAll.value.toString();
      this.showGridTadilSelectAll = false
      this.filterDto.MonthHgh = this.MonthIDSelectAll == undefined || !this.MonthIDSelectAll ? 0 : this.MonthIDSelectAll
      setTimeout(() => {
        this.showGridTadilSelectAll = true
      }, 200);
    }
  }

  comboChangeCat(event){
    this.CatType = event
    this.getSelect()
  }

  comboChangeCatSelectAll(event){
    this.filterDto.PersonID = ""
    this.showGridSelectAll = false
    this.CatTypeSelectAll = event
    this.MonthIDSelectAll = this.toppingsAll.value && this.toppingsAll.value.toString();
    this.filterDto.MonthHgh = this.MonthIDSelectAll == undefined || !this.MonthIDSelectAll ? 0 : this.MonthIDSelectAll
    this.filterDto.TaminBaseID = this.CatTypeSelectAll == undefined || !this.CatTypeSelectAll ? 100323 : this.CatTypeSelectAll
    setTimeout(() => {
      this.showGridSelectAll = true
    }, 200);
  }

  PID: number
  async onSelectPersonnel(id) {
    this.PID = id
    this.getSelect()
    this.showGrid = false
  }

  onSelectPersonnelDetail(id) {
    this.PID = id
    this.ID = null
    this.getSelect()
    this.showForm = false
  }

  showForm: boolean = false
  gridOption = <CustomGridOption>{
    rowClicked: this.view.bind(this)
  }
  gridOptionPay = <CustomGridOption>{
  }
  gridOptionFraction = <CustomGridOption>{
  }
  gridOptionTadilDetail = <CustomGridOption>{
  }

  getAttr() {
    return new Promise(resolve => {
      if (!PersonPayInfoAttr) {
        this.showGrid = false
        this.service.getAttr(this.controller).subscribe((res: any) => {
          this.setAttr(res.Data, 'toLocal')
          return resolve(true)
        })
      }
      else {
        this.setAttr(PersonPayInfoAttr)
        return resolve(true)
      }
    })
  }

  getAttrPay() {
    return new Promise(resolve => {
      if (!PersonPayInfoDetailPayAttr) {
        this.showDetailGridPay = false
        this.service.get(this.controller + `/GetAttributeSelectPay`).subscribe((res: any) => {
          this.setPayAttr(res.Data, 'toLocal')
          return resolve(true)
        })
      }
      else {
        this.setPayAttr(PersonPayInfoDetailPayAttr)
        return resolve(true)
      }
    })
  }

  getAttrTadilDetail() {
    return new Promise(resolve => {
      if (!PersonTaxTadilDetailAttr) {
        this.showGridTadilSelectDetail = false
        this.service.get(this.controller + `/GetAttributeSelectTadilDetail`).subscribe((res: any) => {
          this.setTadilDetailAttr(res.Data, 'toLocal')
          return resolve(true)
        })
      }
      else {
        this.setTadilDetailAttr(PersonTaxTadilDetailAttr)
        return resolve(true)
      }
    })
  }

  setTadilDetailAttr(attr, type?) {
    this.gridOptionTadilDetail.columnDefs = attr
    this.formObjTadilDetail = attr.EntityAttribute

    type == 'toLocal' ? setPersonTaxTadilDetailAttr(attr) : null
  }

  getAttrFraction() {
    return new Promise(resolve => {
      if (!PersonPayInfoDetailFractionAttr) {
        this.showDetailGridFraction = false
        this.service.get(this.controller + `/GetAttributeSelectFraction`).subscribe((res: any) => {
          this.setFractionAttr(res.Data, 'toLocal')
          return resolve(true)
        })
      }
      else {
        this.setFractionAttr(PersonPayInfoDetailFractionAttr)
        return resolve(true)
      }
    })
  }

  canEdit: boolean = false
  canDelete: boolean = false
  canAdd: boolean = false
  setAttr(attr, type?) {
    this.gridOption.columnDefs = attr
    this.formObj = attr.EntityAttribute

    this.canEdit = false
    this.canDelete = false
    this.canAdd = false

    type == 'toLocal' ? setPersonPayInfoAttr(attr) : null
  }

  setPayAttr(attr, type?) {
    this.gridOptionPay.columnDefs = attr
    this.formObjPay = attr.EntityAttribute

    type == 'toLocal' ? setPersonPayInfoDetailPayAttr(attr) : null
  }

  setFractionAttr(attr, type?) {
    this.gridOptionFraction.columnDefs = attr
    this.formObjFraction = attr.EntityAttribute

    type == 'toLocal' ? setPersonPayInfoDetailFractionAttr(attr) : null
  }

  getSelect() {
    this.showDetailGridPay = false
    this.showDetailGridFraction = false
    this.showGrid = false
    this.filterDto.PersonID = this.PID
    this.filterDto.MonthHgh = this.MonthID == undefined || !this.MonthID ? 0 : this.MonthID
    this.filterDto.TaminBaseID = this.CatType == undefined || !this.CatType ? 100323 : this.CatType
    this.service.post(this.controller + '/GetSelect', this.filterDto).subscribe((res: any) => {
      this.gridOption.rowData = res.Data
      this.showGrid = true
      setTimeout(() => {
        this.service.scrollToElement('person-pay-info-tab')
      }, 200); 
    })
  }

  ID
  showDetailGridPay: boolean = false
  showDetailGridFraction: boolean = false
  view(event) {
    this.showDetailGridPay = false
    this.showDetailGridFraction = false
    this.ID = event.data.Id

    this.service.get(this.controller + `/GetSelectPay/${this.ID}/${this.CatType}`).subscribe((res: any) => {
      this.gridOptionPay.rowData = res.Data
      this.showDetailGridPay = true
      setTimeout(() => {
      }, 200); 
    })

    this.service.get(this.controller + `/GetSelectFraction/${this.ID}/${this.CatType}`).subscribe((res: any) => {
      this.gridOptionFraction.rowData = res.Data
      this.showDetailGridFraction = true
      setTimeout(() => {
        this.service.scrollToElement('person-pay-fraction')
      }, 200); 
    })
  }

  showGeneralPerson: boolean = true
  closeForm(event) {
    this.selectedTab = event.index
    if (event.index == 1)
    {
      this.showGridSelectAll = false
      this.filterDto.PersonID = ""
      this.MonthIDSelectAll = this.toppingsAll.value && this.toppingsAll.value.toString();
      this.filterDto.MonthHgh = this.MonthIDSelectAll == undefined || !this.MonthIDSelectAll ? 0 : this.MonthIDSelectAll
      setTimeout(() => {
        this.showGridSelectAll = true
      }, 200);
    }
    if (event.index == 2)
    {
      this.showGridTadilSelectAll = false
      this.filterDto.PersonID = ""
      this.MonthIDSelectAll = this.toppingsTadilAll.value && this.toppingsTadilAll.value.toString();
      this.filterDto.MonthHgh = this.MonthIDSelectAll == undefined || !this.MonthIDSelectAll ? 0 : this.MonthIDSelectAll
      setTimeout(() => {
        this.showGridTadilSelectAll = true
      }, 200);
    }
    this.showForm = false
  }

  pathUrl: string
  controller: string
  constructor(private service: GridFormService, private contextMenuService: ContextMenuService, router: Router) {
    this.pathUrl = router.url
    this.controller = 'PersonPayInfo'
    this.gridOption.controllerName = this.controller
    this.gridOptionPay.controllerName = this.controller
    this.gridOptionFraction.controllerName = this.controller
    this.gridOptionTadilDetail.controllerName = this.controller
    this.service.get(`YearMonth/GetMonth/0`).subscribe((res: any) => {
      this.comboMonth = res.Data
    })

  }

}
