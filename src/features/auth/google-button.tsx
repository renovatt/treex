'use client'
import { FcGoogle } from 'react-icons/fc'
import { signInWithGoogle } from '@/firebase/database/auth'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'

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
      <Button
        onClick={handleGoogleLogin}
        className="flex items-center justify-center gap-4 rounded-full border bg-secondary py-3 focus-within:opacity-70 hover:cursor-pointer"
      >
        <FcGoogle className="h-5 w-5" />
        <span className="text-xs font-bold text-muted-foreground">
          Login com o Google
        </span>
      </Button>

      <section className="flex flex-col items-center justify-around gap-2 py-2">
        <span className="text-xs text-muted-foreground">
          Entrar com uma conta
        </span>
      </section>
      <Separator className="my-4" />
    </>
  )
}
