import { Component } from '@angular/core'
import { IFloatingFilter, TextFilter } from 'ag-grid-community'

@Component({
  selector: 'app-floating-filter',
  templateUrl: './float-filter-renderer.component.html',
  styleUrls: ['./float-filter-renderer.component.scss'],
})
export class FloatFilterRendererComponent {
  onParentModelChanged(): void { }
  params
  public text: string = ''
  public type: string

  colName: string = ''
  rowData = []
  agInit(params: any): void {
    this.params = params
    this.type = params.column.colDef.type
    if (this.type == 'bool') this.colName = this.params.column.getColId()
  }

  checkValueChanged(newValue): void {
    this.params.parentFilterInstance((instance: any) => (<TextFilter>instance).onFloatingFilterChanged('equal', newValue))
  }

  flag = false
  checkboxV = null
  lastVal
  v
  falseCounter = 0
  chechboxChanged(v) {
    if (this.lastVal === false) this.checkboxV = null

    this.checkboxV !== null ? (this.lastVal = v) : (this.lastVal = null)

    let rowData = []
    if (!this.flag) {
      this.params.api.forEachNode(node => this.rowData.push(node.data))
      rowData = [...this.rowData]
      this.flag = true
    } else rowData = [...this.rowData]

    this.checkboxV === null
      ? this.params.api.setRowData(this.rowData)
      : !v
        ? (rowData = rowData.filter(e => e[this.colName] === false || e[this.colName] === null))
        : (rowData = rowData.filter(e => e[this.colName]))
    this.params.api.setRowData(rowData)
  }

}
