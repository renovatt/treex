type UseStoreActions = {
  setStatus: () => void
}

type UseStoreState = {
  status: {
    isSelected: boolean
  }
}

export type UseStoreProps = UseStoreState & UseStoreActions

export type DateStore = {
  date: string
  setDate: (newDate: string) => void
}
