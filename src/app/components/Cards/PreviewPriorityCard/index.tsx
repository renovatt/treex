'use client'
import Modal from '../../Modal'
import PriorityForm from '../../Form/PriorityForm'
import { useToggle } from '@/hooks/useToogle'
import PriorityItemList from '../../Tables/PriorityItemList'
import { MdOutlineAddBox, MdDeleteOutline } from 'react-icons/md'

export default function PreviewPriorityCard() {
  const { isOpen, closeModal, openModal } = useToggle()
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

        <ul className="flex max-h-full w-full flex-col items-start justify-start overflow-scroll overflow-x-hidden">
          <PriorityItemList
            title="Monitor"
            level={'Importante'}
            icon={MdDeleteOutline}
          />

          <PriorityItemList
            title="Monitor"
            level={'Importante'}
            icon={MdDeleteOutline}
          />

          <PriorityItemList
            title="Monitor"
            level={'Menos importante'}
            icon={MdDeleteOutline}
          />

          <PriorityItemList
            title="Monitor"
            level={'Muito importante'}
            icon={MdDeleteOutline}
          />

          <PriorityItemList
            title="Monitor"
            level={'Importante'}
            icon={MdDeleteOutline}
          />

          <PriorityItemList
            title="Monitor"
            level={'Menos importante'}
            icon={MdDeleteOutline}
          />

          <PriorityItemList
            title="Monitor"
            level={'Muito importante'}
            icon={MdDeleteOutline}
          />

          <PriorityItemList
            title="Monitor"
            level={'Importante'}
            icon={MdDeleteOutline}
          />

          <PriorityItemList
            title="Monitor"
            level={'Menos importante'}
            icon={MdDeleteOutline}
          />

          <PriorityItemList
            title="Monitor"
            level={'Muito importante'}
            icon={MdDeleteOutline}
          />

          <PriorityItemList
            title="Monitor"
            level={'Importante'}
            icon={MdDeleteOutline}
          />

          <PriorityItemList
            title="Monitor"
            level={'Menos importante'}
            icon={MdDeleteOutline}
          />
        </ul>
      </article>
    </>
  )
}
