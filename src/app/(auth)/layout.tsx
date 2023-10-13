export default function LoginLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <section className="flex h-screen w-screen items-center justify-center">
      {children}
    </section>
  )
}
