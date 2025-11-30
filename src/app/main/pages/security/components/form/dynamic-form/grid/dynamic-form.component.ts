import { Component, EventEmitter, OnInit, Input, Output } from '@angular/core'
import { AlertClass } from 'src/app/main/main-body/common/alert/alert-functions'
import { Common } from 'src/app/main/main-body/common/constants'
import { CustomGridOption } from 'src/app/main/main-body/common/custom-ag-grid/interfaces/ag-grid-option.interface'
import { ModalOptions } from 'src/app/main/main-body/common/custom-modal/modal-options.interface'
import { GridFormService } from 'src/app/main/main-body/common/grid-form.service'
import { of } from 'rxjs';
import { delay } from 'rxjs/operators';
const Controller = 'DynamicForm'

@Component({
  selector: 'dynamic-form',
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.scss']
})
export class DynamicFormComponent implements OnInit {
  @Input() FormID: number
  @Input() DynamicFormType: number
  @Input() IsMaster: boolean
  @Input() IsDetail: boolean
  @Input() WorkFlowID: number
  @Input() ParentFormID: string 
  @Input() ParentID: string 
  @Input() FormType: string = 'View'
  @Input() ID: number
  @Input() MainFormID: number
  @Input() RequestEntryInfo: any
  @Input() ButtonList: any[]
  @Input() Level: number
  @Input() TabIndex: number
  @Input() IndexStr: string
  @Input() MasterDetailID?: number

  @Output() closed = new EventEmitter()
  @Output() done = new EventEmitter()
  @Output() clicked = new EventEmitter()
  @Output() buttonListDone = new EventEmitter()

  showGrid: boolean
  showForm: boolean = false
  common: Common
  miniLogUrl: string
 
  gridOptionOnlyGrid = <CustomGridOption>{
    controllerName: Controller,
    rowClicked: this.view.bind(this)
  }

  gridOption = <CustomGridOption>{
    actions: [
      {
        label: 'Edit',
        callback: this.edit.bind(this)
      },
      {
        label: 'Delete',
        callback: this.delete.bind(this)
      },
      {
        label: 'Add',
        callback: this.add.bind(this)
      }
    ],
    controllerName: Controller,
    rowClicked: this.view.bind(this)
  }

  formObj: any
  formFilterAttr: any
  formTabAttr: any
  getAttr() {
    if (this.FormID && this.DynamicFormType)
      this.service.get(`${Controller}/GetAttribute/${this.FormID}/${this.DynamicFormType}/${this.WorkFlowID ? this.WorkFlowID : 0}/${this.RequestEntryInfo && this.RequestEntryInfo.EntryID ? this.RequestEntryInfo.EntryID : 0}/${this.RequestEntryInfo && this.RequestEntryInfo.RequestType ? this.RequestEntryInfo.RequestType : 0}`).toPromise().then((res: any) => this.setAttr(res.Data)).catch(() => this.closeForm()) 
  }
  RowNumber: number
  setAttr(attr:any) {
    this.formObj = attr.EntityAttribute
    this.formFilterAttr = attr.FormFilterAttribute
    this.formTabAttr = attr.FormTabNamesAttribute
    this.RowNumber = this.formObj.RowDefaultCount
    switch (this.DynamicFormType) {
      case 100953:
        this.gridOptionOnlyGrid.columnDefs = attr  
        this.gridOptionOnlyGrid.EntityName = attr.EntityAttribute.EntityName
        this.getSelect(null)
        break;
      case 100955:
        this.showGrid = false
        this.showForm = true
        break;
      default:
        this.gridOption.columnDefs = attr  
        this.gridOption.EntityName = attr.EntityAttribute.EntityName
        this.getSelect(null)
        break;
    }
  }

  getSelect(event) {
    this.showGrid = false
    // this.service.post(`${Controller}/GetSelect/${this.ParentID ?? 0}/${this.FormID}/${this.ParentFormID ?? 0}/${this.MainFormID ?? this.FormID}`, event).subscribe((res: any) => {

    var form = {dynamicFormFilterDto:event, ParentID:this.ParentID ?? 0, FormID:this.FormID, ParentFormID:this.ParentFormID ?? 0, MainFormID:this.MainFormID ?? this.FormID, TabNo: this.TabIndex, MasterDetailID: this.MasterDetailID}

    this.service.post(`${Controller}/GetSelect`, form).subscribe((res: any) => {
      if (this.DynamicFormType == 100953)
        this.gridOptionOnlyGrid.rowData = res.Data
      else
        this.gridOption.rowData = res.Data

      this.showGrid = true
    })


    // this.service.get(`${Controller}/GetSelect/${this.ParentID ?? 0}/${this.FormID}/${this.ParentFormID ?? 0}/${this.MainFormID ?? this.FormID}`).subscribe((res: any) => {
    //   if (this.DynamicFormType == 100953)
    //     this.gridOptionOnlyGrid.rowData = res.Data
    //   else
    //     this.gridOption.rowData = res.Data

    //   this.showGrid = true
    // })
  }

  add() {
    this.showForm = true
    this.FormType = 'Add'
  }

  edit(event:any) {
    this.ID = event.rowData.Id
    this.showForm = true
    this.FormType = 'Edit'
  }

  view(event:any) {
    this.ID = event.data.Id
    this.showForm = true
    this.FormType = 'View'
    this.clicked.emit({data: event.data, FormID: this.FormID, Level: this.Level, TabIndex: this.TabIndex, IndexStr: this.IndexStr})
  }

  delete(event:any) {
    this.common = {
      FldString1 : this.ParentID,
      FldInt2 : this.FormID, 
      FldInt3 : event.rowData.Id,
      FldString2 : this.ParentFormID,
      FldInt1 : this.MainFormID,
      FldInt4: this.MasterDetailID
    }
    AlertClass.deleteAlert(_ => {
      this.service.deleteByBody(`${Controller}/Delete`, this.common).subscribe((res: any) => {
        if (res.IsSuccess)
        {
          this.showGrid = false
          this.gridOption.rowData = res.Data
          of(null).pipe(
            delay(0)
          ).subscribe(() => {
            this.showGrid = true;
            this.showForm = false;
          });
        }
      })
    })
  }

  submited(newData:any) {
    this.closeForm()
    this.done.emit(newData)
    if (!newData) return
    this.showGrid = false
    this.gridOption.rowData = newData
    of(null).pipe(
      delay(0)
    ).subscribe(() => {
      this.showGrid = true;
    });
  }

  closeForm() {
    this.FormType = ''
    this.showForm = false
    this.closed.emit()
  }

  clickButtonList(code: number){
    this.buttonListDone.emit(code)
  }
  
  constructor(private service: GridFormService) { }
  modalOptions: ModalOptions
  
  ngOnInit() { 
    this.getAttr() 
    this.gridOption.miniLogUrl = `${Controller}/GetMiniLog/${this.FormID}`;
  }
}
