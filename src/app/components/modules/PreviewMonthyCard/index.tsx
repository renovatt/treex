'use client'
import Modal from '../Modal'
import { auth } from '@/firebase'
import { UserData } from '@/lib/types'
import { useUser } from '@/hooks/useUser'
import { useToggle } from '@/hooks/useToogle'
import MonthlyForm from '../Form/MonthlyForm'
import { MdOutlineAddBox } from 'react-icons/md'
import { useAuthState } from 'react-firebase-hooks/auth'
import MonthlyTableContent from '../MonthlyTableContent'

export default function PreviewMonthyCard() {
  const [user, loading] = useAuthState(auth)
  const { userLoaded } = useUser(user as UserData)
  const { isOpen, closeModal, openModal } = useToggle()
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

        {userLoaded && !loading ? (
          <MonthlyTableContent user={userLoaded} />
        ) : (
          <p className="text-xs font-bold text-primary-800">Aguardando...</p>
        )}
      </article>
    </>
  )
}
