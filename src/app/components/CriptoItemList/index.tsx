'use client'
import { CritpoItemList } from './types'

export default function CriptoItemList({
  cripto,
  icon: Icon,
  value,
  mark,
}: CritpoItemList) {
  return (
    <li className="bg-list-gradient flex w-full items-center justify-between rounded-lg p-2 text-white">
      <span className="flex items-center justify-center gap-2 text-primary-800">
        <Icon className="h-8 w-8 text-primary-800" />
        {cripto}
        <span className="text-primary-800 opacity-50">({mark})</span>
      </span>
      <span className="text-primary-800">${value}</span>
    </li>
  )
}
