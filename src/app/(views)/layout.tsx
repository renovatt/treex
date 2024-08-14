import Sidebar from '@/components/features/layout/_components/sidebar'
import ReactQueryProvider from '@/components/features/providers/react-query-provider'

export default function MainLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <ReactQueryProvider>
        <Sidebar>{children}</Sidebar>
      </ReactQueryProvider>
    </>
  )
}
