export interface HistoricalDataPrice {
  date: number
  open: number
  high: number
  low: number
  close: number
  volume: number
  adjustedClose: number
}

export interface Result {
  currency: string
  shortName: string
  longName: string
  regularMarketChange: number
  regularMarketChangePercent: number
  regularMarketTime: string
  regularMarketPrice: number
  regularMarketDayHigh: number
  regularMarketDayRange: string
  regularMarketDayLow: number
  regularMarketVolume: number
  regularMarketPreviousClose: number
  regularMarketOpen: number
  fiftyTwoWeekRange: string
  fiftyTwoWeekLow: number
  fiftyTwoWeekHigh: number
  symbol: string
  usedInterval: string
  usedRange: string
  historicalDataPrice: HistoricalDataPrice[]
  validRanges: string[]
  validIntervals: string[]
  priceEarnings: number
  earningsPerShare: number
  logourl: string
}

export interface RootStock {
  results: Result[]
  // requestedAt: string
  // took: string
}

export interface QuoteList {
  stock: string
  name: string
  close: number
  change: number
  volume: number
  market_cap: number
  logo: string
  sector: string
  type: string
}

export interface Index {
  stock: string
  name: string
}

export interface Stock {
  stock: string
  name: string
  close: number
  change: number
  volume: number
  market_cap?: number
  logo: string
  sector?: string
  type: string
}

export interface RootStockList {
  indexes: Index[]
  stocks: Stock[]
  availableSectors: string[]
  availableStockTypes: string[]
}
