import { Component, Output, EventEmitter, Input } from '@angular/core'
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms'
import { ControlMessageService } from 'src/app/main/main-body/common/custom-form/control-message/control-message.service'
import { GridFormService } from 'src/app/main/main-body/common/grid-form.service'
import { Validation } from 'src/app/main/main-body/common/custom-form/control-message/Validation'
import { ModalOptions } from 'src/app/main/main-body/common/custom-modal/modal-options.interface'

const Controller = 'ImportSetting'

@Component({
  selector: 'import-setting-form',
  templateUrl: './import-setting-form.component.html',
  styleUrls: ['./import-setting-form.component.scss']
})
export class ImportSettingFormComponent {

  @Output() done = new EventEmitter()
  @Output() closed = new EventEmitter()
  @Input() ID: number
  @Input() formType: string
  @Input() formObj: any
  
  data: any = {}
  ParameterList: ImportDetailWSDTO[] = [];
  InputParameterTypeComboDto: any = []
  InputTypeComboDto: any = []

  getTInputTypeCombo() {
    this.service.get('OtherDetail/GetCombo/10093').subscribe((res: any) => {
      let data = res.Data
      this.InputParameterTypeComboDto = data.map(({ Id: Id, CodeDesc_Fld: CodeDesc_Fld }) => ({ Id, CodeDesc_Fld }))
    })

    this.service.get('OtherDetail/GetCombo/10102').subscribe((res: any) => {
      let data = res.Data
      this.InputTypeComboDto = data.map(({ Id: Id, CodeDesc_Fld: CodeDesc_Fld }) => ({ Id, CodeDesc_Fld }))
    })
  }

  // PropertyChange(event, index) {
  //     this.ParameterList[index].ParameterName_Fld = event.value
  //     this.ParameterList[index].InputType_Fld = null
  //     this.ParameterList[index].InputTypeDesc_Fld = null
  // }


  get() {
    this.service.getById(Controller, this.ID, this.formType).toPromise().then((res: any) => {
      if (!res || !res.Data) return this.done.emit(false)
      else {
        this.data = res.Data
        this.ParameterList = res.Data.ImportDetailWS
        this.setForm()
        if (this.ParameterList.length == 0)
          this.resetparamvalidation(false)
      }
    })
  }

  resetparamvalidation(type: boolean)
  {
    if (type){
      this.form.controls.WSUrl_Fld.setValidators(Validation.required())
      this.form.controls.WSMethodType_Fld.setValidators(Validation.required())
      // this.form.controls.ParameterName_Fld.setValidators(Validation.required())
      // this.form.controls.InputParameterType_Fld.setValidators(Validation.required())
    }
    else{
    this.form.controls.WSUrl_Fld.clearValidators()
    this.form.controls.WSMethodType_Fld.clearValidators()
    this.form.controls.ParameterName_Fld.clearValidators()
    this.form.controls.InputParameterType_Fld.clearValidators()
    }
  }
  addDetail() {
    this.ParameterList.push(new ImportDetailWSDTO())
    this.resetparamvalidation(true)
  }

  deleteRow(index) {
      this.ParameterList.splice(index, 1)
      if (this.ParameterList.length == 0)
      this.resetparamvalidation(false)
  }

  post() { 
    this.data = this.form.getRawValue()
    this.data.ImportDetailWS = this.ParameterList
    this.service.post(`${Controller}/Create`, this.data).subscribe((res: any) => { res && res.IsSuccess ? this.done.emit(res.Data) : null }) 
  }

  put() { 
    this.data = this.form.getRawValue()
    this.data.ImportDetailWS = this.ParameterList
    this.service.post(`${Controller}/Update`, this.data).subscribe((res: any) => { res && res.IsSuccess ? this.done.emit(res.Data) : null }) 
  }

  form: UntypedFormGroup
  showModal: boolean = false
  setForm() {
    Validation.form = this.formObj
    this.form = this.formBuilder.group({
      Id: [0],
      CodeDesc_Fld: [{ value: null, disabled: Validation.disable('CodeDesc_Fld') }, Validation.setValidator('CodeDesc_Fld')],
      TblNameDesc_Fld: [null],
      TblName_Fld: [{ value: null, disabled: Validation.disable('TblName_Fld') }, Validation.setValidator('TblName_Fld')],
      FileTypeDesc_Fld: [null],
      FileType_Fld: [{ value: null, disabled: Validation.disable('FileType_Fld') }, Validation.setValidator('FileType_Fld')],
      CodepageDesc_Fld: [null],
      Codepage_Fld: [{ value: null, disabled: Validation.disable('Codepage_Fld') }, Validation.setValidator('Codepage_Fld')],
      RowDelimiterDesc_Fld: [null],
      RowDelimiter_Fld: [{ value: null, disabled: Validation.disable('RowDelimiter_Fld') }, Validation.setValidator('RowDelimiter_Fld')],
      ColDelimiterDesc_Fld: [null],
      ColDelimiter_Fld: [{ value: null, disabled: Validation.disable('ColDelimiter_Fld') }, Validation.setValidator('ColDelimiter_Fld')],
      RowSkip_Fld: [{ value: null, disabled: Validation.disable('RowSkip_Fld') }, Validation.setValidator('RowSkip_Fld')],
      WSUrl_Fld: [{ value: null, disabled: Validation.disable('WSUrl_Fld') }, Validation.setValidator('WSUrl_Fld')],
      ParameterTitle_Fld: [{ value: null, disabled: Validation.disable('ParameterTitle_Fld') }, Validation.setValidator('ParameterTitle_Fld')],
      ParameterName_Fld: [{ value: null, disabled: Validation.disable('ParameterName_Fld') }, Validation.setValidator('ParameterName_Fld')],
      InputType_Fld: [{ value: null, disabled: Validation.disable('InputType_Fld') }, Validation.setValidator('InputType_Fld')],
      InputTypeDesc_Fld: [null],
      InputParameterType_Fld: [{ value: null, disabled: Validation.disable('InputParameterType_Fld') }, Validation.setValidator('InputParameterType_Fld')],
      InputParameterTypeDesc_Fld: [null],
      WSMethodType_Fld: [{ value: null, disabled: Validation.disable('WSMethodType_Fld') }, Validation.setValidator('WSMethodType_Fld')],
      WSMethodTypeDesc_Fld: [null],
      WSType_Fld: [{ value: null, disabled: Validation.disable('WSType_Fld') }, Validation.setValidator('WSType_Fld')],
      WSTypeDesc_Fld: [null],
      ParameterValue_Fld: [{ value: null, disabled: Validation.disable('ParameterValue_Fld') }, Validation.setValidator('ParameterValue_Fld')],
      WSDataName_Fld: [{ value: null, disabled: Validation.disable('WSDataName_Fld') }, Validation.setValidator('WSDataName_Fld')],
      ViewOrTblName_Fld: [{ value: null, disabled: Validation.disable('ViewOrTblName_Fld') }, Validation.setValidator('ViewOrTblName_Fld')],
      HireTypeID_Fld: [{ value: null, disabled: Validation.disable('HireTypeID_Fld') }, Validation.setValidator('HireTypeID_Fld')],
      ConnectionString_Fld: [{ value: null, disabled: Validation.disable('ConnectionString_Fld') }, Validation.setValidator('ConnectionString_Fld')],
      IdentityInsert_Fld: [{ value: null, disabled: Validation.disable('IdentityInsert_Fld') }, Validation.setValidator('IdentityInsert_Fld')],
      SoapBody_Fld: [{ value: null, disabled: Validation.disable('SoapBody_Fld') }, Validation.setValidator('SoapBody_Fld')],
      
      FormType:[{value: this.formType}],
    })
    if (this.formType != 'Add')
      this.form.patchValue(this.data)

    this.changeFileType()
    this.getTInputTypeCombo()
    this.showModal = true
  }

  changeFileType() {
    this.form.controls.Codepage_Fld.clearValidators()
    this.form.controls.RowDelimiter_Fld.clearValidators()
    this.form.controls.ColDelimiter_Fld.clearValidators()
    this.form.controls.WSUrl_Fld.clearValidators()
    this.form.controls.WSMethodType_Fld.clearValidators()
    this.form.controls.WSType_Fld.clearValidators()

   if (this.form.controls.FileType_Fld.value == 100491) {
      this.form.controls.Codepage_Fld.setValidators(Validation.required())
      this.form.controls.RowDelimiter_Fld.setValidators(Validation.required())
      this.form.controls.ColDelimiter_Fld.setValidators(Validation.required())
    }
    else {
      if (this.form.controls.FileType_Fld.value == 100494) {
        this.form.controls.WSUrl_Fld.setValidators(Validation.required())
        this.form.controls.WSMethodType_Fld.setValidators(Validation.required())
      }
      else
      {
      this.form.controls.Codepage_Fld.patchValue(null)
      this.form.controls.RowDelimiter_Fld.patchValue(null)
      this.form.controls.ColDelimiter_Fld.patchValue(null)

      this.resetparamvalidation(false)
      
      this.form.controls.WSUrl_Fld.patchValue(null)
      this.form.controls.WSMethodType_Fld.patchValue(null)
      this.form.controls.WSType_Fld.patchValue(null)
      this.form.controls.ParameterTitle_Fld.patchValue(null)
      this.form.controls.ParameterName_Fld.patchValue(null)
      this.form.controls.InputParameterType_Fld.patchValue(null)

      } 
    }

  }

  save() {
    if (this.form.invalid) return this.controlService.isSubmitted = true

    if (this.formType == 'Add') return this.post()

    if (this.formType == 'Edit') this.put()
  }

  modalOptions: ModalOptions

  close() {
    this.showModal = false
    this.closed.emit()
  }

  constructor(private controlService: ControlMessageService, private service: GridFormService, private formBuilder: UntypedFormBuilder) { }

  ngOnChanges(UpdatedValue: string): void {
    this.formType != 'Add' ? this.get() : this.setForm()
    this.modalOptions = {
      formType: this.formType,
      modatTitle: 'اطلاعات',
      saveCallback: this.save.bind(this),
      hideCallback: this.close.bind(this),
      maxWidth: 654
    }
  }

}

export class ImportDetailWSDTO {
  ParameterName_Fld: string = null
  ParameterTitle_Fld: string = null
  InputType_Fld: number = null
  InputTypeDesc_Fld: string = null
  InputParameterType_Fld: number = null
  InputParameterTypeDesc_Fld: string = null
  ParameterValue_Fld: string = null
}