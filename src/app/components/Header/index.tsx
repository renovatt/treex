import Image from 'next/image'
import { HeaderProps } from './types'
import { MdKeyboardArrowDown } from 'react-icons/md'

export default function Header({ title, description }: HeaderProps) {
  return (
    <header className="my-5 mb-10 flex w-full items-center justify-between">
      <article className="flex flex-col items-start justify-center">
        <h1 className="text-2xl font-bold text-white">{title}</h1>
        <span className="text-xs text-primary-800">{description}</span>
      </article>

      <section className="flex items-end justify-center gap-2">
        <figure className="h-8 w-8 rounded-full bg-white">
          <Image
            src={'https://avatars.githubusercontent.com/u/94547135?v=4'}
            alt="user-image"
            className="h-full w-full rounded-full bg-white object-cover"
            width={500}
            height={500}
            priority
          />
        </figure>
        <MdKeyboardArrowDown className="h-5 w-5 text-primary-800 hover:cursor-pointer" />
      </section>
    </header>
  )
}
