'use client'
import Modal from '../../Modal'
import { useToggle } from '@/hooks/useToogle'
import { PreviewMothItemListProps } from './types'
import EditMonthPreviewForm from '../../Form/EditMonthPreviewForm'

export default function PreviewMothItemList({
  title,
  value,
}: PreviewMothItemListProps) {
  const { isOpen, closeModal, openModal } = useToggle()
  return (
    <>
      <Modal isOpen={isOpen} closeModal={closeModal} label="Editar gasto">
        <EditMonthPreviewForm />
      </Modal>
      <li
        onClick={openModal}
        className="my-1 flex w-full items-center justify-between rounded-xl bg-primary-900 px-6 py-4 shadow-lg transition-all ease-in-out hover:cursor-pointer hover:opacity-80"
      >
        <span className="flex w-20 items-center justify-center text-xs text-primary-800 md:w-28 md:text-base">
          {title}
        </span>
        <span className="flex w-20 items-center justify-center text-xs text-primary-800 md:w-24 md:text-base">
          R$ {value}
        </span>
      </li>
    </>
  )
}
