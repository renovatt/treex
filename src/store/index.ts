import { create } from 'zustand'
import { DateStore, UseStoreProps } from './types'

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

export const useDateStore = create<DateStore>((set) => ({
  date: '',
  setDate: (newDate: string) => set({ date: newDate }),
}))
