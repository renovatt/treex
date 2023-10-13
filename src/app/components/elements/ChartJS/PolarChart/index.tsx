'use client'
import { useState } from 'react'
import Chart from 'react-apexcharts'
import { ChartState } from './types'

export default function PolarChart() {
  const [chartData, setChartData] = useState<ChartState>({
    options: {
      chart: {
        foreColor: '#787878',
      },
      legend: {
        position: 'bottom',
      },
      colors: [
        'rgb(255, 99, 132)',
        'rgb(75, 192, 192)',
        'rgb(255, 205, 86)',
        'rgb(201, 203, 207)',
        'rgb(54, 162, 235)',
        'rgb(78, 150, 73)',
      ],
      dataLabels: {
        enabled: false,
        style: {
          colors: ['transparent'],
        },
      },
      fill: {
        type: 'gradient',
        colors: ['#baf5ed'],
      },
      labels: [
        'Estudos',
        'Farmácia',
        'Alimentação',
        'Combustível',
        'Pagamentos',
        'Salário',
        'Lazer',
      ],
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
          breakpoint: 480,
          options: {
            chart: {
              width: 250,
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
        width: 1,
        colors: undefined,
      },
      theme: {
        monochrome: {
          enabled: true,
          color: '#30dec7',
          shadeIntensity: 0.6,
        },
      },
    },
    series: [955, 634, 541, 800, 645, 510, 340],
  })

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
