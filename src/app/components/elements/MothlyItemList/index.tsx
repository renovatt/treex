'use client'
import Modal from '@modules/Modal'
import { useToggle } from '@/hooks/useToogle'
import { PreviewMothItemListProps } from './types'
import EditMonthlyForm from '@modules/Form/EditMonthlyForm'
import { motion } from 'framer-motion'

export default function MothlyItemList({
  title,
  value,
  id,
}: PreviewMothItemListProps) {
  const { isOpen, closeModal, openModal } = useToggle()
  return (
    <>
      <Modal isOpen={isOpen} closeModal={closeModal} label="Editar gasto">
        <EditMonthlyForm id={id} closeModal={closeModal} />
      </Modal>
      <motion.li
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        id={id}
        onClick={openModal}
        className="my-1 flex w-full items-center justify-between rounded-xl bg-primary-900 px-6 py-4 shadow-lg transition-all ease-in-out hover:cursor-pointer hover:opacity-80"
      >
        <span className="flex items-center justify-center text-xs capitalize text-primary-800 md:text-base">
          {title}
        </span>
        <span className="flex w-20 items-center justify-center text-xs text-primary-800 md:w-24 md:text-base">
          {value}
        </span>
      </motion.li>
    </>
  )
}
