import { Component, Output, EventEmitter, Input } from '@angular/core'
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms'
import { ControlMessageService } from 'src/app/main/main-body/common/custom-form/control-message/control-message.service'
import { GridFormService } from 'src/app/main/main-body/common/grid-form.service'
import { Validation } from 'src/app/main/main-body/common/custom-form/control-message/Validation'

const Controller = 'TaminFiles'

@Component({
  selector: 'tamin-file-kar-form',
  templateUrl: './tamin-file-kar-form.component.html',
  styleUrls: ['./tamin-file-kar-form.component.scss']
})
export class TaminFileKarFormComponent {

  @Output() done = new EventEmitter()
  @Output() closed = new EventEmitter()
  @Input() ID: number
  @Input() formType: string
  @Input() formObj: any

  data: any = {}
  get() {
    this.service.getById(`${Controller}/GetDSKKAR`, this.ID, this.formType).toPromise().then((res: any) => {
      if (!res || !res.Data) return this.done.emit(false)
      else {
        this.data = res.Data
        this.setForm()
      }
    })
  }

  post() { this.service.post(`${Controller}/CreateDSKKAR`, this.form.getRawValue()).subscribe((res: any) => { res && res.IsSuccess ? this.done.emit(res.Data) : null })}

  put() { this.service.post(`${Controller}/UpdateDSKKAR`, this.form.getRawValue()).subscribe((res: any) => { res && res.IsSuccess ? this.done.emit(res.Data) : null })}

  form: UntypedFormGroup
  showForm: boolean = false
  setForm() {
    Validation.form = this.formObj
    this.form = this.formBuilder.group({
      Id: [0],
      DSK_ID: [{ value: null, disabled: Validation.disable('DSK_ID') }, Validation.setValidator('DSK_ID')],
      DSK_NAME: [{ value: null, disabled: Validation.disable('DSK_NAME') }, Validation.setValidator('DSK_NAME')],
      DSK_FARM: [{ value: null, disabled: Validation.disable('DSK_FARM') }, Validation.setValidator('DSK_FARM')],
      DSK_ADRS: [{ value: null, disabled: Validation.disable('DSK_ADRS') }, Validation.setValidator('DSK_ADRS')],
      DSK_KIND: [{ value: null, disabled: Validation.disable('DSK_KIND') }, Validation.setValidator('DSK_KIND')],
      DSK_YY: [{ value: null, disabled: Validation.disable('DSK_YY') }, Validation.setValidator('DSK_YY')],
      DSK_MM: [{ value: null, disabled: Validation.disable('DSK_MM') }, Validation.setValidator('DSK_MM')],
      DSK_LISTNO: [{ value: null, disabled: Validation.disable('DSK_LISTNO') }, Validation.setValidator('DSK_LISTNO')],
      DSK_DISC: [{ value: null, disabled: Validation.disable('DSK_DISC') }, Validation.setValidator('DSK_DISC')],
      DSK_NUM: [{ value: null, disabled: Validation.disable('DSK_NUM') }, Validation.setValidator('DSK_NUM')],
      DSK_TDD: [{ value: null, disabled: Validation.disable('DSK_TDD') }, Validation.setValidator('DSK_TDD')],
      DSK_TROOZ: [{ value: null, disabled: Validation.disable('DSK_TROOZ') }, Validation.setValidator('DSK_TROOZ')],
      DSK_TMAH: [{ value: null, disabled: Validation.disable('DSK_TMAH') }, Validation.setValidator('DSK_TMAH')],
      DSK_TMAZ: [{ value: null, disabled: Validation.disable('DSK_TMAZ') }, Validation.setValidator('DSK_TMAZ')],
      DSK_TMASH: [{ value: null, disabled: Validation.disable('DSK_TMASH') }, Validation.setValidator('DSK_TMASH')],
      DSK_TTOTL: [{ value: null, disabled: Validation.disable('DSK_TTOTL') }, Validation.setValidator('DSK_TTOTL')],
      DSK_TBIME: [{ value: null, disabled: Validation.disable('DSK_TBIME') }, Validation.setValidator('DSK_TBIME')],
      DSK_TKOSO: [{ value: null, disabled: Validation.disable('DSK_TKOSO') }, Validation.setValidator('DSK_TKOSO')],
      DSK_BIC: [{ value: null, disabled: Validation.disable('DSK_BIC') }, Validation.setValidator('DSK_BIC')],
      DSK_RATE: [{ value: null, disabled: Validation.disable('DSK_RATE') }, Validation.setValidator('DSK_RATE')],
      DSK_PRATE: [{ value: null, disabled: Validation.disable('DSK_PRATE') }, Validation.setValidator('DSK_PRATE')],
      DSK_BIMH: [{ value: null, disabled: Validation.disable('DSK_BIMH') }, Validation.setValidator('DSK_BIMH')],
      MON_PYM: [{ value: null, disabled: Validation.disable('MON_PYM') }, Validation.setValidator('MON_PYM')],
      DSK_INC: [{ value: 0, disabled: Validation.disable('DSK_INC') }, Validation.setValidator('DSK_INC')],
      DSK_SPOUSE: [{ value: 0, disabled: Validation.disable('DSK_SPOUSE') }, Validation.setValidator('DSK_SPOUSE')],

      FormType:[{value: this.formType}]
    })
    this.formType != 'Add' ? this.form.patchValue(this.data) : null
    this.showForm = true
    setTimeout(() => {
      this.service.scrollToElement("form")
    }, 200); 
  }

  save() {
    if (this.form.invalid) return this.controlService.isSubmitted = true

    if (this.formType == 'Add') return this.post()

    if (this.formType == 'Edit') this.put()
  }

  close() { this.closed.emit() }

  constructor(private controlService: ControlMessageService, private service: GridFormService, private formBuilder: UntypedFormBuilder) { }

  ngOnChanges(UpdatedValue: string): void { this.formType != 'Add' ? this.get() : this.setForm() }

}
