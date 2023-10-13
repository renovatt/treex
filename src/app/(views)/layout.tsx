import Sidebar from '@modules/Layout/Sidebar'
import ReactQueryProvider from '@modules/Providers/ReactQueryProvider'

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
