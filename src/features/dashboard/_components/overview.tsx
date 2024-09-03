'use client'
import {
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
  Card,
} from '@/components/ui/card'
import { useGetTransactions } from '@/hooks/firebase/use-get-transactions'
import { OverviewBarChart } from './charts/overview-bar-chart'
import { OverviewDonutChart } from './charts/overview-donut-chart'
import { OverviewRadialChart } from './charts/overview-radial-chart'
import {
  getCurrentMonthTransactionCount,
  getIncomeTransactionCount,
} from '@/utils/calculate-qtd-transaction'
import ListGeneralTransactions from './list-general-transactions'
import ListIncomeTransactions from './list-income-transactions'

export default function Overview() {
  const { transactionData } = useGetTransactions()

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
          <CardDescription>
            Você fez {resumeQtd} transações neste mês.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ListGeneralTransactions />
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
          <CardDescription>
            Você fez {incomeQtd} entradas neste mês.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ListIncomeTransactions />
        </CardContent>
      </Card>
    </div>
  )
}
