import { BackInsureAllAttr, PersonPayInfoAttr, PersonTaxTadilAttr, PersonTaxTadilDetailAttr, setHghWitnessFilesAttr, setPersonHghWitnessAllAttr, setPersonTaxTadilAttr, setPersonTaxTadilDetailAttr } from 'src/app/main/pages/global-attr';
import { Component, EventEmitter, Input, Output } from '@angular/core'
import { ToastrService } from 'ngx-toastr'
import { AlertClass } from 'src/app/main/main-body/common/alert/alert-functions'
import { CustomGridOption } from 'src/app/main/main-body/common/custom-ag-grid/interfaces/ag-grid-option.interface'
import { GridFormService } from 'src/app/main/main-body/common/grid-form.service'
import { TadrisAllAttr, setTadrisAllAttr, PersoInsureInfoAllAttr, PersonDebtInfoAllAttr, setPersoInsureInfoAllAttr, setPersonDebtInfoAllAttr, PersonSavingInfoAllAttr, setPersonSavingInfoAllAttr, PersonMostamarInfoAllAttr, setPersonMostamarInfoAllAttr, 
  PersonMissionInfoAllAttr, setPersonMissionInfoAllAttr, setPersonCaseInfoAllAttr, PersonCaseInfoAllAttr, SemiBackPayAllAttr, setSemiBackPayAllAttr, setHistoryChildAllAttr, setPersonPayInfoAttr, PersonHghWitnessAllAttr, setBackInsureAllAttr } from '../../../../global-attr'

@Component({
  selector: 'general-person-info',
  templateUrl: './general-person-info.component.html',
  styleUrls: ['./general-person-info.component.scss']
})
export class GeneralPersonInfoComponent /* implements OnInit */ {

  @Input() type: 'PersonDebtInfo' | 'PersonDebtInfoBaz' | 'PersonInsureInfo' | 'PersonInsureInfoBaz' 
  | 'PersonInsureInfoTadris' | 'PersonSavingInfo' | 'PersonSavingInfoBaz' | 'PersonMostamar' 
  | 'PersonMostamarBaz' | 'PersonMissionInfo' | 'PersonCaseInfo' | 'BackpayDetail' | 'PersonMov' 
  | 'HistoryChild' | 'HistoryChildBaz' | 'PersonHghWitness' | 'Tadris' | 'BackPayInsure' | 'PersonPayInfo' | 'PersonTaxTadil' | 'PersonTaxTadilDetail'
  @Input() filterData: any
  @Input() SelectUrl: string = ''
  @Input() attrUrl: string = ''
  @Input() calEdit: boolean
  @Input() canDelete: boolean
  @Input() rowNumber: number = 30
  @Input() selectType: number = 0 /* 0 = Post 1 = Get*/ 
  @Output() edited = new EventEmitter()
  @Output() rSelected = new EventEmitter()

  showGrid: boolean = false
  gridOption = <CustomGridOption>{ checkboxSelection: true , rowSelected: this.rowSelected.bind(this), rowClicked: this.rowClicked.bind(this) }

  selectedItemList = []
  rowSelected(event) { 
    if (this.gridOption.checkboxSelection)
      this.selectedItemList.includes(event.data.Id) ? this.selectedItemList = this.selectedItemList.filter(a => a != event.data.Id) : this.selectedItemList.push(event.data.Id) 
  }
  rowClicked(event){
    if (!this.gridOption.checkboxSelection)
      this.rSelected.emit(event.data.Id)
  }

  formObj: any
  getAttr() {
    this.showGrid = false
    switch (this.type) {
      case 'PersonDebtInfo':
        this.getAttrDebt()
        break
      case 'PersonDebtInfoBaz':
        this.getAttrDebt()
        break
      case 'PersonInsureInfo':
        this.getAttrInsure()
        break
      case 'PersonInsureInfoBaz':
        this.getAttrInsure()
        break
      case 'PersonInsureInfoTadris':
        this.getAttrInsure()
        break
      case 'PersonSavingInfo':
        this.getAttrSaving()
        break
      case 'PersonSavingInfoBaz':
        this.getAttrSaving()
        break
      case 'PersonMostamar':
        this.getAttrMostamar()
        break
      case 'PersonMostamarBaz':
        this.getAttrMostamar()
        break
      case 'PersonMissionInfo':
        this.getAttrMission()
        break
      case 'PersonCaseInfo':
        this.getAttrCase()
        break
      case 'BackpayDetail':
        this.getAttrBackPaySemi()
        break
      case 'PersonMov':
        this.getAttrPersonMov()
        break
      case 'HistoryChild':
        this.getAttrHistoryChild()
        break
      case 'HistoryChildBaz':
        this.getAttrHistoryChild()
        break
      case 'PersonHghWitness':
        this.getAttrPersonHghWitness()
        break
      case 'Tadris':
        this.getAttrTadris()
        break
      case 'BackPayInsure':
        this.getAttrBackInsure()
        break
      case 'PersonPayInfo':
        this.getAttrPersonPayInfo()
        break
      case 'PersonTaxTadil':
        this.getAttrPersonTaxTadil()
        break
      case 'PersonTaxTadilDetail':
        this.getAttrPersonTaxTadilDetail()
        break
    }
  }

  getAttrTadris() {
    let Attr = TadrisAllAttr()
    !Attr
      ? this.service.get(this.attrUrl).subscribe((res: any) => this.setAttrTadris(res.Data, 'toLocal'))
      : this.setAttrTadris(Attr)
  }

  getAttrDebt() {
    !PersonDebtInfoAllAttr
      ? this.service.get(this.attrUrl).subscribe((res: any) => this.setAttrDebt(res.Data, 'toLocal'))
      : this.setAttrDebt(PersonDebtInfoAllAttr)
  }

  getAttrInsure() {
    !PersoInsureInfoAllAttr
      ? this.service.get(this.attrUrl).subscribe((res: any) => this.setAttrInsure(res.Data, 'toLocal'))
      : this.setAttrInsure(PersoInsureInfoAllAttr)
  }

  getAttrSaving() {
    !PersonSavingInfoAllAttr
      ? this.service.get(this.attrUrl).subscribe((res: any) => this.setAttrSaving(res.Data, 'toLocal'))
      : this.setAttrSaving(PersonSavingInfoAllAttr)
  }

  getAttrMostamar() {
    !PersonMostamarInfoAllAttr
      ? this.service.get(this.attrUrl).subscribe((res: any) => this.setAttrMostamar(res.Data, 'toLocal'))
      : this.setAttrMostamar(PersonMostamarInfoAllAttr)
  }

  getAttrMission() {
    !PersonMissionInfoAllAttr
      ? this.service.get(this.attrUrl).subscribe((res: any) => this.setAttrMission(res.Data, 'toLocal'))
      : this.setAttrMission(PersonMissionInfoAllAttr)
  }

  getAttrCase() {
    let Attr = PersonCaseInfoAllAttr()
    !Attr
      ? this.service.get(this.attrUrl).subscribe((res: any) => this.setAttrCase(res.Data, 'toLocal'))
      : this.setAttrCase(Attr)
  }

  getAttrBackInsure() {
    let Attr = BackInsureAllAttr()
    !Attr
      ? this.service.get(this.attrUrl).subscribe((res: any) => this.setAttrBackInsureAll(res.Data, 'toLocal'))
      : this.setAttrBackInsureAll(Attr)
  }

  getAttrPersonPayInfo() {
    !PersonPayInfoAttr
      ? this.service.get(`${this.type}/GetAttribute`).subscribe((res: any) => this.setAttrPersonPayInfo(res.Data, 'toLocal'))
      : this.setAttrPersonPayInfo(PersonPayInfoAttr)
  }

  getAttrPersonTaxTadil() {
    !PersonTaxTadilAttr
      ? this.service.get(this.attrUrl).subscribe((res: any) => this.setAttrPersonTaxTadil(res.Data, 'toLocal'))
      : this.setAttrPersonTaxTadil(PersonTaxTadilAttr)
  }

  getAttrPersonTaxTadilDetail() {
    !PersonTaxTadilDetailAttr
      ? this.service.get(this.attrUrl).subscribe((res: any) => this.setAttrPersonTaxTadilDetail(res.Data, 'toLocal'))
      : this.setAttrPersonPayInfo(PersonTaxTadilDetailAttr)
  }

  getAttrBackPaySemi() {
    !SemiBackPayAllAttr
      ? this.service.get(this.attrUrl).subscribe((res: any) => this.setAttrBackPaySemi(res.Data, 'toLocal'))
      : this.setAttrBackPaySemi(SemiBackPayAllAttr)
  }

  getAttrPersonMov() {
    this.service.getAttr('Person').subscribe((res: any) => {
      this.gridOption.columnDefs = res.Data
      this.formObj = res.Data.EntityAttribute
      this.getSelect()
    })
  }

  getAttrHistoryChild() {
    this.service.get(this.attrUrl).subscribe((res: any) => {
      this.gridOption.columnDefs = res.Data
      this.formObj = res.Data.EntityAttribute
      this.getSelect()
    })
  }

  getAttrPersonHghWitness() {
    let Attr = PersonHghWitnessAllAttr()
    !Attr
      ? this.service.get(this.attrUrl).subscribe((res: any) => this.setAttrCase(res.Data, 'toLocal'))
      : this.setAttrPersonHghWitness(Attr)
  }

  setAttrPersonHghWitness(attr, type?) {
    this.gridOption.columnDefs = attr
    this.formObj = attr.EntityAttribute
    type == 'toLocal' ? setPersonHghWitnessAllAttr(attr) : null
    this.getSelect()
  }

  setAttrPersonPayInfo(attr, type?) {
    this.gridOption.columnDefs = attr
    this.formObj = attr.EntityAttribute
    type == 'toLocal' ? setPersonPayInfoAttr(attr) : null
    this.getSelect()
  }

  setAttrPersonTaxTadil(attr, type?) {
    this.gridOption.columnDefs = attr
    this.formObj = attr.EntityAttribute
    type == 'toLocal' ? setPersonTaxTadilAttr(attr) : null
    this.getSelect()
  }

  setAttrPersonTaxTadilDetail(attr, type?) {
    this.gridOption.columnDefs = attr
    this.formObj = attr.EntityAttribute
    type == 'toLocal' ? setPersonTaxTadilDetailAttr(attr) : null
    this.getSelect()
  }

  setAttrTadris(attr, type?) {
    this.gridOption.columnDefs = attr
    this.formObj = attr.EntityAttribute
    type == 'toLocal' ? setTadrisAllAttr(attr) : null
    this.getSelect()
  }  
  setAttrDebt(attr, type?) {
    this.gridOption.columnDefs = attr
    this.formObj = attr.EntityAttribute
    type == 'toLocal' ? setPersonDebtInfoAllAttr(attr) : null
    this.getSelect()
  }

  setAttrInsure(attr, type?) {
    this.gridOption.columnDefs = attr
    this.formObj = attr.EntityAttribute
    type == 'toLocal' ? setPersoInsureInfoAllAttr(attr) : null
    this.getSelect()
  }

  setAttrSaving(attr, type?) {
    this.gridOption.columnDefs = attr
    this.formObj = attr.EntityAttribute
    type == 'toLocal' ? setPersonSavingInfoAllAttr(attr) : null
    this.getSelect()
  }

  setAttrMostamar(attr, type?) {
    this.gridOption.columnDefs = attr
    this.formObj = attr.EntityAttribute
    type == 'toLocal' ? setPersonMostamarInfoAllAttr(attr) : null
    this.getSelect()
  }

  setAttrMission(attr, type?) {
    this.gridOption.columnDefs = attr
    this.formObj = attr.EntityAttribute
    type == 'toLocal' ? setPersonMissionInfoAllAttr(attr) : null
    this.getSelect()
  }

  setAttrCase(attr, type?) {
    this.gridOption.columnDefs = attr
    this.formObj = attr.EntityAttribute
    type == 'toLocal' ? setPersonCaseInfoAllAttr(attr) : null
    this.getSelect()
  }

  setAttrBackPaySemi(attr, type?) {
    this.gridOption.columnDefs = attr
    this.formObj = attr.EntityAttribute
    type == 'toLocal' ? setSemiBackPayAllAttr(attr) : null
    this.getSelect()
  }

  setAttrBackInsureAll(attr, type?) {
    this.gridOption.columnDefs = attr
    this.formObj = attr.EntityAttribute
    type == 'toLocal' ? setBackInsureAllAttr(attr) : null
    this.getSelect()
  }
  setAttrHistoryChild(attr, type?) {
    this.gridOption.columnDefs = attr
    this.formObj = attr.EntityAttribute
    type == 'toLocal' ? setHistoryChildAllAttr(attr) : null
    this.getSelect()
  }

  getSelect() {
    this.selectedItemList = []
    this.showGrid = false
    if (this.selectType == 0)
      this.service.post(this.SelectUrl == null || this.SelectUrl == '' ? `${this.type}/GetSelectAll` : this.SelectUrl, this.filterData).subscribe((res: any) => {
        this.gridOption.rowData = res.Data
        this.showGrid = true
      })
    else
      this.service.get(this.SelectUrl == null || this.SelectUrl == '' ? `${this.type}/GetSelectAll` : this.SelectUrl).subscribe((res: any) => {
        this.gridOption.rowData = res.Data
        this.showGrid = true
      })
  }

  delete() {
    if (!this.canDelete) this.toastr.error('شما به حذف این بخش دسترسی ندارید', 'خطا')
    AlertClass.deleteAlert(_ => this.service.deleteByBody(`${this.type}/DeleteAll`, { IDCollect_Fld: this.selectedItemList.toString() }).subscribe(_ => this.getSelect()))
  }

  edit() {
    if (!this.calEdit) this.toastr.error('شما به ویرایش این بخش دسترسی ندارید', 'خطا')
    this.edited.emit(this.selectedItemList)
  }

  constructor(private service: GridFormService, private toastr: ToastrService) { }

  ngOnChanges(): void {
    this.attrUrl = this.attrUrl == null || this.attrUrl == '' ? `${this.type}/GetAttributeSelectAll` : this.attrUrl
    this.gridOption.checkboxSelection =  this.canDelete || this.calEdit ? true : false
    this.getAttr()
  }

}
