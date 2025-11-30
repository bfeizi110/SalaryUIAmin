interface ColDef {
  headerName: string
  field: string
  width?: number
  minWidth?: number,
  maxWidth?: number,
  tooltipField?: string,
  cellRendererFramework?: Function
  floatingFilterComponent?: 'floatfilter',
  filter?: 'agTextColumnFilter',
  type?: 'string' | 'boolean'
}
