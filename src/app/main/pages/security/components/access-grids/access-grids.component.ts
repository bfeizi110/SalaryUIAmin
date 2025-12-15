import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core'
import { CustomGridOption } from 'src/app/main/main-body/common/custom-ag-grid/interfaces/ag-grid-option.interface'
import { GridFormService } from 'src/app/main/main-body/common/grid-form.service'
import { GroupAccessGridsAttr, setGroupAccessGridsAttr } from 'src/app/main/pages/global-attr'

@Component({
  selector: 'access-grids',
  templateUrl: './access-grids.component.html',
  styleUrls: ['./access-grids.component.scss']
})
export class AccessGridsComponent implements OnInit {

  @Input() ID: number
  @Input() Controller: string
  @Output() closed = new EventEmitter()
  @Input() option: any

  comboList = []
  clickCombo() { this.comboList.length == 0 ? this.service.get('AccessGroup/GetAccessInfo').subscribe((res: any) => this.comboList = res.Data) : null }

  refreshComboCode() {
    this.comboList = []
    this.clickCombo()
  }

  costCenterGroupList = []
  clickCombocostCenterGroup() { this.costCenterGroupList.length == 0 ? this.service.getCombo('CostCenterGroup').subscribe((res: any) => this.costCenterGroupList = res.Data) : null }

  refreshCombo() {
    this.costCenterGroupList = []
    this.clickCombocostCenterGroup()
  }

  showGrids: boolean = false
  comboId: number
  async comboChange(id) {
    this.selectedAcccessList = []
    this.selectedNotAcccessList = []
    this.closeGrids()
    this.comboId = id
    if (id == 9) await this.getAttrPerson() 
    else await this.getAttr()
    this.getSelect()
  }

  costCenterId: number
  costCenterGroupChange(id) {
    this.costCenterId = id
    this.closeGrids()
    this.getSelectAccessCostCenter()
    this.getSelectNotAccessCostCenter()
  }

  showGridNotAccess: boolean = false
  gridOptionAccess = <CustomGridOption>{ checkboxSelection: true, rowSelected: this.rowSelectedAccess.bind(this) }
  gridOptionNotAccess = <CustomGridOption>{ checkboxSelection: true, rowSelected: this.rowSelectedNotAccess.bind(this) }

  getAttrPerson() {
    return new Promise(resolve => {
      this.service.getAttr('Person').subscribe((res: any) => {
        this.gridOptionAccess.columnDefs = res.Data
        this.gridOptionNotAccess.columnDefs = res.Data
        return resolve(true)
      })
    })
  }

  getAttr() {
    !GroupAccessGridsAttr
      ? this.service.get(`group/GetControllerAttribute`).subscribe((res: any) => this.setAttr(res.Data, 'toLocal'))
      : this.setAttr(GroupAccessGridsAttr)
  }

  setAttr(attr, type?) {
    this.gridOptionAccess.columnDefs = attr
    this.gridOptionNotAccess.columnDefs = attr
    type == 'toLocal' ? setGroupAccessGridsAttr(attr) : null
  }

  getSelect(updateCostGrid?) {
    this.selectedAcccessList = []
    this.selectedNotAcccessList = []
    this.closeGrids()
    switch (this.comboId) {
      case 1:
        this.getSelectAccess()
        this.getSelectNotAccess()
        break
      case 2:
        if (!updateCostGrid) return
        this.getSelectAccessCostCenter()
        this.getSelectNotAccessCostCenter()
      case 9:
        this.getSelectAccessUserClaimPersonFish()
        this.getSelectNotAccessUserClaimPersonFish()
        break
      default:
        this.getSelectAccessElse()
        this.getSelectNotAccessElse()
        break
    }
  }

  closeGrids() {
    this.showGridAccess = false
    this.showGridNotAccess = false
    this.showGrids = false
  }

  openGrids() { this.showGrids = true }

  showGridAccess: boolean = false
  getSelectAccess() {
    let url: string
    url = `${this.option.Controller}/GetClaim/${this.option.RoleId}`
    this.service.get(url).subscribe((res: any) => {
      this.gridOptionAccess.rowData = res.Data
      this.openGrids()
      this.showGridAccess = true
    })
  }

  getSelectNotAccess() {
    let url: string
    url = `${this.option.Controller}/GetNotInClaimController/${this.option.RoleId}`
    this.service.get(url).subscribe((res: any) => {
      this.gridOptionNotAccess.rowData = res.Data
      this.openGrids()
      this.showGridNotAccess = true
    })
  }

  getSelectNotAccessUserClaimPersonFish() {
    let url: string
    url = `${this.option.Controller}/GetNotInClaimPersonFish/${this.option.RoleId}`
    this.service.get(url).subscribe((res: any) => {
      this.gridOptionNotAccess.rowData = res.Data
      this.openGrids()
      this.showGridNotAccess = true
    })
  }

  getSelectAccessUserClaimPersonFish() {
    let url: string
    url = `${this.option.Controller}/GetClaimPersonFish/${this.option.RoleId}`
    this.service.get(url).subscribe((res: any) => {
      this.gridOptionAccess.rowData = res.Data
      this.openGrids()
      this.showGridAccess = true
    })
  }

  getSelectAccessCostCenter() {
    let url: string
    url = `${this.option.Controller}/GetClaimCostCenter/${this.option.RoleId}/${this.costCenterId}`
    this.service.get(url).subscribe((res: any) => {
      this.gridOptionAccess.rowData = res.Data
      this.showGridAccess = true
      this.openGrids()
    })
  }

  getSelectNotAccessCostCenter() {
    let url: string
    url = `${this.option.Controller}/GetNotInClaimCostCenter/${this.option.RoleId}/${this.costCenterId}`
    this.service.get(url).subscribe((res: any) => {
      this.gridOptionNotAccess.rowData = res.Data
      this.showGridNotAccess = true
      this.openGrids()
    })
  }

  getSelectAccessElse() {
    let url: string
    url = `${this.option.Controller}/GetClaimElse/${this.option.RoleId}/${this.comboId}`
    this.service.get(url).subscribe((res: any) => {
      this.gridOptionAccess.rowData = res.Data
      this.showGridAccess = true
      this.openGrids()
    })
  }

  getSelectNotAccessElse() {
    let url: string
    url = `${this.option.Controller}/GetNotInClaimElse/${this.option.RoleId}/${this.comboId}`
    this.service.get(url).subscribe((res: any) => {
      this.gridOptionNotAccess.rowData = res.Data
      this.showGridNotAccess = true
      this.openGrids()
    })
  }

  selectedAcccessList = []
  rowSelectedAccess(event) { this.selectedAcccessList.includes(event.data) ? this.selectedAcccessList = this.selectedAcccessList.filter(a => a != event.data) : this.selectedAcccessList.push(event.data) }

  selectedNotAcccessList = []
  rowSelectedNotAccess(event) { this.selectedNotAcccessList.includes(event.data) ? this.selectedNotAcccessList = this.selectedNotAcccessList.filter(a => a != event.data) : this.selectedNotAcccessList.push(event.data) }

  model: { RoleId?: number, ClaimStr: string, ClaimType: number, UserId?: number }
  addAccess() {
    if (this.selectedNotAcccessList.length == 0) return
    let ClaimStr = []
    this.comboId == 1 ? this.selectedNotAcccessList.forEach(e => ClaimStr.push(e.Controller)) : this.selectedNotAcccessList.forEach(e => ClaimStr.push(e.Id))
    let RoleId = this.option.RoleId
    this.option.Controller == 'AccessUser' ? this.model = { ClaimStr: ClaimStr.toString(), UserId: RoleId, ClaimType: this.comboId } : this.model = { ClaimStr: ClaimStr.toString(), RoleId: RoleId, ClaimType: this.comboId }
    this.service.post(`${this.option.Controller}/AddClaim`, this.model).subscribe(_ => this.getSelect(true))
  }

  removeAccess() {
    if (this.selectedAcccessList.length == 0) return
    let ids = []
    this.selectedAcccessList.forEach(e => ids.push(e.Id))
    this.service.deleteByBody(`${this.option.Controller}/DeleteClaim`, { Id: ids.toString() }).subscribe(_ => this.getSelect(true))
  }

  showCostCenterModal: boolean = false
  onShowCostCenterModal() { this.showCostCenterModal = true }

  closedCostCenterModal() { this.showCostCenterModal = false }

  close() { this.closed.emit() }

  ngAfterViewInit(): void { setTimeout(() => {
    this.service.scrollToElement('form')
  }, 200);  }

  constructor(private service: GridFormService) { }

  ngOnInit(): void { this.getAttr() }

}

