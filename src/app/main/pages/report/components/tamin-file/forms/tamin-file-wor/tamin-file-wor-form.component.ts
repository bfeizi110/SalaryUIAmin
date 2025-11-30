import { Component, Output, EventEmitter, Input } from '@angular/core'
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms'
import { ControlMessageService } from 'src/app/main/main-body/common/custom-form/control-message/control-message.service'
import { GridFormService } from 'src/app/main/main-body/common/grid-form.service'
import { Validation } from 'src/app/main/main-body/common/custom-form/control-message/Validation'

const Controller = 'TaminFiles'

@Component({
  selector: 'tamin-file-wor-form',
  templateUrl: './tamin-file-wor-form.component.html',
  styleUrls: ['./tamin-file-wor-form.component.scss']
})
export class TaminFileWorFormComponent {

  @Output() done = new EventEmitter()
  @Output() closed = new EventEmitter()
  @Input() ID: number
  @Input() formType: string
  @Input() formObj: any

  personName: string
  PersonID_Fld: number
  showPerson: boolean = false
  onShowPerson() {
    this.showPerson = true
  }

  async onSelectPersonnel(person) {
    this.personName = `${person.Name} ${person.Family}`
    this.PersonID_Fld = person.Id
    this.showPerson = false
    await this.service.getById(`Person`, person.Id, '').toPromise().then((res: any) => {
        let dt: any
        dt = res.Data
        
        this.form.controls.DSW_ID1.patchValue(dt.BimehNo)
        this.form.controls.DSW_FNAME.patchValue(dt.Name)
        this.form.controls.DSW_LNAME.patchValue(dt.Family)
        this.form.controls.DSW_DNAME.patchValue(dt.FatherName)
        this.form.controls.DSW_IDNO.patchValue(dt.CertificateNo)
        this.form.controls.DSW_IDPLC.patchValue(dt.RegisterPlace_CityIDDesc)
        this.form.controls.DSW_BDATE.patchValue(dt.BirthDate.substr(2))
        this.form.controls.DSW_SEX.patchValue(dt.GenderIDDesc)
        this.form.controls.DSW_JOB.patchValue(dt.Job_CodeID)
        this.form.controls.PER_NATCOD.patchValue(dt.NationalNO)
        this.form.controls.DSW_NAT.patchValue('ایرانی')
      }
    )

  }

  data: any = {}
  async get() {
    await this.service.getById(`${Controller}/GetDSKWOR`, this.ID, this.formType).toPromise().then((res: any) => {
      if (!res || !res.Data) return this.done.emit(false)
      else {
        this.data = res.Data
        this.setForm()
      }
    })
  }

  post() { this.service.post(`${Controller}/CreateDSKWOR`, this.form.getRawValue()).subscribe((res: any) => { res && res.IsSuccess ? this.done.emit(res.Data) : null })}

  put() { this.service.post(`${Controller}/UpdateDSKWOR`, this.form.getRawValue()).subscribe((res: any) => { res && res.IsSuccess ? this.done.emit(res.Data) : null })}

  form: UntypedFormGroup
  showForm: boolean = false
  setForm() {
    Validation.form = this.formObj
    this.form = this.formBuilder.group({
      Id: [0],
      DSW_ID: [{ value: null, disabled: Validation.disable('DSW_ID') }, Validation.setValidator('DSW_ID')],
      DSW_YY: [{ value: sessionStorage.getItem('Year_Fld').substr(2), disabled: Validation.disable('DSW_YY') }, Validation.setValidator('DSW_YY')],
      DSW_MM: [{ value: sessionStorage.getItem('Month_Fld'), disabled: Validation.disable('DSW_MM') }, Validation.setValidator('DSW_MM')],
      DSW_LISTNO: [{ value: 1, disabled: Validation.disable('DSW_LISTNO') }, Validation.setValidator('DSW_LISTNO')],
      DSW_ID1: [{ value: null, disabled: Validation.disable('DSW_ID1') }, Validation.setValidator('DSW_ID1')],
      DSW_FNAME: [{ value: null, disabled: Validation.disable('DSW_FNAME') }, Validation.setValidator('DSW_FNAME')],
      DSW_LNAME: [{ value: null, disabled: Validation.disable('DSW_LNAME') }, Validation.setValidator('DSW_LNAME')],
      DSW_DNAME: [{ value: null, disabled: Validation.disable('DSW_DNAME') }, Validation.setValidator('DSW_DNAME')],
      DSW_IDNO: [{ value: null, disabled: Validation.disable('DSW_IDNO') }, Validation.setValidator('DSW_IDNO')],
      DSW_IDPLC: [{ value: null, disabled: Validation.disable('DSW_IDPLC') }, Validation.setValidator('DSW_IDPLC')],
      DSW_IDATE: [{ value: null, disabled: Validation.disable('DSW_IDATE') }, Validation.setValidator('DSW_IDATE')],
      DSW_BDATE: [{ value: null, disabled: Validation.disable('DSW_BDATE') }, Validation.setValidator('DSW_BDATE')],
      DSW_SEX: [{ value: null, disabled: Validation.disable('DSW_SEX') }, Validation.setValidator('DSW_SEX')],
      DSW_NAT: [{ value: null, disabled: Validation.disable('DSW_NAT') }, Validation.setValidator('DSW_NAT')],
      DSW_OCP: [{ value: null, disabled: Validation.disable('DSW_OCP') }, Validation.setValidator('DSW_OCP')],
      DSW_SDATE: [{ value: null, disabled: Validation.disable('DSW_SDATE') }, Validation.setValidator('DSW_SDATE')],
      DSW_EDATE: [{ value: null, disabled: Validation.disable('DSW_EDATE') }, Validation.setValidator('DSW_EDATE')],
      DSW_DD: [{ value: 0, disabled: Validation.disable('DSW_DD') }, Validation.setValidator('DSW_DD')],
      DSW_ROOZ: [{ value: 0, disabled: Validation.disable('DSW_ROOZ') }, Validation.setValidator('DSW_ROOZ')],
      DSW_MAH: [{ value: 0, disabled: Validation.disable('DSW_MAH') }, Validation.setValidator('DSW_MAH')],
      DSW_MAZ: [{ value: 0, disabled: Validation.disable('DSW_MAZ') }, Validation.setValidator('DSW_MAZ')],
      DSW_MASH: [{ value: 0, disabled: Validation.disable('DSW_MASH') }, Validation.setValidator('DSW_MASH')],
      DSW_TOTL: [{ value: 0, disabled: Validation.disable('DSW_TOTL') }, Validation.setValidator('DSW_TOTL')],
      DSW_BIME: [{ value: 0, disabled: Validation.disable('DSW_BIME') }, Validation.setValidator('DSW_BIME')],
      DSW_PRATE: [{ value: 0, disabled: Validation.disable('DSW_PRATE') }, Validation.setValidator('DSW_PRATE')],
      DSW_JOB: [{ value: null, disabled: Validation.disable('DSW_JOB') }, Validation.setValidator('DSW_JOB')],
      PER_NATCOD: [{ value: null, disabled: Validation.disable('PER_NATCOD') }, Validation.setValidator('PER_NATCOD')],
      DSW_TKOSO: [{ value: 0, disabled: Validation.disable('DSW_TKOSO') }, Validation.setValidator('DSW_TKOSO')],
      DSW_BIC: [{ value: 0, disabled: Validation.disable('DSW_BIC') }, Validation.setValidator('DSW_BIC')],
      DSW_INC: [{ value: 0, disabled: Validation.disable('DSW_INC') }, Validation.setValidator('DSW_INC')],
      DSW_SPOUSE: [{ value: 0, disabled: Validation.disable('DSW_SPOUSE') }, Validation.setValidator('DSW_SPOUSE')],
      FormType:[{value: this.formType}]
    })
    if (this.formType != 'Add') 
      this.form.patchValue(this.data) 

    this.showForm = true
    setTimeout(() => {
      this.service.scrollToElement("form")
    }, 200); 
  }

  save() {
    const invalid = [];
    const controls = this.form.controls;
    for (const name in controls) {
      if (controls[name].invalid) {
        invalid.push(name);
      }
    }

    if (this.form.invalid) return this.controlService.isSubmitted = true

    if (this.formType == 'Add') return this.post()

    if (this.formType == 'Edit') this.put()
  }

  close() { this.closed.emit() }

  constructor(private controlService: ControlMessageService, private service: GridFormService, private formBuilder: UntypedFormBuilder) { }

  ngOnInit(UpdatedValue: string): void { this.formType != 'Add' ? this.get() : this.setForm() }

}
