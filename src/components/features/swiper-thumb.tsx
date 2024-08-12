'use client'
import Image from 'next/image'
import { Fragment } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, EffectCoverflow } from 'swiper/modules'

export default function SwiperThumb() {
  const images = [
    '/laptop-1.png',
    '/laptop-2.png',
    '/mobile-1.png',
    '/mobile-2.png',
    '/laptop-3.png',
    '/laptop-4.png',
  ]
  return (
    <Fragment>
      <section className="hidden h-full w-1/2 items-center justify-center rounded-3xl lg:flex">
        <Swiper
          spaceBetween={30}
          centeredSlides={true}
          loop={true}
          autoplay={{
            delay: 8000,
            disableOnInteraction: false,
          }}
          modules={[EffectCoverflow, Autoplay]}
          className="h-full w-full rounded-lg"
        >
          {images?.map((thumb, index) => (
            <SwiperSlide
              key={index}
              className="flex h-full w-full items-center justify-center"
            >
              <Image
                priority
                src={thumb}
                alt={thumb}
                width={1000}
                height={1000}
                className="h-full w-[90%] rounded-lg object-contain"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </section>
    </Fragment>
  )
}
