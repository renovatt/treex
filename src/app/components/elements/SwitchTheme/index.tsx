'use client'
import { useThemeSwitcher } from '@/hooks/useThemeSwitcher'

export default function SwitchTheme() {
  const { enabled, toggleTheme, mounted } = useThemeSwitcher()

  if (!mounted) return null

  return (
    <div className="flex items-center justify-between py-0">
      <input
        type="checkbox"
        checked={enabled}
        onChange={toggleTheme}
        id="theme-switch"
        className="sr-only"
      />
      <label
        htmlFor="theme-switch"
        className={`${enabled ? 'bg-primary-900' : 'bg-secondary-700'}
          relative inline-flex h-[20px] w-[40px] cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75`}
      >
        <span className="sr-only">Use setting</span>
        <span
          aria-hidden="true"
          className={`${
            enabled ? 'translate-x-5 bg-white' : 'translate-x-0 bg-white'
          }
            pointer-events-none inline-block h-[17px] w-[17px] transform rounded-full shadow-lg ring-0 transition duration-200 ease-in-out`}
        />
      </label>
    </div>
  )
}
