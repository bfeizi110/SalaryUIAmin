import { Component, EventEmitter, Input, Output } from '@angular/core'
import { GridFormService } from 'src/app/main/main-body/common/grid-form.service'

@Component({
  selector: 'where',
  templateUrl: './where.component.html',
  styleUrls: ['./where.component.scss']
})
export class WhereComponent {

  @Output() entityFrameListChange = new EventEmitter()

  @Input() entityFrameList: EntityFrameDTO[]
  @Input() FilterID_Fld: string
  // @Input() filterValue: any[]
  @Input() entityList: any[]
  // @Input() controller: string
  @Input() formType: string

  andOrConditionList = [
    { Id: "and", CodeDesc_Fld: 'و' },
    { Id: "or", CodeDesc_Fld: 'یا' }
  ]

  add() {
    this.entityFrameList.push(new EntityFrameDTO())
    // if (this.FilterID_Fld) {
      // this.entityList = this.filterValue
      this.entityFrameList[this.entityFrameList.length - 1].EntityName_Fld = this.entityList[0].CodeDescEn_Fld
    // }
    this.conditionList.push()
    this.entityFrameListChange.emit(this.entityFrameList)
  }

  deleteRow(index) {
    if (this.entityFrameList.length - 1 != index) {
      let x = this.entityFrameList[index + 1]
      this.entityFrameList.splice(index, 1)
      this.entityFrameList[index] = x
    }
    else this.entityFrameList.splice(index, 1)
    this.conditionList.splice(index, 1)
    this.entityFrameListChange.emit(this.entityFrameList)
  }

  openPar: boolean
  closePar: boolean

  changeCheckbox(event, i) {
    this.entityFrameListChange.emit(this.entityFrameList)
  }

  entityValue

  async clickEntityProperty(index) {
    return new Promise(resolve => {
      this.service.get(`EntityProperty/GetComboNew/${this.entityFrameList[index].EntityName_Fld}`).subscribe((res: any) => {
        this.entityPropertyList = res.Data
        return resolve(true)
      })
    })
  }

  entityPropertyList = []
  getEntityProperty(i, byUser?) {
    return new Promise(resolve => {
      this.service.get(`EntityProperty/GetComboNew/${this.entityList[i].CodeDescEn_Fld}`).subscribe((res: any) => {
        this.entityPropertyList = res.Data
        if (byUser) {
          this.entityFrameList[i].EntityName_Fld = this.entityList[i].CodeDescEn_Fld
          this.entityFrameList[i].EntityNameDesc_Fld = this.entityList[i].CodeDesc_Fld
          this.entityFrameList[i].EntityPropertyName_Fld = null
          this.entityFrameList[i].EntityPropertyNameDesc_Fld = null
          this.entityFrameList[i].Value_Fld = null
          this.entityFrameList[i].comboDto = []
          this.entityFrameList[i].WhereID_Fld = null
          this.entityFrameList[i].WhereIDDesc_Fld = null
        }
        return resolve(true)
      })
    })
  }

  entityPropertyValue
  conditionList = []
  conditionValue: any
  valueType: string
  entityPropertyChange(index, fromWhere) {
    return new Promise(resolve => {
      this.service.get(`EntityProperty/GetWhereByName/${this.entityFrameList[index].EntityName_Fld}/${this.entityFrameList[index].EntityPropertyName_Fld}`).subscribe((res: any) => {
        const data = res.Data
        this.conditionList.splice(index, 1, data.Item1)
        this.entityFrameList[index].comboDto = data.Item2
        if (!fromWhere) {
          this.entityFrameList[index].WhereID_Fld = null
          this.entityFrameList[index].Value_Fld = null
        }
        this.entityFrameListChange.emit(this.entityFrameList)
        return resolve(true)
      })
    })
  }

  conditionChange(val, index) {
    this.entityFrameList[index].Value_Fld = null
    this.entityFrameListChange.emit(this.entityFrameList)
  }

  value
  changeValue(val, i) {
    this.entityFrameList[i].Value_Fld = this.entityFrameList[i].Value_Fld.toString()
    this.entityFrameListChange.emit(this.entityFrameList)
  }

  AndOrChange() {
    this.entityFrameListChange.emit(this.entityFrameList)
  }

  constructor(private service: GridFormService) { }

  showForm: boolean = false
  async buildForm() {
    if (this.formType == 'Add') {
      this.entityFrameList = []
      this.entityFrameList.push(new EntityFrameDTO())
      this.entityFrameList[0].EntityName_Fld = this.entityList[0].CodeDescEn_Fld
      await this.getEntityProperty(0)
      this.showForm = true
    }
    else {
      // for (let i = 0; i < this.entityFrameList.length; i++) await this.entityPropertyChange(i, true)
      this.conditionList = new Array<any>(this.entityFrameList.length)
      this.setValueToArray()
      this.showForm = true
    }
    setTimeout(() => {
      this.service.scrollToElement('where')
    }, 200); 
  }

  showCombo = false
  setValueToArray() {
    this.entityFrameList.forEach(element => element.comboDto && element.comboDto.length > 0 && element.Value_Fld && element.Value_Fld ? element.Value_Fld = element.Value_Fld.toString().split(',').map(i => Number(i)) : null)
    setTimeout(() => this.showCombo = true)
  }

  ngOnChanges(e) {
    if (Object.keys(e).length == 1 && e.entityFrameList) null; else this.buildForm()
     setTimeout(() => {
      this.service.scrollToElement('where')
     }, 200); 
    this.showCombo = false
  }

}

export class EntityFrameDTO {
  AndOr_Fld: string = null
  Open_Fld: boolean = false
  Close_Fld: boolean = false
  EntityName_Fld: string = null
  EntityNameDesc_Fld: string = null
  EntityPropertyName_Fld: string = null
  EntityPropertyNameDesc_Fld: string = null
  WhereID_Fld: number = null
  WhereIDDesc_Fld: string = null
  comboDto: any = []
  Value_Fld: any = null
}