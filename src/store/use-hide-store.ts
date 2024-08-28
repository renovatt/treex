import { create } from 'zustand'

type ActionsProps = {
  setIsHidden: () => void
}

type StateProps = {
  status: {
    hidden: boolean
  }
}

export type Props = StateProps & ActionsProps

const useHideStore = create<Props>((set) => ({
  status: {
    hidden: true,
  },
  setIsHidden: () => {
    set((state) => {
      return {
        ...state,
        status: {
          hidden: !state.status.hidden,
        },
      }
    })
  },
}))

export default useHideStore
