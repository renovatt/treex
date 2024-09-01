import { create } from 'zustand'

type UseStoreActions = {
  setStatus: () => void
}

type UseStoreState = {
  status: {
    isSelected: boolean
  }
}

export type UseStoreProps = UseStoreState & UseStoreActions

const useSideBarStore = create<UseStoreProps>((set) => ({
  status: {
    isSelected: false,
  },
  setStatus: () => {
    set((state) => {
      return {
        ...state,
        status: {
          isSelected: !state.status.isSelected,
        },
      }
    })
  },
}))

export default useSideBarStore
