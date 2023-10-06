import { useState } from 'react'
import Chart from 'react-apexcharts'

export default function ChartJSY() {
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
        Color: '#000',
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
        name: 'series-1',
        data: [1340, 645, 760, 549, 860, 780, 2091],
      },
    ],
  })

  return (
    <section className="mt-10 flex w-full items-center justify-center">
      <Chart
        className="w-[95%]"
        type="bar"
        // width="270"
        height="220"
        options={chartData.options}
        series={chartData.series}
      />
    </section>
  )
}
