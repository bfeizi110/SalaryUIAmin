import { Component, EventEmitter, Input, Output } from '@angular/core'
import { ToastrService } from 'ngx-toastr'
import { CustomGridOption } from 'src/app/main/main-body/common/custom-ag-grid/interfaces/ag-grid-option.interface'
import { GridFormService } from 'src/app/main/main-body/common/grid-form.service'
import { ModalOptions } from '../custom-modal/modal-options.interface'
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms'

@Component({
  selector: 'select-user',
  templateUrl: './select-user.component.html',
  styleUrls: ['./select-user.component.scss']
})
export class SelectUserComponent/*  implements OnInit */ {

  @Output() rowClicked = new EventEmitter()
  @Output() rowSelectedList = new EventEmitter()
  @Output() closed = new EventEmitter()
  @Output() selectedUserTitle = new EventEmitter()

  @Input() setUserID: number
  @Input() multiple: boolean

  showGrid: boolean = false
  controller: string = 'Users'

  gridOption = <CustomGridOption>{ rowClicked: this.onRowClicked.bind(this) }

  selectedUser: string
  onRowClicked(event) {
    this.selectedUser = `${event.data.UserTitle}`
    this.rowClicked.emit(event.data.Id)
    this.selectedUserTitle.emit(this.selectedUser)
    //!this.isPersonPage ? this.expand = false : null
  }

  form: UntypedFormGroup
    
  formObj: any
  getAttr() {
    this.showGrid = false

      this.service.get(`Users/GetAttribute`).subscribe((res: any) => {
        this.gridOption.columnDefs = res.Data
        this.formObj = res.Data.EntityAttribute
        this.getSelect()
      })
  }

  focusField: any
  getSelect() {
    this.showGrid = false

      this.service.get('Users/GetSelectAll').subscribe((res: any) => {
        this.gridOption.rowData = res.Data
        this.showGrid = true
      })
  }

  showModal: boolean = false
  close() {
    this.showModal = false
    let sidebar = document.getElementsByClassName('app-sidebar')[0] as HTMLElement
    sidebar.style.zIndex = '3'
    this.closed.emit()
  }

  constructor(private service: GridFormService, private toastr: ToastrService, private formBuilder: UntypedFormBuilder) { }

  ngOnChanges(): void {
    this.setModal()
    if (this.multiple) {
      this.gridOption.checkboxSelection = true
      this.gridOption = <CustomGridOption>{
        checkboxSelection: true, 
        rowSelected: this.rowSelected.bind(this), 
        rowClicked: this.onRowClicked.bind(this),
        controllerName: this.controller,
      }
    }

    this.getAttr()

  }

  selectedUserList = []
  selectedUserListAllData = []
  rowSelected(event) {
    this.selectedUserList.includes(event.data.Id) ? this.selectedUserList = this.selectedUserList.filter(a => a != event.data.Id) : this.selectedUserList.push(event.data.Id)
    this.rowSelectedList.emit(this.selectedUserList)
    this.selectedUserListAllData.includes(event.data) ? this.selectedUserListAllData = this.selectedUserListAllData.filter(a => a != event.data) : this.selectedUserListAllData.push(event.data)
  }

  setModal() {
      // if (this.setUserID) 
      // {
      //   this.getSelect()
      // }
      this.modalOptions = {
        formType: '',
        modatTitle: 'انتخاب کاربر',
        hideCallback: this.close.bind(this),
        modalId: 'userModal',
        maxWidth: 950,
      }
  }

  modalOptions: ModalOptions
}
