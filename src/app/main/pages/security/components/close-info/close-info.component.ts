import { Component, OnInit } from '@angular/core'
import { CustomGridOption } from 'src/app/main/main-body/common/custom-ag-grid/interfaces/ag-grid-option.interface'
import { GridFormService } from 'src/app/main/main-body/common/grid-form.service'
import { CloseInfoAttr, CloseInfoCostCenterAttr, setCloseInfoAttr, setCloseInfoCostCenterAttr } from '../../../global-attr'

const Controller = 'CloseInfo'

@Component({
  templateUrl: './close-info.component.html',
  styleUrls: ['./close-info.component.scss']
})
export class CloseInfoComponent implements OnInit {

  comboList = []
  clickCombo() { this.comboList.length == 0 ? this.service.get(`${Controller}/GetComboGroupCode`).subscribe((res: any) => this.comboList = res.Data) : null }

  refreshCombo() {
    this.comboList = []
    this.clickCombo()
  }

  comboId: number
  showGrids: boolean
  async comboChange(id) {
    this.showGrids = false
    this.comboId = id
    await this.getAttr()
    await this.getAttrCostCenter()
    await this.getSelects()
    this.showGrids = true
  }

  gridOptionTypeNotIn = <CustomGridOption>{ checkboxSelection: true, rowSelected: this.rowSelectedTypeNotIn.bind(this) }
  gridOptionTypeIn = <CustomGridOption>{ checkboxSelection: true, rowSelected: this.rowSelectedTypeIn.bind(this) }
  gridOptionCostCenterNotIn = <CustomGridOption>{ checkboxSelection: true, rowSelected: this.rowSelectedCostCenterNotIn.bind(this) }
  gridOptionCostCenterIn = <CustomGridOption>{ checkboxSelection: true, rowSelected: this.rowSelectedCostCenterIn.bind(this) }
  gridOptionPayProgramNotIn = <CustomGridOption>{ checkboxSelection: true, rowSelected: this.rowSelectedPayProgramNotIn.bind(this) }
  gridOptionPayProgramIn = <CustomGridOption>{ checkboxSelection: true, rowSelected: this.rowSelectedPayProgramIn.bind(this) }

  formObj: any
  getAttr() {
    return new Promise(resolve => {
      let Attr = CloseInfoAttr()
      if (!Attr)
        this.service.get(`${Controller}/GetCloseInfoDetailElseAttribute`).subscribe((res: any) => {
          this.setAttr(res.Data, 'toLocal')
          return resolve(true)
        })
      else {
        this.setAttr(CloseInfoAttr)
        return resolve(true)
      }
    })
  }

  setAttr(attr, type?) {
    this.gridOptionPayProgramNotIn.columnDefs = attr
    this.gridOptionPayProgramIn.columnDefs = attr
    this.gridOptionTypeNotIn.columnDefs = attr
    this.gridOptionTypeIn.columnDefs = attr
    this.formObj = attr.EntityAttribute
    type == 'toLocal' ? setCloseInfoAttr(attr) : null
  }

  formObjCostCenter: any
  getAttrCostCenter() {
    return new Promise(resolve => {
      let Attr = CloseInfoCostCenterAttr()
      if (!Attr)
        this.service.get(`${Controller}/GetCloseInfoDetailCostCenterAttribute`).subscribe((res: any) => {
          this.setAttrCostCenter(res.Data, 'toLocal')
          return resolve(true)
        })
      else {
        this.setAttrCostCenter(Attr)
        return resolve(true)
      }
    })
  }

  setAttrCostCenter(attr, type?) {
    this.gridOptionCostCenterNotIn.columnDefs = attr
    this.gridOptionCostCenterIn.columnDefs = attr
    this.formObjCostCenter = attr.EntityAttribute
    type == 'toLocal' ? setCloseInfoCostCenterAttr(attr) : null
  }

  async getSelects() {
    await this.getSelectType()
    await this.getSelectCostCenter()
    await this.getSelectPayProgram()
  }

  showGridType: boolean = false
  async getSelectType() {
    this.rowSelectedTypeInList = []
    this.rowSelectedTypeNotInList = []
    this.showGridType = false
    await this.getSelectTypeNotIn()
    await this.getSelectTypeIn()
    this.showGridType = true
  }

  showGridCostCenter: boolean = false
  async getSelectCostCenter() {
    this.rowSelectedCostCenterInList = []
    this.rowSelectedCostCenterNotInList = []
    this.showGridCostCenter = false
    await this.getSelectCostCenterNotIn()
    await this.getSelectCostCenterIn()
    this.showGridCostCenter = true
  }

  showGridPayProgram: boolean = false
  async getSelectPayProgram() {
    this.rowSelectedPayProgramInList = []
    this.rowSelectedPayProgramNotInList = []
    this.showGridPayProgram = false
    await this.getSelectPayProgramNotIn()
    await this.getSelectPayProgramIn()
    this.showGridPayProgram = true
  }

  getSelectTypeNotIn() {
    return new Promise(resolve => {
      this.service.get(`${Controller}/GetNotInCloseInfoElse/${this.comboId}/100477`).subscribe((res: any) => {
        this.gridOptionTypeNotIn.rowData = res.Data
        return resolve(true)
      })
    })
  }

  getSelectTypeIn() {
    return new Promise(resolve => {
      this.service.get(`${Controller}/GetInCloseInfoElse/${this.comboId}/100477`).subscribe((res: any) => {
        this.gridOptionTypeIn.rowData = res.Data
        return resolve(true)
      })
    })
  }

  getSelectCostCenterNotIn() {
    return new Promise(resolve => {
      this.service.get(`${Controller}/GetNotInCloseInfoCostCenter/${this.comboId}`).subscribe((res: any) => {
        this.gridOptionCostCenterNotIn.rowData = res.Data
        return resolve(true)
      })
    })
  }

  getSelectCostCenterIn() {
    return new Promise(resolve => {
      this.service.get(`${Controller}/GetInCloseInfoCostCenter/${this.comboId}`).subscribe((res: any) => {
        this.gridOptionCostCenterIn.rowData = res.Data
        return resolve(true)
      })
    })
  }

  getSelectPayProgramNotIn() {
    return new Promise(resolve => {
      this.service.get(`${Controller}/GetNotInCloseInfoElse/${this.comboId}/100473`).subscribe((res: any) => {
        this.gridOptionPayProgramNotIn.rowData = res.Data
        return resolve(true)
      })
    })
  }

  getSelectPayProgramIn() {
    return new Promise(resolve => {
      this.service.get(`${Controller}/GetInCloseInfoElse/${this.comboId}/100473`).subscribe((res: any) => {
        this.gridOptionPayProgramIn.rowData = res.Data
        return resolve(true)
      })
    })
  }

  rowSelectedTypeNotInList = []
  rowSelectedTypeNotIn(event) { this.rowSelectedTypeNotInList.includes(event.data.Id) ? this.rowSelectedTypeNotInList = this.rowSelectedTypeNotInList.filter(a => a != event.data.Id) : this.rowSelectedTypeNotInList.push(event.data.Id) }

  rowSelectedTypeInList = []
  rowSelectedTypeIn(event) { this.rowSelectedTypeInList.includes(event.data.Id) ? this.rowSelectedTypeInList = this.rowSelectedTypeInList.filter(a => a != event.data.Id) : this.rowSelectedTypeInList.push(event.data.Id) }

  rowSelectedCostCenterNotInList = []
  rowSelectedCostCenterNotIn(event) { this.rowSelectedCostCenterNotInList.includes(event.data.Id) ? this.rowSelectedCostCenterNotInList = this.rowSelectedCostCenterNotInList.filter(a => a != event.data.Id) : this.rowSelectedCostCenterNotInList.push(event.data.Id) }

  rowSelectedCostCenterInList = []
  rowSelectedCostCenterIn(event) { this.rowSelectedCostCenterInList.includes(event.data.Id) ? this.rowSelectedCostCenterInList = this.rowSelectedCostCenterInList.filter(a => a != event.data.Id) : this.rowSelectedCostCenterInList.push(event.data.Id) }

  rowSelectedPayProgramNotInList = []
  rowSelectedPayProgramNotIn(event) { this.rowSelectedPayProgramNotInList.includes(event.data.Id) ? this.rowSelectedPayProgramNotInList = this.rowSelectedPayProgramNotInList.filter(a => a != event.data.Id) : this.rowSelectedPayProgramNotInList.push(event.data.Id) }

  rowSelectedPayProgramInList = []
  rowSelectedPayProgramIn(event) { this.rowSelectedPayProgramInList.includes(event.data.Id) ? this.rowSelectedPayProgramInList = this.rowSelectedPayProgramInList.filter(a => a != event.data.Id) : this.rowSelectedPayProgramInList.push(event.data.Id) }

  addType() {
    const body = { ItemType_Fld: 100477, ItemCodeCollect_Fld: this.rowSelectedTypeNotInList.toString(), PayGroupCode_Fld: this.comboId }
    this.service.post(`${Controller}/AddInfo`, body).subscribe(_ => this.getSelectType())
  }

  removeType() {
    this.service.deleteByBody(`${Controller}/DeleteInfo`, { Id: this.rowSelectedTypeInList.toString() }).subscribe(_ => this.getSelectType())
  }

  addCostCenter() {
    const body = { ItemType_Fld: 100472, ItemCodeCollect_Fld: this.rowSelectedCostCenterNotInList.toString(), PayGroupCode_Fld: this.comboId }
    this.service.post(`${Controller}/AddInfo`, body).subscribe(_ => this.getSelectCostCenter())
  }

  removeCostCenter() {
    this.service.deleteByBody(`${Controller}/DeleteInfo`, { Id: this.rowSelectedCostCenterInList.toString() }).subscribe(_ => this.getSelectCostCenter())
  }

  addPayProgram() {
    const body = { ItemType_Fld: 100473, ItemCodeCollect_Fld: this.rowSelectedPayProgramNotInList.toString(), PayGroupCode_Fld: this.comboId }
    this.service.post(`${Controller}/AddInfo`, body).subscribe(_ => this.getSelectPayProgram())
  }

  removePayProgram() {
    this.service.deleteByBody(`${Controller}/DeleteInfo`, { Id: this.rowSelectedPayProgramInList.toString() }).subscribe(_ => this.getSelectPayProgram())
  }

  constructor(private service: GridFormService) { }

  ngOnInit(): void {
  }

}
