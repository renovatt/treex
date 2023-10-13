import { ApexOptions } from 'apexcharts'

export type ChartState = {
  options: ApexOptions
  series: ApexAxisChartSeries | ApexNonAxisChartSeries | undefined
}

export interface KlineData {
  0: Date // openTime
  1: string // open
  2: string // high
  3: string // low
  4: string // close
}

export type CandleTypeProps = {
  x: Date
  y: number[]
}

export interface LastJsonMessage {
  k: {
    t: string
    o: string
    h: string
    l: string
    c: string
    x: boolean
  }
}
