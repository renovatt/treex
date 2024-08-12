'use client'
import Chart from 'react-apexcharts'
import { useTheme } from 'next-themes'
import { UserData } from '@/lib/types'
import { categories } from '@/mocks'
import { useDateStore } from '@/store'
import { useEffect, useState } from 'react'
import { calculateCategoryByMonth } from '@/utils'
import { useGetTransactions } from '@/hooks/useGetTransactions'
import { ApexOptions } from 'apexcharts'

type ChartState = {
  options: ApexOptions
  series: number[]
}

export default function PolarChart({ user }: { user: UserData }) {
  const { theme } = useTheme()
  const { date } = useDateStore()
  const { transactionData } = useGetTransactions(user)
  const [chartData, setChartData] = useState<ChartState>({
    options: {
      chart: {
        foreColor: '#787878',
      },
      legend: {
        position: 'bottom',
      },
      colors: [
        'rgb(123, 153, 184)', // Salário - Azul Suave
        'rgb(190, 127, 86)', // Educação - Laranja Suave
        'rgb(162, 99, 96)', // Despesas Diversas - Vermelho Suave
        'rgb(190, 123, 91)', // Farmácia - Laranja Suave
        'rgb(119, 119, 143)', // Alimentação - Azul Suave
        'rgb(108, 142, 108)', // Combustível - Verde Suave
        'rgb(122, 122, 160)', // Transporte - Azul Suave
        'rgb(162, 162, 166)', // Pagamentos - Cinza Claro Suave
        'rgb(127, 156, 122)', // Lazer - Verde Suave
        'rgb(139, 114, 130)', // Saúde - Roxo Suave
        'rgb(142, 142, 172)', // Higiene - Azul Claro Suave
        'rgb(72, 72, 72)', // Vestuário - Cinza Escuro
        'rgb(100, 150, 194)', // Veículo - Azul Suave
        'rgb(100, 100, 119)', // Moradia - Cinza Suave
        'rgb(108, 178, 108)', // Animais de Estimação - Verde Suave
        'rgb(190, 127, 102)', // Economias/Investimentos - Laranja Suave
      ],
      dataLabels: {
        enabled: false,
        style: {
          colors: ['transparent'],
        },
      },
      fill: {
        // type: 'gradient',
        // colors: ['#baf5ed'],
      },
      labels: categories,
      responsive: [
        {
          breakpoint: 1280,
          options: {
            chart: {
              width: 400,
            },
            legend: {
              position: 'bottom',
            },
          },
        },
        {
          breakpoint: 1279,
          options: {
            chart: {
              width: 350,
              height: 550,
            },
          },
        },
      ],
      plotOptions: {
        polarArea: {
          rings: {
            strokeWidth: 0,
          },
          spokes: {
            strokeWidth: 0,
          },
        },
      },
      yaxis: {
        show: false,
      },
      stroke: {
        width: 0,
        colors: undefined,
      },
      // theme: {
      //   monochrome: {
      //     enabled: true,
      //     color: '#30dec7',
      //     shadeIntensity: 0.6,
      //   },
      // },
    },
    series: [955, 634, 541, 800, 645, 510, 340],
  })

  useEffect(() => {
    if (transactionData) {
      const result = calculateCategoryByMonth(transactionData, date)
      // const polarClass = theme === 'dark' ? '#baf5ed' : '#14121f'

      // const updatedOptions = {
      // fill: {
      //   type: 'gradient',
      //   colors: [polarClass],
      // },
      // tooltip: {
      //   theme: theme === 'dark' ? 'dark' : 'light',
      // },
      // stroke: {
      // colors: theme === 'dark' ? ['#30dec7'] : ['#fff'],
      // },
      // theme: {
      //   monochrome: {
      //     color: theme === 'dark' ? '#30dec7' : '#8b8791',
      //     colors: theme === 'dark' ? ['#30dec7'] : ['#8b8791'],
      //     shadeIntensity: 0.6,
      //   },
      // },
      // labels: result.options.labels,
      // }

      setChartData((prevChartData) => ({
        ...prevChartData,
        options: {
          labels: result.options.labels,
        },
        series: result.series,
      }))
    }
  }, [transactionData, date, theme])

  return (
    <section className="mb-2 flex w-full items-center justify-center xl:m-0 xl:h-full">
      <Chart
        type="polarArea"
        className="xl:w-full"
        options={chartData.options}
        series={chartData.series}
      />
    </section>
  )
}
