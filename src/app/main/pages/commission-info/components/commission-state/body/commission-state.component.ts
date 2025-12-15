import { Component, OnInit } from '@angular/core'
import { ToastrService } from 'ngx-toastr'
import { CustomGridOption } from 'src/app/main/main-body/common/custom-ag-grid/interfaces/ag-grid-option.interface'
import { GridFormService } from 'src/app/main/main-body/common/grid-form.service'
import { CommissionStateAttr, setCommissionStateAttr, CommissionStateChangeAttr, setCommissionStateChangeAttr } from 'src/app/main/pages/global-attr'
import { exportFile, showFile } from 'src/app/main/main-body/common/constants'

const Controller = 'CommissionStateView'

@Component({
  templateUrl: './commission-state.component.html',
  styleUrls: ['./commission-state.component.scss']
})
export class CommissionStateComponent implements OnInit {

  showGrid: boolean = false
  showGridAuto: boolean = false

  showForm: boolean = false
  formType: string = ''
  gridOption = <CustomGridOption>{
    controllerName: Controller,
    checkboxSelection: true, 
    rowSelected: this.rowSelected.bind(this),
    rowClicked: this.view.bind(this)
  }
  gridOptionAuto = <CustomGridOption>{
    controllerName: Controller,
  }

  view(event) {
    this.ID = event.data.Id
  }

  selectedCommissionList = []
  rowSelected(event) { 
    this.selectedCommissionList.includes(event.data.Id) ? this.selectedCommissionList = this.selectedCommissionList.filter(a => a != event.data.Id) : this.selectedCommissionList.push(event.data.Id) 
  }

  getAttrChange() {
    this.showGrid = false
    !CommissionStateChangeAttr
      ? this.service.getAttr('CommissionChgStateHistory').subscribe((res: any) => this.setAttrChange(res.Data, 'toLocal'))
      : this.setAttrChange(CommissionStateChangeAttr)
  }

  changeAttr: any
  setAttrChange(attr, type?) {
    this.changeAttr = attr
    type == 'toLocal' ? setCommissionStateChangeAttr(attr) : null
  }

  async onFilter(body) {
    !this.formObj ? await this.getAttr() : null
    this.getSelect(body)
  }

  formObj: any
  getAttr() {
    return new Promise(resolve => {
      this.showGrid = false
      if (!CommissionStateAttr) {
        this.service.getAttr(Controller).subscribe((res: any) => {
          this.setAttr(res.Data, 'toLocal')
          return resolve(true)
        })
      }
      else {
        this.setAttr(CommissionStateAttr)
        return resolve(true)
      }
    })
  }

  accesses = []
  setAttr(attr, type?) {
    this.gridOption.columnDefs = attr
    this.formObj = attr.EntityAttribute
    this.accesses = attr.EntityAccess
    type == 'toLocal' ? setCommissionStateAttr(attr) : null
  }

  filterDto
  getSelect(body) {
    this.filterDto = body
    this.showGrid = false
    this.service.post(`${Controller}/GetSelect`, this.filterDto).subscribe((res: any) => {
      this.gridOption.rowData = res.Data
      this.selectedCommissionList = []
      this.showGrid = true
    })
  }

  onRefresh(event) {
    console.log(event)
  }

  ID: number
  submited() {
    this.selectedCommissionList = []
    this.closeForm()
    this.showGrid = false
    this.getSelect(this.filterDto)
  }

  closeForm() {
    this.formType = ''
    this.showForm = false
  }

  async onPrintView(e) {
    if (this.ID)
    {
      let file = (await this.service.post(`Commission/GetHokmImage`, this.ID.toString()).toPromise()) as any;
      if (file.Data.Item2 == false)
        this.toastr.error(file.Data.Item3);
      else
        file ? showFile(file.Data.Item1[0].FileData) : null;
    }
  }    
  async onFileHokm(e) {
    if (this.ID)
    {
      let file = (await this.service.post(`Commission/GetHokmImage`, this.selectedCommissionList.toString()).toPromise()) as any;
      if (file.Data.Item2 == false)
        this.toastr.error(file.Data.Item3);
      else
        if (file)
        {
          file.Data.Item1.forEach(element => {
            exportFile(element.FileData, element.FileName);
          });
        }
    }
  }   

  async autoState() {
    await this.service.post(`CommissionChgStateHistory/SetStatusAuto`, null).subscribe();
  }    
  openForm() { this.selectedCommissionList.length == 0 ? this.toastr.warning('لطفا حداقل یک مورد را انتخاب کنید', 'هشدار') : this.showForm = true }

  constructor(private service: GridFormService, private toastr: ToastrService) { }

  ngOnInit(): void { this.getAttrChange() }

}
