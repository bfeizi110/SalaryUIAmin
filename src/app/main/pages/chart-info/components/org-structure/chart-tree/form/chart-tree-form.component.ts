import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms'

import { ControlMessageService } from 'src/app/main/main-body/common/custom-form/control-message/control-message.service'
import { Validation } from 'src/app/main/main-body/common/custom-form/control-message/Validation'
import { ModalOptions } from 'src/app/main/main-body/common/custom-modal/modal-options.interface'
import { GridFormService } from 'src/app/main/main-body/common/grid-form.service'

const Controller = 'ChartTree'
interface IlevelState{
  Id: number
  CodeDesc_Fld: string
}

@Component({
  selector: 'chart-tree-form',
  templateUrl: './chart-tree-form.component.html',
  styleUrls: ['./chart-tree-form.component.scss']
})

export class ChartTreeFormComponent implements OnInit {

  @Output() done = new EventEmitter()
  @Output() closed = new EventEmitter()
  @Input() ID: number
  @Input() formType: string
  @Input() chartId: number
  @Input() sort: number

  @Input() parentId: number

  data: any = {}
  levelStateArray: IlevelState[] = [{Id: 1, CodeDesc_Fld: 'هم سطح'},{Id: 2, CodeDesc_Fld:'زیر مجموعه'}]

  get() {
    this.service.getById(Controller, this.ID, this.formType).toPromise().then((res: any) => {
      if (!res || !res.Data) return this.done.emit(false)
      else {
        this.data = res.Data
        this.setForm()
      }
    })
  }

  getAttrById() {
    this.service.getAttrById(Controller, this.ID).toPromise().then((res: any) => {
      this.formObj = res.Data.EntityAttribute
      this.ID ? this.get() : this.setForm()
    })
  }

  getAttr() {
    this.showModal = false
    this.service.getAttr(Controller).subscribe((res: any) => {
      this.formObj = res.Data.EntityAttribute
      this.ID ? this.get() : this.setForm()
    })
  }

  post() {
    this.service.post(`${Controller}/Create`, this.form.getRawValue()).subscribe((res: any) => this.done.emit(res.Data))
  }

  put() { this.service.post(`${Controller}/Update`, this.form.getRawValue()).subscribe((res: any) => this.done.emit(res.Data)) }

  formObj: any
  form: UntypedFormGroup
  setForm() {
    Validation.form = this.formObj
    this.form = this.formBuilder.group({
      Id: [0],
      CodeDesc_Fld: [null],
      Code_Fld: [{ value: null, disabled: Validation.disable('Code_Fld') }, Validation.setValidator('Code_Fld')],
      ParentID: [this.parentId],
      GroupCode_Fld: [this.chartId],
      IsPayroll: [{ value: true, disabled: Validation.disable('IsPayroll') }, Validation.setValidator('IsPayroll')],
      PostParentIDDesc: [null],
      PostParentID: [{ value: true, disabled: Validation.disable('PostParentID') }, Validation.setValidator('PostParentID')],
      Sort: [this.sort],
      LevelState: [null],
      FormType:[{value: this.formType}]
    })
    this.formType != 'Add' ? this.form.patchValue(this.data) : null
    this.postParentUrl = `*${Controller}/GetPostParentCombo/${this.form.controls.Id.value}`
    this.formType == 'Add' ? this.form.controls.PostParentID.disable() : null
    this.formType == 'Add' ? this.form.controls.LevelState.setValidators(Validation.required()) : this.form.controls.LevelState.clearValidators()
    this.showModal = true
  }

  save() {
    if (this.form.invalid) return this.controlService.isSubmitted = true

    if (this.formType == 'Add') return this.post()

    if (this.formType == 'Edit') this.put()
  }

  showModal: boolean = false
  close() {
    this.showModal = false
    this.closed.emit()
  }

  modalOptions: ModalOptions

  constructor(private controlService: ControlMessageService, private service: GridFormService, private formBuilder: UntypedFormBuilder) { }

  postParentUrl: string
  ngOnInit(): void {
    this.formType == 'Add' ? this.getAttr() : this.getAttrById()
    this.modalOptions = {
      formType: this.formType,
      modatTitle: 'نود درخت',
      saveCallback: this.save.bind(this),
      hideCallback: this.close.bind(this),
    }
  }

}
