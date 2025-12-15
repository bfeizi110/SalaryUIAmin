import { Component, EventEmitter, Input, Output } from '@angular/core'
import { UntypedFormBuilder, FormControl, UntypedFormGroup, Validators } from '@angular/forms'

import { ControlMessageService } from 'src/app/main/main-body/common/custom-form/control-message/control-message.service'
import { Validation } from 'src/app/main/main-body/common/custom-form/control-message/Validation'
import { ModalOptions } from 'src/app/main/main-body/common/custom-modal/modal-options.interface'
import { GridFormService } from 'src/app/main/main-body/common/grid-form.service'

const Controller = 'FormMasterDetails'

@Component({
  selector: 'form-master-details-form',
  templateUrl: './form-master-details-form.component.html',
  styleUrls: ['./form-master-details-form.component.scss']
})
export class FormMasterDetailsFormComponent {

  @Output() done = new EventEmitter()
  @Output() closed = new EventEmitter()
  @Input() ID: number
  @Input() formType: string
  @Input() formObj: any
  @Input() FormID: number
  @Input() MasterID: number
  @Input() MasterType: number

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

  put(val: any) { this.service.post(`${Controller}/Update`, val).subscribe((res: any) => this.done.emit(res.Data)) }

  post(val: any) { 
    this.service.post(`${Controller}/Create`, val).subscribe((res: any) => this.done.emit(res.Data)) 
  }

  form: UntypedFormGroup
  setForm() {
    Validation.form = this.formObj
    this.form = this.formBuilder.group({
      Id: [0],
      FormID_Fld: this.FormID,
      TabNo_Fld: [{ value: null, disabled: Validation.disable('TabNo_Fld') }, Validation.setValidator('TabNo_Fld')],
      TabName_Fld: [{ value: null, disabled: Validation.disable('TabName_Fld') }, Validation.setValidator('TabName_Fld')],

      MasterPKeys_Fld: [{ value: null, disabled: Validation.disable('MasterPKeys_Fld') }, Validation.setValidator('MasterPKeys_Fld')],

      MasterDetailID_Fld: [{ value: null, disabled: Validation.disable('MasterDetailID_Fld') }, Validation.setValidator('MasterDetailID_Fld')],
      MasterDetailIDDesc_Fld: [null],
      
      DetailFormID_Fld: [{ value: null, disabled: Validation.disable('DetailFormID_Fld') }, Validation.setValidator('DetailFormID_Fld')],
      DetailFormIDDesc_Fld: [null],

      DetailFKeys_Fld: [{ value: null, disabled: Validation.disable('DetailFKeys_Fld') }, Validation.setValidator('DetailFKeys_Fld')],
      FormType:[{value: this.formType}]

    })
    if (this.formType != 'Add') {
      this.form.patchValue(this.data) 
    }
    this.data.DetailFKeys_Fld ? this.form.controls.DetailFKeys_Fld.patchValue(this.data.DetailFKeys_Fld.split(',').map(i => (i))) : null
    this.data.MasterPKeys_Fld ? this.form.controls.MasterPKeys_Fld.patchValue(this.data.MasterPKeys_Fld.split(',').map(i => (i))) : null

    this.getCombosMaster()
    if (this.formType != 'Add')
    {
      this.DetailFormUrl = `*Form/GetDetailFormCombo/${this.MasterID}`
      this.getCombos()
    }
    else
      this.changeMaster(this.MasterID)

    this.showModal = true
  }
 
  DetailFormUrl: string
  changeMaster(id: any) {
    this.DetailFormUrl = `*Form/GetDetailFormCombo/${id}`
    this.form.controls.DetailFormID_Fld.patchValue(null)
    this.form.controls.DetailFormIDDesc_Fld.patchValue(null)
    this.getCombos()
  }

  save() {
    if (this.form.invalid) return this.controlService.isSubmitted = true
    let fakeFormValue = { ...this.form.getRawValue() }
    this.fixMultiCombo(fakeFormValue)

    if (this.formType == 'Add') return this.post(fakeFormValue)

    if (this.formType == 'Edit') this.put(fakeFormValue)
  }

  fixMultiCombo(form) 
  { 
    if (form.DetailFKeys_Fld) form.DetailFKeys_Fld = form.DetailFKeys_Fld.toString() 
    if (form.MasterPKeys_Fld) form.MasterPKeys_Fld = form.MasterPKeys_Fld.toString() 
  }

  showModal: boolean = false
  close() {
    this.showModal = false
    this.closed.emit()
  }

  DetailFieldList=[]
  getCombos() 
  { 
    this.DetailFieldList= []
    this.form.controls.DetailFormID_Fld.value ? this.service.get(`Form/GetFormProperty/${this.form.controls.DetailFormID_Fld.value}/0`).subscribe((res: any) => 
    {
      res.Data.forEach(element => {
        this.DetailFieldList.push({Id: element.FieldName_Fld , CodeDesc_Fld: element.HeaderName_Fld + `(${element.FieldType_Fld})`})
      });
    }) : null
  }

  MasterFieldList= []
  getCombosMaster()  
  { 
    this.MasterFieldList= []
    this.MasterID ? this.service.get(`Form/GetFormProperty/${this.MasterID}/${this.form.controls.MasterDetailID_Fld.value ?? 0}`).subscribe((res: any) => 
    {
      res.Data.forEach(element => {
        this.MasterFieldList.push({Id: element.FieldName_Fld , CodeDesc_Fld: element.HeaderName_Fld + `(${element.FieldType_Fld})`})
      });
    }) : null

  }

  changeFormType(FormType: any, MasterFormType: any) {
    this.form.controls.EntityName_Fld.clearValidators()
    this.form.controls.MasterFormID_Fld.clearValidators()
    this.form.controls.MasterFormIDDesc_Fld.clearValidators()
    this.form.controls.MasterPKeys_Fld.clearValidators()

    if (FormType == 100954)
    {
      this.form.controls.EntityName_Fld.patchValue(null)
      this.formObj.EntityNameDesc_Fld.ishidden = true
      this.form.controls.MasterFormID_Fld.setValidators(Validation.required())
      this.formObj.MasterFormID_Fld.required = true
      this.form.controls.MasterFormIDDesc_Fld.setValidators(Validation.required())
      this.formObj.MasterFormIDDesc_Fld.required = true
      this.form.controls.MasterPKeys_Fld.setValidators(Validation.required())
      this.formObj.MasterPKeys_Fld.required = true
      if (MasterFormType == 100954)
      {
        this.form.controls.MasterDetailID_Fld.setValidators(Validation.required())
        this.formObj.MasterDetailID_Fld.required = true
        this.formObj.MasterDetailID_Fld.ishidden = false
        this.formObj.MasterDetailIDDesc_Fld.ishidden = false
      }
      else
      {
        this.form.controls.MasterDetailID_Fld.patchValue(null)
        this.formObj.MasterDetailID_Fld.ishidden = true
        this.form.controls.MasterDetailIDDesc_Fld.patchValue(null)
        this.formObj.MasterDetailIDDesc_Fld.ishidden = true
      }

      this.formObj.MasterFormID_Fld.ishidden = false
      this.formObj.MasterFormIDDesc_Fld.ishidden = false
      this.formObj.MasterPKeys_Fld.ishidden = false
    }
    else
    {
      this.form.controls.EntityName_Fld.setValidators(Validation.required())
      this.formObj.EntityName_Fld.required = true
      this.formObj.EntityNameDesc_Fld.ishidden = false

      this.form.controls.MasterFormID_Fld.patchValue(null)
      this.formObj.MasterFormID_Fld.ishidden = true
      this.form.controls.MasterFormIDDesc_Fld.patchValue(null)
      this.formObj.MasterFormIDDesc_Fld.ishidden = true
      this.form.controls.MasterPKeys_Fld.patchValue(null)
      this.formObj.MasterPKeys_Fld.ishidden = true

      this.form.controls.MasterDetailID_Fld.patchValue(null)
      this.formObj.MasterDetailID_Fld.ishidden = true
      this.form.controls.MasterDetailIDDesc_Fld.patchValue(null)
      this.formObj.MasterDetailIDDesc_Fld.ishidden = true
    }
  }  

  
  
  
  modalOptions: ModalOptions

  constructor(private controlService: ControlMessageService, private service: GridFormService, private formBuilder: UntypedFormBuilder) { }

  ngOnChanges(UpdatedValue: string): void {
    this.formType != 'Add' ? this.get() : this.setForm()
    this.modalOptions = {
      formType: this.formType,
      modatTitle: 'مشخصات فرم',
      saveCallback: this.save.bind(this),
      hideCallback: this.close.bind(this),
    }
  }

}
