import { create } from 'zustand'
import { UseStoreProps } from './types'

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
