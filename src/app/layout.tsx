import 'swiper/css'
import './globals.css'
import dynamic from 'next/dynamic'
import { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Toaster } from 'react-hot-toast'

const inter = Inter({ subsets: ['latin'] })

const APP_NAME = 'TreeX'
const APP_DESCRIPTION =
  'Bem-vindo ao TreeX - Sua ferramenta financeira gratuita. Capacite-se para um maior controle sobre suas finanças com o TreeX.'

export const metadata: Metadata = {
  metadataBase: new URL('http://localhost:3000'),
  title: APP_NAME,
  applicationName: APP_NAME,
  description: APP_DESCRIPTION,
  generator: 'Next.js',
  manifest: '/manifest.json',
  keywords: [
    'Treex',
    'Sistema Financeiro',
    'Next.js',
    'Gráficos Financeiros',
    'Filtros por Categoria',
    'Ganho Mensal',
    'Ganho Diário',
    'Criptomoedas',
    'Valor do Dólar',
    'Bitcoin',
    'API da Binance',
    'Anotações Financeiras',
    'Lista de Prioridades',
    'Segurança',
    'Firebase',
    'Autenticação',
    'Controle Financeiro',
    'Ferramenta Financeira',
    'Planejamento Financeiro',
    'Finanças Pessoais',
    'Dados em Tempo Real',
    'Jornada Financeira',
    'renovatt',
  ],
  themeColor: [{ media: '(prefers-color-scheme: dark)', color: '#fff' }],
  authors: [
    { name: 'renovatt' },
    { name: 'renovatt', url: 'https://www.linkedin.com/in/renovatt/' },
  ],
  viewport:
    'minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, viewport-fit=cover',

  openGraph: {
    type: 'website',
    url: 'https://treex-renovatt.vercel.app/',
    title: APP_NAME,
    description: APP_DESCRIPTION,
    siteName: APP_NAME,
    images: [
      {
        url: 'https://treex-renovatt.vercel.app/icon-192x192.png',
      },
    ],
  },

  icons: [
    { rel: 'apple-touch-icon', url: '/icon-192x192.png' },
    { rel: 'icon', url: '/favicon.ico' },
  ],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const NextThemeProvider = dynamic(
    () => import('@modules/Providers/ThemeProvider'),
    { ssr: false },
  )
  return (
    <html lang="pt-br">
      <body className={inter.className}>
        <Toaster />
        <NextThemeProvider>{children}</NextThemeProvider>
      </body>
    </html>
  )
}
