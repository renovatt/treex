'use client'
import Modal from '../Modal'
import { auth } from '@/firebase'
import { UserData } from '@/lib/types'
import { useRef, useEffect } from 'react'
import { useToggle } from '@/hooks/useToogle'
import PriorityForm from '../Form/PriorityForm'
import { MdOutlineAddBox } from 'react-icons/md'
import { useGetPriority } from '@/hooks/useGetPriority'
import PriorityItemList from '@elements/PriorityItemList'
import { useAuthState } from 'react-firebase-hooks/auth'

export default function PreviewPriorityCard() {
  const [user] = useAuthState(auth)
  const { priorityData } = useGetPriority(user as UserData)
  const { isOpen, closeModal, openModal } = useToggle()
  const tableRef = useRef<HTMLUListElement | null>(null)

  useEffect(() => {
    tableRef.current?.scrollTo(0, -tableRef.current.scrollHeight)
  }, [priorityData])

  return (
    <>
      <Modal
        isOpen={isOpen}
        closeModal={closeModal}
        label="Adicionar prioridade"
      >
        <PriorityForm />
      </Modal>
      <article className="bg-right-card-gradient flex h-[24.5rem] w-full flex-col items-center justify-start gap-4 rounded-3xl p-4 xl:w-1/2">
        <section className="flex w-full items-center justify-between">
          <h1 className="w-36 self-start text-xs text-white xl:w-full xl:text-base">
            Lista de prioridades
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
          {priorityData.map((priority) => (
            <PriorityItemList
              id={priority.id ?? ''}
              key={priority.id}
              title={priority.name}
              level={priority.level}
            />
          ))}
        </ul>
      </article>
    </>
  )
}
