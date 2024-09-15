'use client'

import useHideStore from '@/store/use-hide-store'
import { PiEyeClosed } from 'react-icons/pi'
import { VscEye } from 'react-icons/vsc'

export default function VisibilityToggle() {
  const { status, setIsHidden } = useHideStore()

  return (
    <>
      {status.hidden ? (
        <PiEyeClosed
          onClick={() => {
            setIsHidden()
          }}
          className="ml-3 mt-1 size-6 cursor-pointer"
        />
      ) : (
        <VscEye
          onClick={() => {
            setIsHidden()
          }}
          className="ml-3 mt-1 size-6 cursor-pointer"
        />
      )}
    </>
  )
}
