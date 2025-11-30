import { Action } from '../../interfaces/action.interface';
import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-header-renderer',
  templateUrl: './header-renderer.component.html',
  styleUrls: ['./header-renderer.component.scss']
})
export class HeaderRendererComponent {

  hover: boolean = false
  @ViewChild('menuButton', { read: ElementRef, static: false }) public menuButton

  onAddClick(item, $event) {
    if (item.callback instanceof Function) {
      const params = {
        event: $event,
        rowData: []
      }
      item.callback(params)
    }
  }

  onExcellClick() {
    this.params.api.exportDataAsExcel({ processRowGroupCallback: this.rowGroupCallback })
  }

  rowGroupCallback(params) {
    return params.node.key
  }

  params: any
  actions: Action[] = []

  haveButton: boolean
  actionAccess = []
  agInit(params): void {
    // آیا این جدول دکمه عملیات دارد یا نه
    this.params = params
    this.params.actions ? this.actions = this.params.actions : null
    this.actionAccess = this.params.actionAccess
    this.setButtons()


    params.column.addEventListener('sortChanged', this.onSortChanged.bind(this))
    this.onSortChanged()
  }

  addAction: Action
  setButtons() { this.actionAccess && this.actionAccess.includes("AddPolicy") ? this.addAction = this.actions.filter(a => a.label == "Add")[0] : null }


  ascSort: string
  descSort: string
  noSort: string
  onSortChanged() {
    this.ascSort = this.descSort = this.noSort = 'inactive';
    if (this.params.column.isSortAscending()) {
      this.ascSort = 'active';
    } else if (this.params.column.isSortDescending()) {
      this.descSort = 'active';
    } else {
      this.noSort = 'active';
    }
  }

  onMenuClicked(event) {
    this.params.showColumnMenu(this.menuButton.nativeElement);
  }

  sort: string = '';
  _sortingUp: boolean = false;
  _sortingDown: boolean = false;
  _sorting: boolean = true;
  onSortRequested(order, event) {
    if (this.params && (this.params.column.colId == 'View' || this.params.column.colId == 'Edit' || this.params.column.colId == 'Add' || this.params.column.colId == 'Delete')) return

    if (order == '') {
      this._sortingUp = true;
      this._sortingDown = false;
      this._sorting = false;
      order = 'asc';
      this.sort = 'asc';
    }
    else if (order == 'asc') {
      this._sortingUp = false;
      this._sortingDown = true;
      this._sorting = false;
      order = 'desc';
      this.sort = 'desc';
    }
    else if (order == 'desc') {
      this._sortingUp = false;
      this._sortingDown = false;
      this._sorting = true;
      order = '';
      this.sort = '';
    }
    this.params.setSort(order, event.shiftKey);
  }


  changeCheckbox(item, $event, colName) {
    if (item.changeCheckbox instanceof Function) {
      const obj = {
        params: item,
        event: $event,
        colName: colName
      }
      item.changeCheckbox(obj);
    }
  }

  mouseleave() {
    let e = document.getElementsByClassName('ag-popup-child')[0]
    if (!e) this.hover = false
  }
}
