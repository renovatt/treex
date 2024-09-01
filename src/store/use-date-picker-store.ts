import { create } from 'zustand'

export type DateRange = {
  from: Date | null
  to: Date | null
}

export type DateStore = {
  dateRange: DateRange
  setDateRange: (newDateRange: DateRange) => void
  clearDateRange: () => void
}

export const useDateStore = create<DateStore>((set) => ({
  dateRange: { from: null, to: null },
  setDateRange: (newDateRange: DateRange) => set({ dateRange: newDateRange }),
  clearDateRange: () => set({ dateRange: { from: null, to: null } }),
}))
