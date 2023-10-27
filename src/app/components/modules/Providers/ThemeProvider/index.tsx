'use client'
import { ThemeProviderProps } from './types'
import { ThemeProvider } from 'next-themes'

export default function NextThemeProvider({ children }: ThemeProviderProps) {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark">
      {children}
    </ThemeProvider>
  )
}
