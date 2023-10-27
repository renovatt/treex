'use client'
import { Fragment } from 'react'
import { AiOutlineCheck } from 'react-icons/ai'
import { ErrorMessage } from '../ErrorMessage'
import { HiMiniChevronUpDown } from 'react-icons/hi2'
import { Listbox, Transition } from '@headlessui/react'
import { useFormContext, Controller } from 'react-hook-form'

const level = ['Importante', 'Menos importante', 'Muito importante']

export default function PriorityLevelSelect() {
  const { control } = useFormContext()
  return (
    <div className="my-4 w-full">
      <Controller
        name="level"
        control={control}
        defaultValue={level[0]}
        render={({ field }) => (
          <Listbox value={field.value} onChange={field.onChange}>
            <div className="relative mt-1">
              <Listbox.Button className="relative w-full cursor-default rounded-lg border border-primary-800 bg-white py-2 pl-3 pr-10 text-left focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 dark:bg-primary-900 dark:shadow-md sm:text-sm">
                <span className="block truncate text-primary-800 dark:text-white">
                  {field.value}
                </span>
                <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                  <HiMiniChevronUpDown
                    className="h-5 w-5 text-primary-800"
                    aria-hidden="true"
                  />
                </span>
              </Listbox.Button>
              <Transition
                as={Fragment}
                leave="transition ease-in duration-100"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none dark:bg-secondary-950 sm:text-sm">
                  {level.map((level, levelIdx) => (
                    <Listbox.Option
                      key={levelIdx}
                      className={({ active }) =>
                        `relative cursor-default select-none py-2 pl-10 pr-4 ${
                          active
                            ? 'bg-primary-800 text-white dark:bg-secondary-700'
                            : 'text-primary-800'
                        }`
                      }
                      value={level}
                    >
                      {({ selected }) => (
                        <>
                          <span
                            className={`block truncate ${
                              selected ? 'font-medium' : 'font-normal'
                            }`}
                          >
                            {level}
                          </span>
                          {selected ? (
                            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-primary-800 dark:text-primary-750">
                              <AiOutlineCheck
                                className="h-5 w-5"
                                aria-hidden="true"
                              />
                            </span>
                          ) : null}
                        </>
                      )}
                    </Listbox.Option>
                  ))}
                </Listbox.Options>
              </Transition>
            </div>
            <ErrorMessage field={field.value} />
          </Listbox>
        )}
      />
    </div>
  )
}
