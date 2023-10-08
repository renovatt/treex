'use client'
import { useState } from 'react'
import { CustomFlowbiteTheme, Datepicker } from 'flowbite-react'

export default function DatepickerComponent() {
  const customTheme: CustomFlowbiteTheme['datepicker'] = {
    root: {
      base: 'relative bg-transparent text-transparent',
      input: {
        base: 'bg-transparent text-transparent',
        field: {
          base: 'relative',
          icon: {
            svg: 'text-primary-800 w-6 h-6 hover:text-primary-750 hover:border absolute top-1 left-1',
          },
          input: {
            base: 'bg-transparent text-transparent',
            withIcon: {
              on: 'w-8 h-8 bg-transparent text-transparent hover:cursor-pointer hover:bg-secondary-950 outline-none select-none',
            },
          },
        },
      },
    },
    popup: {
      root: {
        inner: 'bg-secondary-950 rounded-xl p-3',
        inline: 'relative top-0 z-auto',
        base: 'absolute top-16 md:top-10 rounded-xl -right-36 md:right-0 z-20 block shadow-xl shadow-primary-900',
      },
      header: {
        base: '',
        title:
          'px-2 py-3 text-center font-semibold text-primary-800 dark:text-white',
        selectors: {
          base: 'flex justify-between mb-2',
          button: {
            base: 'text-sm text-primary-800 dark:text-white bg-secondary-700 dark:bg-gray-700 font-semibold py-2.5 px-5 hover:bg-gray-100 dark:hover:bg-gray-600 focus:outline-none view-switch',
            prev: 'text-white bg-secondary-950 hover:bg-secondary-700 outline-none',
            next: 'text-white bg-secondary-950 hover:bg-secondary-700 outline-none',
            view: 'text-white bg-secondary-950 hover:bg-secondary-700 outline-none',
          },
        },
      },
      footer: {
        base: 'flex mt-2 space-x-2',
        button: {
          base: 'w-full rounded-lg px-5 py-2 text-center text-sm font-medium',
          today:
            'bg-secondary-700 text-primary-800 hover:bg-opacity-70 dark:bg-cyan-600 dark:hover:bg-cyan-700',
          clear:
            'bg-secondary-700 text-primary-800 hover:bg-opacity-70 dark:bg-cyan-600 dark:hover:bg-cyan-700',
        },
      },
    },
    views: {
      days: {
        header: {
          base: 'grid grid-cols-7 mb-1',
          title:
            'dow h-6 text-center text-sm font-medium leading-6 text-primary-800 dark:text-gray-400',
        },
        items: {
          base: 'grid w-64 grid-cols-7',
          item: {
            base: 'block flex-1 cursor-pointer rounded-lg border-0 text-center text-sm font-semibold leading-9 text-primary-800 hover:bg-secondary-700 dark:text-white dark:hover:bg-white hover:text-white',
            selected: 'bg-secondary-700 text-white hover:bg-secondary-900',
            disabled: 'text-primary-800',
          },
        },
      },
      months: {
        items: {
          base: 'grid w-64 grid-cols-7',
          item: {
            base: 'block flex-1 cursor-pointer rounded-lg border-0 text-center text-sm font-semibold leading-9 text-primary-800 hover:bg-secondary-700 dark:text-white dark:hover:bg-white hover:text-white',
            selected: 'bg-secondary-700 text-white hover:bg-secondary-900',
            disabled: 'text-primary-800',
          },
        },
      },
      years: {
        items: {
          base: 'grid w-64 grid-cols-4',
          item: {
            base: 'block flex-1 cursor-pointer rounded-lg border-0 text-center text-sm font-semibold leading-9 text-primary-800 hover:bg-secondary-700 dark:text-white dark:hover:bg-white hover:text-white',
            selected: 'bg-secondary-700 text-white hover:bg-secondary-900',
            disabled: 'text-primary-800',
          },
        },
      },
      decades: {
        items: {
          base: 'grid w-64 grid-cols-4',
          item: {
            base: 'block flex-1 cursor-pointer rounded-lg border-0 text-center text-sm font-semibold leading-9 text-primary-800 hover:bg-secondary-700 dark:text-white dark:hover:bg-white hover:text-white',
            selected: 'bg-secondary-700 text-white hover:bg-secondary-900',
            disabled: 'text-primary-800',
          },
        },
      },
    },
  }

  const [selectedDate, setSelectedDate] = useState<Date>(new Date())

  const handleDatePicker = (date: Date) => {
    setSelectedDate(date)
    const formatedDate = date.toISOString().slice(0, 10)
    console.log(formatedDate)
  }

  return (
    <section className="self-end hover:cursor-pointer">
      <Datepicker
        language="pt-BR"
        theme={customTheme}
        labelTodayButton="Hoje"
        labelClearButton="Limpar"
        style={
          {
            // backgroundColor: 'transparent',
            // outline: 'none',
            // border: 'none',
            // cursor: 'pointer',
            // position: 'relative',
          }
        }
        onSelectedDateChanged={(date: Date) => handleDatePicker(date)}
      />
    </section>
  )
}
