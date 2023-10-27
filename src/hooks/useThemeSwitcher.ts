import { useTheme } from 'next-themes'
import { useState, useEffect } from 'react'

export const useThemeSwitcher = () => {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  const initialEnabled = theme === 'dark'
  const [enabled, setEnabled] = useState(initialEnabled)

  const toggleTheme = () => {
    setEnabled(!enabled)
    if (enabled) {
      setTheme('light')
    } else {
      setTheme('dark')
    }
  }

  useEffect(() => {
    setMounted(true)
  }, [])

  return { theme, toggleTheme, mounted, enabled }
}
