import { Component, Input } from '@angular/core'
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AlertClass } from 'src/app/main/main-body/common/alert/alert-functions'
import { CustomGridOption } from 'src/app/main/main-body/common/custom-ag-grid/interfaces/ag-grid-option.interface'
import { ModalOptions } from 'src/app/main/main-body/common/custom-modal/modal-options.interface';
import { GridFormService } from 'src/app/main/main-body/common/grid-form.service'
import { FormDetailAttr, setFormDetailAttr } from 'src/app/main/pages/global-attr'

const Controller = 'FormDetails'

@Component({
  selector: 'form-details',
  templateUrl: './form-details.component.html',
  styleUrls: ['./form-details.component.scss']
})
export class FormDetailsComponent {

  @Input() FormID: number
  @Input() EntityName: string
  @Input() DynamicFormType: number
  @Input() TabCount: number

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
  showCopyForm: boolean;
  ComboCopyUrl: string;
  getAttr() {
    this.showGrid = false
    let Attr = FormDetailAttr()
    !Attr ? this.service.getAttr(Controller).subscribe((res: any) => this.setAttr(res.Data, 'toLocal')) : this.setAttr(Attr)
  }

  setAttr(attr, type?) {
    this.gridOption.columnDefs = attr
    this.formObj = attr.EntityAttribute
    type == 'toLocal' ? setFormDetailAttr(attr) : null
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
  closeDynamicForm() {
    this.showDynamicForm = false
  }
  shDynamicForm() {
    this.showDynamicForm = false
    setTimeout(() => this.showDynamicForm = true, 300)
    
  }

  CopyDynamicForm(){
    this.showCopyForm = false
    setTimeout(() => this.showCopyForm = true, 300)
  }
  closeCopyForm() {
    this.showCopyForm = false
  }
  
  saveCopyForm(event) {
    if (!this.form.controls.ToFormID.value)
    {
      this.toastr.error('فرمی انتخاب نشده است', 'خطا')
      return
    }

    let text: string = 'در صورت انجام کپی، اطلاعات موجود در این فرم حذف میشود، آیا مطمئن هستید؟'
    AlertClass.questionAlert({ text: text }, _ => {
      this.service.get(`${Controller}/CopyDynamicForm/${this.form.controls.ToFormID.value}/${this.FormID}`).subscribe((res: any) => {
        this.showCopyForm = false
        this.getSelect()
      })
    })
  }
  constructor(private service: GridFormService, private formBuilder: UntypedFormBuilder, private toastr: ToastrService) { }
  modalOptions: ModalOptions
  modalOptionsCopy: ModalOptions
  form: UntypedFormGroup

  ngOnChanges(UpdatedValue: string): void 
  { 
      this.form = this.formBuilder.group({
        ToFormID: [null],
      })

    this.ComboCopyUrl = `*${Controller}/GetComboSameForms/${this.FormID}`
    this.getAttr() 
    this.modalOptions = {
      modatTitle: 'نمایش فرم',
      modalId: `ModalID${this.FormID}`,
      hideCallback: this.closeForm.bind(this),
    }  
    this.modalOptionsCopy = {
      formType: 'Add',
      modatTitle: 'کپی اطلاعات',
      modalId: `ModalIDCopy${this.FormID}`,
      hideCallback: this.closeCopyForm.bind(this),
      saveCallback: this.saveCopyForm.bind(this),
    }    
  }

}
