import { Component, Input, Output, EventEmitter } from '@angular/core'

@Component({
  selector: 'mat-filter',
  templateUrl: './mat-filter.component.html',
  styleUrls: ['./mat-filter.component.scss']
})
export class MatFilterComponent {

  @Input() comboList
  @Input() valueLabel: string
  @Output() comboListChange = new EventEmitter()
  @Output() refreshChange = new EventEmitter()
  @Input() control: any
  @Input() type: 'combo' | 'multiCombo'

  comboListBackup = []
  firstTime: boolean = true
  onKey(value) {
    this.firstTime ? this.comboListBackup = this.comboList : null
    let filter = value
    this.comboList = this.comboListBackup.filter((option: any) => option.CodeDesc_Fld.includes(filter))
    this.comboListChange.emit(this.comboList)
    this.firstTime = false
  }

  filterValue: string = ''
  clearFilter() {
    !this.firstTime ? this.comboList = this.comboListBackup : null
    this.comboListChange.emit(this.comboList)
    this.filterValue = ""
    this.valueLabel = null
    this.control.patchValue(null)
  }

  refreshArray() {
    this.filterValue = ""
    this.refreshChange.emit()
  }

}
