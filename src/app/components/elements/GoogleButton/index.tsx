import { FcGoogle } from 'react-icons/fc'

export default function GoogleButton() {
  return (
    <>
      <button className="flex items-center justify-center gap-4 rounded-full border py-3 focus-within:opacity-70 hover:cursor-pointer">
        <FcGoogle className="h-5 w-5" />
        <span className="text-xs font-bold">Login com o Google</span>
      </button>

      <section className="flex items-center justify-around opacity-50">
        <div className="h-[1px] w-20 bg-primary-800"></div>
        <span className="text-xs text-primary-800">ou Login com E-mail</span>
        <div className="h-[1px] w-20 bg-primary-800"></div>
      </section>
    </>
  )
}
