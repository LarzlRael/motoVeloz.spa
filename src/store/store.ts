import { configureStore } from '@reduxjs/toolkit'
import { globalSlice } from './slices/slices/globalSlice'
import { authSlice } from './slices/slices/authSlice'
export const store = configureStore({
  reducer: {
    global: globalSlice.reducer,
    authSlice: authSlice.reducer,
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
