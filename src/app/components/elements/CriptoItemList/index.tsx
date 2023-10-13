import { CritpoItemList } from './types'

export default function CriptoItemList({
  name,
  symbol,
  currentPrice,
}: CritpoItemList) {
  return (
    <li className="bg-list-gradient flex w-full items-center justify-between rounded-lg p-2 py-4 text-white">
      <span className="flex items-center justify-center gap-2 text-primary-800">
        {name}
        <span className="text-primary-800 opacity-50">({symbol})</span>
      </span>
      <span className="text-primary-800">{currentPrice}</span>
    </li>
  )
}