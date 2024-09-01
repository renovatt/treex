'use client'
import {
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
  Card,
} from '@/components/ui/card'
import { useGetTransactions } from '@/hooks/use-get-transactions'
import { OverviewPolarChart } from './charts/overview-polar-chart'
import { getCurrentMonthTransactionCount } from '@/utils/calculate-qtd-transaction'
import ListDateRangeTransactions from './list-date-range-transaction'

export default function Overview() {
  const { transactionData, isLoading } = useGetTransactions()
  const resumeQtd = getCurrentMonthTransactionCount(transactionData)

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
      <Card className="col-span-4 lg:col-span-5">
        <CardHeader>
          <CardTitle>Últimas transações</CardTitle>
          {isLoading ? (
            <CardDescription className="animate-pulse text-xs">
              ...
            </CardDescription>
          ) : (
            <CardDescription>
              Você fez {resumeQtd} transações neste mês.
            </CardDescription>
          )}
        </CardHeader>
        <CardContent>
          <ListDateRangeTransactions />
        </CardContent>
      </Card>

      <Card className="col-span-4 flex flex-col lg:col-span-2">
        <CardHeader className="items-start pb-0">
          <CardTitle>Gastos por categorias</CardTitle>
          <CardDescription>Suas 5 categorias mais gastas</CardDescription>
        </CardHeader>
        <CardContent className="flex-1 pb-0">
          <OverviewPolarChart />
        </CardContent>
      </Card>
    </div>
  )
}
