import { Component, Input, OnInit } from '@angular/core';
import { GroupAccessGridsAttr, setGroupAccessGridsAttr } from 'src/app/main/pages/global-attr';
import { CustomGridOption } from '../../../common/custom-ag-grid/interfaces/ag-grid-option.interface';
import { GridFormService } from '../../../common/grid-form.service';

@Component({
  selector: 'filter-user-access',
  templateUrl: './filter-user-access.component.html',
  styleUrls: ['./filter-user-access.component.scss']
})
export class FilterUserAccessComponent implements OnInit {

  @Input() userId: number

  comboList = []
  clickCombo() { this.comboList.length == 0 ? this.service.get('AccessGroup/GetAccessInfo').subscribe((res: any) => this.comboList = res.Data) : null }

  costCenterGroupList = []
  clickCombocostCenterGroup() { this.costCenterGroupList.length == 0 ? this.service.getCombo('CostCenterGroup').subscribe((res: any) => this.costCenterGroupList = res.Data) : null }

  refreshComboCode() {
    this.comboList = []
    this.clickCombo()
  }

  showGrid: boolean = false
  comboId: number
  comboChange(id) {
    this.comboId = id
    this.getSelect()
  }

  costCenterGroupChange(id) { this.getSelectAccess(`GetAllClaimCostCenter/${this.userId}/${id}`) }

  attrAll: any
  attrCostCenter: any
  attrElse: any
  async getSelect() {
    await this.getAttr()
    switch (this.comboId) {
      case 1:
        this.getSelectAccess(`GetAllClaim/${this.userId}`)
        break
      case 2:
        this.showGrid = false
        break
      default:
        this.getSelectAccess(`GetAllClaimElse/${this.userId}/${this.comboId}`)
        break
    }
  }

  gridOption = <CustomGridOption>{}
  getSelectAccess(url) {
    this.showGrid = false
    this.service.get(`AccessUser/${url}`).subscribe((res: any) => {
      this.gridOption.rowData = res.Data
      this.showGrid = true
    })
  }

  getAttr() {
    return new Promise(resolve => {
      if (!GroupAccessGridsAttr)
        this.service.get(`group/GetControllerAttribute`).subscribe((res: any) => {
          this.setAttr(res.Data, 'toLocal')
          return resolve(true)
        })
      else {
        this.setAttr(GroupAccessGridsAttr)
        return resolve(true)
      }
    })
  }

  setAttr(attr, type?) {
    this.gridOption.columnDefs = attr
    type == 'toLocal' ? setGroupAccessGridsAttr(attr) : null
  }

  constructor(private service: GridFormService) { }

  ngOnInit(): void { !this.userId ? this.userId = +sessionStorage.OwnerUserId : null }

}
