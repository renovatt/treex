import {
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
  Card,
} from '@/components/ui/card'
import CriptoList from './cripto-list'
import dynamic from 'next/dynamic'

export default function Overview() {
  const CandlestickChart = dynamic(() => import('./charts/candlestick-chart'), {
    ssr: false,
  })
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
      <Card className="col-span-4">
        <CardHeader>
          <CardTitle>Bitcoin agora</CardTitle>
          <CardDescription>Veja o Bitcoin em tempo real</CardDescription>
        </CardHeader>
        <CardContent>
          <CandlestickChart />
        </CardContent>
      </Card>

      <Card className="col-span-4 lg:col-span-3">
        <CardHeader>
          <CardTitle>Criptos</CardTitle>
          <CardDescription>Veja a lista das Altcoins</CardDescription>
        </CardHeader>
        <CardContent>
          <CriptoList />
        </CardContent>
      </Card>
    </div>
  )
}
