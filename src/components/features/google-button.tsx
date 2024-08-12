'use client'
import { FcGoogle } from 'react-icons/fc'
import { signInWithGoogle } from '@/lib/auth'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'

export default function GoogleButton() {
  const router = useRouter()

  const handleGoogleLogin = async () => {
    const { status, message } = await signInWithGoogle()
    if (!status) {
      toast.error(message)
      return
    }
    router.push('/dashboard')
    toast.success(message)
  }
  return (
    <>
      <button
        onClick={handleGoogleLogin}
        className="flex items-center justify-center gap-4 rounded-full border bg-gray-50 py-3 focus-within:opacity-70 hover:cursor-pointer"
      >
        <FcGoogle className="h-5 w-5" />
        <span className="text-xs font-bold text-muted-foreground">
          Login com o Google
        </span>
      </button>

      <section className="flex items-center justify-around opacity-50">
        <div className="h-[1px] w-20"></div>
        <span className="text-xs text-muted-foreground">
          ou Login com E-mail
        </span>
        <div className="h-[1px] w-20"></div>
      </section>
    </>
  )
}
