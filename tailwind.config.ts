import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        primary: {
          900: '#171721',
          850: '#30303c',
          800: '#787878',
          750: '#baf5ed',
          650: '#f5f5fd ',
          640: '#c5c4c8 ',
          550: '#34d399cb ',
        },
        secondary: {
          900: '#2c423d',
          950: '#23232d',
          800: '#252b4d',
          850: '#93c1bf',
          700: '#30313b',
          750: '#4d2525',
        },
      },
    },
  },
  plugins: [require('flowbite/plugin')],
}
export default config
