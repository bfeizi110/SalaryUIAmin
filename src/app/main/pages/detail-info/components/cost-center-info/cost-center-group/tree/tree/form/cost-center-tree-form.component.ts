import { Component, EventEmitter, Input, Output } from '@angular/core'
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms'

import { ControlMessageService } from 'src/app/main/main-body/common/custom-form/control-message/control-message.service'
import { Validation } from 'src/app/main/main-body/common/custom-form/control-message/Validation'
import { GridFormService } from 'src/app/main/main-body/common/grid-form.service'
import { CostCenterTreeAttr, setCostCenterTreeAttr } from 'src/app/main/pages/global-attr'

const Controller = 'CostCenterTree'

@Component({
  selector: 'cost-center-tree-form',
  templateUrl: './cost-center-tree-form.component.html',
  styleUrls: ['./cost-center-tree-form.component.scss']
})
export class CostCenterTreeFormComponent {

  @Output() done = new EventEmitter()
  @Output() closed = new EventEmitter()
  @Input() ID: number
  @Input() parentId: number
  @Input() CostCenterGroupCode: number
  @Input() formType: string

  showGrid = false
  formObj: any = {}
  async getAttr() {
    return await new Promise(resolve => {
      if (!CostCenterTreeAttr) {
        this.service.getAttr(Controller).subscribe((res: any) => {
          setCostCenterTreeAttr(res.Data)
          this.formObj = res.Data.EntityAttribute
          return resolve(true)
        })
      }
      else {
        this.formObj = CostCenterTreeAttr.EntityAttribute
        return resolve(true)
      }
    })
  }

  data: any = {}
  async getById() {
    await this.service.getById(Controller, this.ID, this.formType).toPromise().then((res: any) => {
      if (!res || !res.Data) return this.done.emit(false)
      else {
        this.data = res.Data
        //this.setForm()
      }
    })
  }

  post() { this.service.post(`${Controller}/Create`, this.form.getRawValue()).subscribe((res: any) => { res && res.IsSuccess ? this.done.emit(res.Data) : null })}

  put() { this.service.post(`${Controller}/Update`, this.form.getRawValue()).subscribe((res: any) => { res && res.IsSuccess ? this.done.emit(res.Data) : null })}

  form: UntypedFormGroup
  showForm: boolean = false
  setForm() {
    Validation.form = this.formObj
    this.form = this.formBuilder.group({
      Id: [0],
      CodeDesc_Fld: [null],
      GroupCode_Fld: [this.CostCenterGroupCode],
      Code_Fld: [{ value: null, disabled: Validation.disable('Code_Fld') }, Validation.setValidator('Code_Fld')],
      AccNoKarfarmaSaving_Fld: [{ value: null, disabled: Validation.disable('AccNoKarfarmaSaving_Fld') }, Validation.setValidator('AccNoKarfarmaSaving_Fld')],
      AccNoKarmandSaving_Fld: [{ value: null, disabled: Validation.disable('AccNoKarmandSaving_Fld') }, Validation.setValidator('AccNoKarmandSaving_Fld')],
      TaminBaseDesc_Fld: [null],
      TaminBaseCode_Fld: [{ value: null, disabled: Validation.disable('TaminBaseCode_Fld') }, Validation.setValidator('TaminBaseCode_Fld')],
      TaxBaseDesc_Fld: [null],
      TaxBaseCode_Fld: [{ value: null, disabled: Validation.disable('TaxBaseCode_Fld') }, Validation.setValidator('TaxBaseCode_Fld')],
      PrsID_Fld: [{ value: null, disabled: Validation.disable('PrsID_Fld') }, Validation.setValidator('PrsID_Fld')],
      ParentId_Fld: [this.parentId],
      InActive_Fld: [null],
      DaraeiSettingDesc_Fld: [null],
      DaraeiSetting_Fld: [{ value: null, disabled: Validation.disable('DaraeiSetting_Fld') }, Validation.setValidator('DaraeiSetting_Fld')],
      PayprogramDesc_Fld: [null],
      Payprogram_Fld: [{ value: null, disabled: Validation.disable('Payprogram_Fld') }, Validation.setValidator('Payprogram_Fld')],
      FormType:[{value: this.formType}]
    })
  }

  save() {
    if (this.form.invalid) return this.controlService.isSubmitted = true

    if (this.formType == 'Add') return this.post()

    if (this.formType == 'Edit') this.put()
  }

  async buildForm() {
    await this.getAttr()
    if (this.formType != 'Add') {
      await this.getById()
      this.setForm()
      this.form.patchValue(this.data)
      this.showForm = true
    }
    else {
      this.setForm()
      this.showForm = true
    }
  }

  constructor(private controlService: ControlMessageService, private service: GridFormService, private formBuilder: UntypedFormBuilder) { }

  ngOnChanges(UpdatedValue: string): void { this.buildForm() }

}
