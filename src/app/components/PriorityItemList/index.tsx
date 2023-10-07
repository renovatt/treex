'use client'
import ModalForm from '../Modal'
import { useToggle } from '@/hooks/useToogle'
import { PriorityItemListProps } from './types'
import EditPriorityForm from '../EditPriorityForm'
import { GiBoltShield, GiEdgedShield, GiBorderedShield } from 'react-icons/gi'

export default function PriorityItemList({
  title,
  level,
}: PriorityItemListProps) {
  const { isOpen, closeModal, openModal } = useToggle()
  return (
    <>
      <ModalForm
        isOpen={isOpen}
        closeModal={closeModal}
        label="Editar prioridade"
      >
        <EditPriorityForm />
      </ModalForm>
      <li
        onClick={openModal}
        className="my-1 flex w-full items-center justify-between rounded-xl bg-primary-900 px-6 py-4 shadow-lg transition-all ease-in-out hover:cursor-pointer hover:opacity-80"
      >
        <span className="flex w-20 items-center justify-center text-xs text-primary-800 md:w-28 md:text-base">
          {title}
        </span>

        {level === 'Importante' ? (
          <>
            <div className="flex items-center justify-center gap-4">
              <span className="hidden text-xs text-primary-800 md:flex">
                Importande
              </span>
              <GiBoltShield className="h-6 w-6 text-secondary-800 shadow-sm" />
            </div>
          </>
        ) : level === 'Menos importante' ? (
          <>
            <div className="flex items-center justify-center gap-4">
              <span className="hidden text-xs text-primary-800 md:flex">
                Menos importante
              </span>
              <GiEdgedShield className="h-6 w-6 text-secondary-900 shadow-sm" />
            </div>
          </>
        ) : (
          <>
            <div className="flex items-center justify-center gap-4">
              <span className="hidden text-xs text-primary-800 md:flex">
                Muito importante
              </span>
              <GiBorderedShield className="h-6 w-6 text-secondary-750 shadow-sm" />
            </div>
          </>
        )}
      </li>
    </>
  )
}
