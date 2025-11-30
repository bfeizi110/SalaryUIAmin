import { Component, EventEmitter, Input, Output } from '@angular/core'
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms'
import { CustomGridOption } from 'src/app/main/main-body/common/custom-ag-grid/interfaces/ag-grid-option.interface'

import { ControlMessageService } from 'src/app/main/main-body/common/custom-form/control-message/control-message.service'
import { Validation } from 'src/app/main/main-body/common/custom-form/control-message/Validation'
import { ModalOptions } from 'src/app/main/main-body/common/custom-modal/modal-options.interface'
import { GridFormService } from 'src/app/main/main-body/common/grid-form.service'
import { setWorkFlowDetailReferRoleAccessAttr, setWorkFlowDetailReferUserAccessAttr, WorkFlowDetailReferRoleAccessAttr, WorkFlowDetailReferUserAccessAttr } from 'src/app/main/pages/global-attr'

const Controller = 'WorkFlowDetailsRefer'
const UserAccessController = 'WorkFlowDetailsUserAccess'
const RoleAccessController = 'WorkFlowDetailsRoleAccess'

@Component({
  selector: 'workflow-details-refer-form',
  templateUrl: './workflow-details-refer-form.component.html',
  styleUrls: ['./workflow-details-refer-form.component.scss']
})
export class WorkFlowDetailsReferFormComponent {

  @Output() done = new EventEmitter()
  @Output() closed = new EventEmitter()
  @Input() WorkFlowDetailID: number
  @Input() WorkFlowID: number
  @Input() ID: number
  @Input() formType: string
  @Input() formObj: any

  showGridUserAccess: boolean = false
  showGridUserNotAccess: boolean = false
  showGridRoleAccess: boolean = false
  showGridRoleNotAccess: boolean = false
  showGrids: boolean = false
  comboUrl: string 

  gridOptionUserAccess = <CustomGridOption>{ checkboxSelection: true, rowSelected: this.rowSelectedUserAccess.bind(this) }
  gridOptionUserNotAccess = <CustomGridOption>{ checkboxSelection: true, rowSelected: this.rowSelectedUserNotAccess.bind(this) }
  gridOptionRoleAccess = <CustomGridOption>{ checkboxSelection: true, rowSelected: this.rowSelectedRoleAccess.bind(this) }
  gridOptionRoleNotAccess = <CustomGridOption>{ checkboxSelection: true, rowSelected: this.rowSelectedRoleNotAccess.bind(this) }

  UserAcccessList: any
  selectedUserAcccessList = []
  rowSelectedUserAccess(event) { this.selectedUserAcccessList.includes(event.data) ? this.selectedUserAcccessList = this.selectedUserAcccessList.filter(a => a != event.data) : this.selectedUserAcccessList.push(event.data) }
  UserNotAcccessList: any
  UserEmptyList: any
  selectedUserNotAcccessList = []
  rowSelectedUserNotAccess(event) { this.selectedUserNotAcccessList.includes(event.data) ? this.selectedUserNotAcccessList = this.selectedUserNotAcccessList.filter(a => a != event.data) : this.selectedUserNotAcccessList.push(event.data) }

  selectedRoleAcccessList = []
  RoleEmptyList: any
  RoleAcccessList: any
  rowSelectedRoleAccess(event) { this.selectedRoleAcccessList.includes(event.data) ? this.selectedRoleAcccessList = this.selectedRoleAcccessList.filter(a => a != event.data) : this.selectedRoleAcccessList.push(event.data) }
  selectedRoleNotAcccessList = []
  RoleNotAcccessList: any
  rowSelectedRoleNotAccess(event) { this.selectedRoleNotAcccessList.includes(event.data) ? this.selectedRoleNotAcccessList = this.selectedRoleNotAcccessList.filter(a => a != event.data) : this.selectedRoleNotAcccessList.push(event.data) }

  model: { WorkFlowDetailID_Fld: number, ClaimStr?: string, RoleID_Fld: number, UserID_Fld: number}

  filterList = []
  async getWhereList() {
    return new Promise(resolve => {
      if (this.filterList.length == 0) {
        this.service.get(`${Controller}/GetWhereTablesCombo/${this.WorkFlowDetailID}`).subscribe((res: any) => {
          this.filterList = res.Data
          return resolve(true)
        })
      }
      else return resolve(true)
    })
  }

  whereChange(whereValue) {
    this.data.WorkFlowDetailsReferWheres = whereValue
    this.form.controls.WorkFlowDetailsReferWheres.patchValue(whereValue)
  }

  addUserAccess() {
    this.showGridUserAccess = false
    this.showGridUserNotAccess = false
    this.selectedUserNotAcccessList.forEach(e => this.UserAcccessList.push(e))
    this.selectedUserNotAcccessList.forEach(e => {
      const index: number = this.UserNotAcccessList.indexOf(e);
      if (index !== -1) {
        this.UserNotAcccessList.splice(index, 1);
      }       
    })
    this.selectedUserNotAcccessList = []
    this.gridOptionUserAccess.rowData = this.UserAcccessList.filter(a => a.Id != 0)
    this.gridOptionUserNotAccess.rowData = this.UserNotAcccessList.filter(a => a.Id != 0)
    setTimeout(() => {
      this.showGridUserAccess = true
      this.showGridUserNotAccess = true
    }, 0);
  }

  removeUserAccess() {
    this.showGridUserAccess = false
    this.showGridUserNotAccess = false
    this.selectedUserAcccessList.forEach(e => this.UserNotAcccessList.push(e))
    this.selectedUserAcccessList.forEach(e => {
      const index: number = this.UserAcccessList.indexOf(e);
      if (index !== -1) {
        this.UserAcccessList.splice(index, 1);
      }       
    })
    this.selectedUserAcccessList = []
    this.gridOptionUserNotAccess.rowData = this.UserNotAcccessList.filter(a => a.Id != 0)
    this.gridOptionUserAccess.rowData = this.UserAcccessList.filter(a => a.Id != 0)
    setTimeout(() => {
      this.showGridUserAccess = true
      this.showGridUserNotAccess = true
    }, 0);
  }

  addRoleAccess() {
    this.selectedRoleNotAcccessList.forEach(e => this.RoleAcccessList.push(e))
    this.selectedRoleNotAcccessList.forEach(e => {
      const index: number = this.RoleNotAcccessList.indexOf(e);
      if (index !== -1) {
        this.RoleNotAcccessList.splice(index, 1);
      }       
    })
    this.RoleNotAcccessList = this.RoleNotAcccessList.filter(a => a.Id != 0)
    if (this.RoleNotAcccessList.length == 0) this.RoleEmptyList.forEach(e => this.RoleNotAcccessList.push(e))

    this.RoleAcccessList = this.RoleAcccessList.filter(a => a.Id != 0)
    if (this.RoleAcccessList.length == 0) this.RoleEmptyList.forEach(e => this.RoleAcccessList.push(e))

    this.selectedRoleNotAcccessList = []
    this.gridOptionRoleNotAccess.rowData = this.RoleNotAcccessList
    this.gridOptionRoleAccess.rowData = this.RoleAcccessList
    this.showGridRoleAccess = false
    this.showGridRoleNotAccess = false
    setTimeout(() => {
      this.showGridRoleAccess = true
      this.showGridRoleNotAccess = true
    }, 0);
  }

  removeRoleAccess() {
    this.selectedRoleAcccessList.forEach(e => this.RoleNotAcccessList.push(e))
    this.selectedRoleAcccessList.forEach(e => {
      const index: number = this.RoleAcccessList.indexOf(e);
      if (index !== -1) {
        this.RoleAcccessList.splice(index, 1);
      }       
    })
    this.RoleNotAcccessList = this.RoleNotAcccessList.filter(a => a.Id != 0)
    if (this.RoleNotAcccessList.length == 0) this.RoleEmptyList.forEach(e => this.RoleNotAcccessList.push(e))

    this.RoleAcccessList = this.RoleAcccessList.filter(a => a.Id != 0)
    if (this.RoleAcccessList.length == 0) this.RoleEmptyList.forEach(e => this.RoleAcccessList.push(e))

    this.selectedRoleAcccessList = []
    this.gridOptionRoleNotAccess.rowData = this.RoleNotAcccessList
    this.gridOptionRoleAccess.rowData = this.RoleAcccessList
    this.showGridRoleAccess = false
    this.showGridRoleNotAccess = false
    setTimeout(() => {
      this.showGridRoleAccess = true
      this.showGridRoleNotAccess = true
    }, 0);
  }

  getEmptyList(){
    this.service.get(`${Controller}/GetSelectUserAccessEmpty`).toPromise().then((res: any) => {
      if (!res || !res.Data) return this.done.emit(false)
      else {
        this.UserEmptyList = res.Data
      }
    })
    this.service.get(`${Controller}/GetSelectRoleAccessEmpty`).toPromise().then((res: any) => {
      if (!res || !res.Data) return this.done.emit(false)
      else {
        this.RoleEmptyList = res.Data
      }
    })

  }
  
  getUserAccessAttr() {
    let Attr = WorkFlowDetailReferUserAccessAttr()
    !Attr
      ? this.service.getAttr(UserAccessController).subscribe((res: any) => this.setUserAccessAttr(res.Data, 'toLocal'))
      : this.setUserAccessAttr(Attr)
  }

  setUserAccessAttr(attr, type?) {
    this.gridOptionUserAccess.columnDefs  = attr
    this.gridOptionUserNotAccess.columnDefs  = attr
    type == 'toLocal' ? setWorkFlowDetailReferUserAccessAttr(attr) : null
  }

  getRoleAccessAttr() {
    let Attr = WorkFlowDetailReferRoleAccessAttr()
    !Attr
      ? this.service.getAttr(RoleAccessController).subscribe((res: any) => this.setRoleAccessAttr(res.Data, 'toLocal'))
      : this.setRoleAccessAttr(Attr)
  }

  setRoleAccessAttr(attr, type?) {
    this.gridOptionRoleAccess.columnDefs  = attr
    this.gridOptionRoleNotAccess.columnDefs  = attr
    type == 'toLocal' ? setWorkFlowDetailReferRoleAccessAttr(attr) : null
  }  

  changeReferType(){
    this.ID = !this.ID ? 0 : this.ID

    if (this.form.controls.ReferTypeID_Fld.value == 101072 )
    {
      this.service.getByIdSimple(`${Controller}/GetSelectRoleNotAccess`, this.ID).toPromise().then((res: any) => {
        if (!res || !res.Data) return this.done.emit(false)
        else {
          this.gridOptionRoleNotAccess.rowData = res.Data
          this.RoleNotAcccessList = res.Data
          this.showGridRoleNotAccess = true
        }
      })
      this.service.getByIdSimple(`${Controller}/GetSelectRoleAccess`, this.ID).toPromise().then((res: any) => {
        if (!res || !res.Data) return this.done.emit(false)
        else {
          this.gridOptionRoleAccess.rowData = res.Data
          this.RoleAcccessList = res.Data
          this.showGridRoleAccess = true
        }
      })
      this.service.getByIdSimple(`${Controller}/GetSelectUserNotAccess`, this.ID).toPromise().then((res: any) => {
        if (!res || !res.Data) return this.done.emit(false)
        else {
          this.gridOptionUserNotAccess.rowData = res.Data
          this.UserNotAcccessList = res.Data
          this.showGridUserNotAccess = true
        }
      })
      this.service.getByIdSimple(`${Controller}/GetSelectUserAccess`, this.ID).toPromise().then((res: any) => {
        if (!res || !res.Data) return this.done.emit(false)
        else {
          this.gridOptionUserAccess.rowData = res.Data
          this.UserAcccessList = res.Data
          this.showGridUserAccess = true
        }
      })
    }
    else
    {
      this.showGridUserAccess = false
      this.showGridUserNotAccess = false
  
      this.showGridRoleAccess = false
      this.showGridRoleNotAccess = false
    }

  }

  data: any = {}
  get() {
    this.service.getById(Controller, !this.ID ? 0 : this.ID, this.formType).toPromise().then((res: any) => {
      if (!res || !res.Data) return this.done.emit(false)
      else {
        this.data = res.Data
        if (this.data.ReferTypeID_Fld == 101072)
        {
          this.gridOptionRoleAccess.rowData = res.Data.RoleAccess
          this.RoleAcccessList = res.Data.RoleAccess

          this.gridOptionRoleNotAccess.rowData = res.Data.RoleNotAccess
          this.RoleNotAcccessList = res.Data.RoleNotAccess

          this.gridOptionUserAccess.rowData = res.Data.UserAccess
          this.UserAcccessList = res.Data.UserAccess

          this.gridOptionUserNotAccess.rowData = res.Data.UserNotAccess
          this.UserNotAcccessList = res.Data.UserNotAccess

          setTimeout(() => {
            this.showGridRoleAccess = true
            this.showGridRoleNotAccess = true
            this.showGridUserAccess = true
            this.showGridUserNotAccess = true
          }, 0);
        }
        this.setForm()
      }
    })
  }

  put() { 
    let PostModel: any
    PostModel = this.form.getRawValue()
    PostModel.UserAccess = this.UserAcccessList
    PostModel.RoleAccess = this.RoleAcccessList
    this.service.post(`${Controller}/Update`, PostModel).subscribe((res: any) => { res && res.IsSuccess ? this.done.emit(res.Data) : null }) 
  }
  
  post() { 
    let PostModel: any
    PostModel = this.form.getRawValue()
    if (this.UserAcccessList) PostModel.UserAccess = this.UserAcccessList.filter(a => a.Id != 0)
    if (this.RoleAcccessList) PostModel.RoleAccess = this.RoleAcccessList.filter(a => a.Id != 0)
    this.service.post(`${Controller}/Create`, PostModel).subscribe((res: any) => { res && res.IsSuccess ? this.done.emit(res.Data) : null }) 
  }
  form: UntypedFormGroup
  setForm() {
    Validation.form = this.formObj
    this.form = this.formBuilder.group({
      Id: [0],
      WorkFlowDetailID_Fld: [this.WorkFlowDetailID],
      ReferTypeID_Fld: [{ value: null, disabled: Validation.disable('ReferTypeID_Fld') }, Validation.setValidator('ReferTypeID_Fld')],
      ReferTypeIDDesc_Fld:[null],
      AutoReferTypeID_Fld: [{ value: null, disabled: Validation.disable('AutoReferTypeID_Fld') }, Validation.setValidator('AutoReferTypeID_Fld')],
      AutoReferTypeIDDesc_Fld:[null],
      ReferUserID_Fld: [{ value: null, disabled: Validation.disable('ReferUserID_Fld') }, Validation.setValidator('ReferUserID_Fld')],
      ReferUserIDDesc_Fld:[null],
      ReferOrgID_Fld: [{ value: null, disabled: Validation.disable('ReferOrgID_Fld') }, Validation.setValidator('ReferOrgID_Fld')],
      ReferOrgIDDesc_Fld:[null],
      ReferPostID_Fld: [{ value: null, disabled: Validation.disable('ReferPostID_Fld') }, Validation.setValidator('ReferPostID_Fld')],
      ReferPostIDDesc_Fld:[null],
      ToWorkFlowDetailID_Fld: [{ value: null, disabled: Validation.disable('ToWorkFlowDetailID_Fld') }, Validation.setValidator('ToWorkFlowDetailID_Fld')],
      ToWorkFlowDetailIDDesc_Fld:[null],
      WorkFlowDetailsReferWheres: [[]],
      RoleAccess:[null],
      UserAccess:[null],
      FormType:[{value: this.formType}],
      ReferPostTypeIDDesc_Fld: [null],
      ReferPostTypeID_Fld: [{ value: null, disabled: Validation.disable('PostTypeID') }, Validation.setValidator('PostTypeID')],

    })
    this.formType != 'Add' ? this.form.patchValue(this.data) : null
    this.personName = this.data.ReferUserIDDesc_Fld
    this.showModal = true
  }

  clearPerson() {
    this.form.controls.ReferUserID_Fld.patchValue(null)
    this.personName = null
  }

  showUser: boolean = false
  onShowUser() {
    this.showUser = true
  }

  personName: string
  onSelectPersonnel(data) {
    this.form.controls.ReferUserID_Fld.setValue(data)
    // this.personName = `${data.Name} -- ${data.Family}`
    this.showUser = false
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

  showTreeModal: boolean = false
  onShowCostCenterModal() {
    this.showTreeModal = true
  }

  clearOrg() {
    this.form.controls.ReferOrgID_Fld.patchValue(null)
    this.form.controls.ReferOrgIDDesc_Fld.patchValue(null)

    this.form.controls.ReferPostID_Fld.patchValue(null)
    this.form.controls.ReferPostIDDesc_Fld.patchValue(null)
  }

  closedTreeModal() { this.showTreeModal = false }

  nodeSelected(node) {
    if (node.Id) {
      this.form.controls.ReferOrgID_Fld.patchValue(node.Id)
      this.form.controls.ReferOrgIDDesc_Fld.patchValue(node.name)
    }
    this.showTreeModal = false
    this.changeOrgId()
  }

  postUrl: string = ''
  changeOrgId() {
    if (this.form.controls.ReferOrgID_Fld.value) {
      this.form.controls.ReferPostID_Fld.enable()
      this.postUrl = `*Post/GetComboNew/${this.form.controls.ReferOrgID_Fld.value}`
    }
    else {
      this.form.controls.ReferPostID_Fld.patchValue(null)
      this.form.controls.ReferPostID_Fld.disable()
    }
  }  
  modalOptions: ModalOptions

  constructor(private controlService: ControlMessageService, private service: GridFormService, private formBuilder: UntypedFormBuilder) { }

  ngOnChanges(UpdatedValue: string): void {
    let sidebar = document.getElementsByClassName('app-sidebar')[0] as HTMLElement
    sidebar.style.zIndex = '0'

    this.getUserAccessAttr()
    this.getRoleAccessAttr()
    this.getEmptyList()
    this.getWhereList()
    this.comboUrl = `WorkFlowDetails/${this.WorkFlowID}/${this.WorkFlowDetailID}`
    this.formType != 'Add' ? this.get() : this.setForm()
    this.modalOptions = {
      formType: this.formType,
      modatTitle: 'مشخصات ارجاع',
      saveCallback: this.save.bind(this),
      hideCallback: this.close.bind(this),
      notDisabledInViewMode: true
    }
  }
  ngOnDestroy(): void {
    let sidebar = document.getElementsByClassName('app-sidebar')[0] as HTMLElement
    sidebar.style.zIndex = '3'
  }
}