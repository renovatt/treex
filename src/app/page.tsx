'use client'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function Home() {
  const route = useRouter()

  useEffect(() => {
    setTimeout(() => {
      route.push('/login')
    }, 3000)
  }, [route])

  return (
    <section className="bg-list-gradient flex h-screen w-screen items-center justify-center">
      <span className="text-white">Loagind..</span>
    </section>
  )
}
