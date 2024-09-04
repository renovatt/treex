import Sidebar from '@/features/layout/_components/sidebar'
import ReactQueryProvider from '@/features/providers/react-query-provider'

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
