import { Component, OnInit } from '@angular/core'
import { ToastrService } from 'ngx-toastr'
import { ContextMenuService } from 'src/app/main/main-body/common/context-menu.service'
import { GridFormService } from 'src/app/main/main-body/common/grid-form.service'
import { PersonMonthInfoAttr, setPersonMonthInfoAttr } from '../../../../global-attr'

const Controller = 'PersonMonthInfo'

@Component({
  templateUrl: './person-month-info.component.html',
  styleUrls: ['./person-month-info.component.scss']
})
export class PersonMonthInfoComponent implements OnInit {

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
      this.setPID = this.contextMenuService.id
      if (!this.setPID) return
      let id = this.personData.filter(a => a.PersonID_Fld == this.contextMenuService.id)[0].Id
      if (id) 
      {
                this.onSelectPersonnel(id)
      }
      else this.toastr.error('فرد وجود ندارد', 'خظا')
    })
  }

  onSelectPersonnelDetail(id) {
    this.ID = id
    this.showForm = false
  }
  
  onSelectPersonnel(id) {
    let PID=this.personData.filter(a => a.Id == id)[0].PersonID_Fld;
    // console.log(PID)
    this.selectedPersonListString = ''
    this.ID = id
    this.selectedPersonList = []
    setTimeout(() => this.showForm = true, 150)
    this.cardexOptions = {
      Controller: Controller, ComboType: `OtherDetail/10041`, ComboTitle: 'نوع اطلاعات ماهانه',
      PID: PID, columnDefs: this.attr
    }
    this.showCardex = false
    setTimeout(() => this.showCardex = true)
  }

  ID: number
  showCardex: boolean = false
  selectedPersonData: any

  selectedPersonList = []
  selectedPersonListString: string = ''
  rowSelectedList(idArray) {
    this.selectedPersonelNF = null
    if (idArray.length == 0) {
      this.showForm = false 
      return
    }
    if (idArray.length == 1) this.showForm = false
    this.selectedPersonList = idArray
    this.selectedPersonListString = this.selectedPersonList.toString()
    if (this.selectedPersonList.length == 0) this.showForm = false 
    if (idArray.length == 1) this.showForm = true
  }

  formObj: any
  showForm: boolean = false
  getAttr() {
    return new Promise(resolve => {
      if (!PersonMonthInfoAttr) {
        this.service.getAttr(Controller).subscribe((res: any) => {
          this.setAttr(res.Data, 'toLocal')
          return resolve(true)
        })
      }
      else {
        this.setAttr(PersonMonthInfoAttr)
        return resolve(true)
      }
    })
  }

  accesses = []
  cardexOptions
  attr
  setAttr(attr, type?) {
    this.attr = attr
    this.formObj = attr.EntityAttribute
    this.accesses = attr.EntityAccess
    this.formObj = attr.EntityAttribute
    type == 'toLocal' ? setPersonMonthInfoAttr(attr) : null
  }

  showGrid: boolean = true
  closeForm() {
    this.showForm = false
  }

  submited() {
    this.showGrid = false
    this.showSelectPerson = false
    this.closeForm()
    this.selectedPersonList = []
    this.selectedPersonListString = ''
    this.onFilter(this.filterDto)
    setTimeout(() => {
    this.showGrid = true
    }
    , 100)
  }

  constructor(private service: GridFormService, private contextMenuService: ContextMenuService, private toastr: ToastrService) { }

  ngOnInit(): void { }

}
