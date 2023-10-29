'use client'
import Modal from '@modules/Modal'
import { useToggle } from '@/hooks/useToogle'
import { PriorityItemListProps } from './types'
import EditPriorityForm from '@modules/Form/EditPriorityForm'
import { GiBoltShield, GiEdgedShield, GiBorderedShield } from 'react-icons/gi'
import { motion } from 'framer-motion'

export default function PriorityItemList({
  title,
  level,
  id,
}: PriorityItemListProps) {
  const { isOpen, closeModal, openModal } = useToggle()
  return (
    <>
      <Modal isOpen={isOpen} closeModal={closeModal} label="Editar prioridade">
        <EditPriorityForm id={id} closeModal={closeModal} />
      </Modal>
      <motion.li
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        id={id}
        onClick={openModal}
        className="horver:bg-white my-1 flex w-full items-center justify-between rounded-xl bg-primary-650 px-6 py-4 shadow-md transition-all ease-in-out hover:cursor-pointer hover:opacity-80 dark:bg-primary-900 dark:shadow-none"
      >
        <span className="flex items-center justify-center text-xs capitalize text-primary-800 dark:text-primary-640 md:text-base">
          {title}
        </span>

        {level === 'Importante' ? (
          <>
            <div className="flex items-center justify-center gap-4">
              <span className="hidden text-xs text-primary-800 dark:text-primary-640 md:flex">
                Importante
              </span>
              <GiBoltShield className="h-6 w-6 text-secondary-800 shadow-sm" />
            </div>
          </>
        ) : level === 'Menos importante' ? (
          <>
            <div className="flex items-center justify-center gap-4">
              <span className="hidden text-xs text-primary-800 dark:text-primary-640 md:flex">
                Menos importante
              </span>
              <GiEdgedShield className="h-6 w-6 text-secondary-900 shadow-sm" />
            </div>
          </>
        ) : (
          <>
            <div className="flex items-center justify-center gap-4">
              <span className="hidden text-xs text-primary-800 dark:text-primary-640 md:flex">
                Muito importante
              </span>
              <GiBorderedShield className="h-6 w-6 text-secondary-750 shadow-sm" />
            </div>
          </>
        )}
      </motion.li>
    </>
  )
}
