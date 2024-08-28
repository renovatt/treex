// 'use client'
// import { TrendingUp, TrendingDown } from 'lucide-react'
// import { CartesianGrid, Line, LineChart, XAxis, YAxis } from 'recharts'
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardFooter,
//   CardHeader,
//   CardTitle,
// } from '@/components/ui/card'
// import {
//   ChartConfig,
//   ChartContainer,
//   ChartTooltip,
//   ChartTooltipContent,
// } from '@/components/ui/chart'
// import { RootStock } from '@/entities/brapi-type-stock'

// const formatDate = (timestamp: number) => {
//   const date = new Date(timestamp * 1000)
//   return date.toLocaleDateString('pt-BR', {
//     day: '2-digit',
//     month: 'short',
//   })
// }

// export function StockChart({ results }: RootStock) {
//   const chartData = results[0].historicalDataPrice?.map((item) => ({
//     date: formatDate(item.date),
//     close: item.close,
//   }))

//   const chartConfig = {
//     close: {
//       label: 'Closing Price',
//       color: 'hsl(var(--chart-2))',
//     },
//   } satisfies ChartConfig

//   return (
//     <Card className="col-span-4 lg:col-span-2">
//       <CardHeader>
//         <CardTitle>{results[0].shortName} Price Chart</CardTitle>
//         <CardDescription>
//           {formatDate(results[0].historicalDataPrice[0].date)} -{' '}
//           {formatDate(
//             results[0].historicalDataPrice[
//               results[0].historicalDataPrice.length - 1
//             ].date,
//           )}
//         </CardDescription>
//       </CardHeader>
//       <CardContent>
//         <ChartContainer config={chartConfig}>
//           <LineChart
//             accessibilityLayer
//             data={chartData}
//             margin={{
//               left: 12,
//               right: 12,
//             }}
//           >
//             <CartesianGrid vertical={false} />
//             <XAxis
//               dataKey="date"
//               tickLine={false}
//               axisLine={false}
//               tickMargin={8}
//             />
//             <YAxis
//               tickLine={false}
//               axisLine={false}
//               tickFormatter={(value) => `R$${value.toFixed(2)}`}
//             />
//             <ChartTooltip
//               cursor={false}
//               content={<ChartTooltipContent hideLabel />}
//             />
//             <Line
//               dataKey="close"
//               type="natural"
//               stroke="hsl(var(--chart-5))"
//               strokeWidth={2}
//               dot={false}
//             />
//           </LineChart>
//         </ChartContainer>
//       </CardContent>
//       <CardFooter className="flex-col items-start gap-2 text-sm">
//         <div className="flex gap-2 font-medium leading-none">
//           {results[0].regularMarketChangePercent < 0 ? (
//             <span className="flex items-center gap-2 pb-0.5 text-xs font-semibold">
//               Tendências em baixa{' '}
//               {results[0].regularMarketChangePercent.toFixed(2)}
//               % nesta semana <TrendingDown className="h-4 w-4" />
//             </span>
//           ) : (
//             <span className="flex items-center gap-2 pb-0.5 text-xs font-semibold">
//               Tendências em alta{' '}
//               {results[0].regularMarketChangePercent.toFixed(2)}
//               % nesta semana <TrendingUp className="h-4 w-4" />
//             </span>
//           )}
//         </div>
//         <div className="leading-none text-muted-foreground">
//           Mostrando preços de fechamento dos últimos{' '}
//           {results[0].historicalDataPrice.length} dias
//         </div>
//       </CardFooter>
//     </Card>
//   )
// }
