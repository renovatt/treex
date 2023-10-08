'use client'
import Modal from '../../Modal'
import { HeaderProps } from './types'
import UserDropdown from '../../UserDropdown'
import { useToggle } from '@/hooks/useToogle'
import { MdOutlineAddBox } from 'react-icons/md'
import DatepickerComponent from '../../DatePicker'
import TransactionForm from '../../Form/TransactionForm'

export default function Header({ title, description }: HeaderProps) {
  const { isOpen, openModal, closeModal } = useToggle()
  return (
    <>
      <Modal label="Nova transação" closeModal={closeModal} isOpen={isOpen}>
        <TransactionForm />
      </Modal>
      <header className="my-5 mb-10 flex w-full items-center justify-between">
        <article className="flex flex-col items-start justify-center">
          <h1 className="text-xl font-bold text-white md:text-2xl">{title}</h1>
          <span className="text-xs text-primary-800">{description}</span>
        </article>

        <section className="flex items-center justify-between gap-4">
          {title === 'Transações' ? <DatepickerComponent /> : ''}
          <section
            onClick={openModal}
            className="mr-2 flex items-center justify-center text-primary-800 transition-all ease-in-out hover:cursor-pointer hover:text-primary-750"
          >
            <MdOutlineAddBox className="h-6 w-6" />
            <span className="flex select-none items-center justify-center pl-2 text-xs md:text-base">
              Adicionar
            </span>
          </section>
          <UserDropdown />
        </section>
      </header>
    </>
  )
}
