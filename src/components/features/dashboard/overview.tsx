import {
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
  Card,
} from '@/components/ui/card'
import ListTransactions from '../../@globals/list-transactions'
import BarChartPreloader from './charts/bar-chart-preloader'

export default function Overview() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
      <Card className="col-span-4">
        <CardHeader>
          <CardTitle>Últimos 7 meses</CardTitle>
          <CardDescription>
            Veja seus ganhos dos últimos 7 meses
          </CardDescription>
        </CardHeader>
        <CardContent>
          <BarChartPreloader />
        </CardContent>
      </Card>

      <Card className="col-span-4 lg:col-span-3">
        <CardHeader>
          <CardTitle>Últimas transações</CardTitle>
          <CardDescription>Você fez 265 transações neste mês.</CardDescription>
        </CardHeader>
        <CardContent>
          <ListTransactions />
        </CardContent>
      </Card>
    </div>
  )
}
