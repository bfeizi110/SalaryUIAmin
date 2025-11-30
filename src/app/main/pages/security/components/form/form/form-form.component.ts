import { Component, EventEmitter, Input, Output } from '@angular/core'
import { UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms'

import { ControlMessageService } from 'src/app/main/main-body/common/custom-form/control-message/control-message.service'
import { Validation } from 'src/app/main/main-body/common/custom-form/control-message/Validation'
import { ModalOptions } from 'src/app/main/main-body/common/custom-modal/modal-options.interface'
import { GridFormService } from 'src/app/main/main-body/common/grid-form.service'

const Controller = 'Form'

@Component({
  selector: 'form-form',
  templateUrl: './form-form.component.html',
  styleUrls: ['./form-form.component.scss']
})
export class FormFormComponent {

  @Output() done = new EventEmitter()
  @Output() closed = new EventEmitter()
  @Input() ID: number
  @Input() formType: string
  @Input() formObj: any

  data: any = {}
  get() {
    this.service.getById(Controller, this.ID, this.formType).toPromise().then((res: any) => {
      if (!res || !res.Data) return this.done.emit(false)
      else {
        this.data = res.Data
        this.setForm()
        this.changeFormType(res.Data.FormType_Fld)
        this.GetTabNames()
      }
    })
  }

  put(val: any) { this.service.post(`${Controller}/Update`, val).subscribe((res: any) => this.done.emit(res.Data)) }

  post(val: any) { 
    this.service.post(`${Controller}/Create`, val).subscribe((res: any) => this.done.emit(res.Data)) 
  }

  SetTabNames(){
    let Tab: string = ''
    for (let index = 1; index <= this.form.controls.TabCount_Fld.value ; index++) 
    {  
      if (this.form.controls[`TabName${index}`]) Tab = Tab + this.form.controls[`TabName${index}`].value + ';;'
    }
    if (this.form.controls.TabCount_Fld.value && this.form.controls.TabCount_Fld.value >= 1)
      Tab = Tab.substring(0, Tab.length-2)
      this.form.controls.TabNames_Fld.patchValue(Tab) ;
  }
  
  GetTabNames(){
    if (this.form.controls.TabCount_Fld.value && this.form.controls.TabCount_Fld.value > 0)
    {
      this.numbers
      for (let index = 0; index < this.form.controls.TabNames_Fld.value.split(';;').length ; index++) 
      {  
        this.form.controls[`TabName${index+1}`].patchValue(this.form.controls.TabNames_Fld.value.split(';;')[index])
      }
    }
  }

  form: UntypedFormGroup
  setForm() {
    Validation.form = this.formObj
    this.form = this.formBuilder.group({
      Id: [0],
      CodeDesc_Fld: [{ value: null, disabled: Validation.disable('CodeDesc_Fld') }, Validation.setValidator('CodeDesc_Fld')],
      EntityNameDesc_Fld: [null],
      EntityName_Fld: [{ value: null, disabled: Validation.disable('EntityName_Fld') }, Validation.setValidator('EntityName_Fld')],
      FormTypeDesc_Fld: [null],
      FormType_Fld: [{ value: null, disabled: Validation.disable('FormType_Fld') }, Validation.setValidator('FormType_Fld')],
      RowDefaultCount_Fld: [{ value: null, disabled: Validation.disable('RowDefaultCount_Fld') }, Validation.setValidator('RowDefaultCount_Fld')],
      RowDefaultCountDesc_Fld: [null],

      MasterFormID_Fld: [{ value: null, disabled: Validation.disable('MasterFormID_Fld') }, Validation.setValidator('MasterFormID_Fld')],
      MasterFormIDDesc_Fld: [null],
      
      ReportFileName_Fld: [{ value: null, disabled: Validation.disable('ReportFileName_Fld') }, Validation.setValidator('ReportFileName_Fld')],
      TabCount_Fld: [{ value: null, disabled: Validation.disable('TabCount_Fld') }, Validation.setValidator('TabCount_Fld')],
      TabNames_Fld: [{ value: null, disabled: Validation.disable('TabNames_Fld') }, Validation.setValidator('TabNames_Fld')],
      FormType:[{value: this.formType}]

    })
    if (this.formType != 'Add') {
      this.form.patchValue(this.data) 
    }
    this.showModal = true
  }
 
  TabNames: string[] = []

  get numbers(): number[] {
    if (this.form.controls.TabCount_Fld.value > 10) this.form.controls.TabCount_Fld.patchValue(10)
    for (let index = 1; index <= this.form.controls.TabCount_Fld.value ; index++) 
    {  
      this.form.addControl(`TabName${index}`, new UntypedFormControl('', Validators.required));
    }
    for (let index = Number(this.form.controls.TabCount_Fld.value) + 1; index <= 10; index++) 
    {  
      this.form.removeControl(`TabName${index}`);
    }
    return Array.from({ length: this.form.controls.TabCount_Fld.value }, (_, i) => i + 1);
  }

  changeFormType(FormType: any) {
    this.form.controls.EntityName_Fld.clearValidators()
    this.form.controls.MasterFormID_Fld.clearValidators()
    this.form.controls.MasterFormIDDesc_Fld.clearValidators()
  
    if (FormType == 100954)
    {
      this.form.controls.EntityName_Fld.patchValue(null)
      this.formObj.EntityNameDesc_Fld.ishidden = true
      this.form.controls.MasterFormID_Fld.setValidators(Validation.required())
      this.formObj.MasterFormID_Fld.required = true
      this.form.controls.MasterFormIDDesc_Fld.setValidators(Validation.required())
      this.formObj.MasterFormIDDesc_Fld.required = true

      this.formObj.MasterFormID_Fld.ishidden = false
      this.formObj.MasterFormIDDesc_Fld.ishidden = false
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
    }
  }  
  save() {
    if (this.form.invalid) return this.controlService.isSubmitted = true
    this.SetTabNames()
    let fakeFormValue = { ...this.form.getRawValue() }

    if (fakeFormValue.MasterPKeys_Fld) fakeFormValue.MasterPKeys_Fld = fakeFormValue.MasterPKeys_Fld.toString() 

    if (this.formType == 'Add') return this.post(fakeFormValue)

    if (this.formType == 'Edit') this.put(fakeFormValue)
  }

  showModal: boolean = false
  close() {
    this.showModal = false
    this.closed.emit()
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
