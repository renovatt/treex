'use client'
import Chart from 'react-apexcharts'
import { UserData } from '@/lib/types'
import { useEffect, useState } from 'react'
import { calculateRevenueByMonth } from '@/utils'
import { useGetTransactions } from '@/hooks/useGetTransactions'

export default function BarChart({ user }: { user: UserData }) {
  const { transactionData } = useGetTransactions(user)
  const [chartData, setChartData] = useState({
    options: {
      chart: {
        id: 'basic-bar',
        foreColor: '#787878',
      },
      colors: ['#baf5ed'],
      dataLabels: {
        enabled: true,
        style: {
          colors: ['transparent'],
        },
      },
      grid: {
        show: true,
        color: '#000',
        strokeDashArray: 5,
        xaxis: {
          lines: {
            show: false,
          },
        },
        yaxis: {
          lines: {
            show: false,
          },
        },
      },
      fill: {
        colors: undefined,
        opacity: 0.1,
        type: 'gradient',
        gradient: {
          type: 'vertical',
          shadeIntensity: 0.5,
          gradientToColors: undefined,
          inverseColors: true,
          opacityFrom: 1,
          opacityTo: 1,
          stops: [0, 50, 75, 100],
          colorStops: [
            [
              {
                offset: 0,
                color: 'rgba(35,35,45,0.6908263305322129)',
                opacity: 0.66,
              },
              {
                offset: 50,
                color: 'rgba(186,245,237,1)',
                opacity: 0.46,
              },
            ],
          ],
        },
      },
      xaxis: {
        categories: ['Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
      },
    },
    series: [
      {
        name: 'Faturamento',
        data: [1340, 645, 760, 549, 860, 780, 2091],
      },
    ],
  })

  useEffect(() => {
    if (transactionData) {
      const revenueByMonth = calculateRevenueByMonth(transactionData)
      const monthNames = revenueByMonth.map((item) => item.month)
      const revenueValues = revenueByMonth.map((item) => item.revenue)

      setChartData((prevChartData) => ({
        ...prevChartData,
        options: {
          ...prevChartData.options,
          xaxis: {
            categories: monthNames,
          },
        },
        series: [
          {
            name: 'Faturamento',
            data: revenueValues,
          },
        ],
      }))
    }
  }, [transactionData])

  return (
    <section className="my-5 flex w-full items-center justify-center">
      <Chart
        className="w-[95%]"
        type="bar"
        height="220"
        options={chartData.options}
        series={chartData.series}
      />
    </section>
  )
}
