'use client'
import Modal from '../Modal'
import { auth } from '@/firebase'
import { UserData } from '@/lib/types'
import { useEffect, useRef } from 'react'
import { useToggle } from '@/hooks/useToogle'
import MonthlyForm from '../Form/MonthlyForm'
import { MdOutlineAddBox } from 'react-icons/md'
import MothlyItemList from '@elements/MothlyItemList'
import { useGetMonthly } from '@/hooks/useGetMonthly'
import { useAuthState } from 'react-firebase-hooks/auth'

export default function PreviewMonthyCard() {
  const [user] = useAuthState(auth)
  const { monthlyData } = useGetMonthly(user as UserData)
  const { isOpen, closeModal, openModal } = useToggle()
  const tableRef = useRef<HTMLUListElement | null>(null)

  useEffect(() => {
    tableRef.current?.scrollTo(0, -tableRef.current.scrollHeight)
  }, [monthlyData])

  return (
    <>
      <Modal isOpen={isOpen} label="Adicionar gasto" closeModal={closeModal}>
        <MonthlyForm />
      </Modal>
      <article className="bg-left-card-gradient flex h-[24.5rem] w-full flex-col items-center justify-start gap-4 rounded-3xl p-4 xl:w-1/2">
        <section className="flex w-full items-center justify-between">
          <h1 className="w-36 self-start text-xs text-white xl:w-full xl:text-base">
            Previsão de gastos do mês
          </h1>
          <section
            onClick={openModal}
            className="mr-2 flex items-center justify-start text-primary-800 transition-all ease-in-out hover:cursor-pointer hover:text-primary-750"
          >
            <MdOutlineAddBox className="h-6 w-6" />
            <span className="flex select-none items-center justify-center pl-2 text-xs md:text-base">
              Adicionar
            </span>
          </section>
        </section>

        <ul
          ref={tableRef}
          className="flex max-h-full w-full flex-col-reverse items-start justify-start overflow-scroll overflow-x-hidden"
        >
          {monthlyData.map((monthly) => (
            <MothlyItemList
              id={monthly.id ?? ''}
              key={monthly.id}
              title={monthly.name}
              value={Number(monthly.value).toLocaleString('pt-br', {
                style: 'currency',
                currency: 'BRL',
              })}
            />
          ))}
        </ul>
      </article>
    </>
  )
}
