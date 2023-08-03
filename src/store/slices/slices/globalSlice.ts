import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface modalReducerInterface {
  status: boolean
  title: string
  contentModal: React.ReactNode
  butttonText: string
  onClick: (() => void) | null | undefined
  width?: string | null | undefined
  searchedResult?: any[] | null
}
interface GlobalState {
  modalReducer: modalReducerInterface
  snackbarReducer: snackbarReducerInterface
  searchedResult?: any[]
}
interface snackbarReducerInterface {
  open: boolean
  message: string
  kind: boolean
}

const initialState: GlobalState = {
  modalReducer: {
    status: false,
    title: '',
    contentModal: '',
    butttonText: '',
    onClick: null,
    width: null,
    searchedResult: null,
  },
  snackbarReducer: {
    open: false,
    message: '',
    kind: true,
  },
}

export const globalSlice = createSlice({
  name: 'global',
  initialState,
  reducers: {
    changeModal: (state, action: PayloadAction<modalReducerInterface>) => {
      state.modalReducer = {
        butttonText: action.payload.butttonText,
        contentModal: action.payload.contentModal,
        onClick: action.payload.onClick,
        status: action.payload.status,
        title: action.payload.title,
      }
    },
    changeResult: (state, action: PayloadAction<any[]>) => {
      state.searchedResult = action.payload
    },
    openSnackbar: (state, action: PayloadAction<snackbarReducerInterface>) => {
      state.snackbarReducer = {
        kind: action.payload.kind,
        message: action.payload.message,
        open: action.payload.open,
      }
    },
  },
})

// Action creators are generated for each case reducer function
export const {
  changeResult,
  changeModal,
  openSnackbar,
} = globalSlice.actions
