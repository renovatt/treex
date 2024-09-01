'use client'
import {
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
  Card,
} from '@/components/ui/card'
import { useGetTransactions } from '@/hooks/use-get-transactions'
import {
  getCurrentMonthTransactionCount,
  getIncomeTransactionCount,
} from '../../transactions/utils/calculate-qtd-transaction'
import ListTransactions from '@/components/@globals/list-transactions/list-transactions'
import ListTransactionsIncome from '@/components/@globals/list-transactions/list-transactions-incone'
import { OverviewBarChart } from './charts/overview-bar-chart'
import { OverviewDonutChart } from './charts/overview-donut-chart'
import { OverviewRadialChart } from './charts/overview-radial-chart'

export default function Overview() {
  const { transactionData, isLoading } = useGetTransactions()

  const resumeQtd = getCurrentMonthTransactionCount(transactionData)
  const incomeQtd = getIncomeTransactionCount(transactionData)

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
      <Card className="col-span-4">
        <CardHeader>
          <CardTitle>Últimos meses</CardTitle>
          <CardDescription>
            Análise do seu faturamento nos últimos meses
          </CardDescription>
        </CardHeader>
        <CardContent>
          <OverviewBarChart />
        </CardContent>
      </Card>

      <Card className="col-span-4 lg:col-span-3">
        <CardHeader>
          <CardTitle>Últimas transações</CardTitle>
          {isLoading ? (
            <p className="animate-pulse text-xs">...</p>
          ) : (
            <CardDescription>
              Você fez {resumeQtd} transações neste mês.
            </CardDescription>
          )}
        </CardHeader>
        <CardContent>
          <ListTransactions />
        </CardContent>
      </Card>

      <Card className="col-span-4 lg:col-span-2">
        <CardHeader>
          <CardTitle>Balanço</CardTitle>
          <CardDescription>Análise entre entradas e saídas</CardDescription>
        </CardHeader>
        <CardContent>
          <OverviewRadialChart />
        </CardContent>
      </Card>

      <Card className="col-span-4 lg:col-span-2">
        <CardHeader>
          <CardTitle>Categoria</CardTitle>
          <CardDescription>Análise por categoria</CardDescription>
        </CardHeader>
        <CardContent>
          <OverviewDonutChart />
        </CardContent>
      </Card>

      <Card className="col-span-4 lg:col-span-3">
        <CardHeader>
          <CardTitle>Entradas recentes</CardTitle>
          {isLoading ? (
            <p className="animate-pulse text-xs">...</p>
          ) : (
            <CardDescription>
              Você fez {incomeQtd} entradas neste mês.
            </CardDescription>
          )}
        </CardHeader>
        <CardContent>
          <ListTransactionsIncome />
        </CardContent>
      </Card>
    </div>
  )
}
