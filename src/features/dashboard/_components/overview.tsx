'use client'
import {
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
  Card,
} from '@/components/ui/card'
import { useGetTransactions } from '@/hooks/firebase/use-get-transactions'
import { OverviewDonutChart } from './charts/overview-donut-chart'
import { OverviewRadialChart } from './charts/overview-radial-chart'
import { getIncomeTransactionCount } from '@/utils/calculate-qtd-transaction'
import ListIncomeTransactions from './list-income-transactions'
import { OverviewBarMultipleChart } from './charts/overview-bar-multiple-chart'
import { OverviewAreaChart } from './charts/overview-area-chart'
// import { OverviewBarChart } from './charts/overview-bar-chart'

export default function Overview() {
  const { transactionData } = useGetTransactions()

  const incomeQtd = getIncomeTransactionCount(transactionData)

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-6">
      <Card className="col-span-4">
        <CardHeader>
          <CardTitle>Comparativo</CardTitle>
          <CardDescription>Comparativo dos últimos meses</CardDescription>
        </CardHeader>
        <CardContent>
          <OverviewBarMultipleChart />
        </CardContent>
      </Card>

      <Card className="col-span-4 lg:col-span-2">
        <CardHeader>
          <CardTitle>Categorias</CardTitle>
          <CardDescription>Análise por categorias</CardDescription>
        </CardHeader>
        <CardContent>
          <OverviewDonutChart />
        </CardContent>
      </Card>

      <Card className="col-span-4 lg:col-span-6">
        <CardHeader>
          <CardTitle>Evolução</CardTitle>
          <CardDescription>Evolução nos últimos meses </CardDescription>
        </CardHeader>
        <CardContent>
          <OverviewAreaChart />
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

      {/* <Card className="col-span-4 lg:col-span-2">
        <CardHeader>
          <CardTitle>Comparativo</CardTitle>
          <CardDescription>Comparativo dos últimos meses</CardDescription>
        </CardHeader>
        <CardContent>
          <OverviewBarChart />
        </CardContent>
      </Card> */}

      <Card className="col-span-4">
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
