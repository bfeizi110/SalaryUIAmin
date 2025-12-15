import { ChartOptions, ChartType } from 'chart.js'
import { Label } from 'ng2-charts'

export interface ChartOptionInterface {
  type: ChartType
  labels: Label[]
  colors?: any[]
  data: number[]
  ChartOptions?: ChartOptions
  clicked?: Function
  hovered?: Function
}