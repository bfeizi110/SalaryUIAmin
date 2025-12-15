import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms'

import { ControlMessageService } from 'src/app/main/main-body/common/custom-form/control-message/control-message.service'
import { Validation } from 'src/app/main/main-body/common/custom-form/control-message/Validation'
import { ModalOptions } from 'src/app/main/main-body/common/custom-modal/modal-options.interface'
import { GridFormService } from 'src/app/main/main-body/common/grid-form.service'

const Controller = 'Post'
@Component({
  selector: 'org-post-form',
  templateUrl: './org-post-form.component.html',
  styleUrls: ['./org-post-form.component.scss']
})
export class OrgPostFormComponent implements OnInit {

  @Output() done = new EventEmitter()
  @Output() closed = new EventEmitter()
  @Input() ID: number
  @Input() formType: string
  @Input() formObj: any
  @Input() nodeId: number

  getAttr(): Promise<any> {
    return new Promise(resolve => {
      if (this.ID)
        this.service.getAttrById(Controller, this.ID).subscribe((res: any) => {
          this.formObj = res.Data.EntityAttribute
          return resolve(true)
        })
      else
        this.service.getAttr(Controller).subscribe((res: any) => {
          this.formObj = res.Data.EntityAttribute
          return resolve(true)
        })
    })
  }

  data: any = {}
  getById() {
    let promise = new Promise((resolve, reject) => {
      this.service.get(`${Controller}/${this.ID}/${this.formType == 'Edit'}`).toPromise().then((res: any) => {
        if (res && res.Data) {
          this.data = res.Data
          resolve(true)
        }
        else {
          this.done.emit(false)
          reject()
        }
      }).catch(e => e)
    })
    return promise
  }

  post() { 
    this.service.post(`${Controller}/Create`, this.form.getRawValue()).subscribe((res: any) => 
      {
        if (res && res.IsSuccess)
          this.done.emit(res.Data)
      }
      ) 
  }

  put() { 
    this.service.post(`${Controller}/Update`, this.form.getRawValue()).subscribe((res: any) => 
      {
        if (res && res.IsSuccess)
          this.done.emit(res.Data)
      }
      ) 
  }

  form: UntypedFormGroup
  setForm() {
    Validation.form = this.formObj
    this.form = this.formBuilder.group({
      Id: [0],
      PostNO: [{ value: null, disabled: Validation.disable('PostNO') }, Validation.setValidator('PostNO')],
      Title: [{ value: null, disabled: Validation.disable('Title') }, Validation.setValidator('Title')],
      JobFieldIDDesc: [null],
      JobFieldID: [{ value: null, disabled: Validation.disable('JobFieldID') }, Validation.setValidator('JobFieldID')],
      NodeID: [this.nodeId],
      IsPayroll: [{ value: true, disabled: Validation.disable('IsPayroll') }, Validation.setValidator('IsPayroll')],
      ManagerPostTypeIDDesc: [null],
      ManagerPostTypeID: [{ value: true, disabled: Validation.disable('ManagerPostTypeID') }, Validation.setValidator('ManagerPostTypeID')],
      PostLevelHghIDDesc: [null],
      PostLevelHghID: [{ value: true, disabled: Validation.disable('PostLevelHghID') }, Validation.setValidator('PostLevelHghID ')],
      PostLevelHgh401IDDesc: [null],
      PostLevelHgh401ID: [{ value: true, disabled: Validation.disable('PostLevelHgh401ID') }, Validation.setValidator('PostLevelHgh401ID ')],
      PostTypeIDDesc: [null],
      PostTypeID: [{ value: true, disabled: Validation.disable('PostTypeID') }, Validation.setValidator('PostTypeID ')],

      FormType:[{value: this.formType}]
    })
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

  async buildForm() {
    this.formObj = null
    this.data = {}
    if (this.formType != 'Add') {
      await this.getById()
      await this.getAttr()
      this.setForm()
      this.form.patchValue(this.data)
      this.showModal = true
    }
    else {
      await this.getAttr()
      this.setForm()
      this.form.reset()
      this.form.controls.Id.patchValue(0)
      this.showModal = true
    }
    this.modalOptions = {
      formType: this.formType,
      modatTitle: 'پست سازمانی',
      saveCallback: this.save.bind(this),
      hideCallback: this.close.bind(this),
      maxWidth: 720
    }
  }

  modalOptions: ModalOptions

  constructor(private controlService: ControlMessageService, private service: GridFormService, private formBuilder: UntypedFormBuilder) { }

  ngOnInit(): void { this.buildForm() }

}
