type UseStoreActions = {
  setStatus: () => void
}

type UseStoreState = {
  status: {
    isSelected: boolean
  }
}

export type UseStoreProps = UseStoreState & UseStoreActions
