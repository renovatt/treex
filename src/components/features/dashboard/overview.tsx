import {
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
  Card,
} from '@/components/ui/card'
import ListTransactions from '../../@globals/list-transactions'
import BarChartPreloader from './charts/preloaders/bar-chart-preloader'
import ListTransactionsIncome from '@/components/@globals/list-transactions/list-transactions-income'
import DonutChartPreloader from './charts/preloaders/donut-chart-preloader'
import RadialChartPreloader from './charts/preloaders/radial-chart-preloader'

export default function Overview() {
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
          <BarChartPreloader />
        </CardContent>
      </Card>

      <Card className="col-span-4 lg:col-span-3">
        <CardHeader>
          <CardTitle>Últimas transações</CardTitle>
          <CardDescription>Você fez 265 transações neste mês</CardDescription>
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
          <RadialChartPreloader />
        </CardContent>
      </Card>

      <Card className="col-span-4 lg:col-span-2">
        <CardHeader>
          <CardTitle>Categoria</CardTitle>
          <CardDescription>Análise por categoria</CardDescription>
        </CardHeader>
        <CardContent>
          <DonutChartPreloader />
        </CardContent>
      </Card>

      <Card className="col-span-4 lg:col-span-3">
        <CardHeader>
          <CardTitle>Entradas recentes</CardTitle>
          <CardDescription>Você fez 56 entradas neste mês</CardDescription>
        </CardHeader>
        <CardContent>
          <ListTransactionsIncome />
        </CardContent>
      </Card>
    </div>
  )
}
