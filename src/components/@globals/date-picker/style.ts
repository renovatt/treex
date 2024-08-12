import { CustomFlowbiteTheme } from 'flowbite-react'

export const customTheme: CustomFlowbiteTheme['datepicker'] = {
  root: {
    base: 'relative bg-transparent text-transparent',
    input: {
      base: 'bg-transparent text-transparent',
      field: {
        base: 'relative',
        icon: {
          svg: 'text-muted-foreground w-6 h-6 hover:text-primary-750 hover:border absolute top-1 left-1',
        },
        input: {
          base: 'bg-transparent text-transparent',
          withIcon: {
            on: 'w-8 h-8 dark:bg-transparent bg-transparent text-transparent dark:text-transparent hover:cursor-pointer hover:bg-white dark:hover:bg-secondary-950 outline-none select-none',
          },
        },
      },
    },
  },
  popup: {
    root: {
      inner: 'dark:bg-secondary-950 bg-white rounded-xl p-3',
      inline: 'relative top-0 z-auto',
      base: 'absolute top-16 md:top-10 rounded-xl -right-36 md:right-0 z-20 block dark:shadow-xl shadow-sm shadow-primary-900',
    },
    header: {
      base: '',
      title:
        'px-2 py-3 text-center font-semibold text-muted-foreground dark:text-white',
      selectors: {
        base: 'flex justify-between mb-2',
        button: {
          base: 'text-sm text-muted-foreground dark:text-white bg-secondary-700 dark:bg-gray-700 font-semibold py-2.5 px-5 hover:bg-gray-100 dark:hover:bg-gray-600 focus:outline-none view-switch',
          prev: 'dark:text-white text-muted-foreground dark:bg-secondary-950 bg-white outline-none',
          next: 'dark:text-white text-muted-foreground dark:bg-secondary-950 bg-white outline-none',
          view: 'dark:text-white text-muted-foreground dark:bg-secondary-950 bg-white outline-none',
        },
      },
    },
    footer: {
      base: 'hidden mt-2 space-x-2',
      button: {
        base: 'w-full rounded-lg px-5 py-2 text-center text-sm font-medium',
        today:
          'bg-secondary-700 text-muted-foreground hover:bg-opacity-70 dark:bg-cyan-600 dark:hover:bg-cyan-700',
        clear:
          'bg-secondary-700 text-muted-foreground hover:bg-opacity-70 dark:bg-cyan-600 dark:hover:bg-cyan-700',
      },
    },
  },
  views: {
    days: {
      header: {
        base: 'grid grid-cols-7 mb-1',
        title:
          'dow h-6 text-center text-sm font-medium leading-6 text-muted-foreground dark:text-gray-400',
      },
      items: {
        base: 'grid w-64 grid-cols-7',
        item: {
          base: 'block flex-1 cursor-pointer rounded-lg border-0 text-center text-sm font-semibold leading-9 text-muted-foreground hover:bg-secondary-700 dark:text-white dark:hover:bg-secondary-700 hover:text-white',
          selected: 'bg-secondary-700 text-white',
          disabled: 'text-muted-foreground',
        },
      },
    },
    months: {
      items: {
        base: 'grid w-64 grid-cols-7',
        item: {
          base: 'block flex-1 cursor-pointer rounded-lg border-0 text-center text-sm font-semibold leading-9 text-muted-foreground hover:bg-secondary-700 dark:text-white dark:hover:bg-secondary-700 hover:text-white',
          selected: 'bg-secondary-700 text-white',
          disabled: 'text-muted-foreground',
        },
      },
    },
    years: {
      items: {
        base: 'grid w-64 grid-cols-4',
        item: {
          base: 'block flex-1 cursor-pointer rounded-lg border-0 text-center text-sm font-semibold leading-9 text-muted-foreground hover:bg-secondary-700 dark:text-white dark:hover:bg-secondary-700 hover:text-white',
          selected: 'bg-secondary-700 text-white',
          disabled: 'text-muted-foreground',
        },
      },
    },
    decades: {
      items: {
        base: 'grid w-64 grid-cols-4',
        item: {
          base: 'block flex-1 cursor-pointer rounded-lg border-0 text-center text-sm font-semibold leading-9 text-muted-foreground hover:bg-secondary-700 dark:text-white dark:hover:bg-secondary-700 hover:text-white',
          selected: 'bg-secondary-700 text-white',
          disabled: 'text-muted-foreground',
        },
      },
    },
  },
}
