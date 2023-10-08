import { SidebarContainerProps } from './types'

export default function SidebarContainer({ children }: SidebarContainerProps) {
  return (
    <main className="flex h-screen flex-1 items-center justify-center">
      <section className="container relative flex h-screen overflow-hidden rounded-xl border border-primary-850 shadow-xl">
        {children}
      </section>
    </main>
  )
}
