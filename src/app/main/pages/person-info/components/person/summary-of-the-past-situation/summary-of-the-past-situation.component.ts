import { Component, Input, OnInit } from '@angular/core';
import { CustomGridOption } from 'src/app/main/main-body/common/custom-ag-grid/interfaces/ag-grid-option.interface';
import { GridFormService } from 'src/app/main/main-body/common/grid-form.service';

@Component({
  selector: 'summary-of-the-past-situation',
  templateUrl: './summary-of-the-past-situation.component.html',
  styleUrls: ['./summary-of-the-past-situation.component.scss']
})
export class SummaryOfThePastSituationComponent {

  @Input() Id: number

  gridOption = <CustomGridOption>{}
  showGridOptionStatus: boolean = false
  buildGrid() {
    this.showGridOptionStatus = false
    this.service.get(`person/GetPrsInfoKardex/${this.Id}`).subscribe((res: any) => {
      let data = res.Data
      this.gridOption.rowData = data.Item1
      this.gridOption.columnDefs = data.Item2
      this.showGridOptionStatus = true
    })
  }

  constructor(private service: GridFormService) { }

  ngOnChanges(UpdatedValue: any) { this.buildGrid() }
}
