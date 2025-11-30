import { Component } from '@angular/core'
import { ToastrService } from 'ngx-toastr'
import { ContextMenuService } from 'src/app/main/main-body/common/context-menu.service'
import { GridFormService } from 'src/app/main/main-body/common/grid-form.service'
import { CardexWorkAddingAttr, setPersonWorkAddingInfoAttr, setCardexWorkAddingAttr, PersonWorkAddingInfoAttr } from '../../../../global-attr'

const Controller = 'PersonWorkAddingInfo'

@Component({
  templateUrl: './person-work-adding-info.component.html',
  styleUrls: ['./person-work-adding-info.component.scss']
})
export class PersonWorkAddingInfoComponent {

  Controller = Controller
  filterDto: any
  showSelectPerson: boolean = false
  personData = []
  filterDTO
  setPID: number
  personId
  selectedPersonelNF: any
  
  async onFilter(dto) {
    this.service.post(`${Controller}/GetSelect`, dto).subscribe(async (res: any) => {
      await this.getAttr()
      this.personData = res.Data
      this.filterDto = dto
      this.showSelectPerson = true
      let id
      let contextMenuId = this.contextMenuService.id
      if (!contextMenuId) return
      id = this.personData.filter(a => a.PersonID_Fld == contextMenuId)[0].PersonID_Fld
      this.setPID = id
      if (id) this.onSelectPersonnel(id)
      else this.toastr.error('فرد وجود ندارد', 'حطا')
    })
  }

  onSelectPersonnel(id) {
    this.ID = id
    this.selectedPersonList = []
    this.showForm = true
    this.cardexOptions = {
      Controller: Controller, ComboType: `OtherDetail/10041`, ComboTitle: 'نوع اطلاعات ماهانه',
      PID: this.ID, columnDefs: this.attr
    }
    this.showCardex = false
    setTimeout(() => this.showCardex = true)
  }

  ID: number
  showForm: boolean = false
  selectedPersonList = []

  rowClickedwithDetail(data) {
    this.ID = typeof data == 'number' ? data : data.PersonID_Fld
    this.selectedPersonList = []
    this.selectedPersonListString = ''
    this.showForm = true
  }

  rowSelectedList(idArray) {
    this.selectedPersonelNF = null
    if (idArray.length == 0) {
      this.showForm = false 
      return
    }
    if (idArray.length == 1) this.showForm = false
    this.selectedPersonList = idArray.map(p => p.PersonID_Fld).toString()
    this.selectedPersonListString = this.selectedPersonList.toString()
    if (this.selectedPersonList.length == 0) this.showForm = false 
    if (idArray.length == 1) this.showForm = true
  }

  closeForm() {
    this.showForm = false
  }

  cardexOptions
  showCardex: boolean = false
  activeTab: number = 0
  showGrid: boolean = true

  async changeTab(index) {
    this.activeTab = index
    if (index == 0) return this.showCardex = false
    await this.getAttrCardex()
    this.cardexOptions = {
      Controller: Controller,
      ComboType: `${Controller}/${this.ID}`,
      ComboTitle: 'نوع اضافه کار',
      PID: this.ID,
      columnDefs: this.cardexAttr
    }
    setTimeout(() => this.showCardex = true)
  }

  cardexAttr: any
  getAttrCardex() {
    let Attr = CardexWorkAddingAttr()
    if (!Attr) {
      return new Promise(resolve => {
        this.service.get(`${Controller}/GetAttributeKardex`).subscribe((res: any) => {
          this.cardexAttr = res.Data
          setCardexWorkAddingAttr(res.Data)
          return resolve(true)
        })
      })
    }
    else this.cardexAttr = Attr
  }

  getAttr() {
    return new Promise(resolve => {
      if (!PersonWorkAddingInfoAttr) {
        this.service.get(`${Controller}/GetAttributeSelect`).subscribe((res: any) => {
          this.setAttr(res.Data, 'toLocal')
          return resolve(true)
        })
      }
      else {
        this.setAttr(PersonWorkAddingInfoAttr)
        return resolve(true)
      }
    })
  }

  accesses = []
  attr: any
  setAttr(attr, type?) {
    this.attr = attr
    this.accesses = attr.EntityAccess
    type == 'toLocal' ? setPersonWorkAddingInfoAttr(attr) : null
  }

  selectedPersonListString: string = ''
  rowSelected(event) {
    this.selectedPersonData = null
    this.selectedPersonList.includes(event.data.PersonID_Fld) ? this.selectedPersonList = this.selectedPersonList.filter(a => a != event.data.PersonID_Fld) : this.selectedPersonList.push(event.data.PersonID_Fld)
    this.selectedPersonListString = this.selectedPersonList.toString()
    if (this.selectedPersonList.length == 0)
      setTimeout(() => this.showForm = false, 150) 
    else
      setTimeout(() => this.showForm = true, 150) 
  }

  selectedPersonData: any

  submit(stri) { 
    this.showGrid = false
    this.closeForm()
    this.selectedPersonList = []
    this.selectedPersonListString = ''
    setTimeout(() => {
      this.showGrid = true
      }
      , 100)
  }

  constructor(private service: GridFormService, private contextMenuService: ContextMenuService, private toastr: ToastrService) { }

  controller: string

}
