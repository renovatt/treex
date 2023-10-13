export type CritpoItemList = {
  name: string
  currentPrice: string
  symbol: string
}

export type CriptoCoinTypeProps = {
  id: number
  name: string
  symbol: string
  slug: string
  quote: {
    USD: {
      price: string
    }
  }
}

export type CriptoCoinTypeResponse = {
  data: CriptoCoinTypeProps[]
}
