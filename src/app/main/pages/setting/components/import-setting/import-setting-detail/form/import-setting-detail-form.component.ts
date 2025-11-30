import { Component, EventEmitter, Input, Output } from '@angular/core'
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms'

import { ControlMessageService } from 'src/app/main/main-body/common/custom-form/control-message/control-message.service'
import { Validation } from 'src/app/main/main-body/common/custom-form/control-message/Validation'
import { ModalOptions } from 'src/app/main/main-body/common/custom-modal/modal-options.interface'
import { GridFormService } from 'src/app/main/main-body/common/grid-form.service'

const Controller = 'ImportSettingDetail'

@Component({
  selector: 'import-detail-form',
  templateUrl: './import-setting-detail-form.component.html',
  styleUrls: ['./import-setting-detail-form.component.scss']
})
export class ImportSettingDetailFormComponent {

  @Output() done = new EventEmitter()
  @Output() closed = new EventEmitter()
  @Input() ID: number
  @Input() formType: string
  @Input() formObj: any
  @Input() importSettingId: number
  @Input() tableName: string
  @Input() hireTypeID: string

  sourceFixValueIsCombo: boolean = false

  destinationFieldNameList: [] = []
  getDestinationFieldName() { this.destinationFieldNameList.length == 0 ? this.service.getCombo(this.destinationFieldNameUrl).subscribe((res: any) => this.destinationFieldNameList = res.Data) : null }

  entityPropertyUrl: string
  changeCvnTblName() {
    this.entityPropertyUrl = `*EntityProperty/GetComboIDDesc/${this.form.controls.CnvTblName_Fld.value}/null/1`
    if (this.form.controls.CnvTblName_Fld.value) {
      this.form.controls.CnvFldName_Fld.enable()
      this.form.controls.CnvFinalFldName_Fld.enable()
    }
    else {
      this.form.controls.CnvFldName_Fld.disable()
      this.form.controls.CnvFinalFldName_Fld.disable()
    }
  }

  changeCvnType() {
      this.form.controls.CnvCond_Fld.disable()
      this.form.controls.CnvTblName_Fld.disable()
      this.form.controls.CnvFldName_Fld.disable()
      this.form.controls.CnvFinalFldName_Fld.disable()

    if (this.form.controls.CnvType_Fld.value == 101302) {
      this.form.controls.CnvCond_Fld.enable()
    }
    if (this.form.controls.CnvType_Fld.value == 101301) {
      this.form.controls.CnvTblName_Fld.enable()
    }
  }

  data: any = {}
  get() {
    this.service.getById(Controller, this.ID, this.formType).toPromise().then((res: any) => {
      if (!res || !res.Data) return this.done.emit(false)
      else {
        this.data = res.Data
        this.setForm()
      }
    })
  }

  post() { this.service.post(`${Controller}/Create`, this.form.getRawValue()).subscribe((res: any) => { res && res.IsSuccess ? this.done.emit(res.Data) : null }) }

  put() { this.service.post(`${Controller}/Update`, this.form.getRawValue()).subscribe((res: any) => { res && res.IsSuccess ? this.done.emit(res.Data) : null }) }

  form: UntypedFormGroup
  setForm() {
    Validation.form = this.formObj
    this.form = this.formBuilder.group({
      Id: [0],
      ImportID_Fld: [this.importSettingId],
      DestinationFieldNameDesc_Fld: [null],
      DestinationFieldName_Fld: [{ value: null, disabled: Validation.disable('DestinationFieldName_Fld') }, Validation.setValidator('DestinationFieldName_Fld')],
      SourceTypeDesc_Fld: [null],
      SourceType_Fld: [{ value: null, disabled: Validation.disable('SourceType_Fld') }, Validation.setValidator('SourceType_Fld')],
      SourceCol_Fld: [{ value: null, disabled: Validation.disable('SourceCol_Fld') }, Validation.setValidator('SourceCol_Fld')],
      SourceFixValue_Fld: [{ value: null, disabled: Validation.disable('SourceFixValue_Fld') }, Validation.setValidator('SourceFixValue_Fld')],
      SystemTypeDesc_Fld: [null],
      SystemType_Fld: [{ value: null, disabled: Validation.disable('SystemType_Fld') }, Validation.setValidator('SystemType_Fld')],
      CnvTblNameDesc_Fld: [null],
      CnvTblName_Fld: [{ value: null, disabled: Validation.disable('CnvTblName_Fld') }, Validation.setValidator('CnvTblName_Fld')],
      CnvTypeDesc_Fld: [null],
      CnvType_Fld: [{ value: null, disabled: Validation.disable('CnvType_Fld') }, Validation.setValidator('CnvType_Fld')],
      CnvCond_Fld: [{ value: null, disabled: Validation.disable('CnvCond_Fld') }, Validation.setValidator('CnvCond_Fld')],
      CnvCondNoTransfer_Fld: [{ value: null, disabled: Validation.disable('CnvCondNoTransfer_Fld') }, Validation.setValidator('CnvCondNoTransfer_Fld')],
      CnvFldNameDesc_Fld: [null],
      CnvFldName_Fld: [{ value: null, disabled: Validation.disable('CnvFldName_Fld') }, Validation.setValidator('CnvFldName_Fld')],
      CnvFinalFldNameDesc_Fld: [null],
      CnvFinalFldName_Fld: [{ value: null, disabled: Validation.disable('CnvFinalFldName_Fld') }, Validation.setValidator('CnvFinalFldName_Fld')],
      FormType:[{value: this.formType}]
    })
    if (this.formType != 'Add')
      this.form.patchValue(this.data)

    this.changeSourceType()
    this.changeCvnTblName()
    this.changeCvnType()
    this.showModal = true
  }

  save() {
    if (this.form.invalid) return this.controlService.isSubmitted = true

    if (this.formType == 'Add') return this.post()

    if (this.formType == 'Edit') this.put()
  }

  changeSourceType() {
    this.formObj.SourceCol_Fld.ishidden = true
    this.formObj.SystemTypeDesc_Fld.ishidden = true
    this.formObj.SourceFixValue_Fld.ishidden = true

    if (this.form.controls.SourceType_Fld.value == 100701 || this.form.controls.SourceType_Fld.value == 100705) {
      this.form.controls.SourceCol_Fld.enable()
      this.form.controls.SourceCol_Fld.setValidators(Validation.required())

      this.form.controls.SystemType_Fld.patchValue(null)
      this.form.controls.SystemType_Fld.disable()
      this.form.controls.SystemType_Fld.clearValidators()

      this.form.controls.SourceFixValue_Fld.patchValue(null)
      this.form.controls.SourceFixValue_Fld.disable()
      this.form.controls.SourceFixValue_Fld.clearValidators()
      this.sourceFixValueIsCombo = false
    }
    else if (this.form.controls.SourceType_Fld.value == 100702) {
      this.form.controls.SystemType_Fld.enable()
      this.form.controls.SystemType_Fld.setValidators(Validation.required())

      this.form.controls.SourceCol_Fld.patchValue(null)
      this.form.controls.SourceCol_Fld.disable()
      this.form.controls.SourceCol_Fld.clearValidators()

      this.form.controls.SourceFixValue_Fld.patchValue(null)
      this.form.controls.SourceFixValue_Fld.disable()
      this.form.controls.SourceFixValue_Fld.clearValidators()
      this.sourceFixValueIsCombo = false
    }
    else if (this.form.controls.SourceType_Fld.value == 100703) {
      this.form.controls.SystemType_Fld.patchValue(null)
      this.form.controls.SystemType_Fld.disable()
      this.form.controls.SystemType_Fld.clearValidators()

      this.form.controls.SourceCol_Fld.patchValue(null)
      this.form.controls.SourceCol_Fld.disable()
      this.form.controls.SourceCol_Fld.clearValidators()

      this.form.controls.SourceFixValue_Fld.enable()
      this.form.controls.SourceFixValue_Fld.setValidators(Validation.required())
      this.changeDestinationFieldName()
    }

    else {
      this.form.controls.SystemType_Fld.patchValue(null)
      this.form.controls.SystemType_Fld.disable()
      this.form.controls.SystemType_Fld.clearValidators()

      this.form.controls.SourceCol_Fld.patchValue(null)
      this.form.controls.SourceCol_Fld.disable()
      this.form.controls.SourceCol_Fld.clearValidators()

      this.form.controls.SourceFixValue_Fld.patchValue(null)
      this.form.controls.SourceFixValue_Fld.disable()
      this.form.controls.SourceFixValue_Fld.clearValidators()
      this.sourceFixValueIsCombo = false
    }
    setTimeout(() => {
      this.formObj.SourceCol_Fld.ishidden = false
      this.formObj.SystemTypeDesc_Fld.ishidden = false
      this.formObj.SourceFixValue_Fld.ishidden = false
    })
  }

  sourceFixValueComboUrl: string
  changeDestinationFieldName() {
    if (!this.form.controls.SourceType_Fld.value || !this.form.controls.DestinationFieldName_Fld.value) return this.sourceFixValueIsCombo = false
    let id = this.form.controls.DestinationFieldName_Fld.value
    let selected: any = this.destinationFieldNameList.filter((a: any) => a.Id == id)[0]
    if (this.form.controls.SourceType_Fld.value == 100703 && selected.IsCombo_Fld) {
      this.sourceFixValueComboUrl = `*EntityProperty/GetEntityPropertyCombo/${this.tableName}/${id}`
      this.sourceFixValueIsCombo = true
    }
    else this.sourceFixValueIsCombo = false
  }

  showModal: boolean = false
  close() {
    this.showModal = false
    this.closed.emit()
  }

  modalOptions: ModalOptions

  constructor(private controlService: ControlMessageService, private service: GridFormService, private formBuilder: UntypedFormBuilder) { }

  destinationFieldNameUrl: string = ''
  ngOnChanges(UpdatedValue: string): void {
    this.destinationFieldNameUrl = `*EntityProperty/GetComboIDDesc/${this.tableName}/${this.hireTypeID}/0`
    this.getDestinationFieldName()
    this.formType != 'Add' ? this.get() : this.setForm()
    this.modalOptions = {
      formType: this.formType,
      modatTitle: 'جزئیات اطلاعات',
      saveCallback: this.save.bind(this),
      hideCallback: this.close.bind(this),
      maxWidth: 654
    }
  }

}
