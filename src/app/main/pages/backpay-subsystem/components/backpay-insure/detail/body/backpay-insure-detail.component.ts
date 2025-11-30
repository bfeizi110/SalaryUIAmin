import { Component,  Input } from '@angular/core'
import { LoaderService } from 'src/app/common/loader/loader.service'
import { CustomGridOption } from 'src/app/main/main-body/common/custom-ag-grid/interfaces/ag-grid-option.interface'
import { GridFormService } from 'src/app/main/main-body/common/grid-form.service'

const Controller = 'BackPayInsure'

@Component({
  selector: 'backpay-insure-detail',
  templateUrl: './backpay-insure-detail.component.html',
  styleUrls: ['./backpay-insure-detail.component.scss']
})
export class BackPayInsureDetailComponent {

  @Input() Id: number

  paramTypeId: number = 100323
 
  gridOption = <CustomGridOption>{ controllerName: `${Controller}/GetMiniLogFraction` }

  formObj: any
  getAttr() {
    return new Promise(resolve => {
      this.service.get(`${Controller}/GetDiffAttribute`).subscribe((res: any) => {
        this.gridOption.columnDefs = res.Data
        this.gridOption.columnDefs.EntityAttribute.EntityName = 'SalaryDetailFractionTbl'
        this.formObj = res.Data.EntityAttribute
        return resolve(true)
      })
    })
  }

  showGrid: boolean = false
  getSelect(catId: number) {
    return new Promise(resolve => {
      this.showGrid = false
      this.service.get(`${Controller}/GetSelectDiffRecords/${this.Id}/${catId}`).subscribe((res: any) => {
        this.gridOption.rowData = res.Data
        this.showGrid = true
        return resolve(true)
      })
    })
  }

  comboAray = [{ Id: 100321, CodeDesc_Fld: 'جاری' }, { Id: 100322, CodeDesc_Fld: 'خزانه' }, { Id: 100323, CodeDesc_Fld: 'کلی' }]

  async comboChange(catId) {
    await this.getAttr()
    await this.getSelect(catId)
    setTimeout(() => this.service.scrollToElement('form'), 450)
  }

  constructor(private service: GridFormService, private loader: LoaderService) { }

  isManual: boolean = false
  async ngOnChanges(UpdatedValue: string) {
    this.showGrid = false
    setTimeout(() => {
      this.comboChange(this.paramTypeId)
    })
  }

}