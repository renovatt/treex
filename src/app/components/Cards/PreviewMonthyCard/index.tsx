'use client'
import Modal from '../../Modal'
import { useToggle } from '@/hooks/useToogle'
import { MdOutlineAddBox } from 'react-icons/md'
import MonthPreviewForm from '../../Form/MonthPreviewForm'
import PreviewMothItemList from '../../Tables/PreviewMothItemList'

export default function PreviewMonthyCard() {
  const { isOpen, closeModal, openModal } = useToggle()
  return (
    <>
      <Modal isOpen={isOpen} label="Adicionar gasto" closeModal={closeModal}>
        <MonthPreviewForm />
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

        <ul className="flex max-h-full w-full flex-col items-start justify-start overflow-scroll overflow-x-hidden">
          <PreviewMothItemList value={123} title="Faculdade" />
          <PreviewMothItemList value={123} title="Faculdade" />
          <PreviewMothItemList value={123} title="Faculdade" />
          <PreviewMothItemList value={123} title="Faculdade" />
          <PreviewMothItemList value={123} title="Faculdade" />
          <PreviewMothItemList value={123} title="Faculdade" />
        </ul>
      </article>
    </>
  )
}
