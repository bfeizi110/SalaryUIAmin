import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms'
import { CustomGridOption } from 'src/app/main/main-body/common/custom-ag-grid/interfaces/ag-grid-option.interface'

import { ControlMessageService } from 'src/app/main/main-body/common/custom-form/control-message/control-message.service'
import { Validation } from 'src/app/main/main-body/common/custom-form/control-message/Validation'
import { ModalOptions } from 'src/app/main/main-body/common/custom-modal/modal-options.interface'
import { GridFormService } from 'src/app/main/main-body/common/grid-form.service'

const Controller = 'Group'

@Component({
  selector: 'group-access-form',
  templateUrl: './group-access-form.component.html',
  styleUrls: ['./group-access-form.component.scss']
})
export class GroupAccessFormComponent implements OnInit {

  @Output() done = new EventEmitter()
  @Output() closed = new EventEmitter()
  @Input() ID: number
  @Input() formType: string
  @Input() formObj: any

  gridOption = <CustomGridOption>{
  }

  showGrid: boolean = false
  
  getAttr() {
    this.gridOption.columnDefs ? null :
      this.service.getAttr('Person').subscribe((res: any) => {
        this.gridOption.columnDefs = res.Data
        this.getSelect()
      })
  }

  getSelect() {
    this.showGrid = false
    this.service.get(Controller + `/GetPersonList/${this.ID}`).subscribe((res: any) => {
      this.gridOption.rowData = res.Data
      this.showGrid = true  
    })
  }

  selectedParentTabChange(event:any){
    this.getAttr()
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

  post() {
    this.form.patchValue({ Id: 0 })
    this.service.post(`${Controller}/Create`, this.form.getRawValue()).subscribe((res: any) => {
      this.done.emit(res.Data)
    })
  }

  put() { this.service.post(`${Controller}/Update`, this.form.getRawValue()).subscribe((res: any) => this.done.emit(res.Data)) }

  form: UntypedFormGroup
  setForm() {
    Validation.form = this.formObj
    this.form = this.formBuilder.group({
      Id: [null],
      Name: [{ value: null, disabled: Validation.disable('Name') }, Validation.setValidator('Name')],
      InActive: [{ value: null, disabled: Validation.disable('InActive') }, Validation.setValidator('InActive')],
      NormalizedName: [null],
      ConcurrencyStamp: [null],
      FormType:[{value: this.formType}]
    })
    this.formType != 'Add' ? this.form.patchValue(this.data) : null
    this.showForm = true
  }

  save() {
    if (this.form.invalid) return this.controlService.isSubmitted = true

    if (this.formType == 'Add') return this.post()

    if (this.formType == 'Edit') this.put()
  }

  showForm: boolean = false
  close() {
    this.showForm = false
    this.closed.emit()
  }

  modalOptions: ModalOptions

  constructor(private controlService: ControlMessageService, private service: GridFormService, private formBuilder: UntypedFormBuilder) { }

  ngOnInit(): void {
    this.formType != 'Add' ? this.get() : this.setForm()
    // this.modalOptions = {
    //   formType: this.formType,
    //   modatTitle: 'گروه های کاربری',
    //   saveCallback: this.save.bind(this),
    //   hideCallback: this.close.bind(this),
    // }
  }
}
