import { EntityAttr } from './../../../../global-attr';
import { Component, Input } from '@angular/core'
import { ModalOptions } from 'src/app/main/main-body/common/custom-modal/modal-options.interface'
import { GridFormService } from 'src/app/main/main-body/common/grid-form.service'
import { CommissionsParamAttr, setCommissionsParamAttr } from '../../../../global-attr'

const Controller = 'Commission'

@Component({
  selector: 'commission-parameter',
  templateUrl: './commission-parameter.component.html',
  styleUrls: ['./commission-parameter.component.scss']
})

export class CommissionParameterComponent {

  @Input() paramData: any
  @Input() formType: string
  @Input() hireTypeId: number
  @Input() IsMultiple: boolean

  showGrid: boolean = false

  modalOptions: ModalOptions = {
    modatTitle: 'تغییر مقدار پارامتر',
    hideCallback: this.close.bind(this),
    saveCallback: this.save.bind(this)
  }

  showModal: boolean = false
  TransferOld: boolean = false
  appTag
  rowTag
  rowID
  backupValue
  activeParam: number
  edit(event) {
    this.activeParam = event.rowData
    this.showModal = true
    this.value = event.rowData.Value
    this.TransferOld = event.rowData.TransferOld
    this.backupValue = event.rowData.Value
  }

  save() {
    this.showGrid = false
    this.showModal = false
    this.paramData.ParamList.filter(a => a == this.activeParam)[0].Value = this.TransferOld ? 0 : this.value
    this.paramData.ParamList.filter(a => a == this.activeParam)[0].TransferOld = this.TransferOld
    setTimeout(() => this.showGrid = true, 100)
  }

  activeIndex
  activeGrid(index) { this.activeIndex = index }

  close() {
    this.paramData.ParamList.filter(a => a == this.activeParam)[0].Value = this.backupValue
    this.showModal = false
  }

  getAttr() {
    this.showGrid = false
    !CommissionsParamAttr
      ? this.service.get(`${Controller}/GetAttributeCommParam`).subscribe((res: any) => this.setAttr(res.Data, 'toLocal'))
      : this.setAttr(CommissionsParamAttr)
  }

  columnDefs 
  setAttr(attr, type?) {
    type == 'toLocal' ? setCommissionsParamAttr(attr) : null
    this.columnDefs = attr
    if (!this.IsMultiple)
      this.columnDefs.EntityAttribute.TransferOld = null
    this.setupGrids()
  }

  rowDatas: any[] = []
  setupGrids() {
    const gridLength = this.paramData.ParamList.length
    var array = []

    let numberGrid: number = 0
    if (gridLength >= 20) {
      numberGrid = gridLength / 20
      let remember: number = gridLength % 20
      if (remember > 0) numberGrid = Math.floor(numberGrid) + 1

      let mynum = 0
      let end = 20
      for (let idx = 1; idx <= numberGrid; idx++) {
        array = []
        for (let index = mynum; index < end; index++) {
          if (this.paramData.ParamList[index]) array.push(this.paramData.ParamList[index])
        }
        this.rowDatas.push(array)
        end = end + 20
        if (end > gridLength) end = gridLength
        mynum = mynum + 20
      }
    } else this.rowDatas.push(this.paramData.ParamList)
    this.formType == 'Edit' || this.formType == 'Add' ? this.rowDatas.forEach(data => this.gridOptions.push({ rowData: data, columnDefs: this.columnDefs, actions: [{ label: 'Edit', callback: this.edit.bind(this) }] })) : this.rowDatas.forEach(data => this.gridOptions.push({ rowData: data, columnDefs: this.columnDefs }))

    /*  if (this.formType == 'Edit' || this.formType == 'Add') {
       this.rowDatas.forEach((data: any) => {
         this.gridOptions.push({ rowData: data, columnDefs: this.columnDefs, actions: [{ label: 'Edit', callback: this.edit.bind(this) }] })
       })
     } */
    setTimeout(() => this.showGrid = true, 100)
  }

  gridOptions = []

  value
  keyUp(event) {
    if (event.key != '*') return
    this.value = +(this.value.toString() + '000')
  }
  // changeCheckbox(event) {
  //   this.TransferOld = event
  // }

  calculate() { this.service.post(`${Controller}/GetSum`, { HireTypeID: this.hireTypeId, CommParamSumItemsDto: this.paramData.ParamList }).subscribe((res: any) => this.paramData.SumParams = res.Data) }

  constructor(private service: GridFormService) { }

  ngOnChanges(UpdatedValue: string): void {
    this.gridOptions = []
    this.rowDatas = []
    this.getAttr()
  }

}
