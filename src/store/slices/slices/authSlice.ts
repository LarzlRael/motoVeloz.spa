import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface AuthState {
  user: any
  isLogged: boolean
}

const initialState: AuthState = {
  user: null,
  isLogged: false,
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    startSession: (state, action: PayloadAction<any>) => {
      state.isLogged = true
      state.user = action.payload
    },
    logOutSession: (state) => {
      localStorage.removeItem('token')
      state.isLogged = false
    },
  },
})
export const { startSession, logOutSession } = authSlice.actions
