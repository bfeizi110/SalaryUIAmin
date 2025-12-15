import { AfterViewChecked, ChangeDetectorRef, Component, EventEmitter, Input, Output, ViewChild } from '@angular/core'
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms'
import { AuthService } from 'src/app/auth/providers/auth.service'
import { LoaderService } from 'src/app/common/loader/loader.service'

import { ControlMessageService } from 'src/app/main/main-body/common/custom-form/control-message/control-message.service'
import { Validation } from 'src/app/main/main-body/common/custom-form/control-message/Validation'
import { ModalOptions } from 'src/app/main/main-body/common/custom-modal/modal-options.interface'
import { GridFormService } from 'src/app/main/main-body/common/grid-form.service'
import { FormCommentsComponent } from '../../../form-comments/form-comments.component'
import { ToastrService } from 'ngx-toastr'

const Controller = 'DynamicForm'
interface GroupObject {
  groupid: number;
  visible: boolean;
  groupname: string;
  fields: string[];
}
interface TabObject {
  maxGroup: Array<GroupObject>;
  TabName : string;
  Tabid: number;
}

@Component({
  selector: 'dynamic-form-form',
  templateUrl: './dynamic-form-form.component.html',
  styleUrls: ['./dynamic-form-form.component.scss']
})
export class DynamicFormFormComponent implements AfterViewChecked {
  private isFormInitialized = false;

  @Output() done = new EventEmitter()
  @Output() closed = new EventEmitter()
  @Output() buttonListDone = new EventEmitter()
  @Input() ID: number
  @Input() FormID: number
  @Input() WorkFlowID: number
  @Input() DynamicFormType: number
  @Input() FormType: string
  @Input() formObj: any
  @Input() formTabAttr: any
  @Input() ParentFormID: string
  @Input() ParentID: string
  @Input() MainFormID: number
  @Input() RequestEntryInfo: any
  @Input() ButtonList: any[]
  @Input() MasterDetailID: number
  @ViewChild(FormCommentsComponent) commentComponent!: FormCommentsComponent;

  maxGroup: Array<GroupObject> = [];
  maxTab: Array<TabObject> = [];
  personName: string
  showPerson: boolean = false
  haveComment: boolean = false
  commentGot: boolean = false
  haveTab: boolean = false

  getVisibleGroups(maxGroup: any): any{
    return maxGroup?.filter(g => g.visible) ?? [];
  }

  onShowPerson() {
    this.showPerson = true
  }

  clearPerson() {
    this.form.controls.PersonID_Fld.patchValue(null)
    this.personName = null
  }

  onSelectPersonnel(person) {
    this.personName = `${person.Name} ${person.Family}`
    this.form.controls.PersonID_Fld.patchValue(person.Id)
    this.showPerson = false
  }

  data: any = {}
  datafiles: any = {}
  get() {
    this.service.get(`${Controller}/Get/${this.FormID}/${this.ID}/${this.DynamicFormType}/${this.FormType == 'Edit'}/${this.RequestEntryInfo && this.RequestEntryInfo.EntryID ? this.RequestEntryInfo.EntryID : 0}/${this.RequestEntryInfo && this.RequestEntryInfo.RequestType ? this.RequestEntryInfo.RequestType : 0}/${this.WorkFlowID ? this.WorkFlowID : 0}`).toPromise().then((res: any) => {
      if (!res || !res.Data || !res.Data.Item1) 
        {
          // if (!res.IsSuccess && res.Message !='')
          //   this.toastr.error(res.Message)
          return this.closeForm()
        }
      else {
        this.data = res.Data.Item1
        this.datafiles = res.Data.Item2
        if (this.data && this.data.PersonID_FldDesc) this.personName = this.data.PersonID_FldDesc
        this.getHaveComment()
        this.setForm()
      }
    })
  }

  put(fakeFormValue: any) {
    var formData = new FormData();
    delete fakeFormValue['Files']
    formData.append('dto', JSON.stringify(fakeFormValue));
    if (this.form.controls['Files'])
      for (let index = 0; index < (this.form.controls['Files'].value).length; index++) {
        const element = this.form.controls['Files'].value[index]
        if (element.Files) {
          const files = element.Files as FileList;

          for (let i = 0; i < files.length; i++) {
            formData.append(`Files`, files[i], `${files[i].name}&&${element.FormDetailID}`);
          }
        }
      }

    this.service.post(`${Controller}/Update`, formData).subscribe((res: any) => this.done.emit(res.Data))
  }

  post(fakeFormValue: any) {
    var formData = new FormData();
    delete fakeFormValue['Files']
    formData.append('dto', JSON.stringify(fakeFormValue));
    if (this.form.controls['Files'])
      for (let index = 0; index < (this.form.controls['Files'].value).length; index++) {
        const element = this.form.controls['Files'].value[index]
        if (element.Files) {
          const files = element.Files as FileList;

          for (let i = 0; i < files.length; i++) {
            formData.append(`Files`, files[i], `${files[i].name}&&${element.FormDetailID}`);
          }
        }
      }

    this.service.post(`${Controller}/Create`, formData).subscribe((res: any) => {
      this.done.emit(res.Data)
      if(res.Data.RequestID)
      this.commentComponent.addComment(res.Data.RequestID)

    })
  }

  multiComboArray = {};
  form: FormGroup
  fields = [];
  setForm() {
    Validation.form = this.formObj

    this.buildForm()

    if (this.FormType != 'Add') {
      this.form.patchValue(this.data)
    }
    this.getCodes()
    this.showForm = true
  }

  commentgetDone() {
    this.commentGot = true
  }

  ngAfterViewChecked() {
    if (this.showForm && !this.isFormInitialized && (this.commentGot || !this.haveComment)) {
      this.isFormInitialized = true;
      this.cdr.detectChanges();
      this.loaderService.hide();
      this.service.scrollToElement('form');
    }
  }

  buildForm() {
    const formGroupFields = this.getFormControlsFields();
    this.form = new FormGroup(formGroupFields);
  }

  getFormControlsFields() {
    const formGroupFields = {};
    formGroupFields["Id"] = new FormControl(this.ID);
    formGroupFields["FormType"] = new FormControl(this.FormType);
    formGroupFields["DynamicFormID"] = new FormControl(this.FormID);
    formGroupFields["ParentID"] = new FormControl(this.ParentID);
    formGroupFields["DynamicFormType"] = new FormControl(this.DynamicFormType);
    formGroupFields["ParentFormID"] = new FormControl(this.ParentFormID);
    formGroupFields["MainFormID"] = new FormControl(this.MainFormID);
    formGroupFields["WorkFlowID"] = new FormControl(this.WorkFlowID);
    formGroupFields["EntryID"] = new FormControl(this.RequestEntryInfo ? this.RequestEntryInfo.EntryID : 0);
    formGroupFields["MasterDetailID"] = new FormControl(this.MasterDetailID);
    
    // formGroupFields["Files"] = this.formBuilder.array([this.createFileGroup(0)])

    let OldGroup: number = 1
    let OldGroupName: string
    let TabNo: number =  1
    for (const tab of this.formTabAttr) 
    {
      this.maxGroup = [];
      for (const field of Object.keys(this.formObj)) 
      {
        if (TabNo == this.formObj[field].tabno)
        {
          if (OldGroup != this.formObj[field].groupid) {
            this.maxGroup.push({ groupid: OldGroup, groupname: OldGroupName, fields: this.fields, visible: true })
            this.fields = []
            OldGroup = this.formObj[field].groupid
          }

          if (!this.formObj[field].ishidden) formGroupFields[field] = new FormControl({ value: this.FormType != 'Add' ? null : this.formObj[field].defaultvalue, disabled: Validation.disable(field) }, Validation.setValidator(field));
          if (this.formObj[field].field == field && !this.formObj[field].ishidden) this.fields.push(field);
          if (this.formObj[field].type == 'multiCombo' && !this.multiComboArray[field])
            this.service.getCombo('*DynamicForm/GetCombo/' + this.formObj[field].formdetailID).toPromise().then((res: any) =>
              this.multiComboArray[field] = res.Data)
          OldGroupName = this.formObj[field].group
          if (this.formObj[field].type == 'image')
            if (!formGroupFields["Files"])
              formGroupFields["Files"] = this.formBuilder.array([this.createFileGroup(this.formObj[field].formdetailID)])
            else
              formGroupFields["Files"].push(this.createFileGroup(this.formObj[field].formdetailID));
          }
      }
      if (OldGroup) this.maxGroup.push({ groupid: OldGroup, groupname: OldGroupName, fields: this.fields, visible: true })
      this.fields = []  
      this.maxTab.push({ maxGroup: this.maxGroup, Tabid: TabNo, TabName: tab })
      ++TabNo;
    }  
    // console.log(formGroupFields)
    if (this.maxTab[0].TabName != "")
      this.haveTab = true

    this.checkGroupVisible()

    return formGroupFields;
  }
  getFileData(formdetailID: number) {
    return this.datafiles && this.datafiles.length && this.datafiles.length != 0 ? this.datafiles.find(p => p.FormDetailID == formdetailID)?.Files : null
  }

  checkGroupVisible(){
    let visi: boolean = false
    for (const tab of this.maxTab){
      for (const group of tab.maxGroup){
        visi = false;
        for (const field of group.fields)
            visi = !this.formObj[field].ishidden && !this.formObj[field].isnewhidden;
        group.visible = visi;
      }
    }
  }

  createFileGroup(FormDetailID: number): FormGroup {
    return this.formBuilder.group({
      FormDetailID: [FormDetailID],
      Files: [null]
    });
  }

  fixCodes(form: any) {
    for (const field of Object.keys(form))
      if (form[field] && this.formObj[field] && this.formObj[field].type == 'multiCombo') form[field] = form[field].toString()
  }

  getCodes() {
    for (const field of Object.keys(this.form.controls)) {
      this.changeValue(field)
      if (this.form.controls[field] && this.form.controls[field].value && this.formObj[field] && this.formObj[field].type == 'multiCombo')
        this.form.controls[field].patchValue(this.form.controls[field].value.split(',').map(i => Number(i)))
    }
  }
  get files(): FormArray {
    return this.form.get('Files') as FormArray;
  }

  files1: File[] = [];
  filesChanged(fieldName: any, files: any) {
    for (let index = 0; index < this.form.controls['Files'].value.length; index++) {
      const element = (this.form.controls['Files'].value)[index];
      if (element.FormDetailID == this.formObj[fieldName].formdetailID)
        (this.form.controls['Files'].value)[index]["Files"] = files;
    }
    this.files1 = files
    let fileName = files.map(file => file.name).join(', ');
    this.form.controls[fieldName].patchValue(fileName)
    this.changeValue(fieldName)
  }

  setValue(val, type)
  {
    if (type == "bool")
      return val == null || val == "false" || val == false ? "false" : "true"
    else
      if (val != null)
        return val.toString()
      else
        return null
  }

  // && !(this.formObj[field].hiddeninrelate && this.formObj[field].fieldrelatenameinhidden && 
  //   ((this.formObj[field].fieldrelatevalueinhidden == null || setValue(this.form.controls[this.formObj[field].fieldrelatenameinhidden].value,this.formObj[this.formObj[field].fieldrelatenameinhidden].type) == setValue(this.formObj[field].fieldrelatevalueinhidden,this.formObj[this.formObj[field].fieldrelatenameinhidden].type))))



  changeValue(fieldName: any) {
    for (const field of Object.keys(this.formObj))
    {
      if (this.formObj[field].fieldrelatenameinhidden == fieldName && this.formObj[field].hiddeninrelate == true){
        if ((this.formObj[field].fieldrelatevalueinhidden == null || this.setValue(this.form.controls[fieldName].value,this.formObj[fieldName].type) == this.setValue(this.formObj[field].fieldrelatevalueinhidden,this.formObj[fieldName].type)))
          this.formObj[field].isnewhidden = true
        else
          this.formObj[field].isnewhidden = false
      }
      if (this.formObj[field].fieldrelatenameinrequire == fieldName && this.formObj[field].requireinrelate == true)
        if (this.setValue(this.form.controls[fieldName].value,this.formObj[fieldName].type)  == this.setValue(this.formObj[field].fieldrelatevalueinrequire,this.formObj[fieldName].type)) {
          this.form.controls[field].setValidators([Validation.required()])
          this.form.controls[field].updateValueAndValidity()
          this.formObj[field].require = true
        }
        else
          if (this.formObj[field].mainrequire == false) {
            this.form.controls[field].clearValidators()
            this.form.controls[field].updateValueAndValidity()
            this.formObj[field].require = false
          }
    }
    this.checkGroupVisible()
  }

  save() {
    let fakeFormValue = { ...this.form.getRawValue() }
    this.fixCodes(fakeFormValue)

    if (this.form.invalid) return this.controlService.isSubmitted = true

    if (this.FormType == 'Add') return this.post(fakeFormValue)

    if (this.FormType == 'Edit') this.put(fakeFormValue)
  }

  showForm: boolean = false
  closeForm() {
    this.loaderService.hide();
    this.closed.emit()
  }

  async getHaveComment() {
    await this.service.get(`${Controller}/HaveComment/${this.FormID ?? this.MainFormID}`).toPromise().then((res: any) => {
      if (!res)
        this.haveComment = false
      else
        this.haveComment = res.Data.Id > 0
    })
  }

  clickButtonList(code: number) {
    this.buttonListDone.emit(code)
  }

  modalOptions: ModalOptions

  constructor(private authService: AuthService, private cdr: ChangeDetectorRef, private controlService: ControlMessageService, private loaderService: LoaderService, private service: GridFormService, private formBuilder: FormBuilder, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.loaderService.show();
    this.FormType != 'Add' ? this.get() : this.setForm()
    this.modalOptions = {
      formType: this.FormType,
      modatTitle: 'مشخصات فرم',
      saveCallback: this.save.bind(this),
      hideCallback: this.closeForm.bind(this),
    }
  }

}
