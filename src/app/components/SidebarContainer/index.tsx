import { SidebarContainerProps } from './types'

export default function SidebarContainer({ children }: SidebarContainerProps) {
  return <section className="relative flex h-screen">{children}</section>
}
