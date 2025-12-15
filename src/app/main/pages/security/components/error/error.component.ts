import { Validation } from 'src/app/main/main-body/common/custom-form/control-message/Validation';
import { Component, OnInit } from '@angular/core'
import { CustomGridOption } from 'src/app/main/main-body/common/custom-ag-grid/interfaces/ag-grid-option.interface'
import { GridFormService } from 'src/app/main/main-body/common/grid-form.service'
import { ErrorAttr, setErrorAttr } from '../../../global-attr'
import { UntypedFormBuilder } from '@angular/forms'
import { AlertClass } from 'src/app/main/main-body/common/alert/alert-functions'
import { ToastrService } from 'ngx-toastr'

const Controller = 'Error'

@Component({
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.scss']
})
export class ErrorComponent implements OnInit {

  form = this.formBuilder.group({ date: [{ value: null }, Validation.required()] })

  showGrid: boolean = false

  gridOption = <CustomGridOption>{
    controllerName: Controller, rowClicked: this.onRowClicked.bind(this),
    checkboxSelection: true, rowSelected: this.rowSelected.bind(this)
  }

  getAttr() {
    this.showGrid = false
    let Attr = ErrorAttr()
    !Attr
      ? this.service.get(`${Controller}/GetAttributeSelectAll`).subscribe((res: any) => this.setAttr(res.Data, 'toLocal'))
      : this.setAttr(Attr)
  }

  canDelete: boolean = false
  setAttr(attr, type?) {
    this.canDelete = attr.EntityAccess.includes('DeletePolicy')
    this.gridOption.columnDefs = attr
    type == 'toLocal' ? setErrorAttr(attr) : null
    this.form.controls.date.patchValue(new Date().toLocaleDateString('fa-IR', { month: '2-digit', day: '2-digit', year: 'numeric', }).replace(/([۰-۹])/g, token => String.fromCharCode(token.charCodeAt(0) - 1728)).replace('/', '-').replace('/', '-'))
    this.getSelect()
  }

  getSelect() {
    if (!this.form.value.date) return this.toastr.error('تاریخ را وارد کنید', 'خطا')
    this.errorList = []
    this.ErrorDetail = null
    this.showGrid = false
    this.service.getSelect(Controller, this.form.value.date.replace('/', '-').replace('/', '-')).subscribe((res: any) => {
      this.gridOption.rowData = res.Data
      this.showGrid = true
    })
  }

  errorList = []
  rowSelected(event) { this.errorList.includes(event.data.Id) ? this.errorList = this.errorList.filter(a => a != event.data.Id) : this.errorList.push(event.data.Id) }

  delete() {
    if (!this.form.controls.date.value) return this.toastr.error('انتخاب حداقل یک خطا الزامی است', 'خطا')
    if (this.errorList.length == 0) return this.toastr.error('انتخاب حداقل یک خطا الزامی است', 'خطا')
    AlertClass.deleteAlert(_ => this.service.deleteByBody(`${Controller}/DeleteAll`, { IDCollect_Fld: this.errorList.toString() }).subscribe(_ => this.getSelect()))
  }

  parentId: number
  showGridAccess: boolean = false
  onRowClicked(event) {
    this.showGridAccess = false
    this.parentId = event.data.Id
    this.getErrorDetail()
  }

  ErrorDetail: string
  showErrorDetail: boolean = false
  getErrorDetail() {
    this.service.get(`${Controller}/Get/${this.parentId}`).subscribe((res: any) => {
      this.ErrorDetail = res.Data
      setTimeout(() => {
        this.service.scrollToElement('error-detail')
      }, 200); 
    })
  }

  download() {
    this.service.get(`${Controller}/GetLogFile/${this.form.value.date.replace('/', '-').replace('/', '-')}`).subscribe((res: any) => {
      const a = document.createElement("a");
      a.href = URL.createObjectURL(this.base64ToBlob(res.Data.FileContent, 'text/plain'))
      a.setAttribute("download", `${res.Data.FileName}.txt`)
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
    })
  }

  base64ToBlob(b64Data, contentType = '', sliceSize = 512) {
    b64Data = b64Data.replace(/\s/g, ''); //IE compatibility...
    let byteCharacters = atob(b64Data)
    let byteArrays = []
    for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
      let slice = byteCharacters.slice(offset, offset + sliceSize)
      let byteNumbers = new Array(slice.length)
      for (var i = 0; i < slice.length; i++)         byteNumbers[i] = slice.charCodeAt(i);
      let byteArray = new Uint8Array(byteNumbers)
      byteArrays.push(byteArray)
    }
    return new Blob(byteArrays, { type: contentType })
  }

  constructor(private service: GridFormService, private formBuilder: UntypedFormBuilder, private toastr: ToastrService) { }

  ngOnInit(): void { this.getAttr() }

}
