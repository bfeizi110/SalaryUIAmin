import { Component, OnInit } from '@angular/core'
// import { NgWizardConfig, NgWizardService, StepChangedArgs, StepValidationArgs, STEP_STATE, THEME } from 'ng-wizard'
import { ToastrService } from 'ngx-toastr'
import { LoaderService } from 'src/app/common/loader/loader.service'
import { CustomGridOption } from 'src/app/main/main-body/common/custom-ag-grid/interfaces/ag-grid-option.interface'
import { GridFormService } from 'src/app/main/main-body/common/grid-form.service'
import { ImportAttr, setImportAttr } from '../../../global-attr'
import { of } from 'rxjs'
import { ImportDetailWSDTO } from '../../../setting/components/import-setting/form/import-setting-form.component'
import { UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms'
import { ControlMessageService } from 'src/app/main/main-body/common/custom-form/control-message/control-message.service'
import { get } from 'http'

const Controller = 'Import'

@Component({
  templateUrl: './import.component.html',
  styleUrls: ['./import.component.scss']
})
export class ImportComponent implements OnInit {

   showGrid: boolean = false
  CanDuplicate: boolean = false
  NotCheckUniqueField: boolean = false

  gridOption = <CustomGridOption>{
    controllerName: Controller,
    rowClicked: this.rowClicked.bind(this)
  }

  getAttr() {
    this.showGrid = false
    let Attr = ImportAttr()
    !Attr
      ? this.service.getAttr('ImportSetting').subscribe((res: any) => this.setAttr(res.Data, 'toLocal'))
      : this.setAttr(Attr)
  }

  setAttr(attr, type?) {
    this.gridOption.columnDefs = attr
    type == 'toLocal' ? setImportAttr(attr) : null
    this.getSelect()
  }

  getSelect() {
    this.showGrid = false
    this.service.getSelect(Controller, 0).subscribe((res: any) => {
      this.gridOption.rowData = res.Data
      this.showGrid = true
    })
  }

  model = new Model()
  data: any
  form: boolean = false
  withoutFie: boolean = false
  inputvalue: string
  ParameterList: ImportDetailWSDTO[] = [];
  showWSParam: boolean = false;
  showViewTable: boolean = false;
  rowClicked(event) {
    this.model = new Model()
    this.modelToPost = new ModelToPost()
    // this.stepStatesTab2.disabled = STEP_STATE.disabled
    this.inputvalue = null
    this.showGrid2 = false
    this.data = event.data
    this.model.Id = event.data.Id
    if (event.data.FileTypeTemp_Fld == "WS")
    {
      // this.stepStatesTab2.disabled = null
      this.form = false
      this.ParameterList = event.data.importSettingDetailWs
      this.showWSParam = true
    }
    else
    {
      if (event.data.FileTypeTemp_Fld.includes("view"))
      {
        this.form = false
        this.showWSParam = false
        this.showViewTable = true
      }
      else
      {
        this.form = true
        this.showWSParam = false
      }
    }
  }

  inputChange(event) {
    this.modelToPost = new ModelToPost()
    // this.stepStatesTab2.disabled = STEP_STATE.disabled
    // this.stepStatesTab3.disabled = STEP_STATE.disabled
    this.dynamicList = []
    if (event.target.files && event.target.files.length > 0) {
      this.loaderService.show()
      var file = event.target.files[0]
      var extType: string = this.data.FileTypeTemp_Fld.split(',')
      this.model.FileName = file.name

      // if (extType.includes('xls') || extType.includes('xlsx') || extType.includes('dbf'))
        this.uploadFile(file)

      // else {
      //   this.model = new Model()
      //   this.model = this.data.Id
      //   this.toastr.error('فرمت اشتباه است', 'خطا')
      //   this.loaderService.hide()
      // }
    }
  }

  uploadFile(file) {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = ـ => {
      this.model.FileContent = reader.result
      this.inputvalue = null
      this.loaderService.hide()
      this.view()
    }
  }

  showGrid2: boolean = false
  gridOption2 = <CustomGridOption>{ controllerName: Controller }
  view() {
    this.showGrid2 = false
    this.modelToPost = new ModelToPost()
    this.modelToPost.Id = this.model.Id
    this.modelToPost.FileContent = this.model.FileContent
    this.modelToPost.FileName = this.model.FileName
    this.modelToPost.ImportSettingDetailWs = this.ParameterList

    // this.service.post(`${Controller}/ShowFile`, this.modelToPost).subscribe((res: any) => {
    //   this.gridOption2.rowData = res.Data.Item1
    //   this.gridOption2.columnDefs = res.Data.Item2
    //   this.showGrid2 = true
    //   this.stepStatesTab2.disabled = null
    //   this.stepStatesTab3.disabled = STEP_STATE.disabled
    // }, _ => {
    //   this.stepStatesTab2.disabled = STEP_STATE.disabled
    //   this.stepStatesTab3.disabled = STEP_STATE.disabled
    // })
  }

  constructor(private service: GridFormService, private loaderService: LoaderService, private formBuilder: UntypedFormBuilder, 
    private toastr: ToastrService, private controlService: ControlMessageService, 
    // private ngWizardService: NgWizardService
  ) { }

  ngOnInit(): void { 
    this.getAttr() 
  }

  // stepStatesTab2 = { disabled: STEP_STATE.disabled }
  // stepStatesTab3 = { disabled: STEP_STATE.disabled }

  // config: NgWizardConfig = {
  //   selected: 0,
  //   theme: THEME.circles,
  //   toolbarSettings: {
  //     toolbarExtraButtons: [
  //       //  { text: 'Finish', class: 'btn btn-info', event: () => { alert("Finished!!!") } }
  //     ]
  //   },
  //   anchorSettings: {
  //     anchorClickable: false,
  //     enableAllAnchors: false
  //   },
  //   keyNavigation: true,
  //   lang: {
  //     next: 'بعدی',
  //     previous: 'قبلی'
  //   }
  // }

  // showPreviousStep(event?: Event) {
  //   this.ngWizardService.previous();
  // }

  // showNextStep(event?: Event) {
  //   this.ngWizardService.next();
  // }

  // resetWizard(event?: Event) {
  //   this.ngWizardService.reset();
  // }

  // setTheme(theme: THEME) {
  //   this.ngWizardService.theme(theme);
  // }

  // stepChanged(args: StepChangedArgs) {
  //   let stepIndex: number = args.step.index
  //   stepIndex == 1 ? this.setupStep2() : null
  // }

  isValidTypeBoolean: boolean = true;

  // isValidFunctionReturnsBoolean(args: StepValidationArgs) {
  //   return true;
  // }

  // isValidFunctionReturnsObservable(args: StepValidationArgs) {
  //   return of(true);
  // }

  setupStep2() {
    this.showGrid4 = false
    if (this.dynamicList.length != 0) return
    this.showGrid3 = false
    // this.stepStatesTab3.disabled = STEP_STATE.disabled
    this.modelToPost = new ModelToPost()
    this.modelToPost.Id = this.model.Id
    this.modelToPost.FileContent = this.model.FileContent
    this.modelToPost.FileName = this.model.FileName
    this.modelToPost.ImportSettingDetailWs = this.ParameterList
    this.getInStep2()
  }

  dynamicList: ITemporaryForm[] = []
  UniqueFields: string
  formG: UntypedFormGroup
  getInStep2() {
    const group: any = {};

    this.service.get(`${Controller}/get/${this.model.Id}`).subscribe((res: any) => {
      this.dynamicList = res.Data.Item2
      this.UniqueFields = res.Data.Item1
      if (this.dynamicList.length == 0) this.insertAndShowFileTemp()
      for (var i = 0; i < this.dynamicList.length; i++)
      {
        this.modelToPost.InputDto.push({ FieldName: this.dynamicList[i].InputFldName_Fld, FieldValue: null })
        group[this.dynamicList[i].InputFldName_Fld] = this.dynamicList[i].IsRequire_Fld ? new UntypedFormControl(null, Validators.required) : new UntypedFormControl(null)
      }
      this.formG = new UntypedFormGroup(group)
    })

  }

  modelToPost: ModelToPost = new ModelToPost()
  termporaryFieldChange(value: any, itemName: string, index: number) {
    this.modelToPost.InputDto[index] = { FieldName: itemName, FieldValue: value }
  }

  gridOption3 = <CustomGridOption>{}
  showGrid3: boolean
  insertAndShowFileTemp() {
    if (this.formG && this.formG.invalid) return this.controlService.isSubmitted = true
    this.showGrid3 = false
    this.modelToPost.CanDuplicate = this.CanDuplicate
    this.modelToPost.NotCheckUniqueField = this.NotCheckUniqueField
    for (var i = 0; i < this.dynamicList.length; i++)
    {
      let idx = this.modelToPost.InputDto.findIndex(p => p.FieldName == this.dynamicList[i].InputFldName_Fld) 
      this.modelToPost.InputDto[idx].FieldValue = this.formG.get(this.dynamicList[i].InputFldName_Fld).value
    }


    // this.service.post(`${Controller}/InsertAndShowFileTemp`, this.modelToPost).subscribe((res: any) => {
    //   let data = res.Data
    //   if (!data.Item1)
    //     this.stepStatesTab3.disabled = STEP_STATE.disabled

    //   else this.stepStatesTab3.disabled = null
    //   if (data.Item2.length == 0) return
    //   this.gridOption3.rowData = data.Item2
    //   this.gridOption3.columnDefs = data.Item3
    //   this.showGrid3 = true
    // })
  }


  gridOption4 = <CustomGridOption>{}
  showGrid4: boolean
  insertFileFinal() {
    this.service.get(`${Controller}/InsertFileFinal/${this.modelToPost.Id}`).subscribe((res: any) => {
      let data = res.Data
      if (data.Item2.length == 0) return
      this.gridOption4.rowData = data.Item2
      this.gridOption4.columnDefs = data.Item3
      this.showGrid4 = true
    })
  }

}

export class Model {
  Id: number
  FileName: string
  FileContent: string | ArrayBuffer
}

export interface ITemporaryForm {
  Combo: ICombo
  InputFldNameCaption_Fld: string
  InputFldName_Fld: string
  IsRequire_Fld: boolean
  Type_Fld: 1 | 2 | 3 | 4
}

export interface ICombo {
  Id: number
  CodeDesc_Fld: string
  Code_Fld: any
}

export class ModelToPost {
  Id: number = null
  FileName: string = null
  FileContent: string | ArrayBuffer = null
  TaminType: number = null
  CanDuplicate: boolean = false
  NotCheckUniqueField: boolean = false
  InputDto: InputDto[] = []
  ImportSettingDetailWs: ImportDetailWSDTO[] = []
}

export class InputDto {
  FieldName: string = null
  FieldValue: any = null
}