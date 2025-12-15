export interface Action {
  label: 'Add' | 'Excel' | 'Edit' | 'Delete' | 'Print' | 'Refer' | 'Flow' | 'Reject'
  callback: Function
  hideExcel?: boolean
}
