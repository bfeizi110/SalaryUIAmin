import { Action } from '../interfaces/action.interface';
import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core'
import { ColumnApi, ColDef,ColumnResizedEvent, GridOptions, MenuItemDef, SideBarDef, GridApi } from 'ag-grid-community'
import { ButtonRendererComponent } from '../renderer/button-renderer/button-renderer.component'
import { FloatFilterRendererComponent } from '../renderer/float-filter-renderer/float-filter-renderer.component'
import { CellRendererComponent } from '../renderer/cell-renderer/cell-renderer.component'
import { CheckboxRendererComponent } from '../renderer/checkbox-renderer/checkbox-renderer.component'
import { HeaderRendererComponent } from '../renderer/header-renderer/header-renderer.component'
import { CustomGridOption } from '../interfaces/ag-grid-option.interface'
import { ContextMenuService } from '../../context-menu.service'
import printDoc from "./printDoc";
import { debug } from 'console';

@Component({
  selector: 'custom-ag-grid',
  templateUrl: './custom-ag-grid.component.html',
  styleUrls: ['./custom-ag-grid.component.scss']
})
export class CustomAgGridComponent implements OnInit {
  private gridColumnApi!: ColumnApi;
  
  @Input() customGridOption: CustomGridOption
  @Input() formType: string
  @Input() disabledForm: boolean
  @Input() hideLogs: boolean
  @Input() rowNumber: number
  @Input() isModal: boolean
  @Input() report: boolean
  @Input() focusField: any
  @Input() masterDetail: boolean
  @Input() rowSelectedForScroll: boolean
  @Input() autoResizeAll: boolean

  gridApi!: GridApi;
  framework: any = {};
  setGridOption() {
    if (!this.isModal) {
      this.gridOption.pivotPanelShow = 'always'
      this.gridOption.rowGroupPanelShow = 'always'
      this.gridOption.sideBar = sideBar
      this.gridOption.defaultColDef = defaultColDef
      this.framework = frameworkComponents
    }
    else this.framework = frameworkComponentsSimple

  }

  deselectAll()
  {
    this.gridApi.deselectAll()
  }
  
  gridOption = <GridOptions>{
    frameworkComponents : this.framework,
    popupParent: document.querySelector("body"),
    suppressRowTransform: true,
    animateRows: true,
    //sideBar: sideBar,
    //pivotPanelShow: 'always',
    //rowGroupPanelShow: 'always',
    defaultColDef: defaultColDefSimple,
    enableRtl: true,
    localeText: localeText,
    suppressRowClickSelection: true,
    suppressCellSelection: true,
    rowSelection: 'single',
    //onRowClicked: this.rowClicked.bind(this),
    onRowDoubleClicked: this.rowDoubleClicked.bind(this),
    onFilterChanged: this.filterChanged.bind(this),
    //onSortChanged: this.onSortChanged.bind(this),
    onCellClicked: this.rowClicked.bind(this),
    onRowSelected: this.rowSelected.bind(this),
    onToolPanelVisibleChanged: this.gridSizeChanged.bind(this),
    onGridSizeChanged: this.gridSizeChanged.bind(this),
    onCellContextMenu: this.cellContextMenu.bind(this),
    getContextMenuItems: this.getContextMenuItems.bind(this),
    rowHeight: 20,
    // overlayLoadingTemplate:
    // '<span class="ag-overlay-loading-center">در حال دریافت اطلاعات</span>',
      
    onGridReady: function (params)
    {
      this.gridApi = params.api;
      params.api.showLoadingOverlay();
  
      // setTimeout(() => {
        params.api.setRowData(this.rowData);
      //  }, 500);
    },
    // onFillEnd: this.autoSizeAll.bind(false),
    //onViewportChanged: this.gridSizeChanged.bind(this),
    //onColumnRowGroupChanged: this.gridSizeChanged.bind(this),
    //onDragStopped: this.gridSizeChanged.bind(this),
    // allowContextMenuWithControlKey: true
    //onRowGroupOpened: this.a.bind(this)
    //frameworkComponents: frameworkComponents,
  }
  onCellKeyPress(e)
  {
    if (e.event.key == 'Enter')
    this.rowClicked(e)
  }

  
  selectingRowCheckbox() { 
    if (this.customGridOption.selectedRowCheckboxData && this.customGridOption.selectedRowCheckboxData.length != 0) 
    {
      this.gridApi.forEachNode((node) => this.customGridOption.selectedRowCheckboxData.forEach(e => node.setSelected(node.data === e))) 
    }
  }

  rowClicked(event) {
    this.gridApi.deselectAll()
    event?.column?.colId !== 'actions' && this.customGridOption.rowClicked ? this.customGridOption.rowClicked(event) : null
  }

  rowDoubleClicked(event) { event.data && this.customGridOption.rowDoubleClicked ? this.customGridOption.rowDoubleClicked(event) : null }

  filterChanged() { this.gridApi.setRowData(this.gridOption.rowData) }

gridSizeChanged() {
  if (this.gridApi) {
    this.gridApi.sizeColumnsToFit();
  }
}


  setGrid() {
    this.customGridOption.rowData[0].Id != 0 ? this.gridOption.rowData = this.customGridOption.rowData : null
    let columnObj = this.customGridOption.columnDefs.EntityAttribute

    let keyArray = []
    keyArray = Object.keys(this.customGridOption.rowData[0])

    const filteredColumnKey = Object.keys(columnObj).filter(key => keyArray.includes(key)).reduce((obj, key) => {
      if (columnObj[key] != null)
        obj[key] = columnObj[key]
      return obj
    }, {})

    const filteredColumnValue = Object.values(filteredColumnKey).filter((a: any) => !a.hiddenInGrid)
    this.gridOption.columnDefs = filteredColumnValue
    // this.gridOption.columnDefs.map((a: any) => {
    //    if (a.type == 'combo' || a.type == 'multiCombo') a.type = 'string'
    // })

    let controller: string = this.customGridOption.controllerName

    if (!this.isModal)
      this.gridOption.columnDefs.map((a: any) => {
        if (a.type == 'int') a.valueFormatter = this.splitFormatter.bind(this)
        a.headerTooltip = a.headerName, 
        a.tooltipField = a.field, 
        a.floatingFilterComponent = 'floatfilter', 
        a.filter = 'agTextColumnFilter'
        a.type == 'bool' ? a.cellRendererFramework = CheckboxRendererComponent :
          ((controller == 'PersonMostamarBaz' || controller == 'PersonSavingInfoBaz' || controller == 'PersonDebtInfoBaz' || controller == 'PersonInsureInfoBaz' || controller == 'CommissionBaz') && a.field == 'PID') ?
            a.cellRenderer = 'agGroupCellRenderer' :
            a.cellRendererFramework = CellRendererComponent,
          a.cellRendererParams = { type: a.type }
        a.width != 0 ? a.width = a.width : a.flex = 1
      })

    else 
    this.gridOption.columnDefs.map((a: any) => { 
      a.isModal = this.isModal, 
      a.width != 0 ? a.width = a.width : a.flex = 1
      a.type == 'int' ? a.valueFormatter = function (params) { 
        if (params.value) 
          return Math.floor(params.value).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,'); } : null, 
        a.headerTooltip = a.headerName, 
        a.tooltipField = a.field, 
        a.floatingFilterComponent = 'floatfilter', 
        a.filter = 'agTextColumnFilter', 
        a.type == 'bool' ? a.cellRendererFramework = CheckboxRendererComponent : a.cellRendererFramework = CellRendererComponent, 
        a.cellRendererParams = { type: a.type } 
    })

    const actions: Action[] = this.customGridOption.actions
    actions ? this.gridOption.columnDefs.push({
      headerName: 'actions',
      headerComponentParams: { actions: actions, actionAccess: this.customGridOption.columnDefs.EntityAccess },
      cellRenderer: 'buttonRenderer',
      cellRendererParams: { hideLogs: this.hideLogs, actions: actions, miniLogUrl: this.customGridOption.miniLogUrl, controllerName: this.customGridOption.controllerName, tableName: this.customGridOption.columnDefs.EntityAttribute.EntityName, actionAccess: this.customGridOption.columnDefs.EntityAccess },
      filter: false,
      lockPinned: true,
      pinned: 'left',
      colId: 'actions',
      maxWidth: 30,
      //  autoHeight: true
    }) : null

    this.customGridOption.checkboxSelection ? this.setCheckboxSelection() : delete this.gridOption.defaultColDef.headerCheckboxSelection
    this.setRowHeight()
    let entityName: string = this.customGridOption.columnDefs.EntityAttribute.EntityName
    if (this.customGridOption.columnDefs.EntityDAccess && (entityName == 'Tbl_Prsinfo' || entityName == 'PersonMonthInfo_Tbl' || entityName == 'PersonWorkAddingInfo_Tbl'))
      this.setContextMenu()

    if (this.masterDetail !== false && controller == 'PersonMostamarBaz' || controller == 'PersonSavingInfoBaz' || controller == 'PersonDebtInfoBaz' || controller == 'PersonInsureInfoBaz' || controller == 'CommissionBaz') {
      let rowsById0: any[] = this.customGridOption.rowData.filter(row => row.PersonSelectMovDto[0].Id == 0)
      let keyArray = []
      keyArray = Object.keys(this.gridOption.rowData[0].PersonSelectMovDto[0])
      const filteredColumnKey = Object.keys(columnObj).filter(key => keyArray.includes(key)).reduce((obj, key) => {
        obj[key] = columnObj[key]
        return obj
      }, {})
      rowsById0.forEach(a => a = a.PersonSelectMovDto = [])
      const filteredColumnValue = Object.values(filteredColumnKey).filter((a: any) => !a.hiddenInGrid)
      const columnDefs = [...filteredColumnValue]
      this.gridOption.detailRowHeight = 150
      this.gridOption.masterDetail = true
      this.gridOption.isRowMaster = (dataItem) => { return dataItem ? dataItem.PersonSelectMovDto && dataItem.PersonSelectMovDto.length > 0 : false; }
      this.gridOption.detailCellRendererParams = {
        detailGridOptions: {
          columnDefs: columnDefs.reverse(),
          defaultColDef: { flex: 1, suppressSizeToFit: true },
          onCellClicked: this.rowClickedDetail.bind(this),
          onGridReady: this.onGridReady.bind(this),
          detailRowAutoHeight: true,
          rowHeight: 20
        },
        getDetailRowData: (params) => params.successCallback(params.data.PersonSelectMovDto)
      }
    }
  }

  onGridReady(e) {
  this.gridApi = e.api;
  this.gridApi = e.columnApi;

  setTimeout(() => {
    this.gridSizeChanged(); // الان gridApi حتماً مقدار دارد
  }, 0);
}


  splitFormatter(params) {
    if (params.value) params.value = Math.floor(params.value).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
    return params.value
  }

  rowClickedDetail(event) { this.customGridOption.rowClickedDetail(event) }

  setRowHeight() {
    this.gridLen = this.gridOption.rowData?.length
    if (!this.isModal) {
      if (this.gridLen == 0 && this.gridLen <= 10) this.rowNumber = 10
      else
        setTimeout(() => {
          !this.rowNumber ? this.rowNumber = 10 : null
          this.onPageSizeChanged(this.rowNumber)
        }, 10)
    }
    else {
      //   document.getElementsByTagName('ag-grid-angular')[0].setAttribute('style', 'height: 276px')
    }
  }

  setCheckboxSelection() {
    this.gridOption.rowSelection = 'multiple'
    Object.assign(this.gridOption.columnDefs[0], {
      checkboxSelection: true,
      headerCheckboxSelection: true,
      headerCheckboxSelectionFilteredOnly: true,
    })
    this.formType != '' ? Object.assign(this.gridOption.defaultColDef, { headerCheckboxSelection: setFirstColumn }) : null
  }

  rowSelected(event) { 
    if (this.customGridOption.rowSelected) 
    {
      this.selectedgridLen =  this.gridApi.getSelectedRows().length
      this.customGridOption.rowSelected(event) 
    }
  }

  contextMenuList: any[] = []
  Id: number
  cellContextMenu(event) {
    let controller = this.customGridOption.controllerName
    this.Id = controller == 'PersonMonthInfo' || controller == 'PersonWorkAddingInfo' ? event.data.PersonID_Fld : event.data.Id
  }

  setContextMenu() {
    let menuIds: number[] = this.customGridOption.columnDefs.EntityDAccess.split(',')
    let menuList: any[] = JSON.parse(sessionStorage.getItem('MenuList'))
    if (menuList) {
      menuList.length > 0 ? menuList.forEach(menu => menuIds.forEach(menuId => menu.Id == menuId ? this.menuListSelected.push(menu) : null)) : null
      this.menuListSelected.forEach(menu => this.contextMenuList.push({ name: menu.CodeDesc_Fld, action: this.rowClickedContexMenu.bind(this, menu), icon: createFlagImg(menu.Icon) }))
      this.contextMenuList.push({ name: 'مشاهده فیش حقوقی', action: this.rowClickedContexMenu.bind(this, 'fish'), icon: createFlagImg('fish') })
    }
  }

  menuListSelected: any[] = []
  selectedContextRowId: number
  getContextMenuItems(e) {
    this.selectedContextRowId = e.node.data.Id
    if (this.contextMenuList.length > 0) return this.contextMenuList
    return this.getDefaultContext()
  }

  showReport: boolean = false
  reportUrl: string = ''
  rowClickedContexMenu(param, a) {
    if (param == 'fish') {
      this.showReport = true
      this.reportUrl = `Fish/GetFish/${this.selectedContextRowId}`
    }
    else {
      this.service.id = this.Id
      this.service.passDataAggrid(param)
    }
  }

  setFocus() {
    let rowIndex: any
    let controller = this.customGridOption.controllerName
    if (controller == 'PersonWorkAddingInfo')
      this.gridApi.forEachNode(node => node.data.PersonID_Fld == this.focusField ? rowIndex = node.rowIndex : null)
    else
      this.gridApi.forEachNode(node => node.data.Id == this.focusField ? rowIndex = node.rowIndex : null)
    this.gridApi.ensureIndexVisible(rowIndex)
    setTimeout(() => { this.gridApi.setFocusedCell(rowIndex, 'PID') }, 400)
  }

  getDefaultContext() {
    var result = [
      'copy',
      'copyWithHeaders',
      'copyWithGroupHeaders',
      {
        name: 'خروجی فایل',
        icon: '<span class="ag-icon ag-icon-save"></span>',
        subMenu: [
          {
            name: 'فایل با فرمت CSV',
            action: () => { this.exportToCSV() }
          },
          {
            name: 'فایل با فرمت Excel',
            action: () => { this.exportToExcel() }
          },
          {
            name: 'فایل با فرمت XML',
            action: () => { this.exportToXML() }
          },
          {
            name: 'فایل با فرمت PDF',
            action: () => { this.exportToPDF() }
          }
        ]
      }
    ]
    return result;
  }

  constructor(private service: ContextMenuService) { }

  ngOnInit(): void {
    this.setGridOption()
    this.setGrid()
    // this.autoSizeAll(false)
  }

  theme: string = ''
  ngAfterViewInit(): void {
    this.setRowData()
    // if (this.customGridOption.contextMenu) this.setContextMenu()
    this.selectingRowCheckbox()
    this.focusField ? this.setFocus() : null
  }

  gridLen: number = 0
  selectedgridLen: number = 0
  setRowData() {
    this.gridApi.setRowData(this.gridOption.rowData)
    // this.gridOption.api.setDomLayout("autoHeight");
  }

  @ViewChild('divGrid', { static: false }) divGrid: ElementRef
  onPageSizeChanged(index) { 
    this.divGrid ? this.divGrid.nativeElement.firstElementChild.style.height = Number(index) * 20.5 + 75 + 'px' : null 
  }

  rowGroupCallback(params) { return params.node.key }

  exportToExcel() { this.gridApi.exportDataAsExcel({ processRowGroupCallback: this.rowGroupCallback }) }

  exportToCSV() { this.gridApi.exportDataAsCsv({ processRowGroupCallback: this.rowGroupCallback }) }

  exportToXML() { 
    // this.gridApi.exportDataAsExcel({ exportMode: 'xml' }) 
  }

  printParams = {
    PDF_HEADER_COLOR: "#f8f8f8",
    PDF_INNER_BORDER_COLOR: "#dde2eb",
    PDF_OUTER_BORDER_COLOR: "#babfc7",
    PDF_LOGO: "https://raw.githubusercontent.com/AhmedAGadir/ag-grid-todo-list-react-typescript/master/src/assets/new-ag-grid-logo.png",
    PDF_PAGE_ORITENTATION: "landscape",
    // PDF_WITH_HEADER_IMAGE: true,
    PDF_WITH_FOOTER_PAGE_COUNT: true,
    PDF_HEADER_HEIGHT: 15,
    // PDF_ROW_HEIGHT: 25,
    PDF_ODD_BKG_COLOR: "#fcfcfc",
    PDF_EVEN_BKG_COLOR: "#ffffff",
    // PDF_WITH_CELL_FORMATTING: true,
    PDF_WITH_COLUMNS_AS_LINKS: true,
    PDF_SELECTED_ROWS_ONLY: false,
  }

  exportToPDF() { printDoc(this.printParams, this.gridApi, this.gridOption.columnApi) }

  scrollToSelectedRow(id) {
    setTimeout(() => {
      this.gridApi.forEachNode(a => {
        let node = a.data
        let selectedId = node.PersonID_Fld
        if (id == selectedId) {
          this.gridApi.ensureIndexVisible(a.rowIndex, null)
        }
      })
    }, 1000);
  }

  @Input() signalRChange: string
  ngOnChanges(UpdatedValue: any): void {
    if (UpdatedValue['signalRChange'] && UpdatedValue['signalRChange'].currentValue && this.gridOption.rowData) {
      this.setRowData()
      //   this.gridOption.api.refreshClientSideRowModel();
    }
    else if (UpdatedValue['rowSelectedForScroll']) {
      //   this.scrollToSelectedRow(UpdatedValue['rowSelectedForScroll'].currentValue)
    }
  }
}

function setFirstColumn(params) {
  var displayedColumns = params.columnApi.getAllDisplayedColumns();
  var thisIsFirstColumn = displayedColumns[0] === params.column;
  return thisIsFirstColumn;
}

const defaultColDef = {
  floatingFilter: true,
  enableRowGroup: true,
  enablePivot: true,
  enableValue: true,
  sortable: true,
  filter: true,
  resizable: true,
  suppressSizeToFit: false,
  minWidth: 160,
  filterParams: { newRowsAction: 'keep' },
}

const defaultColDefSimple = {
  floatingFilter: true,
  //enableRowGroup: true,
  //enablePivot: true,
  //enableValue: true,
  //sortable: true,
  //filter: true,
  resizable: true,
  minWidth: 160,
  // autoHeight: true,
  wrapText: true,
  suppressSizeToFit: false,
  hideImproveFilter: true,
  filterParams: { newRowsAction: 'keep' },
}

const sideBar: SideBarDef = {
  toolPanels: [
    {
      id: 'columns',
      labelDefault: 'Columns',
      labelKey: 'columns',
      iconKey: 'columns',
      toolPanel: 'agColumnsToolPanel',
    },
    {
      id: 'filters',
      labelDefault: 'Filters',
      labelKey: 'filters',
      iconKey: 'filter',
      toolPanel: 'agFiltersToolPanel',
    }
  ],
  position: 'left',
}

const localeText = {
  group: 'گروه',
  equals: 'برابر',
  notEqual: 'برابر نباشد',
  contains: 'شامل',
  notContains: 'شامل نباشد',
  startsWith: 'جستجو براساس حرف اول',
  endsWith: 'جستجو براساس حرف آخر',
  andCondition: 'و',
  orCondition: 'یا',
  filterOoo: 'فیلتر',
  or: 'یا',
  of: 'از',
  page: 'صفحه',
  to: 'تا',
  noRowsToShow: 'فاقد اطلاعات',
  pinColumn: 'برچسب ستون',
  pinLeft: 'برچسب چپ',
  pinRight: 'برچسب راست',
  noPin: 'بدون برچسب',
  autosizeThiscolumn: 'تنظیم سایز این ستون',
  autosizeAllColumns: 'تنظیم سایز همه ستون ها',
  groupBy: 'گروه بندی',
  resetColumns: 'تنظیمات اولیه ستون ها',
  selectAll: 'انتخاب همه',
  searchOoo: 'جستجو...',
  rowGroupColumnsEmptyMessage: 'ستون را برای گروه بندی بکشید',
  pivotColumnsEmptyMessage: 'مقدار را به اینجا بکشید',
  columns: 'ستون ها',
  filters: 'فیلتر ها',
  blanks: 'خالی',
  pivotMode: 'مد محوری',
  loadingOoo: 'در حال بارگذاری',
  groups: 'گروه ها',
  values: 'مقادیر',
  valueColumnsEmptyMessage: 'مقدار را برای تجمع بکشید',
  copy: 'کپی',
  copyWithHeaders: 'کپی با عنوان',
  paste: 'جا گذاری',
  export: 'صادر',
  csvExport: 'فایل با فرمت CSV',
  excelExport: 'فایل با فرمت Excel',
  excelXmlExport: 'فایل با فرمت XML',
  pivots: 'برچسب ستون ها'
}

const frameworkComponentsSimple = {
  buttonRenderer: ButtonRendererComponent,
  checkboxComponent: CheckboxRendererComponent,
  agColumnHeader: HeaderRendererComponent,
  floatfilter: FloatFilterRendererComponent,
  cellRenderer: CellRendererComponent
}

const frameworkComponents = {
  buttonRenderer: ButtonRendererComponent,
  agColumnHeader: HeaderRendererComponent,
  floatfilter: FloatFilterRendererComponent,
  checkboxComponent: CheckboxRendererComponent,
  // cellRenderer: CellRendererComponent,
}

function createFlagImg(flag) { return `<img border="0" width="15" src="../../../../../../assets/img/menu-icons/${flag}.png">` }
