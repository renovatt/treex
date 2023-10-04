import { useState } from 'react'

export const useToggle = () => {
  const [isOpen, setModal] = useState<boolean>(false)

  const toggleModal = () => {
    setModal((state) => !state)
  }

  const openModal = () => setModal(true)
  const closeModal = () => setModal(false)

  return {
    isOpen,
    openModal,
    closeModal,
    toggleModal,
  }
}
