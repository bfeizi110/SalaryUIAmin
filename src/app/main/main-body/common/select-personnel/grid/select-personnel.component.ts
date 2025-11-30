import { Component, EventEmitter, Input, Output } from '@angular/core'
import { ToastrService } from 'ngx-toastr'
import { CustomGridOption } from 'src/app/main/main-body/common/custom-ag-grid/interfaces/ag-grid-option.interface'
import { GridFormService } from 'src/app/main/main-body/common/grid-form.service'
import { ModalOptions } from '../../custom-modal/modal-options.interface'
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms'

@Component({
  selector: 'select-personnel',
  templateUrl: './select-personnel.component.html',
  styleUrls: ['./select-personnel.component.scss']
})
export class SelectPersonnelComponent/*  implements OnInit */ {

  @Output() rowClicked = new EventEmitter()
  @Output() onSelectPersonnelDetail = new EventEmitter()
  @Output() rowSelectedList = new EventEmitter()
  @Output() rowSelectedListOnModal = new EventEmitter()
  @Output() rowClickedModal = new EventEmitter()
  @Output() formObjChange = new EventEmitter()
  @Output() add = new EventEmitter()
  @Output() edit = new EventEmitter()
  @Output() delete = new EventEmitter()
  @Output() view = new EventEmitter()
  @Output() onFilterSelectPersonnel = new EventEmitter()
  @Output() closeChange = new EventEmitter()
  @Output() closed = new EventEmitter()
  @Output() selectedPersonelNF = new EventEmitter()

  @Input() disabledForm: boolean
  @Input() setNewPersonData
  @Input() isModal: boolean
  @Input() setPersonPID: number
  @Input() personData: any[]
  @Input() multiple: boolean
  @Input() hideFilter: boolean
  @Input() wantToCollapse: boolean
  @Input() controller: string
  @Input() attribute: any

  showGrid: boolean = false
  comboAray = [{ Id: 1, CodeDesc_Fld: 'گروه بازنشستگان و موظفین' }, { Id: 2, CodeDesc_Fld: 'تفکیک بازنشستگان و موظفین' }, { Id: 3, CodeDesc_Fld: 'بازنشستگان' }, { Id: 4, CodeDesc_Fld: 'موظفین' }]
  isBazForm: boolean = false

  gridOption = <CustomGridOption>{ rowClicked: this.onRowClicked.bind(this) }

  selectedPersonel: string
  onRowClicked(event) {
    this.selectedPersonel = `${event.data.Name} ${event.data.Family} -- ${event.data.PID}`
    this.rowClicked.emit(event.data.Id)
    this.view.emit(event.data)
    this.rowClickedModal.emit(event.data)
    this.selectedPersonelNF.emit(this.selectedPersonel)
    //!this.isPersonPage ? this.expand = false : null
  }

  onRowClickedDetail(event) {
    this.selectedPersonel = `${event.data.Name} ${event.data.Family}`
    this.onSelectPersonnelDetail.emit(event.data.Id)
    this.selectedPersonelNF.emit(this.selectedPersonel)
  }
  form: UntypedFormGroup
    
  formObj: any
  getAttr() {
    this.showGrid = false
    if (this.attribute) {
      this.gridOption.columnDefs = this.attribute
      this.formObj = this.attribute.EntityAttribute
      this.getSelect()
    }
    else {
      let Dacces: boolean
      Dacces= !this.controller 
      || this.controller == 'PersonMostamar' 
      || this.controller == 'PersonMostamarBaz' 
      || this.controller == 'PersonSavingInfo' 
      || this.controller == 'PersonSavingInfoBaz' 
      || this.controller == 'PersonDebtInfo' 
      || this.controller == 'PersonDebtInfoBaz' 
      || this.controller == 'PersonInsureInfo' 
      || this.controller == 'PersonInsureInfoBaz' 
      || this.controller == 'Commission' 
      || this.controller == 'CommissionBaz' 
      || this.controller == 'TadrisCommission' 
      || this.controller == 'PersonInsureInfoTadris' 
      || this.controller == 'HistoryChild' 
      || this.controller == 'PersonHghWitness' 
      || this.controller == 'PersonMissionInfo' 
      || this.controller == 'PersonWorkAdding'            
      || this.controller == 'PersonCaseInfo'            
      || this.controller == 'BackpayDetail'            
      || this.controller == 'Person'
      || this.controller == 'BackPayInsure'
      || this.controller == 'PersonPayInfo'

      this.service.get(Dacces ? `Person/GetAttributeDAccess/${this.controller}` : `${this.controller}/GetAttribute`).subscribe((res: any) => {
        this.gridOption.columnDefs = res.Data
        this.formObj = res.Data.EntityAttribute
        this.isPersonPage ? this.formObjChange.emit(res.Data) : null
        this.getSelect()
      })
    }
  }

  focusField: any
  getSelect() {
    this.showGrid = false

    //for set custom data from upper component
    if (this.personData) {
      this.expand = true
      this.gridOption.rowData = this.personData
      if (this.setPersonPID) {
        let personSelected: any
        if (this.controller == 'PersonMonthInfo' || this.controller == 'PersonWorkAddingInfo') {
          personSelected = this.gridOption.rowData.filter(a => a.PersonID_Fld == this.setPersonPID)[0]
          if (!personSelected) return this.toastr.error('فرد وجود ندارد', 'حطا')
        }
        else personSelected = this.gridOption.rowData.filter(a => a.Id == this.setPersonPID)[0]
        this.gridOption.rowData.filter(a => a.Id == this.setPersonPID)[0]
        this.focusField = this.controller == 'PersonWorkAddingInfo' ? personSelected.PersonID_Fld : personSelected.Id
        this.selectedPersonel = `${personSelected.Name} ${personSelected.Family} -- ${personSelected.PID}`
      }
      setTimeout(() => this.showGrid = true, 100)
    }

    if (this.controller != 'PersonMov' && this.controller != 'Person' && (this.controller != 'PersonMonthInfo' && this.controller != 'PersonTadris' && this.controller != 'PersonBaz' && !this.gridOption.rowData)) {
      this.service.getSelect('Person', null).subscribe((res: any) => {
        this.gridOption.rowData = res.Data
        this.setPersonPID && this.isModal ? this.showGrid = true : this.showGrid = true
        if (this.setPersonPID) {
          let personSelected: any = this.gridOption.rowData.filter(a => a.Id == this.setPersonPID)[0]
          if (personSelected)
            this.selectedPersonel = `${personSelected.Name} ${personSelected.Family} -- ${personSelected.PID}`
          this.rowSelectedListOnModal.emit({ ids: [this.setPersonPID], personData: this.gridOption.rowData })
        }
      })
    }
  }

  onAdd() { this.add.emit() }

  onEdit(event) { this.edit.emit(event.rowData.Id) }

  onView(event) { this.view.emit(event.rowData.Id) }

  onDelete(event) { this.delete.emit(event.rowData.Id) }

  bazMovSelectd : number = 0
  body

  changeComboBazMov(event){
    this.bazMovSelectd = event
    this.onFilter(this.form)
  }

  onFilter(body) {
    let bodyInt = body
    this.onFilterSelectPersonnel.emit(body)
    if (this.isBazForm)
    {
      body.controls.IsBaz.patchValue(false)
      body.controls.IsMov.patchValue(false)
      body.controls.OnlyBaz.patchValue(false)
      body.controls.OnlyMov.patchValue(false)
        switch(this.bazMovSelectd){
          case 1:
            body.controls.IsBaz.patchValue(true)
            break;
          case 2:
            body.controls.IsBaz.patchValue(true)
            body.controls.IsMov.patchValue(true)
            break;
          case 3:
            body.controls.IsBaz.patchValue(true)
            body.controls.OnlyBaz.patchValue(true)
            break;
          case 4:
            body.controls.IsMov.patchValue(true)
            body.controls.OnlyMov.patchValue(true)
            break;
        }
        bodyInt = body.getRawValue()
    }
    this.showGrid = false
    this.service.post(this.isBazForm ? 'PersonBaz/GetFilterSelectBazMov' : `Person/GetFilterSelect`, bodyInt).subscribe((res: any) => {
      this.gridOption.rowData = res.Data
      this.showGrid = true
    })
  }

  openPanel() {
    this.expand = true
  }

  closePanel() {
    this.expand = false
  }

  showModal: boolean = false
  close() {
    this.showModal = false
    let sidebar = document.getElementsByClassName('app-sidebar')[0] as HTMLElement
    sidebar.style.zIndex = '3'
    this.closeChange.emit(null)
    this.closed.emit()
  }

  constructor(private service: GridFormService, private toastr: ToastrService, private formBuilder: UntypedFormBuilder) { }

  expand: boolean = false
  PID: number
  isPersonPage: boolean = false

  ngOnChanges(): void {
    this.form = this.formBuilder.group({
      BazCombo_Fld: [],
      IsBaz: [true],
      IsMov: [true],
      OnlyBaz: [true],
      OnlyMov: [true],
    })

    if (this.controller == 'CommissionBaz' 
    || this.controller == 'PersonMostamarBaz' 
    || this.controller == 'PersonSavingInfoBaz' 
    || this.controller == 'PersonDebtInfoBaz' 
    || this.controller == 'PersonInsureInfoBaz' 
    ) {
      this.gridOption.controllerName = this.controller
      this.isBazForm = true
    }
    else this.gridOption.controllerName = 'select-personnel'
    this.setModal()
    this.isPersonPage = this.controller == 'Person' || this.controller == 'PersonTadris' || this.controller == 'PersonBaz' || this.controller == 'PersonMov'

    if (this.multiple) {
      this.gridOption.checkboxSelection = true
      this.expand = true
      this.gridOption = <CustomGridOption>{
        checkboxSelection: true, 
        rowSelected: this.rowSelected.bind(this), 
        rowClicked: this.onRowClicked.bind(this),
        controllerName: this.controller,
      }
    }

    else if (this.isPersonPage) {
      this.expand = true
      let actions: any = [
        {
          label: 'Edit',
          callback: this.onEdit.bind(this),
        },
        {
          label: 'Delete',
          callback: this.onDelete.bind(this)
        },
        {
          label: 'Add',
          callback: this.onAdd.bind(this),
        },
        { width: 100 }
      ]
      this.gridOption.actions = actions
    }


    else if (this.setPersonPID) {
      this.PID = this.setPersonPID
      this.rowClicked.emit(this.setPersonPID)
    }

    this.getAttr()

    if (this.wantToCollapse) this.closePanel(); else if (this.wantToCollapse == false) this.openPanel()

    this.gridOption.rowClickedDetail = this.onRowClickedDetail.bind(this)
    this.controller ? this.controller.toLowerCase().includes('mov') ? this.gridOption.actions = null : null : null
  }

  selectedPersonList = []
  selectedPersonListAllData = []
  rowSelected(event) {
    this.selectedPersonList.includes(event.data.Id) ? this.selectedPersonList = this.selectedPersonList.filter(a => a != event.data.Id) : this.selectedPersonList.push(event.data.Id)
    this.rowSelectedList.emit(this.selectedPersonList)
    this.selectedPersonListAllData.includes(event.data) ? this.selectedPersonListAllData = this.selectedPersonListAllData.filter(a => a != event.data) : this.selectedPersonListAllData.push(event.data)
    if (this.controller == 'PersonWorkAddingInfo') this.rowSelectedListOnModal.emit(this.selectedPersonListAllData)
  }

  save() { this.rowSelectedListOnModal.emit({ ids: this.selectedPersonList, personData: this.gridOption.rowData }) }

  setModal() {
    if (this.isModal) {
      if (this.setPersonPID) {
        this.getSelect()
      }
      this.expand = true
      this.modalOptions = {
        formType: '',
        modatTitle: 'انتخاب پرسنل',
        hideCallback: this.close.bind(this),
        modalId: 'personModal',
        maxWidth: 950,
      }
      this.multiple ? this.modalOptions.saveCallback = this.save.bind(this) : null
    }
  }

  modalOptions: ModalOptions
}
