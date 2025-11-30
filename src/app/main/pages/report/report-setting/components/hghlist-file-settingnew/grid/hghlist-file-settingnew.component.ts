import { Component, Input } from '@angular/core'
import { AlertClass } from 'src/app/main/main-body/common/alert/alert-functions'
import { CustomGridOption } from 'src/app/main/main-body/common/custom-ag-grid/interfaces/ag-grid-option.interface'
import { GridFormService } from 'src/app/main/main-body/common/grid-form.service'
import { HghListFileSettingNewAttr, HghListFileSettingOrderAttr, setHghListFileSettingNewAttr, setHghListFileSettingOrderAttr } from 'src/app/main/pages/global-attr'

const ControllerStep2 = 'HghListFileSettingNew'
const ControllerStep1 = 'HghListFileSettingOrder'

@Component({
  selector: 'hghlist-file-settingnew',
  templateUrl: './hghlist-file-settingnew.component.html',
  styleUrls: ['./hghlist-file-settingnew.component.scss']
})
export class HghlistFileSettingNewComponent {

  @Input() IsMadeh29_Fld: number = 0

  emgGroupList = []
  clickCombo() { 
    this.emgGroupList.length == 0 ? this.service.getCombo('OtherDetail/10065').subscribe((res: any) => this.emgGroupList = res.Data) : null 
  }

  refreshCombo() {
    this.emgGroupList = []
    this.clickCombo()
  }

  EmpGroup_Fld: number
  showGridStep2: boolean
  showGridStep1: boolean
  emgGroupChange(id) {
    this.showFormStep2 = false
    this.showGridStep2 = false
    this.showFormStep1 = false
    this.showGridStep1 = false
    this.EmpGroup_Fld = id
    this.getAttr()
  }

  showFormStep2: boolean = false
  showFormStep1: boolean = false
  formTypeStep1: string = ''
  formTypeStep2: string = ''
  gridOptionStep1 = <CustomGridOption>{
    actions: [
      {
        label: 'Add',
        callback: this.addStep1.bind(this)
      },
      {
        label: 'Edit',
        callback: this.editStep1.bind(this)
      },
      {
        label: 'Delete',
        callback: this.deleteStep1.bind(this)
      }
    ],
    controllerName: ControllerStep1,
    rowClicked: this.viewStep1.bind(this)
  }

  gridOptionStep2 = <CustomGridOption>{
    actions: [
      {
        label: 'Edit',
        callback: this.editStep2.bind(this)
      },
    ],
    controllerName: ControllerStep2,
    rowClicked: this.viewStep2.bind(this),
    checkboxSelection: true,
    rowSelected: this.rowSelected.bind(this),    
  }

  addStep1() {
    this.showFormStep1 = true
    this.formTypeStep1 = 'Add'
  }
  
  editStep1(event) {
    this.IDStep1 = event.rowData.Id
    this.showFormStep1 = true
    this.formTypeStep1 = 'Edit'
  }

  deleteStep1(event) {
    AlertClass.deleteAlert(_ => {
      this.service.delete(ControllerStep1, event.rowData.Id).subscribe((res: any) => {
        this.showGridStep1 = false
        this.gridOptionStep1.rowData = res.Data
        setTimeout(() => this.showGridStep1 = true)
      })
    })
  }
  selectedRow = []
  rowSelected(event) { 
    if (this.selectedRow.includes(event.data.Id))
      this.selectedRow = this.selectedRow.filter(a => a != event.data.Id) 
    else
     this.selectedRow.push(event.data.Id) 
  }

  editAllRowStep2() {
    this.IDStep2 = this.selectedRow
    this.showFormStep2 = true
    this.formTypeStep2 = 'MEdit'
  }

  formObjStep1: any
  formObjStep2: any
  accessEditStep2:boolean = false
  accessEditStep1:boolean = false
  getAttr() {
    let Attr1 = HghListFileSettingNewAttr()
    if (!Attr1)
      this.service.getAttr(ControllerStep2).subscribe((res: any) => 
      {
        this.setAttrStep2(res.Data, 'toLocal')
        this.accessEditStep2 = res.Data.EntityAccess.includes('EditPolicy')
      })
      else{
         this.setAttrStep2(Attr1)
         this.accessEditStep2 = Attr1.EntityAccess.includes('EditPolicy')
        }
      let Attr = HghListFileSettingOrderAttr()
      if (!Attr)
        this.service.getAttr(ControllerStep1).subscribe((res: any) => 
        {
          this.setAttrStep1(res.Data, 'toLocal')
          this.accessEditStep1 = res.Data.EntityAccess.includes('EditPolicy')
        })
      else{
          this.setAttrStep1(Attr)
          this.accessEditStep1 = Attr.EntityAccess.includes('EditPolicy')
        }
  }

  setAttrStep2(attr, type?) {
    this.gridOptionStep2.columnDefs = attr
    this.formObjStep2 = attr.EntityAttribute
    type == 'toLocal' ? setHghListFileSettingNewAttr(attr) : null
    this.getSelectStep2()
  }

  getSelectStep2() {
    this.showGridStep2 = false
    this.service.getSelect(ControllerStep2, this.EmpGroup_Fld, this.IsMadeh29_Fld.toString()).subscribe((res: any) => {
      this.gridOptionStep2.rowData = res.Data
      this.showGridStep2 = true
    })
  }

  setAttrStep1(attr, type?) {
    this.gridOptionStep1.columnDefs = attr
    this.formObjStep1 = attr.EntityAttribute
    type == 'toLocal' ? setHghListFileSettingOrderAttr(attr) : null
    this.getSelectStep1()
  }

  getSelectStep1() {
    this.showGridStep1 = false
    this.service.getSelect(ControllerStep1, this.EmpGroup_Fld, this.IsMadeh29_Fld.toString()).subscribe((res: any) => {
      this.gridOptionStep1.rowData = res.Data
      this.showGridStep1 = true
    })
  }

  IDStep2: number[] = []
  IDStep1: number
  editStep2(event) {
    this.IDStep2[0] = event.rowData.Id
    this.showFormStep2 = true
    this.formTypeStep2 = 'Edit'
  }

  viewStep2(event) {
    this.IDStep2[0] = event.data.Id
    this.showFormStep2 = true
    this.formTypeStep2 = 'View'
  }

  submitedStep2(newData) {
    this.closeFormStep2()
    if (!newData) return
    this.showGridStep2 = false
    this.selectedRow=[]
    this.gridOptionStep2.rowData = newData
    setTimeout(() => this.showGridStep2 = true)
  }

  closeFormStep2() {
    this.formTypeStep2 = ''
    this.showFormStep2 = false
  }

  viewStep1(event) {
    this.IDStep1 = event.data.Id
    this.showFormStep1 = true
    this.formTypeStep1 = 'View'
  }  
  submitedStep1(newData) {
    this.closeFormStep1()
    if (!newData) return
    this.showGridStep1 = false
    this.gridOptionStep1.rowData = newData
    setTimeout(() => this.showGridStep1 = true)
  }

  closeFormStep1() {
    this.formTypeStep1 = ''
    this.showFormStep1 = false
  }  
  constructor(private service: GridFormService) { }

}
