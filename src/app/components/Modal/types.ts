import { ReactNode } from 'react'

export type ModalFormProps = {
  isOpen: boolean
  label: string
  children: ReactNode
  closeModal: () => void
}
