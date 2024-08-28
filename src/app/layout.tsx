import 'swiper/css'
import './globals.css'
import { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Toaster } from 'react-hot-toast'
import { ThemeProvider } from '@/components/features/providers/theme-provider'

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
  authors: [
    { name: 'renovatt' },
    { name: 'renovatt', url: 'https://www.linkedin.com/in/renovatt/' },
  ],

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
  return (
    <html lang="pt-br" suppressHydrationWarning>
      <body className={inter.className}>
        <Toaster />
        <ThemeProvider attribute="class" defaultTheme="light">
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
