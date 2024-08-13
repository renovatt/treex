import {
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
  Card,
} from '@/components/ui/card'
import ListTransactions from '../../@globals/list-transactions'
import PolarChartPreloader from './charts/preloaders/polar-chart-preloader'

export default function Overview() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
      <Card className="col-span-4 lg:col-span-5">
        <CardHeader>
          <CardTitle>Últimas transações</CardTitle>
          <CardDescription>Você fez 265 transações neste mês.</CardDescription>
        </CardHeader>
        <CardContent>
          <ListTransactions />
        </CardContent>
      </Card>

      <Card className="col-span-4 flex flex-col lg:col-span-2">
        <CardHeader className="items-start pb-0">
          <CardTitle>Gastos por categorias</CardTitle>
          <CardDescription>Suas 5 categorias mais gastas</CardDescription>
        </CardHeader>
        <CardContent className="flex-1 pb-0">
          <PolarChartPreloader />
        </CardContent>
      </Card>
    </div>
  )
}
