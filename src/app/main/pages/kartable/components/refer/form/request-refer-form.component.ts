import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'
import { UntypedFormBuilder, UntypedFormGroup, UntypedFormArray } from '@angular/forms'

import { ControlMessageService } from 'src/app/main/main-body/common/custom-form/control-message/control-message.service'
import { Validation } from 'src/app/main/main-body/common/custom-form/control-message/Validation'
import { ModalOptions } from 'src/app/main/main-body/common/custom-modal/modal-options.interface'
import { GridFormService } from 'src/app/main/main-body/common/grid-form.service'
import { OrganizationAttr, RequestReferAttr, setRequestReferAttr } from 'src/app/main/pages/global-attr'

const Controller = 'PersonHghRequest'

@Component({
  selector: 'request-refer-form',
  templateUrl: './request-refer-form.component.html',
  styleUrls: ['./request-refer-form.component.scss']
})

export class RquestReferFormComponent implements OnInit {

  @Output() done = new EventEmitter()
  @Output() closed = new EventEmitter()
  @Input() RequestRefer: any
  @Input() RequestReject: boolean
  @Input() isReferBack: boolean

  formObj: any

  getAttr() {
    !RequestReferAttr
      ? this.service.get(`${Controller}/GetAttributeRefer`).subscribe((res: any) => this.setAttr(res.Data, 'toLocal'))
      : this.setAttr(RequestReferAttr)
  }

  setAttr(attr, type?) {
    this.formObj = attr.EntityAttribute
    type == 'toLocal' ? setRequestReferAttr(attr) : null
    this.setForm()
  }


  post() {
    if (this.RequestReject)
      this.service.post(`${Controller}/RejectRequest`, { Desc_Fld: this.form.controls.Desc_Fld.value, RequestID: this.RequestRefer.RequestID }).subscribe((res: any) => this.done.emit(res.Data))
    else
      this.service.post(`${Controller}/ReferRequest2Person/${this.isReferBack}`, this.form.getRawValue()).subscribe((res: any) => this.done.emit(res.Data))
  }


  form: UntypedFormGroup
  formArray: UntypedFormArray
  comboArray: []

  setForm() {
    Validation.form = this.formObj;
    var RequestRefer;
    const isReferBack = this.isReferBack;
    const isReject = this.RequestReject;
     if(!isReferBack && !isReject)
      RequestRefer = this.RequestRefer[0];
    else
      RequestRefer = this.RequestRefer;
  

    const baseForm = {
      ToUserID_Fld: [{ value: null, disabled: Validation.disable('ToUserID_Fld') }, Validation.setValidator('ToUserID_Fld')],
      ToUserIDDesc_Fld: [null],
      Desc_Fld: [{ value: null, disabled: Validation.disable('Desc_Fld') }, Validation.setValidator('Desc_Fld')],
      RequestID: [isReferBack ? RequestRefer[0].RequestID: RequestRefer.RequestID],
      WorkFlowDetailReferID: [isReferBack ? null : RequestRefer.WorkFlowDetailReferID],
    };

    this.form = this.formBuilder.group(baseForm);

    if (isReject) {
      this.form.get('ToUserID_Fld')?.clearValidators();
    }

    this.comboArray = isReferBack
      ? this.RequestRefer.flatMap(item => item.Users)
      : RequestRefer.Users;

    this.showModal = true;
  }



  save() {
    if (this.form.invalid) return this.controlService.isSubmitted = true

    if (this.isReferBack) {
      const selectedId = this.form.get('ToUserID_Fld')?.value;

      const matchedItem = this.RequestRefer.find(item =>
        item.Users.some(person => person.Id === selectedId)
      );

      if (matchedItem) {
        this.form.patchValue({
          WorkFlowDetailReferID: matchedItem.WorkFlowDetailReferID
        });
      }
    }

    return this.post()
  }

  showModal: boolean = false
  close() {
    this.showModal = false
    this.closed.emit()
  }

  modalOptions: ModalOptions

  constructor(private controlService: ControlMessageService, private service: GridFormService, private formBuilder: UntypedFormBuilder) { }

  ngOnInit(): void {
    this.getAttr()

    this.modalOptions = {
      formType: this.RequestReject ? 'Reject' : 'Refer',
      modatTitle: this.RequestReject ? 'رد درخواست' : 'ارجاع به',
      saveCallback: this.save.bind(this),
      hideCallback: this.close.bind(this),
    }
  }

}
