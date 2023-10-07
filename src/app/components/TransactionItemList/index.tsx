'use client'
import ModalForm from '../Modal'
import { useToggle } from '@/hooks/useToogle'
import { TransactionItemListProps } from './types'
import EditTransactionForm from '../EditTransactionForm'

export default function TransactionItemList({
  icon: Icon,
  title,
  value,
  date,
  type,
}: TransactionItemListProps) {
  const { isOpen, closeModal, openModal } = useToggle()
  return (
    <>
      <ModalForm
        isOpen={isOpen}
        closeModal={closeModal}
        label="Editar transação"
      >
        <EditTransactionForm />
      </ModalForm>
      <li
        onClick={openModal}
        className={`my-1 flex w-full items-center justify-between px-6 py-4 transition-all ease-in-out hover:cursor-pointer hover:opacity-80 ${
          type === 'income'
            ? 'bg-income-list-gradient'
            : 'bg-expense-list-gradient'
        }`}
      >
        <Icon className="h-6 w-6 text-primary-800 shadow-sm" />
        <span className="flex w-24 items-center justify-center text-xs text-primary-800 md:w-28 md:text-base">
          {title}
        </span>
        <span className="hidden items-center justify-center text-xs text-primary-800 md:flex md:w-24 md:text-base">
          {date}
        </span>
        <span className="flex w-24 items-center justify-center text-xs text-primary-800 md:w-24 md:text-base">
          R$ {value}
        </span>
      </li>
    </>
  )
}
