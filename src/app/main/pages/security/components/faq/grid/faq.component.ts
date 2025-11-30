import { Component, Input, OnInit } from '@angular/core'
import { ToastrService } from 'ngx-toastr'
import { AlertClass } from 'src/app/main/main-body/common/alert/alert-functions'
import { CustomGridOption } from 'src/app/main/main-body/common/custom-ag-grid/interfaces/ag-grid-option.interface'
import { GridFormService } from 'src/app/main/main-body/common/grid-form.service'

const Controller = 'Faq'

@Component({
  selector: 'faq-grid',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.scss']
})
export class FaqComponent implements OnInit {
  @Input() ShowControllerName: string
  @Input() ShowData: any
  
  showGrid: boolean = false

  showForm: boolean = false
  formType: string = ''
  gridOption = <CustomGridOption>{
    actions: [
      {
        label: 'Edit',
        callback: this.edit.bind(this),
      },
      {
        label: 'Delete',
        callback: this.delete.bind(this)
      },
      {
        label: 'Add',
        callback: this.add.bind(this),
      }
    ],
    controllerName: Controller,
    rowClicked: this.view.bind(this)
  }

  gridOptionMinimal = <CustomGridOption>{
    controllerName: Controller,
    rowClicked: this.view.bind(this)
  }

  getAttr() {
    this.service.getAttr(Controller).subscribe((res: any) => {
      if (this.ShowControllerName)
        this.gridOptionMinimal.columnDefs = res.Data
      else 
        this.gridOption.columnDefs = res.Data
      this.formObj = res.Data.EntityAttribute
      this.getSelect()
    })
  }

  formObj: any
  getSelect() {
    this.showGrid = false
    if (this.ShowControllerName && this.ShowControllerName != '')
    {
      this.gridOptionMinimal.rowData = this.ShowData
      this.showGrid = true
    }
    else
      this.service.getSelect(Controller).subscribe((res: any) => {
        this.gridOption.rowData = res.Data
        this.showGrid = true
      })
  }

  add() {
    this.showForm = true
    this.formType = 'Add'
  }

  ID
  edit(event) {
    this.ID = event.rowData.Id
    this.showForm = true
    this.formType = 'Edit'
  }

  view(event) {
    this.ID = event.data.Id
    this.showForm = true
    this.formType = 'View'
  }

  delete(event) {
    AlertClass.deleteAlert(_ => {
      this.service.delete(Controller, event.rowData.Id).subscribe((res: any) => {
        this.showGrid = false
        this.showForm = true
        this.gridOption.rowData = res.Data
        setTimeout(() => this.showGrid = true, 100)
      })
    })
  }

  submited(newData) {
    this.closeForm()
    if (!newData) return
    this.showGrid = false
    this.gridOption.rowData = newData
    setTimeout(() => this.showGrid = true, 100)
  }

  closeForm() {
    this.formType = ''
    this.showForm = false
  }

  constructor(private service: GridFormService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.getAttr()
  }

}
