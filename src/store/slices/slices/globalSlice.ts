import { createSlice, PayloadAction } from '@reduxjs/toolkit'
interface indicatorInterface {
  titleIndicator: string
  urlImageIndicator: string
}
interface modalReducerInterface {
  status: boolean
  title: string
  contentModal: React.ReactNode
  butttonText: string
  onClick: (() => void) | null | undefined
  width?: string | null | undefined
}
interface GlobalState {
  indicator: indicatorInterface
  modalReducer: modalReducerInterface
  snackbarReducer: snackbarReducerInterface
}
interface snackbarReducerInterface {
  open: boolean
  message: string
  kind: boolean
}

const initialState: GlobalState = {
  indicator: {
    titleIndicator: 'title',
    urlImageIndicator:
      'https://cdn.pixabay.com/photo/2016/05/05/02/37/sunset-1373171__340.jpg',
  },
  modalReducer: {
    status: false,
    title: '',
    contentModal: '',
    butttonText: '',
    onClick: null,
    width: null,
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
    changeIndicator: (state, action: PayloadAction<indicatorInterface>) => {
      localStorage.setItem('indicator', JSON.stringify(action.payload))
    },
    changeModal: (state, action: PayloadAction<modalReducerInterface>) => {
      state.modalReducer = {
        butttonText: action.payload.butttonText,
        contentModal: action.payload.contentModal,
        onClick: action.payload.onClick,
        status: action.payload.status,
        title: action.payload.title,
      }
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
  changeIndicator,
  changeModal,
  openSnackbar,
} = globalSlice.actions
