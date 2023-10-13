import React from 'react'
import { ViewContainerProps } from './types'

export default function ViewContainer({ children }: ViewContainerProps) {
  return (
    <section className="flex w-full flex-col items-center justify-start overflow-y-auto pb-20 md:items-start md:p-0">
      {children}
    </section>
  )
}
