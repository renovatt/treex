import ThumbSlider from '../SwiperThumb'
import { AuthContainerProps } from './types'
import { LiaCopyright } from 'react-icons/lia'

export default function AuthContainer({ children }: AuthContainerProps) {
  return (
    <section className="container relative flex h-[95%] w-[90%] items-center justify-center gap-2 overflow-hidden rounded-3xl bg-white p-4 lg:justify-between">
      <ThumbSlider />
      <aside className="flex h-full w-full items-center justify-center rounded-3xl lg:w-1/2">
        <section className="flex w-96 flex-col space-y-6 p-2 lg:space-y-2">
          {children}
        </section>
      </aside>
      <span className="absolute bottom-2 flex items-center justify-center gap-1 lg:right-5">
        <LiaCopyright className="text-xs text-primary-800" />
        <span className="text-xs text-primary-800">
          2023 Desenvolvido por renovatt
        </span>
      </span>
    </section>
  )
}
