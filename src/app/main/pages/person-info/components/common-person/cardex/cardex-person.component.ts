import { Component, Input, OnInit } from '@angular/core'
import { CustomGridOption } from 'src/app/main/main-body/common/custom-ag-grid/interfaces/ag-grid-option.interface'
import { GridFormService } from 'src/app/main/main-body/common/grid-form.service'

@Component({
  selector: 'cardex-person',
  templateUrl: './cardex-person.component.html',
  styleUrls: ['./cardex-person.component.scss']
})
export class CardexPersonComponent implements OnInit {

  @Input() option

  refreshCombo() {
    this.comboList = []
    this.clickCombo()
  }

  comboList = []
  clickCombo() {
    if (this.comboList.length != 0) return
    if (this.option.Controller == 'PersonInsureInfo') return this.service.get(`${this.option.ComboType}/${this.option.PID}`).subscribe((res: any) => this.comboList = res.Data)
    if (this.option.Controller == 'PersonMostamar') return this.service.get(`${this.option.ComboType}/${this.option.PID}`).subscribe((res: any) => this.comboList = res.Data)
    this.service.getCombo(this.option.ComboType).subscribe((res: any) => this.comboList = res.Data)
  }

  gridOption = <CustomGridOption>{
    hideButtons: true
  }

  showGrid: boolean = false
  hireId: number
  comboChange(id) {
    this.showGrid = false
    this.service.get(`${this.url}/${id}`).subscribe((res: any) => {
      this.gridOption.rowData = res.Data
      this.showGrid = true
    })
  }

  getSelect() {
    this.showGrid = false
    this.service.get(this.url).subscribe((res: any) => {
      this.gridOption.rowData = res.Data
      this.showGrid = true
    })
  }

  constructor(private service: GridFormService) { }

  url: string
  ngOnInit(): void {
    this.url = this.option.IsCalc &&  this.option.IsCalc == true ? `${this.option.Controller}/GetCardexCalc/${this.option.PID}` : `${this.option.Controller}/GetCardex/${this.option.PID}`
    this.gridOption.columnDefs = this.option.columnDefs
    !this.option.ComboType ? this.getSelect() : null
  }

}
