import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild, ViewEncapsulation } from '@angular/core'
import { UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms'
import { CustomGridOption } from 'src/app/main/main-body/common/custom-ag-grid/interfaces/ag-grid-option.interface'
import { GridFormService } from 'src/app/main/main-body/common/grid-form.service'

const Controller = 'DynamicForm'
@Component({
  selector: 'form-filter',  
  templateUrl: './form-filter.component.html',
  styleUrls: ['./form-filter.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
})
export class FormFilterComponent implements OnInit {

  @Output() onFilter = new EventEmitter()
  @Output() onFilterWithoutFilterButton = new EventEmitter()
  @Input() hideSearchButton: boolean
  @Input() DynamicFormID: number
  @Input() expanded: boolean
  @Input() formFilterAttr: any

  form: UntypedFormGroup
  showForm: boolean = false

  setForm() {
    this.form = new UntypedFormGroup({})
    for (let index = 0; index < this.FormFilterViewDto.length; index++) {
        this.form.addControl(
          this.FormFilterViewDto[index].FilterFldName_Fld,
          new UntypedFormControl('')
        );
    } 
    this.showForm = true
  }

  fixMultiCombo(form) {
    for (let index = 0; index < this.FormFilterViewDto.length; index++) {
      if (this.FormFilterViewDto[index].InputTypeDesc_Fld == 'multiCombo' && form[this.FormFilterViewDto[index].FilterFldName_Fld])
        form[this.FormFilterViewDto[index].FilterFldName_Fld]  = form[this.FormFilterViewDto[index].FilterFldName_Fld].toString()
    } 
  }

  filter() {
    let fakeFormValue = { ...this.form.getRawValue() }
    this.fixMultiCombo(fakeFormValue)
    this.onFilter.emit(fakeFormValue)
  }

 
  FormFilterViewDto = []
  FormFilterViewLists = []
 
  getById() {
    this.FormFilterViewDto = this.formFilterAttr
    this.FormFilterViewLists = new Array<any>(this.FormFilterViewDto.length)   
    this.setForm()

    // this.service.getByIdSimple(`${Controller}/GetFilterAttribute`, this.DynamicFormID).subscribe((res: any) => {
    //   this.FormFilterViewDto = res.Data
    //   this.FormFilterViewLists = new Array<any>(this.FormFilterViewDto.length)      
    //   this.setForm()
    // })
  }

  refresh() {
    this.DisableValueChange = true
    this.form.reset()
    this.onFilter.emit(this.form.getRawValue())
    this.DisableValueChange = false
  }

  clickformFilter(id: number, index: number, filterId: number, filterName) {
    if (!this.FormFilterViewLists[index] || this.FormFilterViewLists[index].length == 0)
    this.service.getCombo(`*${Controller}/GetFilterCombo/${id}`).subscribe((res: any) => {
      const data = res.Data
      if (!data.Item2) this.FormFilterViewLists.splice(index, 1, data)
    })
    this.activeFieldName = filterName
  }

  model: any = {}
  modelToPost: any = {}
  modelToPostTemp: any = {}
  activeFieldName: string
  formFilterViewChange(event,id, fieldName) {
    this.model[fieldName]= event
    for (let prop of Object.keys(this.model)) if (Array.isArray(this.model[prop])) { this.modelToPost[prop] = this.model[prop].toString() } else this.modelToPost[prop] = this.model[prop]
    this.activeFieldName = fieldName
  }

  formFilterViewDynamicNotComboChange(fieldName) {
    this.modelToPost[fieldName] = this.form.controls[fieldName].value
    this.activeFieldName = fieldName
  }  

  close() {
    let sidebar = document.getElementsByClassName('app-sidebar')[0] as HTMLElement
    sidebar.style.zIndex = '3'
  }

  constructor(private service: GridFormService, private fb: UntypedFormBuilder) { }

  DisableValueChange: boolean = false
  async ngOnInit() {
    this.getById()
    setTimeout(() => {
      this.form.valueChanges.subscribe((res) => {
        if (this.DisableValueChange) return
        let fakeFormValue = { ...this.form.getRawValue() }
        this.fixMultiCombo(fakeFormValue)
        this.onFilterWithoutFilterButton.emit(fakeFormValue)
      })
        
    }, 300);
  }

}