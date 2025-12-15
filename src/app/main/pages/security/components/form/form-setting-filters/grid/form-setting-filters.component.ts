import { Component, Input } from '@angular/core'
import { AlertClass } from 'src/app/main/main-body/common/alert/alert-functions'
import { CustomGridOption } from 'src/app/main/main-body/common/custom-ag-grid/interfaces/ag-grid-option.interface'
import { ModalOptions } from 'src/app/main/main-body/common/custom-modal/modal-options.interface';
import { GridFormService } from 'src/app/main/main-body/common/grid-form.service'
import { FormSettingsAttr, setFormSettingAttr } from 'src/app/main/pages/global-attr'

const Controller = 'FormSettingFilters'

@Component({
  selector: 'form-setting-filters',
  templateUrl: './form-setting-filters.component.html',
  styleUrls: ['./form-setting-filters.component.scss']
})
export class FormSettingFiltersComponent {

  @Input() FormID: number
  @Input() DynamicFormType: number
  @Input() EntityName: string

  showGrid: boolean = false
  showDynamicForm: boolean = false
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
    rowClicked: this.view.bind(this),
  }

  formObj: any
  getAttr() {
    this.showGrid = false
    let Attr = FormSettingsAttr()
    !Attr ? this.service.getAttr(Controller).subscribe((res: any) => this.setAttr(res.Data, 'toLocal')) : this.setAttr(Attr)
  }

  setAttr(attr, type?) {
    this.gridOption.columnDefs = attr
    this.formObj = attr.EntityAttribute
    type == 'toLocal' ? setFormSettingAttr(attr) : null
    this.getSelect()
  }

  getSelect() {
    this.showGrid = false
    this.service.getSelect(Controller, this.FormID).subscribe((res: any) => {
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
        this.showForm = false
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

  constructor(private service: GridFormService) { }
  modalOptions: ModalOptions
  
  ngOnChanges(UpdatedValue: string): void 
  { 
    this.getAttr() 
    this.showForm = false
    this.modalOptions = {
      modatTitle: 'نمایش فرم',
      modalId: `ModalID${this.FormID}`,
      hideCallback: this.closeForm.bind(this),
    }  
  }

}
