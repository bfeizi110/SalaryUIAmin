import { WhereComponent } from './../../../report-design/report-design-filter/where/where.component';
import { map } from 'rxjs/operators';
import { Component, EventEmitter, Input, Output } from '@angular/core'
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms'

import { ControlMessageService } from 'src/app/main/main-body/common/custom-form/control-message/control-message.service'
import { Validation } from 'src/app/main/main-body/common/custom-form/control-message/Validation'
import { ModalOptions } from 'src/app/main/main-body/common/custom-modal/modal-options.interface'
import { GridFormService } from 'src/app/main/main-body/common/grid-form.service'

const Controller = 'EntityMProperty'

@Component({
  selector: 'entitym-property-form',
  templateUrl: './entitym-property-form.component.html',
  styleUrls: ['./entitym-property-form.component.scss']
})
export class EntityMPropertyFormComponent {

  @Output() done = new EventEmitter()
  @Output() closed = new EventEmitter()
  @Input() ID: number
  @Input() EntityName: string
  @Input() formType: string
  @Input() formObj: any

  sourceFixValueIsCombo: boolean = false

  data: any = {}
  get() {
    this.FieldFrameList =[]
    this.service.getById(Controller, this.ID, this.formType).toPromise().then((res: any) => {
      if (!res || !res.Data) return this.done.emit(false)
      else {
        this.data = res.Data
        this.pKeyArray = res.Data.RelationToFields_Fld
        this.FieldArray = res.Data.RelationFromFields_Fld
           
          for (var i = 0; i < this.FieldArray.length; i++)
            this.FieldFrameList.push(this.FieldArray[i])
        this.setForm()
      }
    })
  }

  post(fakeFormValue) { this.service.post(`${Controller}/Create`, fakeFormValue).subscribe((res: any) => this.done.emit(res.Data)) }

  put(fakeFormValue) { this.service.post(`${Controller}/Update`, fakeFormValue).subscribe((res: any) => this.done.emit(res.Data)) }

  ShowRelationTo:boolean = false
  form: UntypedFormGroup
  setForm() {
    Validation.form = this.formObj
    this.form = this.formBuilder.group({
      Id: [0],
      EntityName_Fld: [this.EntityName],
      PropertyName_Fld: [{ value: null, disabled: Validation.disable('PropertyName_Fld') }, Validation.setValidator('PropertyName_Fld')],
      HeaderName_Fld: [{ value: null, disabled: Validation.disable('HeaderName_Fld') }, Validation.setValidator('HeaderName_Fld')],
      Type_Fld: [{ value: null, disabled: Validation.disable('Type_Fld') }, Validation.setValidator('Type_Fld')],
      Require_Fld: [{ value: null, disabled: Validation.disable('Require_Fld') }, Validation.setValidator('Require_Fld')],
      RelationTo_Fld: [{ value: null, disabled: Validation.disable('RelationTo_Fld') }, Validation.setValidator('RelationTo_Fld')],
      RelationToDesc_Fld: [{ value: null, disabled: Validation.disable('RelationToDesc_Fld') }, Validation.setValidator('RelationToDesc_Fld')],
      IsSystem_Fld: [{ value: null, disabled: Validation.disable('IsSystem_Fld') }, Validation.setValidator('IsSystem_Fld')],
      RelationFromFields_Fld: [{ value: null, disabled: Validation.disable('RelationFromFields_Fld') }, Validation.setValidator('RelationFromFields_Fld')],
      RelationToFields_Fld: [{ value: null, disabled: Validation.disable('RelationToFields_Fld') }, Validation.setValidator('RelationToFields_Fld')],
      StringLength_Fld: [{ value: null, disabled: Validation.disable('StringLength_Fld') }, Validation.setValidator('StringLength_Fld')],
      Query_Fld: [{ value: null, disabled: Validation.disable('Query_Fld') }, Validation.setValidator('Query_Fld')],

      FormType:[{value: this.formType}]
    })
    if (this.formType != 'Add')
    {
      this.form.patchValue(this.data)
      this.FieldArray = this.data.RelationFromFields_Fld
      this.pKeyArray = this.data.RelationToFields_Fld
      // if (this.FieldArray)
      // for (var i = 0; i < this.FieldArray.length; i++)
      //   this.FieldFrameList.push(this.FieldArray[i])
    }

    this.getCombos()
    setTimeout(() => {
      this.showModal = true
    }, 200); 
  }

  pKeyArray: any
  FieldArray: any
  Query: any
  FieldFrameList: any =[]
  F = {FieldID_Fld: 0, FieldName_Fld: '', HeaderName_Fld: '', FieldType_Fld:''} 

  RelationToChange(event: any) {
    this.FieldFrameList =[]
    this.service.get(`${Controller}/GetPK/${this.EntityName}/${event}`).subscribe((res: any) => {
      this.pKeyArray = res.Data.Item1
      this.FieldArray = res.Data.Item2
      this.Query = res.Data.Item3

      this.form.controls.Query_Fld.setValue(this.Query)
      if (this.FieldArray)
      for (var i = 0; i < this.pKeyArray.length; i++)
        this.FieldFrameList.push(new FieldDto())

      if (this.formType == 'Add')
      {
        this.F.HeaderName_Fld = 'فیلد جاری'
        this.F.FieldName_Fld = 'MyFieldName'
        this.FieldArray.push(this.F)
      }  
    }) 
  }  

  HeaderChange(event: any) {
    this.FieldArray.forEach(element => {
      element.FieldName_Fld == 'MyFieldName' ? element.HeaderName_Fld = event : null
    });
  
  }
  TypeChange(event: any) {
    this.ShowRelationTo = (event == 'string' || event == 'int' || event == 'long') ? true : false

    this.formObj.RelationToDesc_Fld.ishidden = !this.ShowRelationTo
  }  

  getCombos() {
    this.formObj.RelationTo_Fld && this.RelationToArray.length == 0 ? this.getRelationToType() : null
    this.formObj.Type_Fld && this.TypeToArray.length == 0 ? this.getTypeToArray() : null
  }

  RelationToArray = []
  getRelationToType() { 
    this.service.get('Entity/GetComboInParent/100924').subscribe((res: any) => {
      this.RelationToArray = res.Data
    }) 
    // this.RelationToChange(this.data.RelationTo_Fld)    
  }

  TypeToArray = []
  getTypeToArray() { 
    this.service.getCombo('OtherDetail/10093').subscribe((res: any) => {
      this.TypeToArray = res.Data
      this.TypeToArray.forEach(element => {
        element.Id = element.CodeDesc_Fld
      });
    }) 
  }

  save() {
    if (this.formType == 'Add') this.form.controls.PropertyName_Fld.setValue('Prop')
    let fakeFormValue = { ...this.form.getRawValue() }

    if (this.pKeyArray) fakeFormValue.RelationToFields_Fld = this.pKeyArray
    if (this.FieldFrameList) 
    {
      this.FieldFrameList.forEach(element => {
        let Type = this.FieldArray.find(p => p.FieldName_Fld == element.FieldName_Fld)?.FieldType_Fld
        element.FieldType_Fld = Type ? Type :  fakeFormValue.Type_Fld
      });
      fakeFormValue.RelationFromFields_Fld = this.FieldFrameList
    }
    if (fakeFormValue.RelationTo_Fld) fakeFormValue.RelationTo_Fld = fakeFormValue.RelationTo_Fld.toString()
    if (fakeFormValue.Type_Fld) fakeFormValue.Type_Fld = this.TypeToArray.find(a => a.Id == fakeFormValue.Type_Fld).CodeDesc_Fld
  
    if (this.form.invalid) return this.controlService.isSubmitted = true

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

  destinationFieldNameUrl: string = ''
  ngOnChanges(UpdatedValue: string): void {
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

export class FieldDto {
  FieldID_Fld: number = 0
  FieldName_Fld: string = null
  HeaderName_Fld: string = null
  FieldType_Fld: string = null
}