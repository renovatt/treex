import { Fragment } from 'react'
import { CgCloseR } from 'react-icons/cg'
import { ModalFormProps } from './types'
import { Dialog, Transition } from '@headlessui/react'

export default function Modal({
  closeModal,
  isOpen,
  children,
  label,
}: ModalFormProps) {
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={closeModal}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all dark:bg-primary-900">
                <CgCloseR
                  onClick={closeModal}
                  className="absolute right-5 top-5 h-7 w-7 text-primary-800 hover:cursor-pointer hover:text-primary-900 dark:hover:text-primary-750"
                />
                <Dialog.Title
                  as="h3"
                  className="text-lg font-semibold leading-6 text-white"
                >
                  {label}
                </Dialog.Title>
                <section className="my-2">{children}</section>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}
