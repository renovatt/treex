'use client'
import Image from 'next/image'
import { Fragment } from 'react'
import { auth } from '@/firebase'
import { logout } from '@/lib/auth'
import { useRouter } from 'next/navigation'
import { IoLogOutOutline } from 'react-icons/io5'
import { AiOutlineSetting } from 'react-icons/ai'
import { Menu, Transition } from '@headlessui/react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { MdKeyboardArrowDown, MdOutlineMail } from 'react-icons/md'

export default function UserDropdown() {
  const router = useRouter()
  const [user] = useAuthState(auth)
  const letter = `${user?.email?.charAt(0)}`
  const avatar = `https://api.dicebear.com/7.x/initials/svg?seed=${letter}`

  const handleLogout = async () => {
    logout()
    router.push('/login')
  }

  return (
    <div className="z-20 flex items-center justify-center">
      <Menu as="div" className="relative inline-block text-left">
        <div>
          <Menu.Button className="flex w-full items-center justify-center gap-3 rounded-md text-sm font-medium text-primary-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
            <figure className="h-8 w-8 select-none rounded-full">
              {user?.photoURL ? (
                <Image
                  src={user.photoURL}
                  alt="user-avatar"
                  className="h-full w-full rounded-full object-cover"
                  width={500}
                  height={500}
                  priority
                />
              ) : (
                <object
                  data={avatar}
                  type="image/svg+xml"
                  className="h-full w-full rounded-full object-cover"
                />
              )}
            </figure>

            {user?.displayName && (
              <span className="hidden items-center justify-center text-primary-800 md:flex">
                {user.displayName}
              </span>
            )}

            <MdKeyboardArrowDown
              className="-mr-1 ml-1 h-5 w-5 text-primary-800 hover:text-primary-750"
              aria-hidden="true"
            />
          </Menu.Button>
        </div>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items
            className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-secondary-700 rounded-md bg-secondary-950
            shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
          >
            <div className="px-1 py-1">
              <Menu.Item>
                {({ active }) => (
                  <button
                    className={`${
                      active
                        ? 'bg-secondary-700 text-white'
                        : 'text-primary-800'
                    } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                  >
                    <MdOutlineMail
                      className="mr-2 h-5 w-5"
                      aria-hidden="true"
                    />
                    {user && user.email}
                  </button>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <button
                    className={`${
                      active
                        ? 'bg-secondary-700 text-white'
                        : 'text-primary-800'
                    } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                  >
                    <AiOutlineSetting
                      className="mr-2 h-5 w-5"
                      aria-hidden="true"
                    />
                    Configurações
                  </button>
                )}
              </Menu.Item>
            </div>

            <div className="px-1 py-1">
              <Menu.Item>
                {({ active }) => (
                  <button
                    onClick={handleLogout}
                    className={`${
                      active
                        ? 'bg-secondary-700 text-white'
                        : 'text-primary-800'
                    } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                  >
                    <IoLogOutOutline
                      className="mr-2 h-5 w-5"
                      aria-hidden="true"
                    />
                    Logout
                  </button>
                )}
              </Menu.Item>
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  )
}
