'use client'
import Modal from '@modules/Modal'
import { useToggle } from '@/hooks/useToogle'
import { TransactionItemListProps } from './types'
import EditTransactionForm from '@modules/Form/EditTransactionForm'
import { motion } from 'framer-motion'

export default function TransactionItemList({
  icon: Icon,
  title,
  value,
  date,
  type,
  id,
}: TransactionItemListProps) {
  const { isOpen, closeModal, openModal } = useToggle()
  return (
    <>
      <Modal isOpen={isOpen} closeModal={closeModal} label="Editar transação">
        <EditTransactionForm id={id} closeModal={closeModal} />
      </Modal>
      <motion.li
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        id={id}
        onClick={openModal}
        className={`my-1 flex w-full items-center justify-between rounded-lg px-3 py-4 transition-all ease-in-out hover:cursor-pointer hover:bg-white hover:shadow-md dark:hover:opacity-80 md:px-8 ${
          type === 'income'
            ? 'dark:bg-income-list-gradient bg-primary-650'
            : 'dark:bg-expense-list-gradient bg-primary-650'
        }`}
      >
        <Icon className="h-6 w-6 text-primary-800 dark:text-primary-640 dark:shadow-sm" />
        <span className="flex w-auto items-center justify-center text-xs capitalize text-primary-800 dark:text-primary-640 md:w-60 md:text-base">
          {title}
        </span>
        <span className="hidden w-24 items-center justify-center text-xs text-primary-800 dark:text-primary-640 md:flex md:text-base">
          {date}
        </span>
        <span className="flex w-auto items-center justify-center text-xs text-primary-800 dark:text-primary-640 md:w-60 md:text-base">
          {value}
        </span>
      </motion.li>
    </>
  )
}
